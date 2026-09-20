'use client';

import { useEffect, useState } from 'react';
import { CustomCursor } from '@/components/ui/Cursor';
import { DashboardStyles } from '@/components/dashboard/DashboardStyles';
import { FloatingDock } from '@/components/dashboard/FloatingDock';
import { MetricsHud } from '@/components/dashboard/MetricsHud';
import { RightRail } from '@/components/dashboard/RightRail';
import { TransactionStream } from '@/components/dashboard/TransactionStream';
import type { ChimeDetection } from '@/components/SoundboxListener';
import type { DashboardStats, Transaction } from './types';

type ScanRecord = Record<string, unknown>;

const getString = (record: ScanRecord, ...keys: string[]) => {
  const value = keys.map((key) => record[key]).find((candidate) => typeof candidate === 'string');
  return typeof value === 'string' ? value : undefined;
};

const getNumber = (record: ScanRecord, ...keys: string[]) => {
  const value = keys.map((key) => record[key]).find((candidate) => typeof candidate === 'number' || typeof candidate === 'string');
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : 0;
};

const getTimestamp = (record: ScanRecord) => {
  const value = ['timestamp', 'created_at', 'createdAt', 'scan_timestamp', 'scanned_at', 'event_time', 'time']
    .map((key) => record[key])
    .find((candidate) => typeof candidate === 'string' || typeof candidate === 'number');

  if (typeof value === 'number' || (typeof value === 'string' && /^\d+(\.\d+)?$/.test(value))) {
    const numericValue = Number(value);
    const milliseconds = numericValue < 1_000_000_000_000 ? numericValue * 1000 : numericValue;
    return new Date(milliseconds);
  }

  if (typeof value === 'string') {
    const clockTime = value.match(/^\d{1,2}:\d{2}(?::\d{2})?/);
    if (clockTime) return clockTime[0];
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) return parsedDate;
  }

  return null;
};

const getFlags = (record: ScanRecord) => {
  const flags = record.flags_detected ?? record.flags;
  return Array.isArray(flags) ? flags.filter((flag): flag is string => typeof flag === 'string') : [];
};

const toTransaction = (record: ScanRecord, index: number): Transaction => {
  const status = getString(record, 'status', 'result')?.toUpperCase();
  const isFraud = status === 'FRAUD' || status === 'FLAGGED' || record.is_authentic === false;
  const timestamp = getTimestamp(record);
  const time = typeof timestamp === 'string' ? timestamp : timestamp ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--';
  const flags = getFlags(record);

  return {
    id: getString(record, 'id', 'transaction_id', 'scan_id', 'utr') || `SCAN_${index + 1}`,
    time,
    amount: getNumber(record, 'amount', 'extracted_amount'),
    method: getString(record, 'method', 'payment_method', 'paymentMethod', 'provider', 'source', 'source_app', 'sourceApp', 'app', 'channel') || 'UNKNOWN',
    status: isFraud ? 'FRAUD' : 'VERIFIED',
    details: isFraud ? { confidence: getNumber(record, 'confidence_score', 'confidence'), flags, engine: getString(record, 'engine', 'ai_engine') || 'Receipt Analysis API' } : null,
  };
};

export default function MerchantDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ verified: 0, flagged: 0, totalVolume: 0 });
  const [scanError, setScanError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChimeDetected = (data: ChimeDetection) => {
    const verificationEndpoint = process.env.NEXT_PUBLIC_SOUNDBOX_VERIFICATION_URL;
    if (verificationEndpoint) {
      void fetch(verificationEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(() => undefined);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchScans = async () => {
      try {
        const response = await fetch('/api/scans?merchantId=STORE_9921', { signal: controller.signal, cache: 'no-store' });
        const payload: unknown = await response.json();
        if (!response.ok) throw new Error(typeof payload === 'object' && payload !== null && 'error' in payload && typeof payload.error === 'string' ? payload.error : `Scan request failed (${response.status}).`);
        if (!Array.isArray(payload)) throw new Error('Scan API returned an invalid response.');

        const records = payload.filter((record): record is ScanRecord => typeof record === 'object' && record !== null);
        const mappedTransactions = records.map(toTransaction);
        setTransactions(mappedTransactions.slice(0, 15));
        setStats({ verified: mappedTransactions.filter((transaction) => transaction.status === 'VERIFIED').length, flagged: mappedTransactions.filter((transaction) => transaction.status === 'FRAUD').length, totalVolume: mappedTransactions.reduce((total, transaction) => total + transaction.amount, 0) });
        setScanError(null);
      } catch (error) {
        if (!controller.signal.aborted) setScanError(error instanceof Error ? error.message : 'Unable to fetch logged scans.');
      }
    };

    void fetchScans();
    const interval = setInterval(() => void fetchScans(), 10000);
    return () => { controller.abort(); clearInterval(interval); };
  }, [refreshKey]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter'] overflow-hidden selection:bg-[#ccff00] selection:text-black flex">
      <DashboardStyles />
      <CustomCursor />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }} />
      <div className="relative w-screen h-screen bg-black text-white font-['JetBrains_Mono'] overflow-hidden selection:bg-[#ccff00] selection:text-black">
        <div className="absolute inset-0 bg-grid z-0 opacity-40 pointer-events-none" />
        <div className="absolute inset-0 crt-overlay pointer-events-none" />
        <main className="relative z-10 w-full h-full max-w-360 mx-auto p-4 md:p-8 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex-1 flex flex-col gap-6 max-w-4xl h-full"><MetricsHud stats={stats} /><TransactionStream transactions={transactions} error={scanError} /></div>
          <RightRail onChimeDetected={handleChimeDetected} />
        </main>
        <FloatingDock onRefresh={() => setRefreshKey((current) => current + 1)} />
      </div>
    </div>
  );
}

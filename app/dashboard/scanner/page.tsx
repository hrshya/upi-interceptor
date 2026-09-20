'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ScannerCursor } from '@/components/scanner/ScannerCursor';
import { ScannerFooter } from '@/components/scanner/ScannerFooter';
import { ScannerStyles } from '@/components/scanner/ScannerStyles';
import { ScanViewfinder } from '@/components/scanner/ScanViewfinder';
import { TelemetryHeader } from '@/components/scanner/TelemetryHeader';
import { TerminalPanel } from '@/components/scanner/TerminalPanel';
import type { ReceiptAnalysisResult } from '@/components/ReceiptUpload';
import type { ResultType, ScannerLog, ScannerStatus } from './types';

const escapeLogText = (value: string) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);

export default function EdgeKiosk() {
  const [status, setStatus] = useState<ScannerStatus>('IDLE');
  const [resultType, setResultType] = useState<ResultType>(null);
  const [logs, setLogs] = useState<ScannerLog[]>([{ type: 'INFO', msg: 'System initialized. Edge nodes active.', timestamp: '00:00:00.000' }]);
  const [sessionTrigger, setSessionTrigger] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 1000], [8, -8]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1000], [-8, 8]), { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const addLog = (type: ScannerLog['type'], msg: string) => setLogs((current) => [...current, { type, msg, timestamp: new Date().toISOString().split('T')[1].slice(0, -1) }]);

  const handleUploadStart = (file: File) => {
    setStatus('ANALYZING');
    setSessionTrigger((current) => current + 1);
    const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
    setLogs([{ type: 'INFO', msg: `INIT: Receipt upload started for ${escapeLogText(file.name)}...`, timestamp }, { type: 'INFO', msg: `> Sending ${escapeLogText(file.type || 'image/png')} to receipt analysis API`, timestamp }]);
  };

  const handleAnalysisResult = (result: ReceiptAnalysisResult) => {
    const isAuthentic = result.is_authentic === true;
    setResultType(isAuthentic ? 'SUCCESS' : 'FRAUD');
    setStatus('RESULT');
    setSessionTrigger((current) => current + 1);
    addLog(isAuthentic ? 'SUCCESS' : 'ERR', isAuthentic ? 'AUTH: Receipt verified by analysis service.' : 'CRITICAL: Analysis service flagged this receipt.');
    if (typeof result.confidence_score === 'number') addLog('INFO', `> Confidence: ${(result.confidence_score * 100).toFixed(0)}%`);
    if (result.extracted_utr) addLog('INFO', `> UTR: ${escapeLogText(String(result.extracted_utr))}`);
    if (result.flags_detected?.length) result.flags_detected.forEach((flag) => addLog('ERR', `> Flag: ${escapeLogText(flag)}`));
  };

  const handleAnalysisError = (message: string) => {
    setStatus('IDLE');
    setSessionTrigger((current) => current + 1);
    setLogs([{ type: 'ERR', msg: `ANALYSIS FAILED: ${escapeLogText(message)}`, timestamp: new Date().toISOString().split('T')[1].slice(0, -1) }]);
  };

  const resetScanner = () => {
    setStatus('IDLE');
    setResultType(null);
    setSessionTrigger((current) => current + 1);
    addLog('INFO', '--- SESSION RESET ---');
  };

  return (
    <div className="h-screen w-screen flex bg-[#020202] font-['Inter'] relative overflow-hidden">
      <ScannerStyles />
      <ScannerCursor />
      <div className="absolute inset-0 bg-grid opacity-30 z-0 pointer-events-none" />
      <div className="absolute inset-0 crt-overlay" />
      <main className="flex-1 p-8 flex flex-col relative z-10" style={{ perspective: '1200px' }}>
        <TelemetryHeader status={status} sessionTrigger={sessionTrigger} />
        <div className="flex-1 flex items-center justify-center relative"><ScanViewfinder status={status} resultType={resultType} sessionTrigger={sessionTrigger} rotateX={rotateX} rotateY={rotateY} onUploadStart={handleUploadStart} onResult={handleAnalysisResult} onError={handleAnalysisError} onReset={resetScanner} /></div>
        <ScannerFooter />
      </main>
      <TerminalPanel logs={logs} />
    </div>
  );
}

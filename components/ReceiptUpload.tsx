'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

export type ReceiptAnalysisResult = {
  is_authentic?: boolean;
  confidence_score?: number;
  extracted_utr?: string | null;
  extracted_amount?: number | string | null;
  flags_detected?: string[];
  [key: string]: unknown;
};

type ReceiptUploadProps = {
  merchantId?: string;
  disabled?: boolean;
  onUploadStart?: (file: File) => void;
  onResult: (result: ReceiptAnalysisResult) => void;
  onError: (message: string) => void;
};

const readFileAsBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const result = reader.result;
    if (typeof result !== 'string' || !result.includes(',')) {
      reject(new Error('The selected file could not be read.'));
      return;
    }
    resolve(result.split(',')[1]);
  };
  reader.onerror = () => reject(new Error('The selected file could not be read.'));
  reader.readAsDataURL(file);
});

export const ReceiptUpload = ({ merchantId = 'STORE_9921', disabled = false, onUploadStart, onResult, onError }: ReceiptUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onError('Upload rejected: please select an image file.');
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_RECEIPT_ANALYSIS_URL;
    if (!endpoint) {
      onError('Receipt analysis endpoint is not configured. Set NEXT_PUBLIC_RECEIPT_ANALYSIS_URL.');
      return;
    }

    setLoading(true);
    onUploadStart?.(file);

    try {
      const imageBase64 = await readFileAsBase64(file);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_base64: imageBase64, media_type: file.type || 'image/png', merchant_id: merchantId }),
      });

      const responseBody: unknown = await response.json();
      if (!response.ok) {
        const message = typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody && typeof responseBody.message === 'string' ? responseBody.message : `Receipt analysis failed (${response.status}).`;
        throw new Error(message);
      }

      onResult(responseBody as ReceiptAnalysisResult);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Receipt analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileUpload} disabled={disabled || loading} className="hidden" />
      <button type="button" disabled={disabled || loading} onClick={() => inputRef.current?.click()} className="mt-6 flex items-center gap-2 border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50 transition-colors">
        <Upload size={14} /> {loading ? 'Analyzing...' : 'Upload Screenshot'}
      </button>
    </>
  );
};

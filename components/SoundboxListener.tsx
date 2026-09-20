'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, Mic, MicOff } from 'lucide-react';
import { CircularSonar } from './dashboard/CircularSonar';

export type ChimeDetection = {
  timestamp: string;
  energy: number;
  frequencyRange: [number, number];
  signature: 'PAYTM_PHONEPE_NOTIFICATION';
};

type SoundboxListenerProps = {
  onChimeDetected: (data: ChimeDetection) => void;
};

const TARGET_RANGE: [number, number] = [1200, 2400];
const FFT_SIZE = 512;
const DETECTION_THRESHOLD = 2200;
const DETECTION_COOLDOWN_MS = 1800;

export default function SoundboxListener({ onChimeDetected }: SoundboxListenerProps) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastDetectionRef = useRef(0);
  const onChimeDetectedRef = useRef(onChimeDetected);

  useEffect(() => {
    onChimeDetectedRef.current = onChimeDetected;
  }, [onChimeDetected]);

  const stopListening = useCallback(async () => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') await audioContextRef.current.close();
    audioContextRef.current = null;
    setListening(false);
  }, []);

  const startListening = useCallback(async () => {
    if (listening) return;
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = FFT_SIZE;
      source.connect(analyser);

      streamRef.current = stream;
      audioContextRef.current = audioContext;
      setListening(true);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const binWidth = audioContext.sampleRate / analyser.fftSize;
      const startBin = Math.max(0, Math.floor(TARGET_RANGE[0] / binWidth));
      const endBin = Math.min(dataArray.length, Math.ceil(TARGET_RANGE[1] / binWidth));

      const checkFrequency = () => {
        analyser.getByteFrequencyData(dataArray);
        const highFreqPower = dataArray.slice(startBin, endBin).reduce((total, value) => total + value, 0);
        const now = performance.now();

        if (highFreqPower > DETECTION_THRESHOLD && now - lastDetectionRef.current > DETECTION_COOLDOWN_MS) {
          lastDetectionRef.current = now;
          onChimeDetectedRef.current({
            timestamp: new Date().toISOString(),
            energy: highFreqPower,
            frequencyRange: TARGET_RANGE,
            signature: 'PAYTM_PHONEPE_NOTIFICATION',
          });
        }

        animationFrameRef.current = requestAnimationFrame(checkFrequency);
      };

      animationFrameRef.current = requestAnimationFrame(checkFrequency);
    } catch (listenerError) {
      await stopListening();
      setError(listenerError instanceof DOMException && listenerError.name === 'NotAllowedError' ? 'Microphone permission was denied.' : 'Microphone could not be initialized.');
    }
  }, [listening, stopListening]);

  useEffect(() => () => { void stopListening(); }, [stopListening]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-start mb-6 z-10">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Acoustic Guard</h3>
          <p className="text-[9px] text-gray-500 mt-1 uppercase">Web Audio API / FFT</p>
        </div>
        <button type="button" onClick={() => void (listening ? stopListening() : startListening())} className={`px-3 py-1 text-[10px] uppercase font-bold rounded-sm border transition-all ${listening ? 'bg-[#ccff00]/20 border-[#ccff00] text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-transparent border-white/20 text-gray-400 hover:text-white'}`}>
          {listening ? 'Disarm' : 'Arm Listener'}
        </button>
      </div>
      <div className="my-4 z-10"><CircularSonar isListening={listening} /></div>
      <div className="w-full mt-4 text-[10px] p-2 bg-white/5 border border-white/5 rounded text-center text-gray-400 z-10">
        {error ? <span className="text-[#ff2a2a] flex items-center justify-center gap-2"><AlertCircle size={12} /> {error}</span> : listening ? <span className="text-[#ccff00] flex items-center justify-center gap-2"><Mic size={12} /> CHIME_SIGNATURE_SCAN_ACTIVE</span> : <span className="flex items-center justify-center gap-2"><MicOff size={12} /> AWAITING_ACTIVATION</span>}
      </div>
    </div>
  );
}

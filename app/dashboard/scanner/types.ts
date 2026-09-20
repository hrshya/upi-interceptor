export type ScannerStatus = 'IDLE' | 'ANALYZING' | 'RESULT';
export type ResultType = 'SUCCESS' | 'FRAUD' | null;
export type LogType = 'INFO' | 'SUCCESS' | 'WARN' | 'ERR';

export type ScannerLog = {
  type: LogType;
  msg: string;
  timestamp: string;
};

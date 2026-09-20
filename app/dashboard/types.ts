export type FraudDetails = {
  confidence: number;
  flags: string[];
  engine: string;
};

export type Transaction = {
  id: string;
  time: string;
  amount: number;
  method: string;
  status: 'FRAUD' | 'VERIFIED';
  details: FraudDetails | null;
};

export type DashboardStats = {
  verified: number;
  flagged: number;
  totalVolume: number;
};

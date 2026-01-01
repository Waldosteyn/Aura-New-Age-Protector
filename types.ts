
export enum ThreatLevel {
  STABLE = 'STABLE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export type Direction = 'INGRESS' | 'EGRESS';

export interface NetworkPacket {
  id: string;
  timestamp: Date;
  sourceIp: string;
  destIp: string;
  port: number;
  sizeKb: number;
  direction: Direction;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'HTTPS';
  processId?: number;
}

export interface TrustScore {
  overall: number;
  kernel: number;
  user: number;
  network: number;
}

export interface SystemEvent {
  id: string;
  timestamp: Date;
  source: 'KERNEL' | 'USER' | 'NETWORK' | 'LOKI' | 'MIRAGE';
  title: string;
  description: string;
  severity: ThreatLevel;
  scoreImpact: number;
  codename?: string;
  metadata?: Record<string, any>;
}

export interface MetricRange {
  min: number;
  max: number;
  unit: string;
}

export interface BehavioralSaga {
  processName: string;
  apiEntropyBaseline: number;
  expectedNetworkPeers: string[];
  ioIntensity: MetricRange;
  typicalParent: string;
}

export interface GoldenImageSnapshot {
  version: string;
  timestamp: Date;
  integrityHash: string;
  criticalFiles: Array<{
    path: string;
    hash: string;
    status: 'MATCH' | 'DRIFT';
  }>;
}

export interface ProcessTelemetry {
  pid: number;
  name: string;
  trust: number;
  apiSequence: string[];
  lineage: string[];
}

export interface HoneypotStatus {
  activeBaitCount: number;
  trappedIntruders: number;
  lastInteraction: Date | null;
}

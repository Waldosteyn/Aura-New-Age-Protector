
import { BehavioralSaga, GoldenImageSnapshot } from './types';

/**
 * The "Golden Image" represents the immutable reference state of the OS.
 * Any deviation from this root hash triggers immediate Kernel Sentry alerts.
 */
export const WORLD_TREE_ROOT: GoldenImageSnapshot = {
  version: "YGGDRASIL-2.5.0",
  timestamp: new Date('2025-01-01T00:00:00Z'),
  integrityHash: "0x8F2A3C...D9E1",
  criticalFiles: [
    { path: "C:\\Windows\\System32\\ntoskrnl.exe", hash: "SHA256:4a1b...", status: 'MATCH' },
    { path: "C:\\Windows\\System32\\lsass.exe", hash: "SHA256:9f3e...", status: 'MATCH' },
    { path: "C:\\Windows\\System32\\drivers\\aura_sentry.sys", hash: "SHA256:bc82...", status: 'MATCH' },
    { path: "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", hash: "REG:f0a1...", status: 'MATCH' }
  ]
};

/**
 * Learned "Sagas" for application behavior. 
 * AURA compares real-time telemetry against these baselines.
 */
export const APP_SAGAS: BehavioralSaga[] = [
  {
    processName: "chrome.exe",
    apiEntropyBaseline: 0.85,
    expectedNetworkPeers: ["*.google.com", "*.gstatic.com"],
    ioIntensity: { min: 5, max: 200, unit: "MB/s" },
    typicalParent: "explorer.exe"
  },
  {
    processName: "powershell.exe",
    apiEntropyBaseline: 0.42,
    expectedNetworkPeers: ["internal.wsus.local"],
    ioIntensity: { min: 0.1, max: 2, unit: "MB/s" },
    typicalParent: "services.exe"
  },
  {
    processName: "svchost.exe",
    apiEntropyBaseline: 0.98,
    expectedNetworkPeers: ["*.microsoft.com"],
    ioIntensity: { min: 0.01, max: 5, unit: "MB/s" },
    typicalParent: "services.exe"
  }
];

export const USER_TEMPORAL_BASELINE = {
  activeHours: { start: "08:30", end: "18:00" },
  averageTypingWPM: 65,
  mousePrecisionIndex: 0.92,
  geoLoci: ["Home-Office", "HQ-London"]
};

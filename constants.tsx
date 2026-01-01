
import React from 'react';
import { 
  Shield, 
  User, 
  Activity, 
  Zap, 
  Lock, 
  Ghost, 
  Wind, 
  Compass,
  Cpu,
  Fingerprint,
  Network,
  ZapOff
} from 'lucide-react';

export const ENGINE_METADATA = {
  KERNEL: {
    name: 'Kernel Sentry',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Deep behavioral API sequence analysis.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950/30',
    borderColor: 'border-cyan-500/50'
  },
  USER: {
    name: 'User Empath',
    icon: <User className="w-5 h-5" />,
    description: 'High-level UEBA & Interaction patterns.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-950/30',
    borderColor: 'border-indigo-500/50'
  },
  NETWORK: {
    name: 'Network Sentinel',
    icon: <Network className="w-5 h-5" />,
    description: 'Ripple tracking & GNN flow analysis.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/30',
    borderColor: 'border-emerald-500/50'
  },
  LOKI: {
    name: 'Loki Engine',
    icon: <Ghost className="w-5 h-5" />,
    description: 'Decoy deployment & illusion playback.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/30',
    borderColor: 'border-amber-500/50'
  },
  VAULT: {
    name: 'Vault Keeper',
    icon: <Lock className="w-5 h-5" />,
    description: 'Air-gapped sensitive storage rituals.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-950/30',
    borderColor: 'border-purple-500/50'
  }
};

export const ENFORCER_METADATA = {
  ERIS: {
    name: 'Eris Enforcer',
    icon: <ZapOff className="w-5 h-5" />,
    description: 'Network blackhole and protocol enforcement.',
    color: 'text-rose-400'
  }
};

export const HUNTER_GLYPHS = [
  'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚩ', 'ᚱ', 'ᚳ', 'ᚷ', 'ᚹ', 'ᚻ', 'ᚾ', 'ᛁ', 'ᛄ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛝ', 'ᛞ', 'ᛟ'
];

export const INITIAL_EVENTS: any[] = [
  {
    id: 'ev-1',
    timestamp: new Date(),
    source: 'KERNEL',
    title: 'Anomalous Call Sequence',
    description: 'Process svchost.exe attempted unauthorized memory injection pattern.',
    severity: 'MEDIUM',
    scoreImpact: -5,
    codename: 'Fenrir-A1'
  },
  {
    id: 'ev-2',
    timestamp: new Date(Date.now() - 300000),
    source: 'USER',
    title: 'Identity Pattern Drift',
    description: 'Typing cadence and mouse precision deviated 14% from baseline.',
    severity: 'LOW',
    scoreImpact: -2,
    codename: 'Garn-Scan'
  },
  {
    id: 'ev-3',
    timestamp: new Date(Date.now() - 1200000),
    source: 'NETWORK',
    title: 'Foreign Ripple Detected',
    description: 'Encrypted packet stream to unmapped IP 45.33.12.112 flagged by GNN.',
    severity: 'HIGH',
    scoreImpact: -15,
    codename: 'Jormungandr-Byte'
  }
];

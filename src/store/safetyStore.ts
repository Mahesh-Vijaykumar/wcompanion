import { create } from 'zustand';
import { SafetyReport } from '../types';

interface SafetyState {
  reports: SafetyReport[];
  addReport: (report: Omit<SafetyReport, 'id'>) => void;
  upvoteReport: (id: string) => void;
}

export const useSafetyStore = create<SafetyState>((set) => ({
  reports: [],
  addReport: (report) => 
    set((state) => ({
      reports: [...state.reports, {
        ...report,
        id: Math.random().toString(36).substr(2, 9),
        upvotes: 0,
        comments: [],
        status: 'pending'
      }]
    })),
  upvoteReport: (id) =>
    set((state) => ({
      reports: state.reports.map(report =>
        report.id === id
          ? { ...report, upvotes: report.upvotes + 1 }
          : report
      )
    })),
}));
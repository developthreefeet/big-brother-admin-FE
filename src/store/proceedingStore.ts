import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Proceeding {
  key: string;
  id: string;
  title: string;
  upload_date: string;
  edit_date: string;
  content: string;
  file: string;
}

interface ProceedingState {
  proceedings: Proceeding[];
  addProceeding: (proceeding: Proceeding) => void;
  updateProceeding: (id: string, updatedProceeding: Partial<Proceeding>) => void;
}

export const useProceedingStore = create<ProceedingState>()(
  persist(
    (set) => ({
      proceedings: [
        {
          key: '1',
          id: '32',
          title: '8월 회의록',
          upload_date: '2024-08-23',
          edit_date: '2024-08-24',
          content: '',
          file: '/static/proceeding-1.pdf',
        },
        {
          key: '2',
          id: '14',
          title: '7월 회의록',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '',
          file: '',
        },
      ],
      addProceeding: (proceeding) =>
        set((state) => ({ proceedings: [...state.proceedings, proceeding] })),
      updateProceeding: (id, updatedProceeding) =>
        set((state) => ({
          proceedings: state.proceedings.map((proeeding) =>
            proeeding.id === id ? { ...proeeding, ...updatedProceeding } : proeeding,
          ),
        })),
    }),
    {
      name: 'proceeding-storage',
    },
  ),
);

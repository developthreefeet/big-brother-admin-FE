import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Rule {
  key: string;
  id: string;
  title: string;
  upload_date: string;
  edit_date: string;
  content: string;
  file: string;
}

interface RuleState {
  rules: Rule[];
  addRule: (rule: Rule) => void;
  updateRule: (id: string, updatedRule: Partial<Rule>) => void;
}

export const useRuleStore = create<RuleState>()(
  persist(
    (set) => ({
      rules: [
        {
          key: '1',
          id: '32',
          title: '2024 학칙',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '',
          file: '/static/rule-1.pdf',
        },
        {
          key: '2',
          id: '14',
          title: '2023 학칙',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '',
          file: '',
        },
      ],
      addRule: (rule) => set((state) => ({ rules: [...state.rules, rule] })),
      updateRule: (id, updatedRule) =>
        set((state) => ({
          rules: state.rules.map((rule) => (rule.id === id ? { ...rule, ...updatedRule } : rule)),
        })),
    }),
    {
      name: 'rule-storage',
    },
  ),
);

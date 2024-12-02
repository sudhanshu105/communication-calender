import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Company, Communication, CommunicationMethod } from '../types';

interface AppState {
  companies: Company[];
  communications: Communication[];
  communicationMethods: CommunicationMethod[];
  isDarkMode: boolean;
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  addCommunication: (communication: Communication) => void;
  addCommunicationMethod: (method: CommunicationMethod) => void;
  updateCommunicationMethod: (method: CommunicationMethod) => void;
  deleteCommunicationMethod: (id: string) => void;
  reorderCommunicationMethod: (id: string, direction: 'up' | 'down') => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      companies: [],
      communications: [],
      isDarkMode: false,
      communicationMethods: [
        {
          id: '1',
          name: 'LinkedIn Post',
          description: 'Post on company LinkedIn page',
          sequence: 1,
          isMandatory: true,
        },
        {
          id: '2',
          name: 'LinkedIn Message',
          description: 'Direct message on LinkedIn',
          sequence: 2,
          isMandatory: true,
        },
        {
          id: '3',
          name: 'Email',
          description: 'Email communication',
          sequence: 3,
          isMandatory: true,
        },
        {
          id: '4',
          name: 'Phone Call',
          description: 'Phone call communication',
          sequence: 4,
          isMandatory: false,
        },
        {
          id: '5',
          name: 'Other',
          description: 'Other forms of communication',
          sequence: 5,
          isMandatory: false,
        },
      ],
      addCompany: (company) =>
        set((state) => ({ companies: [...state.companies, company] })),
      updateCompany: (company) =>
        set((state) => ({
          companies: state.companies.map((c) => (c.id === company.id ? company : c)),
        })),
      deleteCompany: (id) =>
        set((state) => ({
          companies: state.companies.filter((c) => c.id !== id),
        })),
      addCommunication: (communication) =>
        set((state) => ({
          communications: [...state.communications, communication],
        })),
      addCommunicationMethod: (method) =>
        set((state) => ({
          communicationMethods: [...state.communicationMethods, method],
        })),
      updateCommunicationMethod: (method) =>
        set((state) => ({
          communicationMethods: state.communicationMethods.map((m) =>
            m.id === method.id ? method : m
          ),
        })),
      deleteCommunicationMethod: (id) =>
        set((state) => ({
          communicationMethods: state.communicationMethods.filter((m) => m.id !== id),
        })),
      reorderCommunicationMethod: (id, direction) =>
        set((state) => {
          const methods = [...state.communicationMethods];
          const index = methods.findIndex((m) => m.id === id);
          if (index === -1) return state;

          const newIndex = direction === 'up' ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= methods.length) return state;

          const method = methods[index];
          const otherMethod = methods[newIndex];

          methods[index] = { ...otherMethod, sequence: method.sequence };
          methods[newIndex] = { ...method, sequence: otherMethod.sequence };

          return { communicationMethods: methods };
        }),
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'communication-calendar-storage',
      partialize: (state) => ({
        companies: state.companies,
        communications: state.communications.map(comm => ({
          ...comm,
          date: comm.date.toISOString(),
        })),
        isDarkMode: state.isDarkMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
      
          state.communications = state.communications.map(comm => ({
            ...comm,
            date: new Date(comm.date),
          }));
        }
      },
    }
  )
);
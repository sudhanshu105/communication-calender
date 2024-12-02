import { Communication, Company, CommunicationMethod } from '../types';
import { addDays, isPast, isToday } from 'date-fns';

export const getCompanyStatus = (
  company: Company,
  communications: Communication[]
) => {
  const lastCommunication = communications
    .filter((c) => c.companyId === company.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  if (!lastCommunication) return 'overdue';

  const nextDueDate = addDays(
    lastCommunication.date,
    company.communicationPeriodicity
  );

  if (isPast(nextDueDate) && !isToday(nextDueDate)) return 'overdue';
  if (isToday(nextDueDate)) return 'due';
  return 'upcoming';
};

export const getLastFiveCommunications = (
  companyId: string,
  communications: Communication[],
  methods: CommunicationMethod[]
) => {
  return communications
    .filter((c) => c.companyId === companyId)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)
    .map((comm) => ({
      ...comm,
      method: methods.find((m) => m.id === comm.methodId),
    }));
};

export const getNextPlannedCommunication = (
  company: Company,
  communications: Communication[],
  methods: CommunicationMethod[]
): { date: Date; method: CommunicationMethod | undefined } | null => {
  const lastComm = communications
    .filter((c) => c.companyId === company.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  if (!lastComm) {
    return {
      date: new Date(),
      method: methods[0],
    };
  }

  const nextDueDate = addDays(lastComm.date, company.communicationPeriodicity);
  const lastMethodIndex = methods.findIndex((m) => m.id === lastComm.methodId);
  const nextMethodIndex = (lastMethodIndex + 1) % methods.length;

  return {
    date: nextDueDate,
    method: methods[nextMethodIndex],
  };
};
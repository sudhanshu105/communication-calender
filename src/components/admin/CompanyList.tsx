import React from 'react';
import { Company } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';

interface CompanyListProps {
  companies: Company[];
  onDelete: (id: string) => void;
  onEdit: (company: Company) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="mt-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Company Name
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Location
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Periodicity
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {company.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {company.location}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {company.communicationPeriodicity} days
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(company)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(company.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
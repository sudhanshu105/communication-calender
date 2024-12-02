import React from 'react';
import { CompanyForm } from './CompanyForm';
import { CompanyList } from './CompanyList';
import { CommunicationMethodForm } from './CommunicationMethodForm';
import { CommunicationMethodList } from './CommunicationMethodList';
import { useStore } from '../../store/useStore';
import { Company, CommunicationMethod } from '../../types';

export const AdminPanel: React.FC = () => {
  const {
    companies,
    communicationMethods,
    addCompany,
    updateCompany,
    deleteCompany,
    addCommunicationMethod,
    updateCommunicationMethod,
    deleteCommunicationMethod,
    reorderCommunicationMethod,
  } = useStore();

  const [editingCompany, setEditingCompany] = React.useState<Company | null>(null);
  const [editingMethod, setEditingMethod] = React.useState<CommunicationMethod | null>(null);

  const handleCompanySubmit = (companyData: Omit<Company, 'id'>) => {
    if (editingCompany) {
      updateCompany({ ...companyData, id: editingCompany.id });
      setEditingCompany(null);
    } else {
      addCompany({ ...companyData, id: crypto.randomUUID() });
    }
  };

  const handleMethodSubmit = (methodData: Omit<CommunicationMethod, 'id'>) => {
    if (editingMethod) {
      updateCommunicationMethod({ ...methodData, id: editingMethod.id });
      setEditingMethod(null);
    } else {
      addCommunicationMethod({
        ...methodData,
        id: crypto.randomUUID(),
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {editingCompany ? 'Edit Company' : 'Add New Company'}
        </h2>
        <CompanyForm onSubmit={handleCompanySubmit} />
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Companies</h2>
        </div>
        <CompanyList
          companies={companies}
          onDelete={deleteCompany}
          onEdit={setEditingCompany}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {editingMethod ? 'Edit Communication Method' : 'Add Communication Method'}
        </h2>
        <CommunicationMethodForm onSubmit={handleMethodSubmit} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Communication Methods</h2>
        </div>
        <div className="p-6">
          <CommunicationMethodList
            methods={communicationMethods}
            onDelete={deleteCommunicationMethod}
            onEdit={setEditingMethod}
            onReorder={reorderCommunicationMethod}
          />
        </div>
      </div>
    </div>
  );
};
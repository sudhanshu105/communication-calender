import React from 'react';
import { Company } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface CompanyFormProps {
  onSubmit: (company: Omit<Company, 'id'>) => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit }) => {
  const [emails, setEmails] = React.useState<string[]>(['']);
  const [phoneNumbers, setPhoneNumbers] = React.useState<string[]>(['']);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      linkedinProfile: formData.get('linkedinProfile') as string,
      emails: emails.filter(Boolean),
      phoneNumbers: phoneNumbers.filter(Boolean),
      comments: formData.get('comments') as string,
      communicationPeriodicity: parseInt(formData.get('periodicity') as string, 10),
    });
    
    e.currentTarget.reset();
    setEmails(['']);
    setPhoneNumbers(['']);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          type="url"
          name="linkedinProfile"
          id="linkedinProfile"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Addresses</label>
        <div className="space-y-2">
          {emails.map((email, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  const newEmails = [...emails];
                  newEmails[index] = e.target.value;
                  setEmails(newEmails);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {index === emails.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setEmails([...emails, ''])}
                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEmails(emails.filter((_, i) => i !== index))}
                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
        <div className="space-y-2">
          {phoneNumbers.map((phone, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const newPhones = [...phoneNumbers];
                  newPhones[index] = e.target.value;
                  setPhoneNumbers(newPhones);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {index === phoneNumbers.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setPhoneNumbers([...phoneNumbers, ''])}
                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))}
                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="periodicity" className="block text-sm font-medium text-gray-700">
          Communication Periodicity (days)
        </label>
        <input
          type="number"
          name="periodicity"
          id="periodicity"
          min="1"
          required
          defaultValue="14"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          name="comments"
          id="comments"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Company
        </button>
      </div>
    </form>
  );
};
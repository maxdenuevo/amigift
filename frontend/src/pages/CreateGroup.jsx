import React from 'react';
import CreateGroupForm from '../components/forms/CreateGroupForm';
import { useTranslation } from 'react-i18next';

const CreateGroup = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        {t('createGroup.title')}
      </h1>
      <CreateGroupForm />
    </div>
  );
};

export default CreateGroup;
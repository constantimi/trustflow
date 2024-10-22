import React from 'react';
import { useNavigate } from 'react-router';
import { useDashboardTranslation } from '../hooks/useDashboardTranslation';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setInitialState } from '../store/insurance/insurance-slice';
import { Theme } from '../../shared/layout/theme';
import { getTheme } from '../../shared/store/app/theme';
import DashboardLayout from '../layout/DashboardLayout';
import AddIcon from '../components/icons/AddIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const theme = useAppSelector(getTheme);

  const { t } = useDashboardTranslation();

  const handleAddInsurance = () => {
    navigate('/insurances/add');
    dispatch(setInitialState());
  };

  return (
    <DashboardLayout>
      <div className="flex w-full flex-row items-center justify-end p-6">
        <Theme.PrimaryButton
          onClick={handleAddInsurance}
          className="h-[2.5rem] w-[8rem] rounded-full"
        >
          <AddIcon fill={theme.text.button} />
          {t('Add Insurance')}
        </Theme.PrimaryButton>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

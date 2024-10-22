import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/hooks';
import { Step, StepName } from '../../../types/step';
import Form from '../../../components/form/Form';
import Field from '../../../components/form/Field';

import 'react-datepicker/dist/react-datepicker.css';
import DatepickerComponent from '../../../../shared/components/datepicker/DatePicker';
import {
  getUserState,
  setDob,
  setFirstName,
  setLastName,
  setEmail,
  validateDob,
  validateEmail,
  validateFirstName,
  validateLastName,
} from '../../../store/insurance/insurance-slice';
import isDobValid from '../../../../shared/helpers/validateDob';
import isEmailValid from '../../../../shared/helpers/validateEmail';
import { Theme } from '../../../../shared/layout/theme';
import { useDashboardTranslation } from '../../../hooks/useDashboardTranslation';

export const createUserInformationStep: () => Step = () => ({
  title: StepName.USER,
});

interface Props {
  nextStep: () => void;
}

const UserForm = ({ nextStep }: Props) => {
  const { t } = useDashboardTranslation();
  const dispatch = useAppDispatch();
  const form = useAppSelector(getUserState);

  const handleDateChange = (date: Date) => {
    // Assuming you format the date into a string here
    const formattedDate = date.toISOString().split('T')[0];
    dispatch(setDob(formattedDate));
    dispatch(validateDob());
  };

  const handleSubmit = () => {
    let valid = true;

    if (form.firstName.value === '') {
      dispatch(validateFirstName());
      valid = false;
    }
    if (form.lastName.value === '') {
      dispatch(validateLastName());
      valid = false;
    }
    if (!form.email.value || !isEmailValid(form.email.value)) {
      dispatch(validateEmail());
      valid = false;
    }
    if (!form.dob.value || !isDobValid(form.dob.value)) {
      dispatch(validateDob());
      valid = false;
    }

    if (!valid) return;

    nextStep();
  };

  return (
    <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-x-4 md:flex-row">
          <Field
            label={t('First Name')}
            type="text"
            className="w-full"
            placeholder={t('First Name')}
            value={form.firstName.value}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
            onBlur={() => dispatch(validateFirstName())}
            error={form.firstName.error}
          />

          <Field
            label={t('Last Name')}
            type="text"
            className="w-full"
            placeholder={t('Last Name')}
            value={form.lastName.value}
            onChange={(e) => dispatch(setLastName(e.target.value))}
            onBlur={() => dispatch(validateLastName())}
            error={form.lastName.error}
          />
        </div>

        <div className="flex w-full flex-col gap-x-4 md:flex-row">
          <Field
            label={t('Email')}
            type="email"
            className="w-full"
            placeholder={t('Email')}
            value={form.email.value}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            onBlur={() => dispatch(validateEmail())}
            error={form.email.error}
          />

          <DatepickerComponent
            label={t('Date of birth')}
            placeholder={t('Date of birth')}
            className="w-full"
            onChange={handleDateChange}
            selectedDate={form.dob.value}
            error={form.dob.error}
          />
        </div>
      </div>

      <div className="flex w-full flex-row justify-end">
        <Theme.PrimaryButton
          onClick={handleSubmit}
          className="h-[2rem] w-[6rem]"
        >
          {t('Next')}
        </Theme.PrimaryButton>
      </div>
    </Form>
  );
};

export default UserForm;

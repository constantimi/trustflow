import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../shared/store/hooks';
import { updateUserInfo } from '../../store/user/user-slice';
import { validateUserInfo } from '../../utils/validation';

interface Props {
  nextStep: () => void;
}

export const UserInfoForm = ({ nextStep }: Props) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ name: '', email: '', dob: '' });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUserInfo(form);
    if (validationErrors.length === 0) {
      dispatch(updateUserInfo(form));
      nextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input type="date" name="dob" value={form.dob} onChange={handleChange} />

      <ul>
        {errors.map((error) => (
          <li key={nanoid()} style={{ color: 'red' }}>
            {error}
          </li>
        ))}
      </ul>

      <button type="submit">Next</button>
    </form>
  );
};

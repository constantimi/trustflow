export const validateUserInfo = (form: {
  name: string;
  email: string;
  dob: string;
}): string[] => {
  const errors: string[] = [];

  if (!form.name) errors.push('Name is required.');
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
    errors.push('Valid email is required.');
  if (!form.dob) errors.push('Date of birth is required.');

  return errors;
};

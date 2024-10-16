import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { StepList } from '../types/step';

const Register = () => {
  const [stepper, setStepper] = useState<null | StepList>();

  const navigate = useNavigate();

  return (
    <div>
      <h1>Insurance Policy Form</h1>
    </div>
  );
};

export default Register;

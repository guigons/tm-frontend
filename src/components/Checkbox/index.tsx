import React from 'react';

import { Container } from './styles';

interface ICheckboxProps {
  label: string;
}

const Checkbox: React.FC<ICheckboxProps> = ({ label }) => {
  return (
    <Container>
      <label htmlFor="label-{label}">
        <input id="label-{label}" type="checkbox" />
        <span>{label}</span>
      </label>
    </Container>
  );
};

export default Checkbox;

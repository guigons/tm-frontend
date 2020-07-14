import React from 'react';

import { Container } from './styles';

interface IDisplayFieldProps {
  label: string;
}

const DisplayField: React.FC<IDisplayFieldProps> = ({ children, label }) => {
  return (
    <Container>
      <h3>{label}</h3>
      <p>{children}</p>
    </Container>
  );
};

export default DisplayField;

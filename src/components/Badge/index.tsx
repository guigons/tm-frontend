import React from 'react';

import { Container } from './styles';

interface IBadgeProps {
  value: string | number;
  color?: string;
}

const Button: React.FC<IBadgeProps> = ({ value }) => (
  <Container value={value}>{value}</Container>
);
export default Button;

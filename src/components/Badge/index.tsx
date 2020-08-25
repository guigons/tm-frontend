import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: string;
  value: string | number;
  alert?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  color,
  value,
  alert,
  ...rest
}) => (
  <Container
    className="Badge"
    type="button"
    value={value}
    alert={alert}
    {...rest}
  >
    {value}
  </Container>
);
export default Button;

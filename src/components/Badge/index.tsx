import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: string;
  value: string | number;
};

const Button: React.FC<ButtonProps> = ({ loading, color, value, ...rest }) => (
  <Container className="Badge" type="button" value={value} {...rest}>
    {value}
  </Container>
);
export default Button;

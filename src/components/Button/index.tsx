import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingMsg?: string;
  background?: string;
  color?: string;
  icon?: React.ComponentType<IconBaseProps>;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  loadingMsg,
  icon: Icon,
  ...rest
}) => (
  <Container className="Button" type="button" {...rest}>
    {Icon && <Icon size={20} />}
    <div className="Label">
      {loading ? loadingMsg || 'Carregando ...' : children}
    </div>
  </Container>
);
export default Button;

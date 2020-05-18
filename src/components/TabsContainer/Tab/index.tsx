import React, { RefAttributes } from 'react';
import { useLocation } from 'react-router-dom';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface ITabProps extends RefAttributes<HTMLAnchorElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  selected?: boolean;
  route: string;
}

const Tab: React.FC<ITabProps> = ({
  name,
  icon: Icon,
  selected,
  route,
  ...rest
}) => {
  const location = useLocation();

  return (
    <Container to={route} selected={location.pathname === route} {...rest}>
      {Icon && <Icon size={16} />}
      <div>
        <span>{name}</span>
      </div>
    </Container>
  );
};

export default Tab;

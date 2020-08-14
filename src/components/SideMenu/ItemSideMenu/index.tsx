import React from 'react';

import { useLocation } from 'react-router-dom';
import { Container } from './styles';

interface IItemMenuProps {
  route: string;
}

const ItemSideMenu: React.FC<IItemMenuProps> = ({
  route,
  children,
  ...rest
}) => {
  const location = useLocation();
  return (
    <Container to={route} selected={location.pathname === route} {...rest}>
      {children}
    </Container>
  );
};

export default ItemSideMenu;

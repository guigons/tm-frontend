import React from 'react';
import { FiBox, FiUser } from 'react-icons/fi';

import { Container, Logo, UserMenu } from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  const user: { name: string } | undefined = JSON.parse(
    localStorage.getItem('@TM:user') as string,
  );

  return (
    <Container>
      <Logo>
        <div>
          <FiBox size={30} />
        </div>

        <h1>Ticket Manager</h1>
      </Logo>
      <UserMenu>
        {user?.name}
        <FiUser size={24} onClick={signOut} />
      </UserMenu>
    </Container>
  );
};
export default Header;

import React from 'react';
import { FiBox, FiUser, FiLogOut } from 'react-icons/fi';

import { MdSettings } from 'react-icons/md';
import { Container, Logo, UserMenu, OptionsContainer } from './styles';
import { useAuth } from '../../hooks/auth';
import SuspensePainel from '../SuspensePainel';

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
        <SuspensePainel icon={FiUser}>
          <OptionsContainer>
            <button type="button" onClick={signOut}>
              <FiLogOut size={20} />
              <h1>Sair</h1>
            </button>
          </OptionsContainer>
        </SuspensePainel>
      </UserMenu>
    </Container>
  );
};
export default Header;

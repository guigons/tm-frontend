import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  FiLogOut,
  FiUser,
  FiBox,
  FiAlertCircle,
  FiActivity,
  FiLayers,
} from 'react-icons/fi';
import TabsContainer from '../../components/TabsContainer';
import Tab from '../../components/TabsContainer/Tab';
import TAs from '../TAs';
import TPs from '../TPs';

import { Container, SubHeader } from './styles';

import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const { signOut } = useAuth();
  const match = useRouteMatch();

  return (
    <Container>
      <header>
        <FiBox size={30} />
        <h1>Ticket Manager</h1>
        <button type="button" onClick={signOut}>
          <FiLogOut size={20} />
        </button>
        <button type="button">
          <FiUser size={20} />
        </button>
      </header>

      {/* <SubHeader />
      <TabsContainer>
        <Tab route="/home/tas" name="TAs" icon={FiAlertCircle} />
        <Tab route="/home/tps" name="TPs" icon={FiLayers} />
        <Tab route="/home" name="Dasboard" icon={FiActivity} />
      </TabsContainer>

      <Switch>
        <Route path={`${match.path}/tas`} component={TAs} />
        <Route path={`${match.path}/tps`} component={TPs} />
      </Switch> */}
      {/* <footer>Desenvolvido por: Gerencia Suporte e Configuração IP</footer> */}
    </Container>
  );
};

export default Home;

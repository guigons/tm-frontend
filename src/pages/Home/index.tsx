import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { FiActivity } from 'react-icons/fi';
import { FaStamp } from 'react-icons/fa';
import Dashboard from '../Dashboard';
import TAs from '../TAs';
import TPs from '../TPs';

import { Container, Content, NavContent } from './styles';

import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import ItemSideMenu from '../../components/SideMenu/ItemSideMenu';
import Stamps from '../Stamps';

const Home: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Container>
      <Header />
      <Content>
        <SideMenu>
          <ItemSideMenu route={`${match.path}/dashboard`}>
            <FiActivity size={18} />
          </ItemSideMenu>
          <ItemSideMenu route={`${match.path}/tas`}>TA</ItemSideMenu>
          <ItemSideMenu route={`${match.path}/tps`}>TP</ItemSideMenu>
          <ItemSideMenu route={`${match.path}/stamps`}>
            <FaStamp size={18} />
          </ItemSideMenu>
        </SideMenu>
        <NavContent>
          <Switch>
            <Route path={`${match.path}/dashboard`} component={Dashboard} />
            <Route path={`${match.path}/tas`} component={TAs} />
            <Route path={`${match.path}/tps`} component={TPs} />
            <Route path={`${match.path}/stamps`} component={Stamps} />
          </Switch>
        </NavContent>
      </Content>
    </Container>
  );
};

export default Home;

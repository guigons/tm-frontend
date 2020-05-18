import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import api from '../../services/api';
import Badge from '../../components/Badge';

interface ITAGroupItem {
  time: string;
  count: number;
  ids: number[];
}

interface ITAGroup {
  grupoResponsavel: string;
  data: ITAGroupItem[] | [];
  total: number;
}

const TAs: React.FC = () => {
  const [TAGroups, setTAGroups] = useState<ITAGroup[]>([]);

  useEffect(() => {
    api.get('/tas/group').then(response => {
      const tasGroups = response.data.group;
      setTAGroups(tasGroups);
    });
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Grupo Responsável</th>
            <th>+0h</th>
            <th>+12h</th>
            <th>+1d</th>
            <th>+3d</th>
            <th>+7d</th>
            <th>+15d</th>
            <th>+30d</th>
            <th>+60d</th>
            <th>+120d</th>
            <th>+365d</th>
            <th>+Total</th>
          </tr>
        </thead>
        <tbody>
          {TAGroups.map(TAGroup => (
            <tr key={TAGroup.grupoResponsavel}>
              <td>{TAGroup.grupoResponsavel}</td>
              <td>
                <Badge value={TAGroup.data[0].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[1].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[2].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[3].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[4].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[5].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[6].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[7].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[8].count} />
              </td>
              <td>
                <Badge value={TAGroup.data[9].count} />
              </td>
              <td>
                <Badge value={TAGroup.total} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default TAs;

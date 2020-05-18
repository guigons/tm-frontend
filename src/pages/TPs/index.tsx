import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import api from '../../services/api';
import Badge from '../../components/Badge';

interface ITPGroupItem {
  status: string;
  count: number;
  ids: number[];
}

interface ITPGroup {
  grupoResponsavel: string;
  data: ITPGroupItem[] | [];
  total: number;
}

const TPs: React.FC = () => {
  const [TPGroups, setTPGroups] = useState<ITPGroup[]>([]);

  // useEffect(() => {
  //   api.get('/tps/group').then(response => {
  //     const tpsGroups = response.data.group;
  //     setTPGroups(tpsGroups);
  //   });
  // }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Grupo Responsável</th>
            <th>Pendente Permissão</th>
            <th>Pendente O&M</th>
            <th>Pendente GMUD</th>
            <th>Pré-aprovado</th>
            {/* <th>Levantamento Campo</th>
            <th>Levantamento Supervisão</th> */}
            <th>Autorizado</th>
            <th>Em Execução</th>
            <th>Fora do Prazo</th>
            <th>Pré-baixa</th>
            <th>Cancelado</th>
            <th>Fechado</th>
            <th>Não Executado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {TPGroups.map(TPGroup => (
            <tr key={TPGroup.grupoResponsavel}>
              <td>{TPGroup.grupoResponsavel}</td>
              <td>
                <Badge value={TPGroup.data[0].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[1].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[2].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[3].count} />
              </td>
              {/* <td>
                <Badge value={TPGroup.data[4].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[5].count} />
              </td> */}
              <td>
                <Badge value={TPGroup.data[6].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[7].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[8].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[9].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[10].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[11].count} />
              </td>
              <td>
                <Badge value={TPGroup.data[12].count} />
              </td>
              <td>
                <Badge value={TPGroup.total} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default TPs;

import React, { useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container, Content, Backdrop } from './styles';

interface IExpansionPainelProps {
  icon?: React.ComponentType<IconBaseProps>;
}

const SuspensePainel: React.FC<IExpansionPainelProps> = ({
  children,
  icon: Icon,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <Container>
      {opened && (
        <Backdrop
          onClick={event => {
            event.stopPropagation();
            setOpened(false);
          }}
        />
      )}
      {Icon && (
        <Icon
          size={20}
          onClick={event => {
            event.stopPropagation();
            setOpened(true);
          }}
        />
      )}
      {opened && <Content>{children}</Content>}
    </Container>
  );
};

export default SuspensePainel;

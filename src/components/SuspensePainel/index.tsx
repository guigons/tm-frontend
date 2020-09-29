import React, { useState, useCallback } from 'react';
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

  const handleClickContent = useCallback(event => {
    event.stopPropagation();
    setOpened(false);
  }, []);

  const handleClickBackdrop = useCallback(event => {
    event.stopPropagation();
    setOpened(false);
  }, []);

  const handleClickIcon = useCallback(event => {
    event.stopPropagation();
    setOpened(true);
  }, []);

  return (
    <Container>
      {opened && <Backdrop onClick={handleClickBackdrop} />}
      {Icon && <Icon size={24} onClick={handleClickIcon} />}
      {opened && <Content onClick={handleClickContent}>{children}</Content>}
    </Container>
  );
};

export default SuspensePainel;

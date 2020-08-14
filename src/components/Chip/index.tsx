import React from 'react';

import { FiX } from 'react-icons/fi';
import { Container } from './styles';

interface IChipProps {
  text: string;
  close?(): void;
  withoutClose?: boolean;
}

const Chip: React.FC<IChipProps> = ({ text, close, withoutClose }) => {
  return (
    <Container className="Chip">
      {text}
      {!withoutClose && <FiX onClick={close} />}
    </Container>
  );
};

export default Chip;

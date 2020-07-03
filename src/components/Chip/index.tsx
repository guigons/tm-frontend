import React from 'react';

import { FiX } from 'react-icons/fi';
import { Container } from './styles';

interface IChipProps {
  text: string;
  close?(): void;
}

const Chip: React.FC<IChipProps> = ({ text, close }) => {
  return (
    <Container>
      {text}
      <FiX onClick={close} />
    </Container>
  );
};

export default Chip;

import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import { Container } from './styles';

interface ISpinnerProps {
  size?: number;
}

const Spinner: React.FC<ISpinnerProps> = ({ size }) => {
  return (
    <Container>
      <ClipLoader color="#19b2ff" loading size={size || 36} />
    </Container>
  );
};

export default Spinner;

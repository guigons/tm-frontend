import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import { Container } from './styles';

const override = css`
  display: flex;
`;

const Spinner: React.FC = () => {
  return (
    <Container className="sweet-loading">
      <ClipLoader css={override} color="#19b2ff" loading />
    </Container>
  );
};

export default Spinner;

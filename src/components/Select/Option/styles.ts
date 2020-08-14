import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  display: flex;
  padding: 16px;
  color: grey;
  border: 0px;
  background: #232129;
  z-index: 51;

  &:hover {
    background: ${shade(0.2, '#232129')};
  }
`;

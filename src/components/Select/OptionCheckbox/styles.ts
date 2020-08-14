import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  color: grey;
  border: 0px;
  background: #232129;
  z-index: 51;

  input {
    margin-right: 16px;
  }

  &:hover {
    background: ${shade(0.2, '#232129')};
  }
`;

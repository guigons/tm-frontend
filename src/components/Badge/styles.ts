import styled, { css } from 'styled-components';

interface IContainerProps {
  value: string | number;
}

export const Container = styled.div<IContainerProps>`
  width: 64px;
  background-color: #dedede29;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  color: rgb(27, 29, 35);
  ${props =>
    !!props.value &&
    css`
      background-color: #e6a2a2;
      color: #fff;
    `};
`;

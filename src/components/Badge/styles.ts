import styled, { css } from 'styled-components';

interface IContainerProps {
  value: string | number;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #8080802e;
  border-radius: 50px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  ${props =>
    !!props.value &&
    css`
      background-color: #e6a2a2;
      font-weight: 500;
    `};
`;

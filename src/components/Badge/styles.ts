import styled, { css } from 'styled-components';

interface IContainerProps {
  value: string | number;
  alert?: boolean;
}

export const Container = styled.button<IContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #8080802e;
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  border: 0px;
  font-weight: 300;
  color: #ffffff33;
  ${props =>
    !!props.value &&
    css`
      background-color: var(--color-secondary);
      color: white;
      font-weight: 500;
    `};

  ${props =>
    !!props.alert &&
    css`
      background-color: var(--color-secondary-alert);
      color: white;
      font-weight: 500;
    `};
`;

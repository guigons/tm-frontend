import styled, { css } from 'styled-components';

interface IContainerProps {
  enabled?: boolean;
}

export const Container = styled.div<IContainerProps>`
  ${props =>
    props.enabled &&
    css`
      color: #0079c4;
    `}
`;

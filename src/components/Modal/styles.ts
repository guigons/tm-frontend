import styled, { css } from 'styled-components';

interface IContentProps {
  size?: 'sm' | 'md' | 'lg' | 'fs';
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.div<IContentProps>`
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 101;
  transform: translate(-50%, -50%);
  padding: 40px;
  background-color: #312e38;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  border-radius: 4px;
  max-height: 80%;
  overflow: auto;

  ${props => {
    if (props.size === 'sm') {
      return css`
        width: 30%;
      `;
    }
    if (props.size === 'md') {
      return css`
        width: 60%;
      `;
    }
    if (props.size === 'lg') {
      return css`
        width: 80%;
      `;
    }
    if (props.size === 'fs') {
      return css`
        width: 90%;
      `;
    }
    return css`
      width: 60%;
    `;
  }}

  > button {
    position: absolute;
    top: 40px;
    right: 40px;
    border: 0;
    color: inherit;
    background-color: inherit;
    z-index: 6;
  }
`;

import styled, { css } from 'styled-components';

interface ISuspensePainelProps {
  position?: 'bottomLeft' | 'bottomRight';
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: transparent;
`;

export const Content = styled.div<ISuspensePainelProps>`
  position: absolute;
  top: calc(100%);
  right: calc(100% - 20px);
  background-color: var(--color-box);
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  border-radius: 4px;
  opacity: 1;
  z-index: 51;
`;

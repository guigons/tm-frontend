import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Root = styled.button`
  background-color: inherit;
  color: inherit;
  border: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  right: calc(100% + 10px);
  background-color: #24292e;
  border: 1px solid grey;
  z-index: 2;
  border-radius: 5px;
`;

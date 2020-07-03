import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  height: calc(100% - 56px);
`;

export const NavContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

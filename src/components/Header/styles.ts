import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #312e38;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* box-shadow: 0 1px 1px rgba(255, 255, 255, 0.25) !important;
    position: relative;
    z-index: 1;*/
`;

export const Logo = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    width: 56px;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #19b2ff;
  }

  h1 {
    flex: 1;
    margin-left: 18px;
    font-size: 22px;
    font-weight: 400;
  }
`;

export const UserMenu = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 300;

  svg {
    margin: 18px;
    padding: 2px;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    background-color: #24292e;
    padding-left: 10px;
    height: 56px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.75) !important;
    position: relative;
    z-index: 1;

    h1 {
      flex: 1;
      margin-left: 10px;
      font-size: 24px;
      font-weight: 400;
    }

    button {
      background-color: #24292e;
      border: 0px;
      color: #fff;
      height: 100%;
      width: 56px;
      cursor: pointer;

      &:hover {
        background-color: ${shade(0.2, '#24292e')};
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #24292e;
    height: 30px;
    font-size: 12px;
    font-weight: 300;
    color: #fff;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  div {
    display: flex;
    flex: 1;
    background-color: #312e38;
    align-items: center;
    justify-content: center;
  }
`;

export const SubHeader = styled.div`
  display: flex;
  background-color: rgb(27, 29, 35);
  padding-left: 10px;
  height: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

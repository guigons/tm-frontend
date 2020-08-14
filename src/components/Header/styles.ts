import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  background-color: #312e38;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const OptionsContainer = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 16px;
    background-color: var(--color-box);
    border: 0px;
    border-radius: 4px;
    cursor: pointer;

    h1 {
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      letter-spacing: 0px;
      color: var(--color-text);
      width: 120px;
    }

    svg {
      color: var(--color-text);
      margin: 8px 24px 8px 8px;
    }

    &:hover {
      background-color: ${shade(0.2, '#312e38')};
    }
  }
`;

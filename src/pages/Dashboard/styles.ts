import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 1248px;
  margin: 0 auto;
  padding: 0px 24px 32px 24px;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;

  > h1 {
    font-size: 16px;
    padding: 16px 0px;
  }

  button {
    border: 0px;
    background-color: inherit;
    color: inherit;
  }
`;

export const Main = styled.main``;

export const ListChartPreferences = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const NewChartPreference = styled.div`
  display: flex;
  height: 310px;
  align-items: center;
  justify-content: center;
  background-color: #312e3833;
  cursor: pointer;
  transition: 0.2s;
  color: #19b2ff;
  border-radius: 4px;

  &:hover {
    background-color: ${shade(0.2, '#312e3833')};
    color: ${shade(0.2, '#19b2ff')};
  }
`;

import styled from 'styled-components';
import { shade, lighten } from 'polished';

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

export const ChartPreference = styled.div`
  display: flex;
  height: 310px;
  align-items: center;
  justify-content: center;
  background-color: #312e38;
  padding: 24px;
  position: relative;
  overflow: auto;
  flex-direction: column;
  border-radius: 4px;

  > div.Period {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 16px;
    left: 16px;
    color: #fff;
    font-size: 12px;
    font-weight: 300;
  }

  > div.Icons {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    svg {
      margin-left: 8px;
    }
  }

  > h1 {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
    color: #19b2ff;
  }

  > span {
    font-size: 12px;
    text-transform: capitalize;
    margin-bottom: 16px;
  }
`;

export const ModalNewChartPreference = styled.div`
  > h1 {
    margin-bottom: 24px;
  }
`;

export const ModalEditChartPreference = styled.div`
  > h1 {
    margin-bottom: 24px;
  }
`;

export const ModalRemoveChartPreference = styled.div`
  > h4 {
    margin-bottom: 24px;
    font-weight: 400;
  }
  > div.Buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button:nth-child(1) {
      margin-right: 16px;
      background-color: #24292e;
      color: grey;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${lighten(0.2, '#24292e')};
        color: white;
      }
    }

    button:nth-child(2) {
      margin-left: 16px;
      background-color: #24292e;
      color: grey;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${lighten(0.2, '#24292e')};
        color: white;
      }
    }
  }
`;

export const ModalChart = styled.div`
  position: relative;
  height: 500px;

  display: flex;

  align-items: center;
  justify-content: center;

  overflow: auto;
  flex-direction: column;

  > div.Icons {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    svg {
      margin-left: 8px;
    }
  }

  > h1 {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
    color: #19b2ff;
  }

  > span {
    font-size: 12px;
    text-transform: capitalize;
    margin-bottom: 24px;
  }

  canvas {
    flex: 1;
  }
`;

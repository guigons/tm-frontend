import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
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
    h1 {
      color: #fff;
      font-size: 12px;
      font-weight: 300;
    }
    span {
      margin-left: 8px;
    }
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

  > div.Chart {
    width: 550px;
    height: 200px;
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

  > div.Period {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 16px;
    left: 16px;
    h1 {
      color: #fff;
      font-size: 12px;
      font-weight: 300;
    }
    span {
      margin-left: 8px;
    }
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

  > div.Chart {
    width: 100%;
    height: 400px;
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

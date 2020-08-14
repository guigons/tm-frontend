import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 1000px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  padding: 0px 8px;

  div.Select {
    width: 140px;
    font-size: 12px;
    background-color: var(--color-box);
    /* padding: 5px 16px; */
    border-radius: 25px;
    border: 0px;
    label {
      padding: 0px;
      span {
        color: var(--color-secondary);
      }
    }
    select {
      margin: 0px;
      padding: 0px;
    }
    div.ContentOptions {
      background: transparent;
      margin-top: 6px;
    }
    button.Option {
      color: var(--color-secondary);
      font-size: 12px;
      padding: 8px 16px;
      margin: 1px 0px;
      border-radius: 25px;
      background: #232129;

      &:hover {
        background: ${shade(0.2, '#232129')};
      }
    }
  }

  > div.BarLeft {
    display: flex;
    align-items: center;
    h1 {
      font-size: 16px;
      padding: 16px 0px;
    }
  }

  > div.BarRight {
    display: flex;
    button {
      border: 0px;
      background-color: inherit;
      color: inherit;
      margin-left: 16px;
    }
    span.Chip:nth-child(1) {
      background-color: var(--color-box);
      color: var(--color-primary);
      font-size: 12px;
      font-weight: 400;
      margin-left: 16px;
    }

    div.Period {
      display: flex;
      background-color: var(--color-box);
      border-radius: 25px;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
      cursor: pointer;
      padding: 0px;
      width: 150px;

      h1 {
        color: var(--color-secondary);
        font-size: 12px;
        font-weight: 400;
        margin-left: 16px;
      }

      svg {
        color: var(--color-secondary);
        margin: 0px 8px;
      }
    }
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 120px;
  padding: 0px 8px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #312e38;
  flex: 1;
  padding: 16px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  }

  & + div {
    margin-left: 10px;
  }

  > div:nth-child(1) {
    span {
      font-size: 12px;
      font-weight: 300;
    }
  }

  > div:nth-child(2) {
    margin-top: 16px;
    font-size: 24px;
    strong {
      font-size: 24px;
      min-width: 100px;
      display: flex;
      align-items: center;
      justify-content: left;
      span {
        margin-left: 10px;
        color: #777;
        font-size: 20px;
        font-weight: 300;
      }
    }
  }
`;

export const FilaHeader = styled.ul`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  margin: 24px 8px 0px 8px;
  border-radius: 0px 5px 5px 0px;
  position: relative;
  font-size: 12px;
  color: #19b2ff;

  & + li {
    margin-top: 10px;
  }

  > p {
    overflow: hidden;
    width: 120px;
  }

  > ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 24px;
      position: relative;
      margin-left: 15px;
      font-size: 11px;
    }
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 24px;
    margin-left: 20px;
  }
`;

export const Filas = styled.ul`
  overflow: auto;
  padding: 0px 8px;

  > h3 {
    margin-top: 36px;
    color: grey;
    font-weight: 300;
    font-size: 16px;

    button {
      background: transparent;
      border: 0px;
      color: var(--color-primary);
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export const Fila = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #312e38;
  padding: 16px;
  border-radius: 0px 5px 5px 0px;
  position: relative;
  cursor: pointer;
  transition: translateX 0.2s;

  & + li {
    margin-top: 10px;
  }

  &:hover {
    transform: translateX(+6px);
  }

  &::before {
    content: '';
    width: 2px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #19b2ff;
  }

  > p {
    overflow: hidden;
    width: 120px;
  }

  > ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 24px;
      position: relative;
      margin-left: 15px;
      font-size: 12px;
      padding: 0px 15px;

      & + li::before {
        content: '';
        width: 45px;
        height: 1px;
        position: absolute;
        left: -30px;
        top: 18;
        background-color: #8080802e;
      }
    }
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 24px;
    margin-left: 20px;
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

import styled from 'styled-components';

interface IFilaProps {
  color?: string;
}

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  padding: 0px 8px;

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
    span.Chip:nth-child(2) {
      background-color: var(--color-box);
      color: var(--color-secondary);
      font-size: 12px;
      font-weight: 400;
      margin-left: 16px;
    }
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 8px;
  min-height: 120px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #312e38;
  flex: 1;
  padding: 16px;
  border-radius: 5px;
  cursor: pointer;

  & + div {
    margin-left: 10px;
  }

  > span {
    font-size: 12px;
    font-weight: 300;
  }

  > strong {
    font-size: 24px;
    margin-top: 16px;
  }

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
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
    width: 150px;
  }

  > ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 24px;
      position: relative;
      margin-left: 15px;
      letter-spacing: 0.8px;
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

  div.FilaGroup {
    margin-bottom: 10px;
  }
`;

export const Fila = styled.li<IFilaProps>`
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
    width: 3px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${props => props.color || '#19b2ff'};
  }

  > p {
    overflow: hidden;
    width: 150px;
    span {
      color: grey;
      margin-left: 8px;
      font-size: 12px;
      letter-spacing: 2px;
    }
  }

  > ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 24px;
      position: relative;
      margin-left: 15px;

      & + li::before {
        content: '';
        width: 15px;
        height: 1px;
        position: absolute;
        left: -15px;
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

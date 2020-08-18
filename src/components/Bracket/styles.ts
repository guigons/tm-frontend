import styled from 'styled-components';

interface IContainerProps {
  color?: string;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;

  div.Title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.1;
    font-size: 10px;
    color: white;
  }

  div.Bracket {
    margin-top: 6px;
    border: 1px solid #8080802e;
    border-bottom: 0px;
    height: 10px;
  }
`;

import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 31px;
    border-top: 1px solid #c5d9e8;
    border-left: 1px solid #c5d9e8;
    border-bottom: 1px solid #c5d9e8;
    margin: 0px;
    padding: 0px;

    cursor: pointer;

    button {
      border: 0;
      background-color: transparent;
      font-size: 13px;
      letter-spacing: 0px;
      color: #a8c6df;
      flex: 1;
    }

    svg {
      color: #a8c6df;
    }

    &:hover {
      background-color: #e1ebf5;
    }
  }

  li:first-child {
    border-radius: 4px 0px 0px 4px;
  }

  li:last-child {
    border-right: 1px solid #c5d9e8;
    border-radius: 0px 4px 4px 0px;
  }
`;

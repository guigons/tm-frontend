import { Form } from '@unform/web';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled(Form)``;

export const Header = styled.div`
  > h1 {
    margin-bottom: 24px;
  }

  > div.Input {
    margin-bottom: 8px;
  }

  > div.Select {
    margin-bottom: 8px;
  }
`;

export const Main = styled.div`
  max-height: 40vh;
  min-height: 40vh;
  overflow: auto;
  padding: 0px 20px;

  > button.Button {
    margin-top: 20px;
  }
`;

export const Footer = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;

  h1 {
    font-size: 16px;
  }

  svg {
    color: var(--color-primary);
    cursor: pointer;
  }

  button {
    margin-top: 20px;
    color: var(--color-primary);
    background-color: transparent;
    border: 0;
    outline: 0;

    &:hover {
      color: shade('0.2', var(--color-primary));
    }
  }
`;

export const Table = styled.table`
  background: #24292e;
  width: 100%;

  border-collapse: separate;
  border-spacing: 0;
  border-radius: 4px;

  thead tr:first-child th:first-child {
    border-top-left-radius: 4px;
  }

  thead tr:first-child th:last-child {
    border-top-right-radius: 4px;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 4px;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 4px;
  }

  tr {
    height: 42px;

    td:first-child {
      border-left: 2px solid transparent;
      box-sizing: border-box;
    }

    th {
      text-align: left;
      font-size: 11px;
      font-weight: 500;
      color: grey;
      opacity: 1;
      padding-left: 30px;
      border-bottom: 1px solid grey;
      background: ${shade(0.2, '#24292e')};
      text-transform: uppercase;

      svg {
        cursor: pointer;
      }
    }

    td {
      text-align: left;
      font-size: 13px;
      font-weight: 400;
      color: grey;
      opacity: 1;
      padding-left: 30px;

      svg {
        /* color: #19b2ff; */
        cursor: pointer;
        z-index: 99;
        margin-left: 8px;
      }
    }

    & + tr td {
      border-top: 0px solid grey;
    }
  }
`;

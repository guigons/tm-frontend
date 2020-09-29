import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  min-height: 100%;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 80px;
  padding: 0px 8px;

  > svg {
    cursor: pointer;
  }

  > h1 {
    margin-left: 32px;
    font-size: 20px;
    font-weight: 400;
    padding: 16px 0px;
  }
`;

export const Main = styled.div`
  > div.SpinnerContent {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div.Stamps {
    padding: 32px;
    background: var(--color-box);
    border-radius: 8px;
  }
`;

export const StampTypes = styled.div`
  margin-top: 32px;
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
    cursor: pointer;

    &:hover {
      background: ${shade(0.2, '#24292e')};

      /* td:first-child {
            border-left: 2px solid #19b2ff;
            box-sizing: border-box;
          } */
    }

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

export const ModalRemoveTemplate = styled.div`
  padding: 10px;

  > h4 {
    margin-top: 10px;
    font-weight: 400;
  }

  > h3 {
    margin-top: 24px;
    font-weight: 400;
    font-size: 12px;
    color: var(--color-secondary);
  }

  > div.Buttons {
    margin-top: 24px;
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

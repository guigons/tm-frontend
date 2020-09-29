import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.table`
  background: var(--color-box);
  /* border: 1px solid #b7d2e5cc; */
  border-radius: 4px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: var(--color-text);

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

  /* tbody tr:last-child td {
      border-bottom: 1px solid #e5eef5;
    } */

  tr {
    height: 42px;

    &:hover:not(.Pagination):not(.Header) {
      background: shade(0.3, 'red');

      td:first-child {
        border-left: 2px solid #0093ee;
        box-sizing: border-box;
      }
    }

    td:first-child {
      border-left: 2px solid transparent;
      box-sizing: border-box;
    }

    th {
      text-align: left;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1.7px;
      color: #8dabc4;
      opacity: 1;
      padding-left: 30px;
      border-bottom: 1px solid #d8e5ee;

      div {
        display: flex;
        align-items: center;
        justify-content: start;

        svg {
          cursor: pointer;
        }
      }
    }

    td {
      text-align: left;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0px;
      opacity: 1;
      padding-left: 30px;
      cursor: pointer;

      svg {
        color: #a8c6df;
        cursor: pointer;

        &:hover {
          color: #0093ee;
        }
      }
    }

    & + tr td {
      /* border-top: 1px solid #e5eef5; */
    }
  }
`;

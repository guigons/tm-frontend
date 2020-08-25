import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 24px;

    h1 {
      font-size: 24px;
    }

    button {
      width: 48px;
      margin-left: 16px;
    }
  }

  > h4 {
    margin-bottom: 16px;
    color: grey;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: normal;
    font-size: 12px;
  }

  div.Table {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    table {
      background: #24292e;
      /* border: 1px solid grey; */
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

      tbody tr.isAfetacao {
        background: #f3303024;
      }

      tr {
        height: 42px;

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
          color: grey;
          opacity: 1;
          padding-left: 30px;
          cursor: pointer;

          svg {
            /* color: #19b2ff; */
            cursor: pointer;
            z-index: 99;
            margin-left: 8px;

            &:hover {
              color: #${shade(0.2, '#19b2ff')};
            }
          }
        }

        & + tr td {
          border-top: 0px solid grey;
        }
      }
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px;
  background-color: #312e38;
  flex: 1;
  justify-content: center;

  table {
    flex: 1;
    font-weight: 300;
    tr {
      th {
        font-size: 8px;
        text-align: left;
        & + th {
          text-align: center;
        }
      }
      td {
        & + td {
          padding: 2px;
          text-align: center;
        }
      }
    }
  }
`;

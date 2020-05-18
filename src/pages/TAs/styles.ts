import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px;
  background-color: #312e38;
  justify-content: center;

  table {
    flex: 1;
    font-weight: 300;
    /* border: 1px solid #dedede;
    border-spacing: 0;
    border-collapse: collapse; */
    tr {
      /* border: 1px solid #ddd; */
      th {
        /* border: 1px solid #ddd; */
        text-align: left;
        & + th {
          text-align: center;
        }
      }
      td {
        /* border: 1px solid #ddd; */
        & + td {
          padding: 2px;
          text-align: center;
        }
      }
    }
  }
`;

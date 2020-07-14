import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > h1 {
    margin-bottom: 16px;
  }

  > div {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    flex-wrap: wrap;

    span {
      margin: 8px;
    }
  }

  > ul {
    display: flex;
    flex: 1;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    min-height: 200px;
    max-height: 200px;
    overflow-y: auto;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;

      span {
        flex: 1;
        height: 36px;
      }

      button {
        width: 32px;
        border: 0px;
        background-color: inherit;
        color: #19b2ff;
      }
    }
  }
`;

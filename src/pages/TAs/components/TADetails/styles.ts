import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  overflow: auto;
  align-items: center;
  justify-content: flex-start;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #19b2ff;
    padding-top: 40px;

    button.Badge {
      padding: 8px;
      height: 24px;
      margin-left: 16px;
      width: 160px;
    }
  }

  > main {
    width: 100%;
    margin-top: 60px;

    > h3 {
      color: #19b2ff;
    }

    > hr {
      border: 1px solid #dddddd22;
      margin-bottom: 24px;
    }

    div.Line {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 32px;
      margin-bottom: 24px;
    }

    div.Line3 {
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      grid-gap: 32px;
      margin-bottom: 24px;
    }
  }
`;

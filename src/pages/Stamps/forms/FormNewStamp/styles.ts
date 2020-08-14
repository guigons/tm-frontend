import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled(Form)`
  > div.Line1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
  }

  > div.Line2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
    margin-top: 2px;

    > div.New {
      > button {
        border: 0px;
        background: transparent;
        padding: 0px;
        text-align: left;
        font-size: 15px;
        letter-spacing: 0px;
        color: #0093ee;
        font-weight: 400;
      }
    }
  }

  > div.Line3 {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 32px;
    margin-top: 21px;
  }

  > div.Line4 {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 32px;
    margin-top: 21px;
  }
`;

import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.ul`
  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;

    div.Title {
      display: flex;
      h1 {
        font-size: 14px;
        font-weight: 500;
        margin-right: 16px;
      }

      h2 {
        font-size: 14px;
        font-weight: 400;
        flex: 1;
      }
    }
    div.Icons {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        color: #c4dae9;
        cursor: pointer;

        margin-left: 8px;

        &:hover {
          color: ${shade(0.2, '#C4DAE9')};
        }
      }
    }

    & + li {
      border-top: 1px solid #d8e5ee;
    }
  }
`;

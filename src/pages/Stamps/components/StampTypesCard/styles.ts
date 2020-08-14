import { shade } from 'polished';
import styled from 'styled-components';
import ExpansionPainel from '../../../../components/ExpansionPainel';

export const Container = styled(ExpansionPainel)``;

export const OptionsContainerStampTypes = styled.div`
  border-radius: 8px;
  padding: 2px;

  > button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 16px;
    background-color: var(--color-box);
    border: 0px;
    cursor: pointer;

    h1 {
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      letter-spacing: 0px;
      color: #fff;
      width: 120px;
    }

    svg {
      color: #fff;
      margin-right: 16px;
    }

    &:hover {
      background-color: ${shade(0.2, '#312e38')};
    }
  }
`;

export const Categories = styled.div`
  padding: 0px 16px;
  > div + div {
    margin-top: 10px;
  }
  > h3 {
    font-size: 14px;
    padding: 16px 24px;
    font-weight: 400;
  }
`;

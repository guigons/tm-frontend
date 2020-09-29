import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  label?: string;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  width: 100%;
  height: 42px;
  align-items: center;
  background: var(--color-box);
  border-radius: 4px;
  padding: 10px 15px;
  border: 1px solid #c5d9e8;
  color: var(--color-text);
  font-weight: 400;

  & + div {
    margin-top: 10px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: ${shade(0.2, '#A8C6DF')};
      border-color: ${shade(0.2, '#C5D9E8')};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${shade(0.2, '#A8C6DF')};
    `}

  > label {
    display: flex;
    flex: 1;
    input {
      background: transparent;
      flex: 1;
      border: 0;
      color: var(--color-text);
      font-size: 15px;

      ${props =>
        props.label &&
        css`
          margin-left: 16px;
        `}

      &::placeholder {
        color: #a8c6df;
      }
    }
  }

  svg {
    margin-right: 10px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

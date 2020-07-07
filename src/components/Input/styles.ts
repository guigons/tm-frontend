import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  label?: string;
}

export const Container = styled.div<IContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232120;
  color: grey;
  font-weight: 300;

  display: flex;
  align-items: center;


  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #19b2ff;
      border-color: #19b2ff;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #19b2ff;
    `}

  > label {
    display: flex;
    flex: 1;
    input {
      background: transparent;
      flex: 1;
      border: 0;
      color: #f4ede8 !important;

      icon {
        color: red;
      }

      svg {
        color: red !important;
      }

      ${props =>
        props.label &&
        css`
          margin-left: 16px;
        `}

      &::placeholder {
        color: #666360;
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

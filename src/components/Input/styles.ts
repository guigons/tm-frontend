import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  label?: string;
  minWidthLabel?: string;
}

export const Container = styled.div<IContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 0px 16px;
  width: 100%;
  height: 56px;

  border: 2px solid #232120;
  color: grey;
  font-weight: 300;

  display: flex;
  align-items: center;


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

  /* ${props =>
    props.isFilled &&
    css`
      color: #19b2ff;
    `} */

  > label {
    display: flex;
    flex: 1;

    h1 {
      font-weight: 300;
      font-size: 16px;
      ${props =>
        props.minWidthLabel &&
        css`
          min-width: ${props.minWidthLabel};
        `}

    }

    input {
      background: transparent;
      flex: 1;
      border: 0;
      color: #f4ede8;

      icon {
        color: red;
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

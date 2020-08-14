import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  innerLabel?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.h1`
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0px;
  color: #8dabc4;
  margin-bottom: 10px;
`;

export const InnerLabel = styled.h1`
  text-align: left;
  font-size: 15px;
  letter-spacing: 0px;
  color: #8dabc4;
`;

export const Content = styled.div<IContainerProps>`
  display: flex;
  width: 100%;
  height: 110px;
  align-items: flex-start;
  background: #FFFF;
  border-radius: 4px;
  padding: 6px;
  border: 1px solid #A8C6DF;
  color: #8DABC4;
  font-weight: 400;
  overflow: auto;

  & + div {
    margin-top: 10px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${shade(0.2, '#8DABC4')};
      background-color: #ecf5fd;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${shade(0.2, '#8DABC4')};
    `}

  > label {
    display: flex;
    flex: 1;
    textarea {
      background: transparent;
      flex: 1;
      color: #3F536E !important;
      font-size: 15px;
      border: 0px;
      resize: none;
      padding: 10px;

      ${props =>
        props.innerLabel &&
        css`
          padding-left: 8px;
        `}

      &::placeholder {
        color: #8DABC4;
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

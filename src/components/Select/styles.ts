import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  label?: string;
  disabled?: boolean;
}

interface IContentOptionsProps {
  showDisplay: boolean;
}

interface IOptionsProps {
  clean?: boolean;
}

export const Container = styled.div<IContainerProps>`
  background: #232129;
  border-radius: 10px;
  width: 100%;
  position: relative;

  border: 2px solid #232120;
  color: grey;
  font-weight: 300;
  /* padding: 0px 16px; */
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  /* ${props =>
    props.isFilled &&
    css`
      color: #19b2ff;
    `} */

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
      border-radius: 10px 10px 0px 0px;
      /* border-bottom: 0px; */
    `}

  ${props =>
    props.disabled &&
    css`
      background: ${shade(0.03, '#FFF')};
    `}

  label {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0px 0px 0px 16px;
    justify-content: center;
    margin-right: 0px;

    span {
      color: #f4ede8;
      font-weight: 400;
      ${props =>
        props.label &&
        css`
          margin-left: 16px;
        `}
    }

    select {
      display: flex;
      flex: 1;
      border: 0;
      color: #f4ede8;
      background: transparent;
      padding: 16px;
      -moz-appearance:none; /* Firefox */
      -webkit-appearance:none; /* Safari and Chrome */
      appearance:none;

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

export const Options = styled.div<IOptionsProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: -2px;
  width: calc(100% + 4px);
  background: #232129;
  z-index: 51;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 0px 0px 10px 10px;
  ${props =>
    !props.clean &&
    css`
      border-left: 2px solid #19b2ff;
      border-right: 2px solid #19b2ff;
      border-bottom: 2px solid #19b2ff;
    `}
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
`;

export const ContentOptions = styled.div<IContentOptionsProps>`
  ${props =>
    props.showDisplay
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `};
`;

export const Label = styled.h1`
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0px;
  color: #8dabc4;
  margin-bottom: 10px;
`;

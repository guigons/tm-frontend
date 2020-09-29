import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IContainerProps {
  clean?: boolean;
  isDragging?: boolean;
}

interface IHeaderProps {
  preTitleWidth?: string;
  preTitleColor?: string;
  titleColor?: string;
  titleFontSize?: string;
}

export const Container = styled.div<IContainerProps>`
  ${props =>
    !props.clean &&
    css`
      /* border: 1px solid #19b2ff; */
      background-color: var(--color-box);
    `}
  border-radius: 4px;
  opacity: 1;
`;

export const Header = styled.div<IHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding: 17px 20px;

  > div.Label {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      cursor: pointer;
      &:hover {
        color: ${shade(0.2, '#0079c4')};
      }
    }

    h1 {
      text-align: left;
      letter-spacing: 2.16px;
      opacity: 1;
      margin-left: 16px;
      text-transform: uppercase;
      ${props =>
        props.preTitleColor
          ? css`
              color: ${props.preTitleColor};
            `
          : css`
              color: #8dabc4;
            `}
      ${props =>
        props.preTitleWidth &&
        css`
          width: ${props.preTitleWidth};
        `}
      ${props =>
        props.titleFontSize
          ? css`
              font-size: ${props.titleFontSize};
            `
          : css`
              font-size: 14px;
            `}
    }

    h2 {
      text-align: left;
      letter-spacing: 2.16px;
      ${props =>
        props.titleColor
          ? css`
              color: ${props.titleColor};
            `
          : css`
              color: #3f536e;
            `}
      ${props =>
        props.titleFontSize
          ? css`
              font-size: ${props.titleFontSize};
            `
          : css`
              font-size: 14px;
            `}
      text-transform: uppercase;
      margin-left: 16px;
    }
  }

  > div.HeaderRightBar {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      color: #C4DAE9;
      cursor: pointer;

      margin-left: 8px;

      &:hover {
        color: ${shade(0.2, '#C4DAE9')};
      }
    }
  }
`;

export const Content = styled.div<IContainerProps>`
  padding: 8px;
  /* background-color: var(--color-background); */
  ${props =>
    !props.clean &&
    css`
      background-color: var(--color-background);
      /* border-top: 1px solid #19b2ff; */
    `}
`;

import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  selected?: boolean;
}

export const Container = styled(Link)<ContainerProps>`
  padding: 0px 20px 0px 20px;
  background-color: rgb(27, 29, 35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  border-radius: 3px 3px 0px 0px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: ${shade(0.2, 'rgb(27, 29, 35)')};
  }

  ${props =>
    props.selected &&
    css`
      background-color: #312e38;
      border-top: 3px solid #19b2ff;
      &:hover {
        background-color: #312e38;
      }
    `}
`;

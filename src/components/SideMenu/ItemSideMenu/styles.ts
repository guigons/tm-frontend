import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

interface IItemMenuProps {
  selected?: boolean;
}

export const Container = styled(Link)<IItemMenuProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: ${shade(0.2, '#312e38')};
  }

  ${props =>
    props.selected &&
    css`
      color: #19b2ff;
    `}
`;

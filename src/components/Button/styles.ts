import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IButtonProps {
  background?: string;
  color?: string;
}

export const Container = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0px 20px;
  background: ${props => props.background || '#19b2ff'};
  color: ${props => props.color || '#FFFFFF'};
  border-radius: 4px;
  border: 1px solid #0000000d;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;
  font-size: 15px;
  height: 56px;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: ${props =>
      props.background ? shade(0.2, props.background) : shade(0.2, '#19b2ff')};
  }

  div.Label {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;

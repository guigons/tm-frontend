import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled(Form)``;

export const Main = styled.main`
  padding: 16px 0px;

  > h1 {
    text-align: left;
    font-size: 15px;
    letter-spacing: 0px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

export const Header = styled.header`
  padding: 16px 0px;
`;

export const Footer = styled.footer`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 0px;
  button.Button {
    width: 160px;

    & + button {
      margin-left: 16px;
    }
  }
`;

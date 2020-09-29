import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled(Form)`
  > h1 {
    margin-bottom: 24px;
  }

  > div.Input {
    margin-bottom: 8px;
  }

  > div.Select {
    margin-bottom: 8px;
  }

  > button.Button {
    margin-top: 20px;
  }
`;

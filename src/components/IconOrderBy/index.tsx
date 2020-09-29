import React from 'react';

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';
import { IconBaseProps } from 'react-icons/lib';
import { Container } from './styles';

type IIconOrderByProps = IconBaseProps & {
  ascendant: boolean;
  active?: boolean;
};

const IconOrderBy: React.FC<IIconOrderByProps> = ({
  ascendant,
  active,
  ...rest
}) => {
  return (
    <Container enabled={!!active}>
      {ascendant && active ? (
        <AiOutlineSortDescending {...rest} />
      ) : (
        <AiOutlineSortAscending {...rest} />
      )}
    </Container>
  );
};

export default IconOrderBy;

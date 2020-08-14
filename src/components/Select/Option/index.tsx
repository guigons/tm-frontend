import React, { useCallback, useContext, useEffect } from 'react';

import { Container } from './styles';
import { SelectContext } from '..';

export interface IOptionProps {
  value: any;
  label: string;
}

const Option: React.FC<IOptionProps> = ({ children, value, label }) => {
  const { selectOption, registerOption } = useContext(SelectContext);

  const handleClick = useCallback(
    event => {
      event.stopPropagation();
      selectOption(value);
    },
    [selectOption, value],
  );

  useEffect(() => {
    registerOption({ value, label });
  }, [value, registerOption, label]);

  return (
    <Container className="Option" type="button" onClick={handleClick}>
      {children}
    </Container>
  );
};

export default Option;

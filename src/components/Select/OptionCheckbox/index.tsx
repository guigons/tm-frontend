import React, { useCallback, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line import/no-unresolved
import { Container } from './styles';
import { SelectContext } from '..';

export interface IOptionCheckboxProps {
  value: any;
  label: string;
}

const OptionCheckbox: React.FC<IOptionCheckboxProps> = ({
  children,
  value,
  label,
}) => {
  const { selectOption, registerOption, selection } = useContext(SelectContext);
  const [checked, setChecked] = useState(false);

  const handleClick = useCallback(
    event => {
      event.stopPropagation();
      selectOption(value);
      setChecked(!checked);
    },
    [checked, selectOption, value],
  );

  useEffect(() => {
    registerOption({ value, label, withCheckbox: true });
    if (selection) setChecked(selection.includes(value));
  }, [value, registerOption, selection, label]);

  return (
    <Container className="Option" type="button" onClick={handleClick}>
      <input
        type="checkbox"
        checked={checked}
        onChange={event => setChecked(event.target.checked)}
      />
      {children}
    </Container>
  );
};

export default OptionCheckbox;

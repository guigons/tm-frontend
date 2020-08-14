import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SelectHTMLAttributes,
  createContext,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { IoMdArrowDropdown } from 'react-icons/io';
import {
  Container,
  Error,
  Options,
  Backdrop,
  ContentOptions,
  Label,
} from './styles';

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
  multiSelection?: boolean;
  onChange?(value: any): void;
  value?: any;
  disabled?: boolean;
  clean?: boolean;
}

interface IOption {
  value: any;
  label: string;
  withCheckbox?: boolean;
}

interface ISelectContextData {
  selection: any | any[];
  registerOption(data: IOption): void;
  selectOption(value: any): void;
}

export const SelectContext = createContext<ISelectContextData>(
  {} as ISelectContextData,
);

const Select: React.FC<ISelectProps> = ({
  children,
  name,
  label: TopLabel,
  icon: Icon,
  multiSelection: MultiSelection,
  value: Value,
  disabled,
  onChange,
  clean,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<IOption[]>([]);
  const [selection, setSelection] = useState<any | any[]>();
  const [multiSelection, setMultiSelection] = useState(MultiSelection);

  const handleClick = useCallback(() => {
    if (!disabled) {
      setIsFocused(true);
      setShowOptions(true);
    }
  }, [disabled]);

  const registerOption = useCallback(
    ({ value, label, withCheckbox }: IOption) => {
      if (withCheckbox) setMultiSelection(true);
      setOptions(oldOptions => [...oldOptions, { value, label }]);
    },
    [],
  );

  useEffect(() => {
    if (!defaultValue && multiSelection) {
      setSelection([]);
    } else {
      setSelection(defaultValue);
    }
  }, [defaultValue, multiSelection, options]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue() {
        return selection;
      },
    });
  }, [fieldName, registerField, selection, options]);

  useEffect(() => {
    if (Value !== undefined) setSelection(Value);
  }, [Value, options, name]);

  const selectOption = useCallback(
    (value: any) => {
      onChange && onChange(value);
      if (multiSelection) {
        if (!selection.includes(value)) {
          setSelection([...selection, value]);
        } else {
          setSelection(selection.filter((s: any | any[]) => s !== value));
        }
      } else {
        setSelection(value);
        setIsFocused(false);
        setisFilled(true);
        setShowOptions(false);
      }
    },
    [multiSelection, onChange, selection],
  );

  const getLabel = useCallback(() => {
    return options.find(o => o.value === selection)?.label;
  }, [options, selection]);

  return (
    <SelectContext.Provider value={{ selectOption, registerOption, selection }}>
      <Container
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        label={Label}
        onClick={handleClick}
        className="Select"
        disabled={disabled || false}
      >
        {Icon && <Icon size={20} />}
        <label htmlFor={name}>
          {TopLabel ? `${TopLabel}:` : null}
          <span>{getLabel()}</span>
          <select
            id={name}
            defaultValue={defaultValue}
            ref={selectRef}
            value={selection}
            {...rest}
          />
          <IoMdArrowDropdown size={18} />
        </label>
        <ContentOptions showDisplay={showOptions}>
          <Backdrop
            onClick={event => {
              event.stopPropagation();
              setIsFocused(false);
              setisFilled(!!selectRef.current?.value);
              setShowOptions(false);
            }}
          />
          <Options className="ContentOptions" clean={clean}>
            {children}
          </Options>
        </ContentOptions>
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </SelectContext.Provider>
  );
};

export default Select;

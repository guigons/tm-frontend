import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container } from './styles';

interface IInputOnlyProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  focused?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputOnly: React.FC<IInputOnlyProps> = ({
  name,
  label,
  icon: Icon,
  focused,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(focused || false);
  const [isFilled, setisFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setisFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      className="Input"
      isFilled={isFilled}
      isFocused={isFocused}
      label={label}
    >
      {Icon && <Icon size={18} />}
      <label htmlFor={name}>
        {label ? `${label}:` : null}
        <input
          id={name}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          {...rest}
        />
      </label>
    </Container>
  );
};

export default InputOnly;

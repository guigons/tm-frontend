import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Content, Label, InnerLabel, Error } from './styles';

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  innerLabel?: string;
  name: string;
  focused?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<ITextAreaProps> = ({
  name,
  label,
  innerLabel,
  icon: Icon,
  focused,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(focused || false);
  const [isFilled, setisFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleTextAreaFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleTextAreaBlur = useCallback(() => {
    setIsFocused(false);
    setisFilled(!!textareaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container className="TextArea">
      {label && <Label>{label}</Label>}
      <Content
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        innerLabel={innerLabel}
      >
        {Icon && <Icon size={20} />}
        <label htmlFor={name}>
          {innerLabel && <InnerLabel>{innerLabel}</InnerLabel>}
          <textarea
            id={name}
            onFocus={handleTextAreaFocus}
            onBlur={handleTextAreaBlur}
            defaultValue={defaultValue}
            ref={textareaRef}
            {...rest}
          />
        </label>

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Content>
    </Container>
  );
};

export default TextArea;

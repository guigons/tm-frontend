import React, {
  useState,
  useCallback,
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ReactDOM from 'react-dom';

import { FiX } from 'react-icons/fi';
import { Container, Backdrop, Content } from './styles';

interface IModalProps {
  // ref: MutableRefObject<HTMLDivElement | undefined>;
  ref: any;
  size?: 'sm' | 'md' | 'lg' | 'fs';
  removeCloseButton?: boolean;
}

export interface IModalHandles {
  open(): void;
  close(): void;
}

const Modal: React.FC<IModalProps> = forwardRef<IModalHandles, IModalProps>(
  ({ children, size, removeCloseButton }, ref) => {
    const [show, setShow] = useState(false);

    const open = (): void => {
      setShow(true);
    };

    const close = (): void => {
      setShow(false);
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => open(),
          close: () => close(),
        };
      },
      [],
    );

    if (show) {
      const el = document.getElementById('modal-root');

      if (!el) {
        throw new Error('Element #modal-root not found in public/index.html');
      }

      return ReactDOM.createPortal(
        <Container>
          <Backdrop onClick={close} />
          <Content size={size}>
            {removeCloseButton ? null : (
              <button type="button" onClick={close}>
                <FiX size={18} />
              </button>
            )}
            {children}
          </Content>
        </Container>,
        el,
      );
    }

    return null;
  },
);

export default Modal;

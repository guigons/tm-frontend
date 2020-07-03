import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';

import { Container, Content, Root } from './styles';

interface ISuspenseContainerProps {
  root: any;
  ref: any;
}

export interface ISuspenseContainerHandles {
  close(): void;
}

export const SuspenseContainer: React.FC<ISuspenseContainerProps> = forwardRef<
  ISuspenseContainerHandles,
  ISuspenseContainerProps
>(({ root, children, ...rest }, ref) => {
  const [show, setShow] = useState<boolean>(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        close: () => setShow(false),
      };
    },
    [setShow],
  );

  const handleTougleClick = useCallback(() => {
    console.log('SHOW!', show);
    console.log(children);
    setShow(!show);
  }, [show]);

  return (
    <Container {...rest}>
      <Root onClick={handleTougleClick}>{root}</Root>
      {show && <Content>{children}</Content>}
    </Container>
  );
});

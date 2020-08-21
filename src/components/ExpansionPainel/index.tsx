import React, { useState, RefObject } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Container, Header, Content } from './styles';

interface IExpansionPainelProps {
  title?: string;
  titleColor?: string;
  titleFontSize?: string;
  preTitle?: string;
  preTitleWidth?: string;
  preTitleColor?: string;
  clean?: boolean;
  barComponent?: React.ComponentType;
  isDragging?: boolean;
}

const ExpansionPainel: React.FC<IExpansionPainelProps> = ({
  children,
  title,
  titleColor,
  titleFontSize,
  preTitle,
  preTitleWidth,
  preTitleColor,
  clean,
  barComponent: BarComponent,
  isDragging,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <Container clean={clean} isDragging={isDragging}>
      <Header
        preTitleWidth={preTitleWidth}
        preTitleColor={preTitleColor}
        titleColor={titleColor}
        titleFontSize={titleFontSize}
      >
        <div className="Label">
          {opened ? (
            <AiFillMinusCircle
              style={{ color: 'grey' }}
              size={20}
              onClick={() => setOpened(false)}
            />
          ) : (
            <AiFillPlusCircle
              style={{ color: '#19b2ff' }}
              size={20}
              onClick={() => setOpened(true)}
            />
          )}
          {preTitle && <h1>{preTitle}</h1>}
          {title && <h2>{title}</h2>}
        </div>
        <div className="HeaderRightBar">
          {!!BarComponent && <BarComponent />}
        </div>
      </Header>
      {opened ? <Content clean={clean}>{children}</Content> : null}
    </Container>
  );
};

export default ExpansionPainel;

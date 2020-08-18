import React from 'react';

import { Container } from './styles';

interface IBracketProps {
  title?: string;
  color?: string;
}

const Bracket: React.FC<IBracketProps> = ({ title, color }) => {
  return (
    <Container className="Bracket" color={color}>
      <div className="Title">{title}</div>
      <div className="Bracket" />
    </Container>
  );
};

export default Bracket;

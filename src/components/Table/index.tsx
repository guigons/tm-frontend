import React, { useState } from 'react';

import { Container } from './styles';
import Pagination from './Pagination';

const Table: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return <Container>{children}</Container>;
};

export default Table;

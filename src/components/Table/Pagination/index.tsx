import React, { useState, useMemo } from 'react';

import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { Container } from './styles';

interface IPaginationProps {
  pages: number;
}

const Pagination: React.FC<IPaginationProps> = ({ pages }) => {
  const [page, setPage] = useState(1);

  const pageNumbers = useMemo(() => {
    const pns: number[] = [];
    for (let i = 1; i <= pages; i += 1) {
      pns.push(i);
    }
    return pns;
  }, [pages]);

  return (
    <Container className="Pagination">
      <li>
        <IoMdArrowDropleft size={18} onClick={() => setPage(page - 1)} />
      </li>
      {pageNumbers.map(pg => (
        <li key={pg}>
          <button type="button" onClick={() => setPage(pg)}>
            {pg}
          </button>
        </li>
      ))}
      <li>
        <IoMdArrowDropright size={18} onClick={() => setPage(page + 1)} />
      </li>
    </Container>
  );
};

export default Pagination;

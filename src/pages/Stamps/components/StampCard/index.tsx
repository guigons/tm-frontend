import React, { useContext } from 'react';

import { MdEdit, MdDelete } from 'react-icons/md';
import { Container } from './styles';
import { IStampType, IStampCategory, IStamp, StampContext } from '../..';

interface IStampCardProps {
  stampType: IStampType;
  stampCategory: IStampCategory;
  stamp: IStamp;
}

const StampCard: React.FC<IStampCardProps> = ({
  stampType,
  stampCategory,
  stamp,
}) => {
  const { handleEditStamp, handleRemoveStamp } = useContext(StampContext);

  return (
    <Container>
      <li key={stamp.id}>
        <div className="Title">
          <h1>{stamp.cod}</h1>
          <h2>{stamp.description}</h2>
        </div>
        <div className="Icons">
          <MdEdit
            size={22}
            onClick={() => {
              handleEditStamp(stamp);
            }}
          />
          <MdDelete
            size={22}
            onClick={() => {
              handleRemoveStamp(stamp.type_id, stamp.category_id, stamp.id);
            }}
          />
        </div>
      </li>
    </Container>
  );
};

export default StampCard;

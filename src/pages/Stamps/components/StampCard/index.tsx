import React, { useContext } from 'react';

import { MdEdit, MdDelete } from 'react-icons/md';
import { Container } from './styles';
import { IStampType, IStampCategory, IStamp } from '../..';

// import { TemplateContext } from '..';

interface IStampCardProps {
  stampType: IStampType;
  stampTypeCategory: IStampCategory;
  stamp: IStamp;
}

const StampCard: React.FC<IStampCardProps> = ({
  stampType,
  stampTypeCategory,
  stamp,
}) => {
  // const { handleEditQuestion, handleRemoveQuestion } = useContext(
  //   TemplateContext,
  // );

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
              // handleEditQuestion(
              //   templateModule,
              //   templateCategory,
              //   templateQuestion,
              // );
            }}
          />
          <MdDelete
            size={22}
            onClick={() => {
              // handleRemoveQuestion(
              //   templateModule.id,
              //   templateCategory.id,
              //   templateQuestion.id,
              // );
            }}
          />
        </div>
      </li>
    </Container>
  );
};

export default StampCard;

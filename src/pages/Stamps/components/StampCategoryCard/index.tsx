import React, { useContext } from 'react';

import { MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';

import {
  Container,
  OptionsContainerTemplateCategories,
  Stamps,
} from './styles';

import { IStampType, IStampCategory, StampContext } from '../..';
import SuspensePainel from '../../../../components/SuspensePainel';
import StampCard from '../StampCard';

interface IStampCategoryCardProps {
  stampType: IStampType;
  stampCategory: IStampCategory;
}

const StampCategoryCard: React.FC<IStampCategoryCardProps> = ({
  stampType,
  stampCategory,
}) => {
  const { handleRemoveStampCategory, handleEditStampCategory } = useContext(
    StampContext,
  );

  return (
    <div>
      <Container
        title={stampCategory.name}
        titleColor="#FFF"
        titleFontSize="12px"
        barComponent={() => (
          <>
            <SuspensePainel icon={MdMoreVert}>
              <OptionsContainerTemplateCategories>
                <button
                  type="button"
                  onClick={() => {
                    handleEditStampCategory(stampCategory);
                  }}
                >
                  <MdEdit size={22} />
                  <h1>Editar categoria</h1>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveStampCategory(
                      stampCategory?.type_id,
                      stampCategory.id,
                    );
                  }}
                >
                  <MdDelete size={22} />
                  <h1>Remover categoria</h1>
                </button>
              </OptionsContainerTemplateCategories>
            </SuspensePainel>
          </>
        )}
      >
        <Stamps>
          {!stampCategory?.stamps.length && <h3>Nenhum carimbo criado</h3>}
          {stampCategory.stamps.map(stamp => (
            <StampCard
              key={stamp.id}
              stampType={stampType}
              stampCategory={stampCategory}
              stamp={stamp}
            />
          ))}
        </Stamps>
      </Container>
    </div>
  );
};

export default StampCategoryCard;

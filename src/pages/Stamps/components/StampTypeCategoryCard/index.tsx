import React, { useContext, useRef } from 'react';

import { MdDragHandle, MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import {
  Container,
  OptionsContainerTemplateCategories,
  Stamps,
} from './styles';

import { IStampType, IStampCategory } from '../..';
import SuspensePainel from '../../../../components/SuspensePainel';
import StampCard from '../StampCard';

interface IStampTypeCategoryCardProps {
  stampType: IStampType;
  stampTypeCategory: IStampCategory;
}

const StampTypeCategoryCard: React.FC<IStampTypeCategoryCardProps> = ({
  stampType,
  stampTypeCategory,
}) => {
  // const { handleEditCategory, handleRemoveCategory } = useContext(
  //   TemplateContext,
  // );

  return (
    <div>
      <Container
        title={stampTypeCategory.name}
        titleColor="#FFF"
        titleFontSize="12px"
        barComponent={() => (
          <>
            <SuspensePainel icon={MdMoreVert}>
              <OptionsContainerTemplateCategories>
                <button
                  type="button"
                  onClick={() => {
                    // handleEditCategory(templateModule, templateCategory);
                  }}
                >
                  <MdEdit size={22} />
                  <h1>Editar categoria</h1>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // handleRemoveCategory(
                    //   templateModule.id,
                    //   templateCategory.id,
                    // );
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
          {!stampTypeCategory?.stamps.length && <h3>Nenhum carimbo criado</h3>}
          {stampTypeCategory.stamps.map(stamp => (
            <StampCard
              key={stamp.id}
              stampType={stampType}
              stampTypeCategory={stampTypeCategory}
              stamp={stamp}
            />
          ))}
        </Stamps>
      </Container>
    </div>
  );
};

export default StampTypeCategoryCard;

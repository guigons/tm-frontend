import React, { useContext } from 'react';

import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import { Container, OptionsContainerStampTypes, Categories } from './styles';
import { IStampType, StampContext } from '../..';
import SuspensePainel from '../../../../components/SuspensePainel';
import StampCategoryCard from '../StampCategoryCard';

interface IStampTypesCardProps {
  stampType: IStampType;
}

const StampTypesCard: React.FC<IStampTypesCardProps> = ({ stampType }) => {
  const { handleEditStampType, handleRemoveStampType } = useContext(
    StampContext,
  );

  return (
    <Container
      title={stampType.name}
      titleColor="#FFF"
      clean
      barComponent={() => (
        <>
          <SuspensePainel icon={MdMoreVert}>
            <OptionsContainerStampTypes>
              <button
                type="button"
                onClick={() => {
                  handleEditStampType(stampType);
                }}
              >
                <MdEdit size={24} />
                <h1>Editar tipo</h1>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRemoveStampType(stampType.id);
                }}
              >
                <MdDelete size={24} />
                <h1>Remover tipo</h1>
              </button>
            </OptionsContainerStampTypes>
          </SuspensePainel>
        </>
      )}
    >
      <Categories>
        {!stampType.categories.length && <h3>Nenhum categoria criada</h3>}
        {stampType?.categories.map(stampCategory => (
          <StampCategoryCard
            key={stampCategory.id}
            stampType={stampType}
            stampCategory={stampCategory}
          />
        ))}
      </Categories>
    </Container>
  );
};

export default StampTypesCard;

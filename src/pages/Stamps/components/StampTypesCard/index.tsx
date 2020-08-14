import React from 'react';

import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import { Container, OptionsContainerStampTypes, Categories } from './styles';
import { IStampType } from '../..';
import SuspensePainel from '../../../../components/SuspensePainel';
import StampTypeCategoryCard from '../StampTypeCategoryCard';

interface IStampTypesCardProps {
  stampType: IStampType;
}

const StampTypesCard: React.FC<IStampTypesCardProps> = ({ stampType }) => {
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
                  // handleEditModule(templateModule);
                }}
              >
                <MdEdit size={24} />
                <h1>Editar tipo</h1>
              </button>
              <button
                type="button"
                onClick={() => {
                  // handleRemoveModule(templateModule.id);
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
        {stampType?.categories.map(stampTypeCategory => (
          <StampTypeCategoryCard
            key={stampTypeCategory.id}
            stampType={stampType}
            stampTypeCategory={stampTypeCategory}
          />
        ))}
      </Categories>
    </Container>
  );
};

export default StampTypesCard;

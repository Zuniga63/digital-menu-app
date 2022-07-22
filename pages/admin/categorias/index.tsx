import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { getAllCategories } from 'store/reducers/CategoryReducer/actionCreators';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import AdminLayout from 'components/Layouts/AdminLayout';
import PlusButtom from 'components/PlusButton';
import ModalForm from 'components/CategoryPage/CategoryModalForm';
import LayoutHeader from 'components/LayoutHeader';

const CategoriesPage: NextPage = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { loading, storeLoading, categories } = useAppSelector(
    ({ CategoryReducer }) => CategoryReducer
  );
  const dispatch = useAppDispatch();
  const isEmpty = !loading && !categories.length;

  const closeModal = (): void => {
    if (!storeLoading) {
      setModalOpened(false);
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const waiting = (
    <p className="text-center text-sm text-gray-400">
      {loading && <span className="animate-pulse">Cargando datos...</span>}
      {isEmpty && <span>No se ha creado ninguna categoría.</span>}
    </p>
  );

  return (
    <>
      <AdminLayout title="Categorías">
        <LayoutHeader>Listado de categorías</LayoutHeader>

        <div className="flex flex-col gap-2">
          {(loading || isEmpty) && waiting}

          {!isEmpty &&
            categories.map((item) => (
              <div className="border" key={item.id}>
                <p>Nombre: {item.name}</p>
                <p>Imagen: {item.image ? 'si' : 'no'}</p>
                <p>Descripción: {item.description}</p>
                <p>Productos: {item.products.length}</p>
              </div>
            ))}
        </div>
      </AdminLayout>

      <ModalForm onClose={closeModal} opened={modalOpened} />
      <PlusButtom onClick={() => setModalOpened(true)} />
    </>
  );
};

export default CategoriesPage;

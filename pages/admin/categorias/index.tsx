import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { getAllCategories, resetStoreState } from 'store/reducers/CategoryReducer/actionCreators';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import AdminLayout from 'components/Layouts/AdminLayout';
import PlusButtom from 'components/PlusButton';
import ModalForm from 'components/CategoryPage/CategoryModalForm';
import LayoutHeader from 'components/LayoutHeader';
import CategoryCard from 'components/CategoryPage/CategoryCard';
import withAuth from 'utils/withAuth';

const CategoriesPage: NextPage = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { loading, storeLoading, updateLoading, categories, reload } = useAppSelector(
    ({ CategoryReducer }) => CategoryReducer
  );

  const dispatch = useAppDispatch();
  const isEmpty = !loading && !categories.length;

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = (): void => {
    if (!storeLoading && !updateLoading) {
      setModalOpened(false);
      dispatch(resetStoreState());
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (reload) {
      dispatch(getAllCategories());
    }
  }, [reload]);

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

        <div className="mb-40 grid gap-y-4 lg:grid-cols-3 lg:gap-x-6">
          {(loading || isEmpty) && waiting}
          {!isEmpty &&
            !loading &&
            categories.map((item) => <CategoryCard key={item.id} category={item} openModal={openModal} />)}
        </div>
      </AdminLayout>

      <ModalForm onClose={closeModal} opened={modalOpened} />
      <PlusButtom onClick={openModal} />
    </>
  );
};

export default withAuth(CategoriesPage);

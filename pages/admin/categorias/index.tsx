import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { getAllCategories } from 'store/reducers/CategoryReducer/actionCreators';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import AdminLayout from 'components/Layouts/AdminLayout';
import PlusButtom from 'components/PlusButton';
import ModalForm from 'components/CategoryPage/CategoryModalForm';
import LayoutHeader from 'components/LayoutHeader';
import CategoryCard from 'components/CategoryPage/CategoryCard';
import withAuth from 'utils/withAuth';

const CategoriesPage: NextPage = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { loading, storeLoading, categories, reload } = useAppSelector(({ CategoryReducer }) => CategoryReducer);

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

  const categoryCards = categories.map((item) => <CategoryCard key={item.id} category={item} />);

  return (
    <>
      <AdminLayout title="Categorías">
        <LayoutHeader>Listado de categorías</LayoutHeader>

        <div className="mb-40 flex flex-col gap-2">
          {(loading || isEmpty) && waiting}
          {!isEmpty && !loading && categoryCards}
        </div>
      </AdminLayout>

      <ModalForm onClose={closeModal} opened={modalOpened} />
      <PlusButtom onClick={() => setModalOpened(true)} />
    </>
  );
};

export default withAuth(CategoriesPage);

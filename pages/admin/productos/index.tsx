import axios from 'axios';
import { toast } from 'react-toastify';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  IAllCategoriesResponse,
  IAllOptionsetsResponse,
  IAllProductsResponse,
  ICategory,
  IOptionSet,
  IProduct,
  IProductOptionSet,
} from 'store/reducers/interfaces';

import AdminLayout from 'components/Layouts/AdminLayout';
import LayoutHeader from 'components/LayoutHeader';
import PlusButtom from 'components/PlusButton';
import { Modal } from '@mantine/core';
import ProductForm from 'components/Products/ProductForm';
import ProductCard from 'components/Products/ProductCard';
import UpdateForm from 'components/Products/UpdateForm';
import OptionSetCard from 'components/Products/OptionSetCard';
import CategorySelector from 'components/Products/CategorySelector';

const ProductsPage: NextPage = () => {
  const apiUrl = '/products';
  //-----------------------------------------------------------------
  // STATE
  //-----------------------------------------------------------------
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [optionSets, setOptionSets] = useState<IOptionSet[]>([]);
  const [filterProducts, setFilterProducts] = useState<IProduct[]>([]);
  const [productToUpdate, setProductToUpdate] = useState<IProduct | null>(null);
  const [optionSetToUpdate, setOptionSetToUpdate] = useState<IProductOptionSet | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [modalOpened, setModalOpened] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [optionSetUpdated, setOptionSetUpdated] = useState(false);

  const [storeForm, setStoreForm] = useState(true);
  const [updateForm, setUpdateForm] = useState(false);
  const [optionForm, setOptionForm] = useState(false);

  //-----------------------------------------------------------------
  // METHODS
  //-----------------------------------------------------------------
  const updateFilter = (productList: IProduct[] = []) => {
    if (categoryId) {
      const filter = productList.filter((p) => p.category && p.category.id === categoryId);
      setFilterProducts(filter);
    } else {
      setFilterProducts(productList);
    }
  };
  const getProducts = async (): Promise<void> => {
    try {
      const res = await axios.get(apiUrl);
      if (res.data.ok) {
        setProducts(res.data.products);
        updateFilter(res.data.products);
      }
    } catch (_error) {
      toast.error('No se pudo recuperar los productos');
    }
  };

  const fetchData = async (): Promise<void> => {
    const api = process.env.NEXT_PUBLIC_URL_API;

    const [categoryResponse, optionSetResponse, productResponse] = await Promise.all([
      axios.get<IAllCategoriesResponse>(`${api}/product-categories`),
      axios.get<IAllOptionsetsResponse>(`${api}/option-sets`),
      axios.get<IAllProductsResponse>(`${api}/products`),
    ]);

    if (categoryResponse && categoryResponse.data) {
      setCategories(categoryResponse.data.categories);
    }

    if (optionSetResponse && optionSetResponse.data && optionSetResponse.data.ok) {
      setOptionSets(optionSetResponse.data.optionSets);
    }

    if (productResponse && productResponse.data && productResponse.data.ok) {
      setProducts(productResponse.data.products);
      updateFilter(productResponse.data.products);
    }
  };

  const openModal = (): void => {
    setModalOpened(true);
  };

  const closeModal = (): void => {
    if (!storeLoading && !updateLoading) {
      setModalOpened(false);
      if (optionSetUpdated) getProducts();
      setTimeout(() => {
        setProductToUpdate(null);
        setOptionSetToUpdate(null);

        setStoreForm(true);
        setUpdateForm(false);
        setOptionForm(false);
        setOptionSetUpdated(false);
      }, 200);
    }
  };

  const removeProduct = (id: string): void => {
    const filter = products.filter((item) => item.id !== id);
    setProducts([...filter]);
    updateFilter(filter);
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      setDeleteLoading(id);
      const product = products.find((item) => item.id === id);
      const url = `${apiUrl}/${id}`;
      const res = await axios.delete(url);
      if (res.data.ok) {
        toast.success(`Producto ${product?.name} eliminado`);
        removeProduct(id);
      }
    } catch (_error) {
      toast.error('No se pudo eliminar el producto.');
    } finally {
      setDeleteLoading('');
    }
  };

  const updateProduct = (product: IProduct): void => {
    setProductToUpdate(product);
    setStoreForm(false);
    setUpdateForm(true);
    openModal();
  };

  const updateOptionSet = (product: IProduct, optionSet: IProductOptionSet): void => {
    setProductToUpdate(product);
    setOptionSetToUpdate(optionSet);
    setStoreForm(false);
    setOptionForm(true);
    openModal();
  };

  const onOptionSetUpdatedHandler = () => {
    setOptionSetUpdated(true);
  };

  useEffect(() => {
    if (categoryId) {
      const filter = products.filter((p) => p.category && p.category.id === categoryId);
      setFilterProducts(filter);
    } else {
      setFilterProducts(products);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchData();
  }, []);

  //-----------------------------------------------------------------
  // RENDER
  //-----------------------------------------------------------------

  return (
    <>
      <AdminLayout title="Productos">
        <LayoutHeader>Listado de productos</LayoutHeader>

        <CategorySelector categories={categories} value={categoryId} setValue={setCategoryId} />

        <div className="grid gap-y-4 lg:grid-cols-3 lg:gap-x-6">
          {filterProducts.map((item) => (
            <ProductCard
              product={item}
              deleteLoading={deleteLoading}
              key={item.id}
              onDelete={deleteProduct}
              onUpdate={updateProduct}
              onUpdateOptionSet={updateOptionSet}
            />
          ))}
        </div>

        <div>{products.length}</div>
      </AdminLayout>

      <Modal opened={modalOpened} onClose={closeModal}>
        {storeForm && (
          <ProductForm
            loading={storeLoading}
            setLoading={setStoreLoading}
            apiUrl={apiUrl}
            onCloseModal={closeModal}
            categories={categories}
            optionSets={optionSets}
            onSuccess={getProducts}
          />
        )}

        {updateForm && productToUpdate && (
          <UpdateForm
            product={productToUpdate}
            loading={updateLoading}
            setLoading={setUpdateLoading}
            apiUrl={apiUrl}
            onCloseModal={closeModal}
            categories={categories}
            onSuccess={getProducts}
          />
        )}

        {optionForm && productToUpdate && optionSetToUpdate && (
          <OptionSetCard
            product={productToUpdate}
            optionSet={optionSetToUpdate}
            apiUrl={apiUrl}
            onUpdate={onOptionSetUpdatedHandler}
          />
        )}
      </Modal>

      <PlusButtom onClick={openModal} />
    </>
  );
};

export default ProductsPage;

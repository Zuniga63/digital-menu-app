import axios from 'axios';
import { toast } from 'react-toastify';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import {
  IAllCategoriesResponse,
  IAllOptionsetsResponse,
  IAllProductsResponse,
  ICategory,
  IOptionSet,
  IProduct,
} from 'store/reducers/interfaces';

import AdminLayout from 'components/Layouts/AdminLayout';
import LayoutHeader from 'components/LayoutHeader';
import PlusButtom from 'components/PlusButton';
import { Modal } from '@mantine/core';
import ProductForm from 'components/Products/ProductForm';
import ProductCard from 'components/Products/ProductCard';
import UpdateForm from 'components/Products/UpdateForm';

interface Props {
  categories: ICategory[];
  optionSets: IOptionSet[];
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const categories: ICategory[] = [];
  const optionSets: IOptionSet[] = [];
  const products: IProduct[] = [];

  try {
    const categoryRes = await fetch(`${api}/product-categories`);
    const categoryData: IAllCategoriesResponse = await categoryRes.json();
    if (categoryData.ok) {
      categories.push(...categoryData.categories);
    }

    const optionSetsRes = await fetch(`${api}/option-sets`);
    const optionSetsData: IAllOptionsetsResponse = await optionSetsRes.json();
    if (optionSetsData.ok) {
      optionSets.push(...optionSetsData.optionSets);
    }

    const productsRes = await fetch(`${api}/products`);
    const productData: IAllProductsResponse = await productsRes.json();
    if (productData.ok) {
      products.push(...productData.products);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return {
    props: {
      categories,
      optionSets,
      products,
    },
  };
};

const ProductsPage: NextPage<Props> = ({ categories, optionSets, products: productData }: Props) => {
  const apiUrl = '/products';
  //-----------------------------------------------------------------
  // STATE
  //-----------------------------------------------------------------
  const [products, setProducts] = useState(productData);
  const [productToUpdate, setProductToUpdate] = useState<IProduct | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  //-----------------------------------------------------------------
  // METHODS
  //-----------------------------------------------------------------
  const openModal = (): void => {
    setModalOpened(true);
  };

  const getProducts = async (): Promise<void> => {
    try {
      const res = await axios.get(apiUrl);
      if (res.data.ok) {
        setProducts(res.data.products);
      }
    } catch (_error) {
      toast.error('No se pudo recuperar los productos');
    }
  };

  const closeModal = (): void => {
    if (!storeLoading && !updateLoading) {
      setModalOpened(false);
      setTimeout(() => {
        setProductToUpdate(null);
      }, 200);
    }
  };

  const removeProduct = (id: string): void => {
    const filter = products.filter((item) => item.id !== id);
    setProducts([...filter]);
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

  const mountProduct = (product: IProduct): void => {
    setProductToUpdate(product);
    openModal();
  };

  //-----------------------------------------------------------------
  // RENDER
  //-----------------------------------------------------------------

  return (
    <>
      <AdminLayout title="Productos">
        <LayoutHeader>Listado de productos</LayoutHeader>
        <div className="flex flex-col gap-y-4">
          {products.map((item) => (
            <ProductCard
              product={item}
              deleteLoading={deleteLoading}
              key={item.id}
              onDelete={deleteProduct}
              onUpdate={mountProduct}
            />
          ))}
        </div>
      </AdminLayout>

      <Modal opened={modalOpened} onClose={closeModal}>
        {!productToUpdate ? (
          <ProductForm
            loading={storeLoading}
            setLoading={setStoreLoading}
            apiUrl={apiUrl}
            onCloseModal={closeModal}
            categories={categories}
            optionSets={optionSets}
            onSuccess={getProducts}
          />
        ) : (
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
      </Modal>

      <PlusButtom onClick={openModal} />
    </>
  );
};

export default ProductsPage;

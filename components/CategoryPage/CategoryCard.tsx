import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ICategory } from 'store/reducers/interfaces';
import { Photo, Package, Eye, Trash } from 'tabler-icons-react';
import { Switch, Loader, Button } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toast } from 'react-toastify';
import { deleteCategory } from 'store/reducers/CategoryReducer/actionCreators';

interface Props {
  category: ICategory;
}

export default function CategoryCard({ category }: Props) {
  const { image } = category;
  const [stateLoading, setStateLoading] = useState(false);

  // ---------------------------------------------------
  // Store
  // ---------------------------------------------------
  const dispatch = useAppDispatch();
  const { deleteLoading, deleteIsSuccess, deleteError } = useAppSelector(
    ({ CategoryReducer }) => CategoryReducer
  );

  // ---------------------------------------------------
  // REACT NODE
  // ---------------------------------------------------
  const description = (
    <span className="text-gray-600">{category.description}</span>
  );
  const noDescription = (
    <span className="italic text-gray-400">No tiene descripción.</span>
  );

  const switchLabel = !stateLoading ? (
    <Eye className="text-gray-500" />
  ) : (
    <Loader size={24} />
  );

  // ---------------------------------------------------
  // MENTHODS
  // ---------------------------------------------------
  const changeState = (): void => {
    setStateLoading((current) => current);
  };

  const destroy = (): void => {
    dispatch(deleteCategory(category.id));
  };

  // ---------------------------------------------------
  // USE EFFECTS
  // ---------------------------------------------------

  useEffect(() => {
    if (deleteLoading === category.id) {
      if (deleteIsSuccess) {
        const message = `La categoría ${category.name} fue eleiminada`;
        toast.success(message);
      } else if (deleteError) {
        toast.error(deleteError);
      }
    }
  }, [deleteIsSuccess, deleteError, deleteLoading]);

  return (
    <div className="relative rounded border bg-white px-4 py-6 shadow-md">
      <div className="mb-4 grid grid-cols-3 gap-x-4">
        <div className="flex flex-col items-center">
          <figure className="relative mb-2 block aspect-square w-full">
            {image ? (
              <Image src={image.url} alt={category.name} layout="fill" />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded text-gray-500 ring-2 ring-gray-400">
                <Photo size={40} />
              </div>
            )}
          </figure>
          <div className="">
            <Switch
              label={switchLabel}
              readOnly
              checked={category.isEnabled}
              onClick={changeState}
              disabled={deleteLoading === category.id}
            />
          </div>
        </div>

        <div className="col-span-2">
          <header className="mb-2 border-b-4 border-double border-gray-700 ">
            <h3 className="text-center text-lg font-bold tracking-widest text-gray-800">
              {category.name}
            </h3>
          </header>
          <div className="mb-2 min-h-[40px]">
            <p className="text-sm">
              {category.description ? description : noDescription}
            </p>
          </div>
          <div className="flex justify-start">
            <div className="flex gap-2 rounded-full bg-cyan-200 py-1 px-3 text-gray-700">
              <Package /> <span>{category.products.length}</span>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-end px-5">
        <Button
          leftIcon={<Trash size={16} />}
          color="red"
          size="xs"
          loading={deleteLoading === category.id}
          onClick={destroy}
        >
          Eliminar
        </Button>
      </footer>
    </div>
  );
}

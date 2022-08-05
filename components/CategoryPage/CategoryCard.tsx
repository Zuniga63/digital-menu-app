import React, { useEffect, useState } from 'react';
import { ICategory } from 'store/reducers/interfaces';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  deleteCategory,
  mountCategoryToStore,
  updateCategoryState,
} from 'store/reducers/CategoryReducer/actionCreators';

import Image from 'next/image';
import { Photo, Package, Eye, Trash, EyeOff, Edit } from 'tabler-icons-react';
import { Switch, Button } from '@mantine/core';
import { toast } from 'react-toastify';

interface Props {
  category: ICategory;
  openModal?(): void;
}

export default function CategoryCard({ category, openModal }: Props) {
  const { image } = category;
  const [stateLoading, setStateLoading] = useState(false);

  // ---------------------------------------------------
  // Store
  // ---------------------------------------------------
  const dispatch = useAppDispatch();
  const { deleteLoading, deleteIsSuccess, deleteError, updatingState } = useAppSelector(
    ({ CategoryReducer }) => CategoryReducer
  );

  // ---------------------------------------------------
  // REACT NODE
  // ---------------------------------------------------
  const description = <span className="text-gray-600">{category.description}</span>;
  const noDescription = <span className="italic text-gray-400">No tiene descripción.</span>;

  const switchLabel = category.isEnabled ? <Eye className="text-blue-500" /> : <EyeOff className="text-gray-400" />;

  // ---------------------------------------------------
  // MENTHODS
  // ---------------------------------------------------
  const changeState = (): void => {
    if (!stateLoading) {
      dispatch(updateCategoryState(category.id, !category.isEnabled));
    }
  };

  const destroy = (): void => {
    dispatch(deleteCategory(category.id));
  };

  const update = () => {
    if (openModal) openModal();
    dispatch(mountCategoryToStore(category));
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

  useEffect(() => {
    if (updatingState === category.id) {
      setStateLoading(true);
    } else {
      setStateLoading(false);
    }
  }, [updatingState]);

  return (
    <div className="relative rounded border bg-white px-4 py-6 shadow-md">
      <div className="mb-4 grid grid-cols-3 gap-x-4">
        <div className="flex flex-col items-center">
          <figure className="relative mb-3 block aspect-square w-full overflow-hidden rounded shadow-md shadow-gray-600 ">
            {image ? (
              <Image src={image.url} alt={category.name} layout="fill" objectFit="cover" />
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
              disabled={deleteLoading === category.id || updatingState === category.id}
            />
          </div>
        </div>

        <div className="col-span-2">
          <header className="mb-2 border-b-4 border-double border-gray-700 ">
            <h3 className="text-center text-lg font-bold tracking-widest text-gray-800">{category.name}</h3>
          </header>
          <div className="mb-2 min-h-[40px]">
            <p className="text-sm">{category.description ? description : noDescription}</p>
          </div>
          <div className="flex justify-start">
            <div className="flex gap-2 rounded-full bg-cyan-200 py-1 px-3 text-gray-700">
              <Package /> <span>{category.products.length}</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex justify-between px-2">
        <Button leftIcon={<Edit size={16} />} size="xs" loading={deleteLoading === category.id} onClick={update}>
          Actualizar
        </Button>

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

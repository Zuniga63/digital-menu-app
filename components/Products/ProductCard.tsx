import React, { useState } from 'react';
import { IProduct } from 'store/reducers/interfaces';

import Image from 'next/image';
import { Photo, Category, Eye, Trash, List } from 'tabler-icons-react';
import { Switch, Loader, Button } from '@mantine/core';

interface Props {
  product: IProduct;
  deleteLoading: string;
  onDelete?(id: string): Promise<void>;
}

export default function ProductCard({ product, deleteLoading, onDelete }: Props) {
  const { image } = product;

  // ---------------------------------------------------
  // STATE
  // ---------------------------------------------------
  const [stateLoading, setStateLoading] = useState(false);

  // ---------------------------------------------------
  // REACT NODES
  // ---------------------------------------------------
  const description = <span className="text-gray-600">{product.description}</span>;
  const noDescription = <span className="italic text-gray-400">No tiene descripción.</span>;
  const switchLabel = !stateLoading ? <Eye className="text-gray-500" /> : <Loader size={24} />;

  // ---------------------------------------------------
  // MENTHODS
  // ---------------------------------------------------
  const changeState = (): void => {
    setStateLoading((current) => current);
  };

  const destroy = (): void => {
    if (onDelete) onDelete(product.id);
  };

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------

  return (
    <div className="relative rounded border bg-white px-4 py-6 shadow-md">
      <div className="mb-4 grid grid-cols-3 gap-x-4">
        <div className="flex flex-col items-center">
          <figure className="relative mb-2 block aspect-square w-full">
            {image ? (
              <Image src={image.url} alt={product.name} layout="fill" />
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
              checked={product.published}
              onClick={changeState}
              disabled={deleteLoading === product.id}
            />
          </div>
        </div>

        <div className="col-span-2">
          <header className="mb-2 border-b-4 border-double border-gray-700 ">
            <h3 className="text-center text-lg font-bold tracking-widest text-gray-800">{product.name}</h3>
          </header>
          <div className="mb-2 min-h-[40px]">
            <p className="text-sm">{product.description ? description : noDescription}</p>
          </div>
        </div>

        {product.category && (
          <div className="col-span-3 mt-3">
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-full bg-cyan-200 py-1 px-3 text-gray-700">
                <Category size={16} /> <span className="text-xs font-bold tracking-wide">{product.category.name}</span>
              </div>
            </div>
          </div>
        )}

        {!!product.optionSets?.length && (
          <div className="col-span-3 mt-3">
            <div className="flex justify-start">
              {product.optionSets.map((item) => (
                <div className="flex items-center gap-2 rounded-full bg-blue-400 py-1 px-3 text-gray-700" key={item.id}>
                  <List size={16} /> <span className="text-xs font-bold tracking-wide">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="flex justify-end px-5">
        <Button
          leftIcon={<Trash size={16} />}
          color="red"
          size="xs"
          loading={deleteLoading === product.id}
          onClick={destroy}
        >
          Eliminar
        </Button>
      </footer>
    </div>
  );
}
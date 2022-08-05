import React, { useState } from 'react';
import { IProduct, IProductOptionSet } from 'store/reducers/interfaces';

import Image from 'next/image';
import { Photo, Category, Eye, Trash, List, Edit } from 'tabler-icons-react';
import { Switch, Loader, Button } from '@mantine/core';

interface Props {
  product: IProduct;
  deleteLoading: string;
  onDelete?(id: string): Promise<void>;
  onUpdate(product: IProduct): void;
  onUpdateOptionSet(product: IProduct, optionSet: IProductOptionSet): void;
}

export default function ProductCard({ product, deleteLoading, onDelete, onUpdate, onUpdateOptionSet }: Props) {
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
  const update = (): void => {
    if (onUpdate) onUpdate(product);
  };

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------

  return (
    <div className="relative rounded border bg-white px-4 py-6 shadow-md">
      <div className="mb-4 grid grid-cols-3 gap-x-4">
        <div className="flex flex-col items-center">
          <figure className="relative mb-2 block aspect-square w-full overflow-hidden rounded-md shadow shadow-gray-500">
            {image ? (
              <Image src={image.url} alt={product.name} layout="fill" objectFit="cover" />
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
            <p className="mb-2 text-sm">{product.description ? description : noDescription}</p>
            <p className="text-xs italic text-gray-600">
              {!product.views && <span>No se han realizado visualizaciones</span>}
              {product.views === 1 && <span>1 Visita</span>}
              {product.views > 1 && <span> {product.views} Visitas</span>}
            </p>
          </div>
        </div>

        <div className="col-span-3 mt-3">
          <div className="flex gap-x-3">
            {product.category && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-full bg-cyan-200 py-1 px-3 text-gray-700">
                  <Category size={16} />{' '}
                  <span className="text-xs font-bold tracking-wide">{product.category.name}</span>
                </div>
              </div>
            )}

            {!!product.optionSets?.length && (
              <div className="flex justify-start">
                {product.optionSets.map((item) => (
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full bg-blue-400 py-1 px-3 text-gray-700"
                    key={item.id}
                    onClick={() => onUpdateOptionSet(product, item)}
                  >
                    <List size={16} /> <span className="text-xs font-bold tracking-wide">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="flex justify-between px-3">
        <Button leftIcon={<Edit size={16} />} size="xs" loading={deleteLoading === product.id} onClick={update}>
          Actualizar
        </Button>

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

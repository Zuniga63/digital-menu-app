import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import { Drawer } from '@mantine/core';
import { X } from 'tabler-icons-react';
import Image from 'next/image';

import { hideProduct } from 'store/reducers/Home/creators';
import { IImage, IProductOptionSetHome } from 'store/reducers/interfaces';
import currencyFormat from 'utils/currencyFormat';

export default function ProductDrawer() {
  //-------------------------------------------------------
  // STORE and HOOKS
  //-------------------------------------------------------
  const { productDrawerOpened: opened, product } = useAppSelector(({ HomeReducer }) => HomeReducer);
  const dispatch = useAppDispatch();
  const largeScreen = useMediaQuery('(min-width: 768px)');

  //-------------------------------------------------------
  // STATE
  //-------------------------------------------------------
  const [image, setImage] = useState<IImage | undefined>(product?.image);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [base, setBase] = useState(0);
  const [optionSets, setOptionSets] = useState<IProductOptionSetHome[]>([]);

  //-------------------------------------------------------
  // METHODS
  //-------------------------------------------------------

  useEffect(() => {
    if (product?.image) setImage(product.image);
    else setImage(undefined);

    if (product?.hasDiscount && product.price && product.priceWithDiscount) {
      const fraction = 1 - product.priceWithDiscount / product.price;
      const percentage = fraction * 100;
      setDiscountPercentage(Math.round(percentage));
      setBase(product.priceWithDiscount);
      setHasDiscount(true);
    } else {
      setDiscountPercentage(0);
      setHasDiscount(false);
      if (product?.price) setBase(product.price);
    }

    // Se optimizan los sets de opciones
    if (product?.optionSets && product.optionSets.length) {
      const setList = product.optionSets.map((optionSet) => {
        const items = optionSet.items.slice().sort((a, b) => {
          if (a.order > b.order) return 1;
          if (a.order < b.order) return -1;
          return 0;
        });

        return { ...optionSet, items };
      });

      setOptionSets(setList);
    }
  }, [product]);

  const closeDrawer = (): void => {
    dispatch(hideProduct());
  };

  return (
    <Drawer
      opened={opened}
      onClose={closeDrawer}
      padding={0}
      size={largeScreen ? 'lg' : '100%'}
      withCloseButton={false}
      position="right"
    >
      <>
        <header className="top-o sticky flex justify-between bg-dark px-4 py-6 text-light">
          <h2 className="flex-grow text-center font-display text-lg tracking-widest">{product?.name}</h2>
          <button type="button" onClick={closeDrawer} className="flex-grow-0 focus:outline-none">
            <X size={25} />
          </button>
        </header>

        <div className="relative h-full overflow-y-auto bg-gradient-to-b from-dark to-gray-600 pb-40">
          {image && (
            <figure className="block w-full">
              <Image
                src={image.url}
                alt={product?.name}
                width={image.width}
                height={image.height}
                layout="responsive"
              />
            </figure>
          )}
          <div className="px-6 py-8">
            {product?.description && <p className="mb-4 text-lg text-light"> {product?.description} </p>}
            <div className="flex flex-col items-end">
              <p className="font-bold tracking-widest text-light">
                {!!discountPercentage && <span className="text-sm">antes </span>}
                <span className={discountPercentage ? 'text-sm text-gray-400 line-through' : 'text-xl'}>
                  {currencyFormat(product?.price)}
                </span>
              </p>
              {!!discountPercentage && (
                <p className="text-xl font-bold tracking-widest text-light">
                  {currencyFormat(product?.priceWithDiscount)}{' '}
                  <span className="text-sm text-green-500">({discountPercentage} %)</span>
                </p>
              )}
            </div>
          </div>

          {!!optionSets.length &&
            optionSets.map((optionSet) => (
              <div key={optionSet.id} className="w-full px-6 pb-4">
                <div className="rounded shadow">
                  <header className="rounded-t bg-dark px-6 py-4">
                    <h3 className="text-xl font-bold tracking-wider text-yellow-400">{optionSet.title}</h3>
                  </header>
                  <ul className="divide-y divide-slate-400 rounded-b border-x border-b border-dark bg-gradient-to-br from-slate-900 to-slate-400 py-6 px-2">
                    {optionSet.items.map(
                      (item) =>
                        item.published &&
                        item.optionSetItem.isEnabled && (
                          <li key={item.id} className="block px-4 py-2 tracking-wider">
                            <div className="flex items-center gap-x-3">
                              <figure className="block h-16 w-16 flex-shrink-0 flex-grow-0 overflow-hidden rounded-full shadow shadow-yellow-400">
                                {item.optionSetItem.image && (
                                  <Image
                                    src={item.optionSetItem.image.url}
                                    width={item.optionSetItem.image.width}
                                    height={item.optionSetItem.image.height}
                                    layout="responsive"
                                  />
                                )}
                              </figure>
                              <div className="flex-grow">
                                <p className="font-display text-sm text-yellow-400">{item.optionSetItem.name}</p>
                                {hasDiscount && (
                                  <p className="mb-1 text-xs text-gray-200">
                                    antes{' '}
                                    <span className="text-light text-opacity-50 line-through">
                                      {currencyFormat((product?.price || 0) + (item.price || 0))}
                                    </span>
                                  </p>
                                )}
                                <p className="text-sm font-bold text-light">
                                  {currencyFormat(base + (item.price || 0))}
                                </p>
                              </div>
                            </div>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </>
    </Drawer>
  );
}

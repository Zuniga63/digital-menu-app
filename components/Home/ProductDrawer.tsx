import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import { Drawer } from '@mantine/core';
import { X } from 'tabler-icons-react';
import Image from 'next/image';

import { hideProduct } from 'store/reducers/Home/creators';
import { IImage } from 'store/reducers/interfaces';
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

  //-------------------------------------------------------
  // METHODS
  //-------------------------------------------------------

  useEffect(() => {
    if (product?.image) setImage(product.image);
    else setImage(undefined);

    if (product?.hasDiscount && product.price && product.priceWithDiscount) {
      const fraction = product.priceWithDiscount / product.price;
      const percentage = fraction * 100;
      setDiscountPercentage(Math.round(percentage));
    } else {
      setDiscountPercentage(0);
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
        <header className="top-o sticky flex justify-center bg-dark px-4 py-6 text-light">
          <h2 className="font-display text-lg tracking-widest">{product?.name}</h2>
          <button type="button" onClick={closeDrawer} className="absolute right-4">
            <X size={25} />
          </button>
        </header>

        <div className="relative h-full overflow-y-auto bg-gray-dark pb-40">
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
            <p className="mb-4 text-lg text-light"> {product?.description} </p>
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

          {product?.optionSets &&
            product.optionSets.map((optionSet) => (
              <div key={optionSet.id} className="w-full px-6 pb-4">
                <div className="rounded shadow">
                  <header className="rounded-t bg-dark px-4 py-2">
                    <h3 className="text-lg font-bold tracking-wider text-light">{optionSet.title}</h3>
                  </header>
                  <ul className="divide-y divide-white rounded-b border-x border-b border-gray-200 bg-gray-100 bg-opacity-80 py-6 px-2">
                    {optionSet.items.map((item) => (
                      <li
                        key={item.id}
                        className="block bg-gray-400 px-4 py-2 text-lg font-bold tracking-widest text-gray-dark"
                      >
                        {item.optionSetItem.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </>
    </Drawer>
  );
}

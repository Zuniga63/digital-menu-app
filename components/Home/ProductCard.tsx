import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProductHome } from 'store/reducers/interfaces';
import { List, Photo } from 'tabler-icons-react';

interface Props {
  product: IProductHome;
  imagePriority?: boolean;
}
export default function ProductCard({ product, imagePriority }: Props) {
  const { image, price, hasDiscount, priceWithDiscount } = product;
  const [percentage, setPercentage] = useState('');

  useEffect(() => {
    if (hasDiscount && price && priceWithDiscount) {
      const fraction = Math.round(1 - priceWithDiscount / price);
      setPercentage(`${fraction * 100}% DCT`);
    }
  }, []);

  return (
    <div
      className="product relative grid grid-cols-auto-fr gap-3 border-b border-gray-500 pt-8 pb-4 pr-4 pl-2 md:rounded md:border-none md:shadow md:shadow-gray-400"
      key={product.id}
    >
      <figure className="product__fig  relative z-0 m-0 h-24 w-24 overflow-hidden rounded-lg border border-gray-500">
        {image ? (
          <Image src={image.url} alt={product.name} layout="fill" priority={imagePriority} />
        ) : (
          <div className="flex aspect-square items-center justify-center rounded text-gray-500 ring-2 ring-gray-400">
            <Photo size={40} />
          </div>
        )}
      </figure>

      <div className="text-dark">
        <h4 className="mb-1 border-b-4 border-double border-gray-400 font-display text-sm font-normal">
          {product.name}
        </h4>
        <p className="product__description w-full text-xs">{product.description}</p>
        <p className="mt-2 flex flex-col font-black tracking-widest text-gray-dark">
          <span className={percentage && ' inline-block text-xs text-gray-400 line-through'}>{price}</span>
          {percentage && (
            <div className="flex gap-2">
              <span className="text-sm font-bold">{priceWithDiscount}</span>
              <span className=" text-xs text-green-700 ">({percentage})</span>
            </div>
          )}
        </p>
        {!!product?.optionSets?.length && (
          <div className="flex justify-start">
            <div className="relative -left-4 scale-75 transform rounded border border-green-900 bg-green-800 p-1 text-xs font-black tracking-widest text-light shadow-new-tag">
              <List size={16} className="inline-block" /> Tiene opciones.{' '}
            </div>
          </div>
        )}
      </div>
      {product.isNew && (
        <div className="absolute top-2 right-2 scale-75 transform rounded border border-red-700 bg-red-600 p-1 text-xs font-black tracking-widest text-light shadow-new-tag">
          New
        </div>
      )}
    </div>
  );
}

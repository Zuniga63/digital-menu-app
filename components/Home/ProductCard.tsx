import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProductHome } from 'store/reducers/interfaces';
import { List } from 'tabler-icons-react';
import { useAppDispatch } from 'store/hooks';
import { showProduct } from 'store/reducers/Home/creators';

interface Props {
  product: IProductHome;
  imagePriority?: boolean;
}
export default function ProductCard({ product, imagePriority }: Props) {
  const { image, price, hasDiscount, priceWithDiscount } = product;
  const [percentage, setPercentage] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasDiscount && price && priceWithDiscount) {
      const fraction = Math.round(1 - priceWithDiscount / price);
      setPercentage(`${fraction * 100}% DCT`);
    }
  }, []);

  return (
    <div
      className="product relative grid grid-cols-auto-fr gap-3 border-b border-gray-500 pt-8 pb-4 pr-4 pl-4 md:rounded md:border-none md:shadow md:shadow-gray-400"
      key={product.id}
      onClick={() => dispatch(showProduct(product))}
      role="presentation"
    >
      {image && (
        <figure className="product__fig  relative z-0 m-0 h-24 w-24 overflow-hidden rounded-lg border border-gray-500">
          <Image src={image.url} alt={product.name} layout="fill" priority={imagePriority} />
        </figure>
      )}

      <div className={image ? 'text-dark' : 'col-span-2 text-dark'}>
        <h4 className="mb-1 border-b-4 border-double border-gray-400 font-display text-sm font-normal">
          {product.name}
        </h4>
        <p className="product__description w-full text-xs">{product.description}</p>
        <p className="mt-2 font-black tracking-widest text-gray-dark">
          <span className={percentage && ' inline-block text-xs text-gray-400 line-through'}>{price}</span>
        </p>
        {percentage && (
          <p className="flex gap-2 font-black tracking-widest text-gray-dark">
            <span className="text-sm font-bold">{priceWithDiscount}</span>
            <span className=" text-xs text-green-700 ">({percentage})</span>
          </p>
        )}
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

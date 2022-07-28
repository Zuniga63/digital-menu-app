import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProductHome } from 'store/reducers/interfaces';
import { List } from 'tabler-icons-react';
import { useAppDispatch } from 'store/hooks';
import { showProduct } from 'store/reducers/Home/creators';
import currencyFormat from 'utils/currencyFormat';

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
      const fraction = Math.round((1 - priceWithDiscount / price) * 100);
      setPercentage(`${fraction}% DCT`);
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
          <Image src={image.url} alt={product.name} layout="fill" objectFit="cover" priority={imagePriority} />
        </figure>
      )}

      <div className={image ? 'text-light' : 'col-span-2 text-light'}>
        <h4 className="mb-1 border-b-4 border-double border-light pb-1 font-display text-sm font-normal tracking-wider">
          {product.name}
        </h4>
        {product.description && (
          <p className="product__description w-full text-sm leading-normal line-clamp-2">{product.description}</p>
        )}
        <p className="mt-2 font-black tracking-widest text-light">
          <span className={percentage && ' inline-block text-xs text-light text-opacity-50 line-through'}>
            {currencyFormat(price)}
          </span>
        </p>
        {percentage && (
          <p className="flex gap-2 font-black tracking-widest text-light">
            <span className="text-sm font-bold">{currencyFormat(priceWithDiscount)}</span>
            <span className=" scale-75 text-xs text-green-600">({percentage})</span>
          </p>
        )}
      </div>
      {!!product?.optionSets?.length && (
        <div className="col-span-2">
          <div className="flex justify-start">
            <div className="relative -left-4 scale-75 transform rounded border border-green-900 bg-green-800 p-1 text-xs font-black tracking-widest text-light shadow-new-tag">
              <List size={16} className="inline-block" /> Tiene opciones.{' '}
            </div>
          </div>
        </div>
      )}
      {product.isNew && (
        <div className="absolute top-2 right-2 scale-75 transform rounded border border-red-700 bg-red-600 p-1 text-xs font-black tracking-widest text-light shadow-new-tag">
          New
        </div>
      )}
    </div>
  );
}

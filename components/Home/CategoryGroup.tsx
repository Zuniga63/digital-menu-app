import React from 'react';
import { ICategoryHome } from 'store/reducers/interfaces';

import Image from 'next/image';
import ProductCard from './ProductCard';

interface Props {
  category: ICategoryHome;
  imagePriority?: boolean;
}
export default function CategoryGroup({ category, imagePriority }: Props) {
  const { image } = category;

  return (
    <section>
      <header className="flex gap-3 bg-gray-dark p-4 text-gray-100">
        {image && (
          <figure className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-dark">
            <Image src={image.url} alt={category.name} layout="fill" priority={imagePriority} />
          </figure>
        )}
        <div>
          <h3 className="font-hand text-3xl font-black">{category.name}</h3>
          {category.description && <p className="mt-2 text-sm font-medium tracking-wider"> {category.description} </p>}
        </div>
      </header>
      <div className="grid bg-gray-100 md:grid-cols-2 md:gap-4 md:px-4 md:py-2">
        {category.products.map((item, index) => (
          <ProductCard product={item} imagePriority={index <= 3} key={item.id} />
        ))}
      </div>
    </section>
  );
}

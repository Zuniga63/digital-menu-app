import React, { useEffect, useState } from 'react';
import { ICategoryHome, IImage, IProductHome } from 'store/reducers/interfaces';

import Image from 'next/image';
import ProductCard from './ProductCard';

interface Props {
  category: ICategoryHome;
  imagePriority?: boolean;
  imageClickHandler(image: IImage): void;
}
export default function CategoryGroup({ category, imagePriority, imageClickHandler }: Props) {
  const { image, products } = category;
  const [productList, setProductList] = useState<IProductHome[]>(products);

  useEffect(() => {
    setProductList(products.filter((p) => p.published));
  }, []);

  return category.isEnabled && productList.length ? (
    <section>
      <header className="flex items-start gap-3 bg-gray-dark p-4 text-gray-100">
        {image && (
          <figure
            className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-dark"
            onClick={() => imageClickHandler(image)}
            role="presentation"
          >
            <Image src={image.url} alt={category.name} layout="fill" priority={imagePriority} />
          </figure>
        )}
        <div>
          <h3 className="font-hand text-3xl font-black">{category.name}</h3>
          {category.description && <p className="mt-2 text-sm font-medium tracking-wider"> {category.description} </p>}
        </div>
      </header>
      <div className="grid bg-gray-800 bg-opacity-20 backdrop-blur md:grid-cols-2 md:gap-4 md:px-4 md:py-2">
        {productList.map((item, index) => (
          <ProductCard product={item} imagePriority={index <= 3} key={item.id} />
        ))}
      </div>
    </section>
  ) : null;
}

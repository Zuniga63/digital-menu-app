import React from 'react';
import { ICategoryHome } from 'store/reducers/interfaces';
import CategoryGroup from './CategoryGroup';

interface Props {
  categories: ICategoryHome[];
}
export default function CategoryList({ categories }: Props) {
  return (
    <>
      <div className="mx-auto mb-20 mt-10 w-11/12">
        <h2 className=" rounded-md bg-gray-dark py-2 px-4 text-center font-display text-lg font-normal uppercase tracking-widest text-light shadow-light-neon">
          Carta digital
        </h2>
      </div>

      {categories.map((item, index) =>
        item.products ? <CategoryGroup key={item.id} category={item} imagePriority={index === 1} /> : null
      )}
    </>
  );
}

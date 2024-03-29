import React, { useEffect, useState } from 'react';

import { IProduct, IProductOptionSet } from 'store/reducers/interfaces';
import OptionSetItemCard from './OptionSetItemCard';

interface Props {
  product: IProduct;
  optionSet: IProductOptionSet;
  apiUrl: string;
  onUpdate(): void;
}

export default function OptionSetCard({ product, optionSet, apiUrl, onUpdate }: Props) {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(`${apiUrl}/${product.id}/option-sets/${optionSet.id}/items`);
  }, [product]);

  return (
    <>
      <header className="-mt-6 mb-4 border-b-4 border-double border-gray-600 pb-2">
        <h2 className="text-center text-xl font-bold text-gray-800">Set de {optionSet.title}</h2>
        <p className="text-center text-sm text-gray-600">{product.name}</p>
      </header>

      <div className="flex max-h-96 flex-col gap-y-4 overflow-y-auto">
        {optionSet.items.map((item) => (
          <OptionSetItemCard key={item.id} item={item} baseUrl={baseUrl} success={onUpdate} />
        ))}
      </div>
    </>
  );
}

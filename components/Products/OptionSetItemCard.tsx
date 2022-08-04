import React, { useEffect, useState, ChangeEvent } from 'react';
import { IProductOptionItem } from 'store/reducers/interfaces';

import { Checkbox, NumberInput, Button } from '@mantine/core';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  item: IProductOptionItem;
  baseUrl: string;
  success(): void;
}

interface SuccessResponse {
  ok: boolean;
  productOptionSet: any;
}

export default function OptionSetItemCard({ item, baseUrl, success }: Props) {
  const [localItem, setLocalItem] = useState(item);
  const [price, setPrice] = useState<number | undefined>(item.price);
  const [published, setPublished] = useState(item.published);
  const [loading, setLoading] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currencyFormater = (value: string | undefined): string => {
    if (value) {
      return !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ';
    }

    return '$ ';
  };

  const currencyParser = (value: string | undefined): string | undefined => {
    if (value) return value.replace(/\$\s?|(,*)/g, '');
    return undefined;
  };

  const onClickHandler = async () => {
    const url = `${baseUrl}/${item.id}`;
    const data = { price, published };

    try {
      setLoading(true);
      const res = await axios.put(url, data);
      const { ok }: SuccessResponse = res.data;
      if (ok) {
        setLocalItem((current) => ({ ...current, price: data.price, published: !!data.published }));
        setIsSuccess(true);
        success();
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPrice(item.price);
    setPublished(item.published);
    setLocalItem(item);
  }, [item]);

  useEffect(() => {
    setCanUpdate(price !== localItem.price || published !== localItem.published);
  }, [price, published, localItem.price, localItem.published]);

  return (
    <div className="rounded bg-indigo-400 px-4 py-2 shadow-md shadow-gray-400">
      <div className="mb-2">
        <NumberInput
          label={item.optionSetItem.name}
          placeholder="Ingresa el precio aquí."
          value={price}
          onChange={(value) => setPrice(!Number.isNaN(value) ? value : undefined)}
          hideControls
          min={100}
          step={100}
          parser={currencyParser}
          size="xs"
          formatter={currencyFormater}
          disabled={loading}
          className="mb-2"
        />
        <Checkbox
          label="Publicar"
          checked={published}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPublished(e.currentTarget.checked)}
          disabled={loading}
        />
      </div>

      <div className="flex items-center justify-end">
        {isSuccess && <p className="mr-2 text-xs font-bold text-green-400">¡Item actualizado!</p>}
        <Button
          size="xs"
          loading={loading}
          onClick={onClickHandler}
          className="transition-colors duration-200"
          disabled={!canUpdate}
        >
          Actualizar
        </Button>
      </div>
    </div>
  );
}

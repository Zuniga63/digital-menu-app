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
    <div className="rounded-md bg-dark px-4 py-3 shadow-md shadow-gray-600">
      <NumberInput
        label={<span className="text-sm text-light">{item.optionSetItem.name}</span>}
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
      <div className="flex items-center justify-between">
        <Checkbox
          label={<span className="text-light">Publicar</span>}
          checked={published}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPublished(e.currentTarget.checked)}
          disabled={loading}
        />
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
      {isSuccess && <p className="mt-2 text-xs font-bold text-green-400">¡Item actualizado!</p>}
    </div>
  );
}

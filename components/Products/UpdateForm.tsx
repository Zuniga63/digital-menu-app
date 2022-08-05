import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';

import CustomForm from 'components/CustomForm';
import { Edit, Trash } from 'tabler-icons-react';
import Image from 'next/image';
import { InputWrapper, Input, Textarea, Checkbox, Select, SelectItem, NumberInput } from '@mantine/core';
import CustomImageDropzone from 'components/CustomImageDropzone';
import { ICategory, IProduct } from 'store/reducers/interfaces';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Props {
  product?: IProduct;
  loading: boolean;
  apiUrl: string;
  categories: ICategory[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  onCloseModal?(): void;
  onSuccess(): void;
}

export default function UpdateForm({
  product,
  loading,
  apiUrl,
  setLoading,
  onCloseModal,
  onSuccess,
  categories,
}: Props) {
  //---------------------------------------------------------------------------
  // STATE
  //---------------------------------------------------------------------------
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>('');
  const [price, setPrice] = useState<number | undefined>();
  const [hasDiscount, setHasDiscount] = useState(false);
  const [priceWithDiscount, setPriceWithDiscount] = useState<number | undefined>(undefined);
  const [isNew, setIsNew] = useState(false);
  const [published, setPublished] = useState(true);
  const [errors, setErrors] = useState<any>(null);

  //-----------------------------------------------------------------
  // METHODS
  //-----------------------------------------------------------------
  const getSubmitData = (): FormData => {
    const data = new FormData();

    data.append('name', name);
    data.append('description', description);
    if (image) data.append('image', image);
    data.append('price', String(price));

    if (price && hasDiscount && priceWithDiscount && priceWithDiscount < price) {
      data.append('hasDiscount', String(hasDiscount));
      data.append('priceWithDiscount', String(priceWithDiscount));
    }

    if (categoryId) data.append('categoryId', categoryId);

    data.append('productIsNew', String(isNew));
    data.append('published', String(published));

    return data;
  };

  const resetForm = () => {
    if (!loading && onCloseModal) {
      onCloseModal();
    }
  };

  const onSubmitHandled = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    const data = getSubmitData();

    try {
      if (product) {
        const res = await axios.put(`${apiUrl}/${product.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.ok) {
          onSuccess();
          toast.success('Producto actualizado.');
          resetForm();
        }
      }
    } catch (error: any) {
      const { response } = error;
      if (response) {
        toast.error(response.data.message);
        setErrors(response.data.validationErrors);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (): void => {
    if (!loading) {
      setImage(null);
      setImagePreview('');
    }
  };

  const getCategoryData = (): SelectItem[] => {
    return categories.map((item) => ({ value: item.id, label: item.name }));
  };

  //-----------------------------------------------------------------
  // USE EFECCT
  //-----------------------------------------------------------------
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setImagePreview(product.image?.url || '');
      setPrice(product.price);
      setHasDiscount(product.hasDiscount);
      setPriceWithDiscount(product.priceWithDiscount);
      setIsNew(product.productIsNew);
      setPublished(product.published);
      setCategoryId(product.category?.id || '');
    }
  }, [product]);

  return (
    <CustomForm
      title="Actualizar Producto"
      onCancel={resetForm}
      loading={loading}
      successButtonIcon={<Edit />}
      onSubmit={onSubmitHandled}
      updatingForm
    >
      <>
        {/* Image */}
        {imagePreview ? (
          <div className="relative block h-60 w-full">
            <Image src={imagePreview} layout="fill" className="object-scale-down" />

            <button
              type="button"
              className="absolute top-2 right-2 rounded-full bg-red-200 bg-opacity-40 p-2 text-red-500 active:bg-opacity-80"
              onClick={removeImage}
            >
              <Trash size={20} />
            </button>
          </div>
        ) : (
          <CustomImageDropzone setFile={setImage} setPreview={setImagePreview} />
        )}

        {/* Name */}
        <InputWrapper id="category-name" required label="Nombre" error={errors?.name?.message}>
          <Input
            id="category-name"
            placeholder="Escribelo aquí."
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            disabled={loading}
            invalid={errors?.name}
            required
          />
        </InputWrapper>

        {/* Description */}
        <Textarea
          label="Descripción"
          placeholder="Tu descripción."
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
          disabled={loading}
          error={errors?.description?.message}
        />

        {/* Price */}
        <NumberInput
          label="Precio"
          required
          placeholder="Ingresa el precio aquí."
          hideControls
          min={100}
          step={100}
          value={price}
          onChange={(value) => setPrice(value)}
          error={errors?.price?.message}
          parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) => {
            if (value) {
              return !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ';
            }

            return '$ ';
          }}
        />

        <Checkbox
          label="¿Tiene descuento?"
          checked={hasDiscount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setHasDiscount(e.currentTarget.checked)}
          disabled={loading}
        />

        {hasDiscount && (
          <NumberInput
            label="Precio con descuento"
            required
            placeholder="Ingresa el precio aquí."
            hideControls
            min={100}
            step={100}
            value={priceWithDiscount}
            onChange={(value) => setPriceWithDiscount(value)}
            error={errors?.price?.message}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) => {
              if (value) {
                return !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ';
              }

              return '$ ';
            }}
          />
        )}

        {/* Category */}
        <Select
          label="Categoría"
          data={getCategoryData()}
          disabled={loading}
          value={categoryId}
          onChange={(value) => setCategoryId(value)}
          placeholder="Selecciona una categoría."
          searchable
          clearable
          error={errors?.categoryId?.message}
        />

        <div className="flex justify-between">
          <Checkbox
            label="¿Es nuevo?"
            checked={isNew}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIsNew(e.currentTarget.checked)}
            disabled={loading}
          />

          <Checkbox
            label="¿Publicar?"
            checked={published}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPublished(e.currentTarget.checked)}
            disabled={loading}
          />
        </div>
      </>
    </CustomForm>
  );
}

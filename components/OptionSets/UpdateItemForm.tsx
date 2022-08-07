import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import Image from 'next/image';
import { IOptionItem } from 'store/reducers/interfaces';
import { Edit, Trash } from 'tabler-icons-react';
import CustomForm from 'components/CustomForm';
import { TextInput, Checkbox } from '@mantine/core';
import CustomImageDropzone from '../CustomImageDropzone';

interface Props {
  optionSetItem: IOptionItem;
  apiUrl: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  onCloseModal(): void;
  onSuccess(optionItem: IOptionItem): void;
}

export default function UpdateItemForm({ optionSetItem, apiUrl, loading, setLoading, onCloseModal, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [validations, setValidations] = useState<any>(null);

  const formDataOptions = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  const reset = () => {
    setName('');
    setIsEnabled(false);
    setImage(null);
    setImagePreview('');
  };

  const cancel = () => {
    if (!loading) {
      reset();
      onCloseModal();
    }
  };

  const removeImage = (): void => {
    if (!loading) {
      setImage(null);
      if (optionSetItem.image) setImagePreview(optionSetItem.image.url);
      else setImagePreview('');
    }
  };

  const getData = (): FormData => {
    const form = new FormData();
    form.append('name', name);
    if (image) form.append('image', image);
    if (isEnabled) form.append('isEnabled', 'true');

    return form;
  };

  const onSubmitHandled = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateData = getData();
    const url = `${apiUrl}/${optionSetItem.optionSet}/items/${optionSetItem.id}`;

    try {
      setLoading(true);
      const response = await axios.put(url, updateData, formDataOptions);
      const { ok, optionItem }: { ok: boolean; optionItem: IOptionItem } = response.data;
      if (ok && optionItem) {
        onSuccess(optionItem);
        setTimeout(() => {
          toast.success('¡Item actualizado!');
          cancel();
        }, 200);
      }
    } catch (error: any) {
      const { response } = error;
      if (response) {
        toast.error(response.data.message);
        setValidations(response.data.validationErrors);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (optionSetItem) {
      setName(optionSetItem.name);
      setIsEnabled(optionSetItem.isEnabled);
      if (optionSetItem.image) setImagePreview(optionSetItem.image.url);
    } else {
      reset();
    }
  }, [optionSetItem]);

  return (
    <CustomForm
      title="Registrar Categoría"
      loading={loading}
      onCancel={cancel}
      onSubmit={onSubmitHandled}
      successButtonIcon={<Edit />}
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
        <TextInput
          id="category-name"
          placeholder="Escribelo aquí."
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          disabled={loading}
          label="Nombre"
          description="escriba el nombre de la categoría."
          error={validations?.name?.message}
          required
        />

        {/* Is Enabled */}
        <Checkbox
          label="¿Habilitado?"
          checked={isEnabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIsEnabled(e.currentTarget.checked)}
          className="font-sans"
          classNames={{
            label: 'font-sans',
          }}
          disabled={loading}
        />
      </>
    </CustomForm>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toast } from 'react-toastify';

import { resetStoreState, storeCategory, updateCategory } from 'store/reducers/CategoryReducer/actionCreators';

import Image from 'next/image';
import { TextInput, Textarea, Checkbox } from '@mantine/core';
import { Trash, Database, Edit } from 'tabler-icons-react';
import CustomForm from 'components/CustomForm';
import CustomImageDropzone from '../CustomImageDropzone';

interface Props {
  onCloseModal?(): void;
}
export default function CategoryForm({ onCloseModal }: Props) {
  //-----------------------------------------------------------------------------------------------------------------
  // STATE
  //-----------------------------------------------------------------------------------------------------------------
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [validations, setValidations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  //---------------------------------------------------------------------------
  // STORE
  //---------------------------------------------------------------------------
  const { categoryToUpdate, storeLoading, storeError, storeIsSuccess, updateLoading, updateError, updateIsSuccess } =
    useAppSelector(({ CategoryReducer }) => CategoryReducer);

  const dispatch = useAppDispatch();

  const removeImage = (): void => {
    if (!loading) {
      setImage(null);
      setImagePreview('');
    }
  };

  const resetForm = () => {
    if (!storeLoading || !updateLoading) {
      if (onCloseModal) onCloseModal();
      setTimeout(() => {
        setName('');
        setDescription('');
        setImage(null);
        setImagePreview('');
        setIsEnabled(true);

        dispatch(resetStoreState());
      }, 200);
    }
  };

  const onSubmitHandled = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    if (image) {
      form.append('image', image);
    }
    form.append('isEnabled', JSON.stringify(isEnabled));

    if (isUpdating && categoryToUpdate) {
      dispatch(updateCategory(form, categoryToUpdate.id));
    } else {
      dispatch(storeCategory(form));
    }
  };

  //---------------------------------------------------------------------------
  // USE EFFECTS
  //---------------------------------------------------------------------------
  /**
   * This useEffect is use for mount category to update
   */
  useEffect(() => {
    if (categoryToUpdate) {
      setName(categoryToUpdate.name);
      setDescription(categoryToUpdate.description || '');
      setImagePreview(categoryToUpdate.image?.url || '');
      setIsEnabled(categoryToUpdate.isEnabled);
      setIsUpdating(true);
    }
  }, [categoryToUpdate]);

  useEffect(() => {
    setLoading(storeLoading || updateLoading);
  }, [storeLoading, updateLoading]);

  useEffect(() => {
    let errorValidations = null;
    let message = '';

    if (storeError || updateError) {
      if (storeError) {
        errorValidations = storeError.validationErrors;
        message = storeError.message;
      } else {
        errorValidations = updateError.validationErrors;
        message = updateError.message;
      }
      setValidations(errorValidations);
      toast.error(message);
    }
  }, [storeError, updateError]);

  useEffect(() => {
    if (storeIsSuccess || updateIsSuccess) {
      const message = storeIsSuccess
        ? `La categoría: ${name} fue registrada con éxito.`
        : `La categoría fue actualizada con éxito`;

      toast.success(message);
      resetForm();
    }
  }, [storeIsSuccess, updateIsSuccess]);

  return (
    <CustomForm
      title="Registrar Categoría"
      loading={loading}
      onCancel={resetForm}
      onSubmit={onSubmitHandled}
      successButtonIcon={isUpdating ? <Edit /> : <Database />}
      updatingForm={isUpdating}
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
          required
          label="Nombre"
          description="escriba el nombre de la categoría."
          error={validations?.name?.message}
        />

        {/* Description */}
        <Textarea
          label="Descripción"
          placeholder="Tu descripción."
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
          disabled={loading}
          error={validations?.description?.message}
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

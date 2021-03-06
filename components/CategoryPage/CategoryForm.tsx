/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toast } from 'react-toastify';

import { resetStoreState, storeCategory } from 'store/reducers/CategoryReducer/actionCreators';

import Image from 'next/image';
import { InputWrapper, Input, Textarea, Checkbox } from '@mantine/core';
import { Trash, Database } from 'tabler-icons-react';
import CustomForm from 'components/CustomForm';
import CustomImageDropzone from '../CustomImageDropzone';

interface Props {
  onCloseModal?(): void;
}
export default function CategoryForm({ onCloseModal }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [validations, setValidations] = useState<any>(null);

  const {
    storeLoading: loading,
    storeError: error,
    storeIsSuccess: success,
  } = useAppSelector(({ CategoryReducer }) => CategoryReducer);

  const dispatch = useAppDispatch();

  const removeImage = (): void => {
    if (!loading) {
      setImage(null);
      setImagePreview('');
    }
  };

  const resetForm = () => {
    if (!loading) {
      if (onCloseModal) onCloseModal();
      setName('');
      setDescription('');
      setImage(null);
      setImagePreview('');
      setIsEnabled(true);

      dispatch(resetStoreState());
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

    dispatch(storeCategory(form));
  };

  useEffect(() => {
    if (error) {
      setValidations(error.validationErrors);
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const message = `La categor??a: ${name} fue registrada con ??xito.`;
      toast.success(message);
      resetForm();
    }
  }, [success]);

  return (
    <CustomForm
      title="Registrar Categor??a"
      loading={loading}
      onCancel={resetForm}
      onSubmit={onSubmitHandled}
      successButtonIcon={<Database />}
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
        <InputWrapper
          id="category-name"
          required
          label="Nombre"
          description="escriba el nombre de la categor??a."
          error={validations?.name?.message}
        >
          <Input
            id="category-name"
            placeholder="Escribelo aqu??."
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            disabled={loading}
            invalid={validations?.name}
            required
          />
        </InputWrapper>

        {/* Description */}
        <Textarea
          label="Descripci??n"
          placeholder="Tu descripci??n."
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
          disabled={loading}
          error={validations?.description?.message}
        />

        {/* Is Enabled */}
        <Checkbox
          label="??Habilitado?"
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

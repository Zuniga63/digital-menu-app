import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { IOptionSet } from 'store/reducers/interfaces';
import { Database, Plus } from 'tabler-icons-react';
import CustomForm from 'components/CustomForm';
import { Checkbox, TextInput } from '@mantine/core';
import OptionItemCard from './OptionItemFormCard';

interface Props {
  loading: boolean;
  apiUrl: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  onCloseModal?(): void;
  onSuccess(item: IOptionSet): void;
}

export interface IOptionItem {
  id: number;
  name: string;
  isEnabled: boolean;
}

export default function OptionSetForm({ loading, apiUrl, setLoading, onCloseModal, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);

  const [itemName, setItemName] = useState('');
  const [itemIsEnabled, setItemIsEnabled] = useState(true);
  const [addItemDisabled, setAddItemDisabled] = useState(true);
  const [optionItems, setOptionItems] = useState<IOptionItem[]>([]);

  const [errors, setErrors] = useState<any>(null);

  const resetForm = () => {
    if (!loading && onCloseModal) {
      onCloseModal();
    }
  };

  const addItem = (): void => {
    const item: IOptionItem = {
      id: optionItems.length,
      name: itemName,
      isEnabled: itemIsEnabled,
    };

    setOptionItems((current) => [...current, item]);
    setItemName('');
    setItemIsEnabled(true);
  };

  const removeItem = (id: number): void => {
    const filter = optionItems.filter((item) => item.id !== id);
    setOptionItems([...filter]);
  };

  const onSubmitHandled = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setLoading(true);

      if (optionItems.length > 0) {
        const optionSetData = {
          name,
          isEnabled,
          items: optionItems,
        };

        const response = await axios.post(apiUrl, optionSetData);
        if (response.data.ok) {
          toast.success('Set de opciones creado.');
          if (response.data.optionSet) {
            onSuccess(response.data.optionSet);
          }
          resetForm();
        }
      } else {
        toast.error('Se debe agregar minimo una opción al set.');
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

  useEffect(() => {
    if (itemName && itemName.length >= 3) setAddItemDisabled(false);
    else setAddItemDisabled(true);
  }, [itemName]);

  return (
    <CustomForm
      title="Registrar Set de Opciones"
      onCancel={resetForm}
      loading={loading}
      successButtonIcon={<Database />}
      onSubmit={onSubmitHandled}
    >
      <>
        {/* Name */}
        <TextInput
          id="category-name"
          label="Nombre del Set"
          placeholder="Escribelo aquí."
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          disabled={loading}
          required
          error={errors?.name?.message}
        />

        {/* isEnabled */}
        <Checkbox
          label="¿Habilitado?"
          checked={isEnabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIsEnabled(e.currentTarget.checked)}
          disabled={loading}
        />

        {/* Items */}
        <div className="rounded-md border border-blue-700 bg-indigo-100 p-2">
          <h2 className="mb-2 text-center text-lg font-bold tracking-wider text-gray-800">Listado de opciones</h2>
          <div className="mb-4 flex items-center justify-between gap-2 rounded bg-indigo-200 bg-opacity-60 p-3 shadow shadow-indigo-400">
            <div className="flex flex-grow flex-col gap-4">
              <TextInput
                label="Nombre de la optción"
                id="category-name"
                placeholder="Escribelo aquí."
                value={itemName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setItemName(e.target.value)}
              />

              <Checkbox
                label="¿Habilitado?"
                checked={itemIsEnabled}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setItemIsEnabled(e.currentTarget.checked)}
                disabled={loading}
              />
            </div>

            <button
              type="button"
              className="rounded-full bg-blue-600 p-3 text-white transition-colors duration-200 disabled:bg-opacity-40"
              disabled={addItemDisabled}
              onClick={addItem}
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>

          <div className="rounded-sm bg-white p-3">
            <ul className="flex h-40 flex-col gap-2 overflow-y-auto">
              {optionItems.map((item) => (
                <OptionItemCard item={item} onRemove={removeItem} key={item.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    </CustomForm>
  );
}

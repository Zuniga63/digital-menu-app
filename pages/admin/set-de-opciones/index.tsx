import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import AdminLayout from 'components/Layouts/AdminLayout';
import LayoutTitle from 'components/LayoutHeader';
import { Modal } from '@mantine/core';
import PlusButtom from 'components/PlusButton';
import CustomForm from 'components/OptionSets/OptionSetForm';
import OptionSetCard from 'components/OptionSets/OptionSetCard';

export interface IOptionItem {
  id: string;
  name: string;
  optionSet: string;
  order: number;
  isEnabled: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IOptionSet {
  id: string;
  name: string;
  items: IOptionItem[];
  isEnabled: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const OptionSetsPage: NextPage = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState('');
  const [optionSets, setOptionSets] = useState<IOptionSet[]>([]);
  const apiUrl = `/option-sets`;

  const openModal = (): void => {
    setModalOpened(true);
  };

  const closeModal = (): void => {
    if (!storeLoading) {
      setModalOpened(false);
    }
  };

  const addOptionSet = (optionSet: IOptionSet): void => {
    setOptionSets((current) => [...current, optionSet]);
  };

  const removeOptionSet = (id: string): void => {
    const filter = optionSets.filter((item) => item.id !== id);
    setOptionSets([...filter]);
  };

  const deleteOptionSet = async (id: string): Promise<void> => {
    try {
      setDeleteLoading(id);
      const url = `${apiUrl}/${id}`;
      const res = await axios.delete(url);
      if (res.data.ok) {
        toast.success('Set de opciones eliminado');
        removeOptionSet(id);
      }
    } catch (_error) {
      toast.error('No se pudo eliminar el set.');
    } finally {
      setDeleteLoading('');
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(apiUrl);
        const { data }: { data: { ok: boolean; optionSets: IOptionSet[] } } = res;
        if (data.ok) {
          if (data.optionSets) {
            setOptionSets([...data.optionSets]);
          }
        }
      } catch (_error: any) {
        toast.error('No se pudieron recuperar los sets.');
      }
    };

    fetch();
  }, []);

  return (
    <>
      <AdminLayout title="Categorías">
        <LayoutTitle>Sets de Opciones</LayoutTitle>

        <div className="flex flex-col gap-y-6 px-4">
          {optionSets.map((item) => (
            <OptionSetCard key={item.id} optionSet={item} deleteLoading={deleteLoading} onDelete={deleteOptionSet} />
          ))}
        </div>
      </AdminLayout>

      <Modal opened={modalOpened} onClose={closeModal}>
        <CustomForm
          loading={storeLoading}
          apiUrl={apiUrl}
          setLoading={setStoreLoading}
          onCloseModal={closeModal}
          onSuccess={addOptionSet}
        />
      </Modal>
      <PlusButtom onClick={openModal} />
    </>
  );
};

export default OptionSetsPage;

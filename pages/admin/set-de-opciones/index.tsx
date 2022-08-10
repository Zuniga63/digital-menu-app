import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IOptionItem, IOptionSet } from 'store/reducers/interfaces';

import AdminLayout from 'components/Layouts/AdminLayout';
import LayoutTitle from 'components/LayoutHeader';
import { Modal } from '@mantine/core';
import PlusButtom from 'components/PlusButton';
import CustomForm from 'components/OptionSets/OptionSetForm';
import OptionSetCard from 'components/OptionSets/OptionSetCard';
import UpdateItemForm from 'components/OptionSets/UpdateItemForm';

enum FormType {
  General,
  UpdateItem,
}

const OptionSetsPage: NextPage = () => {
  const [optionSets, setOptionSets] = useState<IOptionSet[]>([]);
  const [optionSetItem, setOptionSetItem] = useState<IOptionItem | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState('');
  const [formType, setFormType] = useState(FormType.General);
  const apiUrl = `/option-sets`;

  const openGeneralForm = () => {
    setFormType(FormType.General);
    setModalOpened(true);
  };

  const openUpdateItemForm = (optionItem: IOptionItem) => {
    setFormType(FormType.UpdateItem);
    setOptionSetItem(optionItem);
    setModalOpened(true);
  };

  const closeModal = (): void => {
    if (!modalLoading) {
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

  const changeStateOptionItem = async (optionSetId: string, optionItemId: string, value: boolean): Promise<boolean> => {
    try {
      const url = `${apiUrl}/${optionSetId}/items/${optionItemId}/${value ? 'enabled' : 'disabled'}`;
      const res = await axios.put(url);
      const { ok, optionItem }: { ok: boolean; optionItem: IOptionItem } = res.data;
      if (ok) {
        const newOptionSets = optionSets.map((optionSet) => {
          if (optionSet.id === optionSetId) {
            const newItems = optionSet.items.map((item) => {
              if (item.id === optionItemId) {
                return optionItem;
              }

              return item;
            });

            return { ...optionSet, items: newItems };
          }

          return optionSet;
        });

        setOptionSets(newOptionSets);
        toast.success(`El item ${optionItem.name} fue ${value ? 'habilitado' : 'deshabilitado'} `);
        return optionItem.isEnabled;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    return !value;
  };

  const updateOptionSetItem = (optionItem: IOptionItem): void => {
    const newOptionSets = optionSets.map((optionSet) => {
      if (optionSet.id === optionItem.optionSet) {
        const newItems = optionSet.items.map((item) => {
          if (item.id === optionItem.id) {
            return { ...item, ...optionItem };
          }
          return item;
        });

        return { ...optionSet, items: newItems };
      }
      return optionSet;
    });

    setOptionSets(newOptionSets);
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

        <div className="grid gap-y-4 lg:grid-cols-3 lg:gap-x-6">
          {optionSets.map((item) => (
            <OptionSetCard
              key={item.id}
              optionSet={item}
              deleteLoading={deleteLoading}
              onDelete={deleteOptionSet}
              onUpdateItemState={changeStateOptionItem}
              onUpdateItem={openUpdateItemForm}
            />
          ))}
        </div>
      </AdminLayout>

      <Modal opened={modalOpened} onClose={closeModal}>
        {formType === FormType.General && (
          <CustomForm
            loading={modalLoading}
            apiUrl={apiUrl}
            setLoading={setModalLoading}
            onCloseModal={closeModal}
            onSuccess={addOptionSet}
          />
        )}

        {formType === FormType.UpdateItem && optionSetItem && (
          <UpdateItemForm
            optionSetItem={optionSetItem}
            apiUrl={apiUrl}
            loading={modalLoading}
            setLoading={setModalLoading}
            onCloseModal={closeModal}
            onSuccess={updateOptionSetItem}
          />
        )}
      </Modal>
      <PlusButtom onClick={openGeneralForm} />
    </>
  );
};

export default OptionSetsPage;

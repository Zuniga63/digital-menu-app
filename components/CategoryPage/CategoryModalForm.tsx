import { Modal } from '@mantine/core';
import CategoryForm from './CategoryForm';

interface ModalProps {
  opened?: boolean;
  onClose(): void;
}
export default function CategoryModalForm({ onClose, opened = false }: ModalProps) {
  return (
    <Modal opened={opened} onClose={onClose}>
      <CategoryForm onCloseModal={onClose} />
    </Modal>
  );
}

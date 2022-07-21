import { Plus } from 'tabler-icons-react';

interface IProps {
  className?: string;
  onClick?: () => void;
}
export default function PlusButtom({ className, onClick }: IProps) {
  return (
    <button
      type="button"
      className={`fixed right-6 bottom-20 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500  text-white shadow-float-button outline-none transition-colors duration-200 hover:bg-opacity-80  active:bg-opacity-80 ${className?.trim()}`}
      onClick={onClick}
    >
      <Plus size={20} strokeWidth={5} />
    </button>
  );
}

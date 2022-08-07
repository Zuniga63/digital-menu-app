import { Switch } from '@mantine/core';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IOptionItem } from 'store/reducers/interfaces';
import { Photo, World, EditCircle, Trash } from 'tabler-icons-react';

interface Props {
  optionSetItem: IOptionItem;
  onUpdateState(optionSetId: string, optionItemId: string, value: boolean): Promise<boolean>;
  onUpdate(optionItem: IOptionItem): void;
}
export default function OptionItemCard({ optionSetItem, onUpdateState, onUpdate }: Props) {
  const { image } = optionSetItem;
  const [enabled, setEnabled] = useState(optionSetItem.isEnabled);

  const updateStateHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked);
    const result = await onUpdateState(optionSetItem.optionSet, optionSetItem.id, e.target.checked);
    setTimeout(() => {
      setEnabled(result);
    }, 200);
  };

  useEffect(() => {
    setEnabled(optionSetItem.isEnabled);
  }, [optionSetItem.isEnabled]);

  return (
    <li>
      <div className="flex items-center rounded bg-blue-100 px-2 py-4 shadow">
        {/* Info */}
        <div className="flex-grow">
          <div className="flex items-center gap-x-2">
            {/* Image */}
            <div className="flex-shrink-0 flex-grow-0">
              <figure className="aspect-square w-10 overflow-hidden rounded ring-2 ring-blue-500 ring-opacity-60">
                {image ? (
                  <Image
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    layout="responsive"
                    objectFit="cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-blue-400 text-opacity-60">
                    <Photo />
                  </div>
                )}
              </figure>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col items-center">
                <p className="mb-2 text-center text-xs font-bold text-gray-dark">{optionSetItem.name}</p>
                <Switch
                  checked={enabled}
                  onChange={updateStateHandler}
                  label={
                    <div className="flex items-center gap-x-2 text-gray-800">
                      <World size={16} className="text-green-400" /> <span>Visible</span>
                    </div>
                  }
                  size="xs"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-shrink-0 flex-grow-0 flex-col">
          <button
            type="button"
            className="rounded-t-md border-x border-t border-green-500 bg-green-200 p-1 text-green-700 transition-colors duration-200 active:bg-green-700 active:text-light"
            onClick={() => onUpdate(optionSetItem)}
          >
            <EditCircle size={22} />
          </button>
          <button
            type="button"
            disabled
            className="disabled:tex-red-700 rounded-b-md border-x border-b border-red-500 bg-red-200 p-1 text-red-700 transition-colors duration-200 active:bg-red-700 active:text-red-700 disabled:bg-red-200 disabled:opacity-60"
          >
            <Trash size={22} />
          </button>
        </div>
      </div>
    </li>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
import { Avatar, Group, Select, Text } from '@mantine/core';
import React, { useEffect, useState, forwardRef } from 'react';
import { ICategory } from 'store/reducers/interfaces';

interface Props {
  categories: ICategory[];
  value: string | null;
  setValue(value: string): void;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image} />
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

export default function CategorySelector({ categories, value, setValue }: Props) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(
      categories.map((category) => {
        return {
          image: category.image?.url || '',
          label: category.name,
          value: category.id,
          description: category.description || '',
        };
      })
    );
  }, []);

  return (
    <div className="mb-4 px-2">
      <Select
        label="Filtrar por categoría"
        placeholder="Selecciona una"
        itemComponent={SelectItem}
        data={data}
        value={value}
        onChange={setValue}
        searchable
        maxDropdownHeight={400}
        nothingFound="No hay coincidencias"
        filter={(search, item) =>
          item.label ? item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()) : false
        }
        clearable
      />
    </div>
  );
}

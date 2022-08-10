import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useMediaQuery } from '@mantine/hooks';
import { hideNavMenu, showMenu } from 'store/reducers/NavMenuReducer/actionCreators';
import { ICategoryHome } from 'store/reducers/interfaces';

import { Drawer } from '@mantine/core';
import Image from 'next/image';
import NavDrawerHeader from './NavDraverHeader';

interface Props {
  categories: ICategoryHome[];
}

export default function NavDrawer({ categories }: Props) {
  const { menuIsOpen } = useAppSelector(({ NavMenuReducer }) => NavMenuReducer);
  const dispatch = useAppDispatch();

  const largeScreen = useMediaQuery('(min-width: 768px)');

  const toggle = () => {
    if (menuIsOpen) {
      dispatch(hideNavMenu());
    } else {
      dispatch(showMenu());
    }
  };

  const goToCategory = (categoryId: string) => {
    const header = document.getElementById('home-header');
    const content = document.getElementById('home-content');
    const categoryGroup: HTMLElement | null = document.querySelector(`[data-id="${categoryId}"]`);

    if (header && content && categoryGroup) {
      const y = categoryGroup.offsetTop - header.offsetHeight;
      content.scroll(0, y);
    }

    toggle();
  };

  return (
    <Drawer opened={menuIsOpen} onClose={toggle} padding={0} size={largeScreen ? 'md' : '100%'} withCloseButton={false}>
      <div className="relative h-full overflow-y-auto pb-40">
        <NavDrawerHeader />
        <h2 className="mb-4 border-b-4 border-double border-gray-400 py-2 px-4 text-center text-xl uppercase italic">
          Categorías
        </h2>
        <ul className="divide-y divide-gray-200">
          {categories.map(
            (category) =>
              category.isEnabled &&
              !!category.products.length && (
                <li key={category.id} className="block">
                  <button type="button" onClick={() => goToCategory(category.id)} className="block w-full">
                    <div className="flex items-center gap-3 p-4 text-dark">
                      {category.image && (
                        <figure
                          className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-full ring-4 ring-gray-400"
                          role="presentation"
                        >
                          <Image src={category.image.url} alt={category.name} layout="fill" />
                        </figure>
                      )}
                      <div className="flex-grow">
                        <h3 className="font-hand text-xl font-black">{category.name}</h3>
                        {category.description && (
                          <p className="mt-2 font-sans text-xs font-medium tracking-wider text-gray-600 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </Drawer>
  );
}

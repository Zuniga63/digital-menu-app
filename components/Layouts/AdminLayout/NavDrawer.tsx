import Link from 'next/link';
import { Drawer, Divider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { hideNavMenu, showMenu } from 'store/reducers/NavMenuReducer/actionCreators';
import Header from '../AppLayout/Header';

function NavDrawer() {
  const { menuIsOpen } = useAppSelector(({ NavMenuReducer }) => NavMenuReducer);
  const dispatch = useAppDispatch();
  const largeScreen = useMediaQuery('(min-width: 768px)');
  const desktopScreen = useMediaQuery('(min-width: 1024px)');

  const links = [
    /* { id: 0, name: 'Panel', url: '/admin' }, */
    { id: 1, name: 'Categorías', url: '/admin/categorias' },
    { id: 2, name: 'Productos', url: '/admin/productos' },
    { id: 3, name: 'Set de opciones', url: '/admin/set-de-opciones' },
    { id: 4, name: 'Pedidos', url: '/admin/pedidos' },
  ];

  const toggle = () => {
    if (menuIsOpen) {
      dispatch(hideNavMenu());
    } else {
      dispatch(showMenu());
    }
  };

  const handleClick = () => {
    dispatch(hideNavMenu());
  };

  return (
    <Drawer
      opened={menuIsOpen}
      onClose={toggle}
      padding={0}
      size={largeScreen ? 'md' : '100%'}
      withCloseButton={false}
      position={desktopScreen ? 'right' : 'left'}
    >
      <>
        <Header />
        <nav>
          <ul className="divide-y-2 lg:pt-4">
            {links.map((item) => (
              <li key={item.id}>
                <Link href={item.url}>
                  <a
                    href=""
                    onClick={handleClick}
                    className="block px-4 py-2 text-sm font-bold tracking-wide text-gray-600 active:bg-gray-200 lg:hover:bg-gray-200"
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
            <Divider my="xs" label="Usuario" labelPosition="center" />
          </ul>
        </nav>
      </>
    </Drawer>
  );
}

export default NavDrawer;

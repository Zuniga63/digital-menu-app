import { Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  hideNavMenu,
  showMenu,
} from 'store/reducers/NavMenuReducer/actionCreators';
import Header from './Header';

export default function NavDrawer() {
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

  return (
    <Drawer
      opened={menuIsOpen}
      onClose={toggle}
      padding={0}
      size={largeScreen ? 'md' : '100%'}
      withCloseButton={false}
    >
      <Header />
    </Drawer>
  );
}

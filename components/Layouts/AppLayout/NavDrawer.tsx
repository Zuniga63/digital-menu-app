import { Drawer } from '@mantine/core';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  hideNavMenu,
  showMenu,
} from 'store/reducers/NavMenuReducer/actionCreators';
import Header from './Header';

export default function NavDrawer() {
  const { menuIsOpen } = useAppSelector(({ NavMenuReducer }) => NavMenuReducer);
  const dispatch = useAppDispatch();
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
      size="md"
      withCloseButton={false}
    >
      <Header />
    </Drawer>
  );
}

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Burger, useMantineTheme } from '@mantine/core';
import {
  hideNavMenu,
  showMenu,
} from 'store/reducers/NavMenuReducer/actionCreators';

export default function BurgerToggler() {
  const { menuIsOpen } = useAppSelector(({ NavMenuReducer }) => NavMenuReducer);
  const theme = useMantineTheme();

  const dispatch = useAppDispatch();
  const title = menuIsOpen ? 'Close navigation' : 'Open navigation';
  const toggle = () => {
    if (menuIsOpen) {
      dispatch(hideNavMenu());
    } else {
      dispatch(showMenu());
    }
  };
  return (
    <Burger
      opened={menuIsOpen}
      onClick={toggle}
      title={title}
      color={theme.colors.gray[2]}
    />
  );
}

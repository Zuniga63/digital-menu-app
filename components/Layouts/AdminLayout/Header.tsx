import React from 'react';
import { useAppDispatch } from 'store/hooks';
import { hideNavMenu } from 'store/reducers/NavMenuReducer/actionCreators';
import BrandLogo from '../BrandLogo';
import BrandName from '../BrandName';
import BurgerToggler from '../BurgerToggler';

const Header = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(hideNavMenu());

  return (
    <header className="sticky top-0 z-40 bg-gray-900 text-gray-200 lg:static">
      <nav className="flex h-16 items-center justify-between px-4 py-2 lg:px-8 lg:py-3">
        <BrandLogo onClick={handleClick} />
        <BrandName onClick={handleClick} />
        <BurgerToggler />
      </nav>
    </header>
  );
};

export default Header;

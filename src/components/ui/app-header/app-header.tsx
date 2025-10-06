import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { ActiveLink } from '@components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const isLinkActive = location.pathname === '/';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {!isLinkActive && (
            <>
              <ActiveLink
                to='/'
                className={styles.link}
                activeClassName={styles.link_active}
              >
                <BurgerIcon type={'primary'} />

                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </ActiveLink>
            </>
          )}
          <>
            <ActiveLink
              to='/feed'
              className={styles.link}
              activeClassName={styles.link_active}
            >
              <ListIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </ActiveLink>
          </>
        </div>
        <div className={styles.logo}>
          <NavLink to='/' className={styles.link}>
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          <ActiveLink
            to='/profile'
            className={styles.link}
            activeClassName={styles.link_active}
            exact
          >
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </ActiveLink>
        </div>
      </nav>
    </header>
  );
};

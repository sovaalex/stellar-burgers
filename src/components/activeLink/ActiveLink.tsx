import React from 'react';
import { NavLink } from 'react-router-dom';

interface ActiveLinkProps {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
  exact?: boolean;
  className?: string;
  [key: string]: any;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  to,
  children,
  activeClassName = 'active',
  exact = true,
  className = '',
  ...props
}) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) => (isActive ? activeClassName : className)}
    {...props}
  >
    {children}
  </NavLink>
);

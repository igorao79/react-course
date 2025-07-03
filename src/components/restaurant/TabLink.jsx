'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './RestaurantLayout.module.css';

const TabLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={classNames(styles.tab, { [styles.activeTab]: isActive })}
    >
      {children}
    </Link>
  );
};

TabLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default TabLink; 
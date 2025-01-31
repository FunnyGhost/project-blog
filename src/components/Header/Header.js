'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookies from 'js-cookie';
import { DARK_TOKENS, LIGHT_TOKENS, THEME_KEY } from '@/constants';
import Link from 'next/link';

function Header({ initialTheme, ...delegated }) {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    Cookies.set(THEME_KEY, newTheme, { expires: 1000 });
    setTheme(newTheme);

    const newTokens = newTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute('data-color-theme', newTheme);
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <header className={clsx(styles.wrapper)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link href='/rss.xml' className={styles.action}>
          <Rss
            size='1.5rem'
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <button className={styles.action} onClick={toggleTheme}>
          {theme === 'light' ? <Sun size='1.5rem' /> : <Moon size='1.5rem' />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;

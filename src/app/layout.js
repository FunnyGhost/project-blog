import React from 'react';

import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import RespectMotionConfig from '@/components/RespectMotionConfig';
import { Work_Sans, Spline_Sans_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import clsx from 'clsx';
import { DARK_TOKENS, LIGHT_TOKENS, THEME_KEY } from '@/constants';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

export async function generateMetadata() {
  return {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  };
}

function RootLayout({ children }) {
  const persistedTheme = cookies().get(THEME_KEY)?.value || 'light';

  return (
    <RespectMotionConfig>
      <html
        lang='en'
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={persistedTheme}
        style={persistedTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}>
        <body>
          <Header initialTheme={persistedTheme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionConfig>
  );
}

export default RootLayout;

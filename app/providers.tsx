'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
};

const Providers = (props: Props) => {
  return (
    <ThemeProvider attribute='class'>
      <SessionProvider>{props.children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;

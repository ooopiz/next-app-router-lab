import './dashboard.css';
import React from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/components/AntdRegistry';
import NavLayout from '@/components/NavLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <NavLayout>{children} </NavLayout>
        </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
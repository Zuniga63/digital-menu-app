import React, { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import NavDrawer from './NavDrawer';

interface ILayoutProps {
  title?: string;
  children: ReactNode;
}
export default function AdminLayout({ title, children }: ILayoutProps) {
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
  const TITLE = title ? `${title} - ${APP_NAME}` : APP_NAME;

  return (
    <div className="h-screen">
      <div className="mx-auto h-full shadow md:max-w-xl lg:max-w-full">
        <div className="relative h-full overflow-y-auto bg-gray-100">
          <Head>
            <title>{TITLE}</title>
          </Head>

          <Header />

          <main className="mb-16 min-h-screen p-2 lg:py-6 lg:px-4">{children}</main>

          <NavDrawer />

          <Footer />
        </div>
      </div>
    </div>
  );
}

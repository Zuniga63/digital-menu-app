import React, { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import NavDrawer from './NavDrawer';

interface ILayoutProps {
  title?: string;
  children: ReactNode;
}
export default function index({ title, children }: ILayoutProps) {
  return (
    <div className="h-screen bg-white lg:py-8">
      <div className="mx-auto h-full overflow-hidden shadow md:rounded-md lg:max-w-xl">
        <div className="relative h-full overflow-y-auto bg-gray-100">
          <Head>
            <title>{title || 'Default'}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          <main> {children} </main>

          <NavDrawer />

          <Footer />
        </div>
      </div>
    </div>
  );
}

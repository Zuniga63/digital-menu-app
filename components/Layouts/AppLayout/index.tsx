import React, { ReactNode } from 'react';
import Head from 'next/head';
import { ICategoryHome } from 'store/reducers/interfaces';

import Footer from './Footer';
import Header from './Header';
import NavDrawer from './NavDrawer';

interface ILayoutProps {
  title?: string;
  children: ReactNode;
  categories: ICategoryHome[];
}
export default function index({ title, children, categories }: ILayoutProps) {
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
  const TITLE = title ? `${title} - ${APP_NAME}` : APP_NAME;
  return (
    <div className="h-screen bg-white lg:py-8">
      <div className="mx-auto h-full overflow-hidden shadow md:rounded-md lg:max-w-xl">
        <div className="body relative h-full overflow-y-auto" id="home-content">
          <Head>
            <title>{TITLE}</title>
          </Head>

          <Header />

          <main className="mb-8"> {children} </main>

          <NavDrawer categories={categories} />

          <Footer />
        </div>
      </div>
    </div>
  );
}

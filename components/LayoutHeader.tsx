import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export default function LayoutHeader({ children }: Props) {
  return (
    <header className="mb-6 py-4 shadow">
      <h1 className="text-center text-3xl font-bold text-gray-800">
        {children}
      </h1>
    </header>
  );
}

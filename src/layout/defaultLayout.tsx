'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

interface IDefaultLayoutProps {
	children: React.ReactNode;
}

// eslint-disable-next-line react/jsx-no-useless-fragment
const DefaultLayout = ({ children }: IDefaultLayoutProps): JSX.Element => (
	<>
		<Header />
		<main>{children}</main>
		<Footer />
	</>
);
export default DefaultLayout;

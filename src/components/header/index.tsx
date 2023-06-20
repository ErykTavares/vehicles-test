'use client';

import { Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import './style.scss';

const links = {
	Veiculos: '/',
	Clientes: 'customers',
	Condutores: 'conductors',
	Deslocamentos: 'displacements'
};

const Header = (): JSX.Element => {
	const navLinks = () =>
		Object.entries(links).map((item) => (
			<li className='pr-2'>
				<Link href={item[1]}>{item[0]}</Link>
			</li>
		));

	return (
		<header>
			<Container
				sx={{
					maxWidth: '1920px !important',
					display: 'flex',
					justifyContent: 'space-between',
					padding: '1.2rem 2rem'
				}}
			>
				<h1>
					<Link href='#'>Deslocamento</Link>
				</h1>
				<nav>
					<ul>{navLinks()}</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;

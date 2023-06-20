'use client';

import { Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import './style.scss';

const Header = (): JSX.Element => (
	<header>
		<Container
			sx={{
				maxWidth: '1920px',
				display: 'flex',
				justifyContent: 'space-between',
				padding: '1rem 2rem'
			}}
		>
			<h1>Deslocamento</h1>
			<nav>
				<ul>
					<li>
						<Link href='#'>Veiculos</Link>
					</li>
				</ul>
			</nav>
		</Container>
	</header>
);

export default Header;

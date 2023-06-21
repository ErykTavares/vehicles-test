import { Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import './style.scss';

const links = {
	Veiculos: '/',
	Clientes: 'customers',
	Condutores: 'conductors',
	Deslocamentos: 'displacements'
};

const Header = (): JSX.Element => {
	const path = usePathname();

	return (
		<header>
			<Container
				sx={{
					maxWidth: '1920px !important',
					display: 'flex',
					justifyContent: 'space-between',
					padding: '1.2rem 2rem',
					'@media (max-width: 780px)': {
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'start'
					}
				}}
			>
				<h1>
					<Link href='#'>Deslocamento</Link>
				</h1>
				<nav>
					<ul>
						{Object.entries(links).map((item) => (
							<li key={item[0]} className='pr-2'>
								<Link className={path.includes(item[1]) ? 'active' : ''} href={item[1]}>
									{item[0]}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;

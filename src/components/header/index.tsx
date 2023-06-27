'use client';

import { Container, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import './style.scss';

const links = {
	Veiculos: 'vehicle',
	Clientes: 'client',
	Condutores: 'conductors',
	Deslocamentos: 'displacements'
};

const Header = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const path = usePathname();

	return (
		<header>
			<Container
				sx={{
					maxWidth: '1920px !important',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '1.2rem 2rem'
				}}
			>
				<h1>
					<Link href='#'>Deslocamento</Link>
				</h1>
				<nav>
					<ul>
						{Object.entries(links).map((item) => (
							<li key={item[0]} className='pr-2'>
								<Link className={path.includes(item[1]) ? 'active' : ''} href={`/${item[1]}`}>
									{item[0]}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<Tooltip title='Menu'>
					<IconButton
						sx={{
							display: 'none',
							ml: 2,
							mt: 1,
							'@media (max-width:768px)': {
								display: 'inline-block'
							}
						}}
						onClick={handleClick}
						size='small'
						aria-controls={anchorEl ? 'menu' : undefined}
						aria-haspopup='true'
						aria-expanded={anchorEl ? 'true' : undefined}
					>
						<MenuIcon sx={{ width: 28, height: 28, color: '#fff' }} />
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					id='account-menu'
					open={!!anchorEl}
					onClose={handleClose}
					onClick={handleClose}
					sx={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0
							}
						}
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					{Object.entries(links).map((item) => (
						<MenuItem
							key={item[0]}
							className='pr-2'
							sx={{
								color: `${path.includes(item[1]) ? '#0072E5' : 'inherit'}`
							}}
							selected={path.includes(item[1])}
						>
							<Link href={`/${item[1]}`}>{item[0]}</Link>
						</MenuItem>
					))}
				</Menu>
			</Container>
		</header>
	);
};

export default Header;

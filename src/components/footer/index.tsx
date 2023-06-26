import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = (): JSX.Element => (
	<Box
		component='footer'
		sx={{
			width: '100%',
			height: '60px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '0 1rem',
			backgroundColor: '#b7b3d6'
		}}
	>
		<a href='https://eryktavares-portfolio.netlify.app/home' target='_blank' rel='noreferrer'>
			<Typography
				sx={{
					cursor: 'pointer',
					transition: 'all 0.3s',
					'&:hover': {
						color: 'red'
					}
				}}
				variant='h6'
				fontSize='.8rem'
				color='white'
				fontWeight='bolder'
			>
				copyright ErykTavares ©{new Date().getFullYear()}
			</Typography>
		</a>
	</Box>
);
export default Footer;

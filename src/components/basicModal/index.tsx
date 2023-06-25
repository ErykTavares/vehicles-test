'use client';

import { Box, Container, Modal, Typography } from '@mui/material';
import React from 'react';

interface IBasicModalProps {
	children: React.ReactNode;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: 400,
	width: 'max-content',
	minHeight: '200px',
	height: 'auto',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

const BasicModal = ({ children, show, setShow }: IBasicModalProps): JSX.Element => {
	const test = '';

	return (
		<div>
			<Modal
				open={show}
				onClose={() => setShow(false)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Text in a modal
					</Typography>
					<Container>{children}</Container>
				</Box>
			</Modal>
		</div>
	);
};
export default BasicModal;

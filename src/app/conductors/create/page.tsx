'use client';

import React, { useCallback } from 'react';
import DefaultLayout from '@/layout/defaultLayout';
import { Box, Button, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/services/api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import BasicInfo from '../components/basicInfo';

export const conductorSchema = yup.object().shape({
	nome: yup.string().required('O nome é requerido'),
	numeroHabilitacao: yup.string().required('O número habilitação é requerido'),
	catergoriaHabilitacao: yup.string().required('A categoria habilitação é requerido'),
	vencimentoHabilitacao: yup.string().required('O vencimento da habilitação é requerido')
});

const Create = (): JSX.Element => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			nome: '',
			numeroHabilitacao: '',
			catergoriaHabilitacao: '',
			vencimentoHabilitacao: ''
		},
		resolver: yupResolver(conductorSchema)
	});
	const router = useRouter();

	const handleCreateConductor = useCallback(async (data: DConductors.IData): Promise<void> => {
		const formData = new FormData();

		Object.entries(data).forEach((each) => {
			if (each[0] === 'catergoriaHabilitacao') {
				formData.append('categoriaHabilitacao', each[1]);
			} else {
				formData.append(each[0], each[1]);
			}
		});

		await api
			.post(`/api/v1/condutor`, formData)
			.then(() => {
				Swal.fire({
					title: 'Sucesso',
					text: 'Novo condutor criado com sucesso.',
					icon: 'success',
					confirmButtonText: 'ok',
					confirmButtonColor: 'green',
					preConfirm: async (): Promise<void> => {
						router.push('/conductors');
					}
				});
			})
			.catch((err) => {
				Swal.fire({
					title: 'Erro',
					text: err?.response?.data?.message || 'Algo deu errado',
					icon: 'error',
					confirmButtonText: 'ok',
					confirmButtonColor: 'red'
				});
			});
	}, []);

	return (
		<DefaultLayout>
			<section>
				<Container>
					<Container
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: '1rem',
							padding: '0!important'
						}}
					>
						<Typography variant='h2' fontSize='1.5rem' color='darkGray' fontWeight='bolder'>
							Criar novo condutor
						</Typography>
					</Container>
					<Box
						component='form'
						sx={{
							width: '100%',
							height: 'auto',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
							justifyContent: 'center',
							padding: '0 1rem'
						}}
						noValidate
						autoComplete='off'
						onSubmit={(e) => {
							handleSubmit((data) => handleCreateConductor(data))(e);
						}}
					>
						<BasicInfo control={control} />
						<Container
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'end',
								marginBottom: '1rem',
								padding: '0!important',
								paddingRight: '0.1rem!important'
							}}
						>
							<Button type='submit' variant='contained' color='success'>
								Criar
							</Button>
						</Container>
					</Box>
				</Container>
			</section>
		</DefaultLayout>
	);
};
export default Create;

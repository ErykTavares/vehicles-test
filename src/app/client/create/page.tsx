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

export const clientSchema = yup.object().shape({
	numeroDocumento: yup.string().required('O número do documento é requerido'),
	tipoDocumento: yup.string().required('O tipo do documento é requerido'),
	nome: yup.string().required('O nome é requerido'),
	logradouro: yup.string().required('O longradouro é requerido'),
	numero: yup.string().required('O número é requerido'),
	bairro: yup.string().required('O bairro é requerido'),
	cidade: yup.string().required('A cidade é requerido'),
	uf: yup.string().required('O uf é requerido')
});

const Create = (): JSX.Element => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			numeroDocumento: '',
			tipoDocumento: '',
			nome: '',
			logradouro: '',
			numero: '',
			bairro: '',
			cidade: '',
			uf: ''
		},
		resolver: yupResolver(clientSchema)
	});
	const router = useRouter();

	const handleCreateClient = useCallback(async (data: DClient.IData): Promise<void> => {
		const formData = new FormData();

		Object.entries(data).forEach((each) => {
			formData.append(each[0], each[1]);
		});

		await api
			.post(`/api/v1/cliente`, formData)
			.then(() => {
				Swal.fire({
					title: 'Sucesso',
					text: 'Novo cliente criado com sucesso.',
					icon: 'success',
					confirmButtonText: 'ok',
					confirmButtonColor: 'green',
					preConfirm: async (): Promise<void> => {
						router.push('/client');
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
							Criar novo cliente
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
							handleSubmit((data) => handleCreateClient(data))(e);
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

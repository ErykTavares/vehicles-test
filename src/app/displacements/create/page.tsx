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

const displacementSchema = yup.object().shape({
	kmInicial: yup.string().required('O KM inicial é requerido'),
	inicioDeslocamento: yup.string().required('O inicio do deslocamento é requerido'),
	checkList: yup.string().required('O checkList é requerido'),
	motivo: yup.string().required('O motivo é requerido'),
	observacao: yup.string().required('A observação é requerido'),
	idCondutor: yup.string().required('O id do condutor é requerido'),
	idVeiculo: yup.string().required('O id veiculo é requerido'),
	idCliente: yup.string().required('O id cliente é requerido'),
	kmFinal: yup.string(),
	fimDeslocamento: yup.string()
});

const Create = (): JSX.Element => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			kmInicial: '',
			inicioDeslocamento: '',
			checkList: '',
			motivo: '',
			observacao: '',
			idCondutor: '',
			idVeiculo: '',
			idCliente: '',
			kmFinal: '',
			fimDeslocamento: ''
		},
		resolver: yupResolver(displacementSchema)
	});
	const router = useRouter();

	const handleCreateDisplacement = useCallback(async (data: DDisplacement.IData): Promise<void> => {
		const formData = new FormData();

		Object.entries(data)?.forEach((each) => {
			formData.append(each[0], each[1]);
		});

		await api
			.post(`/api/v1/deslocamento/iniciardeslocamento`, formData)
			.then(() => {
				Swal.fire({
					title: 'Sucesso',
					text: 'Novo Deslocamento criado com sucesso.',
					icon: 'success',
					confirmButtonText: 'ok',
					confirmButtonColor: 'green',
					preConfirm: async (): Promise<void> => {
						router.push('/displacements');
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
							Criar novo Deslocamento
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
							handleSubmit((data) => handleCreateDisplacement(data))(e);
						}}
					>
						<BasicInfo control={control as any} />
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

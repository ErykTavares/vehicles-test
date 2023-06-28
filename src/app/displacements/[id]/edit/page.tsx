'use client';

import React, { useCallback, useEffect } from 'react';
import DefaultLayout from '@/layout/defaultLayout';
import { Box, Button, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/services/api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import BasicInfo from '../../components/basicInfo';

interface IEditProps {
	params: { id: string };
}

interface IEditData {
	kmFinal: string;
	fimDeslocamento: string;
	observacao: string;
}

const displacementSchema = yup.object().shape({
	observacao: yup.string().required('A observação é requerido'),
	fimDeslocamento: yup.string().required('O fim do deslocamento é requerido'),
	kmFinal: yup.string().required('O km final é requerido'),
	kmInicial: yup.string(),
	inicioDeslocamento: yup.string(),
	checkList: yup.string(),
	motivo: yup.string(),
	idCondutor: yup.string(),
	idVeiculo: yup.string(),
	idCliente: yup.string()
});

const Edit = ({ params: { id } }: IEditProps): JSX.Element => {
	const { control, handleSubmit, reset } = useForm({
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

	const handleEditDisplacement = useCallback(
		async ({ observacao, kmFinal, fimDeslocamento }: IEditData): Promise<void> => {
			const formData = new FormData();

			formData.append('id', id);
			formData.append('kmFinal', kmFinal || '');
			formData.append('fimDeslocamento', fimDeslocamento || '');
			formData.append('observacao', observacao);

			await api
				.put(`/api/v1/deslocamento/${id}/EncerrarDeslocamento`, formData)
				.then(() => {
					Swal.fire({
						title: 'Sucesso',
						text: 'Deslocamento editado com sucesso.',
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
		},
		[]
	);

	const getDeslocamento = useCallback(async (): Promise<void> => {
		await api(`/api/v1/deslocamento/${id}`)
			.then(({ data }) => {
				reset(data);
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

	useEffect(() => {
		getDeslocamento();
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
							Editar deslocamento
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
							handleSubmit((data) => handleEditDisplacement(data))(e);
						}}
					>
						<BasicInfo control={control as any} edit />
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
								Salvar
							</Button>
						</Container>
					</Box>
				</Container>
			</section>
		</DefaultLayout>
	);
};
export default Edit;

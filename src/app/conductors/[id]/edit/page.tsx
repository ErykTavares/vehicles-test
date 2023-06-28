'use client';

import React, { useCallback, useEffect } from 'react';
import DefaultLayout from '@/layout/defaultLayout';
import { Box, Button, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/services/api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import BasicInfo from '../../components/basicInfo';
import { conductorSchema } from '../../create/page';

interface IEditProps {
	params: { id: string };
}

const Edit = ({ params: { id } }: IEditProps): JSX.Element => {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			nome: '',
			numeroHabilitacao: '',
			catergoriaHabilitacao: '',
			vencimentoHabilitacao: ''
		},
		resolver: yupResolver(conductorSchema)
	});
	const router = useRouter();

	const handleEditConductor = useCallback(async (data: DConductors.IData): Promise<void> => {
		const formData = new FormData();

		Object.entries(data).forEach((each) => {
			if (each[0] === 'catergoriaHabilitacao') {
				formData.append('categoriaHabilitacao', each[1]);
			} else {
				formData.append(each[0], each[1]);
			}
		});

		await api
			.put(`/api/v1/condutor/${id}`, formData)
			.then(() => {
				Swal.fire({
					title: 'Sucesso',
					text: 'Condutor editado com sucesso.',
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

	const getConductor = useCallback(async (): Promise<void> => {
		await api(`/api/v1/condutor/${id}`)
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
		getConductor();
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
							Editar condutor
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
							handleSubmit((data) => handleEditConductor(data))(e);
						}}
					>
						<BasicInfo control={control} edit />
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

'use client';

import React, { useCallback } from 'react';
import DefaultLayout from '@/layout/defaultLayout';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/services/api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export const vehicleSchema = yup.object().shape({
	placa: yup.string().required('A placa é requerida'),
	marcaModelo: yup.string().required('A marca/modelo é requerida'),
	anoFabricacao: yup.string().required('O ano de fabricação é requerido'),
	kmAtual: yup.string().required('O km é requerido')
});

interface IData {
	placa: string;
	marcaModelo: string;
	anoFabricacao: string;
	kmAtual: string;
}

const Create = (): JSX.Element => {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			placa: '',
			marcaModelo: '',
			anoFabricacao: '',
			kmAtual: ''
		},
		resolver: yupResolver(vehicleSchema)
	});
	const router = useRouter();

	const handleCreateVehicle = useCallback(async (data: IData): Promise<void> => {
		const formData = new FormData();

		Object.entries(data).forEach((each) => {
			formData.append(each[0], each[1]);
		});

		await api
			.post(`/api/v1/veiculo`, formData)
			.then(() => {
				Swal.fire({
					title: 'Success',
					text: 'Novo veiculo criado com sucesso.',
					icon: 'success',
					confirmButtonText: 'ok',
					confirmButtonColor: 'green',
					preConfirm: async (): Promise<void> => {
						router.push('/vehicle');
					}
				});
			})
			.catch((err) => {
				Swal.fire({
					title: 'Error',
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
							Criar novo veiculo
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
							handleSubmit((data) => handleCreateVehicle(data))(e);
						}}
					>
						<Controller
							render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
								<TextField
									sx={{
										width: '100%'
									}}
									required
									id='outlined'
									label='Placa'
									placeholder='v123dc'
									margin='normal'
									onChange={onChange}
									value={value}
									ref={ref}
									error={!!error?.message}
									helperText={error?.message}
								/>
							)}
							name='placa'
							control={control}
						/>
						<Controller
							render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
								<TextField
									sx={{
										width: '100%'
									}}
									required
									id='outlined'
									label='Marca/Modelo'
									placeholder='mercedes'
									margin='normal'
									onChange={onChange}
									value={value}
									ref={ref}
									error={!!error?.message}
									helperText={error?.message}
								/>
							)}
							name='marcaModelo'
							control={control}
						/>
						<Controller
							render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
								<TextField
									sx={{
										width: '100%'
									}}
									required
									id='outlined'
									label='Ano de fabricação'
									placeholder='1995'
									margin='normal'
									onChange={onChange}
									value={value}
									ref={ref}
									error={!!error?.message}
									helperText={error?.message}
								/>
							)}
							name='anoFabricacao'
							control={control}
						/>
						<Controller
							render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
								<TextField
									sx={{
										width: '100%'
									}}
									required
									id='outlined'
									label='KM'
									placeholder='1200'
									margin='normal'
									onChange={onChange}
									value={value}
									ref={ref}
									error={!!error?.message}
									helperText={error?.message}
								/>
							)}
							name='kmAtual'
							control={control}
						/>
						<Container
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'end',
								marginBottom: '1rem',
								padding: '0!important',
								paddingRight: '1rem!important '
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

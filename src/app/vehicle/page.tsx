'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import BasicTable from '@/components/basicTable';
import DefaultLayout from '@/layout/defaultLayout';
import api from '@/services/api';
import { Button, Container, TableCell, TableRow, Typography } from '@mui/material';
import Link from 'next/link';

const Vehicle = (): JSX.Element => {
	const [vehicles, setVehicles] = useState<DVehicle.IVehicle[]>([]);

	const getVehicles = useCallback(async (): Promise<void> => {
		await api(`/api/v1/veiculo`)
			.then(({ data }) => {
				setVehicles(data);
			})
			.catch((err) => {
				Swal.fire(err?.response?.data?.message || 'Algo deu errado', '', 'error');
			});
	}, []);

	const handleDeleteVehice = useCallback(async (id: number): Promise<void> => {
		Swal.fire({
			title: 'Tem certeza que deseja excluir isso?',
			icon: 'info',
			showDenyButton: true,
			confirmButtonText: 'Sim',
			denyButtonText: 'Cancelar',
			text: `tem certeza em deletar : ${id}`,
			preConfirm: async (): Promise<void> => {
				await api
					.delete(`/api/v1/veiculo/${id}`)
					.then(async () => {
						await Swal.fire(` : ${id} deletado.`, '', 'success');
						getVehicles();
					})
					.catch((err) => {
						Swal.fire(err?.response?.data?.message || 'Algo deu errado', '', 'error');
					});
			}
		});
	}, []);

	useEffect(() => {
		getVehicles();
	}, []);

	return (
		<DefaultLayout>
			<section>
				<Container>
					<Container
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '1rem',
							padding: '0!important'
						}}
					>
						<Typography variant='h2' fontSize='1.5rem' color='darkGray' fontWeight='bolder'>
							Veiculos
						</Typography>
						<Button type='button' variant='contained' color='success'>
							<Link href='/vehicle/create'>Novo veiculo</Link>
						</Button>
					</Container>
					<BasicTable headers={['Id', 'Placa', 'Marca/Modelo', 'Ano', 'KM', 'Ações']}>
						{vehicles?.map((vehi) => (
							<TableRow key={vehi?.id}>
								{Object.entries(vehi)?.map((item) => (
									<TableCell key={item[0] + item[1]}>{item[1]}</TableCell>
								))}
								<TableCell>
									<Container sx={{ padding: '0!important' }}>
										<Button
											type='button'
											variant='contained'
											color='primary'
											sx={{ marginRight: '.5rem' }}
										>
											<Link href={`/vehicle/${vehi.id}/edit`}>Editar</Link>
										</Button>
										<Button
											type='button'
											variant='contained'
											color='error'
											onClick={() => handleDeleteVehice(vehi.id)}
										>
											Deletar
										</Button>
									</Container>
								</TableCell>
							</TableRow>
						))}
					</BasicTable>
				</Container>
			</section>
		</DefaultLayout>
	);
};

export default Vehicle;
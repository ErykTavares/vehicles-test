'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import BasicTable from '@/components/basicTable';
import DefaultLayout from '@/layout/defaultLayout';
import api from '@/services/api';
import { Button, Container, TableCell, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useRouter } from 'next/navigation';
import dateFormat from 'dateformat';

const Conductors = (): JSX.Element => {
	const [displacements, setDisplacements] = useState<DDisplacement.IDisplacement[]>([]);

	const router = useRouter();

	const getDisplacements = useCallback(async (): Promise<void> => {
		await api(`/api/v1/deslocamento`)
			.then(({ data }) => {
				setDisplacements(data);
			})
			.catch((err) => {
				Swal.fire(err?.response?.data?.message || 'Algo deu errado', '', 'error');
			});
	}, []);

	const handleDeleteDisplacement = useCallback(async (id: number): Promise<void> => {
		Swal.fire({
			title: 'Tem certeza que deseja excluir isso?',
			icon: 'info',
			showDenyButton: true,
			confirmButtonText: 'Sim',
			denyButtonText: 'Cancelar',
			text: `tem certeza em deletar : ${id}`,
			preConfirm: async (): Promise<void> => {
				await api
					.delete(`/api/v1/deslocamento/${id}`)
					.then(async () => {
						await Swal.fire(` : ${id} deletado.`, '', 'success');
						getDisplacements();
					})
					.catch((err) => {
						Swal.fire(err?.response?.data?.message || 'Algo deu errado', '', 'error');
					});
			}
		});
	}, []);

	useEffect(() => {
		getDisplacements();
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
							padding: '0!important',
							'@media (max-width:768px)': {
								flexDirection: 'column',
								alignItems: 'start',
								justifyContent: 'start'
							}
						}}
					>
						<Typography
							variant='h2'
							fontSize='1.5rem'
							color='darkGray'
							fontWeight='bolder'
							marginBottom='.5rem'
						>
							Deslocamento
						</Typography>
						<Button
							type='button'
							variant='contained'
							color='success'
							startIcon={<AddIcon />}
							sx={{
								marginBottom: '.5rem'
							}}
							onClick={() => router.push('/displacements/create')}
						>
							Novo Deslocamento
						</Button>
					</Container>
					<BasicTable
						headers={[
							'ID',
							'KM Inicial',
							'KM Final',
							'Inicio do Deslocamento',
							'Fim do Deslocamento',
							'CheckList',
							'Motivo',
							'Observação',
							'ID do Condutor',
							'ID do Veiculo',
							'ID do Cliente'
						]}
					>
						{displacements?.map((displa) => (
							<TableRow key={displa?.id}>
								{Object.entries(displa)?.map((item) => {
									const value =
										item[0] === 'inicioDeslocamento' || item[0] === 'fimDeslocamento'
											? dateFormat(item[1], 'paddedShortDate')
											: item[1];

									return <TableCell key={item[0] + item[1]}>{value}</TableCell>;
								})}
								<TableCell>
									<Container sx={{ padding: '0!important' }}>
										<Button
											type='button'
											variant='contained'
											color='primary'
											startIcon={<EditIcon />}
											sx={{ marginRight: '.5rem', marginBottom: '.5rem' }}
											onClick={() => router.push(`/displacements/${displa?.id}/edit`)}
										>
											Editar
										</Button>
										<Button
											type='button'
											variant='contained'
											color='error'
											onClick={() => handleDeleteDisplacement(displa.id)}
											startIcon={<DeleteForeverIcon />}
											sx={{ width: '108.7px', marginBottom: '.5rem' }}
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

export default Conductors;

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
	const [conductors, setConductors] = useState<DConductors.IConductors[]>([]);

	const router = useRouter();

	const getConductors = useCallback(async (): Promise<void> => {
		await api(`/api/v1/condutor`)
			.then(({ data }) => {
				setConductors(data);
			})
			.catch((err) => {
				Swal.fire(err?.response?.data?.message || 'Algo deu errado', '', 'error');
			});
	}, []);

	const handleDeleteConductors = useCallback(async (id: number): Promise<void> => {
		Swal.fire({
			title: 'Tem certeza que deseja excluir isso?',
			icon: 'info',
			showDenyButton: true,
			confirmButtonText: 'Sim',
			denyButtonText: 'Cancelar',
			text: `tem certeza em deletar : ${id}`,
			preConfirm: async (): Promise<void> => {
				await api
					.delete(`/api/v1/condutor/${id}`)
					.then(async () => {
						await Swal.fire(` : ${id} deletado.`, '', 'success');
						getConductors();
					})
					.catch((err) => {
						Swal.fire(err?.response?.data?.message || 'Algo deu errado', '', 'error');
					});
			}
		});
	}, []);

	useEffect(() => {
		getConductors();
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
							Condutores
						</Typography>
						<Button
							type='button'
							variant='contained'
							color='success'
							startIcon={<AddIcon />}
							sx={{
								marginBottom: '.5rem'
							}}
							onClick={() => router.push('/conductors/create')}
						>
							Novo Condutor
						</Button>
					</Container>
					<BasicTable
						headers={[
							'ID',
							'Nome',
							'Número da Habilitação',
							'Categoria da Habilitação',
							'Vencimento da Habilitação',
							'Opções'
						]}
					>
						{conductors?.map((condu) => (
							<TableRow key={condu?.id}>
								{Object.entries(condu)?.map((item) =>
									item[0] !== 'vencimentoHabilitacao' ? (
										<TableCell key={item[0] + item[1]}>{item[1]}</TableCell>
									) : null
								)}
								<TableCell>{dateFormat(condu.vencimentoHabilitacao, 'paddedShortDate')}</TableCell>
								<TableCell>
									<Container sx={{ padding: '0!important' }}>
										<Button
											type='button'
											variant='contained'
											color='primary'
											startIcon={<EditIcon />}
											sx={{ marginRight: '.5rem', marginBottom: '.5rem' }}
											onClick={() => router.push(`/conductors/${condu?.id}/edit`)}
										>
											Editar
										</Button>
										<Button
											type='button'
											variant='contained'
											color='error'
											onClick={() => handleDeleteConductors(condu.id)}
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

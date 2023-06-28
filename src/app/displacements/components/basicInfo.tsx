import { FormHelperText, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dateFormat from 'dateformat';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '@/services/api';
import Swal from 'sweetalert2';

interface IBasicInfoProps {
	control: Control<
		{
			kmInicial: string;
			inicioDeslocamento: string;
			checkList: string;
			motivo: string;
			observacao: string;
			idCondutor: string;
			idVeiculo: string;
			idCliente: string;
			kmFinal: string;
			fimDeslocamento: string;
		},
		any
	>;
	edit?: boolean;
}

interface IIdName {
	id: number;
	name: string;
}

interface ISelectValues {
	cliente: IIdName[];
	condutor: IIdName[];
	veiculo: IIdName[];
}

const urls = ['cliente', 'condutor', 'veiculo'];

const BasicInfo = ({ control, edit }: IBasicInfoProps): JSX.Element => {
	const [selectValues, setSelectValues] = useState<ISelectValues>();

	const getSelectValues = useCallback(async (): Promise<void> => {
		const responseAll = await Promise.all(
			urls.map(async (item) => api.get(`/api/v1/${item}`))
		).catch((err) => {
			Swal.fire(err?.response?.data?.message || 'Something went wrong', '', 'error');
		});

		setSelectValues(
			(responseAll as any[])?.reduce((acc, cur: any): ISelectValues => {
				const urlName = cur?.config?.url.split('/api/v1/')[1];
				const values = cur?.data?.reduce(
					(valuesAcc: IIdName[], valuesCur: any): IIdName[] =>
						(valuesAcc = [
							...valuesAcc,
							{ id: valuesCur?.id, name: valuesCur?.placa || valuesCur?.nome }
						]),
					[]
				);

				return {
					...acc,
					[urlName]: values
				};
			}, {} as ISelectValues)
		);
	}, []);

	useEffect(() => {
		getSelectValues();
	}, []);

	return (
		<>
			<Controller
				render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
					<TextField
						sx={{
							width: '100%'
						}}
						type='number'
						required
						id='outlined'
						label='KM Inicial'
						placeholder='0'
						margin='normal'
						onChange={onChange}
						disabled={edit}
						value={value}
						ref={ref}
						error={!!error?.message}
						helperText={error?.message}
					/>
				)}
				name='kmInicial'
				control={control}
			/>
			{edit ? (
				<Controller
					render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
						<TextField
							sx={{
								width: '100%'
							}}
							type='number'
							required
							id='outlined'
							label='KM Final'
							placeholder='0'
							margin='normal'
							onChange={onChange}
							value={value || ''}
							ref={ref}
							error={!!error?.message}
							helperText={error?.message}
						/>
					)}
					name='kmFinal'
					control={control}
				/>
			) : null}

			<Controller
				render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer
							sx={{
								width: '100%',
								marginBottom: '.5rem'
							}}
							components={['DatePicker']}
						>
							<DatePicker
								sx={{
									width: '100%',
									borderColor: `${error?.message ? '#d32f2f' : 'inherit'}`
								}}
								ref={ref}
								label='Inicio do Deslocamento'
								onChange={(e) =>
									onChange(dateFormat((e as unknown as string) || '', 'isoUtcDateTime'))
								}
								format='DD/MM/YYYY'
								value={dayjs(value)}
								disabled={edit}
								slotProps={{
									textField: {
										error: !!error?.message,
										helperText: error?.message
									}
								}}
							/>
						</DemoContainer>
					</LocalizationProvider>
				)}
				name='inicioDeslocamento'
				control={control}
			/>
			{edit ? (
				<Controller
					render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer
								sx={{
									width: '100%',
									marginBottom: '.5rem'
								}}
								components={['DatePicker']}
							>
								<DatePicker
									sx={{
										width: '100%',
										borderColor: `${error?.message ? '#d32f2f' : 'inherit'}`
									}}
									ref={ref}
									label='Fim do Deslocamento'
									onChange={(e) =>
										onChange(dateFormat((e as unknown as string) || '', 'isoUtcDateTime'))
									}
									format='DD/MM/YYYY'
									value={dayjs(value || '')}
									slotProps={{
										textField: {
											error: !!error?.message,
											helperText: error?.message
										}
									}}
								/>
							</DemoContainer>
						</LocalizationProvider>
					)}
					name='fimDeslocamento'
					control={control}
				/>
			) : null}
			<Controller
				render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
					<TextField
						sx={{
							width: '100%'
						}}
						required
						id='outlined'
						label='CheckList'
						placeholder='CheckList'
						margin='normal'
						onChange={onChange}
						value={value}
						disabled={edit}
						ref={ref}
						error={!!error?.message}
						helperText={error?.message}
					/>
				)}
				name='checkList'
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
						label='Motivo'
						placeholder='Motivo'
						margin='normal'
						disabled={edit}
						onChange={onChange}
						value={value}
						ref={ref}
						error={!!error?.message}
						helperText={error?.message}
					/>
				)}
				name='motivo'
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
						label='Observação'
						placeholder='Observação'
						margin='normal'
						onChange={onChange}
						value={value}
						ref={ref}
						error={!!error?.message}
						helperText={error?.message}
					/>
				)}
				name='observacao'
				control={control}
			/>
			<Controller
				render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
					<FormControl
						fullWidth
						sx={{
							marginY: '.5rem'
						}}
					>
						<InputLabel id='idCondutor'>ID do Condutor</InputLabel>
						<Select
							labelId='idCondutor'
							id='demo-simple-select'
							label='ID do Condutor'
							onChange={({ target }) => {
								onChange(target.value);
							}}
							value={value || ''}
							ref={ref}
							error={!!error?.message}
							disabled={edit}
						>
							{selectValues?.condutor?.map((item) => (
								<MenuItem key={item.id} value={item?.id}>
									{item?.name}
								</MenuItem>
							))}
						</Select>
						{error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null}
					</FormControl>
				)}
				name='idCondutor'
				control={control}
			/>
			<Controller
				render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
					<FormControl
						fullWidth
						sx={{
							marginY: '.5rem'
						}}
					>
						<InputLabel id='idVeiculo'>ID do Veiculo</InputLabel>
						<Select
							labelId='idVeiculo'
							id='demo-simple-select'
							label='ID do Veiculo'
							onChange={({ target }) => {
								onChange(target.value);
							}}
							value={value || ''}
							ref={ref}
							error={!!error?.message}
							disabled={edit}
						>
							{selectValues?.veiculo?.map((item) => (
								<MenuItem key={item.id} value={item?.id}>
									{item?.name}
								</MenuItem>
							))}
						</Select>
						{error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null}
					</FormControl>
				)}
				name='idVeiculo'
				control={control}
			/>
			<Controller
				render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
					<FormControl
						fullWidth
						sx={{
							marginY: '.5rem'
						}}
					>
						<InputLabel id='idCliente'>ID do Cliente</InputLabel>
						<Select
							labelId='idCliente'
							id='demo-simple-select'
							label='ID do Cliente'
							onChange={({ target }) => {
								onChange(target.value);
							}}
							value={value || ''}
							ref={ref}
							error={!!error?.message}
							disabled={edit}
						>
							{selectValues?.cliente?.map((item) => (
								<MenuItem key={item.id} value={item?.id}>
									{item?.name}
								</MenuItem>
							))}
						</Select>
						{error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null}
					</FormControl>
				)}
				name='idCliente'
				control={control}
			/>
		</>
	);
};
export default BasicInfo;

import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dateFormat from 'dateformat';
import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface IBasicInfoProps {
	control: Control<
		{
			nome: string;
			numeroHabilitacao: string;
			catergoriaHabilitacao: string;
			vencimentoHabilitacao: string;
		},
		any
	>;
	edit?: boolean;
}

const BasicInfo = ({ control, edit }: IBasicInfoProps): JSX.Element => (
	<>
		<Controller
			render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
				<TextField
					sx={{
						width: '100%'
					}}
					required
					id='outlined'
					label='Nome'
					placeholder='João'
					margin='normal'
					onChange={onChange}
					disabled={edit}
					value={value}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='nome'
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
					label='Número da Habilitação'
					placeholder='77556655983'
					margin='normal'
					onChange={onChange}
					value={value}
					disabled={edit}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='numeroHabilitacao'
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
					label='Categoria da habilitação'
					placeholder='A'
					margin='normal'
					onChange={onChange}
					value={value}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='catergoriaHabilitacao'
			control={control}
		/>
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
							label='Vencimento da Habilitação'
							onChange={(e) =>
								onChange(dateFormat((e as unknown as string) || '', 'isoUtcDateTime'))
							}
							format='DD/MM/YYYY'
							value={dayjs(value)}
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
			name='vencimentoHabilitacao'
			control={control}
		/>
	</>
);
export default BasicInfo;

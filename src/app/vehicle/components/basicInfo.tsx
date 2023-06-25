import { TextField } from '@mui/material';
import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface IBasicInfoProps {
	control: Control<
		{
			placa: string;
			marcaModelo: string;
			anoFabricacao: string;
			kmAtual: string;
		},
		any
	>;
}

const BasicInfo = ({ control }: IBasicInfoProps): JSX.Element => (
	<>
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
	</>
);
export default BasicInfo;

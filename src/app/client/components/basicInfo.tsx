import { TextField } from '@mui/material';
import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface IBasicInfoProps {
	control: Control<
		{
			numeroDocumento: string;
			tipoDocumento: string;
			nome: string;
			logradouro: string;
			numero: string;
			bairro: string;
			cidade: string;
			uf: string;
		},
		any
	>;
	edit?: boolean;
}

const BasicInfo = ({ control, edit }: IBasicInfoProps): JSX.Element => (
	<>
		{!edit ? (
			<>
				<Controller
					render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
						<TextField
							sx={{
								width: '100%'
							}}
							required
							id='outlined'
							label='Número do documento'
							placeholder='000.000.000-00'
							margin='normal'
							onChange={onChange}
							value={value}
							ref={ref}
							error={!!error?.message}
							helperText={error?.message}
						/>
					)}
					name='numeroDocumento'
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
							label='Tipo de documento'
							placeholder='CPF'
							margin='normal'
							onChange={onChange}
							value={value}
							ref={ref}
							error={!!error?.message}
							helperText={error?.message}
						/>
					)}
					name='tipoDocumento'
					control={control}
				/>
			</>
		) : null}

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
					label='Longradouro'
					placeholder='Joaquim'
					margin='normal'
					onChange={onChange}
					value={value}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='logradouro'
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
					label='Numero'
					placeholder='700'
					margin='normal'
					onChange={onChange}
					value={value}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='numero'
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
					label='Bairro'
					placeholder='centro'
					margin='normal'
					onChange={onChange}
					value={value}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='bairro'
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
					label='Cidade'
					placeholder='São Paulo'
					margin='normal'
					onChange={onChange}
					value={value}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='cidade'
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
					label='UF'
					placeholder='SP'
					margin='normal'
					onChange={onChange}
					value={value}
					ref={ref}
					error={!!error?.message}
					helperText={error?.message}
				/>
			)}
			name='uf'
			control={control}
		/>
	</>
);
export default BasicInfo;

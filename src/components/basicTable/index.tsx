import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import React from 'react';

interface ITableProps {
	children: React.ReactNode;
	headers: string[];
}

const BasicTable = ({ children, headers }: ITableProps): JSX.Element => {
	const test = '';

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: '700px' }} aria-label='customized table'>
				<TableHead>
					<TableRow>
						{headers.map((item) => (
							<TableCell key={item}>{item}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>{children}</TableBody>
			</Table>
		</TableContainer>
	);
};
export default BasicTable;

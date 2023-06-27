declare namespace DClient {
	export interface IClient {
		id: number;
		numeroDocumento: string;
		tipoDocumento: string;
		nome: string;
		logradouro: string;
		numero: string;
		bairro: string;
		cidade: string;
		uf: string;
	}

	export interface IData {
		numeroDocumento: string;
		tipoDocumento: string;
		nome: string;
		logradouro: string;
		numero: string;
		bairro: string;
		cidade: string;
		uf: string;
	}
}

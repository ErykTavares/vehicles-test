declare namespace DDisplacement {
	export interface IDisplacement {
		id: number;
		kmInicial: number;
		kmFinal: number;
		inicioDeslocamento: string;
		fimDeslocamento: string;
		checkList: string;
		motivo: string;
		observacao: string;
		idCondutor: number;
		idVeiculo: number;
		idCliente: number;
	}

	export interface IData {
		kmInicial: string;
		inicioDeslocamento: string;
		checkList: string;
		motivo: string;
		observacao: string;
		idCondutor: string;
		idVeiculo: string;
		idCliente: string;
		kmFinal?: string;
		fimDeslocamento?: string;
	}
}

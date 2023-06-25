declare namespace DVehicle {
	export interface IVehicle {
		id: number;
		placa: string;
		marcaModelo: string;
		anoFabricacao: number;
		kmAtual: number;
	}

	export interface IData {
		placa: string;
		marcaModelo: string;
		anoFabricacao: string;
		kmAtual: string;
	}
}

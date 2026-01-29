export default interface Seguro {
    id?: number;
    veiculoId?: number;
    valor: number;
    desconto?: number;
    status: string;
    cobertura: string;
    franquia: number;
    data_criacao?: string;
    data_atualizacao?: string;
}

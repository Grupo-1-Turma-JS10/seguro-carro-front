import type Seguro from "../seguro/Seguro";

export default interface CriarVeiculoDTO {
    id?: number;
    nome: string;
    cpf_cnpj: string;
    data_nascimento: string;
    endereco: string;
    email: string;
    telefone: string;
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
    seguros?: Seguro[];
    plataforma: string;
    valor_final_total: number;
    desconto: number;
    data_criacao?: string;
    data_atualizacao?: string;
}
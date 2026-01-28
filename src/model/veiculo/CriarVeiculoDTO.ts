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
    data_criacao?: string;
    data_atualizacao?: string;
}
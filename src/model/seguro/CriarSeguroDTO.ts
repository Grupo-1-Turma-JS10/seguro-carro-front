export default interface CriarSeguroDTO {
    cobertura: string;
    veiculo: VeiculoDTO;
}

interface VeiculoDTO {
    id: number;
}
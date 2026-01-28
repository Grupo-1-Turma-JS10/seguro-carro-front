import axios from "axios";
import type CriarVeiculoDTO from "../model/veiculo/CriarVeiculoDTO";

const api = axios.create({
    baseURL:`http://localhost:4000`
});

export const criarVeiculo = async (veiculoData: CriarVeiculoDTO) => {
    const response = await api.post('/veiculo', veiculoData);
    return response.data;
}

export const buscarVeiculos = async () => {
    const response = await api.get('/veiculo');
    return response.data;
}


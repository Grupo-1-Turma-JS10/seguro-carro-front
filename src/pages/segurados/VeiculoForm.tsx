import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/veiculo/Header';
import { useEffect, useState } from 'react';
import { Save, CheckCircle, X, BadgePercent } from 'lucide-react';
import type CriarVeiculoDTO from '../../model/veiculo/CriarVeiculoDTO';
import { buscarSeguros, buscarVeiculoPorId, contratarSeguro, criarVeiculo, editarVeiculo } from '../../service/Service';

export function VeiculoForm() {
    const navigate = useNavigate();
    const [seguroSelecionado, setSeguroSelecionado] = useState<string>('');
    const [seguros, setSeguros] = useState([]);
    interface Erros {
        nome?: string;
        cpf_cnpj?: string;
        data_nascimento?: string;
        telefone?: string;
    }
    const [erros, setErros] = useState<Erros>({});
    const [modalSucesso, setModalSucesso] = useState<{ aberto: boolean; veiculoCriado: CriarVeiculoDTO | null }>({
        aberto: false,
        veiculoCriado: null
    });
    const [veiculo, setVeiculo] = useState<CriarVeiculoDTO>({
        nome: '',
        cpf_cnpj: '',
        data_nascimento: '',
        endereco: '',
        email: '',
        telefone: '',
        marca: '',
        modelo: '',
        ano: 0,
        placa: '',
        plataforma: '',
        valor_final_total: 0,
        desconto: 0,
    });
    const { id } = useParams();

    useEffect(() => {
        buscaSeguros();
    }, []);

    useEffect(() => {
        if (id) {
            buscaVeiculoPorId(Number(id));
        }
    }, [id]);

    const buscaVeiculoPorId = async (id: number) => {
        buscarVeiculoPorId(id)
            .then(data => setVeiculo(data)
            ).catch((error) => {
                console.error('Erro ao buscar veículo:', error);
            });
    }

    const criaVeiculo = async (veiculoData: CriarVeiculoDTO): Promise<CriarVeiculoDTO> => {
        return criarVeiculo(veiculoData).then((data) => {
            return data;
        }).catch((error) => {
            console.error('Erro ao criar veículo:', error);
            throw error;
        });
    }

    const buscaSeguros = async () => {
        buscarSeguros().then(data => {
            setSeguros(data);
        }).catch((error) => {
            console.error('Erro ao buscar seguros:', error);
        });
    }

    const vincularSeguroAoVeiculo = async (seguroId: number, veiculoId: number) => {
        return contratarSeguro(seguroId, veiculoId).then(() => {
        }).catch((error) => {
            console.error('Erro ao vincular seguro ao veículo:', error);
            throw error;
        });
    }

    const validarNome = (nome: string): string | undefined => {
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome) || /\d/.test(nome)) {
            return 'Nome não pode conter números ou caracteres especiais';
        }
        return undefined;
    };

    const validarCpfCnpj = (cpf_cnpj: string): string | undefined => {
        const apenasNumeros = cpf_cnpj.replace(/\D/g, '');
        if (apenasNumeros.length > 14) {
            return 'CPF/CNPJ não pode ter mais de 14 dígitos';
        }
        return undefined;
    };

    const validarDataNascimento = (data: string): string | undefined => {
        if (!data) return undefined;
        const dataNasc = new Date(data);
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const m = hoje.getMonth() - dataNasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
        if (idade < 18) {
            return 'Você deve ter no mínimo 18 anos';
        }
        return undefined;
    };

    const validarTelefone = (telefone: string): string | undefined => {
        const apenasNumeros = telefone.replace(/\D/g, '');
        if (apenasNumeros.length > 11) {
            return 'Telefone não pode ter mais de 11 dígitos (DDD + número)';
        }
        if (!/^\d*$/.test(apenasNumeros)) {
            return 'Telefone deve conter apenas números';
        }
        return undefined;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novosErros: Erros = {};
        const erroNome = validarNome(veiculo.nome);
        const erroCpfCnpj = validarCpfCnpj(veiculo.cpf_cnpj);
        const erroData = validarDataNascimento(veiculo.data_nascimento);
        const erroTelefone = validarTelefone(veiculo.telefone);

        if (erroNome) novosErros.nome = erroNome;
        if (erroCpfCnpj) novosErros.cpf_cnpj = erroCpfCnpj;
        if (erroData) novosErros.data_nascimento = erroData;
        if (erroTelefone) novosErros.telefone = erroTelefone;

        setErros(novosErros);

        if (Object.keys(novosErros).length > 0) {
            return;
        }

        try {
            if (!veiculo.id) {
                const veiculoCriado = await criaVeiculo(veiculo);
                let veiculoFinal = veiculoCriado;
                if (seguroSelecionado && veiculoCriado?.id) {
                    await vincularSeguroAoVeiculo(Number(seguroSelecionado), veiculoCriado.id);
                    // Busca o veículo atualizado com o desconto calculado
                    const veiculoAtualizado = await buscarVeiculoPorId(veiculoCriado.id);
                    if (veiculoAtualizado) {
                        veiculoFinal = veiculoAtualizado;
                    }
                }
                setModalSucesso({ aberto: true, veiculoCriado: veiculoFinal });
            } else {
                await editarVeiculo(veiculo);
                navigate('/segurados');
            }
        } catch (error) {
            console.error('Erro ao criar veículo:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header carEdit={veiculo.id !== undefined} />

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                            Informações do Motorista
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome Completo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={veiculo.nome}
                                    onChange={(e) => setVeiculo({ ...veiculo, nome: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Ex: João da Silva"
                                />
                                {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefone *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={veiculo.telefone}
                                    onChange={(e) => setVeiculo({ ...veiculo, telefone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="(11) 99999-9999"
                                />
                                {erros.telefone && <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CPF/ CNPJ *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={veiculo.cpf_cnpj}
                                    onChange={(e) => setVeiculo({ ...veiculo, cpf_cnpj: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                                />
                                {erros.cpf_cnpj && <p className="text-red-500 text-sm mt-1">{erros.cpf_cnpj}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data de Nascimento *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={veiculo.data_nascimento}
                                    onChange={(e) => setVeiculo({ ...veiculo, data_nascimento: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="DD/MM/AAAA"
                                />
                                {erros.data_nascimento && <p className="text-red-500 text-sm mt-1">{erros.data_nascimento}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={veiculo.email}
                                    onChange={(e) => setVeiculo({ ...veiculo, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="exemplo@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Endereço *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={veiculo.endereco}
                                    onChange={(e) => setVeiculo({ ...veiculo, endereco: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Rua tal, 0 - Cidade, Estado"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Plataforma de Trabalho *
                            </label>
                            <select
                                required
                                value={veiculo.plataforma}
                                onChange={(e) => setVeiculo({ ...veiculo, plataforma: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="" disabled>Selecione a plataforma</option>
                                <option value="uber">Uber</option>
                                <option value="novenove">99</option>
                                <option value="indriver">InDriver</option>
                                <option value="other">Outra</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                            Informações do Veículo
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Marca *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={veiculo.marca}
                                    onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Ex: Toyota, Honda, Chevrolet"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Modelo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={veiculo.modelo}
                                    onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Ex: Corolla, Civic, Onix"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ano *
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    value={veiculo.ano}
                                    onChange={(e) => setVeiculo({ ...veiculo, ano: Number(e.target.value) })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="2024"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Placa *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={veiculo.placa}
                                    onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
                                    placeholder="ABC1D23 ou ABC-1234"
                                    maxLength={8}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Formato Mercosul (ABC1D23) ou antigo (ABC-1234)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                            Informações do Seguro
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Seguros *
                            </label>
                            <select
                                required
                                value={seguroSelecionado}
                                onChange={(e) => setSeguroSelecionado(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="" disabled>Selecione o seguro</option>
                                {seguros.map((seguro: any) => (
                                    <option key={seguro.id} value={seguro.id}>
                                        {`${seguro.cobertura} - R$ ${seguro.valor}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="flex gap-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => navigate('/segurados')}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {veiculo.id ? 'Salvar Alterações' : 'Cadastrar Carro'}
                        </button>
                    </div>
                </form>
            </section>

            {/* Modal de Sucesso -- passar para components depois*/}
            {modalSucesso.aberto && modalSucesso.veiculoCriado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-green-50 px-6 py-6 text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Veículo Cadastrado!</h3>
                            <p className="text-gray-600 mt-1">O veículo foi adicionado com sucesso.</p>
                        </div>
                        
                        <div className="px-6 py-5">
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                <p className="font-bold text-gray-900 text-lg">
                                    {modalSucesso.veiculoCriado.marca} {modalSucesso.veiculoCriado.modelo}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Placa:</span> <span className="font-mono">{modalSucesso.veiculoCriado.placa}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Motorista:</span> {modalSucesso.veiculoCriado.nome}
                                </p>
                            </div>

                            {modalSucesso.veiculoCriado.desconto && modalSucesso.veiculoCriado.desconto > 0 && (
                                <div className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <BadgePercent className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-green-100">Parabéns! Você ganhou</p>
                                            <p className="text-2xl font-bold">
                                                R$ {modalSucesso.veiculoCriado.desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de desconto
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => navigate('/segurados')}
                                className="w-full px-4 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Ver Lista de Veículos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/veiculo/Header';
import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import type CriarVeiculoDTO from '../../model/veiculo/CriarVeiculoDTO';
import { buscarVeiculoPorId, criarVeiculo } from '../../service/Service';

export function VeiculoForm() {
    const navigate = useNavigate();
    interface Erros {
        nome?: string;
        cpf_cnpj?: string;
        data_nascimento?: string;
        telefone?: string;
    }
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
    });
    const [erros, setErros] = useState<Erros>({});
    const { id } = useParams();

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('handleSubmit chamado');
        const novosErros: any = {};

        const erroNome = validarNome(veiculo.nome);
        const erroCpfCnpj = validarCpfCnpj(veiculo.cpf_cnpj);
        const erroData = validarDataNascimento(veiculo.data_nascimento);
        const erroTelefone = validarTelefone(veiculo.telefone);

        if (erroNome) novosErros.nome = erroNome;
        if (erroCpfCnpj) novosErros.cpf_cnpj = erroCpfCnpj;
        if (erroData) novosErros.data_nascimento = erroData;
        if (erroTelefone) novosErros.telefone = erroTelefone;

        setErros(novosErros);
        console.log('novosErros', novosErros);

        if (Object.keys(novosErros).length > 0) {
            console.log('Formulário com erros — abortando submit');
            return;
        }

        
        
        criarVeiculo(veiculo);
        navigate('/segurados');
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
                                    onChange={(e) => {
                                        setVeiculo({ ...veiculo, nome: e.target.value });
                                        setErros({ ...erros, nome: undefined });
                                    }}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${erros.nome ? 'border-red-500' : 'border-gray-300'}`}
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
                                    onChange={(e) => {
                                        const novoTelefone = e.target.value.replace(/\D/g, '');
                                        if (novoTelefone.length <= 11) {
                                            setVeiculo({ ...veiculo, telefone: novoTelefone });
                                            setErros({ ...erros, telefone: undefined });
                                        }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${erros.telefone ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="(11)999999999"
                                    maxLength={11}
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
                                    onChange={(e) => {
                                        const novoValor = e.target.value;
                                        const apenasNumeros = novoValor.replace(/\D/g, '');
                                        if (apenasNumeros.length <= 14) {
                                            setVeiculo({ ...veiculo, cpf_cnpj: novoValor });
                                            setErros({ ...erros, cpf_cnpj: undefined });
                                        }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${erros.cpf_cnpj ? 'border-red-500' : 'border-gray-300'}`}
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
                                    onChange={(e) => {
                                        setVeiculo({ ...veiculo, data_nascimento: e.target.value });
                                        setErros({ ...erros, data_nascimento: undefined });
                                    }}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${erros.data_nascimento ? 'border-red-500' : 'border-gray-300'}`}
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

                            {/*<div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cor *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={veiculo.cor}
                                    onChange={(e) => setVeiculo({ ...veiculo, cor: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Ex: Prata, Branco, Preto"
                                />
                            </div>*/}

                            <div className="md:col-span-2">
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
                            {false ? 'Salvar Alterações' : 'Cadastrar Carro'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

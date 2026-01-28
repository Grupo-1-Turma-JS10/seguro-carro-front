import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/veiculo/Header';
import { useState } from 'react';
import { Save } from 'lucide-react';
import type CriarVeiculoDTO from '../../model/veiculo/CriarVeiculoDTO';
import { criarVeiculo } from '../../service/Service';

export function VeiculoForm() {
    const navigate = useNavigate();
    const [veiculo, setVeiculo] = useState<CriarVeiculoDTO>({} as CriarVeiculoDTO);

    
    const criaVeiculo = async (veiculoData: CriarVeiculoDTO) => {
        criarVeiculo(veiculoData).then(() => {
            console.log('Veículo criado com sucesso');
        }).catch((error) => {
            console.error('Erro ao criar veículo:', error);
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        criaVeiculo(veiculo);

        alert('Carro salvo com sucesso!');
        navigate('/segurados');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header carEdit={false} />


            {/* Form */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    {/* Driver Info */}
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

                       {/*  <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Plataforma de Trabalho *
                            </label>
                            <select
                                required
                                value={veiculo.plataforma_trabalho}
                                onChange={(e) => setVeiculo({ ...veiculo, plataforma_trabalho: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                <option value="uber">Uber</option>
                                <option value="99">99</option>
                                <option value="indriver">InDriver</option>
                                <option value="other">Outra</option>
                            </select>
                        </div>*/}
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

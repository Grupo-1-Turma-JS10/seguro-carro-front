import { useState, useEffect } from 'react';
import { Car, Edit2, Trash2, Plus, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Segurados() {
    const [cars, setCars] = useState<Array<any>>([{}]);
    const insurance = {
        name: 'Seguro Completo',
        monthlyPrice: 199.99,
    };
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const getStatusConfig = (status: string) => {
        const configs = {
            active: {
                label: 'Ativo',
                color: 'bg-green-100 text-green-700 border-green-200',
            },
            inactive: {
                label: 'Inativo',
                color: 'bg-gray-100 text-gray-700 border-gray-200',
            },
            pending: {
                label: 'Pendente',
                color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            },
        };
        return configs[status as keyof typeof configs];
    };

    const getPlatformConfig = (platform: string) => {
        const configs = {
            uber: { label: 'Uber', color: 'bg-black text-white' },
            '99': { label: '99', color: 'bg-yellow-400 text-gray-900' },
            indriver: { label: 'InDriver', color: 'bg-blue-600 text-white' },
            other: { label: 'Outro', color: 'bg-gray-600 text-white' },
        };
        return configs[platform as keyof typeof configs] || configs.other;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-3">Carros Segurados</h1>
                            <p className="text-xl text-blue-100">
                                Gerencie todos os veículos com seguro ativo
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/segurados/novo')}
                            className="bg-white text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all font-bold shadow-lg flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Cadastrar Carro
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {cars.length > 0 ? (
                    <div className="space-y-6">
                        {cars.map((car) => {

                            return (
                                <div key={car.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                            {/* Car Info */}
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="bg-blue-100 p-4 rounded-xl">
                                                    <Car className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start gap-3 mb-2">
                                                        <h3 className="text-2xl font-bold text-gray-900">
                                                            carro marca e modelo
                                                        </h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusConfig("active").color}`}>
                                                            {getStatusConfig("active").label}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                                        <div>
                                                            <span className="text-gray-500 block">Placa</span>
                                                            <span className="font-mono font-bold text-gray-900">Placa</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block">Ano</span>
                                                            <span className="font-bold text-gray-900">Ano</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block">Cor</span>
                                                            <span className="font-bold text-gray-900">Cor</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block">Plataforma</span>
                                                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${getPlatformConfig("uber").color}`}>
                                                                {getPlatformConfig("uber").label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:w-1/3 space-y-4">
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="text-sm text-gray-600 mb-1">Motorista</div>
                                                    <div className="font-bold text-gray-900">nome</div>
                                                    <div className="text-sm text-gray-600">telefone</div>
                                                </div>

                                                {insurance && (
                                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                        <div className="flex items-start gap-2 mb-2">
                                                            <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                                                            <div className="flex-1">
                                                                <div className="text-sm text-blue-600 font-medium">{insurance.name}</div>
                                                                <div className="text-xs text-gray-600">
                                                                    R$ {insurance.monthlyPrice.toLocaleString('pt-BR')}/mês
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            Início: data
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex lg:flex-col gap-2">
                                                <button
                                                    onClick={() => navigate(`/segurados/editar/${car.id}`)}
                                                    className="flex-1 lg:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => alert('Excluir')}
                                                    className="flex-1 lg:flex-none bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-200"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-sm">
                            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Nenhum carro cadastrado
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Comece cadastrando os carros que possuem seguro
                            </p>
                            <button
                                onClick={() => navigate('/segurados/novo')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Cadastrar Primeiro Carro
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

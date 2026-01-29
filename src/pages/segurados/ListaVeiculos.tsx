import { useState, useEffect } from 'react';
import { Car, Edit2, Trash2, Plus, Shield, Filter, X, AlertTriangle, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { buscarVeiculos, deletarVeiculo } from '../../service/Service';
import type CriarVeiculoDTO from '../../model/veiculo/CriarVeiculoDTO';

export function ListaVeiculos() {
    const [cars, setCars] = useState<Array<CriarVeiculoDTO>>([]);
    const [filtroAtivo, setFiltroAtivo] = useState(false);
    const [modalExclusao, setModalExclusao] = useState<{ aberto: boolean; carro: CriarVeiculoDTO | null }>({
        aberto: false,
        carro: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        buscaVeiculos();
    }, []);

    const buscaVeiculos = async () => {
        buscarVeiculos().then((data) => {
            setCars(data);
        }).catch((error) => {
            console.error('Erro ao buscar veículos:', error);
        });
    };

    const removerCarro = async (id: number) => {
        deletarVeiculo(id).then(() => {
            setCars(cars.filter(car => car.id !== id));
            setModalExclusao({ aberto: false, carro: null });
        }).catch((error) => {
            console.error('Erro ao deletar veículo:', error);
        });
    };

    const abrirModalExclusao = (carro: CriarVeiculoDTO) => {
        setModalExclusao({ aberto: true, carro });
    };

    const fecharModalExclusao = () => {
        setModalExclusao({ aberto: false, carro: null });
    };

    const ultimoSeguroOuAtivo = (seguros: CriarVeiculoDTO['seguros']) => {
        if (!seguros || seguros.length === 0) return null;

        const segurosAtivos = seguros.filter(seguro => seguro.status === 'active');
        if (segurosAtivos.length > 0) {
            return segurosAtivos[segurosAtivos.length - 1];
        }

        return seguros[seguros.length - 1];
    };

    const getStatusConfig = (status: string) => {
        const configs = {
            ativo: {
                label: 'Ativo',
                color: 'bg-green-100 text-green-700 border-green-200',
            },
            inativo: {
                label: 'Inativo',
                color: 'bg-gray-100 text-gray-700 border-gray-200',
            },
            pendente: {
                label: 'Pendente',
                color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            },
        };
        return configs[status.toLowerCase() as keyof typeof configs] || {
            label: status,
            color: 'bg-gray-100 text-gray-700 border-gray-200',
        };
    };

    const getPlatformConfig = (platform: string) => {
        const configs = {
            uber: { label: 'Uber', color: 'bg-black text-white' },
            novenove: { label: '99', color: 'bg-yellow-400 text-gray-900' },
            indriver: { label: 'InDriver', color: 'bg-blue-600 text-white' },
            other: { label: 'Outro', color: 'bg-gray-600 text-white' },
        };
        return configs[platform.toLowerCase() as keyof typeof configs] || configs.other;
    };

    const formatarData = (data: string | undefined) => {
        if (!data) return '';
        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const carrosFiltrados = filtroAtivo
        ? cars.filter(car => {
            const seguro = ultimoSeguroOuAtivo(car.seguros);
            return seguro?.status.toLowerCase() === 'ativo';
        })
        : cars;

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
                <div className="mb-6 flex items-center gap-4">
                    <button
                        onClick={() => setFiltroAtivo(!filtroAtivo)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${filtroAtivo
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } cursor-pointer`}
                    >
                        <Filter className="w-4 h-4" />
                        {filtroAtivo ? 'Mostrando: Seguros Ativos' : 'Mostrar: Todos'}
                    </button>
                    <span className="text-gray-600 text-sm">
                        {carrosFiltrados.length} de {cars.length} carros
                    </span>
                </div>
                {carrosFiltrados.length > 0 ? (
                    <div className="space-y-6">
                        {carrosFiltrados.map((car) => {
                            const seguro = ultimoSeguroOuAtivo(car.seguros);
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
                                                            {car.marca} {car.modelo}
                                                        </h3>
                                                        {seguro?.status != null && (
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusConfig(seguro.status).color}`}>
                                                                {getStatusConfig(seguro.status).label}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                                        <div>
                                                            <span className="text-gray-500 block">Placa</span>
                                                            <span className="font-mono font-bold text-gray-900">{car.placa}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block">Ano</span>
                                                            <span className="font-bold text-gray-900">{car.ano}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500 block">Plataforma</span>
                                                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${getPlatformConfig(car.plataforma).color}`}>
                                                                {getPlatformConfig(car.plataforma).label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:w-1/3 space-y-4">
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="text-sm text-gray-600 mb-1">Motorista</div>
                                                    <div className="font-bold text-gray-900">{car.nome}</div>
                                                    <div className='flex'>
                                                        <PhoneCall className="w-4 h-4 text-blue-600 inline-block mr-1" />
                                                        <div className="text-sm text-gray-600">
                                                            {car.telefone}
                                                        </div>
                                                    </div>
                                                </div>

                                                {seguro ? (
                                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                        <div className="flex items-start gap-2 mb-2">
                                                            <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                                                            <div className="flex-1">
                                                                <div className="text-sm text-blue-600 font-medium">{ultimoSeguroOuAtivo(car.seguros)?.cobertura}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            R$ {(Number(ultimoSeguroOuAtivo(car.seguros)?.valor) / 12).toFixed(2)}/mês
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            Início: {formatarData(ultimoSeguroOuAtivo(car.seguros)?.data_criacao)}
                                                        </div>
                                                    </div>
                                                )
                                                    : (
                                                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                                            <div className="text-sm text-yellow-700">
                                                                Nenhum seguro cadastrado
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>

                                            <div className="flex lg:flex-col gap-2">
                                                <button
                                                    onClick={() => navigate(`/segurados/editar/${car.id}`)}
                                                    className="flex-1 lg:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg 
                                                    hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => abrirModalExclusao(car)}
                                                    className="flex-1 lg:flex-none bg-red-50 text-red-600 px-4 py-2 rounded-lg 
                                                    hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border 
                                                    border-red-200 cursor-pointer"
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

            {/* Modal de Confirmação de Exclusão - mover depois para componentes */}
            {modalExclusao.aberto && modalExclusao.carro && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={fecharModalExclusao}
                    />

                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 p-2 rounded-full">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Confirmar Exclusão</h3>
                                </div>
                                <button
                                    onClick={fecharModalExclusao}
                                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-5">
                            <p className="text-gray-600 mb-4">
                                Tem certeza que deseja excluir o veículo?
                            </p>
                            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Car className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">
                                        {modalExclusao.carro.marca} {modalExclusao.carro.modelo}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Placa: <span className="font-mono">{modalExclusao.carro.placa}</span> • Ano: {modalExclusao.carro.ano}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-red-600 mt-4">
                                Esta ação não pode ser desfeita. Todos os dados do veículo e seguros associados serão removidos permanentemente.
                            </p>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
                            <button
                                onClick={fecharModalExclusao}
                                className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 
                                hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => removerCarro(modalExclusao.carro!.id!)}
                                className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 
                                transition-colors flex items-center gap-2 cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                Excluir Veículo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

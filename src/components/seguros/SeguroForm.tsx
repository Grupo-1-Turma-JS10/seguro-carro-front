import { ArrowLeft, Save, X } from 'lucide-react';
import type Seguro from '../../model/seguro/Seguro';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { buscarSeguroPorId, criarSeguro, editarSeguro } from '../../service/Service';

export function SeguroForm() {
  const { id } = useParams();
  const [seguro, setSeguro] = useState<Seguro>({
    id: 0,
    cobertura: '',
    valor: 0,
    franquia: 0,
    desconto: 0,
    status: 'ativo',
    data_criacao: '',
    data_atualizacao: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      buscaSeguroPorId(id).then((data) => {
        if (data) {
          setSeguro(data);
        }
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) {
        const novoSeguro = {
          valor: seguro.valor,
          status: seguro.status,
          cobertura: seguro.cobertura,
          franquia: seguro.franquia
        };
        await criarSeguro(novoSeguro);
      } else {
        await editarSeguro(seguro);
      }
      navigate('/seguros');
    } catch (error) {
      console.error('Erro ao salvar seguro:', error);
    }
  }

  const buscaSeguroPorId = async (seguroId: string) => {
    try {
      const response = await buscarSeguroPorId(Number(seguroId));
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('Erro ao buscar seguro:', error);
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/seguros')}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Voltar para a listagem
      </button>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <h2 className="text-2xl font-bold">
            {seguro?.id ? 'Editar Plano de Seguro' : 'Cadastrar Novo Seguro'}
          </h2>
          <p className="text-blue-100 opacity-80">Preencha os dados abaixo para configurar a proteção.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Informações Básicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Plano</label>
                <input
                  type="text"
                  value={seguro?.cobertura || ''}
                  onChange={(e) => setSeguro({ ...seguro, cobertura: e.target.value })}
                  placeholder="Ex: Plano Exclusive 24h"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-text text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Cobertura</label>
                <select
                  value={seguro?.cobertura || ''}
                  onChange={(e) => setSeguro({ ...seguro, cobertura: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer appearance-none text-gray-900"
                >
                  <option value="" disabled>Selecione...</option>
                  <option value="basica">Básica</option>
                  <option value="completa">Completa</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Valores e Coberturas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Valor de Cobertura (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">R$</span>
                  <input
                    type="number"
                    value={seguro?.valor || ''}
                    onChange={(e) => setSeguro({ ...seguro, valor: Number(e.target.value) })}
                    placeholder="0,00"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none mb-1 cursor-text text-gray-900 placeholder-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">Valor máximo de indenização</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mensalidade (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">R$</span>
                  <input
                    type="number"
                    value={seguro?.valor ? (Number(seguro.valor) / 12).toFixed(2) : ''}
                    readOnly
                    placeholder="0,00"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none mb-1 cursor-text text-gray-900 placeholder-gray-400 bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">Valor mensal do plano</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Franquia (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">R$</span>
                  <input
                    type="number"
                    value={seguro?.franquia || ''}
                    onChange={(e) => setSeguro({ ...seguro, franquia: Number(e.target.value) })}
                    placeholder="0,00"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none mb-1 cursor-text text-gray-900 placeholder-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">Valor que o segurado paga em caso de sinistro</p>
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 order-2 sm:order-1 cursor-pointer"
            >
              <Save className="w-5 h-5" />
              {seguro?.id ? 'Atualizar Plano' : 'Cadastrar Plano'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/seguros')}
              className="flex-1 bg-white text-gray-600 border border-gray-200 py-4 rounded-xl font-bold hover:bg-gray-50 hover:text-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
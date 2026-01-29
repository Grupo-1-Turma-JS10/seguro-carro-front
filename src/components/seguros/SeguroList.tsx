import { useEffect, useState } from 'react';
import { 
  Edit2, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  ShieldAlert,
  AlertTriangle 
} from 'lucide-react';
import { buscarSeguros, cancelarSeguro } from '../../service/Service';
import type Seguro from '../../model/seguro/Seguro';
import { useNavigate } from 'react-router-dom';

interface SeguroListProps {
  onEdit: (seguro: Seguro) => void;
  onAddNew: () => void;
}

export function SeguroList({onAddNew }: SeguroListProps) {
  const [seguroParaExcluir, setSeguroParaExcluir] = useState<Seguro | null>(null);
  const [seguros, setSeguros] = useState<Seguro[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    buscaSeguros();
  }, []);

  const buscaSeguros = async() => {
    try {
      const seguros = await buscarSeguros();
      setSeguros(seguros);
    } catch (error) {
      console.error("Erro ao buscar seguros:", error);
    }
  }

  const hasPlanos = seguros.length > 0;

  const confirmarExclusao = async () => {
    if (seguroParaExcluir?.id) {
      try {
        await cancelarSeguro(seguroParaExcluir.id);
        setSeguros(seguros.filter(s => s.id !== seguroParaExcluir.id));
      } catch (error) {
        console.error("Erro ao excluir seguro:", error);
      }
    }
    setSeguroParaExcluir(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col relative">
      
      <div className="bg-blue-600 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Planos de Seguros</h2>
            <p className="text-blue-100 mt-2 text-base md:text-lg opacity-90 font-medium">Gerencie as opções de proteção disponíveis</p>
          </div>
          {hasPlanos && (
            <button onClick={() => navigate('/seguros/novo')} className="w-full md:w-auto bg-white text-blue-600 px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-xl shadow-blue-900/10 font-bold group cursor-pointer">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> Novo Plano
            </button>
          )}
        </div>
      </div>

      {/* Cards dos Planos */}
      <div className="max-w-7xl mx-auto px-4 py-12 w-full flex-grow flex flex-col">
        {hasPlanos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {seguros.map(seguro => (
              <div key={seguro.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
                
                <div className="bg-blue-600 p-6 md:p-8 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{seguro.cobertura}</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/seguros/editar/${seguro.id}`)} 
                      className="p-2.5 text-white/80 hover:text-white hover:bg-white/20 active:scale-90 rounded-xl transition-all cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setSeguroParaExcluir(seguro)} 
                      className="p-2.5 text-white/80 hover:text-red-200 hover:bg-red-500/20 active:scale-90 rounded-xl transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="px-6 md:px-8 mt-6 mb-6">
                  <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">A partir de</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-4xl font-black text-blue-600">
                      R$ {(seguro.valor / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    <span className="text-gray-500 text-sm font-medium ml-1">/mês</span>
                  </div>
                </div>

                <div className="px-6 md:px-8 mb-8"><div className="h-px bg-gray-100 w-full"></div></div>

                <div className="px-6 md:px-8 space-y-5 flex-grow mb-8 text-sm">
                   <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" /><div><p className="text-gray-400 text-[10px] uppercase font-bold">Tipo de Cobertura</p><p className="text-gray-800 font-bold">{seguro.cobertura}</p></div></div>
                   <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" /><div><p className="text-gray-400 text-[10px] uppercase font-bold">Valor de Cobertura</p><p className="text-gray-800 font-bold">R$ {seguro.valor.toLocaleString('pt-BR')}</p></div></div>
                   <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" /><div><p className="text-gray-400 text-[10px] uppercase font-bold">Franquia</p><p className="text-gray-800 font-bold">R$ {seguro.franquia.toLocaleString('pt-BR')}</p></div></div>
                </div>

                {/*<div className="p-6 md:p-8 pt-0">
                  <button onClick={() => setSelectedSeguro(seguro)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-blue-50">
                    <Info className="w-5 h-5" /> Ver Detalhes do Plano
                  </button>
                </div>*/}
              </div>
            ))}
          </div>
        ) : (
          /* Conteúdo caso a página de listagem não tenha nenhum plano cadastrado */
          <div className="flex-grow flex items-center justify-center py-20">
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 max-w-md w-full text-center">
              <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <ShieldAlert className="w-12 h-12 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nenhum seguro cadastrado</h3>
              <p className="text-gray-500 mb-10 leading-relaxed">Comece cadastrando os planos de seguro disponíveis.</p>
              <button onClick={onAddNew} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-xl shadow-blue-100">
                <Plus className="w-6 h-6" /> Cadastrar Primeiro Seguro
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DO PLANO --- */}
      {seguroParaExcluir && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Excluir Plano?</h3>
              <p className="text-gray-500 leading-relaxed">
                Tem certeza que deseja excluir o <strong>{seguroParaExcluir.cobertura}</strong>? Esta ação não poderá ser desfeita.
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setSeguroParaExcluir(null)}
                className="flex-1 px-6 py-4 bg-white text-gray-600 border border-gray-200 rounded-2xl font-bold hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarExclusao}
                className="flex-1 px-6 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-100 cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Plano */}
      {/*{selectedSeguro && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 cursor-pointer" onClick={() => setSelectedSeguro(null)}>
          <div className="bg-white w-full max-w-2xl rounded-t-[32px] md:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300 cursor-default flex flex-col max-h-[95vh]" onClick={e => e.stopPropagation()}>
            <div className="bg-blue-600 p-6 md:p-8 text-white relative">
              <button onClick={() => setSelectedSeguro(null)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-white/20 active:scale-90 rounded-full transition-all cursor-pointer">
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl hidden sm:block"><ShieldCheck className="w-8 h-8" /></div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">{selectedSeguro.cobertura}</h2>
                  <p className="text-blue-100 text-sm opacity-90">Detalhamento completo do plano</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600"><DollarSign className="w-5 h-5" /></div>
                  <div><p className="text-[10px] uppercase font-bold text-gray-400">Mensalidade</p><p className="text-lg font-bold text-blue-600">R$ {(selectedSeguro.valor / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="bg-green-100 p-2.5 rounded-xl text-green-600"><Shield className="w-5 h-5" /></div>
                  <div><p className="text-[10px] uppercase font-bold text-gray-400">Tipo de Cobertura</p><p className="text-lg font-bold text-gray-800">{selectedSeguro.cobertura}</p></div>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest"><FileText className="w-4 h-4 text-blue-600" /> Especificações</h4>
                <div className="border border-gray-100 rounded-2xl overflow-hidden text-sm">
                  <div className="flex justify-between p-4 bg-gray-50/50 border-b border-gray-100"><span className="text-gray-500">Valor Máximo de Cobertura</span><span className="font-bold text-gray-900">R$ {selectedSeguro.coverageAmount.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between p-4 bg-white"><span className="text-gray-500">Valor da Franquia</span><span className="font-bold text-gray-900">R$ {selectedSeguro.valor.toLocaleString('pt-BR')}</span></div>
                </div>
              </div>
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Sobre este plano</h4>
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base italic">"{selectedSeguro.description}"</p>
                </div>
              </div>
              <button onClick={() => setSelectedSeguro(null)} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black active:scale-[0.98] transition-all cursor-pointer">Entendi, fechar detalhes</button>
            </div>
          </div>
        </div>
      )}*/}
    </div>
  );
}
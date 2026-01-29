import { useState } from 'react';
import { SeguroList } from '../../components/seguros/SeguroList';
import { SeguroForm } from '../../components/seguros/SeguroForm';
import type Seguro from '../../model/seguro/Seguro';

type Tela = 'lista' | 'formulario';

export default function Seguros() {
  const [telaAtiva, setTelaAtiva] = useState<Tela>('lista');
  const [seguroSendoEditado, setSeguroSendoEditado] = useState<Seguro | null>(null);

  const abrirFormulario = (seguro?: Seguro) => {
    setSeguroSendoEditado(seguro || null);
    setTelaAtiva('formulario');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {telaAtiva === 'lista' ? (
        <SeguroList 
          onEdit={abrirFormulario} 
          onAddNew={() => abrirFormulario()} 
        />
      ) : (
        <SeguroForm />
      )}
    </div>
  );
}
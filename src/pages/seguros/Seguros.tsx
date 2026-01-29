import { SeguroList } from '../../components/seguros/SeguroList';
import type Seguro from '../../model/seguro/Seguro';
import { useNavigate } from 'react-router-dom';

export default function Seguros() {
  const navigate = useNavigate();

  const abrirFormulario = (seguro?: Seguro) => {
    if (seguro?.id) {
      navigate(`/seguros/editar/${seguro.id}`);
    } else {
      navigate('/seguros/novo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SeguroList 
        onEdit={abrirFormulario} 
        onAddNew={() => navigate('/seguros/novo')} 
      />
    </div>
  );
}
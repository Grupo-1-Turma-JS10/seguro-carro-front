import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header({ carEdit }: { carEdit: boolean }) {
    const navigate = useNavigate();

    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/segurados')}
                    className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 
                    transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar para lista
                </button>
                <h1 className="text-4xl font-bold">
                    {carEdit ? 'Editar Carro Segurado' : 'Cadastrar Novo Carro'}
                </h1>
                <p className="text-blue-100 mt-2">
                    Preencha as informações do veículo e do motorista
                </p>
            </div>
        </section>
    )
}
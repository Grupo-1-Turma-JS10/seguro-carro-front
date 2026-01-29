import {
    ArrowRight,
    Shield,
    CheckCircle2,
    Lock,
    Zap,
    Phone,
    Car,
    HomeIcon,
    Clock,
    DollarSign,
} from "lucide-react";
import { useState } from "react";

function Home() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    const handleUnavailable = () => {
        alert("Funcionalidade indisponível no momento");
    };

    const platforms = [
        {
            name: 'UBER',
            bgClass: 'bg-black',
            textClass: 'text-white',
        },
        {
            name: '99',
            bgClass: 'bg-[#FFC107]',
            textClass: 'text-black',
        },
        {
            name: 'InDriver',
            bgClass: 'bg-[#1D63FF]',
            textClass: 'text-white',
        },
        {
            name: 'Outros',
            bgClass: 'bg-gradient-to-r from-[#FF33A8] to-[#9D26FF]',
            textClass: 'text-white',
        },
    ];

    const roadBenefits = [
        {
            icon: Car,
            title: "Carro Reserva",
            description: "Continue trabalhando enquanto seu veículo está em manutenção ou reparo",
            iconBg: "bg-blue-600",
        },
        {
            icon: Shield,
            title: "Cobertura Total",
            description: "Proteção contra colisão, roubo, furto e danos de terceiros",
            iconBg: "bg-green-600",
        },
        {
            icon: Clock,
            title: "Assistência 24h",
            description: "Suporte a qualquer hora do dia ou da noite, todos os dias do ano",
            iconBg: "bg-purple-600",
        },
        {
            icon: DollarSign,
            title: "Preço Justo",
            description: "Parcelas que cabem no seu bolso, sem comprometer seu lucro",
            iconBg: "bg-orange-600",
        },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900">

            <section className="relative h-screen flex items-center overflow-hidden">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        filter: 'blur(2px) brightness(0.7)',
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-black/50" />


                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-blue-600/90 text-white px-4 py-2 rounded-full mb-6 shadow-md">
                                <Shield className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    Proteção para Seu Veículo
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Seu caminho seguro.<br />
                                Seu carro protegido.
                            </h1>

                            <p className="text-xl text-white mb-8 max-w-lg">
                                Seguro de carro acessível e confiável. Proteção completa,
                                assistência 24h e aprovação rápida.
                            </p>
                  
                            <div className="flex flex-col sm:flex-row gap-6 pt-8 mt-8 border-t border-white/20">
                                {[
                                    "Aprovação em 24h",
                                    "Sem burocracia",
                                    "Atendimento 24/7",
                                ].map((text, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-300" />
                                        <span className="text-sm text-gray-100">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-center text-xl md:text-2xl text-gray-600 mb-12 font-medium">
                        Aceito em todas as principais plataformas
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        {platforms.map((platform, index) => (
                            <div
                                key={index}
                                className={`
                  ${platform.bgClass} 
                  ${platform.textClass} 
                  w-40 h-16 md:w-48 md:h-20 
                  flex items-center justify-center 
                  rounded-2xl 
                  shadow-sm 
                  transition-all duration-300
                  hover:scale-105 hover:shadow-lg
                  cursor-default
                `}
                            >
                                <span className="text-xl md:text-2xl font-bold tracking-tight">
                                    {platform.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Pensado para quem trabalha na estrada
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Benefícios que fazem diferença no seu dia a dia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {roadBenefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start"
                            >
                                <div className={`${benefit.iconBg} p-3 rounded-2xl mb-6 shadow-sm`}>
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
<section className="py-20 bg-blue-600 text-white text-center">
                <h2 className="text-4xl font-bold mb-6">
                    Estamos prontos para proteger seu carro e sua renda
                </h2>
                
            </section>

            <section className="py-20 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Lock,
                            title: "Cobertura Completa",
                            description: "Proteção total para seu veículo",
                        },
                        {
                            icon: Zap,
                            title: "Aprovação Rápida",
                            description: "Processo simples e rápido",
                        },
                        {
                            icon: Phone,
                            title: "Atendimento 24/7",
                            description: "Suporte sempre disponível",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                            className={`p-8 rounded-2xl bg-white border transition-all duration-300 ${hoveredFeature === index
                                ? "border-blue-600 shadow-xl scale-105"
                                : "border-gray-200 shadow-md"
                                }`}
                        >
                            <div className="mb-4 p-3 rounded-xl bg-blue-100 w-fit">
                                <feature.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>


            


            <section className="w-full bg-gradient-to-b from-slate-900 to-slate-950 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-bold text-white">
                            O que dizem nossos clientes
                        </h2>
                        <p className="text-slate-400 mt-3 text-lg">
                            Motoristas que confiam no AutoSeguro
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-800 rounded-2xl p-8 shadow-lg">
                            <div className="flex gap-1 text-yellow-400 text-xl mb-4">
                                ★★★★★
                            </div>
                            <p className="text-slate-200 leading-relaxed mb-6">
                                "Melhor decisão que tomei. Tive um problema e o carro reserva
                                chegou no mesmo dia. Não perdi nenhum dia de trabalho!"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                    C
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Carlos Silva</p>
                                    <p className="text-slate-400 text-sm">Motorista Uber - SP</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-8 shadow-lg">
                            <div className="flex gap-1 text-yellow-400 text-xl mb-4">
                                ★★★★★
                            </div>
                            <p className="text-slate-200 leading-relaxed mb-6">
                                "Preço justo e atendimento excelente. Recomendo para todos os
                                colegas motoristas. Vale muito a pena!"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                                    M
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Marta Santos</p>
                                    <p className="text-slate-400 text-sm">Motorista 99 - RS</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-8 shadow-lg">
                            <div className="flex gap-1 text-yellow-400 text-xl mb-4">
                                ★★★★★
                            </div>
                            <p className="text-slate-200 leading-relaxed mb-6">
                                "A assistência 24h salvou minha semana. Pneu furou de madrugada
                                e em 30 minutos estava resolvido."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    J
                                </div>
                                <div>
                                    <p className="text-white font-semibold">Jose Oliveira</p>
                                    <p className="text-slate-400 text-sm">Motorista InDriver - MG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-orange-500 rounded-[48px] px-8 py-16 md:px-20 md:py-5 text-center shadow-xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Pronto para dirigir com segurança?
                        </h2>
                        <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto mb-12">
                            Faça sua cotação agora e descubra como é fácil proteger seu carro e
                            sua renda
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button 
                            onClick={()=> alert("Funcionalidade não implentada ainda.")}
                            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-50 transition">
                                <Shield className="w-5 h-5" />
                                Fazer Cotação Grátis
                                
                            </button>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}

export default Home;

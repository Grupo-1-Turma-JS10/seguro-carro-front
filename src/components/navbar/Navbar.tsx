import React from 'react'
import { House, ShieldCheck, Car, UserCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full bg-white text-slate-800 flex justify-center py-4 border-b border-slate-100 shadow-sm'>
      <div className="container flex justify-between items-center px-4">
        
        {/* Lado Esquerdo: Logo e Slogan */}
        <div className='flex items-center gap-3'>
          <div className='bg-blue-600 p-2 rounded-lg text-white'>
            <ShieldCheck size={32} weight="bold" />
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-slate-900'>AutoSeguro</span>
            <span className='text-xs text-slate-500'>Proteção para Motoristas de App</span>
          </div>
        </div>

        {/* Centro: Menu de Navegação */}
        <nav className='hidden md:flex items-center gap-8 font-medium'>
          <Link to='/' className='flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl'>
            <House size={20} />
            Home
          </Link>
          <Link to='/temas' className='flex items-center gap-2 hover:text-blue-600 transition-all'>
            <ShieldCheck size={20} />
            Seguros
          </Link>
          <Link to='/segurados' className='flex items-center gap-2 hover:text-blue-600 transition-all'>
            <Car size={20} />
            Carros Segurados
          </Link>
        </nav>

        {/* Lado Direito: Botão de Ação */}
        <div className='flex items-center gap-4'>
           <button className='bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
            Contratar Seguro
          </button>
        </div>

      </div>
    </div>
  )
}

export default Navbar
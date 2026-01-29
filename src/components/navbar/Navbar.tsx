import { Car, House, Menu, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <div className='w-full bg-white text-slate-800 flex flex-col border-b border-slate-100 shadow-sm'>
      <div className="container mx-auto flex justify-between items-center px-4 py-4">

        <div className='flex items-center gap-3'>
          <div className='bg-blue-600 p-2 rounded-lg text-white'>
            <ShieldCheck />
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-slate-900'>AutoSeguro</span>
            <span className='text-xs text-slate-500 hidden sm:block'>Proteção para Motoristas de App</span>
          </div>
        </div>

        <nav className='hidden md:flex items-center gap-8 font-medium'>
          <Link to='/'
            className={`transition-colors ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              } flex gap-2.5`}>
            <House size={20} />
            Home
          </Link>
          <Link to='/temas'
            className={`transition-colors ${isActive('/temas') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              } flex gap-2.5`}>
            <ShieldCheck size={20} />
            Seguros
          </Link>
          <Link to='/segurados'
            className={`transition-colors ${isActive('/segurados') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
              } flex gap-2.5`}>
            <Car size={20} />
            Carros Segurados
          </Link>
        </nav>

        <button
          onClick={toggleMenu}
          className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
          aria-label='Menu'
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuAberto && (
        <nav className='md:hidden border-t border-gray-100 bg-white'>
          <div className='flex flex-col px-4 py-2'>
            <Link
              to='/'
              onClick={fecharMenu}
              className={`py-3 px-4 rounded-lg transition-colors ${isActive('/')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                } flex gap-3 items-center`}
            >
              <House size={20} />
              Home
            </Link>
            <Link
              to='/temas'
              onClick={fecharMenu}
              className={`py-3 px-4 rounded-lg transition-colors ${isActive('/temas')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                } flex gap-3 items-center`}
            >
              <ShieldCheck size={20} />
              Seguros
            </Link>
            <Link
              to='/segurados'
              onClick={fecharMenu}
              className={`py-3 px-4 rounded-lg transition-colors ${isActive('/segurados')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                } flex gap-3 items-center`}
            >
              <Car size={20} />
              Carros Segurados
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}

export default Navbar
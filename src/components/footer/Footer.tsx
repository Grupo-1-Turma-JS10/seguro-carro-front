import { Shield, Phone, Mail, Clock, Car } from 'lucide-react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Car className="h-8 w-8 text-blue-500" />
            <span className="text-3xl font-bold">AutoSeguro</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Proteção completa para motoristas de aplicativo. Segurança e tranquilidade
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mt-2">
            no seu dia a dia.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Links Rápidos</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <Link to="/"><li className="hover:text-white cursor-pointer">Home</li></Link>
            <Link to="/seguros"><li className="hover:text-white cursor-pointer">Nossos Seguros</li></Link>
            <Link to="/segurados"><li className="hover:text-white cursor-pointer">Carros Segurados</li></Link>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contato</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-blue-500" />
              <span>(51) 4004-3030</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-blue-500" />
              <span>contato@autoseguro.com.br</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-500 mt-1" />
              <span>Segunda a Sexta-feira das 8h às 18h</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-sm text-gray-400">
        &copy; 2026 AutoSeguro. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
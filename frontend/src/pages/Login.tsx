import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ShieldAlert,
  Mail,
  KeyRound,
  Lock,
  ArrowRight
} from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 relative overflow-hidden font-sans">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-[#f9f5ff] to-slate-50 z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 animate-blob animation-delay-2000" />

      {/* Header Fixo */}
      <header className="relative z-10 w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="GirliES Logo" className="h-16 md:h-20 w-auto object-contain" />
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-100/50 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />
          <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
            Ambiente Institucional 2026.2
          </span>
        </div>
      </header>

      {/* Container Central do Card */}
      <main className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-[1000px] min-h-[600px] bg-white rounded-[2rem] shadow-2xl shadow-purple-900/10 flex flex-col md:flex-row overflow-hidden border border-white/50 backdrop-blur-xl">
          
          {/* Metade Esquerda - Dark Mode */}
          <div className="w-full md:w-[45%] bg-[#3b125f] relative p-12 flex flex-col justify-center overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Badge Topo */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full self-start mb-8 text-white/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                  Acesso Restrito à Coordenação & Monitoria
                </span>
              </div>

              {/* Títulos */}
              <h1 className="text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Espaço de Gestão <br />
                <span className="text-emerald-400">GirliES</span> Extension
              </h1>
              
              <p className="text-sm text-white/70 leading-relaxed max-w-sm font-medium mb-auto">
                Ambiente exclusivo para monitoras, docentes e equipe técnica organizarem aulas, oficinas, eventos com calouras e o pipeline de comunicação.
              </p>

              {/* Checklist inferior */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold">Aulas & Ementas</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold">Kanban Instagram</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold">Acolhida & Encontros</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metade Direita - Formulário */}
          <div className="w-full md:w-[55%] bg-white p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Header do Form */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-bold text-girlies-purple font-mono uppercase tracking-widest mb-2">
                    Autenticação Segura
                  </p>
                  <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    Acesso ao GirliES
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Alerta */}
              <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl p-4 flex gap-3 mb-8">
                <ShieldAlert className="w-5 h-5 text-girlies-purple flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">Acesso Restrito ao Squad</span>
                  <span className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    Informe seu <span className="font-semibold text-girlies-purple">e-mail</span> e a respectiva <span className="font-semibold text-girlies-purple">chave/token</span> vinculada à coordenação ou monitoria.
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                {/* Input Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">E-mail</label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.nome@discente.ifpe.edu.br"
                      className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-girlies-purple focus:ring-1 focus:ring-girlies-purple transition-all placeholder:text-slate-400 placeholder:font-normal"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Input Token */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Token de Autenticação</label>
                  <div className="relative">
                    <input
                      required
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Sua chave de acesso"
                      className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-sm font-medium focus:bg-white focus:outline-none focus:border-girlies-purple focus:ring-1 focus:ring-girlies-purple transition-all placeholder:text-slate-400 placeholder:font-normal"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[9px] font-mono text-slate-400 pl-1 mt-0.5 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full border border-slate-300 flex items-center justify-center text-[7px]">i</span>
                    Chave fornecida no onboarding da equipe.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-[#6b21a8] hover:bg-[#581c87] disabled:opacity-70 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-4 h-4 text-purple-200 group-hover:text-white transition-colors" />
                  {isLoading ? 'Autenticando...' : 'Entrar no Sistema'}
                  {!isLoading && <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-all ml-1" />}
                </button>
              </form>

              {/* Link Solicitacao */}
              <div className="mt-8 text-center border-t border-slate-100 pt-8">
                <p className="text-[11px] font-medium text-slate-500">
                  Ainda não foi vinculada à equipe do GirliES?{' '}
                  <button type="button" className="text-girlies-purple font-bold hover:underline">
                    Solicite acesso à administradora (Letícia Barboza)
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Fixo */}
      <footer className="relative z-10 w-full px-8 py-6 flex items-center justify-between border-t border-slate-200/50 bg-white/30 backdrop-blur-sm mt-auto">
        <p className="text-[10px] font-bold text-slate-600 font-mono tracking-wider">
          GirliES Hub Operacional <span className="text-girlies-purple mx-1">•</span> <span className="text-slate-400 font-medium">Instituto Federal de Pernambuco (IFPE)</span>
        </p>
        <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest">
          v2.6.2
        </span>
      </footer>
    </div>
  );
}

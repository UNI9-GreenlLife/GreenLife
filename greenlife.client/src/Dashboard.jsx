import { Home, Users, CircleHelp, User } from 'lucide-react'

function Dashboard() {
  return (
      <div className="flex bg-zinc-950 min-h-screen bg-gradient-to-b from-green-800/20 to-transparent h-screen text-zinc-200">
          <div className="flex flex-col justify-between bg-zinc-950 p-6 py-8">
              <aside className="w-72">
              <nav className="space-y-8">
                      <a href="" className="flex items-center gap-4 font-bold text-zinc-200 hover:text-zinc-300" >
                      <Home />Home
                  </a> 
                  <a href="" className="flex items-center gap-4 font-bold text-zinc-200 hover:text-zinc-300" >
                      <Users />Funcionarios
                  </a> 
                  <a href="" className="flex items-center gap-4 font-bold text-zinc-200 hover:text-zinc-300" >
                      <CircleHelp />Ajuda
                  </a>
              </nav>

              </aside>
              <p className="text-zinc-600 text-lg"> &copy; Greenlife Co.</p>
          </div>

          { /* Main Content*/ }
          <main className="flex-1 p-6">
              <p className="text-3xl font-bold">Bem vindo!</p>
          </main>
      </div>
  );
}

export default Dashboard;
import { useState } from 'react';

function EmployeesPage() {

    const [nomeEmpresa] = useState('Logitech');

  return (
      <>
          <p className="text-3xl font-bold text-zinc-300">{nomeEmpresa}</p>

      </>
  );
}

export default EmployeesPage;
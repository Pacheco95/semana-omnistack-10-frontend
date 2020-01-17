import React, { useEffect, useState } from 'react';

import './styles/global.css';
import './styles/App.css';
import './styles/Main.css';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    console.log('Loading devs list ...');

    async function loadDevs() {
      const response = await api.get('/devs');
      console.log('Devs list loaded', response.data);
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

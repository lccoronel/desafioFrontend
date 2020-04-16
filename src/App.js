import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function listRespositories() {
      const response = await api.get('repositories');
      setRepositories(response.data);
    }

    listRespositories();
  }, [])

  async function handleAddRepository() {
    var dateTd = new Date();

    var day = dateTd.getDate();           
    var month = dateTd.getMonth();     
    var yaer = dateTd.getFullYear();  
    var hour = dateTd.getHours();
    var min = dateTd.getMinutes();
    var sec = dateTd.getSeconds();     

    var date = day + '/' + ( month + 1 ) + '/' + yaer + ' ' + hour + ':' + min + ':' + sec;

    const response = await api.post('repositories', {
      title: `Novo projeto ${ date }`,
      url: "https://github.com/lccoronel",
      techs: ["NodeJS", "ReactJs", "React Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const response = await api.get('repositories');

    const repository = response.data;
    setRepositories(repository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

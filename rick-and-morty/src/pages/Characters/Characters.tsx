import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Character } from '../../types';
import { Button } from 'react-bootstrap';

//components
import Header from '../../components/header/header';




const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get(`character?page=${page}`);
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [page]);

  return (
    <>
  <Header />
    <div className='G'>
      <h1 className='TituloP'>Personagens</h1>
      <div className="character-list">
        {characters.map((character) => (
          <Link to={`/characters/${character.id}`} key={character.id} className="character-card">
            <img className='PersonaI' src={character.image} alt={character.name} />
            <h4>{character.name}</h4 >
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Location: {character.location.name}</p>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <Button className='Botao' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Anterior
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>
          Proximo
        </Button>
      </div>
    </div>

    </>
  );
};

export default Characters;

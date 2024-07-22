import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { Character } from '../types';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await api.get(`character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      <h2>Episodes</h2>
      <ul>
        {character.episode.map((episodeUrl) => {
          const episodeId = episodeUrl.split('/').pop();
          return (
            <li key={episodeId}>
              <Link to={`/episodes/${episodeId}`}>Episode {episodeId}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CharacterDetail;

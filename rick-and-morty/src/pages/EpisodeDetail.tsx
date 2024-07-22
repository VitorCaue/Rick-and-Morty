import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { Episode, Character } from '../types';

const EpisodeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await api.get(`episode/${id}`);
        setEpisode(response.data);

        const characterPromises = response.data.characters.map((url: string) =>
          api.get(url).then((res) => res.data)
        );
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching episode:', error);
      }
    };

    fetchEpisode();
  }, [id]);

  if (!episode) return <div>Loading...</div>;

  return (
    <div>
      <h1>{episode.name}</h1>
      <p>Air Date: {episode.air_date}</p>
      <h2>Characters</h2>
      <div className="character-list">
        {characters.map((character) => (
          <Link to={`/characters/${character.id}`} key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeDetail;

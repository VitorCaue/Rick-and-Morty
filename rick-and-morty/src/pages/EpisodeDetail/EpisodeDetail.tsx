import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import { Episode, Character } from '../../types';


//components
import Header from '../../components/header/header';

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
    <>
    <Header />
    <div className='G'>
      <h1 className='TituloP'>{episode.name}</h1>
      <h6>Lançamento: {episode.air_date}</h6>
      <h2 className='TituloP'>Personagens</h2>
      <div className="character-list">
        {characters.map((character) => (
          <Link to={`/characters/${character.id}`} key={character.id} className="character-card">
            <img className='PersonaI' src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default EpisodeDetail;

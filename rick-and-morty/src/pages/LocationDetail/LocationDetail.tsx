import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import { Location, Character } from '../../types';

//components
import Header from '../../components/header/header';

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await api.get(`location/${id}`);
        setLocation(response.data);

        const characterPromises = response.data.residents.map((url: string) =>
          api.get(url).then((res) => res.data)
        );
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, [id]);

  if (!location) return <div>Loading...</div>;

  return (
    <>
    <Header />
    <div className='G'>
      <h1 className='TituloP'>{location.name}</h1>
      <h6>Type: {location.type}</h6>
      <br />
      <h6>Dimension: {location.dimension}</h6>
      <h2 className='TituloP'>Residentes</h2>
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

export default LocationDetail;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Episode } from '../../types';
import { Button } from 'react-bootstrap';
import './Episodes.css'

//components
import Header from '../../components/header/header';

const Episodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await api.get(`episode?page=${page}`);
        setEpisodes(response.data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, [page]);

  return (
    <>
    <div className='G'>
      <Header />
      <h1 className='TituloP'>Episódios</h1>
      <div className="episode-list">
        {episodes.map((episode) => (
          <div className='ep'>
          <Link to={`/episodes/${episode.id}`} key={episode.id} className="episode-card">
            <h2>{episode.name}</h2>
            <p>Lançamento: {episode.air_date}</p>
          </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Button className='Botao' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
    </>
  );
};

export default Episodes;

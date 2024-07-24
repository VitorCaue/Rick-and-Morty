import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Location } from '../../types';
import { Button } from 'react-bootstrap';

//components
import Header from '../../components/header/header';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get(`location?page=${page}`);
        setLocations(response.data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [page]);

  return (
    <>
    <div className='G'>
      <Header />
      <h1 className='TituloP'>Lugares</h1>
      <div className="location-list">
        {locations.map((location) => (
          <div className='loc'>
          <Link to={`/locations/${location.id}`} key={location.id} className="location-card">
            <h2>{location.name}</h2>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
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

export default Locations;

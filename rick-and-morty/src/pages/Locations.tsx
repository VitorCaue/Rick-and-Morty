import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Location } from '../types';
import { Button } from 'react-bootstrap';

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
    <div>
      <h1>Locations</h1>
      <div className="location-list">
        {locations.map((location) => (
          <Link to={`/locations/${location.id}`} key={location.id} className="location-card">
            <h2>{location.name}</h2>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
          </Link>
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
  );
};

export default Locations;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import { Character } from "../../types";
import "./CharecterDetail.css";

//components
import Header from "../../components/header/header";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await api.get(`character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="G">
        <div className="Char">
          <h1>{character.name}</h1>
          <div className="borda">
            <img className="ImgP" src={character.image} alt={character.name} />
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Origin: {character.origin.name}</p>
            <p>Location: {character.location.name}</p>
          </div>
        </div>
        <div className="lista">
          <h2>Episódios:</h2>
          <hr />
          <ul>
            {character.episode.map((episodeUrl) => {
              const episodeId = episodeUrl.split("/").pop();
              return (
                <li className="Lin" key={episodeId}>
                  <Link className="eps" to={`/episodes/${episodeId}`}>
                    Episode {episodeId}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CharacterDetail;

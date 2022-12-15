import Form from 'react-bootstrap/Form';
import Fuse from "fuse.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import professions from './data/professions.json';
import './App.css';
import {useState} from "react";

function App() {
  const [query, setQuery] = useState('');

  const fuse = new Fuse(professions, {
    keys: [
      'labels.fr_FR',
      'specialties.labels.fr_FR',
    ],
    threshold: 0.4,
  });

  const results = fuse.search(query);
  const usersResults = query ? results.map(profession => profession.item) : professions;

  const handleOnSearch = ({currentTarget = {}}) => {
    const { value } = currentTarget;
    setQuery(value);
  }

  return (
    <div className="App">
      <div className="search">
        <h1>FUZZY-SEARCH WITH FUSE.JS</h1>
        <Form.Label htmlFor="inputPassword5">Search</Form.Label>
        <Form.Control
        type="text"
        id="search"
        aria-describedby="passwordHelpBlock"
        placeholder="search"
        value={query}
        onChange={handleOnSearch}
        />
      </div>
      <div className="users">
      {
        usersResults.length ?
        usersResults.map((p, index) => {
          return (
            <div key={index} className="userCard">
              <p>Profession : {p.labels.fr_FR}</p>
              <br/>
                {p.specialties.map(specialty => (
                  <ul> - {specialty.labels.fr_FR}</ul>
                ))}
            </div>
          )
        }) : <p>Pas de résultat</p>
      }
      </div>
    </div>
  );
}

export default App;

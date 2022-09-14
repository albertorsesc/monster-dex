import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) =>  setMonsters(users))
  }, []);

  useEffect(() => {
    const filtered = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(query);
    });

    setFilteredMonsters(filtered);
  }, [monsters, query]);

  const onSearch = (event) => {
    const queryString = event.target.value.toLocaleLowerCase();

    setQuery(queryString);
  };

  return (
    <div className="App">
      <h1 className='app-title'>Monster Dex</h1>
      <SearchBox 
        onChangeHandler={onSearch} 
        className='monsters-search-box'
        placeholder='search monsters' />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;

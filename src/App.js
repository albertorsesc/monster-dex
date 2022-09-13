import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      query: '',
    };

    console.log('constructor')
  }

  componentDidMount() {
    console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => 
        this.setState(() => {
          return { monsters: users }
        })
      )
  }

  onSearch = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    
    this.setState(() => {
      return { query: searchField };
    });
  };

  render() {
    console.log('render')

    const { monsters, query } = this.state;
    const { onSearch } = this;

    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(query);
    });

    return (
      <div className="App">
        <SearchBox 
          onChangeHandler={onSearch} 
          className='monsters-search-box'
          placeholder='search monsters' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

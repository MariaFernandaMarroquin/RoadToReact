import * as React from 'react';

const List = ({list}) => (
  <ul>
    {list.map(({objectID, ...item}) => ( //Use of the rest operator to separate the objectID from the item object since its just a key and its not used in the item component. In this way this is more concise. 
      <Item key={objectID} {...item}/> //Use of the spread operator to be more concise
    ))}
  </ul>
);

const Item = ({title, url, author, num_comments, points}) => (
  <li> {/* Here key is erased because we are using spread operator */}
    <span>
      <a href={url}>{title}</a>
    </span>
    <span> {author} </span>
    <span> {num_comments} </span>
    <span> {points} </span>
  </li>
);

// By destructuring the props object right away in the component’s function signature, we can conveniently access all information without dealing with its props container.
const Search = ({ search, onSearch }) => (
  //If a component below needs to use the state (e.g. displaying it), pass it down as props.
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} /> 
    </div>
  );

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ];

  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search' || 'React'));


  //Introduced as a event handler
  const handleSearch = (event) => {
    //Here a callback handler is used to to update the state above in the parent (App component)
    setSearchTerm(event.target.value);

    localStorage.setItem('search', event.target.value)
  };

  //Aquí se va a filtrar a través de una función anonima que filtre el property de title con el término de búsqueda
  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      
       {/* Passed as function in props to another component (search) */}
      <Search search={searchTerm} onSearch={handleSearch}/>

      <hr />

      {/* The stories will be filtered thanks to filter method and function above */}
      <List list={searchedStories} />

    </div>
  )
};

export default App;

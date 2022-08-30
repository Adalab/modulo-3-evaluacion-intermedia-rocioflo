import '../styles/App.css';
import { useState, useEffect } from 'react';
import callToApi from '../services/api';

function App() {
  //Variables de estado
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [filteredQuotes, setFilteredQuotes] = useState({
    quoteFilter: '',
    characterFilter: 'all',
  });

  //Llamada a la Api

  useEffect(() => {
    callToApi().then((data) => {
      console.log('api called');
      setQuotes(data);
    });
  }, []);

  //Pintado y filtrado de frases
  const renderQuotes = quotes

    .filter((quote) => {
      if (filteredQuotes.characterFilter === 'all') {
        return quote.quote
          .toLowerCase()
          .includes(filteredQuotes.quoteFilter.toLowerCase());
      } else {
        return (
          quote.quote
            .toLowerCase()
            .includes(filteredQuotes.quoteFilter.toLowerCase()) &&
          quote.character.toLowerCase() ===
            filteredQuotes.characterFilter.toLowerCase()
        );
      }
    })

    .map((quote, index) => {
      return (
        <li key={index} className="list-element">
          {quote.quote} - {quote.character}
        </li>
      );
    });

  const handleFilter = (ev) => {
    setFilteredQuotes({ ...filteredQuotes, [ev.target.id]: ev.target.value });
  };

  //Recogida de info de los inputs

  const handleInput = (ev) => {
    setNewQuote({ ...newQuote, [ev.target.id]: ev.target.value });
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (newQuote.quote !== '' && newQuote.character !== '') {
      if (
        newQuote.character.toLowerCase() === 'monica' ||
        newQuote.character.toLowerCase() === 'chandler' ||
        newQuote.character.toLowerCase() === 'phoebe' ||
        newQuote.character.toLowerCase() === 'ross' ||
        newQuote.character.toLowerCase() === 'joey' ||
        newQuote.character.toLowerCase() === 'rachel'
      ) {
        console.log(newQuote.character);
        setQuotes([...quotes, newQuote]);
        setNewQuote({
          quote: '',
          character: '',
        });
        setErrorMessage('');
      } else {
        setErrorMessage(
          <p className="error-message">No inventes nombres, my friend.</p>
        );
      }
    } else {
      setErrorMessage(
        <p className="error-message">Rellena ambos campos, my friend.</p>
      );
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>So no one told you React was gonna be this way 👏👏👏👏</h1>
        <div className="filter-inputs">
          <label htmlFor="quoteFilter" className="filter-input-quote">
            Filtrar por frase
            <input
              type="text"
              id="quoteFilter"
              onChange={handleFilter}
              value={filteredQuotes.quoteFilter}
            ></input>
          </label>
          <label htmlFor="characterFilter" className="filter-input-character">
            Filtrar por personaje
            <select
              id="characterFilter"
              value={filteredQuotes.characterFilter}
              onChange={handleFilter}
            >
              <option value="all">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Monica">Monica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </label>
        </div>
      </header>
      <main>
        <section className="quote-list">
          <ul>{renderQuotes}</ul>
        </section>
        <section className="add-quote">
          <h3>Añadir una nueva frase</h3>
          {errorMessage}
          <form>
            <label>
              Frase
              <input
                type="text"
                onChange={handleInput}
                id="quote"
                value={newQuote.quote}
              ></input>
            </label>
            <label>
              Personaje
              <input
                type="text"
                onChange={handleInput}
                id="character"
                value={newQuote.character}
              ></input>
            </label>
            <input
              type="submit"
              value="Añadir una nueva frase"
              onClick={handleSubmit}
            ></input>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;

import '../styles/App.css';
import { useState } from 'react';
import quotesFriends from '../data/quotes.json';

function App() {
  //Variables de estado
  const [quotes, setQuotes] = useState(quotesFriends);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [filteredQuotes, setFilteredQuotes] = useState({
    quoteFilter: '',
    characterFilter: 'all',
  });

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
        <li key={index}>
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

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setQuotes([...quotes, newQuote]);
    setNewQuote({
      quote: '',
      character: '',
    });
  };

  return (
    <div className="App">
      <header>
        <h1>So no one told you life was gonna be this way 👏👏👏👏</h1>
        <label>
          Filtrar por frase
          <input
            type="text"
            id="quoteFilter"
            onChange={handleFilter}
            value={filteredQuotes.quoteFilter}
          ></input>
        </label>
        <label>
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
      </header>
      <main>
        <section>
          <ul>{renderQuotes}</ul>
        </section>
        <section>
          <h3>Añadir una nueva frase</h3>
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

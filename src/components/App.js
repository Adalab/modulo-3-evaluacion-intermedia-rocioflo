import '../styles/App.css';
import { useState } from 'react';
import quotesFriends from '../data/quotes.json';

function App() {
  //Variables de estado
  const [quotes, setQuotes] = useState(quotesFriends);
  const [newQuote, setNewQuote] = useState({
    quoteInput: '',
    characterInput: '',
  });
  const [filteredQuotes, setFilteredQuotes] = useState({
    quoteFilter: '',
    characterFilter: 'all',
  });

  //Pintado y filtrado de frases
  const renderQuotes = quotes
    .filter((quote) => {
      return quote.quote
        .toLowerCase()
        .includes(filteredQuotes.quoteFilter.toLowerCase());
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
      quoteInput: '',
      characterInput: '',
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
            value={filteredQuotes.quote}
          ></input>
        </label>
        <label>
          Filtrar por personaje
          <select
            id="characterFilter"
            value={filteredQuotes.character}
            onChange={handleFilter}
          >
            <option value="all">Todos</option>
            <option value="Ross">Ross</option>
            <option>Monica</option>
            <option>Joey</option>
            <option>Phoebe</option>
            <option>Chandler</option>
            <option>Rachel</option>
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
                id="quoteInput"
                value={newQuote.quote}
              ></input>
            </label>
            <label>
              Personaje
              <input
                type="text"
                onChange={handleInput}
                id="characterInput"
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

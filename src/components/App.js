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

  //Pintado de frases
  const renderQuotes = quotes.map((quote, index) => {
    return (
      <li key={index}>
        {quote.quote} - {quote.character}
      </li>
    );
  });

  //Recoger info de los inputs

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
        <h1>Frases de Friends</h1>
        <label>
          Filtrar por frase
          <input type="text"></input>
        </label>
        <label>
          Filtrar por personaje
          <input type="select"></input>
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

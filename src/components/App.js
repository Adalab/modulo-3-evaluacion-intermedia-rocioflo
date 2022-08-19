import '../styles/App.css';
import { useState } from 'react';
import quotesFriends from '../data/quotes.json';

function App() {
  const [quotes, setQuotes] = useState(quotesFriends);

  const renderQuotes = quotes.map((quote, index) => {
    return (
      <li key={index}>
        {quote.quote}
        {quote.character}
      </li>
    );
  });

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
              <input type="text"></input>
            </label>
            <label>
              Personaje
              <input type="text"></input>
            </label>
            <input type="submit" value="Añadir una nueva frase"></input>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;

import PoinstPerPlayer from './PoinstPerPlayer';
import {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';

const getLocalStorage = () => {
  let list = localStorage.getItem('players');
  if (list) {
    return JSON.parse(localStorage.getItem('players'));
  } else {
    return [];
  }
};

function App() {
  const [number, setNumber] = useState('');
  const [totPoints, setTotPoints] = useState(0);
  const [players, setPlayers] = useState(getLocalStorage());

  const submitHandler = (e) => {
    e.preventDefault();

    const existingScorer = players.find((player) => player.nummer === number);

    if (existingScorer) {
      console.log('already on list!');
      setNumber('');
      return;
    } else {
      const newPlayer = {id: nanoid(4), nummer: number, totPoints: totPoints};
      setPlayers([...players, newPlayer]);
      setNumber('');
    }
  };
  const onOnePointMade = (e) => {
    e.preventDefault();
    const scorer = [...players];
    const existingScorer = scorer.find((player) => player.number === number);
    const new_totpoints = totPoints + 1;

    if (existingScorer) {
      setTotPoints(new_totpoints);
      existingScorer.totPoints = new_totpoints;
      setPlayers(scorer);
    } else {
      const newScorer = {
        id: nanoid(4),
        number: number,
        totPoints: 1,
      };
      setPlayers([...players, newScorer]);
    }
  };

  /* useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]); */
  const onNewTeam = () => {
    setPlayers([]);
    // localStorage.clear();
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={submitHandler}>
        {/* {alreadyInList && <h1>number is in list</h1>} */}
        <h3>Points per player</h3>
        <div className="form-control">
          <input
            type="number"
            className="grocery"
            value={number}
            placeholder="enter shoter number"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <button onClick={onOnePointMade} type="button" className="submit-btn">
            Add 1
          </button>
        </div>
      </form>
      {players.length > 0 && (
        <div className="grocery-container">
          <h4>Output</h4>
          <PoinstPerPlayer players={players} />
          <button className="clear-btn" onClick={onNewTeam}>
            new Team
          </button>
        </div>
      )}
    </section>
  );
}

export default App;

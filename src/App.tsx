import React from 'react';
import { data } from './data';

const INITIAL_STATE =
  process.env.NODE_ENV === 'development' ? '17, 18, 24, 25, 37, 49, 50, 52, 58, 59, 60, 67, 79, 92, 98' : '';

const App: React.FC = () => {
  const [input, setInput] = React.useState<string>(INITIAL_STATE);

  const nums = input
    .split(/\D+/g)
    .filter(v => v.length > 0)
    .map(v => parseInt(v, 10));

  const matching = nums.map(num => data.find(v => v.num === num));

  const total = matching.reduce((acc, item) => {
    if (!item) {
      return acc;
    }
    return acc + (item.captured ? item.points : 0);
  }, 0);

  const list = matching.length === 0 ? data : matching;

  return (
    <div className="App">
      <h1>Expedition Max Bird - Point counter</h1>
      <p className="source">
        Sources : <a href="https://github.com/etienne-dldc/maxbird-counter">etienne-dldc/maxbird-counter</a>
      </p>
      <p>Entrez vos numéros:</p>
      <input placeholder="17, 18, 24..." value={input} onChange={e => setInput(e.target.value)} />
      <p>
        {nums.length} {nums.length === 1 ? 'numéro' : 'numéros'}{' '}
      </p>
      <div className="nums">
        {nums.map((num, index) => (
          <span key={index} className="num">
            {num}
          </span>
        ))}
      </div>

      <div className="score">
        Score: <span className="points">{total} points</span>
      </div>
      <div className="items">
        {list.map((piaf, index) => {
          if (!piaf) {
            return (
              <div className="item" key={index}>
                Invalid number
              </div>
            );
          }
          return (
            <div
              className="item"
              key={index}
              style={{ background: piaf.captured ? '#E0E0E0' : 'white', opacity: piaf.captured ? 1 : 0.5 }}
            >
              <span className="num">{piaf.num}</span>
              <span className="name">{piaf.name}</span>
              <span className="points">{piaf.points} points</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import { data } from './data';

const App: React.FC = () => {
  const [input, setInput] = React.useState<string>('17, 18, 24, 25, 37, 49, 50, 52, 58, 59, 60, 67, 79, 92, 98');

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

  return (
    <div className="App">
      <h1>Expedition Max Bird - Point counter</h1>
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
        {matching.map((piaf, index) => {
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
              <span className="points">{piaf.points} points</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

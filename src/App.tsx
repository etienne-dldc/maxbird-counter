import React from 'react';
import { data } from './data';

const App: React.FC = () => {
  const [input, setInput] = React.useState<string>('');

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
      <div>
        <input placeholder="17, 18, 24..." value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <div>{nums.join(' - ')}</div>
      <div>
        {matching.map((piaf, index) => {
          if (!piaf) {
            return <div key={index}>Invalid number</div>;
          }
          return (
            <div key={index} style={{ background: piaf.captured ? 'red' : 'white' }}>
              {piaf.num} - {piaf.points} points
            </div>
          );
        })}
      </div>
      <div>Total: {total} points</div>
    </div>
  );
};

export default App;

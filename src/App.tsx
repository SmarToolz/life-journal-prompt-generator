
import React, { useEffect, useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    fetch('/prompts.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const goals = Object.keys(data.journalGoals);
        const randomGoal = goals[Math.floor(Math.random() * goals.length)];
        const types = Object.keys(data.journalGoals[randomGoal]);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const prompts = data.journalGoals[randomGoal][randomType];
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setPrompt(randomPrompt);
      })
      .catch(error => console.error('Error loading prompts:', error));
  }, []);

  return (
    <div>
      <h1>My Journal Prompt Generator</h1>
      <p>{prompt || 'Loading prompt...'}</p>
    </div>
  );
}

export default App;

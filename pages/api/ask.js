import { useState } from 'react';


export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    const res = await fetch('/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.response);
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          rows="4"
          cols="50"
        ></textarea>
        <button type="submit">Ask</button>
      </form>
      <div>
        <p>Response:</p>
        <p>{response}</p>
      </div>
    </div>
  );
}

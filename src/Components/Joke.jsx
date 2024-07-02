import { useState } from "react";
import "../styles/Joke.css";

export default function Joke({ id, vote, votes, text }) {
  const [currentVotes, setVotes] = useState(votes); // Use `votes` from props instead of initializing with 0

  const increment = () => {
    setVotes(currentVotes + 1);
  };

  const decrement = () => {
    setVotes(currentVotes - 1);
  };

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={increment}>Thumbs Up</button>
        <button onClick={decrement}>Thumbs Down</button>
        <p>Total Votes: {currentVotes}</p>
      </div>
      <div className="Joke-text">{text}</div>
    </div>
  );
}

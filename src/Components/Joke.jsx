import { useState } from "react";
import "../styles/Joke.css";

export default function Joke({ id, vote, votes, text }) {
  const [currentVotes, setVotes] = useState(votes);

  const increment = () => {
    setVotes(currentVotes + 1);
  };

  const decrement = () => {
    setVotes(currentVotes - 1);
  };

  return (
    <div className="Joke" key={id}>
      <div className="Joke-votearea">
        <button onClick={increment}>Thumbs Up</button>
        <button onClick={decrement}>Thumbs Down</button>
        <p>Total Votes: {currentVotes}</p>
        <p>Vote: {vote}</p>
      </div>
      <div className="Joke-text">{text}</div>
    </div>
  );
}

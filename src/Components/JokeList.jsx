import axios from "axios";
import Joke from "./Joke";
import { useState, useEffect } from "react";
import "../styles/JokeList.css";

export default function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getJokes = async () => {
    try {
      let jokesArray = [];
      let seenJokes = new Set();

      while (jokesArray.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { id, joke } = res.data;

        if (!seenJokes.has(id)) {
          seenJokes.add(id);
          jokesArray.push({ id, joke, votes: 0 });
        } else {
          console.log("Duplicate joke found!");
        }
      }

      setJokes(jokesArray);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getJokes();
  }, []);
  const generateNewJokes = () => {
    setIsLoading(true);
    getJokes();
  };
  const vote = (id, delta) => {
    setJokes((prevJokes) =>
      prevJokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };
  const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {isLoading ? (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      ) : (
        sortedJokes.map((j) => (
          <Joke
            key={j.id}
            id={j.id}
            text={j.joke}
            votes={j.votes}
            vote={vote}
          />
        ))
      )}
    </div>
  );
}

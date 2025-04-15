import React, { useState, useEffect, useRef } from 'react';
 

// Dan Abramov's useInterval hook
// see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
 
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const TypewriterEffect = () => {
  const [sentence, setSentence] = useState('');
  const [cutoffIndex, setCutoffIndex] = useState(0);
  const displayedText = sentence.substr(0, cutoffIndex);
  const delay = 100;
  const hasLettersLeft = cutoffIndex < sentence.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSentence(data.get("sentence"));
    setCutoffIndex(0);
  };

  useInterval(() => {
     setCutoffIndex(cutoffIndex + 1);
  }, hasLettersLeft ? delay : null);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="sentence"
          placeholder="Type a sentence"
          style={{ width: "300px" }}
        />
        <button type="submit">Display with typewriter effect</button>
      </form>
      <h1>{displayedText}<h1/>
    </div>
  );
};

export default TypewriterEffect;

const TypewriterEffect = () => {
  const [displayedText, setDisplayedText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sentence = data.get("sentence");
    const intervalId = setInterval(() => {
        setDisplayedText(prevText => {
           if(prevText.length === sentence.length) {
               clearInterval(intervalId);
               return prevText;
           }
           return sentence.substr(0, prevText.length+1);
        });
    }, 100);
  };
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
      <h1>{displayedText}</h1>
    </div>
  );
};

export default TypewriterEffect;

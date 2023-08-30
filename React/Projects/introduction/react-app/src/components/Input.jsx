const Input = ({ colorInput, setColorInput }) => {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="colorBox"
          type="text"
          placeholder="Add color value"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
        />
      </form>
    </>
  );
};

export default Input;

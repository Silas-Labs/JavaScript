const Square = ({ colorInput }) => {
  return (
    <section className="square" style={{ backgroundColor: colorInput }}>
      <p>{colorInput ? colorInput : "Empty value"}</p>
    </section>
  );
};

export default Square;

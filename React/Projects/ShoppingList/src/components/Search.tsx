function Search({ setSearchItem }) {
  return (
    <div className="container inline">
      <input
        type="text"
        autoFocus
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;

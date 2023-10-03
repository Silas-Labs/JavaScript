import { useRef } from "react";
import { FaPlus } from "react-icons/fa";

function AddItem({ onSubmit, setNewItem, newItem }) {
  const inputRef = useRef();
  return (
    <form className="container" onSubmit={(e) => onSubmit}>
      <input
        type="text"
        autoFocus
        ref={inputRef}
        required
        placeholder="Add Item..."
        onChange={(e) => setNewItem(e.target.value)}
        value={newItem}
      />
      <button id="add" onClick={() => inputRef.current.focus()} type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

export default AddItem;

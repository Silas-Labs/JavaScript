import Header from "./components/Header.jsx";
import ListGroup from "./components/ListGroup.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import { useState, useEffect } from "react";
import AddItem from "./components/AddItem.jsx";
import apiRequest from "./components/apiRequest.jsx";

function App() {
  const API_URL = "http://localhost:3000/items";

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist")) || []
  );
  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [fetchErrorDetails, setFetchErrorDetails] = useState("");

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("shoppinglist"));
    setItems(list);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const saveToStorage = (listItem) => {
    localStorage.setItem("shoppinglist", JSON.stringify(listItem));
    setItems(listItem);
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, item, checked: false };
    const listItem = [...items, myNewItem];
    saveToStorage(listItem);
  };

  const onCheck = async (id) => {
    const listItem = items.map((item) =>
      item.id == id ? { ...item, checked: !item.checked } : item
    );
    saveToStorage(listItem);
  };

  const onDelete = async (id) => {
    const listItem = items.filter((item) => item.id != id);
    saveToStorage(listItem);
  };

  return (
    <div className="App">
      <Header />
      <AddItem onSubmit={onSubmit} setNewItem={setNewItem} newItem={newItem} />
      <Search
        //Search={onSearch}
        setSearchItem={setSearchItem}
        searchItem={searchItem}
      />
      <ListGroup
        onClickCheck={onCheck}
        onClickDelete={onDelete}
        items={items.filter((item) =>
          item.item.toLowerCase().includes(searchItem.toLowerCase())
        )}
        fetchError={fetchError}
        fetchErrorDetails={fetchErrorDetails}
      />
      <Footer />
    </div>
  );
}

export default App;

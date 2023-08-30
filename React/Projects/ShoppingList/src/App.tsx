import Header from "./components/Header";
import ListGroup from "./components/ListGroup";
import Footer from "./components/Footer";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import AddItem from "./components/AddItem";
import apiRequest from "./components/apiRequest";

import "./bootstrap/css/bootstrap.css";
import "./bootstrap/js/bootstrap.js";

function App() {
  const API_URL = "http://localhost:3000/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [fetchErrorDetails, setFetchErrorDetails] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Error fetching data");
        const dataItems = await response.json();
        setItems(dataItems);
      } catch (error) {
        setFetchError(error.message);
        setFetchErrorDetails(error.stack);
      }
    };
    fetchItems();
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

    const postObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL, postObj);
    if (result) {
      setFetchError(result);
    }
  };

  const onCheck = async (id) => {
    const listItem = items.map((item) =>
      item.id == id ? { ...item, checked: !item.checked } : item
    );
    saveToStorage(listItem);

    const myItem = listItem.filter((item) => item.id == id);
    const updateObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const result = await apiRequest(`${API_URL}/${id}`, updateObj);
    if (result) {
      setFetchError(result);
    }
  };

  const onDelete = async (id) => {
    const listItem = items.filter((item) => item.id != id);
    saveToStorage(listItem);

    const delOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await apiRequest(`${API_URL}/${id}`, delOptions);
    if (result) {
      setFetchError(result);
    }
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

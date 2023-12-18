import Header from "./components/Header.jsx";
import ListGroup from "./components/ListGroup.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import { useState, useEffect } from "react";
import AddItem from "./components/AddItem.jsx";
import DatePicker from "./components/DatePicker.jsx";

//////
// [{"12/12/2023":[{"id":3,"item":"Nuts and Peas","checked":false},{"id":4,"item":"Honey","checked":false},{"id":5,"item":"Milk","checked":false},{"id":6,"item":"Cheese","checked":false},{"id":7,"item":"Biscuits","checked":false}]}]
/////

function App() {
  const API_URL = "http://localhost:3000/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [fetchErrorDetails, setFetchErrorDetails] = useState("");

  const [dateSelectPast, setdateSelectPast] = useState(false);
  const [dateSelectFuture, setdateSelectFuture] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [loadedDate, setLoadedDate] = useState("");
  const [addTextBoxVisible, setAddTextBoxVisible] = useState(true);
  const [addTextBoxFuture, setAddTextBoxFuture] = useState(true);
  const [addTextBoxPast, setAddTextBoxPast] = useState(true);
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();
    const today =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    setToday(today);
    const defaultLoadData = allItems[today] || allItems[loadedDate] || [];
    setItems(defaultLoadData);
  }, [allItems]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("datedToDo")) || [];
    setAllItems(list);
  }, [loadedDate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  const saveToStorage = (listItem) => {
    localStorage.setItem("datedToDo", JSON.stringify(listItem));
  };

  const addItem = async (item) => {
    const objectToChange = { ...allItems };
    if (objectToChange.hasOwnProperty(loadedDate)) {
      const currentObject = { ...items };
      const id = items[items.length - 1].id + 1;
      const newToDo = { id, item, checked: false };
      const addToDo = [...objectToChange[loadedDate], newToDo];
      objectToChange[loadedDate] = addToDo;
    } else {
      const newTodo = [{ id: 1, item: item, checked: false }];
      objectToChange[loadedDate] = newTodo;
    }
    saveToStorage(objectToChange);
    setAllItems(objectToChange);
  };

  const onCheck = async (id) => {
    const list = { ...allItems };
    const item = list[loadedDate].find((item) => item.id === id);
    item.checked = !item.checked;
    setAllItems(list);
    saveToStorage(list);
  };

  const onDelete = async (id) => {
    if (!dateSelectPast) {
      const list = { ...allItems };
      const listItem = items.filter((item) => item.id != id);
      const newObj = (list[loadedDate] = listItem);
      setItems(newObj);
      saveToStorage(list);
    }
  };

  const loadOlder = async () => {
    setAddTextBoxPast(true);
    setAddTextBoxVisible(false);
    setdateSelectPast(true);
  };

  const loadCurrent = async () => {
    setAddTextBoxFuture(true);
    setAddTextBoxVisible(true);
    setdateSelectPast(false);
    setdateSelectFuture(false);

    setLoadedDate(today);
    const list = allItems[loadedDate];
    setItems(list || []);
  };

  const loadFuture = async () => {
    setAddTextBoxFuture(false);
    setdateSelectFuture(true);
    setdateSelectPast(false);
  };
  const loadDate = async (date) => {
    const list = allItems[date] || [];
    setLoadedDate(date);
    setItems(list);
    setdateSelectPast(false);
    setdateSelectFuture(false);
    setAddTextBoxFuture(true);
  };
  const checkDate = async (e) => {
    const date = new Date(e);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatedDate = day + "/" + month + "/" + year;

    if (formatedDate < today) {
      loadOlder();
    } else if (formatedDate == today) {
      loadCurrent();
    } else {
      loadFuture();
    }

    loadDate(formatedDate);
  };

  return (
    <div className="App">
      <Header />
      <DatePicker handleSetDateSelect={checkDate} />
      {addTextBoxVisible && (
        <AddItem
          onSubmit={onSubmit}
          setNewItem={setNewItem}
          newItem={newItem}
        />
      )}
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
        loadedDate={loadedDate}
      />

      <Footer />
    </div>
  );
}

export default App;

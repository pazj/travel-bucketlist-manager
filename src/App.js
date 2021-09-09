import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddList from "./components/AddList";
import Lists from "./components/Lists";
import Wave from "react-wavify";

function App() {
  const [showAddList, setShowAddList] = useState(false);
  const [lists, setLists] = useState([]);
  // const [textEditing, setTextEditing] = useState(null)

  useEffect(() => {
    const getLists = async () => {
      const listsFromServer = await fetchList();
      setLists(listsFromServer);
    };
    getLists();
  }, []);

  //Fetch all the lists
  const fetchList = async () => {
    const res = await fetch("http://localhost:5000/lists");
    const data = await res.json();
    return data;
  };

  const fetchLists = async (id) => {
    const res = await fetch(`http://localhost:5000/lists/${id}`);
    const data = await res.json();
    return data;
  };

  //ADD TEXT TO THE LIST
  const addList = async (list) => {
    const res = await fetch("http://localhost:5000/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });

    const data = await res.json();
    setLists([...lists, data]);
  };

  //delete bucketlist list
  const deleteList = async (id) => {
    await fetch(`http://localhost:5000/lists/${id}`, {
      method: "DELETE",
    });
    setLists(lists.filter((list) => list.id !== id));
  };

  //Toggle for check the list status
  const toggleCheck = async (id) => {
    const listToToggle = await fetchLists(id);
    const updList = { ...listToToggle, completed: !listToToggle.completed };

    const res = await fetch(`http://localhost:5000/lists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updList),
    });

    const data = await res.json();

    setLists(
      lists.map((list) =>
        list.id === id ? { ...list, completed: data.completed } : list
      )
    );
  };

  // const submitEdits = async (id) => {

  // }

  return (
    <div className="bg">
      <div className="container">
        <Header
          onAdd={() => setShowAddList(!showAddList)}
          showAdd={showAddList}
          title="Travel Bucketlist Manager"
        />
        <Wave mask="url(#mask)" fill="#1277b0">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0" stopColor="white" />
              <stop offset="0.5" stopColor="black" />
            </linearGradient>
            <mask id="mask">
              <rect
                x="0"
                y="0"
                width="2000"
                height="200"
                fill="url(#gradient)"
              />
            </mask>
          </defs>
        </Wave>
        {showAddList && <AddList onAdd={addList} />}
        {lists.length > 0 ? (
          <Lists lists={lists} onDelete={deleteList} onToggle={toggleCheck} />
        ) : (
          "No list to show"
        )}
      </div>
    </div>
  );
}

export default App;

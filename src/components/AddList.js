import { useState } from "react";

function AddList({ onAdd }) {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add your text");
      return;
    }

    onAdd({ text });

    //clearlisting
    setText("");
  };

  return (
    <form className="add-list" onSubmit={onSubmit}>
      <div className="list-control">
        <label>Bucketlist</label>
        <input
          type="text"
          placeholder="Add to your list"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <input type="submit" value="Save list" className="btn btn-block" />
    </form>
  );
}

export default AddList;

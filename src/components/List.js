import { FaTimes, FaCheck } from "react-icons/fa";

function List({ list, onDelete, onToggle }) {
  return (
    <div
      className={`list ${list.completed ? "completed" : ""}`}
      onDoubleClick={() => onToggle(list.id)}
    >
      <h3 className="delete-btn">
        {list.text}
        <FaTimes
          style={{ color: "#6a6352", cursor: "pointer" }}
          onClick={() => onDelete(list.id)}
        ></FaTimes>
      </h3>
    </div>
  );
}

export default List;

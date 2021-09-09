import Button from "./Button";

function Header({ title, onAdd, showAdd }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <img className="travelIcon" src="assets/travel.svg" alt=""></img>
      <Button
        color={showAdd ? "#6a6352" : "#6a6352"}
        text={showAdd ? "Close" : "Add to your list"}
        onClick={onAdd}
      />
      <h3 className="subtitle">
        Keep track if you completed a bucketlist goal by double clicking on the
        list!
      </h3>
    </header>
  );
}

export default Header;

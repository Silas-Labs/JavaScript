import { FaTrashAlt } from "react-icons/fa";

function ListGroup({
  items,
  onClickCheck,
  onClickDelete,
  fetchError,
  fetchErrorDetails,
  loadedDate,
}) {
  return (
    <>
      {!fetchError ? (
        items.length ? (
          <main>
            {items.map((item) => (
              <ul key={item.id}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => onClickCheck(item.id)}
                />
                <span
                  id="row"
                  style={
                    item.checked
                      ? {
                          textDecoration: "line-through",
                          fontWeight: "lighter",
                        }
                      : { textDecoration: "none" }
                  }
                >
                  {item.item}
                </span>
                <button id="trash" onClick={() => onClickDelete(item.id)}>
                  <FaTrashAlt
                    role="button"
                    aria-label={`Delete ${item.item}`}
                  />
                </button>
              </ul>
            ))}
          </main>
        ) : loadedDate ? (
          <span id="emptyList" style={{ color: "red" }}>
            No ToDos for Selected Date
          </span>
        ) : (
          <span style={{ color: "rgb(127, 9, 173)" }} id="emptyList">
            Select Date to View ToDos
          </span>
        )
      ) : (
        <div className="accordion-item">
          <p className="accordion-header" id="headingTwo">
            <div id="emptyList">{fetchError}</div>
            <span
              className="accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <a>See Details</a>
            </span>
          </p>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>Error Definition:</strong>
              <p>{fetchErrorDetails}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListGroup;

import { FaTrashAlt } from "react-icons/fa";
import Accordion from "./Accordion";

function ListGroup({
  items,
  onClickCheck,
  onClickDelete,
  fetchError,
  fetchErrorDetails,
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
        ) : (
          <span id="emptyList">No Items in List</span>
        )
      ) : (
        <div className="accordion-item">
          <p className="accordion-header" id="headingTwo">
            <div id="emptyList">{fetchError}</div>
            <span
              className="accordion-button collapsed"
              type="link"
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

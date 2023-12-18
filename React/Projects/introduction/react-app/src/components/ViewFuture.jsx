import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Search from "./Search.jsx";

const ViewFuture = ({ allItems, loadDate }) => {
  const date = new Date();
  const today =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const dates = Object.keys(allItems);
  return (
    <div>
      {dates
        .filter((item) => item > today)
        .map((item) => (
          <ul key={item} onClick={() => loadDate({ item })}>
            {item}
          </ul>
        ))}
    </div>
  );
};

export default ViewFuture;

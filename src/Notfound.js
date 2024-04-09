import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>That page can not be found.</p>
      <Link to="/">Go back to the homepage...</Link>
    </div>
  );
};

export default Notfound;

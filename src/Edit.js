import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, error, isPending } = useFetch(
    `http://localhost:8000/blogs/${id}`
  );
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
    author: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      setBlogData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleEditBlog = (e) => {
    e.preventDefault();
    setIsEditing(true);
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then(() => {
        setIsEditing(false);
        history.push("/");
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });
  };

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading......</div>}
      {data && (
        <div className="edit">
          <h2>Edit blog</h2>
          <form onSubmit={handleEditBlog}>
            <label>Blog title:</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
            />
            <label>Blog body:</label>
            <textarea
              value={blogData.body}
              name="body"
              onChange={handleChange}
              required
            ></textarea>
            <label>Blog author:</label>
            <select
              name="author"
              value={blogData.author}
              onChange={handleChange}
            >
              <option value="Junayed">Junayed</option>
              <option value="Jack">Jack</option>
              <option value="John">John</option>
            </select>
            {isEditing ? (
              <button disabled>Editing blog...</button>
            ) : (
              <button>Edit blog</button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Edit;

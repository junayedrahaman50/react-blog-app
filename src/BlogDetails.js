import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch(`http://localhost:8000/blogs/${id}`);
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/blogs/${id}/edit`);
  };

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Content is loading.....</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleClick}>Delete</button>
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;

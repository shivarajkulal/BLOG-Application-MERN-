import { format } from "date-fns";
import { Link } from "react-router-dom";
export default function Post({_id,title,summary,cover,content,createdAt,author}) {
   let authorName = "Unknown";

   if (author && typeof author === "object" && "username" in author) {
     authorName = author.username;
   } 
  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
        <img src={"http://localhost:4000/" + cover} alt="" />
      </Link>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p1 className="info">
          <a href="*" className="author">
            {authorName}
          </a>
          <time>{format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}</time>
        </p1>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
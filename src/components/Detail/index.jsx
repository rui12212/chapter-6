import { useParams } from "react-router-dom";
import { posts } from "../../data/posts";
import classes from "./Detail.module.css";
import { Link } from "react-router-dom";

export const Detail = () => {
  // オブジェクトが返ってくる {postId: ??}
  const postId = useParams();
  const intPostId = Number(postId.postId);
  const targetPost = posts.find((post) => post.id === intPostId);

  if (!targetPost) {
    return (
    <>
      <p className={classes.errorText}>記事が見つかりませんでした</p>
      <Link to="/" className={classes.goBackHome}>記事一覧へ戻る</Link>
    </>
    )
  }
  return (
    <div className={classes.bodyPreset}>
      <span className={classes.imageBox}>
        <span className={classes.imageBoxText}>800 x 400</span>
      </span>
      <div className={classes.postTextArea}>
        <div className={classes.postHeader}>
          <span>
            {new Date(targetPost.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            {targetPost.categories.map((category, id) => (
              <span key={id} className={classes.categoryTag}>
                {category}
              </span>
            ))}
          </span>
        </div>
        <span className={classes.postTitle}>{targetPost.title}</span>
        <div
          className={classes.postContent}
          dangerouslySetInnerHTML={{ __html: targetPost.content }}
        />
        <Link to="/" className={classes.goBackHome}>
          記事一覧へ戻る
        </Link>
      </div>
    </div>
  );
};

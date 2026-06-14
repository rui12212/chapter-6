import { useParams } from "react-router-dom";
import classes from "./Detail.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Load } from "../Load";

export const Detail = () => {
  const [post, setPost] = useState({});
  const [loadEnd, setLoadEnd] = useState(false);

  // オブジェクトが返ってくる {postId: ??}
  const postId = useParams();
  const intPostId = Number(postId.postId);

  useEffect(() => {
    const getDetailPost = async () => {
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${intPostId}`,
      );
      const data = await res.json();
      // console.log(data.post);
      setPost(data.post);
      setLoadEnd(!loadEnd);
    };
    getDetailPost();
  }, []);

  if (!loadEnd) {
    return <Load />;
  } else if (!post) {
    return (
      <>
        <p className={classes.errorText}>記事が見つかりませんでした</p>
        <Link to="/" className={classes.goBackHome}>
          記事一覧へ戻る
        </Link>
      </>
    );
  }
  return (
    <div className={classes.bodyPreset}>
      <span className={classes.imageBox}>
        <span className={classes.imageBoxText}>800 x 400</span>
      </span>
      <div className={classes.postTextArea}>
        <div className={classes.postHeader}>
          <span>
            {new Date(post.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            {post.categories.map((category, id) => (
              <span key={id} className={classes.categoryTag}>
                {category}
              </span>
            ))}
          </span>
        </div>
        <span className={classes.postTitle}>{post.title}</span>
        <div
          className={classes.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Link to="/" className={classes.goBackHome}>
          記事一覧へ戻る
        </Link>
      </div>
    </div>
  );
};

import {posts} from "../../data/posts";
import { Fragment } from "react";
import classes from "./Home.module.css";

export const Home = () => {
    return (
        <div className={classes.bodyPreset}>
            <label className={classes.homeTitle}>記事一覧</label>
            <ul className="post">
            {/* JSXのルールで、.map()の返り値は必ず親一つにまとめないといけない */}
              {posts.map(post => (
                <Fragment key={post.id}>
                  <div className={classes.alignImageAndTitle}>
                    <li className={classes.imageBox}>
                      <span className={classes.imageBoxText}>800 x 400</span>
                    </li>
                    <div className={classes.postTextArea}>
                      <div className={classes.postHeader}>
                        <li>{new Date(post.createdAt).toLocaleDateString('ja-JP', {year:'numeric', month:'long',day: 'numeric'})}</li>
                        {post.categories.map((category, id) => (
                            <span key={id} className={classes.categoryTag}>{category}</span>
                        ))}
                      </div>
                      <span className={classes.postTitle}>{post.title}</span>
                      <div className={classes.postContent}
                      dangerouslySetInnerHTML={{__html:post.content}}/>
                    </div>
                  </div>
                  <li className={classes.postBorderBottom}></li>
                </Fragment>
               ))}
            </ul>
        </div>
    )
}
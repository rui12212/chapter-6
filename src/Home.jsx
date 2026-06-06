import { posts } from "./data/posts";
import './Chapter6.css';

export default function Home() {
    return (
        <>
        <body>
            <div className="app">
              <header className="header">
                <ul>
                    <li>Blog</li>
                    <li>お問い合わせ</li>
                </ul>
              </header>
              <div className="body-preset">
                <label className="home-title">記事一覧</label>
                <ul className="post">
                    {/* JSXのルールで、.map()の返り値は必ず親一つにまとめないといけない */}
                  {posts.map(post => (
                    <>
                    <div className="align-image-and-title ">
                        <li className="image-box">
                          <span className="image-box-text">800 x 400</span>
                        </li>
                        <div className="post-text-area">
                          <div className="post-header">
                            <li key={post.id}>{new Date(post.createdAt).toLocaleDateString('ja-JP', {year:'numeric', month:'long',day: 'numeric'})}</li>
                            {post.categories.map(category=>(
                                <span className="category-tag">{category}</span>
                            ))}
                         </div>
                         <span className="post-title">{post.title}</span>
                         <span className="post-content">{post.content}</span>
                        </div>
                    </div>
                    <li className="post-border-bottom"></li>
                    </>
                  ))}
                </ul>
             </div>
             </div>
        </body>
        </>
    )
}
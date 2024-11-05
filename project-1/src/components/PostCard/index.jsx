import './styles.css'

export const PostCard = ({ post }) => {

  return (

    <div className="post">
      <img src={post.cover} alt={post.title} />
      <div className='post-content'>
        <h2><span style={{}}>{post.title}</span></h2>
        <p>{post.body}</p>
      </div>

    </div>

  );
}




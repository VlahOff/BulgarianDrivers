import { createContext, useState } from 'react';

const PostsContext = createContext({
  onCreatePostHandler: () => { }
});

export const PostsProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const onCreatePostHandler = (data) => {
    console.log(data);
  };

  return <PostsContext.Provider
    value={{
      onCreatePostHandler
    }}
  >
    {props.children}
  </PostsContext.Provider>;
};

export default PostsContext;
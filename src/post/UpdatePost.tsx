import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { postId } = useParams();

  const token = localStorage.getItem('TOKEN_KEY');

  const handleTitleOnChnage = (e: string) => {
    setTitle(e);
  };
  const handleContentOnChnage = (e: string) => {
    setContent(e);
  };

  const fetchPost = async () => {
    const result = await axios
      .get(`${END_POINT}/posts/${postId}`)
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
      });
    const post = JSON.parse(result.title);
    setTitle(post.title);
    setContent(post.content);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleUpdatePost = () => {
    const postToUpdate = {
      title: title,
      content: content,
    };
    const jsonToUpdate = JSON.stringify(postToUpdate);

    const post = {
      postId: postId,
      title: jsonToUpdate,
      image: null,
      channelId: String,
    };

    axios.put(`${END_POINT}/posts/update`, post, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const handleDeletePost = () => {
    axios.delete(`${END_POINT}/posts/delete`, {
      data: {
        id: postId,
      },
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };
  return (
    <div>
      <h1>Update Post</h1>
      <input value={title} onChange={(e) => handleTitleOnChnage(e.target.value)} />
      <br />
      <textarea
        onChange={(e) => handleContentOnChnage(e.target.value)}
        rows={10}
        cols={100}
        value={content}
        placeholder='내용'
      />
      <br />
      <button onClick={handleUpdatePost}>내용 수정</button>
      <button onClick={handleDeletePost}>글 삭제</button>
    </div>
  );
};

export default UpdatePost;

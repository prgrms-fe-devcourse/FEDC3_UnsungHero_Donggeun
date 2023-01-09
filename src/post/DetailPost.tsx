import axios from 'axios';
import { useEffect, useState } from 'react';

const END_POINT = 'http://kdt.frontend.3rd.programmers.co.kr:5006';
const postId = '63bc5a9f23d1e65ff38c6b9b';

// 추후에 postId를 DetailPost의 props로 받아와서 보여주는 방식으로 구성하면될듯.
const DetailPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleOnChnage = (e: string) => {
    setTitle(e);
  };
  const handleContentOnChnage = (e: string) => {
    setContent(e);
  };

  const token = localStorage.getItem('TOKEN_KEY');

  const UpdatePost = () => {
    const testData = {
      title: title,
      content: content,
    };
    const temp = JSON.stringify(testData);

    const post = {
      postId: postId,
      title: temp,
      image: null,
      //imageToDeletePublicId: Optional<string>,
      channelId: String,
    };

    axios.put(`${END_POINT}/posts/update`, post, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const fetchPost = async () => {
    try {
      const result = await axios
        .get(`${END_POINT}/posts/${postId}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
        });
      const post = JSON.parse(result.title);
      setTitle(post.title);
      setContent(post.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <h1>Detail Post Page</h1>
      <input value={title} onChange={(e) => handleTitleOnChnage(e.target.value)} />
      <br />
      <textarea
        onChange={(e) => handleContentOnChnage(e.target.value)}
        rows={10}
        cols={100}
        value={content}
        placeholder="내용"
      />
      <button onClick={UpdatePost}>내용 수정</button>
    </div>
  );
};

export default DetailPost;

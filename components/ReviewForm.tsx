import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/router";

const Post: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { rating, description };
      const postId = router.query.id;
      await fetch(`http://localhost:3000/api/post/${postId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Leave a Rating</h1>
      <Rating onClick={handleRating} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tell us what you think"
      />
      <button>Submit</button>
    </form>
  );
};
export default Post;

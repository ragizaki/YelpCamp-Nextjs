import React, { useState } from "react";
import StarRating from "react-star-rating-component";
import { useRouter } from "next/router";
import { Button, Text, Textarea } from "@chakra-ui/react";

const Post: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const router = useRouter();

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
      <Text fontSize="1.8rem" fontWeight={500}>
        Leave a Rating
      </Text>
      <div style={{ fontSize: "1.7rem" }}>
        <StarRating name="rating" onStarClick={(value) => setRating(value)} />
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tell us what you think"
        required
      />
      <Button mt={3} type="submit">
        Submit
      </Button>
    </form>
  );
};
export default Post;

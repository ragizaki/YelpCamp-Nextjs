import React, { useState } from "react";
import StarRating from "react-star-rating-component";
import { useRouter } from "next/router";
import { Button, Text, Textarea, Link } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const { data: session } = useSession();
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
      {session ? (
        <>
          <div style={{ fontSize: "1.7rem" }}>
            <StarRating
              name="rating"
              onStarClick={(value) => setRating(value)}
            />
          </div>
          <Textarea
            borderColor="gray"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us what you think"
            required
          />
          <Button
            bg={"green.400"}
            _hover={{ bg: "green.300" }}
            type="submit"
            color={"white"}
            mt={3}
          >
            Submit
          </Button>
        </>
      ) : (
        <Text>
          Please{" "}
          <NextLink href="/auth/signin">
            <Link color={"blue.600"} textDecoration="underline">
              Login
            </Link>
          </NextLink>{" "}
          or{" "}
          <NextLink href="/auth/signup">
            <Link color={"blue.600"} textDecoration="underline">
              Sign Up
            </Link>
          </NextLink>{" "}
          to leave a review
        </Text>
      )}
    </form>
  );
};
export default ReviewForm;

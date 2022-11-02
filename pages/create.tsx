import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import {
  Text,
  Input,
  Textarea,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";

const Camp: React.FC = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, desc, price };
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePriceChange = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setPrice(result);
  };

  const placeholderStyles = { opacity: 1, color: "gray.500" };

  return (
    <Layout>
      <div>
        <Stack as="form" onSubmit={submitData} spacing={3}>
          <Text fontSize="3xl">Create Campsite</Text>
          <Input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
            _placeholder={placeholderStyles}
            type="text"
            value={name}
          />
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.500"
              fontSize="1.2em"
              children="$"
            />
            <Input
              _placeholder={placeholderStyles}
              onChange={handlePriceChange}
              value={price}
              type="number"
              placeholder="Price"
            />
          </InputGroup>
          <Textarea
            cols={50}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            _placeholder={placeholderStyles}
            rows={8}
            value={desc}
          />
          <div>
            <Button colorScheme="green" disabled={!name || !desc} type="submit">
              Create
            </Button>
            <Button as="a" href="#" onClick={() => Router.push("/")} ml={3}>
              Cancel
            </Button>
          </div>
        </Stack>
      </div>
    </Layout>
  );
};

export default Camp;

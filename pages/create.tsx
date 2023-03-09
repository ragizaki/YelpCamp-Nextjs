import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ImageUpload from "@components/ImageUpload";
import {
  Text,
  Input,
  Textarea,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Spinner,
  Center,
} from "@chakra-ui/react";

const Camp: React.FC = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status !== "loading" && status !== "authenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading" || status !== "authenticated") {
    return (
      <div>
        <Center mt="auto">
          <Spinner />
        </Center>
      </div>
    );
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { name, desc, price, city, country, photo };
      const res = await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const post = await res.json();
      await router.push(`/camps/${post.id}`);
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
    <Stack
      as="form"
      onSubmit={submitData}
      spacing={3}
      px={{ sm: "0", md: "40" }}
    >
      <Text fontSize="3xl">Create Campsite</Text>
      <Input
        autoFocus
        onChange={(e) => setName(e.target.value)}
        placeholder="Title"
        _placeholder={placeholderStyles}
        value={name}
        borderColor="gray.400"
      />
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.500"
          fontSize="1.2em"
          children="$"
        />
        <Input
          onChange={handlePriceChange}
          value={price}
          type="number"
          placeholder="Price"
          _placeholder={placeholderStyles}
          borderColor="gray.400"
        />
      </InputGroup>
      <HStack spacing={5}>
        <Input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="City"
          _placeholder={placeholderStyles}
          w="50%"
          borderColor="gray.400"
        />
        <Input
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder="Country"
          _placeholder={placeholderStyles}
          w="50%"
          borderColor="gray.400"
        />
      </HStack>
      <Textarea
        cols={50}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        _placeholder={placeholderStyles}
        rows={8}
        value={desc}
        borderColor="gray.400"
      />
      <ImageUpload setPhoto={setPhoto} />
      <div>
        <Button
          isLoading={loading}
          colorScheme="green"
          disabled={!name || !desc}
          type="submit"
        >
          Create
        </Button>
        <Button onClick={() => router.push("/")} ml={3}>
          Cancel
        </Button>
      </div>
    </Stack>
  );
};

export default Camp;

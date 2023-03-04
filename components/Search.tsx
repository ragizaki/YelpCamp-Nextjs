import { Input, IconButton, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/camps/search",
      query: { q: query },
    });
  };
  return (
    <form onSubmit={handleSearch}>
      <HStack>
        <Input
          type="search"
          placeholder="Search Camps"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          borderColor="gray.400"
          required
        />
        <IconButton
          aria-label="Search camps"
          icon={<SearchIcon />}
          type="submit"
        />
      </HStack>
    </form>
  );
};

export default Search;

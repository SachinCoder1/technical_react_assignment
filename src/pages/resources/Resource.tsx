import { useState, useEffect } from "react";
import {
  Table,
  Loader,
  TextInput,
  Paper,
  Button,
  Text,
  Pagination,
  Center,
  Flex,
} from "@mantine/core";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../../apis/swapi";

const ResourceListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sorted, setSorted] = useState(searchParams.get("sort") === "name");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const { data, isLoading, isError } = useQuery(["people", page], () =>
    fetchPeople(page)
  );

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) {
      params.search = search;
    }

    if (sorted) {
      params.sort = "name";
    }
    if (page !== 1) params.page = page.toString();

    // Set the search parameters only if the params object has keys
    setSearchParams(params);
  }, [search, sorted, page, setSearchParams]);

  // Filter and sort the data
  const filteredPeople = data?.results
    ?.filter((person: any) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) => (sorted ? a.name.localeCompare(b.name) : 0));

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: something went wrong</div>;
  }

  return (
    <Paper p="md" shadow="sm">
      <Flex gap={20}>
        <TextInput
          placeholder="Search by name"
          value={search}
          w={"25%"}
          onChange={(e) => setSearch(e.currentTarget.value)}
          mb="md"
        />
        |{" "}
        <Button radius={20} onClick={() => setSorted(!sorted)} mb="md">
          {sorted ? "Unsort" : "Sort by Name"}
        </Button>
      </Flex>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Eye Color</th>
            <th>Birth Year</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople?.map((person: any, index: number) => (
            <tr key={index}>
              <td>
                <Link to={`/person/${index + 1}`}>
                  <Text variant="link">{person.name}</Text>
                </Link>
              </td>
              <td>{person.height}</td>
              <td>{person.mass}</td>
              <td>{person.eye_color}</td>
              <td>{person.birth_year}</td>
              <td>
                {person.created
                  ? new Date(person.created).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </td>

              <td>
                <Link to={`/person/${index + 1}`}>
                  <Button size="xs" variant="outline">
                    View Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Center mt={"50px"}>
        <Pagination
          total={Math.ceil(data.count / 10)}
          value={page}
          onChange={(page) => setPage(page)}
        />
      </Center>
    </Paper>
  );
};

export default ResourceListPage;

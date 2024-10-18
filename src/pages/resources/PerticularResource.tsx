import { useParams } from "react-router-dom";
import { Card, Grid, Badge, List, Loader, Text, Paper, Center } from "@mantine/core";
import { fetchFilms, fetchPersonById } from "../../apis/swapi";
import { useQuery } from "@tanstack/react-query";

const ResourceDetailPage = () => {
  const { id } = useParams(); // Get ID from route params
  const {
    data: personData,
    isLoading,
    isError,
  } = useQuery(["person", id], () => fetchPersonById(id as string));

  // Fetch the films of the person once the person is loaded
  const { data: filmTitles = [], isLoading: isLoadingFilms } = useQuery(
    ["films", personData?.films],
    () => fetchFilms(personData?.films || []),
    {
      enabled: !!personData?.films, // Only run this query if personData and films are available
    }
  );

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return <div>Error: something went wrong</div>;
  }

  const { name, height, mass, birth_year, gender, hair_color, skin_color } =
    personData;

  return (
    <Paper p="md" shadow="sm">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="xl" weight={500} mb="md">
          {name}
        </Text>

        <Grid>
          <Grid.Col span={6}>
            <Text>
              <strong>Height:</strong> {height} cm
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>
              <strong>Mass:</strong> {mass} kg
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>
              <strong>Birth Year:</strong> {birth_year}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>
              <strong>Gender:</strong> {gender}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>
              <strong>Hair Color:</strong> {hair_color}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>
              <strong>Skin Color:</strong> {skin_color}
            </Text>
          </Grid.Col>
        </Grid>

        {/* Display films (related data) */}
        {isLoadingFilms ? (
          <Loader />
        ) : (
          <>
            <Text size="lg" mt="md" mb="xs">
              Films:
            </Text>
            <List>
              {filmTitles.map((title, index) => (
                <List.Item key={index}>
                  <Badge variant="filled" color="teal">
                    {title}
                  </Badge>
                </List.Item>
              ))}
            </List>
          </>
        )}
      </Card>
    </Paper>
  );
};

export default ResourceDetailPage;

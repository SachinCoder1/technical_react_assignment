import { useQuery } from '@tanstack/react-query';
import { fetchPeople } from '../apis/swapi';

// Custom hook to use the query
export const usePeople = () => {
  return useQuery(['people'], fetchPeople);
};

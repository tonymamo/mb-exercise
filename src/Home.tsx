import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type HomeProps = {};

const Home = (props: HomeProps): JSX.Element => {
  const { isLoading, error, data, isFetching } = useQuery(['repoData'], () =>
    axios.get('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.data)
  );

  if (isLoading) return <div>Loading...</div>;
  return <>{console.log(data, error, isFetching)}</>;
};

export default Home;

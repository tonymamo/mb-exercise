import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from './Home';

// Create a react-query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header>
          <img
            src="//images.squarespace-cdn.com/content/v1/62fd314f707acd33a3237d7e/2a76a6e9-bbc9-4a72-ad61-fb3bdca5214b/marvelbus+with+lowercase+letters.png?format=250w"
            alt="MarvelBus"
          />
        </header>
        <Home />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
};

export default App;

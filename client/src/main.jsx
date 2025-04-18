// main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContextProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools/production'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools/>
        <App />
      </QueryClientProvider>
    </AppContextProvider>
  </BrowserRouter>
);

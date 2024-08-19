import { useEffect, useState } from 'react';
import axios from 'axios';
import type { AxiosError } from 'axios';
import List from './components/List';
import type { Job } from './types';
import Header from './components/Header';
import Pagination from './components/Footer';
import {
  Card,
} from "@material-tailwind/react";

function App() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [maxItems] = useState(50);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            maxItems: maxItems
          },
          timeout: 5000, // 5 seconds timeout
          cancelToken: source.token
        });
        setJobs(response.data?.data || []);
      } catch (err: unknown) {
          const error: AxiosError = err as AxiosError;
          console.error(error.message);        
          if (axios.isCancel(err)) {
              console.log('Request canceled', err.message);
          } else if (error.response) {
              // Server responded with a status other than 200 range
              console.error('Server Error:', error.response.status, error.response.data);
              setError(`Server Error: ${error.response.status}`);
          } else if (error.request) {
              // Request was made but no response received
              console.error('Network Error:', error.message);
              setError('Network Error');
          } else {
              // Something else happened
              console.error('Error:', error.message);
              setError(error.message);
          }
      }
    };

    getJobs();

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [currentPage, itemsPerPage, maxItems]);


   return (
    <Card className="h-full w-full">    
    <Header />
    {error && <div className="error">{error}</div>}
    <List jobs={jobs} />
    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postsPerPage={10} maxItems={maxItems} />
    </Card> 
  ); 

}
export default App;


import { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000', {
          params: {
            page: currentPage,
            limit: itemsPerPage
          },
          timeout: 5000, // 5 seconds timeout
          cancelToken: source.token
        });
        setJobs(response.data?.data || []);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else if (err.response) {
          // Server responded with a status other than 200 range
          console.error('Server Error:', err.response.status, err.response.data);
          setError(`Server Error: ${err.response.status}`);
        } else if (err.request) {
          // Request was made but no response received
          console.error('Network Error:', err.message);
          setError('Network Error');
        } else {
          // Something else happened
          console.error('Error:', err.message);
          setError(err.message);
        }
      }
    };

    getJobs();

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil((jobs || []).length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);


   return (
    <Card className="h-full w-full">    
    <Header />
    <List jobs={currentJobs} />
    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} postsPerPage={10} jobs={jobs} />
    </Card> 
  ); 

}
export default App;


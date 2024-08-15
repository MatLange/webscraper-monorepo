import { useEffect, useState } from 'react'
import List from './components/List'
import type { Job } from './types'

function App() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonResponse = await response.json()
        setJobs(jsonResponse?.data || [])
      } catch (err) {
        //setError(err.message)
        console.error(err);
      }
    }
    getJobs()
  }, [])

   return (
    <List jobs={jobs} />
  ); 

}
export default App;


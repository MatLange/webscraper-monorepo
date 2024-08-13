import { useEffect, useState } from 'react'

import List from './components/List'
import type { Book } from './types'

function App() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonResponse = await response.json()
        setBooks(jsonResponse?.data || [])
      } catch (err) {
        //setError(err.message)
        console.error(err);
      }
    }
    getBooks()
  }, [])

  return <>{books.length === 0 ? <p>Finding books...</p> : <List books={books} />}</>
}

export default App

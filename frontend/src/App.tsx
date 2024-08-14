/*
import { useEffect, useState } from 'react'
//import List from './components/List'
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


 return (
  <div className="container mx-auto p-4">
    {books.length === 0 ? (
      <p>Finding books...</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Author</th>
              <th className="px-4 py-2 border-b">Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.title}>
                <td className="px-4 py-2 border-b" data-label="Title">{book.title}</td>
                <td className="px-4 py-2 border-b" data-label="Author">{book.url}</td>
                <td className="px-4 py-2 border-b" data-label="Year">{book.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)
};

export default App;
*/


//import backgroundimg from './assets/backgroundimg.webp';
//import airpotimg from './assets/airport.jpeg';

//import {FaPlaneDeparture} from "react-icons/fa";
import { useEffect, useState } from 'react'
//import List from './components/List'
import type { Book } from './types'
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
} from "@material-tailwind/react";
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

  const TABLE_HEAD = ["No.", "Title", "Location", "Date", "Duration"];


/*   return (
    <List books={books} />
  ); */
  return (
<>
<div>
    <div className="mt-10 flex-col">
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 sm:-mx-8">
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
    <div className="m-3 overflow-y-auto h-lvh shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

      <table className="w-full divide-y divide-gray-300">
{/*         <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="whitespace-normal px-3 py-4 pl-6 text-xl font-semibold text-left">No.</th>
          <th scope="col" className="whitespace-normal hidden md:table-cell p-3 text-xl font-semibold text-left">Title</th>
          <th scope="col" className="whitespace-normal hidden md:table-cell py-3.5 pl-3 pr-6 text-xl font-semibold  text-left">Location</th>          
          <th scope="col" className="whitespace-normal hidden lg:table-cell py-3.5 pl-3 pr-6 text-xl font-semibold  text-left">Date</th>
          <th scope="col" className="whitespace-normal hidden lg:table-cell relative py-3.5 pl-3 pr-6 text-xl font-semibold  text-left">Duration</th> 
 
        </tr>
        </thead> */}
        <thead>
              <tr className={`flex flex-col sm:table-row sm:mb-0`}>
                {TABLE_HEAD.map((head, index) => {
                  const tableHeaderClasses = index < 1
                  ? "sticky top-0 py-3.5 pl-3 pr-6 text-xl font-semibold text-left cursor-pointer border-y border-blue-gray-100 bg-blue-gray-100 p-4 transition-colors hover:bg-blue-gray-50"
                  : "hidden lg:table-cell sticky top-0 py-3.5 pl-3 pr-6 text-xl font-semibold text-left cursor-pointer border-y border-blue-gray-100 bg-blue-gray-100 p-4 transition-colors hover:bg-blue-gray-50";
                  return (
                  <th
                    scope="col"
                    key={head}
                    className={tableHeaderClasses}
                  >
                    <Typography
                      variant="medium"
                      color="gray-900"
                      className="flex items-center justify-between gap-2 font-normal leading-none "
                    >
                      {head}{" "}
                      {index <= TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ) })}
              </tr>
            </thead>        
        <tbody className="divide-y divide-gray-100">
        {books.map(
                ({ title, location, date, duration}, index) => {
                  return (          
        <tr key={index} className="bg-white rounded-lg">
          <td className="w-full sm:w-auto max-w-0 sm:max-w-none whitespace-normal py-4 text-lg truncate">
              <div className="whitespace-normal px-3 py-4 text-lg text-gray-900 truncate">Link</div>
{/*             <a href="#" className="font-bold text-blue-500 hover:underline">{index}</a>
 */}            <dl className="lg:hidden">
              <dt className="sr-only lg:hidden">Title</dt>
              <dd className="whitespace-normal lg:hidden px-3  text-lg text-gray-500 truncate">{title}</dd>
              <dt className="sr-only lg:hidden">Location</dt>
              <dd className="whitespace-normal lg:hidden px-3  text-lg  text-gray-500 truncate">{location}</dd>
              <dt className="sr-only lg:hidden">Date</dt>
              <dd className="whitespace-normal lg:hidden px-3  text-lg text-gray-500 truncate">{date}</dd>
              <dt className="sr-only lg:hidden">Duration</dt>
              <dd className="whitespace-normal lg:hidden px-3  text-lg text-gray-500 truncate">{duration}</dd> 
            </dl>
          </td>
{/*           <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-lg text-gray-700 truncate">
          {title}
          </td> */}
          <td className="whitespace-normal hidden lg:table-cell px-3 py-4 text-lg text-gray-700 truncate">
              {title}
              
          </td>
          <td className="whitespace-normal hidden lg:table-cell px-3 py-4 text-lg text-gray-700 truncate">
            {location}
            </td>
           <td className="whitespace-normal hidden lg:table-cell px-3 py-4 text-lg text-gray-700 truncate">{date}</td>          
          <td className="whitespace-normal hidden lg:table-cell px-3 py-4 text-lg text-gray-700 truncate">{duration}</td> 
        </tr>
                  )})}        
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </div>
{/*     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 hidden">
    {books.map(
                ({ title, url, date, location, duration}, index) => {
                  return (
      <div className="bg-white space-y-1 p-4 rounded-lg shadow">
        <div className="flex flex-col items-start space-x-2 text-sm">
          <div className="p-2 w-20 text-sm font-semibold tracking-wide text-left">No.            
          </div>
          <div>
            <a href="#" className="text-blue-500 font-bold hover:underline">{ index }</a>
          </div>
        </div>
        <div className="flex flex-col items-start space-x-2 text-sm">
          <div className="p-2 w-20 text-sm font-semibold tracking-wide text-left">Title           
          </div>             
          <div className="text-sm text-gray-700 text-ellipsis overflow-hidden">
          { title }
          </div>
        </div>
        <div className="flex flex-col items-start space-x-2 text-sm text-ellipsis overflow-hidden">
          <div className="p-2 w-20 text-sm font-semibold tracking-wide text-left">Link
          </div>          
          <div className="text-gray-500 text-ellipsis overflow-hidden ">{ url }</div>
        </div>
        <div className="flex flex-col items-start space-x-2 text-sm">
          <div className="p-2 w-20 text-sm font-semibold tracking-wide text-left">Location           
          </div>                  
          <div>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{ location }</span>
          </div>
        </div>
        <div className="flex flex-col items-start space-x-2 text-sm">
          <div className="p-2 w-20 text-sm font-semibold tracking-wide text-left">Date           
          </div>          
          <div className="text-gray-500">{ date }</div>
        </div>
        <div className="flex flex-col items-start space-x-2 text-sm">
          <div className="p-2 w-20 text-sm font-semibold tracking-wide text-left">Duration
          </div>             
          <div className="text-sm text-gray-700 text-ellipsis overflow-hidden">
          { duration }
          </div>
        </div>        
      </div>
                  )})}
    
  </div>   */}
</div>
</>

  );
}
export default App;


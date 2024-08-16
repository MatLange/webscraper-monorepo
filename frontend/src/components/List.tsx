import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  CardBody,
} from "@material-tailwind/react";
import type { Job } from '../types'

type Props = {
  jobs: Job[]
}


const TABLE_HEAD = ["No.", "Title", "Location", "Date", "Duration"];

const List = ({ jobs }: Props) => {

     return (

        <CardBody className="px-0"> 
          <table className="w-full divide-y divide-gray-300">
          <thead className="border-0">
              <tr className={`hidden sm:table-row flex flex-col sm:table-row sm:mb-0`}>
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
        {jobs.map(
                ({ title, location, date, duration}, index) => {
                  return (          
        <tr key={index} className="bg-white rounded-lg">
          <td className="w-full sm:w-auto max-w-0 sm:max-w-none whitespace-normal py-4 text-lg truncate">
             <a href="{url}" target="_blank" className="whitespace-nowrap px-3 py-4 text-lg font-bold text-blue-500 hover:underline truncate">{index} - Link</a>
          <dl className="lg:hidden">
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
{/*             <tbody className="flex-1 sm:flex-none">
              {jobs.map(
                ({ title, url, date, duration, location }, index) => {
                  const isLast = index === books.length - 1;
                   const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={title} className="flex flex-col sm:table-row md:table-row mb-2 sm:mb-0">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                         <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-sm  sm:text-lg md:text-base lg:text-lg break-words"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70  text-sm  sm:text-lg md:text-base lg:text-lg break-words"
                            >
                              {url}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
               
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {duration}
                      </Typography>
                    </td>  
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {location}
                      </Typography>
                    </td>                         
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody> */}
          </table>
         </CardBody>
    ); 
}

export default List;

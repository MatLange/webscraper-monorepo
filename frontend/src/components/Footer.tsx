import {
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import type { Job } from '../types'

type Props = {
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  postsPerPage: number;
  jobs: Job[]
}
 

const Pagination = ({ setCurrentPage, currentPage, postsPerPage, jobs} : Props) => {
  const dataLength = ( jobs || []).length;
  const firstPage = 1;
  const lastPage = Math.ceil(dataLength / postsPerPage)

  return (
    <CardFooter className="sticky bottom-0 flex items-center justify-between border-t border-blue-gray-50 bg-white p-4">
    <Typography variant="small" color="blue-gray" className="font-normal">
      Page {currentPage} of {lastPage}
    </Typography>
    <div className="flex gap-2">
      <Button variant="outlined" size="sm" onClick={() => currentPage > firstPage ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage)}>
        Previous
      </Button>
      <Button variant="outlined" size="sm" onClick={() => currentPage < lastPage ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage)}>
        Next
      </Button>
    </div>
  </CardFooter>    
  );
};

export default Pagination;

import {
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";

type Props = {
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  postsPerPage: number;
  maxItems: number | 0;
}
 

const Pagination = ({ setCurrentPage, currentPage, postsPerPage, maxItems} : Props) => {
  const firstPage = 1;
  const lastPage = Math.ceil(maxItems / postsPerPage)

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

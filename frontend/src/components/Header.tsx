import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  CardHeader,
  Input,
  Typography,
  Tabs,
  TabsHeader,
  Tab
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Older than 2 weeks",
    value: "older",
  },
  {
    label: "Newest",
    value: "newest",
  },
];

const Header = () => {

     return (
      <CardHeader floated={false} shadow={false} className="rounded-none mt-0 mx-0">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            List of found jobs
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all jobs
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </CardHeader>
    ); 
}

export default Header;

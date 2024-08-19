import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import List from './List'

const fewJobs = [
  { websiteid: 'asdas', title: '2001: A Space Odyssey', baseUrl:"", url:"", location:"", date:"", duration:"" },
  { websiteid: 'asdasd', title: 'Rendezvous with Rama', baseUrl:"", url:"", location:"", date:"", duration:""  },
];

describe('List tests', () => {
  it('Should render the list', () => {
    render(<List jobs={fewJobs} />)
    // there should be ${fewJobs.length} books in the list
    expect(screen.getAllByRole('listitem')).toHaveLength(fewJobs.length)
    // it should render the title of the first book
    expect(screen.getByText(fewJobs[0].title)).toBeInTheDocument()
  })
})

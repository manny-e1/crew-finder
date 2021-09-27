import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: '_id',
    disableFilters: true,
    sticky: 'left',
  },
  {
    Header: 'Name',
    Footer: 'First Name',
    accessor: 'fullName',
    sticky: 'left',
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'birthdate',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy');
    },
  },
  // {
  //   Header: 'Country',
  //   Footer: 'Country',
  //   accessor: `address.country`,
  // },
  // {
  //   Header: 'Region',
  //   Footer: 'Region',
  //   accessor: `address?.region`,
  // },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phoneNumber',
  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email',
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
      },
    ],
  },
];

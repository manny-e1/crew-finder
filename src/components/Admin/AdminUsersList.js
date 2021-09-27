import React, { useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './Columns';
import './table.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../store/user/api.user';

export const PaginationTable = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.getAllUsers);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allUsers, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // console.log(allUsers);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <table {...getTableProps()} className="w-full">
        <thead className="bg-indigo-500 ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-2 border-r">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-indigo-300 ">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-5 border-r">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

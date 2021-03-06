import React from "react";
import * as XDate from "xdate";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";
// import "./MovieList.css";

const getFormattedDate = (date) => {
  if (!date) return null;
  const dateObj = new XDate(date);
  return dateObj.toString("M/d/yy h(:mm)TT");
};

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Cap rows at 100
  const firstPageRows = rows.slice(0, 100);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 100 results of {rows.length} rows</div>
    </>
  );
}

function MovieList({ movies }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        accessor: "accessor",
        Header: "edit?",
        Cell: ({ row: { original } }) => (
          <button onClick={() => console.log(original)}>Button text</button>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => movies, [movies]);
  // const data = movies;

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default MovieList;

import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const AssignRole = () => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("fullName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "FullName",
    }),
    columnHelper.accessor("isActive", {
      cell: (info) => (
        <span>
          {info.getValue() ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Not Active
            </span>
          )}
        </span>
      ),
      header: "Status",
    }),
    columnHelper.accessor("phonenumber", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "phone Number",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email Address",
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handleViewProfile(info.row.original.id)}
            className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white hover:bg-darkblue disabled:opacity-50 disabled:pointer-events-none"
          >
            <FaEye />
          </button>

          <button
            type="button"
            onClick={() =>
              handleOpenModal("hs-small-modal", info.row.original.id)
            }
            className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white hover:bg-darkblue disabled:opacity-50 disabled:pointer-events-none"
          >
            <FaRegEdit />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <Header />
      <button
        type="button"
        onClick={() => navigate("/rolemaster")}
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
      >
        Back
      </button>
      <div className="p-2 max-w-full mx-auto text-white fill-gray-400">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1">
            <SearchIcon />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-darkblue text-[12px] text-black"
              placeholder="Search..."
            />
          </div>
          <button
            type="button"
            className="text-[12px] text-white font-semibold bg-darkblue h-10 w-24  hover:bg-gradient-to-br focus:ring-4 focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Create
          </button>
          <DownloadBtn data={data} fileName={"Employee List"} />
        </div>
        <table className="w-full text-center  ">
          <thead className="bg-darkblue  ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="capitalize px-3.5 py-2 text-[14px] font-medium "
                  >
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? "bg-tablelight" : "bg-tabledark"}
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3.5 py-2 text-[12px] text-black"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32 text-[14px] font-medium text-black">
                <td colSpan={12}>No Record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination */}
        <div className="flex items-center justify-end mt-2 gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-[15px] text-black"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-[15px] text-black"
          >
            {">"}
          </button>

          <span className="flex items-center gap-1">
            <div className="text-[12px] text-black">Page</div>
            <strong className="text-[12px] text-black">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 text-[12px] text-black">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent text-[12px] text-black"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent text-[12px] text-black"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssignRole;

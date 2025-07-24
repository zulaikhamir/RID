import React, { useState, useReducer } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";

// Sample RID Request Details data
const defaultData = [
  {
    requestId: "RID-001",
    projectName: "VPC Setup Automation",
    requestedBy: "John Doe",
    status: "Pending",
    requestedOn: "2025-07-20",
    priority: "High",
  },
  {
    requestId: "RID-002",
    projectName: "EC2 Provisioning",
    requestedBy: "Jane Smith",
    status: "In Progress",
    requestedOn: "2025-07-21",
    priority: "Medium",
  },
  {
    requestId: "RID-003",
    projectName: "Security Group Config",
    requestedBy: "Ali Khan",
    status: "Completed",
    requestedOn: "2025-07-18",
    priority: "Low",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("requestId", {
    header: "Request ID",
    cell: (info) => <b>{info.getValue()}</b>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("projectName", {
    header: "Project Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("requestedBy", {
    header: "Requested By",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const value = info.getValue();
      const color =
        value === "Completed"
          ? "text-green-600"
          : value === "In Progress"
          ? "text-yellow-600"
          : "text-red-600";
      return <span className={color}>{value}</span>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("requestedOn", {
    header: "Requested On",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => {
      const value = info.getValue();
      const badgeColor =
        value === "High"
          ? "bg-red-200 text-red-800"
          : value === "Medium"
          ? "bg-yellow-200 text-yellow-800"
          : "bg-green-200 text-green-800";
      return (
        <span className={`px-2 py-1 rounded text-sm ${badgeColor}`}>
          {value}
        </span>
      );
    },
    footer: (info) => info.column.id,
  }),
];

const RequestDetailsTable = () => {
  const [data] = useState(() => [...defaultData]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Request Details</h2>
      <table className="min-w-full border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <div className="mt-4">
        <button
          onClick={() => rerender()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Rerender
        </button>
      </div>
    </div>
  );
};

export default RequestDetailsTable;

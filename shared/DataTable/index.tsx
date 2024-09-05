"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Pagination } from "../Pagination";
import {
  tableHeadingClassName,
  tableRowsStringClassName,
} from "../styles/commonStyles";
import { DataTableProps, TableRows } from "./typings";

export const Datatable: React.FC<DataTableProps> = ({
  headers,
  rows,
  columnSizes,
  customStyles,
  hidePagination = false
}) => {
  const [modifiedRows, setModifiedRows] = useState<TableRows[][]>(rows);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedRows, setDisplayedRows] = useState<TableRows[][]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>(
    new Array(headers.length).fill("")
  );
  const [searchVisible, setSearchVisible] = useState<boolean[]>(
    new Array(headers.length).fill(false)
  );

  const pageSize = 25;
  useEffect(() => {
    setModifiedRows(rows);
  }, [rows]);
  useEffect(() => {
    const filteredRows = rows.filter((row) =>
      row.some((cell, idx) =>
        cell.searchText
          ?.toLowerCase()
          .includes(searchQueries[idx].toLowerCase())
      )
    );
    setCurrentPage(0);
    setModifiedRows(filteredRows);
  }, [rows, searchQueries]);

  useEffect(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    setDisplayedRows(modifiedRows.slice(start, end));
  }, [modifiedRows, currentPage]);
  const handleSearchChange = (idx: number, value: string) => {
    const newQueries = [...searchQueries];
    newQueries[idx] = value;
    setSearchQueries(newQueries);
  };

  const handleSearch = (idx: number) => {
    const newVisibility = [...searchVisible];
    newVisibility[idx] = false;
    setSearchVisible(newVisibility);
  };

  const handleReset = (idx: number) => {
    const newQueries = [...searchQueries];
    newQueries[idx] = "";
    setSearchQueries(newQueries);
    const newVisibility = [...searchVisible];
    newVisibility[idx] = false;
    setSearchVisible(newVisibility);
  };
  console.log(searchVisible);
  return (
    <div className="flex flex-col" style={customStyles}>
      <div className="overflow-x-auto pb-4 min-w-full">
        <div className="block">
          <div className="overflow-x-auto w-full border rounded-lg border-gray-300 h-[60vh] thin-scrollbar">
            <table className="relative w-full rounded-xl">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr className="bg-gray-50">
                  {headers.map((header, idx) => (
                    <th
                      key={header.field}
                      scope="col"
                      style={{
                        width: columnSizes ? `${columnSizes[idx]}%` : "auto",
                      }}
                      className={`${tableHeadingClassName} relative`}
                    >
                      <div className={`flex`}>
                        <span className={header.align}>{header.component}</span>
                        {header.isSearch && (
                          <div>
                            <AiOutlineSearch
                              width={10}
                              height={10}
                              className={`ml-2 w-5 h-5 ${searchQueries[idx]
                                  ? "text-blue-500"
                                  : "text-gray-500"
                                } cursor-pointer`}
                              onClick={() => {
                                const newVisibility = [...searchVisible];
                                newVisibility[idx] = true;
                                setSearchVisible(newVisibility);
                              }}
                            />
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: searchVisible[idx] ? 1 : 0,
                                height: searchVisible[idx] ? "auto" : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="absolute left-0 mt-2 p-2 border rounded shadow-lg bg-white z-10"
                              style={{ width: "250px" }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  placeholder="Search"
                                  value={searchQueries[idx]}
                                  onChange={(e) =>
                                    handleSearchChange(idx, e.target.value)
                                  }
                                  className="w-full border rounded px-2 py-1"
                                />
                                <AiOutlineClose
                                  onClick={() => handleReset(idx)}
                                  width={10}
                                  height={10}
                                  className="ml-1 w-5 h-5 text-red-500 cursor-pointer"
                                />
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {displayedRows.map((rowData, id) => (
                  <tr
                    key={id}
                    className="bg-white transition-all duration-500 hover:bg-gray-50"
                  >
                    {rowData.map((row, idx) => (
                      <td
                        key={row.field}
                        style={{
                          width: columnSizes ? `${columnSizes[idx]}%` : "auto",
                        }}
                        className={row.className || tableRowsStringClassName}
                      >
                        {row.component}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!hidePagination &&
            <nav
              className="flex items-center justify-center py-4"
              aria-label="Table navigation"
            >
              <Pagination
                pageSize={pageSize}
                defaultSelectedPage={currentPage}
                total={modifiedRows.length}
                onClick={setCurrentPage}
              />
            </nav>}
        </div>
      </div>
    </div>
  );
};

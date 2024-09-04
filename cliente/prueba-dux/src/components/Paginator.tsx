//hooks
import React from "react";
//primereact
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

interface PaginatorProps {
  first: number;
  rows: number;
  totalRecords: number | undefined;
  onPageChange: (event: PaginatorPageChangeEvent) => void;
}

const PaginatorComponent: React.FC<PaginatorProps> = ({ first, rows, totalRecords, onPageChange }) => (
  <div className="card">
    <Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange} />
  </div>
);

export default PaginatorComponent;

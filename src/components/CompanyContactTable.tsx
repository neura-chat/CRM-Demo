import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, MoreVertical } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (row: any, idx: number) => React.ReactNode;
}

interface CompanyContactTableProps {
  columns: Column[];
  data: any[];
  actions?: any[];
  showCheckbox?: boolean;
  showRowNumber?: boolean;
  renderActions?: (row: any) => React.ReactNode;
  rowLink?: (row: any) => string | undefined;
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CompanyContactTable: React.FC<CompanyContactTableProps> = ({
  columns,
  data,
  showCheckbox = false,
  showRowNumber = false,
  renderActions,
  rowLink,
  onSelectionChange,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = data.map((row) => row.id);
      setSelected(allIds);
      onSelectionChange?.(allIds);
    } else {
      setSelected([]);
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let newSelected = e.target.checked
      ? [...selected, id]
      : selected.filter((sid) => sid !== id);
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          {showCheckbox && (
            <TableHead>
              <input
                type="checkbox"
                checked={selected.length === data.length && data.length > 0}
                onChange={handleSelectAll}
              />
            </TableHead>
          )}
          {showRowNumber && <TableHead>#</TableHead>}
          {columns.map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={row.id || idx}>
            {showCheckbox && (
              <TableCell>
                <input
                  type="checkbox"
                  checked={selected.includes(row.id)}
                  onChange={handleSelectRow(row.id)}
                />
              </TableCell>
            )}
            {showRowNumber && <TableCell>{idx + 1}</TableCell>}
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.key === "name" && rowLink ? (
                  <a href={rowLink(row)} className="text-blue-600 underline">
                    {row[col.key]}
                  </a>
                ) : col.render ? col.render(row, idx) : row[col.key]}
              </TableCell>
            ))}
            <TableCell>
              {renderActions ? renderActions(row) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompanyContactTable; 
import React from "react";

export function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border rounded-md">
        <thead>
          <tr className="bg-muted text-left">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, i) => (
              <tr key={i} className="hover:bg-accent">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2 border">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-4 py-2 text-center text-muted-foreground">
                Sin datos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

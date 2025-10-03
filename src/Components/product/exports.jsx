// utils/exportUtils.js
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// CSV con Blob
export function exportCSV(products) {
  const header = Object.keys(products[0] || {});
  const rows = products.map(p => Object.values(p));

  const csvContent =
    [header, ...rows].map(row => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "products.csv";
  link.click();
}

// Excel con XLSX
export function exportExcel(products) {
  const ws = utils.json_to_sheet(products);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Products");
  writeFile(wb, "products.xlsx");
}

// PDF con jsPDF + autotable
export function exportPDF(products) {
  const doc = new jsPDF();
  doc.text("Lista de Productos", 14, 15);
  const tableColumn = Object.keys(products[0] || {});
  const tableRows = products.map(p => Object.values(p));
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });
  doc.save("products.pdf");
}

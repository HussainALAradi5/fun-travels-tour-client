import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import type { ExportRecord } from "@/interface/common/ExportRecord";

export const ExportUtils = {
  formatValue: (value: string | number | boolean | null | undefined | ExportRecord | ExportRecord[], isExcel: boolean = false): string => {
    if (value === null || value === undefined || value === "") return "-";
    
    if (Array.isArray(value)) {
      if (value.length === 0) return "-";
      const joinChar = isExcel ? "\n" : ", ";
      return value.map(i => ExportUtils.formatValue(i, isExcel)).join(joinChar);
    }

    if (typeof value === "object") {
      const obj = value as ExportRecord;
      return (obj.famousName || obj.officialName || obj.name || obj.title || "-") as string;
    }

    const stringVal = String(value).trim();

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(stringVal)) {
        return isExcel ? stringVal.replace("T", " ").split(".")[0] : stringVal.split("T")[0];
    }

    return stringVal;
  },

  formatHeader: (key: string): string => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .toUpperCase()
      .trim();
  },

  downloadAsExcel: async <T extends ExportRecord>(
    data: T[],
    fileName: string = "export"
  ) => {
    if (!data.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    const forbidden = [
      "id", "password", "token", "secret", "updatedat", "createdat", "createdby", "updatedby",
      "flagpngurl", "flagsvgurl", "tickets", "reservations", "description", "agency", "agencybranch", "availablemeals"
    ];
    
    const keys = Object.keys(data[0]).filter(k => !forbidden.includes(k.toLowerCase()));

    worksheet.columns = keys.map(key => ({
      header: ExportUtils.formatHeader(key),
      key: key,
      width: 20 
    }));

    data.forEach(item => {
      const rowData: Record<string, string> = {};
      keys.forEach(k => {
        const val = item[k];
        if (typeof val === 'string' && val.startsWith('data:image')) {
          rowData[k] = '[Image Data]'; 
        } else {
          rowData[k] = ExportUtils.formatValue(val, true);
        }
      });
      worksheet.addRow(rowData);
    });

    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E3A8A' } };

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        cell.border = {
          top: { style: 'thin' }, left: { style: 'thin' },
          bottom: { style: 'thin' }, right: { style: 'thin' }
        };

        const column = worksheet.getColumn(cell.col);
        const contentLen = cell.value ? cell.value.toString().length : 0;
        const currentWidth = column.width || 10;
        
        if (contentLen + 5 > currentWidth) {
          column.width = Math.min(50, contentLen + 5);
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}_${Date.now()}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  },

  downloadAsPDF: <T extends ExportRecord>(
    data: T[],
    fileName: string = "export",
    imageColumns: string[] = ["qrCode", "barcode"]
  ) => {
    if (!data.length) return;
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    
    const forbidden = [
      "id", "password", "token", "secret", "updatedat", "createdat", "createdby", "updatedby",
      "flagpngurl", "flagsvgurl", "tickets", "reservations", "reservation", "description", "agency", "agencybranch", 
      "availablemeals", "startcity", "endcity", "transportation", "baseprice", "discountprice",
      "seatpricemodifier", "hasmealplan", "selectedmeals"
    ];

    const keys = Object.keys(data[0]).filter(k => !forbidden.includes(k.toLowerCase()));
    
    const columns = keys.map(k => ({ header: ExportUtils.formatHeader(k), dataKey: k }));
    const rows = data.map(item => {
        const rowObj: Record<string, string | null> = {};
        keys.forEach(k => {
            const val = item[k];
            if (imageColumns.includes(k) && typeof val === 'string' && val.startsWith('data:image')) {
                rowObj[k] = val as string; 
            } else {
                rowObj[k] = ExportUtils.formatValue(val);
            }
        });
        return rowObj;
    });

    doc.setFontSize(16);
    doc.setTextColor(30, 58, 138);
    doc.text(ExportUtils.formatHeader(fileName), 5, 12); 

    autoTable(doc, {
      startY: 18, 
      columns: columns,
      body: rows,
      theme: 'grid',
      tableWidth: 'auto',
      styles: { 
        fontSize: 6.5,     
        cellPadding: 1.5,  
        overflow: 'linebreak', 
        valign: 'middle' 
      },
      headStyles: { 
        fillColor: [30, 58, 138], 
        fontSize: 6.5, 
        fontStyle: 'bold', 
        halign: 'center' 
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 5, right: 5, top: 15 }, 
      
      didParseCell: (hookData) => {
        if (imageColumns.includes(hookData.column.dataKey as string)) {
          const val = hookData.cell.raw;
          if (typeof val === 'string' && val.startsWith('data:image')) {
            hookData.cell.text = ['']; 
            const isBarcode = (hookData.column.dataKey as string).toLowerCase().includes("barcode");
            hookData.cell.styles.minCellHeight = isBarcode ? 12 : 18; 
          }
        }
      },

      didDrawCell: (hookData) => {
        if (imageColumns.includes(hookData.column.dataKey as string)) {
          const val = hookData.cell.raw;
          if (typeof val === 'string' && val.startsWith('data:image')) {
            const isBarcode = (hookData.column.dataKey as string).toLowerCase().includes("barcode");
            
            const mimePart = val.split(';')[0].toLowerCase();
            let imgType = 'JPEG';
            if (mimePart.includes('png')) imgType = 'PNG';
            else if (mimePart.includes('webp')) imgType = 'WEBP';
            
            if (mimePart.includes('svg')) {
              doc.setTextColor(200, 0, 0);
              doc.setFontSize(6);
              doc.text("[SVG Unsupported]", hookData.cell.x + 2, hookData.cell.y + Math.max(hookData.cell.height / 2, 5));
              return;
            }

            const imgW = isBarcode ? 22 : 12;
            const imgH = isBarcode ? 7 : 12;
            const xPos = hookData.cell.x + (hookData.cell.width - imgW) / 2;
            const yPos = hookData.cell.y + (hookData.cell.height - imgH) / 2;
            
            try {
              const cleanBase64 = val.replace(/[\r\n\s]+/g, "");
              doc.addImage(cleanBase64, imgType, xPos, yPos, imgW, imgH);
            } catch (error) {
              console.warn(`Failed to export image on column: ${hookData.column.dataKey}`, error);
              doc.setTextColor(200, 0, 0);
              doc.setFontSize(6);
              doc.text("[Img Err]", hookData.cell.x + 2, hookData.cell.y + Math.max(hookData.cell.height / 2, 5));
            }
          }
        }
      }
    });

    doc.save(`${fileName}_${Date.now()}.pdf`);
  }
};

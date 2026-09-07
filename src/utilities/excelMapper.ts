import { DEFAULT_USER, type User } from "@/interface/UserInterface";
import * as XLSX from "xlsx";

/**
 * Maps Excel rows to User objects based on header names.
 * This makes the order of columns in Excel irrelevant.
 */
export const mapExcelToUsers = (file: File): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON using headers
        // This produces objects like { "Email": "test@test.com", "Name": "John" }
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const mappedUsers: User[] = jsonData.map((row: any) => {
          return {
            ...DEFAULT_USER,
            // Flexible mapping: Looks for keys regardless of case or spaces
            name: row["Name"] || row["name"] || "",
            userName: row["Username"] || row["userName"] || row["User Name"] || "",
            email: row["Email"] || row["email"] || "",
            mobileNumber: row["Mobile"] || row["mobileNumber"] || row["Phone"] || "",
            age: Number(row["Age"] || row["age"]) || 0,
            password: row["Password"] || row["password"] || "",
            // We pass the string; backend handles the Enum conversion
            userType: row["Role"] || row["userType"] || "EMPLOYEE", 
          };
        });

        resolve(mappedUsers);
      } catch (err) {
        reject(new Error("Failed to parse Excel file"));
      }
    };

    reader.onerror = () => reject(new Error("File reading error"));
    reader.readAsArrayBuffer(file);
  });
};
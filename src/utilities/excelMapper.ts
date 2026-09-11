import type { User } from "@/interface/user/User";
import * as XLSX from "xlsx";

const DEFAULT_USER: Partial<User> = {
  name: "",
  userName: "",
  email: "",
  mobileNumber: "",
  age: 0,
  userType: "EMPLOYEE" as never,
  active: true,
};

export const mapExcelToUsers = (file: File): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const mappedUsers: User[] = jsonData.map((row) => {
          const r = row as Record<string, string | number>;
          return {
            ...DEFAULT_USER,
            name: String(r["Name"] || r["name"] || ""),
            userName: String(r["Username"] || r["userName"] || r["User Name"] || ""),
            email: String(r["Email"] || r["email"] || ""),
            mobileNumber: String(r["Mobile"] || r["mobileNumber"] || r["Phone"] || ""),
            age: Number(r["Age"] || r["age"]) || 0,
            password: String(r["Password"] || r["password"] || ""),
            userType: (r["Role"] || r["userType"] || "EMPLOYEE") as never,
          } as User;
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


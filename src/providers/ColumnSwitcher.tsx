"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ColumnChangeContextType {
  column: number;
  toggleColumn: (arg: number) => void;
}

interface ColumnChangeProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = "columnChangeColumns";

const ColumnChangeContext = createContext<ColumnChangeContextType | null>(null);

const ColumnChangeProvider = ({ children }: ColumnChangeProviderProps) => {
  const [column, setColumn] = useState<number>(2);

  useEffect(() => {
    // Retrieve columns from localStorage if available
    const storedColumns = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedColumns) {
      setColumn(Number(storedColumns));
    }
  }, []);

  useEffect(() => {
    // Save columns to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, String(column));
  }, [column]);

  const toggleColumn = (column: number) => {
    setColumn(column);
  };

  const value: ColumnChangeContextType = {
    column,
    toggleColumn,
  };

  return (
    <ColumnChangeContext.Provider value={value}>
      {children}
    </ColumnChangeContext.Provider>
  );
};

const useColumnChange = () => {
  const context = useContext(ColumnChangeContext);
  if (!context) {
    throw new Error(
      "useColumnChange must be used within a ColumnChangeProvider"
    );
  }
  return context;
};

export { ColumnChangeProvider, useColumnChange };

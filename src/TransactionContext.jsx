import { createContext, useState } from 'react';

// Create the context
export const TransactionContext = createContext();

// Mock transactions data
const mockTransactions = [
  { id: 1, date: '2026-03-01', category: 'Salary', type: 'income', amount: 5000 },
  { id: 2, date: '2026-03-05', category: 'Groceries', type: 'expense', amount: 150 },
  { id: 3, date: '2026-03-08', category: 'Utilities', type: 'expense', amount: 200 },
  { id: 4, date: '2026-03-10', category: 'Freelance', type: 'income', amount: 800 },
  { id: 5, date: '2026-03-15', category: 'Entertainment', type: 'expense', amount: 120 },
  { id: 6, date: '2026-03-20', category: 'Dining', type: 'expense', amount: 75 },
  { id: 7, date: '2026-03-25', category: 'Investments', type: 'income', amount: 300 },
  { id: 8, date: '2026-03-28', category: 'Transport', type: 'expense', amount: 60 },
  { id: 9, date: '2026-04-01', category: 'Salary', type: 'income', amount: 5000 },
  { id: 10, date: '2026-04-02', category: 'Groceries', type: 'expense', amount: 180 },
];

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(mockTransactions);

  // Function to add a new transaction (for admin simulation)
  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, { id: prev.length + 1, ...transaction }]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

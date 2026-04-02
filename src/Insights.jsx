import { useContext } from 'react';
import { TransactionContext } from './TransactionContext';

export default function Insights() {
  const { transactions } = useContext(TransactionContext);

  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryTotals = {};
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });
  const highestCategory = Object.keys(categoryTotals).length
    ? Object.keys(categoryTotals).reduce((a, b) =>
        categoryTotals[a] > categoryTotals[b] ? a : b
      )
    : null;

  const monthlyTotals = {};
  transactions.forEach(t => {
    const month = t.date.slice(0, 7);
    if (!monthlyTotals[month]) monthlyTotals[month] = { income: 0, expense: 0 };
    if (t.type === 'income') monthlyTotals[month].income += t.amount;
    else monthlyTotals[month].expense += t.amount;
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4">Insights</h2>

      <p className="mb-2">
        <span className="font-semibold">Highest Spending Category:</span> {highestCategory || 'N/A'}
      </p>

      <h3 className="font-semibold mb-2">Monthly Summary:</h3>
      <ul className="list-disc list-inside">
        {Object.keys(monthlyTotals).map(month => (
          <li key={month}>
            {month} → Income: ${monthlyTotals[month].income} | Expenses: ${monthlyTotals[month].expense}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext();

export function useBudgets() {
	return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
	const [budget, setBudgets] = useState([]);
	const [expenses, setExpenses] = useState([]);

	const getBudgetExpenses = (budgetId) => {
		return expenses.filter((exp) => exp.budgetId === budgetId);
	};

	const addExpense = ({ description, amount, budgetId }) => {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
		});
	};

	const addBudget = ({ name, max }) => {
		setBudgets((prevBudgets) => {
			if (prevBudgets.find((budget) => budget.name === name)) {
				return prevBudgets;
			}

			return [...prevBudgets, { id: uuidV4(), name, max }];
		});
	};

	const deleteBudget = ({ id }) => {
		setBudgets((prevBudgets) => {
			prevBudgets.filter((budget) => budget.id !== id);
		});
	};

	const deleteExpense = ({ id }) => {
		setExpenses((prevExpenses) => {
			prevExpenses.filter((exp) => exp.id !== id);
		});
	};

	return (
		<BudgetsContext.Provider
			value={{
				budget,
				expenses,
				getBudgetExpenses,
				addExpense,
				addBudget,
				deleteBudget,
				deleteExpense,
			}}
		>
			{children}
		</BudgetsContext.Provider>
	);
};

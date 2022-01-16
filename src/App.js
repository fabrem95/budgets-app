import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";

//Hooks
import { useBudgets } from "./contexts/BudgetsContext";

//Componentes
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
	const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

	const { budgets, getBudgetExpenses } = useBudgets();

	const openAddExpenseModal = (budgetId) => {
		setShowAddExpenseModal(true);
		setAddExpenseModalBudgetId(budgetId);
	};

	return (
		<React.Fragment>
			<Container className="my-4">
				<Stack direction="horizontal" gap={2} className="mb-4">
					<h1 className="me-auto">Budgets</h1>
					<Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
						Add Budget
					</Button>
					<Button variant="outline-primary" onClick={openAddExpenseModal}>
						Add Expense
					</Button>
				</Stack>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
						gap: "1rem",
						alignItems: "flex-start",
					}}
				>
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(total, expense) => total + expense.amount,
							0
						);

						return (
							<BudgetCard
								key={budget.id}
								name={budget.name}
								amount={amount}
								max={budget.max}
								onAddExpenseClick={() => openAddExpenseModal(budget.id)}
							/>
						);
					})}
					<UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} />
					<TotalBudgetCard />
				</div>
			</Container>
			<AddBudgetModal
				show={showAddBudgetModal}
				handleClose={() => setShowAddBudgetModal(false)}
			/>
			<AddExpenseModal
				show={showAddExpenseModal}
				defaultBudgetId={addExpenseModalBudgetId}
				handleClose={() => setShowAddExpenseModal(false)}
			/>
		</React.Fragment>
	);
}

export default App;

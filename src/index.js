import React from "react";
import ReactDOM from "react-dom";

//Estilos
import "bootstrap/dist/css/bootstrap.min.css";

//Componentes
import App from "./App";
import { BudgetsProvider } from "./contexts/BudgetsContext";

ReactDOM.render(
	<React.StrictMode>
		<BudgetsProvider>
			<App />
		</BudgetsProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

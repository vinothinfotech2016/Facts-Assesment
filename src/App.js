import React from "react";
import { AppNavigation } from "./components/navigation/Navigation";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppNavigation />
      </QueryClientProvider>
    </div>
  );
}

export default App;

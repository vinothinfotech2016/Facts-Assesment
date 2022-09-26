import React from "react";
import { AppNavigation } from "./components/navigation/Navigation";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import Loader from "./components/shared/Loader";
import CustomSnackbar from "./components/shared/CustomSnackbar";

const queryClient = new QueryClient();
function App() {
  const globalState = useSelector((state) => state);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {globalState.loader && <Loader />}
        <CustomSnackbar />
        <AppNavigation />
      </QueryClientProvider>
    </div>
  );
}

export default App;

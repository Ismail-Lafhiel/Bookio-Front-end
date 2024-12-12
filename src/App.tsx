import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

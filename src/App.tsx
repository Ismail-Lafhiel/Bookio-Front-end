import "./App.css";
import { AppRouter } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <Toaster position="top-right" />
        <AppRouter />
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;

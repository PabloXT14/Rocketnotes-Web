import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/defaultTheme";
import { GlobalStyles } from "./styles/global";
import { Routes } from "./routes";
import { AuthProvider } from "./store/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer position="top-center" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

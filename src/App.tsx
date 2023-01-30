import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/defaultTheme";
import { GlobalStyles } from "./styles/global";
import { Routes } from "./routes";
import { AuthProvider } from "./store/AuthContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}

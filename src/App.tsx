import { ThemeProvider } from "styled-components";
import { Details } from "./pages/Details";
import { defaultTheme } from "./styles/theme/defaultTheme";
import { GlobalStyles } from "./styles/global";
import { Home } from "./pages/Home";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  )
}

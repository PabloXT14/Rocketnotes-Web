import { ThemeProvider } from "styled-components";
import { Details } from "./pages/Details";
import { defaultTheme } from "./styles/theme/defaultTheme";
import { GlobalStyles } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Details />
    </ThemeProvider>
  )
}

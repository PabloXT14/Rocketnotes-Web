import { ThemeProvider } from "styled-components";
import { Details } from "./pages/Details";
import { defaultTheme } from "./styles/theme/defaultTheme";
import { GlobalStyles } from "./styles/global";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <SignIn />
    </ThemeProvider>
  )
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CustomRouter } from "./components/CustomRouter.tsx";
import "./index.css";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import rtlCache from "./rtlCache.ts";
import theme from "./theme.ts";

if (import.meta.env.VITE_MODE == "PROD") {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};
}
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0,
      retryDelay: 0,
      refetchOnWindowFocus: false,
      retryOnMount: false,
    },
  },
});

theme.palette.primary.main = "#3c83f6";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <CustomRouter>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </CustomRouter>
  </QueryClientProvider>
);

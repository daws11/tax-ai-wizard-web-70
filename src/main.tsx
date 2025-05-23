
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="atto-theme">
    <App />
  </ThemeProvider>
);

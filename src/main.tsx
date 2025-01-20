import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { PomodoroContextProvider } from './context/pomodoro-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PomodoroContextProvider>
    <App />
  </PomodoroContextProvider>
)

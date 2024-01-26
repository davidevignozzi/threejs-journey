import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    <App clickersCount={ 3 }>
        <h1>My First React App</h1>
        <h2>And a fancy subtitle</h2>
    </App>
)
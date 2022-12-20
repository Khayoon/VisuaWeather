import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'

//React 18 render syntax 
const rootElement  = document.getElementById('root');
const root = createRoot(rootElement );
root.render(<App/>);

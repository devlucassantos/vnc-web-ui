import { createRoot } from 'react-dom/client';

import { App } from './app/App';
import './main.scss';
import {ResourceProvider} from "@web/providers/resourceProvider";

createRoot(document.getElementById('root')!).render(
    <ResourceProvider>
        <App />
    </ResourceProvider>
);

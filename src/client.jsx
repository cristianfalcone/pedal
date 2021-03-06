import { Context } from '@bikeshaving/crank';
import { renderer } from '@bikeshaving/crank/dom';
import navaid from 'navaid';
import App from './components/app';
import routes from './routes';
import './styles/styles.css';

const root = document.getElementById('root');
const $isClient = true;
const $router = navaid();
const $fetch = window.fetch.bind(window);

// TODO: with hydration rendering, I don't need the following
// in order to read server rendering-time data.
const $data = {};
for (const meta of document.head.querySelectorAll('meta[name="ssr"]') || []) {
    const { id, content } = meta.dataset;
    if (id) $data[id] = JSON.parse(atob(content || '') || 'null');
}

for (const [$route, module] of routes) {
    $router.on($route, async ($params) => {
        let $isSSR;
        if (Object.keys(root.dataset).includes('ssr')) {
            delete root.dataset.ssr;
            $isSSR = true;
        } else {
            $isSSR = false;
        }

        Object.assign(Context.prototype, {
            $isClient,
            $router,
            $route,
            $params,
            $fetch,
            $isSSR,
            $data,
        });

        const { default: Route } = await module();

        renderer.render(
            <App>
                <Route {...$params} />
            </App>,
            root
        );
    });
}

$router.listen();

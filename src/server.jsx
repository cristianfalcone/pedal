import { Context } from '@bikeshaving/crank/cjs';
import { renderer } from '@bikeshaving/crank/cjs/html';
import { EventEmitter } from 'events';
import polka from 'polka';
import sirv from 'sirv';
import fetch from 'node-fetch';
import Document from './components/document';
import App from './components/app';
import routes from './routes';

const $isServer = true;
const $router = polka();
const $fetch = fetch;
const $bus = new EventEmitter();

for (const [$route, module] of routes) {
    $router.get($route, async ($req, $res) => {
        const $params = $req.params;
        Object.assign(Context.prototype, {
            $isServer,
            $req,
            $res,
            $router,
            $route,
            $params,
            $fetch,
            $bus,
        });

        const { default: Route } = await module();

        const document =
            '<!DOCTYPE html>' +
            (await renderer.render(
                <Document>
                    <App>
                        <Route {...$params} />
                    </App>
                </Document>
            ));

        $res.writableEnded || $res.end(document);
    });
}

const { PORT = 3000 } = process.env;
const serve = sirv('dist/client', { dev: process.env.NODE_ENV !== 'production' });
$router.use(serve).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${PORT}`);
});

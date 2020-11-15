import { Context } from '@bikeshaving/crank/cjs';
import { renderer } from '@bikeshaving/crank/cjs/html';
import polka from 'polka';
import sirv from 'sirv';
import fetch from 'node-fetch';
import Document from './components/document';
import App from './components/app';
import routes from './routes';

const { PORT = 3000 } = process.env;
const router = polka();
const serve = sirv('dist/client', {dev: process.env.NODE_ENV !== 'production'});

Context.prototype.$isServer = true;
Context.prototype.$router = router;
Context.prototype.$fetch = fetch;

routes.forEach(([route, module]) =>
    router.get(route, async (req, res) => {
        Context.prototype.$route = route;
        Context.prototype.$params = req.params;
        Context.prototype.$req = req;
        Context.prototype.$res = res;

        const { default: Route } = await module();

        const document =
            '<!DOCTYPE html>' +
            (await renderer.render(
                <Document>
                    <App>
                        <Route {...req.params} />
                    </App>
                </Document>
            ));

        res.writableEnded || res.end(document);
    })
);

router.use(serve).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${PORT}`);
});

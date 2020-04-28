import { renderer } from '@bikeshaving/crank/html';
import polka from 'polka';
import sirv from 'sirv';
import Head from './components/head';
import App from './components/app';
import routes from './routes';

function Document({ children }) {
    return (
        <html>
            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pedal</title>
            </Head>
            <body>
                <div id="app">{children}</div>
                <script src="./client.js" type="module"></script>
            </body>
        </html>
    );
}

const { PORT = 3000 } = process.env;
const router = polka();
const serve = sirv('dist/client');

routes.forEach(async ([route, component]) => {
    const Route = await component();
    router.get(route, (req, res) =>
        res.end(
            '<!DOCTYPE html>' +
                renderer.render(
                    <Document>
                        <App isServer>
                            <Route {...req.params} />
                        </App>
                    </Document>
                )
        )
    );
});

router.use(serve).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${PORT}`);
});

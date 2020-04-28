import { renderer } from '@bikeshaving/crank/dom';
import navaid from 'navaid';
import App from './components/app';
import routes from './routes';

const router = navaid();

routes.forEach(async ([route, component]) => {
    const Route = await component();
    router.on(route, (params) =>
        renderer.render(
            <App isClient>
                <Route {...params} />
            </App>,
            document.getElementById('app')
        )
    );
});

router.listen();

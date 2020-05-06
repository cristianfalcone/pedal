import { Context } from '@bikeshaving/crank';
import { renderer } from '@bikeshaving/crank/dom';
import navaid from 'navaid';
import App from './components/app';
import routes from './routes';
import './styles/styles.css';

const router = navaid();

Context.prototype.$isClient = true;
Context.prototype.$router = router;
Context.prototype.$fetch = window.fetch.bind(window);

routes.forEach(([route, module]) =>
    router.on(route, async (params) => {
        Context.prototype.$route = route;
        Context.prototype.$params = params;

        const { default: Route } = await module();

        renderer.render(
            <App>
                <Route {...params} />
            </App>,
            document.getElementById('app')
        );
    })
);

router.listen();

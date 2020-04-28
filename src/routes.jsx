export default [
    ['/', () => import('./routes/home').then((module) => module.default)],
    ['/about', () => import('./routes/about').then((module) => module.default)],
    ['/users/:id', () => import('./routes/user').then((module) => module.default)],
];

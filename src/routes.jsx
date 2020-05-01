export default [
    ['/', () => import('./routes/home')],
    ['/about', () => import('./routes/about')],
    ['/blog', () => import('./routes/blog')],
    ['/blog/:id', () => import('./routes/article')],
];

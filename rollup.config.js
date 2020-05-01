import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import inject from '@rollup/plugin-inject';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

const plugins = [
    resolve({
        extensions: ['.js', '.mjs', '.cjs', '.jsx'],
    }),
    sucrase({
        jsxPragma: 'createElement',
        jsxFragmentPragma: 'Fragment',
        transforms: ['jsx'],
        production,
    }),
    inject({
        createElement: ['@bikeshaving/crank', 'createElement'],
    }),
];

export default [
    {
        external: [
            '@bikeshaving/crank',
            '@bikeshaving/crank/cjs',
            '@bikeshaving/crank/cjs/html',
            'node-fetch',
            'polka',
            'sirv',
        ],
        preserveEntrySignatures: 'strict',
        context: 'process',
        input: ['src/server.jsx'],
        output: [
            {
                format: 'cjs',
                dir: 'dist/server',
                chunkFileNames: '[name].js',
                sourcemap: true,
            },
        ],
        plugins,
    },
    {
        preserveEntrySignatures: 'strict',
        context: 'window',
        input: ['src/client.jsx'],
        output: [
            {
                format: 'es',
                dir: 'dist/client',
                chunkFileNames: production ? '[name]-[hash].js' : '[name].js',
                sourcemap: true,
            },
        ],
        plugins: [
            commonjs(),
            postcss({
                plugins: [
                    tailwindcss,
                    production &&
                        cssnano({
                            preset: 'default',
                        }),
                ],
                extract: true,
            }),
            production && terser(),
        ].concat(plugins),
    },
];

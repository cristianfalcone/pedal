import sucrase from '@rollup/plugin-sucrase';
import inject from '@rollup/plugin-inject';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [
    sucrase({
        jsxPragma: 'createElement',
        jsxFragmentPragma: 'Fragment',
        transforms: ['jsx'],
    }),
    inject({
        createElement: ['@bikeshaving/crank', 'createElement'],
    }),
    resolve({
        extensions: ['.js', '.jsx'],
    }),
    commonjs(),
];

export default [
    {
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
        input: ['src/client.jsx'],
        output: [
            {
                format: 'es',
                dir: 'dist/client',
                chunkFileNames: '[name].js',
                sourcemap: true,
            },
        ],
        plugins,
    }
];

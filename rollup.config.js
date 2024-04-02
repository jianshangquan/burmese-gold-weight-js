import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts';
// import postcss from 'rollup-plugin-postcss';
// import tailwindcss from 'tailwindcss';

//NEW
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const packageJson = require('./package.json')
// const tailwindConfig = require('./tailwind.config.js');

export default [
  {
    input: 'src/burmese-gold-weight/index.js',
    output: [
      {
        file: './dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: './dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      // NEW
    //   typescript(),
      peerDepsExternal(),

    //   postcss({
    //     config: {
    //       path: './postcss.config.cjs',
    //     },
    //     extensions: ['.css'],
    //     minimize: true,
    //     inject: {
    //       insertAt: 'top',
    //     },
    //     plugins: [
    //       tailwindcss({
    //         content: ["./src/**/*.{html,js,ts,tsx}"],
    //         theme: {
    //           extend: {},
    //         },
    //         plugins: [],
    //       })
    //     ],
    //   }),

      resolve(),
      commonjs(),

      // NEW
      terser(),
    ],
  },
]

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'pdfToImage',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs({ include: 'node_modules/**' }),
      babel({
        extensions: ['.js', '.ts'],
        runtimeHelpers: true,
        exclude: ['node_modules/**']
      }),
      terser({ compress: { drop_console: true, drop_debugger: true } })
    ]
  },
  {
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      resolve(),
      babel({
        extensions: ['.js', '.ts'],
        runtimeHelpers: true,
        exclude: ['node_modules/**']
      }),
      commonjs({ include: 'node_modules/**' }),
      terser({ compress: { drop_console: true, drop_debugger: true } })
    ]
  }
]

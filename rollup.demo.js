import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const NODE_ENV = 'development'

export default {
  input: 'demo/index.js',
  output: {
    file: 'demo/dist/bundle.js',
    format: 'umd',
    name: 'FormigaReactstrap',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'reactstrap': 'Reactstrap',
      'reactstrap-date-picker': 'ReactstrapDatePicker',
      /*'formiga': 'Formiga'*/
    }
  },
  external: ['react', 'react-dom', 'reactstrap', 'reactstrap-date-picker'/*, 'formiga'*/],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),    
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs(),
    postcss({
      extract: 'bundle.css'
    }),
    serve({
      contentBase: './demo',
      host: 'localhost',
      port: 3002,      
    }),
    
    livereload({
      watch: '',
      port: 3003,
      verbose: true,
      delay: 700
    })
  ]
}
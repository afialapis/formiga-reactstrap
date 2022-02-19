import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'

import packageJSON from './package.json'

const NODE_ENV = 'production'
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

const input = './src/index.js';

const baseCfg= (output, withReplace, withTerser) => {
  let plugins= []
  if (withReplace) {
    plugins.push(
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      })      
    )
  }
  plugins= plugins.concat([
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs()
  ])
  if (withTerser) {
    plugins.push(
      terser()
    )
  }
  plugins.push(
    scss({
      output: false
    })
  )

  return {
    input: input,
    output: output,
    external: ['react', 'react-dom', 'prop-types', 'reactstrap', 'reactstrap-date-picker', 'formiga'],
    plugins: plugins  
  }
}

module.exports = [
  //
  // CommonJs
  //
  baseCfg({
    file: packageJSON.cjs,
    format: 'cjs'
  }, false, false),
  baseCfg({
    file: minifyExtension(packageJSON.cjs),
    format: 'cjs'
  }, false, true),
  //
  // ES modules
  //
  baseCfg({
    file: packageJSON.module,
    format: 'es',
    exports: 'named'
  }, true, false),
  baseCfg({
    file: minifyExtension(packageJSON.module),
    format: 'es',
    exports: 'named'
  }, true, true),  
  //
  // UMD
  //  
  baseCfg({
    file: packageJSON.browser,
    format: 'umd',
    name: 'FormigaReactstrap',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'reactstrap': 'Reactstrap',
      'reactstrap-date-picker': 'ReactstrapDatePicker',
      'formiga': 'Formiga'
    }
  }, true, false),
  baseCfg({
    file: minifyExtension(packageJSON.browser),
    format: 'umd',
    name: 'FormigaReactstrap',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'reactstrap': 'Reactstrap',
      'reactstrap-date-picker': 'ReactstrapDatePicker',
      'formiga': 'Formiga'
    }
  }, true, true), 
  // CSS
  {
    input: './src/assets/index.js',
    output: false,
    plugins: [
      scss({
        output: 'dist/styles.css'
      })
    ]
  },
  {
    input: './src/assets/index.js',
    output: false,
    plugins: [
      terser(),
      scss({
        output: 'dist/styles.min.css',
        outputStyle: 'compressed'
      })
    ]
  },  
];

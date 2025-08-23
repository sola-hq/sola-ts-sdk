import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: ['bn.js', '@scure/base'],
  format: ['cjs', 'esm'],
  minify: false,
  outDir: 'dist',
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.js',
  }),
  sourcemap: true,
  splitting: false,
  treeshake: true,
  tsconfig: './tsconfig.json',
});

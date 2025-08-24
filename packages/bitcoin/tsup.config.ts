import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.js',
  }),
});

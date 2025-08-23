import { defineConfig } from 'tsup';

export default defineConfig({
	entry: [
		'src/index.ts',
	],
	format: ['cjs', 'esm'],
	dts: true,
	outDir: 'dist',
	clean: true,
	splitting: false,
	sourcemap: true,
	treeshake: true,
	minify: false,
	outExtension: ({ format }) => ({
		js: format === 'esm' ? '.mjs' : '.js',
	}),
	tsconfig: './tsconfig.json',
	external: ['bn.js', '@scure/base'],
});
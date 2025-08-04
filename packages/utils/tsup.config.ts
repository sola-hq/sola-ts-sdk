import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	outDir: 'dist',
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: true,
	minify: false,
	outExtension: ({ format }) => ({
		js: format === 'esm' ? '.mjs' : '.cjs',
	}),
	tsconfig: './tsconfig.json',
	define: {
		global: 'globalThis',
		process: 'process',
		Buffer: 'Buffer',
	}
});
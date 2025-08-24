import * as fs from 'node:fs';
import * as path from 'node:path';

const blockchainName = process.argv[2];

if (!blockchainName) {
  console.error('Error: Please provide a name for the blockchain.');
  process.exit(1);
}

const packagesDir = path.join(__dirname, '..', '..', 'packages');
const sdkDir = path.join(packagesDir, blockchainName);

if (fs.existsSync(sdkDir)) {
  console.error(`Error: SDK for ${blockchainName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(sdkDir, { recursive: true });

const packageJson = {
  name: `@sola-hq/${blockchainName}`,
  version: '1.0.0',
  description: `SDK for ${blockchainName}`,
  main: 'dist/index.js',
  types: 'dist/index.d.ts',
  scripts: {
    build: 'tsc',
    test: 'vitest',
  },
  dependencies: {
    '@sola-hq/toolkit': 'workspace:*',
  },
  devDependencies: {
    typescript: '^5.0.4',
    vitest: '^3.2.4',
  },
};

fs.writeFileSync(
  path.join(sdkDir, 'package.json'),
  JSON.stringify(packageJson, null, 2),
);

const tsconfigJson = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: './dist',
  },
  include: ['src/**/*.ts'],
};

fs.writeFileSync(
  path.join(sdkDir, 'tsconfig.json'),
  JSON.stringify(tsconfigJson, null, 2),
);

fs.mkdirSync(path.join(sdkDir, 'src'));
fs.writeFileSync(
  path.join(sdkDir, 'src', 'index.ts'),
  '// TODO: Implement SDK logic here',
);

console.log(`SDK for ${blockchainName} created successfully.`);

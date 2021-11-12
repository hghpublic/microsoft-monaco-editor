/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

const { removeDir, tsc, dts, buildESM, buildAMD } = require('../build/utils');

removeDir(`monaco-json/release`);
removeDir(`monaco-json/out`);

tsc(`monaco-json/src/tsconfig.json`);

dts(
	`monaco-json/out/amd/monaco.contribution.d.ts`,
	`monaco-json/monaco.d.ts`,
	'monaco.languages.json'
);

buildESM({
	base: 'monaco-json',
	entryPoints: ['src/monaco.contribution.ts', 'src/jsonMode.ts', 'src/json.worker.ts'],
	external: ['monaco-editor-core', '*/jsonMode']
});
buildAMD({
	base: 'monaco-json',
	entryPoint: 'src/monaco.contribution.ts',
	amdModuleId: 'vs/language/json/monaco.contribution',
	amdDependencies: ['vs/editor/editor.api']
});
buildAMD({
	base: 'monaco-json',
	entryPoint: 'src/jsonMode.ts',
	amdModuleId: 'vs/language/json/jsonMode'
});
buildAMD({
	base: 'monaco-json',
	entryPoint: 'src/jsonWorker.ts',
	amdModuleId: 'vs/language/json/jsonWorker'
});
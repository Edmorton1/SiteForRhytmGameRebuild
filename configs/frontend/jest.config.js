/** @type {import('@jest/types').Config.InitialOptions} */
export default {
	moduleFileExtensions: ['js', 'ts'],
	rootDir: 'src',
	testRegex: '.*\\.test\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	testEnvironment: 'jsdom'
};

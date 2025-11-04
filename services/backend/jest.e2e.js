/** @type {import('jest').Config} */
module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testMatch: ['**/__e2e__/**/*.e2e-test.ts'],
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	}
};

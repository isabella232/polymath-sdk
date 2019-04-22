module.exports = {
  repositoryUrl: 'https://github.com/PolymathNetwork/polymath-sdk.git',
  branches: [
    '+([1-9])?(.{+([1-9]),x}).x',
    'master',
    'next',
    'next-major',
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: true,
    },
  ],
  /**
   * In this order the
   *
   *
   */
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        tarballDir: 'npm-package/',
      },
    ],
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};

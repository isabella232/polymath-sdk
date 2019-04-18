module.exports = {
  repositoryUrl: 'https://github.com/PolymathNetwork/polymath-sdk.git',
  branches: [
    'master',
    {
      name: 'beta',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};

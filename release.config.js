module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog', // Generates the changelog
    [
      '@semantic-release/github', // Manages the GitHub release
      {
        assets: [{ path: 'CHANGELOG.md', label: 'Changelog' }],
      },
    ],
    '@semantic-release/git', // Commits changed files including the changelog
    '@semantic-release/npm', // Handles npm publishing
  ],
};

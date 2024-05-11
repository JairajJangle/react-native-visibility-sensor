module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer', // Analyzes commits for version bumping
    '@semantic-release/release-notes-generator', // Generates release notes
    '@semantic-release/changelog', // Generates the changelog
    '@semantic-release/git', // Commits changed files including the changelog
    [
      '@semantic-release/github', // Manages the GitHub release and uploads assets
      {
        assets: [{ path: 'CHANGELOG.md', label: 'Changelog' }],
      },
    ],
    '@semantic-release/npm', // Handles npm publishing
  ],
};

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', 'fix', 'bug', 'refactor', 'design', 'style', 'docs', 'test', 'settings',
        'chore', 'init', 'rename', 'remove', 'build', 'deploy', 'ci', 'perf', 'revert', 'merge',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], 
    'subject-empty': [2, 'never'], 
  },
};

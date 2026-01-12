module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(!?[A-Za-z ]+)(?:\(([^)]+)\))?(!?): (.+)$/,
      headerCorrespondence: ['type', 'scope', 'breaking', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'feat',
        'fix',
        'style',
        'api',
        'refactor',
        'chore',
        'deploy',
        'test',
        'rename',
        'remove',
        'docs',
        '!HOTFIX',
        '!BREAKING CHANGE',
      ],
    ],
    'type-case': [0, 'always'],
    'subject-case': [0, 'always'],
    'subject-empty': [2, 'never'],
  },
};

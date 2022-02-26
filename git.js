const simpleGit = require('simple-git')
const { DateTime } = require("luxon")
const sanitize = require("sanitize-filename")
const fs = require('fs').promises
const path = require('path')

module.exports = async function (text) {
  const {
    BLOG_PATH,
    COMMIT_MESSAGE,
    FILE_EXTENSION,
    GIT_BRANCH_NAME
  } = process.env
  const DATE_MASK = DateTime.now().toString()
  const FILE_NAME = sanitize(`${DATE_MASK}${FILE_EXTENSION}`)
  const FILE_PATH = path.normalize(`${BLOG_PATH}${path.sep}${FILE_NAME}`)

  const git = simpleGit(BLOG_PATH)
  await fs.writeFile(FILE_PATH, text, 'utf8')

  await git.pull()
  await git.add(FILE_NAME)
  await git.commit(COMMIT_MESSAGE)
  await git.push('origin', GIT_BRANCH_NAME)
}
const simpleGit = require('simple-git')
const { DateTime } = require("luxon")
const fs = require('fs').promises
const path = require('path')

module.exports = async function (text) {
  const { BLOG_PATH, COMMIT_MESSAGE } = process.env || '.'
  const DATE_MASK = DateTime.now().toString()
  const FILE_NAME = `${DATE_MASK}.md`
  const FILE_PATH = path.normalize(`${BLOG_PATH}/${FILE_NAME}`)

  const git = simpleGit(BLOG_PATH)
  await fs.writeFile(FILE_PATH, text, 'utf8')

  try {
    await git.pull()
    await git.add(FILE_NAME)
    await git.commit(COMMIT_MESSAGE)
    await git.push('origin', 'main')
  } catch (error) {
    console.error(`Error while pushing`, error);
  }
}
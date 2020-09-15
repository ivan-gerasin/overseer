import fs from 'fs'

interface FolderContent {
  files: string[]
  folders: string[]
}

function getFoldersAndFilesFromDir(root: string, content: FolderContent) {
  const dir = fs.opendirSync(root)
  let readEnd = false
  while (!readEnd) {
    const item = dir.readSync()
    if (item) {
      const path = `${root}/${item.name}`
      if (item.isFile()) {
        content.files.push(path)
      } else if (item.isDirectory()) {
        content.folders.push(path)
        getFoldersAndFilesFromDir(path, content)
      } else {
        // Not file, not directory - just ignore it
      }
    } else {
      readEnd = true
    }
  }
  return content
}

function directoryScanner() {

}
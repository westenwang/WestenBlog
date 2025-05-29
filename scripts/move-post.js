/* This is a script to move a post markdown file to a target directory */

import fs from "fs"
import path from "path"

const args = process.argv.slice(2)

if (args.length !== 2) {
  console.error(`Error: Incorrect number of arguments
Usage: npm run move -- <source_file> <target_directory>`)
  process.exit(1)
}

const sourceFile = args[0]
const targetDir = args[1]

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i
const fileName = fileExtensionRegex.test(sourceFile) ? sourceFile : sourceFile + ".md"

// Ensure source file exists
const sourcePath = path.resolve("./src/content/posts/", fileName)
if (!fs.existsSync(sourcePath)) {
  console.error(`Error: Source file ${sourcePath} does not exist`)
  process.exit(1)
}

// Create target directory if it doesn't exist
const targetPath = path.resolve("./src/content/posts/", targetDir)
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath, { recursive: true })
}

// Construct the new file path
const newFilePath = path.join(targetPath, path.basename(fileName))

// Check if target file already exists
if (fs.existsSync(newFilePath)) {
  console.error(`Error: Target file ${newFilePath} already exists`)
  process.exit(1)
}

// Move the file
try {
  fs.renameSync(sourcePath, newFilePath)
  console.log(`Successfully moved ${sourcePath} to ${newFilePath}`)
} catch (error) {
  console.error(`Error moving file: ${error.message}`)
  process.exit(1)
}
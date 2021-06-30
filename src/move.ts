type List = FolderType[];

interface File {
  id: string;
  name: string;
}

interface FolderType {
  id: string;
  name: string;
  files: File[];
}

export default function move(list: List, source: string, destination: string): List {
  let destinationFolderIndex = null;
  let sourceFolderIndex = null;
  let sourceFileIndex = null;

  // loop over folders
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === source) {
      throw new Error('You cannot move a folder');
    }

    // break loop when match is completed
    if (sourceFolderIndex && destinationFolderIndex) {
      break;
    }

    // get the destination folder index
    if (list[i].id === destination) {
      destinationFolderIndex = i;
    }

    // loop over files
    for (let j = 0; j < list[i].files.length; j += 1) {
      if (list[i].files[j].id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }

      // get the source folder and file indexes
      if (list[i].files[j].id === source) {
        sourceFolderIndex = i;
        sourceFileIndex = j;
        break;
      }
    }
  }

  // create new list
  if (sourceFolderIndex !== null && destinationFolderIndex !== null && sourceFileIndex !== null) {
    const newList = [...list];

    const sourceFolder = newList?.[sourceFolderIndex];
    const destinationFolder = newList[destinationFolderIndex];
    const sourceFile = newList[sourceFolderIndex].files[sourceFileIndex];

    // add file to destination folder
    destinationFolder.files.push(sourceFile);

    // remove file from source folder
    const newFileTree = sourceFolder.files.filter((file) => file.id !== sourceFile.id);
    sourceFolder.files = newFileTree;
    return newList;
  }

  throw new Error('Source or destination folder can not be found');
}

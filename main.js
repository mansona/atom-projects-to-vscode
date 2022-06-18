import CSON from 'cson';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import os from 'os';
import { join } from 'path';
import kebabCase from 'lodash.kebabcase';

const homedir = os.homedir();
const workspaceFolder = join(homedir, 'git', 'workspaces');

const projects = CSON.parse(readFileSync(join(homedir, '.atom', 'projects.cson')));

mkdirSync(workspaceFolder, { recursive: true });

const newProjects = [];

for (let project of projects) {  
  let filename = kebabCase(project.title);
  let fullFilename = join(workspaceFolder, `${filename}.code-workspace`);

  let contents = {
    folders: project.paths.map(path => ({ path }))
  }

  writeFileSync(fullFilename, JSON.stringify(contents, null, 2));

  newProjects.push({
		"name": project.title,
		"rootPath": fullFilename,
		"paths": [],
		"tags": [],
		"enabled": true
	})
}

console.log(JSON.stringify(newProjects, null, 2));
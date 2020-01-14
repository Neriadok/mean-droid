import * as yargs from 'yargs';
import {resolve} from 'path';
import {sync} from 'glob';

export const tools = sync(resolve(process.cwd(), 'tools/commands/*.ts'))
    .reduce(intoCommand, yargs)
    .argv;


function intoCommand(toolCommands, toolPath){
  const toolName = toolPath.split('/').pop().split('.').shift();
  return toolCommands.command(toolName, toolName, ({argv}) => executeTool(toolPath, argv));
}

function executeTool(toolPath, argv) {
  new Promise(async (resolve, reject) => {
    try {
      const tool = require(toolPath);
      resolve(await tool.main(argv));
    }
    catch (e) {
      reject(e);
    }
  });
}

#!/usr/bin/env node
import {
  copyFavIcon,
  generateEnv,
  generateRootFile,
  generateRoutes,
} from './generator.js'; // Adjust the path if your file is located differently
import { generateTemplate } from './templating.js';

// Process command line arguments
const [, , app, template] = process.argv;
console.log(`Generating root for ${app}`);
generateRootFile(app);
console.log(`Copy Favicon`);
copyFavIcon(app);
console.log(`Generating files for ${app}`);
console.log('Generating env file');
generateEnv(app);
console.log(`Registering required Modules.`);
generateRoutes(app);
console.log(`Setup completed for ${app}`);
generateTemplate(template);


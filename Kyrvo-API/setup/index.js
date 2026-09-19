#!/usr/bin/env node
import { convertJsonToToml, generateRoutes } from './generator.js'; // Adjust the path if your file is located differently

// Process command line arguments
const [, , app] = process.argv;


console.log(`Generating files for ${app}`);
console.log(`Generating Wrangler file for floudeflare.`);
convertJsonToToml(app);
console.log(`Registering required Modules.`);
generateRoutes(app);
console.log(`Setup completed for ${app}`);


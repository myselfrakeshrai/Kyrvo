// Import the required modules using ES6 import syntax
import fs from 'fs';
import toml from '@iarna/toml';

export function convertJsonToToml(app) {
  // Read the JSON file
  const jsonFilePath = `clients/${app}.json`;
  const tomlFilePath = `wrangler.toml`;
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return;
    }

    // Parse the JSON data into an object
    const jsonObject = JSON.parse(data);

    // Convert the JavaScript object to TOML format
    const tomlContent = toml.stringify(jsonObject);

    // Write the TOML content to a new file
    fs.writeFile(tomlFilePath, tomlContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the TOML file:', err);
        return;
      }
      console.log(`TOML file has been generated at ${tomlFilePath}`);
    });
  });
}

export function generateRoutes(app) {
  const jsonFilePath = `clients/${app}.json`;
  const moduleFile = `src/modules/index.ts`;
  const frontendModule = `assets/static/config.json`;
  const corsFile = `src/cors.ts`;
  const importStatements = [];
  const registerStatements = [];
  const appBuilders = [
    `import { OpenAPIHono } from '@hono/zod-openapi';`,
    `import { Context } from 'shared/Context';\n`,
    `const app = new OpenAPIHono<Context>();\n`,
  ];
  const appExport = `export default app;`;
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return;
    }

    // Parse the JSON data into an object
    const jsonObject = JSON.parse(data);

    const modules = [
      ...jsonObject['vars']['REQ_MODULES'],
      ...jsonObject['vars']['MODULES'],
    ];
    for (const module of modules) {
      importStatements.push(`import ${module} from './${module}';`);
      registerStatements.push(`app.route(${module}.path, ${module}.route);`);
    }
    fs.writeFile(
      moduleFile,
      [
        ...importStatements,
        ...appBuilders,
        ...registerStatements,
        appExport,
      ].join('\n'),
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing the Route file:', err);
          return;
        }
        console.log(`Route file has been generated at ${moduleFile}`);
      },
    );
    fs.writeFile(
      frontendModule,
      JSON.stringify({ data: { MODULES: [...modules, 'cms', 'dashboard'] } }), //add CMS to modules for menu permissions
      'utf8',
      () => {
        console.log(`Config file has been generated at ${moduleFile}`);
      },
    );
    fs.writeFile(
      corsFile,
      `export const CORS = ${JSON.stringify(jsonObject['vars']['APP_CORS'])};`,
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing the Route file:', err);
          return;
        }
        console.log(`CORS file has been generated at ${moduleFile}`);
      },
    );
  });
}

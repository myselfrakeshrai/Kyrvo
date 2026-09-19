// Import the required modules using ES6 import syntax
import fs from 'fs';

export function generateRoutes(app) {
  const moduleFile = `src/pages/AppRoutes.ts`;
  const importStatements = `import { AppRoutes } from './${app}/routes';`;
  const appExport = `export {AppRoutes};`;
  fs.writeFile(
    moduleFile,
    [importStatements, appExport].join('\n'),
    'utf8',
    (err) => {
      if (err) {
        console.error('Error writing the Route file:', err);
        return;
      }
      console.log(`Route file has been generated at ${moduleFile}`);
    },
  );
}

export function generateEnv(app) {
  const envFile = `.env.${app}`;
  const outputFile = '.env.prod';

  fs.readFile(envFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the ${envFile} file:`, err);
      return;
    }

    fs.writeFile(outputFile, data, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the .env file:', err);
        return;
      }
      console.log(`Content from ${envFile} has been written to ${outputFile}`);
    });
  });
}

export function generateRootFile(app) {
  // Read the content from the source file
  const sourcePath = `src/pages/${app}/app.html`;
  const destinationPath = `index.html`;
  fs.readFile(sourcePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading from ${sourcePath}: ${err}`);
      return;
    }

    // Write the content to the destination file
    fs.writeFile(destinationPath, data, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to ${destinationPath}: ${err}`);
        return;
      }
      console.log(
        `Content from ${sourcePath} copied to ${destinationPath} successfully.`,
      );
    });
  });
}

export function copyFavIcon(app) {
  // Read the content from the source file
  const sourcePath = `src/pages/${app}/favicon.ico`;
  const destinationPath = `public/favicon.ico`;
  fs.readFile(sourcePath, (err, data) => {
    if (err) {
      console.error(`Error reading from ${sourcePath}: ${err}`);
      return;
    }

    // Write the content to the destination file
    fs.writeFile(destinationPath, data, (err) => {
      if (err) {
        console.error(`Error writing to ${destinationPath}: ${err}`);
        return;
      }
      console.log(
        `Content from ${sourcePath} copied to ${destinationPath} successfully.`,
      );
    });
  });
}

import fs from 'fs';
export function generateTemplate(template) {
  const selectedTemplate = template || 'KyDefault';
  const moduleFile = `src/templates/template.ts`;
  const importStatements = [
    `import AuthLayout from 'src/templates/${selectedTemplate}/KyAuthLayout';`,
    `import LandingLayout from 'src/templates/${selectedTemplate}/KyLandingLayout';`,
    `import AdminLayout from 'src/templates/${selectedTemplate}/KyAdminLayout';`,
  ];
  const appExport = `export {AuthLayout, LandingLayout, AdminLayout};`;
  fs.writeFile(
    moduleFile,
    [...importStatements, appExport].join('\n'),
    'utf8',
    (err) => {
      if (err) {
        console.error('Error writing the template file:', err);
        return;
      }
      console.log(`Template file has been generated at ${moduleFile}`);
    },
  );
}

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const clientBase = path.join(root, 'dist', 'client', 'client');

function findAsset(pattern) {
  if (!fs.existsSync(clientBase)) return null;
  const assetsDir = path.join(clientBase, 'assets');
  if (!fs.existsSync(assetsDir)) return null;
  const files = fs.readdirSync(assetsDir);
  return files.find((f) => pattern.test(f));
}

async function main() {
  if (!fs.existsSync(clientBase)) {
    console.error('Client output folder not found:', clientBase);
    process.exit(1);
  }

  const jsFile = findAsset(/^index-.*\.js$/) || findAsset(/\.js$/);
  const cssFile = findAsset(/^styles-.*\.css$/) || findAsset(/\.css$/);

  const jsPath = jsFile ? `/assets/${jsFile}` : null;
  const cssPath = cssFile ? `/assets/${cssFile}` : null;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Assignment Cover Page Generator</title>
  ${cssPath ? `<link rel="stylesheet" href="${cssPath}">` : ''}
  <link rel="icon" href="/favicon.png">
</head>
<body>
  <div id="root"></div>
  <script>window.$_TSR = true;</script>
  ${jsPath ? `<script type="module" src="${jsPath}"></script>` : ''}
</body>
</html>`;

  const outPath = path.join(clientBase, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

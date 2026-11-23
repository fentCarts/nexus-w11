// Cloudflare Pages build: assembles ./dist (the site) from index.html, wallpapers and the Scramjet libraries.
import fs from 'node:fs';
import path from 'node:path';

const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const cp = (from, to) => fs.cpSync(from, path.join(out, to), { recursive: true });

cp('index.html', 'index.html');
cp('sw.js', 'sw.js');
if (fs.existsSync('wallpapers')) cp('wallpapers', 'wallpapers');

const nm = 'node_modules/@mercuryworkshop/';
const libs = [
  ['scramjet/dist', 'scram'],
  ['bare-mux/dist', 'baremux'],
  ['libcurl-transport/dist', 'libcurl'],
];
for (const [from, to] of libs) {
  const p = nm + from;
  if (!fs.existsSync(p)) {
    console.error(`\nMissing ${p}. Installed @mercuryworkshop packages:`);
    try { console.error(fs.readdirSync(nm).join(', ')); } catch { console.error('(none - did npm install run?)'); }
    process.exit(1);
  }
  cp(p, to);
  console.log(`${p} -> dist/${to}: ${fs.readdirSync(p).join(', ')}`);
}
console.log('\nBuild complete.');

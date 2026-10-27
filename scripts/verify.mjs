import {readFile,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist');
const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())await walk(path);else files.push(path);}}
await walk(root);
for(const path of ['index.html','posts/index.html','categories/index.html','tags/index.html','projects/index.html','404.html','rss.xml','feed.json','sitemap-index.xml','.nojekyll'])assert.ok((await stat(join(root,path))).isFile(),path);
const feed=JSON.parse(await readFile(join(root,'feed.json'),'utf8'));
assert.equal(feed.version,'https://jsonfeed.org/version/1.1');assert.ok(feed.items.length>=3);assert.equal(new Set(feed.items.map(i=>i.id)).size,feed.items.length);
for(const file of files.filter(f=>/\.(html|xml|json)$/.test(f))){const text=await readFile(file,'utf8');assert.ok(!text.includes('草稿範例'),`Draft leak ${file}`);}
let links=0;
for(const file of files.filter(f=>f.endsWith('.html'))){const html=await readFile(file,'utf8');assert.match(html,/<html lang="zh-Hant"/);assert.match(html,/rel="canonical"/);for(const [,href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"]*"/g)){const decoded=decodeURIComponent(href);const target=join(root,decoded);assert.ok(target.startsWith(root));try{const s=await stat(target);if(s.isDirectory())await stat(join(target,'index.html'));}catch{throw new Error(`Broken link ${href} in ${file}`);}links++;}}
console.log(`PASS: ${files.length} files; ${links} internal references; ${feed.items.length} published posts; drafts excluded.`);

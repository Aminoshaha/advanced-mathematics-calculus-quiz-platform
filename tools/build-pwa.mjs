import {readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,relative} from 'node:path';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
function walk(dir){return readdirSync(resolve(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);}
const assets=['./','index.html','manifest.webmanifest','data/questions.js',...walk('js'),...walk('assets').filter(p=>/\.(css|png|jpg|svg)$/.test(p))].sort();
const hash=createHash('sha256');
for(const name of assets){hash.update(name);if(name!=='./')hash.update(readFileSync(resolve(root,name)));}
hash.update(readFileSync(resolve(root,'sw.js')));
const revision=hash.digest('hex').slice(0,16);
writeFileSync(resolve(root,'precache.js'),`// 自动生成：界面、题库或图片更新后运行 node tools/build-pwa.mjs\nself.__PWA_REVISION=${JSON.stringify(revision)};\nself.__PWA_ASSETS=${JSON.stringify(assets,null,2)};\n`);
console.log(`PWA 缓存清单：${assets.length} 个资源，版本 ${revision}`);

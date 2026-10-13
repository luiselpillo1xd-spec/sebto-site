// Dev-only helper: serve the static export in out/ for local preview.
// Spawns detached so it survives this process; run scripts/check.mjs to verify.
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = process.env.PORT || "8123";
const entry = path.join(root, "index.html");

const child = spawn(
  process.execPath,
  [
    "-e",
    `const h=require('http'),f=require('fs'),p=require('path'),u=require('url');
     const root=${JSON.stringify(root)};
     const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json','.txt':'text/plain','.woff2':'font/woff2','.ico':'image/x-icon'};
     h.createServer((req,res)=>{
       let d=u.parse(req.url).pathname;
       try{d=decodeURIComponent(d)}catch{}
       if(d.endsWith('/'))d+='index.html';
       let file=p.join(root,d);
       if(!file.startsWith(root)){res.writeHead(403);return res.end();}
       if(!f.existsSync(file)&&f.existsSync(file+'.html'))file+='.html';
       if(!f.existsSync(file)){res.writeHead(404,{'content-type':'text/html'});return res.end('<h1>404</h1>');}
       res.writeHead(200,{'content-type':types[p.extname(file)]||'application/octet-stream','cache-control':'no-store'});
       f.createReadStream(file).pipe(res);
     }).listen(${port},'127.0.0.1',()=>console.log('listening ${port}'));`,
  ],
  { detached: true, stdio: "ignore" },
);
child.unref();

setTimeout(() => {
  console.log(`preview: http://127.0.0.1:${port}/`);
  console.log(`entry:   ${entry}`);
}, 700);
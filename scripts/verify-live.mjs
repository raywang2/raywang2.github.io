const base=process.env.PAGE_URL;
if(!base) throw new Error('PAGE_URL is required');
for(const path of ['', 'posts/','categories/','tags/','projects/','rss.xml','feed.json','sitemap-index.xml']) {
 let success=false;
 for(let attempt=0;attempt<6;attempt++) {
  const response=await fetch(new URL(path,base));
  const body=await response.text();
  if(response.ok && body.includes(path==='feed.json'?'jsonfeed.org':path==='sitemap-index.xml'?'sitemap':'RR')) {success=true;break;}
  await new Promise(resolve=>setTimeout(resolve,5000));
 }
 if(!success) throw new Error(`Live verification failed: ${path}`);
 console.log(`PASS ${path||'/'}`);
}

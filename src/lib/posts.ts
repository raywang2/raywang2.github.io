import { getCollection } from 'astro:content';
export const published = async () => (await getCollection('posts')).filter(p=>!p.data.draft && p.data.date.getTime()<=Date.now()).sort((a,b)=>b.data.date.getTime()-a.data.date.getTime() || a.id.localeCompare(b.id));
export const postUrl = (id:string) => `/posts/${id}/`;
export const termUrl = (kind:'categories'|'tags',term:string) => `/${kind}/${encodeURIComponent(term)}/`;
export const dateLabel = (date:Date) => date.toLocaleDateString('zh-TW',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'});

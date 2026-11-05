/* WordUp OneSignal broadcast API. Configure all three values as Worker secrets. */
const ALLOWED_ORIGIN = "https://wordupenglish.github.io";
const cors = origin => ({ "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN, "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization", "Vary": "Origin" });
const json = (data,status,origin) => new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8",...cors(origin)}});
export default { async fetch(request,env) {
  const origin=request.headers.get("Origin")||"";
  if(request.method==="OPTIONS") return new Response(null,{status:204,headers:cors(origin)});
  const url=new URL(request.url);
  if(request.method==="GET"&&url.pathname==="/health") return json({ok:true,service:"WordUp push service"},200,origin);
  if(request.method!=="POST"||url.pathname!=="/send") return json({error:"Not found"},404,origin);
  if(origin&&origin!==ALLOWED_ORIGIN) return json({error:"Origin not allowed"},403,origin);
  const auth=request.headers.get("Authorization")||"";
  if(!env.PUSH_ADMIN_TOKEN||auth!=="Bearer "+env.PUSH_ADMIN_TOKEN) return json({error:"Unauthorized"},401,origin);
  if(!env.ONESIGNAL_APP_ID||!env.ONESIGNAL_REST_API_KEY) return json({error:"Push provider secrets are not configured"},503,origin);
  let payload; try{payload=await request.json()}catch{return json({error:"Invalid JSON"},400,origin)}
  const title=String(payload.title||"").trim().slice(0,60), message=String(payload.message||"").trim().slice(0,180);
  if(!title||!message) return json({error:"A title and message are required"},400,origin);
  const provider=await fetch("https://api.onesignal.com/notifications?c=push",{method:"POST",headers:{"Content-Type":"application/json; charset=utf-8","Authorization":"Key "+env.ONESIGNAL_REST_API_KEY},body:JSON.stringify({app_id:env.ONESIGNAL_APP_ID,included_segments:["Subscribed Users"],headings:{en:title},contents:{en:message},url:"https://wordupenglish.github.io/wordup/"})});
  const result=await provider.json().catch(()=>({}));
  if(!provider.ok) return json({error:result.errors?.[0]||result.message||"Push provider rejected the request"},provider.status,origin);
  return json({ok:true,id:result.id||null,recipients:Number(result.recipients||0)},200,origin);
} };
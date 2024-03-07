class e{static name="Lodash";static version="1.2.2";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static get(e={},t="",s=void 0){Array.isArray(t)||(t=this.toPath(t));const a=t.reduce(((e,t)=>Object(e)[t]),e);return void 0===a?s:a}static set(e={},t="",s){return Array.isArray(t)||(t=this.toPath(t)),t.slice(0,-1).reduce(((e,s,a)=>Object(e[s])===e[s]?e[s]:e[s]=/^\d+$/.test(t[a+1])?[]:{}),e)[t[t.length-1]]=s,e}static unset(e={},t=""){return Array.isArray(t)||(t=this.toPath(t)),t.reduce(((e,s,a)=>a===t.length-1?(delete e[s],!0):Object(e)[s]),e)}static toPath(e){return e.replace(/\[(\d+)\]/g,".$1").split(".").filter(Boolean)}static escape(e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,(e=>t[e]))}static unescape(e){const t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};return e.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g,(e=>t[e]))}}class t{static name="$Storage";static version="1.0.9";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static data=null;static dataFile="box.dat";static#e=/^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;static#t(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":"undefined"!=typeof Egern?"Egern":void 0}static getItem(t=new String,s=null){let a=s;if(!0===t.startsWith("@")){const{key:s,path:o}=t.match(this.#e)?.groups;t=s;let r=this.getItem(t,{});"object"!=typeof r&&(r={}),a=e.get(r,o);try{a=JSON.parse(a)}catch(e){}}else{switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":a=$persistentStore.read(t);break;case"Quantumult X":a=$prefs.valueForKey(t);break;case"Node.js":this.data=this.#s(this.dataFile),a=this.data?.[t];break;default:a=this.data?.[t]||null}try{a=JSON.parse(a)}catch(e){}}return a??s}static setItem(t=new String,s=new String){let a=!1;if("object"==typeof s)s=JSON.stringify(s);else s=String(s);if(!0===t.startsWith("@")){const{key:o,path:r}=t.match(this.#e)?.groups;t=o;let i=this.getItem(t,{});"object"!=typeof i&&(i={}),e.set(i,r,s),a=this.setItem(t,i)}else switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":a=$persistentStore.write(s,t);break;case"Quantumult X":a=$prefs.setValueForKey(s,t);break;case"Node.js":this.data=this.#s(this.dataFile),this.data[t]=s,this.#a(this.dataFile),a=!0;break;default:a=this.data?.[t]||null}return a}static removeItem(t){let s=!1;if(!0===t.startsWith("@")){const{key:a,path:o}=t.match(this.#e)?.groups;t=a;let r=this.getItem(t);"object"!=typeof r&&(r={}),keyValue=e.unset(r,o),s=this.setItem(t,r)}else switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Node.js":default:s=!1;break;case"Quantumult X":s=$prefs.removeValueForKey(t)}return s}static clear(){let e=!1;switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Node.js":default:e=!1;break;case"Quantumult X":e=$prefs.removeAllValues()}return e}static#s(e){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(e),s=this.path.resolve(process.cwd(),e),a=this.fs.existsSync(t),o=!a&&this.fs.existsSync(s);if(!a&&!o)return{};{const e=a?t:s;try{return JSON.parse(this.fs.readFileSync(e))}catch(e){return{}}}}}static#a(e=this.dataFile){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(e),s=this.path.resolve(process.cwd(),e),a=this.fs.existsSync(t),o=!a&&this.fs.existsSync(s),r=JSON.stringify(this.data);a?this.fs.writeFileSync(t,r):o?this.fs.writeFileSync(s,r):this.fs.writeFileSync(t,r)}}}class s{static name="ENV";static version="1.7.4";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}constructor(e,t){console.log(`\n🟧 ${s.name} v${s.version}\n`),this.name=e,this.logs=[],this.isMute=!1,this.isMuteLog=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,t),this.log(`\n🚩 开始!\n${e}\n`)}platform(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":"undefined"!=typeof Egern?"Egern":void 0}isNode(){return"Node.js"===this.platform()}isQuanX(){return"Quantumult X"===this.platform()}isSurge(){return"Surge"===this.platform()}isLoon(){return"Loon"===this.platform()}isShadowrocket(){return"Shadowrocket"===this.platform()}isStash(){return"Stash"===this.platform()}isEgern(){return"Egern"===this.platform()}async getScript(e){return await this.fetch(e).then((e=>e.body))}async runScript(e,s){let a=t.getItem("@chavy_boxjs_userCfgs.httpapi");a=a?.replace?.(/\n/g,"")?.trim();let o=t.getItem("@chavy_boxjs_userCfgs.httpapi_timeout");o=1*o??20,o=s?.timeout??o;const[r,i]=a.split("@"),n={url:`http://${i}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};await this.fetch(n).then((e=>e.body),(e=>this.logErr(e)))}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.headers.Cookie&&void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}async fetch(t={}||"",s={}){switch(t.constructor){case Object:t={...t,...s};break;case String:t={url:t,...s}}t.method||(t.method="GET",(t.body??t.bodyBytes)&&(t.method="POST")),delete t.headers?.Host,delete t.headers?.[":authority"],delete t.headers?.["Content-Length"],delete t.headers?.["content-length"];const a=t.method.toLocaleLowerCase();switch(this.platform()){case"Loon":case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:return t.policy&&(this.isLoon()&&(t.node=t.policy),this.isStash()&&e.set(t,"headers.X-Stash-Selected-Proxy",encodeURI(t.policy))),"boolean"==typeof t.redirection&&(t["auto-redirect"]=t.redirection),t.bodyBytes&&!t.body&&(t.body=t.bodyBytes,delete t.bodyBytes),await new Promise(((e,s)=>{$httpClient[a](t,((a,o,r)=>{a?s(a):(o.ok=/^2\d\d$/.test(o.status),o.statusCode=o.status,r&&(o.body=r,1==t["binary-mode"]&&(o.bodyBytes=r)),e(o))}))}));case"Quantumult X":return t.policy&&e.set(t,"opts.policy",t.policy),"boolean"==typeof t["auto-redirect"]&&e.set(t,"opts.redirection",t["auto-redirect"]),t.body instanceof ArrayBuffer?(t.bodyBytes=t.body,delete t.body):ArrayBuffer.isView(t.body)?(t.bodyBytes=t.body.buffer.slice(t.body.byteOffset,t.body.byteLength+t.body.byteOffset),delete object.body):t.body&&delete t.bodyBytes,await $task.fetch(t).then((e=>(e.ok=/^2\d\d$/.test(e.statusCode),e.status=e.statusCode,e)),(e=>Promise.reject(e.error)));case"Node.js":let s=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;return await this.got[a](o,r).on("redirect",((e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}})).then((e=>(e.statusCode=e.status,e.body=s.decode(e.rawBody,this.encoding),e.bodyBytes=e.rawBody,e)),(e=>Promise.reject(e.message)))}}time(e,t=null){const s=t?new Date(t):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in a)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[t]:("00"+a[t]).substr((""+a[t]).length)));return e}msg(e=name,t="",s="",a){const o=e=>{switch(typeof e){case void 0:return e;case"string":switch(this.platform()){case"Surge":case"Stash":case"Egern":default:return{url:e};case"Loon":case"Shadowrocket":return e;case"Quantumult X":return{"open-url":e};case"Node.js":return}case"object":switch(this.platform()){case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:return{url:e.url||e.openUrl||e["open-url"]};case"Loon":return{openUrl:e.openUrl||e.url||e["open-url"],mediaUrl:e.mediaUrl||e["media-url"]};case"Quantumult X":return{"open-url":e["open-url"]||e.url||e.openUrl,"media-url":e["media-url"]||e.mediaUrl,"update-pasteboard":e["update-pasteboard"]||e.updatePasteboard};case"Node.js":return}default:return}};if(!this.isMute)switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$notification.post(e,t,s,o(a));break;case"Quantumult X":$notify(e,t,s,o(a));case"Node.js":}if(!this.isMuteLog){let a=["","==============📣系统通知📣=============="];a.push(e),t&&a.push(t),s&&a.push(s),console.log(a.join("\n")),this.logs=this.logs.concat(a)}}log(...e){e.length>0&&(this.logs=[...this.logs,...e]),console.log(e.join(this.logSeparator))}logErr(e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️ ${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise((t=>setTimeout(t,e)))}done(t={}){const s=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🚩 ${this.name}, 结束! 🕛 ${s} 秒`,""),this.platform()){case"Surge":t.policy&&e.set(t,"headers.X-Surge-Policy",t.policy),$done(t);break;case"Loon":t.policy&&(t.node=t.policy),$done(t);break;case"Stash":t.policy&&e.set(t,"headers.X-Stash-Selected-Proxy",encodeURI(t.policy)),$done(t);break;case"Egern":case"Shadowrocket":default:$done(t);break;case"Quantumult X":t.policy&&e.set(t,"opts.policy",t.policy),delete t["auto-redirect"],delete t["auto-cookie"],delete t["binary-mode"],delete t.charset,delete t.host,delete t.insecure,delete t.method,delete t.opt,delete t.path,delete t.policy,delete t["policy-descriptor"],delete t.scheme,delete t.sessionIndex,delete t.statusCode,delete t.timeout,t.body instanceof ArrayBuffer?(t.bodyBytes=t.body,delete t.body):ArrayBuffer.isView(t.body)?(t.bodyBytes=t.body.buffer.slice(t.body.byteOffset,t.body.byteLength+t.body.byteOffset),delete t.body):t.body&&delete t.bodyBytes,$done(t);break;case"Node.js":process.exit(1)}}}class a{static name="URI";static version="1.2.7";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static#o={scheme:"",host:"",path:"",query:{}};static parse(e){let t=e.match(/(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/)?.groups??null;if(t?.path?t.paths=t.path.split("/"):t.path="",t?.paths){const e=t.paths[t.paths.length-1];if(e?.includes(".")){const s=e.split(".");t.format=s[s.length-1]}}return t?.query&&(t.query=Object.fromEntries(t.query.split("&").map((e=>e.split("="))))),t}static stringify(e=this.#o){let t="";return e?.scheme&&e?.host&&(t+=e.scheme+"://"+e.host),e?.path&&(t+=e?.host?"/"+e.path:e.path),e?.query&&(t+="?"+Object.entries(e.query).map((e=>e.join("="))).join("&")),t}}var o={Switch:!0,Type:"Translate",Types:["Official","Translate"],Languages:["EN","ZH"],CacheSize:50},r={breakLine:{"text/xml":"&#x000A;","application/xml":"&#x000A;","text/vtt":"\n","application/vtt":"\n","text/json":"\n","application/json":"\n"}},i={Settings:o,Configs:r},n={Switch:!0,Types:["Translate","External"],Languages:["AUTO","ZH"]},c={Settings:n},l=Database={Default:Object.freeze({__proto__:null,Configs:r,Settings:o,default:i}),Spotify:Object.freeze({__proto__:null,Settings:n,default:c})};function u(s,a,o){console.log("☑️ Set Environment Variables","");let{Settings:r,Caches:i,Configs:n}=function(s,a,o){let r=t.getItem(s,o),i={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((e=>e.split("=").map((e=>e.replace(/\"/g,""))))));for(let s in t)e.set(i,s,t[s])}const n={Settings:o?.Default?.Settings||{},Configs:o?.Default?.Configs||{},Caches:{}};Array.isArray(a)||(a=[a]);for(let e of a)n.Settings={...n.Settings,...o?.[e]?.Settings,...i,...r?.[e]?.Settings},n.Configs={...n.Configs,...o?.[e]?.Configs},r?.[e]?.Caches&&"string"==typeof r?.[e]?.Caches&&(r[e].Caches=JSON.parse(r?.[e]?.Caches)),n.Caches={...n.Caches,...r?.[e]?.Caches};return function e(t,s){for(var a in t){var o=t[a];t[a]="object"==typeof o&&null!==o?e(o,s):s(a,o)}return t}(n.Settings,((e,t)=>("true"===t||"false"===t?t=JSON.parse(t):"string"==typeof t&&(t=t.includes(",")?t.split(",").map((e=>c(e))):c(t)),t))),n;function c(e){return e&&!isNaN(e)&&(e=parseInt(e,10)),e}}(s,a,o);return Array.isArray(r?.Types)||(r.Types=r.Types?[r.Types]:[]),console.log(`✅ Set Environment Variables, Settings: ${typeof r}, Settings内容: ${JSON.stringify(r)}`,""),("object"!=typeof i?.Playlists||Array.isArray(i?.Playlists))&&(i.Playlists={}),i.Playlists.Master=new Map(JSON.parse(i?.Playlists?.Master||"[]")),i.Playlists.Subtitle=new Map(JSON.parse(i?.Playlists?.Subtitle||"[]")),"object"!=typeof i?.Subtitles&&(i.Subtitles=new Map(JSON.parse(i?.Subtitles||"[]"))),("object"!=typeof i?.Metadatas||Array.isArray(i?.Metadatas))&&(i.Metadatas={}),"object"!=typeof i?.Metadatas?.Tracks&&(i.Metadatas.Tracks=new Map(JSON.parse(i?.Metadatas?.Tracks||"[]"))),{Settings:r,Caches:i,Configs:n}}const h=new s("🍿 DualSubs: 🎵 Spotify v1.3.6(5) request");let d;const p=a.parse($request.url);h.log(`⚠ URL: ${JSON.stringify(p)}`,"");const y=$request.method;p.host;const g=p.path,f=p.paths;h.log(`⚠ METHOD: ${y}`,"");const m=($request.headers?.["Content-Type"]??$request.headers?.["content-type"])?.split(";")?.[0];h.log(`⚠ FORMAT: ${m}`,""),(async()=>{const{Settings:s,Caches:o,Configs:r}=u("DualSubs","Spotify",l);switch(h.log(`⚠ Settings.Switch: ${s?.Switch}`,""),s.Switch){case!0:default:const r=p.query?.subtype??s.Type,i=[p.query?.lang?.toUpperCase?.()??s.Languages[0],(p.query?.tlang??o?.tlang)?.toUpperCase?.()??s.Languages[1]];h.log(`⚠ Type: ${r}, Languages: ${i}`,"");let n={};switch(y){case"POST":case"PUT":case"PATCH":case"DELETE":switch(m){case void 0:case"application/x-www-form-urlencoded":case"text/plain":case"text/html":default:case"application/x-mpegURL":case"application/x-mpegurl":case"application/vnd.apple.mpegurl":case"audio/mpegurl":case"text/xml":case"text/plist":case"application/xml":case"application/plist":case"application/x-plist":case"text/vtt":case"application/vtt":case"text/json":case"application/json":break;case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"application/octet-stream":let e=h.isQuanX()?new Uint8Array($request.bodyBytes??[]):$request.body??new Uint8Array;switch(m){case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":switch(g){case"bootstrap/v1/bootstrap":case"user-customization-service/v1/customize":delete $request.headers?.["If-None-Match"],delete $request.headers?.["if-none-match"]}}$request.body=e}case"GET":if(g.startsWith("color-lyrics/v2/track/")){let a=f?.[3];h.log("🚧 调试信息",`trackId: ${a}`,"");let r=JSON.parse(JSON.stringify($request));r.url=`https://api.spotify.com/v1/tracks?ids=${a}`,delete r?.headers?.Host,r?.headers?.Accept&&(r.headers.Accept="application/json"),r?.headers?.accept&&(r.headers.accept="application/json");const i=h.fetch($request),c=h.fetch(r);await Promise.allSettled([i,c]).then((a=>{switch(a[0].status){case"fulfilled":let t=a[0].value;switch(t?.statusCode??t?.status){case 200:s.Types.includes("Translate")?e.set(p,"query.subtype","Translate"):s.Types.includes("External")&&e.set(p,"query.subtype","External");break;case 401:default:break;case 404:s.Types.includes("External")&&e.set(p,"query.subtype","External")}break;case"rejected":s.Types.includes("External")&&e.set(p,"query.subtype","External")}switch(a[1].status){case"fulfilled":let e=a[1].value;n=JSON.parse(e.body),n?.tracks?.forEach?.((e=>{const t=e?.id,s={id:e?.id,track:e?.name,album:e?.album?.name,artist:e?.artists?.[0]?.name};o.Metadatas.Tracks.set(t,s)})),o.Metadatas.Tracks=function(e,t=100){return console.log(`☑️ Set Cache, cacheSize: ${t}`,""),e=(e=Array.from(e||[])).slice(-t),console.log("✅ Set Cache",""),e}(o.Metadatas.Tracks,s.CacheSize),t.setItem("@DualSubs.Spotify.Caches.Metadatas.Tracks",o.Metadatas.Tracks);break;case"rejected":h.log("🚧 调试信息",`detectTrack.reason: ${JSON.stringify(a[1].reason)}`,"")}}))}}$request.headers?.Host&&($request.headers.Host=p.host),$request.url=a.stringify(p),h.log("🚧 调试信息",`$request.url: ${$request.url}`,"");case!1:}})().catch((e=>h.logErr(e))).finally((()=>{if(void 0===d)h.done($request);else h.isQuanX()?(d.status||(d.status="HTTP/1.1 200 OK"),delete d.headers?.["Content-Length"],delete d.headers?.["content-length"],delete d.headers?.["Transfer-Encoding"],h.done(d)):h.done({response:d})}));

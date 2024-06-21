(function(I,F){typeof exports=="object"&&typeof module<"u"?module.exports=F():typeof define=="function"&&define.amd?define(F):(I=typeof globalThis<"u"?globalThis:I||self,I.typeahead=F())})(this,function(){"use strict";const I=(...n)=>{},F=n=>n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),U=n=>n!==null&&n?.constructor.name==="Object",re=n=>typeof n=="string",A=(n,l)=>{let g=n;const N=l.split(".");for(const k of N){if(!U(g)||!(k in g))return"";g=g[k]}return`${g}`},W=(n="")=>n.normalize("NFD").replace(/\p{Diacritic}/gu,""),j=(n,l)=>{if(!n.length)return[];if(U(n[0])){for(const g of n)if(!A(g,l))throw new Error("e03");return n}return n.map(g=>({[l]:re(g)?g:JSON.stringify(g)}))},se=n=>n.split(/\s+/),ge=async function(n,l){const g=await fetch(n,l||{method:"GET"});return ye(g)},ye=async function(n){const l=await n.text(),g=l&&JSON.parse(l);return n.ok?g:Promise.reject(g&&g.message||n.statusText)},ie={get:ge},we=(n={})=>{const{hasDiacritics:l,tokenizer:g}=n;let N={};const k="\0";function z(c=""){return c=`${c}`.trim(),l&&(c=W(c)),(g||se)(c.toLowerCase())}function P(c,T="",C){if(!c)return;let y;c=Array.isArray(c)?c:[c];const p=re(c[0]);for(const L of c){const v=z(p?L:A(L,T));for(const w of v){if(!w)continue;y=N;for(const S of w)y=y[S]||(y[S]={});const d=p?L:C&&C(L)||JSON.stringify(L),R=y[k]??(y[k]={});R[d]=L}}}function i(c){let T=N,C={};for(const p of c)if(T=T?.[p],typeof T>"u")return{};const y=[{node:T,prefix:c}];for(;y.length;){const{node:p,prefix:L}=y.pop();for(const v in p)if(v===k){const w=p[k];for(const d in w)C[d]=w[d]}else y.push({node:p[v],prefix:L+v})}return C}const q=(c,T)=>{const C={};for(const y in c)y in T&&(C[y]=c[y]);return C};function H(c,T){const C=z(c),y=C.length<=20?C.length:20;let p=i(C[0]);for(let v=1;v<y&&(p=q(p,i(C[v])),!!Object.keys(p).length);v++);p=Object.values(p);const L=p.length;return T&&L>T&&(p.length=T),{suggestions:p,count:L}}function V(){N={}}return{add:P,clear:V,search:H}};return n=>{if(!n.input)throw new Error("e01");if(!U(n.source))throw new Error("e02");const l=document.createElement("div"),g=n.preventSubmit||!1,N=n.minLength||1,k=n.hint!==!1,z=n.autoSelect||!1,P=n.tokenizer||se,i=n.templates,q=Array.isArray(n.source.keys)?n.source.keys:["label"],H=n.source.groupKey||"",V=e=>A(e,q[0]),c=n.display||V,T=n.source.identity||V,C=n.onSubmit||I,y=n.source.transform||(e=>e),p=n.source.local||null,L=typeof n.source.remote?.url,v=L==="function"||L==="string"&&n.source.remote.wildcard?n.source.remote:null,w=n.source.prefetch?.url?{when:"onInit",done:!1,...n.source.prefetch}:null,d={wrapper:"typeahead-standalone",input:"tt-input",hint:"tt-hint",highlight:"tt-highlight",hide:"tt-hide",show:"tt-show",list:"tt-list",selected:"tt-selected",header:"tt-header",footer:"tt-footer",loader:"tt-loader",suggestion:"tt-suggestion",group:"tt-group",empty:"tt-empty",notFound:"tt-notFound",...n.classNames||{}};if(!p&&!w&&!v)throw new Error("e02");const R=we({hasDiacritics:n.diacritics,tokenizer:P}),S=document.createElement("div");S.className=d.wrapper;const o={query:"",hits:[],count:0,limit:n.limit||5,wrapper:S};let J={},G={},f,X,$=!1,_="";i&&(i.header=typeof i.header=="function"?i.header:void 0,i.footer=typeof i.footer=="function"?i.footer:void 0,i.notFound=typeof i.notFound=="function"?i.notFound:void 0,i.group=typeof i.group=="function"?i.group:void 0,i.suggestion=typeof i.suggestion=="function"?i.suggestion:void 0,i.loader=typeof i.loader=="function"?i.loader:void 0,i.empty=typeof i.empty=="function"?i.empty:void 0);const Y=(e=[])=>{oe(j(e,q[0]))};p&&Y(p);const u=n.input;u.classList.add(d.input);const le=window.getComputedStyle(u),K=u.parentNode,ve=[...K.children].indexOf(u);K.removeChild(u),S.appendChild(u),K.insertBefore(S,K.children[ve]);const Q=u.cloneNode();k&&De(Q),l.classList.add(d.list,d.hide),l.setAttribute("aria-label","menu-options"),l.setAttribute("role","listbox"),l.style.position="absolute",l.style.width=`${u.offsetWidth}px`,l.style.marginTop=`${u.offsetHeight+parseInt(le.marginTop)}px`,S.appendChild(l),w&&w.when==="onInit"&&ce();function ce(){if(!w||w.done)return;let e=[];ie.get(typeof w.url=="function"?w.url():w.url,w?.requestOptions).then(t=>{e=y(t),e=j(e,q[0]),oe(e)},t=>{console.error("e04",t)}).finally(()=>{typeof w.process=="function"&&w.process(e)}),w.done=!0}const Z=()=>{l.classList.remove(d.hide)},be=()=>{l.classList.add(d.hide)},Ee=()=>!l.classList.contains(d.hide),ue=()=>X&&clearTimeout(X),D=()=>{o.hits=[],Q.value="",_="",be()},ae=()=>{u.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertCompositionText",data:u.value}))},ee=(e=!1)=>{if(!o.hits.length&&o.query){D(),te();const t=i?.notFound?.(o);if(!t)return!0;const r=h=>{const m=document.createElement("div");m.classList.add(d.notFound),O(m,h),l.appendChild(m)};return v?(J[JSON.stringify(o.query)]||e&&!$)&&r(t):r(t),Z(),!0}},te=()=>{for(;l.firstChild;)l.firstChild.remove()},de=()=>{if(!i?.loader)return;if(!$){const t=l.querySelector(`.${d.loader}`);t&&l.removeChild(t);return}const e=document.createElement("div");e.classList.add(d.loader),O(e,i.loader()),i?.footer?l.insertBefore(e,l.querySelector(`.${d.footer}`)):l.appendChild(e)},M=()=>{if(ee())return;te();const e=a=>{const s=document.createElement("div");return s.classList.add(d.suggestion),s.setAttribute("role","option"),s.setAttribute("aria-selected","false"),s.setAttribute("aria-label",c(a)),i?.suggestion?O(s,i.suggestion(a,o)):s.textContent=A(a,q[0]),s},t=a=>{const s=document.createElement("div");return s.classList.add(d.group),s.setAttribute("role","group"),s.setAttribute("aria-label",a),i?.group?O(s,i.group(a,o)):s.textContent=a||"",s},r=document.createDocumentFragment(),h=[];if(i?.header){const a=document.createElement("div");a.classList.add(d.header),a.setAttribute("role","presentation"),O(a,i.header(o))&&r.appendChild(a)}for(const[a,s]of o.hits.entries()){if(a===o.limit)break;const b=A(s,H);if(b&&!h.includes(b)){h.push(b);const x=t(b);r.appendChild(x)}const E=e(s);E.addEventListener("click",x=>{D(),f=s,u.value=c(s,x),ae()}),s===f&&(E.classList.add(d.selected),E.setAttribute("aria-selected","true")),r.appendChild(E),n.highlight!==!1&&Ae(E,o.query)}if(i?.footer){const a=document.createElement("div");a.classList.add(d.footer),a.setAttribute("role","presentation"),O(a,i.footer(o))&&r.appendChild(a)}l.appendChild(r),k&&Ne(f||o.hits[0]),(a=>{if(a===null)return;const s=a.getBoundingClientRect(),b=s.top<0,E=s.bottom>(window.innerHeight||document.documentElement.clientHeight),x=s.left<0,B=s.right>(window.innerWidth||document.documentElement.clientWidth);b?window.scrollBy({top:s.top-10,behavior:"smooth"}):E&&window.scrollBy({top:s.bottom-(window.innerHeight||document.documentElement.clientHeight)+10,behavior:"smooth"}),x?window.scrollBy({left:s.left-10,behavior:"smooth"}):B&&window.scrollBy({left:s.right-(window.innerWidth||document.documentElement.clientWidth)+10,behavior:"smooth"})})(l.querySelector(`.${d.selected}`)),Z()},xe=e=>{typeof e.inputType>"u"||e.inputType==="insertCompositionText"&&!e.isComposing||(_=u.value,fe())},Te=e=>{const t=o.hits.length>=o.limit?o.limit:o.hits.length;if(f===o.hits[0]){f=void 0,u.value=_;return}if(!f)f=o.hits[t-1];else for(let r=t-1;r>0;r--)if(f===o.hits[r]||r===1){f=o.hits[r-1];break}u.value=c(f,e)},Ce=e=>{const t=o.hits.length>=o.limit?o.limit:o.hits.length;if(!f){f=o.hits[0],u.value=c(f,e);return}if(f===o.hits[t-1]){f=void 0,u.value=_;return}for(let r=0;r<t-1;r++)if(f===o.hits[r]){f=o.hits[r+1];break}u.value=c(f,e)},Le=e=>{if(e.key==="Escape"||!u.value.length&&!o.hits.length)return D();if(o.hits.length&&(e.key==="ArrowUp"||e.key==="ArrowDown")){e.key==="ArrowDown"?Ce(e):Te(e),M(),e.preventDefault(),e.stopPropagation();return}const t=function(r=!1){if(!f&&r&&o.hits.length&&(f=o.hits[0]),f)return D(),u.value=c(f,e),ae(),f};if(e.key==="Enter"){g&&e.preventDefault(),C(e,t());return}e.key==="Tab"&&Ee()&&(e.preventDefault(),t(!0))},ke=()=>{w?.when==="onFocus"&&ce(),fe()},fe=()=>{ue();const e=u.value.replace(/\s{2,}/g," ").trim();if(i?.empty&&!e.length){const t=i.empty(o);if(o.query="",Array.isArray(t)&&t.length)return o.hits=j(t,q[0]),M();if(D(),te(),t){const r=document.createElement("div");r.classList.add(d.empty),O(r,`${t}`),l.appendChild(r)}return Z()}if(e.length>=N){o.query=e,ne();const t=JSON.stringify(o.query);v&&o.hits.length<o.limit&&G[t]?.length&&ne(G[t]),M(),X=setTimeout(()=>{o.hits.length<o.limit&&!$&&pe()},v?.debounce||200)}else o.query="",D()},he=(e="")=>(n.diacritics&&(e=W(e)),e.toLowerCase()),ne=e=>{let{suggestions:t,count:r}=R.search(o.query,o.limit);if(e?.length){e.push(...t);const h={};for(const m of e)h[T(m)]=m;t=Object.values(h),r=t.length}qe(t),H&&Se(t),o.hits=t,o.count=r,f=void 0,z&&o.hits.length&&(f=o.hits[0])},pe=()=>{if(!v)return;$=!0;const e=o.query,t=JSON.stringify(e);if(J[t]||!o.query.length){$=!1,ee(!0);return}de();let r=[];ie.get(typeof v.url=="function"?v.url(e):v.url.replace(v.wildcard,e),v.requestOptions).then(h=>{r=y(h),r=j(r,q[0]),oe(r)},h=>{console.error("e05",h)}).finally(()=>{J[t]=!0,G[t]=r||[],$=!1,de(),r.length&&o.query.length&&(ne(r),M()),o.query.length&&e!==o.query&&pe(),ee(!0)})};function oe(e){if(e.length)for(const t of q)R.add(e,t,T)}const qe=e=>{const t=o.query.toLowerCase();e.sort((r,h)=>{const m=A(r,q[0]).toLowerCase(),a=A(h,q[0]).toLowerCase(),s=m.startsWith(t),b=a.startsWith(t);return s&&b?m.length-a.length:s?-1:b?1:0})},Se=e=>{e.sort((t,r)=>{const h=A(t,H),m=A(r,H);return!h&&!m?0:h?m?h<m?-1:h>m?1:0:1:-1})},Ae=(e,t)=>{if(!t)return;const h=(s=>{const b=P(s.trim()).map(E=>F(E)).sort((E,x)=>x.length-E.length);return new RegExp(`(${b.join("|")})`,"i")})(t),m=s=>{let b=h.exec(s.data);if(n.diacritics&&!b&&(b=h.exec(W(s.data))),b){const E=document.createElement("span");E.className=d.highlight;const x=s.splitText(b.index);return x.splitText(b[0].length),E.appendChild(x.cloneNode(!0)),s.parentNode?.replaceChild(E,x),!0}return!1},a=(s,b)=>{let x;for(let B=0;B<s.childNodes.length;B++)x=s.childNodes[B],x.nodeType===3?B+=b(x)?1:0:a(x,b)};a(e,m)};function De(e){["id","name","placeholder","required","aria-label"].forEach(t=>e.removeAttribute(t)),e.setAttribute("readonly","true"),e.setAttribute("aria-hidden","true"),e.style.marginTop=`-${u.offsetHeight+parseInt(le.marginBottom)}px`,e.tabIndex=-1,e.className=d.hint,u.after(e)}const Ne=e=>{const t=u.value;if(!t||c(e)===t||he(c(e)).indexOf(he(t).replace(/\s{2,}/g," ").trimStart())!==0)Q.value="";else{const r=c(e),h=new RegExp(F(o.query),"i");let m=h.exec(r);n.diacritics&&!m&&(m=h.exec(W(r))),m&&(Q.value=t.replace(/\s?$/,"")+r.substring(m[0].length))}},O=(e,t)=>{const r=document.createElement("template");return r.innerHTML=t,e.appendChild(r.content),t},Oe=()=>{setTimeout(()=>{document.activeElement!==u&&D()},50)};l.addEventListener("mousedown",function(e){e.stopPropagation(),e.preventDefault()});const me=e=>{D(),R.clear(),p&&!e&&Y(p),J={},G={},w&&(w.done=!1)},Fe=()=>{ue(),me(),S.replaceWith(u.cloneNode())};return u.addEventListener("keydown",Le),u.addEventListener("input",xe),u.addEventListener("blur",Oe),u.addEventListener("focus",ke),{addToIndex:Y,reset:me,destroy:Fe}}});

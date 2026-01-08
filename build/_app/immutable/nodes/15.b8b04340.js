import{s as Pr,e as X,l as he,c as j,a as ee,m as tt,o as ue,d as U,f as B,i as Oe,g as R,w as ai,P as Yn,y as _r,F as Qa,t as pr,b as mr,q as Rt,h as Lr,k as oi,U as Ki,z as rl,A as il,r as wf,x as bf,T as Sf,u as Gh,N as nl,n as Ef}from"../chunks/scheduler.2615d30e.js";import{S as Rr,i as Nr,c as it,a as nt,m as at,t as Xe,b as je,d as ot,e as Af,g as kh,f as Hh,h as ga}from"../chunks/index.5861eef5.js";import{e as ri}from"../chunks/each.490cd7f3.js";import{c as Bn,a as Cf,b as Lf,e as Mf,g as Df,m as Pf,A as Rf,M as Qi,d as Nf,n as If,S as Wt,C as Xt,i as Di,L as ys,u as Ct,f as Of,h as Bf,j as Ff,k as ur,l as al,o as Uf,p as zf,q as Vh,R as Wh,r as Gf,s as es,t as ir,v as kf,w as Hf,x as Vf,y as Xh,Z as Wf,z as ln,B as Be,D as si,E as Xf,F as jh,G as Fn,H as Kn,I as Zh,J as qh,K as Yh,N as Ja,O as $n,P as jf,Q as Zf,T as qf,U as ts,V as hn,W as fr,X as xs,Y as Yf,_ as Kf,$ as ol,a0 as $f,a1 as Qf,a2 as Jf,a3 as Zi,a4 as sl,a5 as ec,a6 as tc,a7 as rc,a8 as Kh,a9 as ic,aa as nc,ab as _a,ac,ad as oc,ae as $h,af as sc,ag as lc,ah as rs,ai as ll,aj as hl,ak as hc,al as uc,am as fc}from"../chunks/index.2f96e2ff.js";import{L as Pi}from"../chunks/Loading.caa7112b.js";import{K as cc}from"../chunks/KnowledgeSelector.c39802cb.js";import{n as dc}from"../chunks/index.ef842e88.js";import{S as vc}from"../chunks/constants.e061f144.js";import{s as pc}from"../chunks/index.591d5cc8.js";import{a as ul,f as fl}from"../chunks/index.605d611e.js";import{g as mc}from"../chunks/index.81d43122.js";function gc(e){return Cf(null,e)}var Ts={isDimensionStacked:Lf,enableDataStack:Mf,getStackedDimension:Df};function ws(e,t){var r=t;t instanceof Qi||(r=new Qi(t));var i=Nf(r);return i.setExtent(e[0],e[1]),If(i,r),i}function _c(e){Pf(e,Rf)}function To(e,t){return t=t||{},Bn(e,null,null,t.state!=="normal")}function yc(e){var t=Wt.extend(e);return Wt.registerClass(t),t}function xc(e){var t=Xt.extend(e);return Xt.registerClass(t),t}function cl(e,t,r){const i=e.slice();return i[15]=t[r],i}function dl(e){let t,r=ri(e[0]),i=[];for(let n=0;n<r.length;n+=1)i[n]=vl(cl(e,r,n));return{c(){for(let n=0;n<i.length;n+=1)i[n].c();t=_r()},l(n){for(let a=0;a<i.length;a+=1)i[a].l(n);t=_r()},m(n,a){for(let o=0;o<i.length;o+=1)i[o]&&i[o].m(n,a);Oe(n,t,a)},p(n,a){if(a&75){r=ri(n[0]);let o;for(o=0;o<r.length;o+=1){const s=cl(n,r,o);i[o]?i[o].p(s,a):(i[o]=vl(s),i[o].c(),i[o].m(t.parentNode,t))}for(;o<i.length;o+=1)i[o].d(1);i.length=r.length}},d(n){n&&U(t),Qa(i,n)}}}function vl(e){let t,r=e[15]+"",i,n,a,o,s;function l(){return e[10](e[15])}return{c(){t=X("button"),i=pr(r),n=he(),this.h()},l(h){t=j(h,"BUTTON",{class:!0});var u=ee(t);i=mr(u,r),n=ue(u),u.forEach(U),this.h()},h(){B(t,"class",a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[15]?"bg-blue-600 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))},m(h,u){Oe(h,t,u),R(t,i),R(t,n),o||(s=Rt(t,"click",l),o=!0)},p(h,u){e=h,u&1&&r!==(r=e[15]+"")&&Lr(i,r),u&3&&a!==(a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[15]?"bg-blue-600 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))&&B(t,"class",a)},d(h){h&&U(t),o=!1,s()}}}function Tc(e){let t,r,i=`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        用户使用次数排名`,n,a,o,s,l,h,u,f,d,c=!e[4]&&dl(e);return l=new Pi({props:{isLoading:e[4]}}),{c(){t=X("div"),r=X("h2"),r.innerHTML=i,n=he(),a=X("div"),c&&c.c(),o=he(),s=X("div"),it(l.$$.fragment),h=he(),u=X("div"),this.h()},l(v){t=j(v,"DIV",{class:!0});var p=ee(t);r=j(p,"H2",{class:!0,"data-svelte-h":!0}),tt(r)!=="svelte-6egk63"&&(r.innerHTML=i),n=ue(p),a=j(p,"DIV",{class:!0});var g=ee(a);c&&c.l(g),g.forEach(U),p.forEach(U),o=ue(v),s=j(v,"DIV",{class:!0});var m=ee(s);nt(l.$$.fragment,m),h=ue(m),u=j(m,"DIV",{class:!0}),ee(u).forEach(U),m.forEach(U),this.h()},h(){B(r,"class","text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center"),B(a,"class","flex space-x-2"),B(t,"class","flex justify-between items-center mb-4"),B(u,"class",f="min-h-80 w-full "+(e[2]?"h-[80vh]":"h-[30vh]")),B(s,"class","relative")},m(v,p){Oe(v,t,p),R(t,r),R(t,n),R(t,a),c&&c.m(a,null),Oe(v,o,p),Oe(v,s,p),at(l,s,null),R(s,h),R(s,u),e[11](u),d=!0},p(v,[p]){v[4]?c&&(c.d(1),c=null):c?c.p(v,p):(c=dl(v),c.c(),c.m(a,null));const g={};p&16&&(g.isLoading=v[4]),l.$set(g),(!d||p&4&&f!==(f="min-h-80 w-full "+(v[2]?"h-[80vh]":"h-[30vh]")))&&B(u,"class",f)},i(v){d||(Xe(l.$$.fragment,v),d=!0)},o(v){je(l.$$.fragment,v),d=!1},d(v){v&&(U(t),U(o),U(s)),c&&c.d(),ot(l),e[11](null)}}}const wc="#e2e8f0",bc="rgba(255, 255, 255, 0.2)";function wo(){return document.documentElement.classList.contains("dark")}function Sc(e,t,r){let{isModal:i=!1}=t,{chartsData:n}=t,{days:a=[]}=t,{selectedDay:o=""}=t,{onDayChange:s=()=>{}}=t,l=!0,h,u=null,f=!1;function d(){!f||!n||!a||!o||!u||(h&&h.dispose(),r(8,h=Di(u)),c(),r(4,l=!1))}function c(){if(!h)return;let _=n[o];(!_||_.length===0)&&(_=[{name:"用户",count:0}]);const x=[..._].sort((w,E)=>w.count-E.count),y=wo()?wc:"#1e293b";wo();const T={color:["#188df0"],backgroundColor:"transparent",tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",top:"3%",containLabel:!0},yAxis:[{type:"category",data:x.map(w=>w.name),axisTick:{alignWithLabel:!0},axisLabel:{color:y,fontWeight:"bold"}}],xAxis:[{type:"value",minInterval:1,axisLine:{lineStyle:{color:y}},splitLine:{lineStyle:{color:wo()?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.05)"}}}],series:[{name:"使用次数",type:"bar",barWidth:"60%",data:x.map(w=>w.count),itemStyle:{color:new ys(1,0,0,0,[{offset:0,color:"#83bff6"},{offset:.5,color:"#188df0"},{offset:1,color:"#1864ab"}]),borderRadius:[0,4,4,0]},label:{show:!0,position:"right",formatter:"{c}",fontWeight:"bold",color:y}}]};h.setOption(T)}function v(){c()}function p(){h==null||h.resize()}ai(()=>{r(9,f=!0),n&&d();const _=window.matchMedia("(prefers-color-scheme: dark)");_.addEventListener("change",v);const x=new MutationObserver(v);return x.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",p),()=>{_.removeEventListener("change",v),x.disconnect(),window.removeEventListener("resize",p)}}),Yn(()=>{h&&(h.dispose(),r(8,h=void 0)),r(9,f=!1)});const g=_=>{r(1,o=_),c(),s(_)};function m(_){oi[_?"unshift":"push"](()=>{u=_,r(5,u)})}return e.$$set=_=>{"isModal"in _&&r(2,i=_.isModal),"chartsData"in _&&r(7,n=_.chartsData),"days"in _&&r(0,a=_.days),"selectedDay"in _&&r(1,o=_.selectedDay),"onDayChange"in _&&r(3,s=_.onDayChange)},e.$$.update=()=>{e.$$.dirty&643&&n&&(r(0,a=Object.keys(n)),a.includes(o)||r(1,o=a[0]||""),f&&d()),e.$$.dirty&386&&h&&o&&n&&c()},[a,o,i,s,l,u,c,n,h,f,g,m]}class Qh extends Rr{constructor(t){super(),Nr(this,t,Sc,Tc,Pr,{isModal:2,chartsData:7,days:0,selectedDay:1,onDayChange:3})}}function pl(e,t,r){const i=e.slice();return i[15]=t[r],i}function ml(e){let t,r=ri(e[0]),i=[];for(let n=0;n<r.length;n+=1)i[n]=gl(pl(e,r,n));return{c(){for(let n=0;n<i.length;n+=1)i[n].c();t=_r()},l(n){for(let a=0;a<i.length;a+=1)i[a].l(n);t=_r()},m(n,a){for(let o=0;o<i.length;o+=1)i[o]&&i[o].m(n,a);Oe(n,t,a)},p(n,a){if(a&19){r=ri(n[0]);let o;for(o=0;o<r.length;o+=1){const s=pl(n,r,o);i[o]?i[o].p(s,a):(i[o]=gl(s),i[o].c(),i[o].m(t.parentNode,t))}for(;o<i.length;o+=1)i[o].d(1);i.length=r.length}},d(n){n&&U(t),Qa(i,n)}}}function gl(e){let t,r=e[15]+"",i,n,a,o,s;function l(){return e[9](e[15])}return{c(){t=X("button"),i=pr(r),n=he(),this.h()},l(h){t=j(h,"BUTTON",{class:!0});var u=ee(t);i=mr(u,r),n=ue(u),u.forEach(U),this.h()},h(){B(t,"class",a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[15]?"bg-indigo-600 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))},m(h,u){Oe(h,t,u),R(t,i),R(t,n),o||(s=Rt(t,"click",l),o=!0)},p(h,u){e=h,u&1&&r!==(r=e[15]+"")&&Lr(i,r),u&3&&a!==(a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[15]?"bg-indigo-600 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))&&B(t,"class",a)},d(h){h&&U(t),o=!1,s()}}}function Ec(e){let t,r,i=`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
        问答次数趋势`,n,a,o,s,l,h,u,f,d,c=!e[2]&&e[0].length>0&&ml(e);return l=new Pi({props:{isLoading:e[2]}}),{c(){t=X("div"),r=X("h2"),r.innerHTML=i,n=he(),a=X("div"),c&&c.c(),o=he(),s=X("div"),it(l.$$.fragment),h=he(),u=X("div"),this.h()},l(v){t=j(v,"DIV",{class:!0});var p=ee(t);r=j(p,"H2",{class:!0,"data-svelte-h":!0}),tt(r)!=="svelte-1j2fhy9"&&(r.innerHTML=i),n=ue(p),a=j(p,"DIV",{class:!0});var g=ee(a);c&&c.l(g),g.forEach(U),p.forEach(U),o=ue(v),s=j(v,"DIV",{class:!0});var m=ee(s);nt(l.$$.fragment,m),h=ue(m),u=j(m,"DIV",{class:!0}),ee(u).forEach(U),m.forEach(U),this.h()},h(){B(r,"class","text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center"),B(a,"class","flex space-x-2"),B(t,"class","flex justify-between items-center mb-4"),B(u,"class",f="min-h-80 w-full "+(e[3]?"h-[80vh]":"h-[30vh]")),B(s,"class","relative")},m(v,p){Oe(v,t,p),R(t,r),R(t,n),R(t,a),c&&c.m(a,null),Oe(v,o,p),Oe(v,s,p),at(l,s,null),R(s,h),R(s,u),e[10](u),d=!0},p(v,[p]){!v[2]&&v[0].length>0?c?c.p(v,p):(c=ml(v),c.c(),c.m(a,null)):c&&(c.d(1),c=null);const g={};p&4&&(g.isLoading=v[2]),l.$set(g),(!d||p&8&&f!==(f="min-h-80 w-full "+(v[3]?"h-[80vh]":"h-[30vh]")))&&B(u,"class",f)},i(v){d||(Xe(l.$$.fragment,v),d=!0)},o(v){je(l.$$.fragment,v),d=!1},d(v){v&&(U(t),U(o),U(s)),c&&c.d(),ot(l),e[10](null)}}}const Ac="#e2e8f0",Cc="rgba(255, 255, 255, 0.2)";function bo(){var e,t;return((t=(e=document==null?void 0:document.documentElement)==null?void 0:e.classList)==null?void 0:t.contains("dark"))||!1}function Lc(e,t,r){let{isModal:i=!1}=t,{isLoading:n=!1}=t,{chartsData:a}=t,{days:o=[]}=t,{selectedDay:s=""}=t,{onDayChange:l=()=>{}}=t,h,u,f=!1;async function d(){if(f){if(await Ki(),!u){console.error("DOM容器不存在");return}h==null||h.dispose(),r(7,h=Di(u)),c()}}function c(){if(!h||!a||!s)return;const _=a[s];if(!_)return;const x=bo()?Ac:"#1e293b",y=bo()?Cc:"rgba(0, 0, 0, 0.2)",T={color:["#3a4de9"],backgroundColor:"transparent",tooltip:{trigger:"axis"},xAxis:{type:"category",data:_.dates,axisLabel:{color:x},axisLine:{lineStyle:{color:y}}},yAxis:{type:"value",minInterval:1,axisLabel:{color:x},axisLine:{lineStyle:{color:y}},splitLine:{lineStyle:{color:bo()?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.05)"}}},series:[{data:_.counts,type:"line",smooth:!0,areaStyle:{color:new ys(0,0,0,1,[{offset:0,color:"rgba(58, 77, 233, 0.8)"},{offset:1,color:"rgba(58, 77, 233, 0.1)"}])},itemStyle:{color:"#3a4de9"},lineStyle:{width:2}}]};h.setOption(T,!0),r(2,n=!1)}function v(){h==null||h.resize()}function p(){c()}ai(()=>{r(8,f=!0),a&&(r(0,o=Object.keys(a)),o.length>0&&(r(1,s=o[0]),d()));const _=window.matchMedia("(prefers-color-scheme: dark)");_.addEventListener("change",p);const x=new MutationObserver(p);return x.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",v),()=>{r(8,f=!1),_.removeEventListener("change",p),x.disconnect(),window.removeEventListener("resize",v),h==null||h.dispose()}});const g=_=>{r(1,s=_),l(_)};function m(_){oi[_?"unshift":"push"](()=>{u=_,r(5,u)})}return e.$$set=_=>{"isModal"in _&&r(3,i=_.isModal),"isLoading"in _&&r(2,n=_.isLoading),"chartsData"in _&&r(6,a=_.chartsData),"days"in _&&r(0,o=_.days),"selectedDay"in _&&r(1,s=_.selectedDay),"onDayChange"in _&&r(4,l=_.onDayChange)},e.$$.update=()=>{e.$$.dirty&323&&a&&f&&(r(0,o=Object.keys(a)),o.length>0&&!s&&r(1,s=o[0]),d()),e.$$.dirty&386&&s&&h&&f&&c()},[o,s,n,i,l,u,a,h,f,g,m]}class Jh extends Rr{constructor(t){super(),Nr(this,t,Lc,Ec,Pr,{isModal:3,isLoading:2,chartsData:6,days:0,selectedDay:1,onDayChange:4})}}Ct([Of,Bf]);Ct(Ff);function _l(e,t,r){typeof t=="object"&&(r=t,t=null);var i=this,n;if(!(e instanceof Function)){n=[];for(var a in e)e.hasOwnProperty(a)&&n.push(a)}var o=function(l){if(i.apply(this,arguments),e instanceof Function?yl(this,e.call(this,l)):Mc(this,e,n),this.constructor===o)for(var h=o.__initializers__,u=0;u<h.length;u++)h[u].apply(this,arguments)};o.__super__=i,i.__initializers__?o.__initializers__=i.__initializers__.slice():o.__initializers__=[],t&&o.__initializers__.push(t);var s=function(){};return s.prototype=i.prototype,o.prototype=new s,o.prototype.constructor=o,yl(o.prototype,r),o.extend=i.extend,o.derive=i.extend,o}function yl(e,t){if(t)for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}function Mc(e,t,r){for(var i=0;i<r.length;i++){var n=r[i];e[n]=t[n]}}const Dc={extend:_l,derive:_l};function Pc(e,t){this.action=e,this.context=t}var Rc={trigger:function(e){if(this.hasOwnProperty("__handlers__")&&this.__handlers__.hasOwnProperty(e)){var t=this.__handlers__[e],r=t.length,i=-1,n=arguments;switch(n.length){case 1:for(;++i<r;)t[i].action.call(t[i].context);return;case 2:for(;++i<r;)t[i].action.call(t[i].context,n[1]);return;case 3:for(;++i<r;)t[i].action.call(t[i].context,n[1],n[2]);return;case 4:for(;++i<r;)t[i].action.call(t[i].context,n[1],n[2],n[3]);return;case 5:for(;++i<r;)t[i].action.call(t[i].context,n[1],n[2],n[3],n[4]);return;default:for(;++i<r;)t[i].action.apply(t[i].context,Array.prototype.slice.call(n,1));return}}},on:function(e,t,r){if(!(!e||!t)){var i=this.__handlers__||(this.__handlers__={});if(!i[e])i[e]=[];else if(this.has(e,t))return;var n=new Pc(t,r||this);return i[e].push(n),this}},once:function(e,t,r){if(!e||!t)return;var i=this;function n(){i.off(e,n),t.apply(this,arguments)}return this.on(e,n,r)},before:function(e,t,r){if(!(!e||!t))return e="before"+e,this.on(e,t,r)},after:function(e,t,r){if(!(!e||!t))return e="after"+e,this.on(e,t,r)},success:function(e,t){return this.once("success",e,t)},error:function(e,t){return this.once("error",e,t)},off:function(e,t){var r=this.__handlers__||(this.__handlers__={});if(!t){r[e]=[];return}if(r[e]){for(var i=r[e],n=[],a=0;a<i.length;a++)t&&i[a].action!==t&&n.push(i[a]);r[e]=n}return this},has:function(e,t){var r=this.__handlers__;if(!r||!r[e])return!1;for(var i=r[e],n=0;n<i.length;n++)if(i[n].action===t)return!0}};const bs=Rc;var Nc=0,Ic=Array.prototype,Oc=Ic.forEach,Mn={genGUID:function(){return++Nc},relative2absolute:function(e,t){if(!t||e.match(/^\//))return e;for(var r=e.split("/"),i=t.split("/"),n=r[0];n==="."||n==="..";)n===".."&&i.pop(),r.shift(),n=r[0];return i.join("/")+"/"+r.join("/")},extend:function(e,t){if(t)for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e},defaults:function(e,t){if(t)for(var r in t)e[r]===void 0&&(e[r]=t[r]);return e},extendWithPropList:function(e,t,r){if(t)for(var i=0;i<r.length;i++){var n=r[i];e[n]=t[n]}return e},defaultsWithPropList:function(e,t,r){if(t)for(var i=0;i<r.length;i++){var n=r[i];e[n]==null&&(e[n]=t[n])}return e},each:function(e,t,r){if(e&&t)if(e.forEach&&e.forEach===Oc)e.forEach(t,r);else if(e.length===+e.length)for(var i=0,n=e.length;i<n;i++)t.call(r,e[i],i,e);else for(var a in e)e.hasOwnProperty(a)&&t.call(r,e[a],a,e)},isObject:function(e){return e===Object(e)},isArray:function(e){return Array.isArray(e)},isArrayLike:function(e){return e?e.length===+e.length:!1},clone:function(e){if(Mn.isObject(e)){if(Mn.isArray(e))return e.slice();if(Mn.isArrayLike(e)){for(var t=new e.constructor(e.length),r=0;r<e.length;r++)t[r]=e[r];return t}else return Mn.extend({},e)}else return e}};const Et=Mn;var eo=function(){this.__uid__=Et.genGUID()};eo.__initializers__=[function(e){Et.extend(this,e)}];Et.extend(eo,Dc);Et.extend(eo.prototype,bs);const Bt=eo;var xl=["OES_texture_float","OES_texture_half_float","OES_texture_float_linear","OES_texture_half_float_linear","OES_standard_derivatives","OES_vertex_array_object","OES_element_index_uint","WEBGL_compressed_texture_s3tc","WEBGL_depth_texture","EXT_texture_filter_anisotropic","EXT_shader_texture_lod","WEBGL_draw_buffers","EXT_frag_depth","EXT_sRGB","ANGLE_instanced_arrays"],Tl=["MAX_TEXTURE_SIZE","MAX_CUBE_MAP_TEXTURE_SIZE"];function Bc(e){for(var t={},r={},i=0;i<xl.length;i++){var n=xl[i];o(n)}for(var i=0;i<Tl.length;i++){var a=Tl[i];r[a]=e.getParameter(e[a])}this.getExtension=function(s){return s in t||o(s),t[s]},this.getParameter=function(s){return r[s]};function o(s){if(e.getExtension){var l=e.getExtension(s);l||(l=e.getExtension("MOZ_"+s)),l||(l=e.getExtension("WEBKIT_"+s)),t[s]=l}}}const I={DEPTH_BUFFER_BIT:256,STENCIL_BUFFER_BIT:1024,COLOR_BUFFER_BIT:16384,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,ZERO:0,ONE:1,SRC_COLOR:768,ONE_MINUS_SRC_COLOR:769,SRC_ALPHA:770,ONE_MINUS_SRC_ALPHA:771,DST_ALPHA:772,ONE_MINUS_DST_ALPHA:773,DST_COLOR:774,ONE_MINUS_DST_COLOR:775,SRC_ALPHA_SATURATE:776,FUNC_ADD:32774,BLEND_EQUATION:32777,BLEND_EQUATION_RGB:32777,BLEND_EQUATION_ALPHA:34877,FUNC_SUBTRACT:32778,FUNC_REVERSE_SUBTRACT:32779,BLEND_DST_RGB:32968,BLEND_SRC_RGB:32969,BLEND_DST_ALPHA:32970,BLEND_SRC_ALPHA:32971,CONSTANT_COLOR:32769,ONE_MINUS_CONSTANT_COLOR:32770,CONSTANT_ALPHA:32771,ONE_MINUS_CONSTANT_ALPHA:32772,BLEND_COLOR:32773,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,ARRAY_BUFFER_BINDING:34964,ELEMENT_ARRAY_BUFFER_BINDING:34965,STREAM_DRAW:35040,STATIC_DRAW:35044,DYNAMIC_DRAW:35048,BUFFER_SIZE:34660,BUFFER_USAGE:34661,CURRENT_VERTEX_ATTRIB:34342,FRONT:1028,BACK:1029,FRONT_AND_BACK:1032,CULL_FACE:2884,BLEND:3042,DITHER:3024,STENCIL_TEST:2960,DEPTH_TEST:2929,SCISSOR_TEST:3089,POLYGON_OFFSET_FILL:32823,SAMPLE_ALPHA_TO_COVERAGE:32926,SAMPLE_COVERAGE:32928,NO_ERROR:0,INVALID_ENUM:1280,INVALID_VALUE:1281,INVALID_OPERATION:1282,OUT_OF_MEMORY:1285,CW:2304,CCW:2305,LINE_WIDTH:2849,ALIASED_POINT_SIZE_RANGE:33901,ALIASED_LINE_WIDTH_RANGE:33902,CULL_FACE_MODE:2885,FRONT_FACE:2886,DEPTH_RANGE:2928,DEPTH_WRITEMASK:2930,DEPTH_CLEAR_VALUE:2931,DEPTH_FUNC:2932,STENCIL_CLEAR_VALUE:2961,STENCIL_FUNC:2962,STENCIL_FAIL:2964,STENCIL_PASS_DEPTH_FAIL:2965,STENCIL_PASS_DEPTH_PASS:2966,STENCIL_REF:2967,STENCIL_VALUE_MASK:2963,STENCIL_WRITEMASK:2968,STENCIL_BACK_FUNC:34816,STENCIL_BACK_FAIL:34817,STENCIL_BACK_PASS_DEPTH_FAIL:34818,STENCIL_BACK_PASS_DEPTH_PASS:34819,STENCIL_BACK_REF:36003,STENCIL_BACK_VALUE_MASK:36004,STENCIL_BACK_WRITEMASK:36005,VIEWPORT:2978,SCISSOR_BOX:3088,COLOR_CLEAR_VALUE:3106,COLOR_WRITEMASK:3107,UNPACK_ALIGNMENT:3317,PACK_ALIGNMENT:3333,MAX_TEXTURE_SIZE:3379,MAX_VIEWPORT_DIMS:3386,SUBPIXEL_BITS:3408,RED_BITS:3410,GREEN_BITS:3411,BLUE_BITS:3412,ALPHA_BITS:3413,DEPTH_BITS:3414,STENCIL_BITS:3415,POLYGON_OFFSET_UNITS:10752,POLYGON_OFFSET_FACTOR:32824,TEXTURE_BINDING_2D:32873,SAMPLE_BUFFERS:32936,SAMPLES:32937,SAMPLE_COVERAGE_VALUE:32938,SAMPLE_COVERAGE_INVERT:32939,COMPRESSED_TEXTURE_FORMATS:34467,DONT_CARE:4352,FASTEST:4353,NICEST:4354,GENERATE_MIPMAP_HINT:33170,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,DEPTH_COMPONENT:6402,ALPHA:6406,RGB:6407,RGBA:6408,LUMINANCE:6409,LUMINANCE_ALPHA:6410,UNSIGNED_SHORT_4_4_4_4:32819,UNSIGNED_SHORT_5_5_5_1:32820,UNSIGNED_SHORT_5_6_5:33635,FRAGMENT_SHADER:35632,VERTEX_SHADER:35633,MAX_VERTEX_ATTRIBS:34921,MAX_VERTEX_UNIFORM_VECTORS:36347,MAX_VARYING_VECTORS:36348,MAX_COMBINED_TEXTURE_IMAGE_UNITS:35661,MAX_VERTEX_TEXTURE_IMAGE_UNITS:35660,MAX_TEXTURE_IMAGE_UNITS:34930,MAX_FRAGMENT_UNIFORM_VECTORS:36349,SHADER_TYPE:35663,DELETE_STATUS:35712,LINK_STATUS:35714,VALIDATE_STATUS:35715,ATTACHED_SHADERS:35717,ACTIVE_UNIFORMS:35718,ACTIVE_ATTRIBUTES:35721,SHADING_LANGUAGE_VERSION:35724,CURRENT_PROGRAM:35725,NEVER:512,LESS:513,EQUAL:514,LEQUAL:515,GREATER:516,NOTEQUAL:517,GEQUAL:518,ALWAYS:519,KEEP:7680,REPLACE:7681,INCR:7682,DECR:7683,INVERT:5386,INCR_WRAP:34055,DECR_WRAP:34056,VENDOR:7936,RENDERER:7937,VERSION:7938,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,TEXTURE_MAG_FILTER:10240,TEXTURE_MIN_FILTER:10241,TEXTURE_WRAP_S:10242,TEXTURE_WRAP_T:10243,TEXTURE_2D:3553,TEXTURE:5890,TEXTURE_CUBE_MAP:34067,TEXTURE_BINDING_CUBE_MAP:34068,TEXTURE_CUBE_MAP_POSITIVE_X:34069,TEXTURE_CUBE_MAP_NEGATIVE_X:34070,TEXTURE_CUBE_MAP_POSITIVE_Y:34071,TEXTURE_CUBE_MAP_NEGATIVE_Y:34072,TEXTURE_CUBE_MAP_POSITIVE_Z:34073,TEXTURE_CUBE_MAP_NEGATIVE_Z:34074,MAX_CUBE_MAP_TEXTURE_SIZE:34076,TEXTURE0:33984,TEXTURE1:33985,TEXTURE2:33986,TEXTURE3:33987,TEXTURE4:33988,TEXTURE5:33989,TEXTURE6:33990,TEXTURE7:33991,TEXTURE8:33992,TEXTURE9:33993,TEXTURE10:33994,TEXTURE11:33995,TEXTURE12:33996,TEXTURE13:33997,TEXTURE14:33998,TEXTURE15:33999,TEXTURE16:34e3,TEXTURE17:34001,TEXTURE18:34002,TEXTURE19:34003,TEXTURE20:34004,TEXTURE21:34005,TEXTURE22:34006,TEXTURE23:34007,TEXTURE24:34008,TEXTURE25:34009,TEXTURE26:34010,TEXTURE27:34011,TEXTURE28:34012,TEXTURE29:34013,TEXTURE30:34014,TEXTURE31:34015,ACTIVE_TEXTURE:34016,REPEAT:10497,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,INT_VEC2:35667,INT_VEC3:35668,INT_VEC4:35669,BOOL:35670,BOOL_VEC2:35671,BOOL_VEC3:35672,BOOL_VEC4:35673,FLOAT_MAT2:35674,FLOAT_MAT3:35675,FLOAT_MAT4:35676,SAMPLER_2D:35678,SAMPLER_CUBE:35680,VERTEX_ATTRIB_ARRAY_ENABLED:34338,VERTEX_ATTRIB_ARRAY_SIZE:34339,VERTEX_ATTRIB_ARRAY_STRIDE:34340,VERTEX_ATTRIB_ARRAY_TYPE:34341,VERTEX_ATTRIB_ARRAY_NORMALIZED:34922,VERTEX_ATTRIB_ARRAY_POINTER:34373,VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:34975,COMPILE_STATUS:35713,LOW_FLOAT:36336,MEDIUM_FLOAT:36337,HIGH_FLOAT:36338,LOW_INT:36339,MEDIUM_INT:36340,HIGH_INT:36341,FRAMEBUFFER:36160,RENDERBUFFER:36161,RGBA4:32854,RGB5_A1:32855,RGB565:36194,DEPTH_COMPONENT16:33189,STENCIL_INDEX:6401,STENCIL_INDEX8:36168,DEPTH_STENCIL:34041,RENDERBUFFER_WIDTH:36162,RENDERBUFFER_HEIGHT:36163,RENDERBUFFER_INTERNAL_FORMAT:36164,RENDERBUFFER_RED_SIZE:36176,RENDERBUFFER_GREEN_SIZE:36177,RENDERBUFFER_BLUE_SIZE:36178,RENDERBUFFER_ALPHA_SIZE:36179,RENDERBUFFER_DEPTH_SIZE:36180,RENDERBUFFER_STENCIL_SIZE:36181,FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE:36048,FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:36049,FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL:36050,FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE:36051,COLOR_ATTACHMENT0:36064,DEPTH_ATTACHMENT:36096,STENCIL_ATTACHMENT:36128,DEPTH_STENCIL_ATTACHMENT:33306,NONE:0,FRAMEBUFFER_COMPLETE:36053,FRAMEBUFFER_INCOMPLETE_ATTACHMENT:36054,FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:36055,FRAMEBUFFER_INCOMPLETE_DIMENSIONS:36057,FRAMEBUFFER_UNSUPPORTED:36061,FRAMEBUFFER_BINDING:36006,RENDERBUFFER_BINDING:36007,MAX_RENDERBUFFER_SIZE:34024,INVALID_FRAMEBUFFER_OPERATION:1286,UNPACK_FLIP_Y_WEBGL:37440,UNPACK_PREMULTIPLY_ALPHA_WEBGL:37441,CONTEXT_LOST_WEBGL:37442,UNPACK_COLORSPACE_CONVERSION_WEBGL:37443,BROWSER_DEFAULT_WEBGL:37444};function Fc(e){var t=new XMLHttpRequest;t.open("get",e.url),t.responseType=e.responseType||"text",e.onprogress&&(t.onprogress=function(r){if(r.lengthComputable){var i=r.loaded/r.total;e.onprogress(i,r.loaded,r.total)}else e.onprogress(null)}),t.onload=function(r){t.status>=400?e.onerror&&e.onerror():e.onload&&e.onload(t.response)},e.onerror&&(t.onerror=e.onerror),t.send(null)}const Uc={get:Fc};var So,Ft={};Ft.supportWebGL=function(){if(So==null)try{var e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)throw new Error}catch{So=!1}return So};Ft.Int8Array=typeof Int8Array>"u"?Array:Int8Array;Ft.Uint8Array=typeof Uint8Array>"u"?Array:Uint8Array;Ft.Uint16Array=typeof Uint16Array>"u"?Array:Uint16Array;Ft.Uint32Array=typeof Uint32Array>"u"?Array:Uint32Array;Ft.Int16Array=typeof Int16Array>"u"?Array:Int16Array;Ft.Float32Array=typeof Float32Array>"u"?Array:Float32Array;Ft.Float64Array=typeof Float64Array>"u"?Array:Float64Array;var Ti={};typeof window<"u"?Ti=window:typeof global<"u"&&(Ti=global);Ft.requestAnimationFrame=Ti.requestAnimationFrame||Ti.msRequestAnimationFrame||Ti.mozRequestAnimationFrame||Ti.webkitRequestAnimationFrame||function(e){setTimeout(e,16)};Ft.createCanvas=function(){return document.createElement("canvas")};Ft.createImage=function(){return new Ti.Image};Ft.request={get:Uc.get};Ft.addEventListener=function(e,t,r,i){e.addEventListener(t,r,i)};Ft.removeEventListener=function(e,t,r){e.removeEventListener(t,r)};const ft=Ft;var bt=function(){this.head=null,this.tail=null,this._length=0};bt.prototype.insert=function(e){var t=new bt.Entry(e);return this.insertEntry(t),t};bt.prototype.insertAt=function(e,t){if(!(e<0)){for(var r=this.head,i=0;r&&i!=e;)r=r.next,i++;if(r){var n=new bt.Entry(t),a=r.prev;a?(a.next=n,n.prev=a):this.head=n,n.next=r,r.prev=n}else this.insert(t)}};bt.prototype.insertBeforeEntry=function(e,t){var r=new bt.Entry(e),i=t.prev;i?(i.next=r,r.prev=i):this.head=r,r.next=t,t.prev=r,this._length++};bt.prototype.insertEntry=function(e){this.head?(this.tail.next=e,e.prev=this.tail,this.tail=e):this.head=this.tail=e,this._length++};bt.prototype.remove=function(e){var t=e.prev,r=e.next;t?t.next=r:this.head=r,r?r.prev=t:this.tail=t,e.next=e.prev=null,this._length--};bt.prototype.removeAt=function(e){if(!(e<0)){for(var t=this.head,r=0;t&&r!=e;)t=t.next,r++;if(t)return this.remove(t),t.value}};bt.prototype.getHead=function(){if(this.head)return this.head.value};bt.prototype.getTail=function(){if(this.tail)return this.tail.value};bt.prototype.getAt=function(e){if(!(e<0)){for(var t=this.head,r=0;t&&r!=e;)t=t.next,r++;return t.value}};bt.prototype.indexOf=function(e){for(var t=this.head,r=0;t;){if(t.value===e)return r;t=t.next,r++}};bt.prototype.length=function(){return this._length};bt.prototype.isEmpty=function(){return this._length===0};bt.prototype.forEach=function(e,t){for(var r=this.head,i=0,n=typeof t<"u";r;)n?e.call(t,r.value,i):e(r.value,i),r=r.next,i++};bt.prototype.clear=function(){this.tail=this.head=null,this._length=0};bt.Entry=function(e){this.value=e,this.next=null,this.prev=null};const zc=bt;var un=function(e){this._list=new zc,this._map={},this._maxSize=e||10};un.prototype.setMaxSize=function(e){this._maxSize=e};un.prototype.put=function(e,t){if(!this._map.hasOwnProperty(e)){var r=this._list.length();if(r>=this._maxSize&&r>0){var i=this._list.head;this._list.remove(i),delete this._map[i.key]}var n=this._list.insert(t);n.key=e,this._map[e]=n}};un.prototype.get=function(e){var t=this._map[e];if(this._map.hasOwnProperty(e))return t!==this._list.tail&&(this._list.remove(t),this._list.insertEntry(t)),t.value};un.prototype.remove=function(e){var t=this._map[e];typeof t<"u"&&(delete this._map[e],this._list.remove(t))};un.prototype.clear=function(){this._list.clear(),this._map={}};const eu=un;var Qe={},wl={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function hr(e){return e=Math.round(e),e<0?0:e>255?255:e}function Gc(e){return e=Math.round(e),e<0?0:e>360?360:e}function Un(e){return e<0?0:e>1?1:e}function Eo(e){return e.length&&e.charAt(e.length-1)==="%"?hr(parseFloat(e)/100*255):hr(parseInt(e,10))}function Ji(e){return e.length&&e.charAt(e.length-1)==="%"?Un(parseFloat(e)/100):Un(parseFloat(e))}function Ao(e,t,r){return r<0?r+=1:r>1&&(r-=1),r*6<1?e+(t-e)*r*6:r*2<1?t:r*3<2?e+(t-e)*(2/3-r)*6:e}function ei(e,t,r){return e+(t-e)*r}function lr(e,t,r,i,n){return e[0]=t,e[1]=r,e[2]=i,e[3]=n,e}function is(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}var tu=new eu(20),ya=null;function Fi(e,t){ya&&is(ya,t),ya=tu.put(e,ya||t.slice())}Qe.parse=function(e,t){if(e){t=t||[];var r=tu.get(e);if(r)return is(t,r);e=e+"";var i=e.replace(/ /g,"").toLowerCase();if(i in wl)return is(t,wl[i]),Fi(e,t),t;if(i.charAt(0)==="#"){if(i.length===4){var n=parseInt(i.substr(1),16);if(!(n>=0&&n<=4095)){lr(t,0,0,0,1);return}return lr(t,(n&3840)>>4|(n&3840)>>8,n&240|(n&240)>>4,n&15|(n&15)<<4,1),Fi(e,t),t}else if(i.length===7){var n=parseInt(i.substr(1),16);if(!(n>=0&&n<=16777215)){lr(t,0,0,0,1);return}return lr(t,(n&16711680)>>16,(n&65280)>>8,n&255,1),Fi(e,t),t}return}var a=i.indexOf("("),o=i.indexOf(")");if(a!==-1&&o+1===i.length){var s=i.substr(0,a),l=i.substr(a+1,o-(a+1)).split(","),h=1;switch(s){case"rgba":if(l.length!==4){lr(t,0,0,0,1);return}h=Ji(l.pop());case"rgb":if(l.length!==3){lr(t,0,0,0,1);return}return lr(t,Eo(l[0]),Eo(l[1]),Eo(l[2]),h),Fi(e,t),t;case"hsla":if(l.length!==4){lr(t,0,0,0,1);return}return l[3]=Ji(l[3]),ns(l,t),Fi(e,t),t;case"hsl":if(l.length!==3){lr(t,0,0,0,1);return}return ns(l,t),Fi(e,t),t;default:return}}lr(t,0,0,0,1)}};Qe.parseToFloat=function(e,t){if(t=Qe.parse(e,t),!!t)return t[0]/=255,t[1]/=255,t[2]/=255,t};function ns(e,t){var r=(parseFloat(e[0])%360+360)%360/360,i=Ji(e[1]),n=Ji(e[2]),a=n<=.5?n*(i+1):n+i-n*i,o=n*2-a;return t=t||[],lr(t,hr(Ao(o,a,r+1/3)*255),hr(Ao(o,a,r)*255),hr(Ao(o,a,r-1/3)*255),1),e.length===4&&(t[3]=e[3]),t}function kc(e){if(e){var t=e[0]/255,r=e[1]/255,i=e[2]/255,n=Math.min(t,r,i),a=Math.max(t,r,i),o=a-n,s=(a+n)/2,l,h;if(o===0)l=0,h=0;else{s<.5?h=o/(a+n):h=o/(2-a-n);var u=((a-t)/6+o/2)/o,f=((a-r)/6+o/2)/o,d=((a-i)/6+o/2)/o;t===a?l=d-f:r===a?l=1/3+u-d:i===a&&(l=2/3+f-u),l<0&&(l+=1),l>1&&(l-=1)}var c=[l*360,h,s];return e[3]!=null&&c.push(e[3]),c}}Qe.lift=function(e,t){var r=Qe.parse(e);if(r){for(var i=0;i<3;i++)t<0?r[i]=r[i]*(1-t)|0:r[i]=(255-r[i])*t+r[i]|0;return Qe.stringify(r,r.length===4?"rgba":"rgb")}};Qe.toHex=function(e){var t=Qe.parse(e);if(t)return((1<<24)+(t[0]<<16)+(t[1]<<8)+ +t[2]).toString(16).slice(1)};Qe.fastLerp=function(e,t,r){if(!(!(t&&t.length)||!(e>=0&&e<=1))){r=r||[];var i=e*(t.length-1),n=Math.floor(i),a=Math.ceil(i),o=t[n],s=t[a],l=i-n;return r[0]=hr(ei(o[0],s[0],l)),r[1]=hr(ei(o[1],s[1],l)),r[2]=hr(ei(o[2],s[2],l)),r[3]=Un(ei(o[3],s[3],l)),r}};Qe.fastMapToColor=Qe.fastLerp;Qe.lerp=function(e,t,r){if(!(!(t&&t.length)||!(e>=0&&e<=1))){var i=e*(t.length-1),n=Math.floor(i),a=Math.ceil(i),o=Qe.parse(t[n]),s=Qe.parse(t[a]),l=i-n,h=Qe.stringify([hr(ei(o[0],s[0],l)),hr(ei(o[1],s[1],l)),hr(ei(o[2],s[2],l)),Un(ei(o[3],s[3],l))],"rgba");return r?{color:h,leftIndex:n,rightIndex:a,value:i}:h}};Qe.mapToColor=Qe.lerp;Qe.modifyHSL=function(e,t,r,i){if(e=Qe.parse(e),e)return e=kc(e),t!=null&&(e[0]=Gc(t)),r!=null&&(e[1]=Ji(r)),i!=null&&(e[2]=Ji(i)),Qe.stringify(ns(e),"rgba")};Qe.modifyAlpha=function(e,t){if(e=Qe.parse(e),e&&t!=null)return e[3]=Un(t),Qe.stringify(e,"rgba")};Qe.stringify=function(e,t){if(!(!e||!e.length)){var r=e[0]+","+e[1]+","+e[2];return(t==="rgba"||t==="hsva"||t==="hsla")&&(r+=","+e[3]),t+"("+r+")"}};const Hc=Qe;var Vc=Hc.parseToFloat,Co={};function bl(e){var t=Object.keys(e);t.sort();for(var r=[],i=0;i<t.length;i++){var n=t[i],a=e[n];a===null?r.push(n):r.push(n+" "+a.toString())}return r.join(`
`)}function Wc(e,t,r){r.sort();for(var i=[],n=0;n<r.length;n++){var a=r[n];i.push(a)}var o=bl(e)+`
`+bl(t)+`
`+i.join(`
`);if(Co[o])return Co[o];var s=Et.genGUID();return Co[o]=s,s}var Xc=Bt.extend(function(){return{name:"",depthTest:!0,depthMask:!0,transparent:!1,blend:null,autoUpdateTextureStatus:!0,uniforms:{},vertexDefines:{},fragmentDefines:{},_textureStatus:{},_enabledUniforms:null}},function(){this.name||(this.name="MATERIAL_"+this.__uid__),this.shader&&this.attachShader(this.shader,!0)},{precision:"highp",setUniform:function(e,t){t===void 0&&console.warn('Uniform value "'+e+'" is undefined');var r=this.uniforms[e];r&&(typeof t=="string"&&(t=Vc(t)||t),r.value=t,this.autoUpdateTextureStatus&&r.type==="t"&&(t?this.enableTexture(e):this.disableTexture(e)))},setUniforms:function(e){for(var t in e){var r=e[t];this.setUniform(t,r)}},isUniformEnabled:function(e){return this._enabledUniforms.indexOf(e)>=0},getEnabledUniforms:function(){return this._enabledUniforms},getTextureUniforms:function(){return this._textureUniforms},set:function(e,t){if(typeof e=="object")for(var r in e){var i=e[r];this.setUniform(r,i)}else this.setUniform(e,t)},get:function(e){var t=this.uniforms[e];if(t)return t.value},attachShader:function(e,t){var r=this.uniforms;this.uniforms=e.createUniforms(),this.shader=e;var i=this.uniforms;this._enabledUniforms=Object.keys(i),this._enabledUniforms.sort(),this._textureUniforms=this._enabledUniforms.filter(function(h){var u=this.uniforms[h].type;return u==="t"||u==="tv"},this);var n=this.vertexDefines,a=this.fragmentDefines;if(this.vertexDefines=Et.clone(e.vertexDefines),this.fragmentDefines=Et.clone(e.fragmentDefines),t){for(var o in r)i[o]&&(i[o].value=r[o].value);Et.defaults(this.vertexDefines,n),Et.defaults(this.fragmentDefines,a)}var s={};for(var l in e.textures)s[l]={shaderType:e.textures[l].shaderType,type:e.textures[l].type,enabled:t&&this._textureStatus[l]?this._textureStatus[l].enabled:!1};this._textureStatus=s,this._programKey=""},clone:function(){var e=new this.constructor({name:this.name,shader:this.shader});for(var t in this.uniforms)e.uniforms[t].value=this.uniforms[t].value;return e.depthTest=this.depthTest,e.depthMask=this.depthMask,e.transparent=this.transparent,e.blend=this.blend,e.vertexDefines=Et.clone(this.vertexDefines),e.fragmentDefines=Et.clone(this.fragmentDefines),e.enableTexture(this.getEnabledTextures()),e.precision=this.precision,e},define:function(e,t,r){var i=this.vertexDefines,n=this.fragmentDefines;e!=="vertex"&&e!=="fragment"&&e!=="both"&&arguments.length<3&&(r=t,t=e,e="both"),r=r??null,(e==="vertex"||e==="both")&&i[t]!==r&&(i[t]=r,this._programKey=""),(e==="fragment"||e==="both")&&n[t]!==r&&(n[t]=r,e!=="both"&&(this._programKey=""))},undefine:function(e,t){e!=="vertex"&&e!=="fragment"&&e!=="both"&&arguments.length<2&&(t=e,e="both"),(e==="vertex"||e==="both")&&this.isDefined("vertex",t)&&(delete this.vertexDefines[t],this._programKey=""),(e==="fragment"||e==="both")&&this.isDefined("fragment",t)&&(delete this.fragmentDefines[t],e!=="both"&&(this._programKey=""))},isDefined:function(e,t){switch(e){case"vertex":return this.vertexDefines[t]!==void 0;case"fragment":return this.fragmentDefines[t]!==void 0}},getDefine:function(e,t){switch(e){case"vertex":return this.vertexDefines[t];case"fragment":return this.fragmentDefines[t]}},enableTexture:function(e){if(Array.isArray(e)){for(var t=0;t<e.length;t++)this.enableTexture(e[t]);return}var r=this._textureStatus[e];if(r){var i=r.enabled;i||(r.enabled=!0,this._programKey="")}},enableTexturesAll:function(){var e=this._textureStatus;for(var t in e)e[t].enabled=!0;this._programKey=""},disableTexture:function(e){if(Array.isArray(e)){for(var t=0;t<e.length;t++)this.disableTexture(e[t]);return}var r=this._textureStatus[e];if(r){var i=!r.enabled;i||(r.enabled=!1,this._programKey="")}},disableTexturesAll:function(){var e=this._textureStatus;for(var t in e)e[t].enabled=!1;this._programKey=""},isTextureEnabled:function(e){var t=this._textureStatus;return!!t[e]&&t[e].enabled},getEnabledTextures:function(){var e=[],t=this._textureStatus;for(var r in t)t[r].enabled&&e.push(r);return e},dirtyDefines:function(){this._programKey=""},getProgramKey:function(){return this._programKey||(this._programKey=Wc(this.vertexDefines,this.fragmentDefines,this.getEnabledTextures())),this._programKey}});const tr=Xc;var Na=1e-6,Lt=Array,qi=Math.random,me={};me.create=function(){var e=new Lt(2);return e[0]=0,e[1]=0,e};me.clone=function(e){var t=new Lt(2);return t[0]=e[0],t[1]=e[1],t};me.fromValues=function(e,t){var r=new Lt(2);return r[0]=e,r[1]=t,r};me.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e};me.set=function(e,t,r){return e[0]=t,e[1]=r,e};me.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e};me.subtract=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e};me.sub=me.subtract;me.multiply=function(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e};me.mul=me.multiply;me.divide=function(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e};me.div=me.divide;me.min=function(e,t,r){return e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e};me.max=function(e,t,r){return e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e};me.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e};me.scaleAndAdd=function(e,t,r,i){return e[0]=t[0]+r[0]*i,e[1]=t[1]+r[1]*i,e};me.distance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1];return Math.sqrt(r*r+i*i)};me.dist=me.distance;me.squaredDistance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1];return r*r+i*i};me.sqrDist=me.squaredDistance;me.length=function(e){var t=e[0],r=e[1];return Math.sqrt(t*t+r*r)};me.len=me.length;me.squaredLength=function(e){var t=e[0],r=e[1];return t*t+r*r};me.sqrLen=me.squaredLength;me.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e};me.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e};me.normalize=function(e,t){var r=t[0],i=t[1],n=r*r+i*i;return n>0&&(n=1/Math.sqrt(n),e[0]=t[0]*n,e[1]=t[1]*n),e};me.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]};me.cross=function(e,t,r){var i=t[0]*r[1]-t[1]*r[0];return e[0]=e[1]=0,e[2]=i,e};me.lerp=function(e,t,r,i){var n=t[0],a=t[1];return e[0]=n+i*(r[0]-n),e[1]=a+i*(r[1]-a),e};me.random=function(e,t){t=t||1;var r=GLMAT_RANDOM()*2*Math.PI;return e[0]=Math.cos(r)*t,e[1]=Math.sin(r)*t,e};me.transformMat2=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[2]*n,e[1]=r[1]*i+r[3]*n,e};me.transformMat2d=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[2]*n+r[4],e[1]=r[1]*i+r[3]*n+r[5],e};me.transformMat3=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[3]*n+r[6],e[1]=r[1]*i+r[4]*n+r[7],e};me.transformMat4=function(e,t,r){var i=t[0],n=t[1];return e[0]=r[0]*i+r[4]*n+r[12],e[1]=r[1]*i+r[5]*n+r[13],e};me.forEach=function(){var e=me.create();return function(t,r,i,n,a,o){var s,l;for(r||(r=2),i||(i=0),n?l=Math.min(n*r+i,t.length):l=t.length,s=i;s<l;s+=r)e[0]=t[s],e[1]=t[s+1],a(e,e,o),t[s]=e[0],t[s+1]=e[1];return t}}();const ae=me;var Se=function(e,t){e=e||0,t=t||0,this.array=ae.fromValues(e,t),this._dirty=!0};Se.prototype={constructor:Se,add:function(e){return ae.add(this.array,this.array,e.array),this._dirty=!0,this},set:function(e,t){return this.array[0]=e,this.array[1]=t,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this._dirty=!0,this},clone:function(){return new Se(this.x,this.y)},copy:function(e){return ae.copy(this.array,e.array),this._dirty=!0,this},cross:function(e,t){return ae.cross(e.array,this.array,t.array),e._dirty=!0,this},dist:function(e){return ae.dist(this.array,e.array)},distance:function(e){return ae.distance(this.array,e.array)},div:function(e){return ae.div(this.array,this.array,e.array),this._dirty=!0,this},divide:function(e){return ae.divide(this.array,this.array,e.array),this._dirty=!0,this},dot:function(e){return ae.dot(this.array,e.array)},len:function(){return ae.len(this.array)},length:function(){return ae.length(this.array)},lerp:function(e,t,r){return ae.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},min:function(e){return ae.min(this.array,this.array,e.array),this._dirty=!0,this},max:function(e){return ae.max(this.array,this.array,e.array),this._dirty=!0,this},mul:function(e){return ae.mul(this.array,this.array,e.array),this._dirty=!0,this},multiply:function(e){return ae.multiply(this.array,this.array,e.array),this._dirty=!0,this},negate:function(){return ae.negate(this.array,this.array),this._dirty=!0,this},normalize:function(){return ae.normalize(this.array,this.array),this._dirty=!0,this},random:function(e){return ae.random(this.array,e),this._dirty=!0,this},scale:function(e){return ae.scale(this.array,this.array,e),this._dirty=!0,this},scaleAndAdd:function(e,t){return ae.scaleAndAdd(this.array,this.array,e.array,t),this._dirty=!0,this},sqrDist:function(e){return ae.sqrDist(this.array,e.array)},squaredDistance:function(e){return ae.squaredDistance(this.array,e.array)},sqrLen:function(){return ae.sqrLen(this.array)},squaredLength:function(){return ae.squaredLength(this.array)},sub:function(e){return ae.sub(this.array,this.array,e.array),this._dirty=!0,this},subtract:function(e){return ae.subtract(this.array,this.array,e.array),this._dirty=!0,this},transformMat2:function(e){return ae.transformMat2(this.array,this.array,e.array),this._dirty=!0,this},transformMat2d:function(e){return ae.transformMat2d(this.array,this.array,e.array),this._dirty=!0,this},transformMat3:function(e){return ae.transformMat3(this.array,this.array,e.array),this._dirty=!0,this},transformMat4:function(e){return ae.transformMat4(this.array,this.array,e.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};if(Object.defineProperty){var Sl=Se.prototype;Object.defineProperty(Sl,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),Object.defineProperty(Sl,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}})}Se.add=function(e,t,r){return ae.add(e.array,t.array,r.array),e._dirty=!0,e};Se.set=function(e,t,r){return ae.set(e.array,t,r),e._dirty=!0,e};Se.copy=function(e,t){return ae.copy(e.array,t.array),e._dirty=!0,e};Se.cross=function(e,t,r){return ae.cross(e.array,t.array,r.array),e._dirty=!0,e};Se.dist=function(e,t){return ae.distance(e.array,t.array)};Se.distance=Se.dist;Se.div=function(e,t,r){return ae.divide(e.array,t.array,r.array),e._dirty=!0,e};Se.divide=Se.div;Se.dot=function(e,t){return ae.dot(e.array,t.array)};Se.len=function(e){return ae.length(e.array)};Se.lerp=function(e,t,r,i){return ae.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};Se.min=function(e,t,r){return ae.min(e.array,t.array,r.array),e._dirty=!0,e};Se.max=function(e,t,r){return ae.max(e.array,t.array,r.array),e._dirty=!0,e};Se.mul=function(e,t,r){return ae.multiply(e.array,t.array,r.array),e._dirty=!0,e};Se.multiply=Se.mul;Se.negate=function(e,t){return ae.negate(e.array,t.array),e._dirty=!0,e};Se.normalize=function(e,t){return ae.normalize(e.array,t.array),e._dirty=!0,e};Se.random=function(e,t){return ae.random(e.array,t),e._dirty=!0,e};Se.scale=function(e,t,r){return ae.scale(e.array,t.array,r),e._dirty=!0,e};Se.scaleAndAdd=function(e,t,r,i){return ae.scaleAndAdd(e.array,t.array,r.array,i),e._dirty=!0,e};Se.sqrDist=function(e,t){return ae.sqrDist(e.array,t.array)};Se.squaredDistance=Se.sqrDist;Se.sqrLen=function(e){return ae.sqrLen(e.array)};Se.squaredLength=Se.sqrLen;Se.sub=function(e,t,r){return ae.subtract(e.array,t.array,r.array),e._dirty=!0,e};Se.subtract=Se.sub;Se.transformMat2=function(e,t,r){return ae.transformMat2(e.array,t.array,r.array),e._dirty=!0,e};Se.transformMat2d=function(e,t,r){return ae.transformMat2d(e.array,t.array,r.array),e._dirty=!0,e};Se.transformMat3=function(e,t,r){return ae.transformMat3(e.array,t.array,r.array),e._dirty=!0,e};Se.transformMat4=function(e,t,r){return ae.transformMat4(e.array,t.array,r.array),e._dirty=!0,e};const Vt=Se;var El=1,Al=2,Lo=3,Cl={};function jc(e){for(var t=e.split(`
`),r=0,i=t.length;r<i;r++)t[r]=r+1+": "+t[r];return t.join(`
`)}function Ll(e,t,r){if(!e.getShaderParameter(t,e.COMPILE_STATUS))return[e.getShaderInfoLog(t),jc(r)].join(`
`)}var Ml=new ft.Float32Array(16),Zc=Bt.extend({uniformSemantics:{},attributes:{}},function(){this._locations={},this._textureSlot=0,this._program=null},{bind:function(e){this._textureSlot=0,e.gl.useProgram(this._program)},hasUniform:function(e){var t=this._locations[e];return t!=null},useTextureSlot:function(e,t,r){t&&(e.gl.activeTexture(e.gl.TEXTURE0+r),t.isRenderable()?t.bind(e):t.unbind(e))},currentTextureSlot:function(){return this._textureSlot},resetTextureSlot:function(e){this._textureSlot=e||0},takeCurrentTextureSlot:function(e,t){var r=this._textureSlot;return this.useTextureSlot(e,t,r),this._textureSlot++,r},setUniform:function(e,t,r,i){var n=this._locations,a=n[r];if(a==null)return!1;switch(t){case"m4":if(!(i instanceof Float32Array)){for(var o=0;o<i.length;o++)Ml[o]=i[o];i=Ml}e.uniformMatrix4fv(a,!1,i);break;case"2i":e.uniform2i(a,i[0],i[1]);break;case"2f":e.uniform2f(a,i[0],i[1]);break;case"3i":e.uniform3i(a,i[0],i[1],i[2]);break;case"3f":e.uniform3f(a,i[0],i[1],i[2]);break;case"4i":e.uniform4i(a,i[0],i[1],i[2],i[3]);break;case"4f":e.uniform4f(a,i[0],i[1],i[2],i[3]);break;case"1i":e.uniform1i(a,i);break;case"1f":e.uniform1f(a,i);break;case"1fv":e.uniform1fv(a,i);break;case"1iv":e.uniform1iv(a,i);break;case"2iv":e.uniform2iv(a,i);break;case"2fv":e.uniform2fv(a,i);break;case"3iv":e.uniform3iv(a,i);break;case"3fv":e.uniform3fv(a,i);break;case"4iv":e.uniform4iv(a,i);break;case"4fv":e.uniform4fv(a,i);break;case"m2":case"m2v":e.uniformMatrix2fv(a,!1,i);break;case"m3":case"m3v":e.uniformMatrix3fv(a,!1,i);break;case"m4v":if(Array.isArray(i)&&Array.isArray(i[0])){for(var s=new ft.Float32Array(i.length*16),l=0,o=0;o<i.length;o++)for(var h=i[o],u=0;u<16;u++)s[l++]=h[u];e.uniformMatrix4fv(a,!1,s)}else e.uniformMatrix4fv(a,!1,i);break}return!0},setUniformOfSemantic:function(e,t,r){var i=this.uniformSemantics[t];return i?this.setUniform(e,i.type,i.symbol,r):!1},enableAttributes:function(e,t,r){var i=e.gl,n=this._program,a=this._locations,o;r?o=r.__enabledAttributeList:o=Cl[e.__uid__],o||(r?o=r.__enabledAttributeList=[]:o=Cl[e.__uid__]=[]);for(var s=[],l=0;l<t.length;l++){var h=t[l];if(!this.attributes[h]){s[l]=-1;continue}var u=a[h];if(u==null){if(u=i.getAttribLocation(n,h),u===-1){s[l]=-1;continue}a[h]=u}s[l]=u,o[u]?o[u]=Al:o[u]=El}for(var l=0;l<o.length;l++)switch(o[l]){case El:i.enableVertexAttribArray(l),o[l]=Lo;break;case Al:o[l]=Lo;break;case Lo:i.disableVertexAttribArray(l),o[l]=0;break}return s},getAttribLocation:function(e,t){var r=this._locations,i=r[t];return i==null&&(i=e.getAttribLocation(this._program,t),r[t]=i),i},buildProgram:function(e,t,r,i){var n=e.createShader(e.VERTEX_SHADER),a=e.createProgram();e.shaderSource(n,r),e.compileShader(n);var o=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(o,i),e.compileShader(o);var s=Ll(e,n,r);if(s||(s=Ll(e,o,i),s))return s;if(e.attachShader(a,n),e.attachShader(a,o),t.attributeSemantics.POSITION)e.bindAttribLocation(a,0,t.attributeSemantics.POSITION.symbol);else{var l=Object.keys(this.attributes);e.bindAttribLocation(a,0,l[0])}if(e.linkProgram(a),e.deleteShader(n),e.deleteShader(o),this._program=a,this.vertexCode=r,this.fragmentCode=i,!e.getProgramParameter(a,e.LINK_STATUS))return`Could not link program
`+e.getProgramInfoLog(a);for(var h=0;h<t.uniforms.length;h++){var u=t.uniforms[h];this._locations[u]=e.getUniformLocation(a,u)}}});const qc=Zc;var Yc=/for\s*?\(int\s*?_idx_\s*\=\s*([\w-]+)\;\s*_idx_\s*<\s*([\w-]+);\s*_idx_\s*\+\+\s*\)\s*\{\{([\s\S]+?)(?=\}\})\}\}/g;function Dl(e,t,r){function i(o,s,l,h){var u="";isNaN(s)&&(s in t?s=t[s]:s=n[s]),isNaN(l)&&(l in t?l=t[l]:l=n[l]);for(var f=parseInt(s);f<parseInt(l);f++)u+="{"+h.replace(/float\s*\(\s*_idx_\s*\)/g,f.toFixed(1)).replace(/_idx_/g,f)+"}";return u}var n={};for(var a in r)n[a+"_COUNT"]=r[a];return e.replace(Yc,i)}function Mo(e,t,r){var i=[];if(t)for(var n in t){var a=t[n];a>0&&i.push("#define "+n.toUpperCase()+"_COUNT "+a)}if(r)for(var o=0;o<r.length;o++){var s=r[o];i.push("#define "+s.toUpperCase()+"_ENABLED")}for(var s in e){var l=e[s];l===null?i.push("#define "+s):i.push("#define "+s+" "+l.toString())}return i.join(`
`)}function Kc(e){for(var t=[],r=0;r<e.length;r++)t.push("#extension GL_"+e[r]+" : enable");return t.join(`
`)}function $c(e){return["precision",e,"float"].join(" ")+`;
`+["precision",e,"int"].join(" ")+`;
`+["precision",e,"sampler2D"].join(" ")+`;
`}function ru(e){this._renderer=e,this._cache={}}ru.prototype.getProgram=function(e,t,r){var i=this._cache,n=e.isSkinnedMesh&&e.isSkinnedMesh(),a=e.isInstancedMesh&&e.isInstancedMesh(),o="s"+t.shader.shaderID+"m"+t.getProgramKey();r&&(o+="se"+r.getProgramKey(e.lightGroup)),n&&(o+=",sk"+e.joints.length),a&&(o+=",is");var y=i[o];if(y)return y;var s=r?r.getLightsNumbers(e.lightGroup):{},l=this._renderer,h=l.gl,u=t.getEnabledTextures(),f="";if(n){var d={SKINNING:null,JOINT_COUNT:e.joints.length};e.joints.length>l.getMaxJointNumber()&&(d.USE_SKIN_MATRICES_TEXTURE=null),f+=`
`+Mo(d)+`
`}a&&(f+=`
#define INSTANCING
`);var c=f+Mo(t.vertexDefines,s,u),v=f+Mo(t.fragmentDefines,s,u),p=c+`
`+t.shader.vertex,g=["OES_standard_derivatives","EXT_shader_texture_lod"].filter(function(w){return l.getGLExtension(w)!=null});g.indexOf("EXT_shader_texture_lod")>=0&&(v+=`
#define SUPPORT_TEXTURE_LOD`),g.indexOf("OES_standard_derivatives")>=0&&(v+=`
#define SUPPORT_STANDARD_DERIVATIVES`);var m=Kc(g)+`
`+$c(t.precision)+`
`+v+`
`+t.shader.fragment,_=Dl(p,t.vertexDefines,s),x=Dl(m,t.fragmentDefines,s),y=new qc;y.uniformSemantics=t.shader.uniformSemantics,y.attributes=t.shader.attributes;var T=y.buildProgram(h,t.shader,_,x);return y.__error=T,i[o]=y,y};var Pl=/uniform\s+(bool|float|int|vec2|vec3|vec4|ivec2|ivec3|ivec4|mat2|mat3|mat4|sampler2D|samplerCube)\s+([\s\S]*?);/g,Qc=/attribute\s+(float|int|vec2|vec3|vec4)\s+([\s\S]*?);/g,Rl=/#define\s+(\w+)?(\s+[\d-.]+)?\s*;?\s*\n/g,Jc={bool:"1i",int:"1i",sampler2D:"t",samplerCube:"t",float:"1f",vec2:"2f",vec3:"3f",vec4:"4f",ivec2:"2i",ivec3:"3i",ivec4:"4i",mat2:"m2",mat3:"m3",mat4:"m4"};function Er(e){for(var t=[],r=0;r<e;r++)t[r]=0;return t}var Nl={bool:function(){return!0},int:function(){return 0},float:function(){return 0},sampler2D:function(){return null},samplerCube:function(){return null},vec2:function(){return Er(2)},vec3:function(){return Er(3)},vec4:function(){return Er(4)},ivec2:function(){return Er(2)},ivec3:function(){return Er(3)},ivec4:function(){return Er(4)},mat2:function(){return Er(4)},mat3:function(){return Er(9)},mat4:function(){return Er(16)},array:function(){return[]}},as=["POSITION","NORMAL","BINORMAL","TANGENT","TEXCOORD","TEXCOORD_0","TEXCOORD_1","COLOR","JOINT","WEIGHT"],iu=["SKIN_MATRIX","VIEWPORT_SIZE","VIEWPORT","DEVICEPIXELRATIO","WINDOW_SIZE","NEAR","FAR","TIME"],nu=["WORLD","VIEW","PROJECTION","WORLDVIEW","VIEWPROJECTION","WORLDVIEWPROJECTION","WORLDINVERSE","VIEWINVERSE","PROJECTIONINVERSE","WORLDVIEWINVERSE","VIEWPROJECTIONINVERSE","WORLDVIEWPROJECTIONINVERSE","WORLDTRANSPOSE","VIEWTRANSPOSE","PROJECTIONTRANSPOSE","WORLDVIEWTRANSPOSE","VIEWPROJECTIONTRANSPOSE","WORLDVIEWPROJECTIONTRANSPOSE","WORLDINVERSETRANSPOSE","VIEWINVERSETRANSPOSE","PROJECTIONINVERSETRANSPOSE","WORLDVIEWINVERSETRANSPOSE","VIEWPROJECTIONINVERSETRANSPOSE","WORLDVIEWPROJECTIONINVERSETRANSPOSE"],ed={vec4:4,vec3:3,vec2:2,float:1},Do={},au={};function td(e,t){var r="vertex:"+e+"fragment:"+t;if(Do[r])return Do[r];var i=Et.genGUID();return Do[r]=i,au[i]={vertex:e,fragment:t},i}function Il(e){return e.replace(/[ \t]*\/\/.*\n/g,"").replace(/[ \t]*\/\*[\s\S]*?\*\//g,"")}function Ui(){console.error("Wrong uniform/attributes syntax")}function Ol(e,t){for(var r=/[,=\(\):]/,i=t.replace(/:\s*\[\s*(.*)\s*\]/g,"="+e+"($1)").replace(/\s+/g,"").split(/(?=[,=\(\):])/g),n=[],a=0;a<i.length;a++)i[a].match(r)?n.push(i[a].charAt(0),i[a].slice(1)):n.push(i[a]);i=n;var o=0,s=1,l=2,h=3,u=4,f=5,d=o,c={},v=null,p;g(i[0]);function g(x){x||Ui();var y=x.match(/\[(.*?)\]/);p=x.replace(/\[(.*?)\]/,""),c[p]={},y&&(c[p].isArray=!0,c[p].arraySize=y[1])}for(var a=1;a<i.length;a++){var m=i[a];if(m){if(m==="="){if(d!==o&&d!==h){Ui();break}d=s;continue}else if(m===":"){d=u;continue}else if(m===","){if(d===l){if(!(v instanceof Array)){Ui();break}v.push(+i[++a])}else d=f;continue}else if(m===")"){c[p].value=new ft.Float32Array(v),v=null,d=f;continue}else if(m==="("){if(d!==l){Ui();break}if(!(v instanceof Array)){Ui();break}v.push(+i[++a]);continue}else if(m.indexOf("vec")>=0){if(d!==s&&d!==u){Ui();break}d=l,v=[];continue}else if(d===s){e==="bool"?c[p].value=m==="true":c[p].value=parseFloat(m),v=null;continue}else if(d===u){var _=m;as.indexOf(_)>=0||iu.indexOf(_)>=0||nu.indexOf(_)>=0?c[p].semantic=_:_==="ignore"||_==="unconfigurable"?c[p].ignore=!0:e==="bool"?c[p].value=_==="true":c[p].value=parseFloat(_);continue}g(m),d=o}}return c}function G(e,t){typeof e=="object"&&(t=e.fragment,e=e.vertex),e=Il(e),t=Il(t),this._shaderID=td(e,t),this._vertexCode=G.parseImport(e),this._fragmentCode=G.parseImport(t),this.attributeSemantics={},this.matrixSemantics={},this.uniformSemantics={},this.matrixSemanticKeys=[],this.uniformTemplates={},this.attributes={},this.textures={},this.vertexDefines={},this.fragmentDefines={},this._parseAttributes(),this._parseUniforms(),this._parseDefines()}G.prototype={constructor:G,createUniforms:function(){var e={};for(var t in this.uniformTemplates){var r=this.uniformTemplates[t];e[t]={type:r.type,value:r.value()}}return e},_parseImport:function(){this._vertexCode=G.parseImport(this.vertex),this._fragmentCode=G.parseImport(this.fragment)},_addSemanticUniform:function(e,t,r){if(as.indexOf(r)>=0)this.attributeSemantics[r]={symbol:e,type:t};else if(nu.indexOf(r)>=0){var i=!1,n=r;r.match(/TRANSPOSE$/)&&(i=!0,n=r.slice(0,-9)),this.matrixSemantics[r]={symbol:e,type:t,isTranspose:i,semanticNoTranspose:n}}else iu.indexOf(r)>=0&&(this.uniformSemantics[r]={symbol:e,type:t})},_addMaterialUniform:function(e,t,r,i,n,a){a[e]={type:r,value:n?Nl.array:i||Nl[t],semantic:null}},_parseUniforms:function(){var e={},t=this,r="vertex";this._uniformList=[],this._vertexCode=this._vertexCode.replace(Pl,n),r="fragment",this._fragmentCode=this._fragmentCode.replace(Pl,n),t.matrixSemanticKeys=Object.keys(this.matrixSemantics);function i(a){return a!=null?function(){return a}:null}function n(a,o,s){var l=Ol(o,s),h=[];for(var u in l){var f=l[u],d=f.semantic,c=u,v=Jc[o],p=i(l[u].value);l[u].isArray&&(c+="["+l[u].arraySize+"]",v+="v"),h.push(c),t._uniformList.push(u),f.ignore||((o==="sampler2D"||o==="samplerCube")&&(t.textures[u]={shaderType:r,type:o}),d?t._addSemanticUniform(u,v,d):t._addMaterialUniform(u,o,v,p,l[u].isArray,e))}return h.length>0?"uniform "+o+" "+h.join(",")+`;
`:""}this.uniformTemplates=e},_parseAttributes:function(){var e={},t=this;this._vertexCode=this._vertexCode.replace(Qc,r);function r(i,n,a){var o=Ol(n,a),s=ed[n]||1,l=[];for(var h in o){var u=o[h].semantic;if(e[h]={type:"float",size:s,semantic:u||null},u){if(as.indexOf(u)<0)throw new Error('Unkown semantic "'+u+'"');t.attributeSemantics[u]={symbol:h,type:n}}l.push(h)}return"attribute "+n+" "+l.join(",")+`;
`}this.attributes=e},_parseDefines:function(){var e=this,t="vertex";this._vertexCode=this._vertexCode.replace(Rl,r),t="fragment",this._fragmentCode=this._fragmentCode.replace(Rl,r);function r(i,n,a){var o=t==="vertex"?e.vertexDefines:e.fragmentDefines;return o[n]||(a==="false"?o[n]=!1:a==="true"?o[n]=!0:o[n]=a?isNaN(parseFloat(a))?a.trim():parseFloat(a):null),""}},clone:function(){var e=au[this._shaderID],t=new G(e.vertex,e.fragment);return t}};Object.defineProperty&&(Object.defineProperty(G.prototype,"shaderID",{get:function(){return this._shaderID}}),Object.defineProperty(G.prototype,"vertex",{get:function(){return this._vertexCode}}),Object.defineProperty(G.prototype,"fragment",{get:function(){return this._fragmentCode}}),Object.defineProperty(G.prototype,"uniforms",{get:function(){return this._uniformList}}));var rd=/(@import)\s*([0-9a-zA-Z_\-\.]*)/g;G.parseImport=function(e){return e=e.replace(rd,function(n,r,i){var n=G.source(i);return n?G.parseImport(n):(console.error('Shader chunk "'+i+'" not existed in library'),"")}),e};var id=/(@export)\s*([0-9a-zA-Z_\-\.]*)\s*\n([\s\S]*?)@end/g;G.import=function(e){e.replace(id,function(t,r,i,a){var a=a.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+\x24)/g,"");if(a){for(var o=i.split("."),s=G.codes,l=0,h;l<o.length-1;)h=o[l++],s[h]||(s[h]={}),s=s[h];h=o[l],s[h]=a}return a})};G.codes={};G.source=function(e){for(var t=e.split("."),r=G.codes,i=0;r&&i<t.length;){var n=t[i++];r=r[n]}return typeof r!="string"?(console.error('Shader "'+e+'" not existed in library'),""):r};const ou=`@export clay.prez.vertex
uniform mat4 WVP : WORLDVIEWPROJECTION;
attribute vec3 pos : POSITION;
attribute vec2 uv : TEXCOORD_0;
uniform vec2 uvRepeat : [1.0, 1.0];
uniform vec2 uvOffset : [0.0, 0.0];
@import clay.chunk.skinning_header
@import clay.chunk.instancing_header
varying vec2 v_Texcoord;
void main()
{
 vec4 P = vec4(pos, 1.0);
#ifdef SKINNING
 @import clay.chunk.skin_matrix
 P = skinMatrixWS * P;
#endif
#ifdef INSTANCING
 @import clay.chunk.instancing_matrix
 P = instanceMat * P;
#endif
 gl_Position = WVP * P;
 v_Texcoord = uv * uvRepeat + uvOffset;
}
@end
@export clay.prez.fragment
uniform sampler2D alphaMap;
uniform float alphaCutoff: 0.0;
varying vec2 v_Texcoord;
void main()
{
 if (alphaCutoff > 0.0) {
 if (texture2D(alphaMap, v_Texcoord).a <= alphaCutoff) {
 discard;
 }
 }
 gl_FragColor = vec4(0.0,0.0,0.0,1.0);
}
@end`;var ke={};ke.create=function(){var e=new Lt(16);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};ke.clone=function(e){var t=new Lt(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t};ke.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e};ke.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};ke.transpose=function(e,t){if(e===t){var r=t[1],i=t[2],n=t[3],a=t[6],o=t[7],s=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=r,e[6]=t[9],e[7]=t[13],e[8]=i,e[9]=a,e[11]=t[14],e[12]=n,e[13]=o,e[14]=s}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e};ke.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],h=t[7],u=t[8],f=t[9],d=t[10],c=t[11],v=t[12],p=t[13],g=t[14],m=t[15],_=r*s-i*o,x=r*l-n*o,y=r*h-a*o,T=i*l-n*s,w=i*h-a*s,E=n*h-a*l,S=u*p-f*v,D=u*g-d*v,M=u*m-c*v,C=f*g-d*p,N=f*m-c*p,O=d*m-c*g,P=_*O-x*N+y*C+T*M-w*D+E*S;return P?(P=1/P,e[0]=(s*O-l*N+h*C)*P,e[1]=(n*N-i*O-a*C)*P,e[2]=(p*E-g*w+m*T)*P,e[3]=(d*w-f*E-c*T)*P,e[4]=(l*M-o*O-h*D)*P,e[5]=(r*O-n*M+a*D)*P,e[6]=(g*y-v*E-m*x)*P,e[7]=(u*E-d*y+c*x)*P,e[8]=(o*N-s*M+h*S)*P,e[9]=(i*M-r*N-a*S)*P,e[10]=(v*w-p*y+m*_)*P,e[11]=(f*y-u*w-c*_)*P,e[12]=(s*D-o*C-l*S)*P,e[13]=(r*C-i*D+n*S)*P,e[14]=(p*x-v*T-g*_)*P,e[15]=(u*T-f*x+d*_)*P,e):null};ke.adjoint=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],h=t[7],u=t[8],f=t[9],d=t[10],c=t[11],v=t[12],p=t[13],g=t[14],m=t[15];return e[0]=s*(d*m-c*g)-f*(l*m-h*g)+p*(l*c-h*d),e[1]=-(i*(d*m-c*g)-f*(n*m-a*g)+p*(n*c-a*d)),e[2]=i*(l*m-h*g)-s*(n*m-a*g)+p*(n*h-a*l),e[3]=-(i*(l*c-h*d)-s*(n*c-a*d)+f*(n*h-a*l)),e[4]=-(o*(d*m-c*g)-u*(l*m-h*g)+v*(l*c-h*d)),e[5]=r*(d*m-c*g)-u*(n*m-a*g)+v*(n*c-a*d),e[6]=-(r*(l*m-h*g)-o*(n*m-a*g)+v*(n*h-a*l)),e[7]=r*(l*c-h*d)-o*(n*c-a*d)+u*(n*h-a*l),e[8]=o*(f*m-c*p)-u*(s*m-h*p)+v*(s*c-h*f),e[9]=-(r*(f*m-c*p)-u*(i*m-a*p)+v*(i*c-a*f)),e[10]=r*(s*m-h*p)-o*(i*m-a*p)+v*(i*h-a*s),e[11]=-(r*(s*c-h*f)-o*(i*c-a*f)+u*(i*h-a*s)),e[12]=-(o*(f*g-d*p)-u*(s*g-l*p)+v*(s*d-l*f)),e[13]=r*(f*g-d*p)-u*(i*g-n*p)+v*(i*d-n*f),e[14]=-(r*(s*g-l*p)-o*(i*g-n*p)+v*(i*l-n*s)),e[15]=r*(s*d-l*f)-o*(i*d-n*f)+u*(i*l-n*s),e};ke.determinant=function(e){var t=e[0],r=e[1],i=e[2],n=e[3],a=e[4],o=e[5],s=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],c=e[12],v=e[13],p=e[14],g=e[15],m=t*o-r*a,_=t*s-i*a,x=t*l-n*a,y=r*s-i*o,T=r*l-n*o,w=i*l-n*s,E=h*v-u*c,S=h*p-f*c,D=h*g-d*c,M=u*p-f*v,C=u*g-d*v,N=f*g-d*p;return m*N-_*C+x*M+y*D-T*S+w*E};ke.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=t[6],u=t[7],f=t[8],d=t[9],c=t[10],v=t[11],p=t[12],g=t[13],m=t[14],_=t[15],x=r[0],y=r[1],T=r[2],w=r[3];return e[0]=x*i+y*s+T*f+w*p,e[1]=x*n+y*l+T*d+w*g,e[2]=x*a+y*h+T*c+w*m,e[3]=x*o+y*u+T*v+w*_,x=r[4],y=r[5],T=r[6],w=r[7],e[4]=x*i+y*s+T*f+w*p,e[5]=x*n+y*l+T*d+w*g,e[6]=x*a+y*h+T*c+w*m,e[7]=x*o+y*u+T*v+w*_,x=r[8],y=r[9],T=r[10],w=r[11],e[8]=x*i+y*s+T*f+w*p,e[9]=x*n+y*l+T*d+w*g,e[10]=x*a+y*h+T*c+w*m,e[11]=x*o+y*u+T*v+w*_,x=r[12],y=r[13],T=r[14],w=r[15],e[12]=x*i+y*s+T*f+w*p,e[13]=x*n+y*l+T*d+w*g,e[14]=x*a+y*h+T*c+w*m,e[15]=x*o+y*u+T*v+w*_,e};ke.multiplyAffine=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[4],s=t[5],l=t[6],h=t[8],u=t[9],f=t[10],d=t[12],c=t[13],v=t[14],p=r[0],g=r[1],m=r[2];return e[0]=p*i+g*o+m*h,e[1]=p*n+g*s+m*u,e[2]=p*a+g*l+m*f,p=r[4],g=r[5],m=r[6],e[4]=p*i+g*o+m*h,e[5]=p*n+g*s+m*u,e[6]=p*a+g*l+m*f,p=r[8],g=r[9],m=r[10],e[8]=p*i+g*o+m*h,e[9]=p*n+g*s+m*u,e[10]=p*a+g*l+m*f,p=r[12],g=r[13],m=r[14],e[12]=p*i+g*o+m*h+d,e[13]=p*n+g*s+m*u+c,e[14]=p*a+g*l+m*f+v,e};ke.mul=ke.multiply;ke.mulAffine=ke.multiplyAffine;ke.translate=function(e,t,r){var i=r[0],n=r[1],a=r[2],o,s,l,h,u,f,d,c,v,p,g,m;return t===e?(e[12]=t[0]*i+t[4]*n+t[8]*a+t[12],e[13]=t[1]*i+t[5]*n+t[9]*a+t[13],e[14]=t[2]*i+t[6]*n+t[10]*a+t[14],e[15]=t[3]*i+t[7]*n+t[11]*a+t[15]):(o=t[0],s=t[1],l=t[2],h=t[3],u=t[4],f=t[5],d=t[6],c=t[7],v=t[8],p=t[9],g=t[10],m=t[11],e[0]=o,e[1]=s,e[2]=l,e[3]=h,e[4]=u,e[5]=f,e[6]=d,e[7]=c,e[8]=v,e[9]=p,e[10]=g,e[11]=m,e[12]=o*i+u*n+v*a+t[12],e[13]=s*i+f*n+p*a+t[13],e[14]=l*i+d*n+g*a+t[14],e[15]=h*i+c*n+m*a+t[15]),e};ke.scale=function(e,t,r){var i=r[0],n=r[1],a=r[2];return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*a,e[9]=t[9]*a,e[10]=t[10]*a,e[11]=t[11]*a,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e};ke.rotate=function(e,t,r,i){var n=i[0],a=i[1],o=i[2],s=Math.sqrt(n*n+a*a+o*o),l,h,u,f,d,c,v,p,g,m,_,x,y,T,w,E,S,D,M,C,N,O,P,F;return Math.abs(s)<Na?null:(s=1/s,n*=s,a*=s,o*=s,l=Math.sin(r),h=Math.cos(r),u=1-h,f=t[0],d=t[1],c=t[2],v=t[3],p=t[4],g=t[5],m=t[6],_=t[7],x=t[8],y=t[9],T=t[10],w=t[11],E=n*n*u+h,S=a*n*u+o*l,D=o*n*u-a*l,M=n*a*u-o*l,C=a*a*u+h,N=o*a*u+n*l,O=n*o*u+a*l,P=a*o*u-n*l,F=o*o*u+h,e[0]=f*E+p*S+x*D,e[1]=d*E+g*S+y*D,e[2]=c*E+m*S+T*D,e[3]=v*E+_*S+w*D,e[4]=f*M+p*C+x*N,e[5]=d*M+g*C+y*N,e[6]=c*M+m*C+T*N,e[7]=v*M+_*C+w*N,e[8]=f*O+p*P+x*F,e[9]=d*O+g*P+y*F,e[10]=c*O+m*P+T*F,e[11]=v*O+_*P+w*F,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)};ke.rotateX=function(e,t,r){var i=Math.sin(r),n=Math.cos(r),a=t[4],o=t[5],s=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=a*n+h*i,e[5]=o*n+u*i,e[6]=s*n+f*i,e[7]=l*n+d*i,e[8]=h*n-a*i,e[9]=u*n-o*i,e[10]=f*n-s*i,e[11]=d*n-l*i,e};ke.rotateY=function(e,t,r){var i=Math.sin(r),n=Math.cos(r),a=t[0],o=t[1],s=t[2],l=t[3],h=t[8],u=t[9],f=t[10],d=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*n-h*i,e[1]=o*n-u*i,e[2]=s*n-f*i,e[3]=l*n-d*i,e[8]=a*i+h*n,e[9]=o*i+u*n,e[10]=s*i+f*n,e[11]=l*i+d*n,e};ke.rotateZ=function(e,t,r){var i=Math.sin(r),n=Math.cos(r),a=t[0],o=t[1],s=t[2],l=t[3],h=t[4],u=t[5],f=t[6],d=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*n+h*i,e[1]=o*n+u*i,e[2]=s*n+f*i,e[3]=l*n+d*i,e[4]=h*n-a*i,e[5]=u*n-o*i,e[6]=f*n-s*i,e[7]=d*n-l*i,e};ke.fromRotationTranslation=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=i+i,l=n+n,h=a+a,u=i*s,f=i*l,d=i*h,c=n*l,v=n*h,p=a*h,g=o*s,m=o*l,_=o*h;return e[0]=1-(c+p),e[1]=f+_,e[2]=d-m,e[3]=0,e[4]=f-_,e[5]=1-(u+p),e[6]=v+g,e[7]=0,e[8]=d+m,e[9]=v-g,e[10]=1-(u+c),e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e};ke.fromQuat=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r+r,s=i+i,l=n+n,h=r*o,u=i*o,f=i*s,d=n*o,c=n*s,v=n*l,p=a*o,g=a*s,m=a*l;return e[0]=1-f-v,e[1]=u+m,e[2]=d-g,e[3]=0,e[4]=u-m,e[5]=1-h-v,e[6]=c+p,e[7]=0,e[8]=d+g,e[9]=c-p,e[10]=1-h-f,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};ke.frustum=function(e,t,r,i,n,a,o){var s=1/(r-t),l=1/(n-i),h=1/(a-o);return e[0]=a*2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a*2*l,e[6]=0,e[7]=0,e[8]=(r+t)*s,e[9]=(n+i)*l,e[10]=(o+a)*h,e[11]=-1,e[12]=0,e[13]=0,e[14]=o*a*2*h,e[15]=0,e};ke.perspective=function(e,t,r,i,n){var a=1/Math.tan(t/2),o=1/(i-n);return e[0]=a/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(n+i)*o,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*n*i*o,e[15]=0,e};ke.ortho=function(e,t,r,i,n,a,o){var s=1/(t-r),l=1/(i-n),h=1/(a-o);return e[0]=-2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*l,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*h,e[11]=0,e[12]=(t+r)*s,e[13]=(n+i)*l,e[14]=(o+a)*h,e[15]=1,e};ke.lookAt=function(e,t,r,i){var n,a,o,s,l,h,u,f,d,c,v=t[0],p=t[1],g=t[2],m=i[0],_=i[1],x=i[2],y=r[0],T=r[1],w=r[2];return Math.abs(v-y)<Na&&Math.abs(p-T)<Na&&Math.abs(g-w)<Na?ke.identity(e):(u=v-y,f=p-T,d=g-w,c=1/Math.sqrt(u*u+f*f+d*d),u*=c,f*=c,d*=c,n=_*d-x*f,a=x*u-m*d,o=m*f-_*u,c=Math.sqrt(n*n+a*a+o*o),c?(c=1/c,n*=c,a*=c,o*=c):(n=0,a=0,o=0),s=f*o-d*a,l=d*n-u*o,h=u*a-f*n,c=Math.sqrt(s*s+l*l+h*h),c?(c=1/c,s*=c,l*=c,h*=c):(s=0,l=0,h=0),e[0]=n,e[1]=s,e[2]=u,e[3]=0,e[4]=a,e[5]=l,e[6]=f,e[7]=0,e[8]=o,e[9]=h,e[10]=d,e[11]=0,e[12]=-(n*v+a*p+o*g),e[13]=-(s*v+l*p+h*g),e[14]=-(u*v+f*p+d*g),e[15]=1,e)};ke.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+Math.pow(e[6],2)+Math.pow(e[7],2)+Math.pow(e[8],2)+Math.pow(e[9],2)+Math.pow(e[10],2)+Math.pow(e[11],2)+Math.pow(e[12],2)+Math.pow(e[13],2)+Math.pow(e[14],2)+Math.pow(e[15],2))};const W=ke;var le={};le.create=function(){var e=new Lt(3);return e[0]=0,e[1]=0,e[2]=0,e};le.clone=function(e){var t=new Lt(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t};le.fromValues=function(e,t,r){var i=new Lt(3);return i[0]=e,i[1]=t,i[2]=r,i};le.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e};le.set=function(e,t,r,i){return e[0]=t,e[1]=r,e[2]=i,e};le.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e};le.subtract=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e};le.sub=le.subtract;le.multiply=function(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e};le.mul=le.multiply;le.divide=function(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e[2]=t[2]/r[2],e};le.div=le.divide;le.min=function(e,t,r){return e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e[2]=Math.min(t[2],r[2]),e};le.max=function(e,t,r){return e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e[2]=Math.max(t[2],r[2]),e};le.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e};le.scaleAndAdd=function(e,t,r,i){return e[0]=t[0]+r[0]*i,e[1]=t[1]+r[1]*i,e[2]=t[2]+r[2]*i,e};le.distance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2];return Math.sqrt(r*r+i*i+n*n)};le.dist=le.distance;le.squaredDistance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2];return r*r+i*i+n*n};le.sqrDist=le.squaredDistance;le.length=function(e){var t=e[0],r=e[1],i=e[2];return Math.sqrt(t*t+r*r+i*i)};le.len=le.length;le.squaredLength=function(e){var t=e[0],r=e[1],i=e[2];return t*t+r*r+i*i};le.sqrLen=le.squaredLength;le.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e};le.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e};le.normalize=function(e,t){var r=t[0],i=t[1],n=t[2],a=r*r+i*i+n*n;return a>0&&(a=1/Math.sqrt(a),e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a),e};le.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]};le.cross=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[0],s=r[1],l=r[2];return e[0]=n*l-a*s,e[1]=a*o-i*l,e[2]=i*s-n*o,e};le.lerp=function(e,t,r,i){var n=t[0],a=t[1],o=t[2];return e[0]=n+i*(r[0]-n),e[1]=a+i*(r[1]-a),e[2]=o+i*(r[2]-o),e};le.random=function(e,t){t=t||1;var r=qi()*2*Math.PI,i=qi()*2-1,n=Math.sqrt(1-i*i)*t;return e[0]=Math.cos(r)*n,e[1]=Math.sin(r)*n,e[2]=i*t,e};le.transformMat4=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[3]*i+r[7]*n+r[11]*a+r[15];return o=o||1,e[0]=(r[0]*i+r[4]*n+r[8]*a+r[12])/o,e[1]=(r[1]*i+r[5]*n+r[9]*a+r[13])/o,e[2]=(r[2]*i+r[6]*n+r[10]*a+r[14])/o,e};le.transformMat3=function(e,t,r){var i=t[0],n=t[1],a=t[2];return e[0]=i*r[0]+n*r[3]+a*r[6],e[1]=i*r[1]+n*r[4]+a*r[7],e[2]=i*r[2]+n*r[5]+a*r[8],e};le.transformQuat=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[0],s=r[1],l=r[2],h=r[3],u=h*i+s*a-l*n,f=h*n+l*i-o*a,d=h*a+o*n-s*i,c=-o*i-s*n-l*a;return e[0]=u*h+c*-o+f*-l-d*-s,e[1]=f*h+c*-s+d*-o-u*-l,e[2]=d*h+c*-l+u*-s-f*-o,e};le.rotateX=function(e,t,r,i){var n=[],a=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],a[0]=n[0],a[1]=n[1]*Math.cos(i)-n[2]*Math.sin(i),a[2]=n[1]*Math.sin(i)+n[2]*Math.cos(i),e[0]=a[0]+r[0],e[1]=a[1]+r[1],e[2]=a[2]+r[2],e};le.rotateY=function(e,t,r,i){var n=[],a=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],a[0]=n[2]*Math.sin(i)+n[0]*Math.cos(i),a[1]=n[1],a[2]=n[2]*Math.cos(i)-n[0]*Math.sin(i),e[0]=a[0]+r[0],e[1]=a[1]+r[1],e[2]=a[2]+r[2],e};le.rotateZ=function(e,t,r,i){var n=[],a=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],a[0]=n[0]*Math.cos(i)-n[1]*Math.sin(i),a[1]=n[0]*Math.sin(i)+n[1]*Math.cos(i),a[2]=n[2],e[0]=a[0]+r[0],e[1]=a[1]+r[1],e[2]=a[2]+r[2],e};le.forEach=function(){var e=le.create();return function(t,r,i,n,a,o){var s,l;for(r||(r=3),i||(i=0),n?l=Math.min(n*r+i,t.length):l=t.length,s=i;s<l;s+=r)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}}();le.angle=function(e,t){var r=le.fromValues(e[0],e[1],e[2]),i=le.fromValues(t[0],t[1],t[2]);le.normalize(r,r),le.normalize(i,i);var n=le.dot(r,i);return n>1?0:Math.acos(n)};const A=le;G.import(ou);var Ye=W.create,Bl={};function Fl(e){return e.material}function nd(e,t,r){return t.uniforms[r].value}function ad(e,t,r,i){return r!==i}function od(e){return!0}function Ul(){}var zl={float:I.FLOAT,byte:I.BYTE,ubyte:I.UNSIGNED_BYTE,short:I.SHORT,ushort:I.UNSIGNED_SHORT};function sd(e,t,r){this.availableAttributes=e,this.availableAttributeSymbols=t,this.indicesBuffer=r,this.vao=null}function ld(e){var t,r;this.bind=function(i){t||(t=ft.createCanvas(),t.width=t.height=1,t.getContext("2d"));var n=i.gl,a=!r;a&&(r=n.createTexture()),n.bindTexture(n.TEXTURE_2D,r),a&&n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t)},this.unbind=function(i){i.gl.bindTexture(i.gl.TEXTURE_2D,null)},this.isRenderable=function(){return!0}}var ii=Bt.extend(function(){return{canvas:null,_width:100,_height:100,devicePixelRatio:typeof window<"u"&&window.devicePixelRatio||1,clearColor:[0,0,0,0],clearBit:17664,alpha:!0,depth:!0,stencil:!1,antialias:!0,premultipliedAlpha:!0,preserveDrawingBuffer:!1,throwError:!0,gl:null,viewport:{},maxJointNumber:20,__currentFrameBuffer:null,_viewportStack:[],_clearStack:[],_sceneRendering:null}},function(){this.canvas||(this.canvas=ft.createCanvas());var e=this.canvas;try{var t={alpha:this.alpha,depth:this.depth,stencil:this.stencil,antialias:this.antialias,premultipliedAlpha:this.premultipliedAlpha,preserveDrawingBuffer:this.preserveDrawingBuffer};if(this.gl=e.getContext("webgl",t)||e.getContext("experimental-webgl",t),!this.gl)throw new Error;this._glinfo=new Bc(this.gl),this.gl.targetRenderer&&console.error("Already created a renderer"),this.gl.targetRenderer=this,this.resize()}catch(r){throw"Error creating WebGL Context "+r}this._programMgr=new ru(this),this._placeholderTexture=new ld},{resize:function(e,t){var r=this.canvas,i=this.devicePixelRatio;e!=null?(r.style&&(r.style.width=e+"px",r.style.height=t+"px"),r.width=e*i,r.height=t*i,this._width=e,this._height=t):(this._width=r.width/i,this._height=r.height/i),this.setViewport(0,0,this._width,this._height)},getWidth:function(){return this._width},getHeight:function(){return this._height},getViewportAspect:function(){var e=this.viewport;return e.width/e.height},setDevicePixelRatio:function(e){this.devicePixelRatio=e,this.resize(this._width,this._height)},getDevicePixelRatio:function(){return this.devicePixelRatio},getGLExtension:function(e){return this._glinfo.getExtension(e)},getGLParameter:function(e){return this._glinfo.getParameter(e)},setViewport:function(e,t,r,i,n){if(typeof e=="object"){var a=e;e=a.x,t=a.y,r=a.width,i=a.height,n=a.devicePixelRatio}n=n||this.devicePixelRatio,this.gl.viewport(e*n,t*n,r*n,i*n),this.viewport={x:e,y:t,width:r,height:i,devicePixelRatio:n}},saveViewport:function(){this._viewportStack.push(this.viewport)},restoreViewport:function(){this._viewportStack.length>0&&this.setViewport(this._viewportStack.pop())},saveClear:function(){this._clearStack.push({clearBit:this.clearBit,clearColor:this.clearColor})},restoreClear:function(){if(this._clearStack.length>0){var e=this._clearStack.pop();this.clearColor=e.clearColor,this.clearBit=e.clearBit}},bindSceneRendering:function(e){this._sceneRendering=e},render:function(e,t,r,i){var n=this.gl,a=this.clearColor;if(this.clearBit){n.colorMask(!0,!0,!0,!0),n.depthMask(!0);var o=this.viewport,s=!1,l=o.devicePixelRatio;(o.width!==this._width||o.height!==this._height||l&&l!==this.devicePixelRatio||o.x||o.y)&&(s=!0,n.enable(n.SCISSOR_TEST),n.scissor(o.x*l,o.y*l,o.width*l,o.height*l)),n.clearColor(a[0],a[1],a[2],a[3]),n.clear(this.clearBit),s&&n.disable(n.SCISSOR_TEST)}if(r||e.update(!1),e.updateLights(),t=t||e.getMainCamera(),!t){console.error("Can't find camera in the scene.");return}t.update();var h=e.updateRenderList(t,!0);this._sceneRendering=e;var u=h.opaque,f=h.transparent,d=e.material;e.trigger("beforerender",this,e,t,h),i?(this.renderPreZ(u,e,t),n.depthFunc(n.LEQUAL)):n.depthFunc(n.LESS);for(var c=Ye(),v=A.create(),p=0;p<f.length;p++){var g=f[p];W.multiplyAffine(c,t.viewMatrix.array,g.worldTransform.array),A.transformMat4(v,g.position.array,c),g.__depth=v[2]}this.renderPass(u,t,{getMaterial:function(m){return d||m.material},sortCompare:this.opaqueSortCompare}),this.renderPass(f,t,{getMaterial:function(m){return d||m.material},sortCompare:this.transparentSortCompare}),e.trigger("afterrender",this,e,t,h),this._sceneRendering=null},getProgram:function(e,t,r){return t=t||e.material,this._programMgr.getProgram(e,t,r)},validateProgram:function(e){if(e.__error){var t=e.__error;if(Bl[e.__uid__])return;if(Bl[e.__uid__]=!0,this.throwError)throw new Error(t);this.trigger("error",t)}},updatePrograms:function(e,t,r){var i=r&&r.getMaterial||Fl;t=t||null;for(var n=0;n<e.length;n++){var a=e[n],o=i.call(this,a);if(n>0){var s=e[n-1],l=s.joints?s.joints.length:0,h=a.joints?a.joints.length:0;if(h===l&&a.material===s.material&&a.lightGroup===s.lightGroup){a.__program=s.__program;continue}}var u=this._programMgr.getProgram(a,o,t);this.validateProgram(u),a.__program=u}},renderPass:function(e,t,r){this.trigger("beforerenderpass",this,e,t,r),r=r||{},r.getMaterial=r.getMaterial||Fl,r.getUniform=r.getUniform||nd,r.isMaterialChanged=r.isMaterialChanged||ad,r.beforeRender=r.beforeRender||Ul,r.afterRender=r.afterRender||Ul;var i=r.ifRender||od;this.updatePrograms(e,this._sceneRendering,r),r.sortCompare&&e.sort(r.sortCompare);var n=this.viewport,a=n.devicePixelRatio,o=[n.x*a,n.y*a,n.width*a,n.height*a],s=this.devicePixelRatio,l=this.__currentFrameBuffer?[this.__currentFrameBuffer.getTextureWidth(),this.__currentFrameBuffer.getTextureHeight()]:[this._width*s,this._height*s],h=[o[2],o[3]],u=Date.now();t?(W.copy(qe.VIEW,t.viewMatrix.array),W.copy(qe.PROJECTION,t.projectionMatrix.array),W.copy(qe.VIEWINVERSE,t.worldTransform.array)):(W.identity(qe.VIEW),W.identity(qe.PROJECTION),W.identity(qe.VIEWINVERSE)),W.multiply(qe.VIEWPROJECTION,qe.PROJECTION,qe.VIEW),W.invert(qe.PROJECTIONINVERSE,qe.PROJECTION),W.invert(qe.VIEWPROJECTIONINVERSE,qe.VIEWPROJECTION);for(var f=this.gl,d=this._sceneRendering,c,v,p,g,m,_,x,y,T,w,E,S,D=null,M=0;M<e.length;M++){var C=e[M],N=C.worldTransform!=null,O;if(i(C)){N&&(O=C.isSkinnedMesh&&C.isSkinnedMesh()?C.offsetMatrix?C.offsetMatrix.array:qe.IDENTITY:C.worldTransform.array);var P=C.geometry,F=r.getMaterial.call(this,C),H=C.__program,Y=F.shader,z=P.__uid__+"-"+H.__uid__,Te=z!==w;w=z,Te&&D&&D.bindVertexArrayOES(null),N&&(W.copy(qe.WORLD,O),W.multiply(qe.WORLDVIEWPROJECTION,qe.VIEWPROJECTION,O),W.multiplyAffine(qe.WORLDVIEW,qe.VIEW,O),(Y.matrixSemantics.WORLDINVERSE||Y.matrixSemantics.WORLDINVERSETRANSPOSE)&&W.invert(qe.WORLDINVERSE,O),(Y.matrixSemantics.WORLDVIEWINVERSE||Y.matrixSemantics.WORLDVIEWINVERSETRANSPOSE)&&W.invert(qe.WORLDVIEWINVERSE,qe.WORLDVIEW),(Y.matrixSemantics.WORLDVIEWPROJECTIONINVERSE||Y.matrixSemantics.WORLDVIEWPROJECTIONINVERSETRANSPOSE)&&W.invert(qe.WORLDVIEWPROJECTIONINVERSE,qe.WORLDVIEWPROJECTION)),C.beforeRender&&C.beforeRender(this),r.beforeRender.call(this,C,F,c);var q=H!==v;q?(H.bind(this),H.setUniformOfSemantic(f,"VIEWPORT",o),H.setUniformOfSemantic(f,"WINDOW_SIZE",l),t&&(H.setUniformOfSemantic(f,"NEAR",t.near),H.setUniformOfSemantic(f,"FAR",t.far)),H.setUniformOfSemantic(f,"DEVICEPIXELRATIO",a),H.setUniformOfSemantic(f,"TIME",u),H.setUniformOfSemantic(f,"VIEWPORT_SIZE",h),d&&d.setLightUniforms(H,C.lightGroup,this)):H=v,(q||r.isMaterialChanged(C,p,F,c))&&(F.depthTest!==g&&(F.depthTest?f.enable(f.DEPTH_TEST):f.disable(f.DEPTH_TEST),g=F.depthTest),F.depthMask!==m&&(f.depthMask(F.depthMask),m=F.depthMask),F.transparent!==T&&(F.transparent?f.enable(f.BLEND):f.disable(f.BLEND),T=F.transparent),F.transparent&&(F.blend?F.blend(f):(f.blendEquationSeparate(f.FUNC_ADD,f.FUNC_ADD),f.blendFuncSeparate(f.SRC_ALPHA,f.ONE_MINUS_SRC_ALPHA,f.ONE,f.ONE_MINUS_SRC_ALPHA))),S=this._bindMaterial(C,F,H,p||null,c||null,v||null,r.getUniform),c=F);var De=Y.matrixSemanticKeys;if(N)for(var ve=0;ve<De.length;ve++){var oe=De[ve],Q=Y.matrixSemantics[oe],L=qe[oe];if(Q.isTranspose){var k=qe[Q.semanticNoTranspose];W.transpose(L,k)}H.setUniform(f,Q.type,Q.symbol,L)}C.cullFace!==x&&(x=C.cullFace,f.cullFace(x)),C.frontFace!==y&&(y=C.frontFace,f.frontFace(y)),C.culling!==_&&(_=C.culling,_?f.enable(f.CULL_FACE):f.disable(f.CULL_FACE)),this._updateSkeleton(C,H,S),Te&&(E=this._bindVAO(D,Y,P,H)),this._renderObject(C,E,H),r.afterRender(this,C),C.afterRender&&C.afterRender(this),v=H,p=C}}this.trigger("afterrenderpass",this,e,t,r)},getMaxJointNumber:function(){return this.maxJointNumber},_updateSkeleton:function(e,t,r){var i=this.gl,n=e.skeleton;if(n)if(n.update(),e.joints.length>this.getMaxJointNumber()){var a=n.getSubSkinMatricesTexture(e.__uid__,e.joints);t.useTextureSlot(this,a,r),t.setUniform(i,"1i","skinMatricesTexture",r),t.setUniform(i,"1f","skinMatricesTextureSize",a.width)}else{var o=n.getSubSkinMatrices(e.__uid__,e.joints);t.setUniformOfSemantic(i,"SKIN_MATRIX",o)}},_renderObject:function(e,t,r){var i=this.gl,n=e.geometry,a=e.mode;a==null&&(a=4);var o=null,s=e.isInstancedMesh&&e.isInstancedMesh();if(s&&(o=this.getGLExtension("ANGLE_instanced_arrays"),!o)){console.warn("Device not support ANGLE_instanced_arrays extension");return}var l;if(s&&(l=this._bindInstancedAttributes(e,r,o)),t.indicesBuffer){var h=this.getGLExtension("OES_element_index_uint"),u=h&&n.indices instanceof Uint32Array,f=u?i.UNSIGNED_INT:i.UNSIGNED_SHORT;s?o.drawElementsInstancedANGLE(a,t.indicesBuffer.count,f,0,e.getInstanceCount()):i.drawElements(a,t.indicesBuffer.count,f,0)}else s?o.drawArraysInstancedANGLE(a,0,n.vertexCount,e.getInstanceCount()):i.drawArrays(a,0,n.vertexCount);if(s)for(var d=0;d<l.length;d++)i.disableVertexAttribArray(l[d])},_bindInstancedAttributes:function(e,t,r){for(var i=this.gl,n=e.getInstancedAttributesBuffers(this),a=[],o=0;o<n.length;o++){var s=n[o],l=t.getAttribLocation(i,s.symbol);if(!(l<0)){var h=zl[s.type]||i.FLOAT;i.enableVertexAttribArray(l),i.bindBuffer(i.ARRAY_BUFFER,s.buffer),i.vertexAttribPointer(l,s.size,h,!1,0,0),r.vertexAttribDivisorANGLE(l,s.divisor),a.push(l)}}return a},_bindMaterial:function(e,t,r,i,n,a,o){for(var s=this.gl,l=a===r,h=r.currentTextureSlot(),u=t.getEnabledUniforms(),f=t.getTextureUniforms(),d=this._placeholderTexture,c=0;c<f.length;c++){var v=f[c],p=o(e,t,v),g=t.uniforms[v].type;if(g==="t"&&p)p.__slot=-1;else if(g==="tv")for(var m=0;m<p.length;m++)p[m]&&(p[m].__slot=-1)}d.__slot=-1;for(var c=0;c<u.length;c++){var v=u[c],_=t.uniforms[v],p=o(e,t,v),g=_.type,x=g==="t";if(x&&(!p||!p.isRenderable())&&(p=d),n&&l){var y=o(i,n,v);if(x&&(!y||!y.isRenderable())&&(y=d),y===p){if(x)r.takeCurrentTextureSlot(this,null);else if(g==="tv"&&p)for(var m=0;m<p.length;m++)r.takeCurrentTextureSlot(this,null);continue}}if(p!=null)if(x)if(p.__slot<0){var T=r.currentTextureSlot(),w=r.setUniform(s,"1i",v,T);w&&(r.takeCurrentTextureSlot(this,p),p.__slot=T)}else r.setUniform(s,"1i",v,p.__slot);else if(Array.isArray(p)){if(p.length===0)continue;if(g==="tv"){if(!r.hasUniform(v))continue;for(var E=[],m=0;m<p.length;m++){var S=p[m];if(S.__slot<0){var T=r.currentTextureSlot();E.push(T),r.takeCurrentTextureSlot(this,S),S.__slot=T}else E.push(S.__slot)}r.setUniform(s,"1iv",v,E)}else r.setUniform(s,_.type,v,p)}else r.setUniform(s,_.type,v,p)}var D=r.currentTextureSlot();return r.resetTextureSlot(h),D},_bindVAO:function(e,t,r,i){var n=!r.dynamic,a=this.gl,o=this.__uid__+"-"+i.__uid__,s=r.__vaoCache[o];if(!s){var l=r.getBufferChunks(this);if(!l||!l.length)return;for(var h=l[0],u=h.attributeBuffers,y=h.indicesBuffer,x=[],f=[],d=0;d<u.length;d++){var c=u[d],v=c.name,p=c.semantic,g;if(p){var m=t.attributeSemantics[p];g=m&&m.symbol}else g=v;g&&i.attributes[g]&&(x.push(c),f.push(g))}s=new sd(x,f,y),n&&(r.__vaoCache[o]=s)}var _=!0;e&&n&&(s.vao==null?s.vao=e.createVertexArrayOES():_=!1,e.bindVertexArrayOES(s.vao));var x=s.availableAttributes,y=s.indicesBuffer;if(_){for(var T=i.enableAttributes(this,s.availableAttributeSymbols,e&&n&&s),d=0;d<x.length;d++){var w=T[d];if(w!==-1){var c=x[d],E=c.buffer,S=c.size,D=zl[c.type]||a.FLOAT;a.bindBuffer(a.ARRAY_BUFFER,E),a.vertexAttribPointer(w,S,D,!1,0,0)}}r.isUseIndices()&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,y.buffer)}return s},renderPreZ:function(e,t,r){var i=this.gl,n=this._prezMaterial||new tr({shader:new G(G.source("clay.prez.vertex"),G.source("clay.prez.fragment"))});this._prezMaterial=n,i.colorMask(!1,!1,!1,!1),i.depthMask(!0),this.renderPass(e,r,{ifRender:function(a){return!a.ignorePreZ},isMaterialChanged:function(a,o){var s=a.material,l=o.material;return s.get("diffuseMap")!==l.get("diffuseMap")||(s.get("alphaCutoff")||0)!==(l.get("alphaCutoff")||0)},getUniform:function(a,o,s){if(s==="alphaMap")return a.material.get("diffuseMap");if(s==="alphaCutoff"){if(a.material.isDefined("fragment","ALPHA_TEST")&&a.material.get("diffuseMap")){var l=a.material.get("alphaCutoff");return l||0}return 0}else return s==="uvRepeat"?a.material.get("uvRepeat"):s==="uvOffset"?a.material.get("uvOffset"):o.get(s)},getMaterial:function(){return n},sort:this.opaqueSortCompare}),i.colorMask(!0,!0,!0,!0),i.depthMask(!0)},disposeScene:function(e){this.disposeNode(e,!0,!0),e.dispose()},disposeNode:function(e,t,r){e.getParent()&&e.getParent().remove(e);var i={};e.traverse(function(n){var a=n.material;if(n.geometry&&t&&n.geometry.dispose(this),r&&a&&!i[a.__uid__]){for(var o=a.getTextureUniforms(),s=0;s<o.length;s++){var l=o[s],h=a.uniforms[l].value,u=a.uniforms[l].type;if(h){if(u==="t")h.dispose&&h.dispose(this);else if(u==="tv")for(var f=0;f<h.length;f++)h[f]&&h[f].dispose&&h[f].dispose(this)}}i[a.__uid__]=!0}n.dispose&&n.dispose(this)},this)},disposeGeometry:function(e){e.dispose(this)},disposeTexture:function(e){e.dispose(this)},disposeFrameBuffer:function(e){e.dispose(this)},dispose:function(){},screenToNDC:function(e,t,r){r||(r=new Vt),t=this._height-t;var i=this.viewport,n=r.array;return n[0]=(e-i.x)/i.width,n[0]=n[0]*2-1,n[1]=(t-i.y)/i.height,n[1]=n[1]*2-1,r}});ii.opaqueSortCompare=ii.prototype.opaqueSortCompare=function(e,t){return e.renderOrder===t.renderOrder?e.__program===t.__program?e.material===t.material?e.geometry.__uid__-t.geometry.__uid__:e.material.__uid__-t.material.__uid__:e.__program&&t.__program?e.__program.__uid__-t.__program.__uid__:0:e.renderOrder-t.renderOrder};ii.transparentSortCompare=ii.prototype.transparentSortCompare=function(e,t){return e.renderOrder===t.renderOrder?e.__depth===t.__depth?e.__program===t.__program?e.material===t.material?e.geometry.__uid__-t.geometry.__uid__:e.material.__uid__-t.material.__uid__:e.__program&&t.__program?e.__program.__uid__-t.__program.__uid__:0:e.__depth-t.__depth:e.renderOrder-t.renderOrder};var qe={IDENTITY:Ye(),WORLD:Ye(),VIEW:Ye(),PROJECTION:Ye(),WORLDVIEW:Ye(),VIEWPROJECTION:Ye(),WORLDVIEWPROJECTION:Ye(),WORLDINVERSE:Ye(),VIEWINVERSE:Ye(),PROJECTIONINVERSE:Ye(),WORLDVIEWINVERSE:Ye(),VIEWPROJECTIONINVERSE:Ye(),WORLDVIEWPROJECTIONINVERSE:Ye(),WORLDTRANSPOSE:Ye(),VIEWTRANSPOSE:Ye(),PROJECTIONTRANSPOSE:Ye(),WORLDVIEWTRANSPOSE:Ye(),VIEWPROJECTIONTRANSPOSE:Ye(),WORLDVIEWPROJECTIONTRANSPOSE:Ye(),WORLDINVERSETRANSPOSE:Ye(),VIEWINVERSETRANSPOSE:Ye(),PROJECTIONINVERSETRANSPOSE:Ye(),WORLDVIEWINVERSETRANSPOSE:Ye(),VIEWPROJECTIONINVERSETRANSPOSE:Ye(),WORLDVIEWPROJECTIONINVERSETRANSPOSE:Ye()};ii.COLOR_BUFFER_BIT=I.COLOR_BUFFER_BIT;ii.DEPTH_BUFFER_BIT=I.DEPTH_BUFFER_BIT;ii.STENCIL_BUFFER_BIT=I.STENCIL_BUFFER_BIT;const In=ii;var se=function(e,t,r){e=e||0,t=t||0,r=r||0,this.array=A.fromValues(e,t,r),this._dirty=!0};se.prototype={constructor:se,add:function(e){return A.add(this.array,this.array,e.array),this._dirty=!0,this},set:function(e,t,r){return this.array[0]=e,this.array[1]=t,this.array[2]=r,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this.array[2]=e[2],this._dirty=!0,this},clone:function(){return new se(this.x,this.y,this.z)},copy:function(e){return A.copy(this.array,e.array),this._dirty=!0,this},cross:function(e,t){return A.cross(this.array,e.array,t.array),this._dirty=!0,this},dist:function(e){return A.dist(this.array,e.array)},distance:function(e){return A.distance(this.array,e.array)},div:function(e){return A.div(this.array,this.array,e.array),this._dirty=!0,this},divide:function(e){return A.divide(this.array,this.array,e.array),this._dirty=!0,this},dot:function(e){return A.dot(this.array,e.array)},len:function(){return A.len(this.array)},length:function(){return A.length(this.array)},lerp:function(e,t,r){return A.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},min:function(e){return A.min(this.array,this.array,e.array),this._dirty=!0,this},max:function(e){return A.max(this.array,this.array,e.array),this._dirty=!0,this},mul:function(e){return A.mul(this.array,this.array,e.array),this._dirty=!0,this},multiply:function(e){return A.multiply(this.array,this.array,e.array),this._dirty=!0,this},negate:function(){return A.negate(this.array,this.array),this._dirty=!0,this},normalize:function(){return A.normalize(this.array,this.array),this._dirty=!0,this},random:function(e){return A.random(this.array,e),this._dirty=!0,this},scale:function(e){return A.scale(this.array,this.array,e),this._dirty=!0,this},scaleAndAdd:function(e,t){return A.scaleAndAdd(this.array,this.array,e.array,t),this._dirty=!0,this},sqrDist:function(e){return A.sqrDist(this.array,e.array)},squaredDistance:function(e){return A.squaredDistance(this.array,e.array)},sqrLen:function(){return A.sqrLen(this.array)},squaredLength:function(){return A.squaredLength(this.array)},sub:function(e){return A.sub(this.array,this.array,e.array),this._dirty=!0,this},subtract:function(e){return A.subtract(this.array,this.array,e.array),this._dirty=!0,this},transformMat3:function(e){return A.transformMat3(this.array,this.array,e.array),this._dirty=!0,this},transformMat4:function(e){return A.transformMat4(this.array,this.array,e.array),this._dirty=!0,this},transformQuat:function(e){return A.transformQuat(this.array,this.array,e.array),this._dirty=!0,this},applyProjection:function(e){var t=this.array;if(e=e.array,e[15]===0){var r=-1/t[2];t[0]=e[0]*t[0]*r,t[1]=e[5]*t[1]*r,t[2]=(e[10]*t[2]+e[14])*r}else t[0]=e[0]*t[0]+e[12],t[1]=e[5]*t[1]+e[13],t[2]=e[10]*t[2]+e[14];return this._dirty=!0,this},eulerFromQuat:function(e,t){se.eulerFromQuat(this,e,t)},eulerFromMat3:function(e,t){se.eulerFromMat3(this,e,t)},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var xa=Object.defineProperty;if(xa){var Po=se.prototype;xa(Po,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),xa(Po,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}}),xa(Po,"z",{get:function(){return this.array[2]},set:function(e){this.array[2]=e,this._dirty=!0}})}se.add=function(e,t,r){return A.add(e.array,t.array,r.array),e._dirty=!0,e};se.set=function(e,t,r,i){A.set(e.array,t,r,i),e._dirty=!0};se.copy=function(e,t){return A.copy(e.array,t.array),e._dirty=!0,e};se.cross=function(e,t,r){return A.cross(e.array,t.array,r.array),e._dirty=!0,e};se.dist=function(e,t){return A.distance(e.array,t.array)};se.distance=se.dist;se.div=function(e,t,r){return A.divide(e.array,t.array,r.array),e._dirty=!0,e};se.divide=se.div;se.dot=function(e,t){return A.dot(e.array,t.array)};se.len=function(e){return A.length(e.array)};se.lerp=function(e,t,r,i){return A.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};se.min=function(e,t,r){return A.min(e.array,t.array,r.array),e._dirty=!0,e};se.max=function(e,t,r){return A.max(e.array,t.array,r.array),e._dirty=!0,e};se.mul=function(e,t,r){return A.multiply(e.array,t.array,r.array),e._dirty=!0,e};se.multiply=se.mul;se.negate=function(e,t){return A.negate(e.array,t.array),e._dirty=!0,e};se.normalize=function(e,t){return A.normalize(e.array,t.array),e._dirty=!0,e};se.random=function(e,t){return A.random(e.array,t),e._dirty=!0,e};se.scale=function(e,t,r){return A.scale(e.array,t.array,r),e._dirty=!0,e};se.scaleAndAdd=function(e,t,r,i){return A.scaleAndAdd(e.array,t.array,r.array,i),e._dirty=!0,e};se.sqrDist=function(e,t){return A.sqrDist(e.array,t.array)};se.squaredDistance=se.sqrDist;se.sqrLen=function(e){return A.sqrLen(e.array)};se.squaredLength=se.sqrLen;se.sub=function(e,t,r){return A.subtract(e.array,t.array,r.array),e._dirty=!0,e};se.subtract=se.sub;se.transformMat3=function(e,t,r){return A.transformMat3(e.array,t.array,r.array),e._dirty=!0,e};se.transformMat4=function(e,t,r){return A.transformMat4(e.array,t.array,r.array),e._dirty=!0,e};se.transformQuat=function(e,t,r){return A.transformQuat(e.array,t.array,r.array),e._dirty=!0,e};function Jt(e,t,r){return e<t?t:e>r?r:e}var Ue=Math.atan2,er=Math.asin,zi=Math.abs;se.eulerFromQuat=function(e,t,d){e._dirty=!0,t=t.array;var i=e.array,n=t[0],a=t[1],o=t[2],s=t[3],l=n*n,h=a*a,u=o*o,f=s*s,d=(d||"XYZ").toUpperCase();switch(d){case"XYZ":i[0]=Ue(2*(n*s-a*o),f-l-h+u),i[1]=er(Jt(2*(n*o+a*s),-1,1)),i[2]=Ue(2*(o*s-n*a),f+l-h-u);break;case"YXZ":i[0]=er(Jt(2*(n*s-a*o),-1,1)),i[1]=Ue(2*(n*o+a*s),f-l-h+u),i[2]=Ue(2*(n*a+o*s),f-l+h-u);break;case"ZXY":i[0]=er(Jt(2*(n*s+a*o),-1,1)),i[1]=Ue(2*(a*s-o*n),f-l-h+u),i[2]=Ue(2*(o*s-n*a),f-l+h-u);break;case"ZYX":i[0]=Ue(2*(n*s+o*a),f-l-h+u),i[1]=er(Jt(2*(a*s-n*o),-1,1)),i[2]=Ue(2*(n*a+o*s),f+l-h-u);break;case"YZX":i[0]=Ue(2*(n*s-o*a),f-l+h-u),i[1]=Ue(2*(a*s-n*o),f+l-h-u),i[2]=er(Jt(2*(n*a+o*s),-1,1));break;case"XZY":i[0]=Ue(2*(n*s+a*o),f-l+h-u),i[1]=Ue(2*(n*o+a*s),f+l-h-u),i[2]=er(Jt(2*(o*s-n*a),-1,1));break;default:console.warn("Unkown order: "+d)}return e};se.eulerFromMat3=function(e,t,v){var i=t.array,n=i[0],a=i[3],o=i[6],s=i[1],l=i[4],h=i[7],u=i[2],f=i[5],d=i[8],c=e.array,v=(v||"XYZ").toUpperCase();switch(v){case"XYZ":c[1]=er(Jt(o,-1,1)),zi(o)<.99999?(c[0]=Ue(-h,d),c[2]=Ue(-a,n)):(c[0]=Ue(f,l),c[2]=0);break;case"YXZ":c[0]=er(-Jt(h,-1,1)),zi(h)<.99999?(c[1]=Ue(o,d),c[2]=Ue(s,l)):(c[1]=Ue(-u,n),c[2]=0);break;case"ZXY":c[0]=er(Jt(f,-1,1)),zi(f)<.99999?(c[1]=Ue(-u,d),c[2]=Ue(-a,l)):(c[1]=0,c[2]=Ue(s,n));break;case"ZYX":c[1]=er(-Jt(u,-1,1)),zi(u)<.99999?(c[0]=Ue(f,d),c[2]=Ue(s,n)):(c[0]=0,c[2]=Ue(-a,l));break;case"YZX":c[2]=er(Jt(s,-1,1)),zi(s)<.99999?(c[0]=Ue(-h,l),c[1]=Ue(-u,n)):(c[0]=0,c[1]=Ue(o,d));break;case"XZY":c[2]=er(-Jt(a,-1,1)),zi(a)<.99999?(c[0]=Ue(f,l),c[1]=Ue(o,n)):(c[0]=Ue(-h,d),c[1]=0);break;default:console.warn("Unkown order: "+v)}return e._dirty=!0,e};Object.defineProperties(se,{POSITIVE_X:{get:function(){return new se(1,0,0)}},NEGATIVE_X:{get:function(){return new se(-1,0,0)}},POSITIVE_Y:{get:function(){return new se(0,1,0)}},NEGATIVE_Y:{get:function(){return new se(0,-1,0)}},POSITIVE_Z:{get:function(){return new se(0,0,1)}},NEGATIVE_Z:{get:function(){return new se(0,0,-1)}},UP:{get:function(){return new se(0,1,0)}},ZERO:{get:function(){return new se}}});const Z=se;var Ro=1e-5,Ia=function(e,t){this.origin=e||new Z,this.direction=t||new Z};Ia.prototype={constructor:Ia,intersectPlane:function(e,t){var r=e.normal.array,i=e.distance,n=this.origin.array,a=this.direction.array,o=A.dot(r,a);if(o===0)return null;t||(t=new Z);var s=(A.dot(r,n)-i)/o;return A.scaleAndAdd(t.array,n,a,-s),t._dirty=!0,t},mirrorAgainstPlane:function(e){var t=A.dot(e.normal.array,this.direction.array);A.scaleAndAdd(this.direction.array,this.direction.array,e.normal.array,-t*2),this.direction._dirty=!0},distanceToPoint:function(){var e=A.create();return function(t){A.sub(e,t,this.origin.array);var r=A.dot(e,this.direction.array);if(r<0)return A.distance(this.origin.array,t);var i=A.lenSquared(e);return Math.sqrt(i-r*r)}}(),intersectSphere:function(){var e=A.create();return function(t,r,i){var n=this.origin.array,a=this.direction.array;t=t.array,A.sub(e,t,n);var o=A.dot(e,a),s=A.squaredLength(e),l=s-o*o,h=r*r;if(!(l>h)){var u=Math.sqrt(h-l),f=o-u,d=o+u;return i||(i=new Z),f<0?d<0?null:(A.scaleAndAdd(i.array,n,a,d),i):(A.scaleAndAdd(i.array,n,a,f),i)}}}(),intersectBoundingBox:function(e,t){var r=this.direction.array,i=this.origin.array,n=e.min.array,a=e.max.array,o=1/r[0],s=1/r[1],l=1/r[2],h,u,f,d,c,v;if(o>=0?(h=(n[0]-i[0])*o,u=(a[0]-i[0])*o):(u=(n[0]-i[0])*o,h=(a[0]-i[0])*o),s>=0?(f=(n[1]-i[1])*s,d=(a[1]-i[1])*s):(d=(n[1]-i[1])*s,f=(a[1]-i[1])*s),h>d||f>u||((f>h||h!==h)&&(h=f),(d<u||u!==u)&&(u=d),l>=0?(c=(n[2]-i[2])*l,v=(a[2]-i[2])*l):(v=(n[2]-i[2])*l,c=(a[2]-i[2])*l),h>v||c>u)||((c>h||h!==h)&&(h=c),(v<u||u!==u)&&(u=v),u<0))return null;var p=h>=0?h:u;return t||(t=new Z),A.scaleAndAdd(t.array,i,r,p),t},intersectTriangle:function(){var e=A.create(),t=A.create(),r=A.create(),i=A.create();return function(n,a,o,s,l,h){var u=this.direction.array,f=this.origin.array;n=n.array,a=a.array,o=o.array,A.sub(e,a,n),A.sub(t,o,n),A.cross(i,t,u);var d=A.dot(e,i);if(s){if(d>-Ro)return null}else if(d>-Ro&&d<Ro)return null;A.sub(r,f,n);var c=A.dot(i,r)/d;if(c<0||c>1)return null;A.cross(i,e,r);var v=A.dot(u,i)/d;if(v<0||v>1||c+v>1)return null;A.cross(i,e,t);var p=-A.dot(r,i)/d;return p<0?null:(l||(l=new Z),h&&Z.set(h,1-c-v,c,v),A.scaleAndAdd(l.array,f,u,p),l)}}(),applyTransform:function(e){Z.add(this.direction,this.direction,this.origin),Z.transformMat4(this.origin,this.origin,e),Z.transformMat4(this.direction,this.direction,e),Z.sub(this.direction,this.direction,this.origin),Z.normalize(this.direction,this.direction)},copy:function(e){Z.copy(this.origin,e.origin),Z.copy(this.direction,e.direction)},clone:function(){var e=new Ia;return e.copy(this),e}};const Ga=Ia;var _e={};_e.create=function(){var e=new Lt(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e};_e.clone=function(e){var t=new Lt(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t};_e.fromValues=function(e,t,r,i){var n=new Lt(4);return n[0]=e,n[1]=t,n[2]=r,n[3]=i,n};_e.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e};_e.set=function(e,t,r,i,n){return e[0]=t,e[1]=r,e[2]=i,e[3]=n,e};_e.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e};_e.subtract=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e};_e.sub=_e.subtract;_e.multiply=function(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e[3]=t[3]*r[3],e};_e.mul=_e.multiply;_e.divide=function(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e[2]=t[2]/r[2],e[3]=t[3]/r[3],e};_e.div=_e.divide;_e.min=function(e,t,r){return e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e[2]=Math.min(t[2],r[2]),e[3]=Math.min(t[3],r[3]),e};_e.max=function(e,t,r){return e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e[2]=Math.max(t[2],r[2]),e[3]=Math.max(t[3],r[3]),e};_e.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e};_e.scaleAndAdd=function(e,t,r,i){return e[0]=t[0]+r[0]*i,e[1]=t[1]+r[1]*i,e[2]=t[2]+r[2]*i,e[3]=t[3]+r[3]*i,e};_e.distance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2],a=t[3]-e[3];return Math.sqrt(r*r+i*i+n*n+a*a)};_e.dist=_e.distance;_e.squaredDistance=function(e,t){var r=t[0]-e[0],i=t[1]-e[1],n=t[2]-e[2],a=t[3]-e[3];return r*r+i*i+n*n+a*a};_e.sqrDist=_e.squaredDistance;_e.length=function(e){var t=e[0],r=e[1],i=e[2],n=e[3];return Math.sqrt(t*t+r*r+i*i+n*n)};_e.len=_e.length;_e.squaredLength=function(e){var t=e[0],r=e[1],i=e[2],n=e[3];return t*t+r*r+i*i+n*n};_e.sqrLen=_e.squaredLength;_e.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e};_e.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e[3]=1/t[3],e};_e.normalize=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r*r+i*i+n*n+a*a;return o>0&&(o=1/Math.sqrt(o),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e[3]=t[3]*o),e};_e.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]};_e.lerp=function(e,t,r,i){var n=t[0],a=t[1],o=t[2],s=t[3];return e[0]=n+i*(r[0]-n),e[1]=a+i*(r[1]-a),e[2]=o+i*(r[2]-o),e[3]=s+i*(r[3]-s),e};_e.random=function(e,t){return t=t||1,e[0]=qi(),e[1]=qi(),e[2]=qi(),e[3]=qi(),_e.normalize(e,e),_e.scale(e,e,t),e};_e.transformMat4=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3];return e[0]=r[0]*i+r[4]*n+r[8]*a+r[12]*o,e[1]=r[1]*i+r[5]*n+r[9]*a+r[13]*o,e[2]=r[2]*i+r[6]*n+r[10]*a+r[14]*o,e[3]=r[3]*i+r[7]*n+r[11]*a+r[15]*o,e};_e.transformQuat=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=r[0],s=r[1],l=r[2],h=r[3],u=h*i+s*a-l*n,f=h*n+l*i-o*a,d=h*a+o*n-s*i,c=-o*i-s*n-l*a;return e[0]=u*h+c*-o+f*-l-d*-s,e[1]=f*h+c*-s+d*-o-u*-l,e[2]=d*h+c*-l+u*-s-f*-o,e};_e.forEach=function(){var e=_e.create();return function(t,r,i,n,a,o){var s,l;for(r||(r=4),i||(i=0),n?l=Math.min(n*r+i,t.length):l=t.length,s=i;s<l;s+=r)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}}();const $=_e;var _t={};_t.create=function(){var e=new Lt(9);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e};_t.fromMat4=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e};_t.clone=function(e){var t=new Lt(9);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t};_t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e};_t.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e};_t.transpose=function(e,t){if(e===t){var r=t[1],i=t[2],n=t[5];e[1]=t[3],e[2]=t[6],e[3]=r,e[5]=t[7],e[6]=i,e[7]=n}else e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8];return e};_t.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],h=t[7],u=t[8],f=u*o-s*h,d=-u*a+s*l,c=h*a-o*l,v=r*f+i*d+n*c;return v?(v=1/v,e[0]=f*v,e[1]=(-u*i+n*h)*v,e[2]=(s*i-n*o)*v,e[3]=d*v,e[4]=(u*r-n*l)*v,e[5]=(-s*r+n*a)*v,e[6]=c*v,e[7]=(-h*r+i*l)*v,e[8]=(o*r-i*a)*v,e):null};_t.adjoint=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],h=t[7],u=t[8];return e[0]=o*u-s*h,e[1]=n*h-i*u,e[2]=i*s-n*o,e[3]=s*l-a*u,e[4]=r*u-n*l,e[5]=n*a-r*s,e[6]=a*h-o*l,e[7]=i*l-r*h,e[8]=r*o-i*a,e};_t.determinant=function(e){var t=e[0],r=e[1],i=e[2],n=e[3],a=e[4],o=e[5],s=e[6],l=e[7],h=e[8];return t*(h*a-o*l)+r*(-h*n+o*s)+i*(l*n-a*s)};_t.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=t[6],u=t[7],f=t[8],d=r[0],c=r[1],v=r[2],p=r[3],g=r[4],m=r[5],_=r[6],x=r[7],y=r[8];return e[0]=d*i+c*o+v*h,e[1]=d*n+c*s+v*u,e[2]=d*a+c*l+v*f,e[3]=p*i+g*o+m*h,e[4]=p*n+g*s+m*u,e[5]=p*a+g*l+m*f,e[6]=_*i+x*o+y*h,e[7]=_*n+x*s+y*u,e[8]=_*a+x*l+y*f,e};_t.mul=_t.multiply;_t.translate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=t[6],u=t[7],f=t[8],d=r[0],c=r[1];return e[0]=i,e[1]=n,e[2]=a,e[3]=o,e[4]=s,e[5]=l,e[6]=d*i+c*o+h,e[7]=d*n+c*s+u,e[8]=d*a+c*l+f,e};_t.rotate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=t[6],u=t[7],f=t[8],d=Math.sin(r),c=Math.cos(r);return e[0]=c*i+d*o,e[1]=c*n+d*s,e[2]=c*a+d*l,e[3]=c*o-d*i,e[4]=c*s-d*n,e[5]=c*l-d*a,e[6]=h,e[7]=u,e[8]=f,e};_t.scale=function(e,t,r){var i=r[0],n=r[1];return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=n*t[3],e[4]=n*t[4],e[5]=n*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e};_t.fromMat2d=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=0,e[3]=t[2],e[4]=t[3],e[5]=0,e[6]=t[4],e[7]=t[5],e[8]=1,e};_t.fromQuat=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r+r,s=i+i,l=n+n,h=r*o,u=i*o,f=i*s,d=n*o,c=n*s,v=n*l,p=a*o,g=a*s,m=a*l;return e[0]=1-f-v,e[3]=u-m,e[6]=d+g,e[1]=u+m,e[4]=1-h-v,e[7]=c-p,e[2]=d-g,e[5]=c+p,e[8]=1-h-f,e};_t.normalFromMat4=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=t[6],h=t[7],u=t[8],f=t[9],d=t[10],c=t[11],v=t[12],p=t[13],g=t[14],m=t[15],_=r*s-i*o,x=r*l-n*o,y=r*h-a*o,T=i*l-n*s,w=i*h-a*s,E=n*h-a*l,S=u*p-f*v,D=u*g-d*v,M=u*m-c*v,C=f*g-d*p,N=f*m-c*p,O=d*m-c*g,P=_*O-x*N+y*C+T*M-w*D+E*S;return P?(P=1/P,e[0]=(s*O-l*N+h*C)*P,e[1]=(l*M-o*O-h*D)*P,e[2]=(o*N-s*M+h*S)*P,e[3]=(n*N-i*O-a*C)*P,e[4]=(r*O-n*M+a*D)*P,e[5]=(i*M-r*N-a*S)*P,e[6]=(p*E-g*w+m*T)*P,e[7]=(g*y-v*E-m*x)*P,e[8]=(v*w-p*y+m*_)*P,e):null};_t.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+Math.pow(e[6],2)+Math.pow(e[7],2)+Math.pow(e[8],2))};const Ce=_t;var Re={};Re.create=function(){var e=new Lt(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e};Re.rotationTo=function(){var e=A.create(),t=A.fromValues(1,0,0),r=A.fromValues(0,1,0);return function(i,n,a){var o=A.dot(n,a);return o<-.999999?(A.cross(e,t,n),A.length(e)<1e-6&&A.cross(e,r,n),A.normalize(e,e),Re.setAxisAngle(i,e,Math.PI),i):o>.999999?(i[0]=0,i[1]=0,i[2]=0,i[3]=1,i):(A.cross(e,n,a),i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=1+o,Re.normalize(i,i))}}();Re.setAxes=function(){var e=Ce.create();return function(t,r,i,n){return e[0]=i[0],e[3]=i[1],e[6]=i[2],e[1]=n[0],e[4]=n[1],e[7]=n[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],Re.normalize(t,Re.fromMat3(t,e))}}();Re.clone=$.clone;Re.fromValues=$.fromValues;Re.copy=$.copy;Re.set=$.set;Re.identity=function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e};Re.setAxisAngle=function(e,t,r){r=r*.5;var i=Math.sin(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=Math.cos(r),e};Re.add=$.add;Re.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=r[0],l=r[1],h=r[2],u=r[3];return e[0]=i*u+o*s+n*h-a*l,e[1]=n*u+o*l+a*s-i*h,e[2]=a*u+o*h+i*l-n*s,e[3]=o*u-i*s-n*l-a*h,e};Re.mul=Re.multiply;Re.scale=$.scale;Re.rotateX=function(e,t,r){r*=.5;var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+o*s,e[1]=n*l+a*s,e[2]=a*l-n*s,e[3]=o*l-i*s,e};Re.rotateY=function(e,t,r){r*=.5;var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l-a*s,e[1]=n*l+o*s,e[2]=a*l+i*s,e[3]=o*l-n*s,e};Re.rotateZ=function(e,t,r){r*=.5;var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+n*s,e[1]=n*l-i*s,e[2]=a*l+o*s,e[3]=o*l-a*s,e};Re.calculateW=function(e,t){var r=t[0],i=t[1],n=t[2];return e[0]=r,e[1]=i,e[2]=n,e[3]=Math.sqrt(Math.abs(1-r*r-i*i-n*n)),e};Re.dot=$.dot;Re.lerp=$.lerp;Re.slerp=function(e,t,r,i){var n=t[0],a=t[1],o=t[2],s=t[3],l=r[0],h=r[1],u=r[2],f=r[3],d,c,v,p,g;return c=n*l+a*h+o*u+s*f,c<0&&(c=-c,l=-l,h=-h,u=-u,f=-f),1-c>1e-6?(d=Math.acos(c),v=Math.sin(d),p=Math.sin((1-i)*d)/v,g=Math.sin(i*d)/v):(p=1-i,g=i),e[0]=p*n+g*l,e[1]=p*a+g*h,e[2]=p*o+g*u,e[3]=p*s+g*f,e};Re.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r*r+i*i+n*n+a*a,s=o?1/o:0;return e[0]=-r*s,e[1]=-i*s,e[2]=-n*s,e[3]=a*s,e};Re.conjugate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e};Re.length=$.length;Re.len=Re.length;Re.squaredLength=$.squaredLength;Re.sqrLen=Re.squaredLength;Re.normalize=$.normalize;Re.fromMat3=function(e,t){var r=t[0]+t[4]+t[8],i;if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,i=.5/i,e[0]=(t[5]-t[7])*i,e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else{var n=0;t[4]>t[0]&&(n=1),t[8]>t[n*3+n]&&(n=2);var a=(n+1)%3,o=(n+2)%3;i=Math.sqrt(t[n*3+n]-t[a*3+a]-t[o*3+o]+1),e[n]=.5*i,i=.5/i,e[3]=(t[a*3+o]-t[o*3+a])*i,e[a]=(t[a*3+n]+t[n*3+a])*i,e[o]=(t[o*3+n]+t[n*3+o])*i}return e};const ce=Re;var Ze=function(){this._axisX=new Z,this._axisY=new Z,this._axisZ=new Z,this.array=W.create(),this._dirty=!0};Ze.prototype={constructor:Ze,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},adjoint:function(){return W.adjoint(this.array,this.array),this._dirty=!0,this},clone:function(){return new Ze().copy(this)},copy:function(e){return W.copy(this.array,e.array),this._dirty=!0,this},determinant:function(){return W.determinant(this.array)},fromQuat:function(e){return W.fromQuat(this.array,e.array),this._dirty=!0,this},fromRotationTranslation:function(e,t){return W.fromRotationTranslation(this.array,e.array,t.array),this._dirty=!0,this},fromMat2d:function(e){return Ze.fromMat2d(this,e),this},frustum:function(e,t,r,i,n,a){return W.frustum(this.array,e,t,r,i,n,a),this._dirty=!0,this},identity:function(){return W.identity(this.array),this._dirty=!0,this},invert:function(){return W.invert(this.array,this.array),this._dirty=!0,this},lookAt:function(e,t,r){return W.lookAt(this.array,e.array,t.array,r.array),this._dirty=!0,this},mul:function(e){return W.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return W.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return W.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return W.multiply(this.array,e.array,this.array),this._dirty=!0,this},ortho:function(e,t,r,i,n,a){return W.ortho(this.array,e,t,r,i,n,a),this._dirty=!0,this},perspective:function(e,t,r,i){return W.perspective(this.array,e,t,r,i),this._dirty=!0,this},rotate:function(e,t){return W.rotate(this.array,this.array,e,t.array),this._dirty=!0,this},rotateX:function(e){return W.rotateX(this.array,this.array,e),this._dirty=!0,this},rotateY:function(e){return W.rotateY(this.array,this.array,e),this._dirty=!0,this},rotateZ:function(e){return W.rotateZ(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return W.scale(this.array,this.array,e.array),this._dirty=!0,this},translate:function(e){return W.translate(this.array,this.array,e.array),this._dirty=!0,this},transpose:function(){return W.transpose(this.array,this.array),this._dirty=!0,this},decomposeMatrix:function(){var e=A.create(),t=A.create(),r=A.create(),i=Ce.create();return function(n,a,o){var s=this.array;A.set(e,s[0],s[1],s[2]),A.set(t,s[4],s[5],s[6]),A.set(r,s[8],s[9],s[10]);var l=A.length(e),h=A.length(t),u=A.length(r),f=this.determinant();f<0&&(l=-l),n&&n.set(l,h,u),o.set(s[12],s[13],s[14]),Ce.fromMat4(i,s),i[0]/=l,i[1]/=l,i[2]/=l,i[3]/=h,i[4]/=h,i[5]/=h,i[6]/=u,i[7]/=u,i[8]/=u,ce.fromMat3(a.array,i),ce.normalize(a.array,a.array),a._dirty=!0,o._dirty=!0}}(),toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var Ta=Object.defineProperty;if(Ta){var No=Ze.prototype;Ta(No,"z",{get:function(){var e=this.array;return this._axisZ.set(e[8],e[9],e[10]),this._axisZ},set:function(e){var t=this.array;e=e.array,t[8]=e[0],t[9]=e[1],t[10]=e[2],this._dirty=!0}}),Ta(No,"y",{get:function(){var e=this.array;return this._axisY.set(e[4],e[5],e[6]),this._axisY},set:function(e){var t=this.array;e=e.array,t[4]=e[0],t[5]=e[1],t[6]=e[2],this._dirty=!0}}),Ta(No,"x",{get:function(){var e=this.array;return this._axisX.set(e[0],e[1],e[2]),this._axisX},set:function(e){var t=this.array;e=e.array,t[0]=e[0],t[1]=e[1],t[2]=e[2],this._dirty=!0}})}Ze.adjoint=function(e,t){return W.adjoint(e.array,t.array),e._dirty=!0,e};Ze.copy=function(e,t){return W.copy(e.array,t.array),e._dirty=!0,e};Ze.determinant=function(e){return W.determinant(e.array)};Ze.identity=function(e){return W.identity(e.array),e._dirty=!0,e};Ze.ortho=function(e,t,r,i,n,a,o){return W.ortho(e.array,t,r,i,n,a,o),e._dirty=!0,e};Ze.perspective=function(e,t,r,i,n){return W.perspective(e.array,t,r,i,n),e._dirty=!0,e};Ze.lookAt=function(e,t,r,i){return W.lookAt(e.array,t.array,r.array,i.array),e._dirty=!0,e};Ze.invert=function(e,t){return W.invert(e.array,t.array),e._dirty=!0,e};Ze.mul=function(e,t,r){return W.mul(e.array,t.array,r.array),e._dirty=!0,e};Ze.multiply=Ze.mul;Ze.fromQuat=function(e,t){return W.fromQuat(e.array,t.array),e._dirty=!0,e};Ze.fromRotationTranslation=function(e,t,r){return W.fromRotationTranslation(e.array,t.array,r.array),e._dirty=!0,e};Ze.fromMat2d=function(i,r){i._dirty=!0;var r=r.array,i=i.array;return i[0]=r[0],i[4]=r[2],i[12]=r[4],i[1]=r[1],i[5]=r[3],i[13]=r[5],i};Ze.rotate=function(e,t,r,i){return W.rotate(e.array,t.array,r,i.array),e._dirty=!0,e};Ze.rotateX=function(e,t,r){return W.rotateX(e.array,t.array,r),e._dirty=!0,e};Ze.rotateY=function(e,t,r){return W.rotateY(e.array,t.array,r),e._dirty=!0,e};Ze.rotateZ=function(e,t,r){return W.rotateZ(e.array,t.array,r),e._dirty=!0,e};Ze.scale=function(e,t,r){return W.scale(e.array,t.array,r.array),e._dirty=!0,e};Ze.transpose=function(e,t){return W.transpose(e.array,t.array),e._dirty=!0,e};Ze.translate=function(e,t,r){return W.translate(e.array,t.array,r.array),e._dirty=!0,e};const re=Ze;var Ie=function(e,t,r,i){e=e||0,t=t||0,r=r||0,i=i===void 0?1:i,this.array=ce.fromValues(e,t,r,i),this._dirty=!0};Ie.prototype={constructor:Ie,add:function(e){return ce.add(this.array,this.array,e.array),this._dirty=!0,this},calculateW:function(){return ce.calculateW(this.array,this.array),this._dirty=!0,this},set:function(e,t,r,i){return this.array[0]=e,this.array[1]=t,this.array[2]=r,this.array[3]=i,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this.array[2]=e[2],this.array[3]=e[3],this._dirty=!0,this},clone:function(){return new Ie(this.x,this.y,this.z,this.w)},conjugate:function(){return ce.conjugate(this.array,this.array),this._dirty=!0,this},copy:function(e){return ce.copy(this.array,e.array),this._dirty=!0,this},dot:function(e){return ce.dot(this.array,e.array)},fromMat3:function(e){return ce.fromMat3(this.array,e.array),this._dirty=!0,this},fromMat4:function(){var e=Ce.create();return function(t){return Ce.fromMat4(e,t.array),Ce.transpose(e,e),ce.fromMat3(this.array,e),this._dirty=!0,this}}(),identity:function(){return ce.identity(this.array),this._dirty=!0,this},invert:function(){return ce.invert(this.array,this.array),this._dirty=!0,this},len:function(){return ce.len(this.array)},length:function(){return ce.length(this.array)},lerp:function(e,t,r){return ce.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},mul:function(e){return ce.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return ce.multiply(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return ce.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return ce.multiply(this.array,e.array,this.array),this._dirty=!0,this},normalize:function(){return ce.normalize(this.array,this.array),this._dirty=!0,this},rotateX:function(e){return ce.rotateX(this.array,this.array,e),this._dirty=!0,this},rotateY:function(e){return ce.rotateY(this.array,this.array,e),this._dirty=!0,this},rotateZ:function(e){return ce.rotateZ(this.array,this.array,e),this._dirty=!0,this},rotationTo:function(e,t){return ce.rotationTo(this.array,e.array,t.array),this._dirty=!0,this},setAxes:function(e,t,r){return ce.setAxes(this.array,e.array,t.array,r.array),this._dirty=!0,this},setAxisAngle:function(e,t){return ce.setAxisAngle(this.array,e.array,t),this._dirty=!0,this},slerp:function(e,t,r){return ce.slerp(this.array,e.array,t.array,r),this._dirty=!0,this},sqrLen:function(){return ce.sqrLen(this.array)},squaredLength:function(){return ce.squaredLength(this.array)},fromEuler:function(e,t){return Ie.fromEuler(this,e,t)},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var Tn=Object.defineProperty;if(Tn){var wa=Ie.prototype;Tn(wa,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),Tn(wa,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}}),Tn(wa,"z",{get:function(){return this.array[2]},set:function(e){this.array[2]=e,this._dirty=!0}}),Tn(wa,"w",{get:function(){return this.array[3]},set:function(e){this.array[3]=e,this._dirty=!0}})}Ie.add=function(e,t,r){return ce.add(e.array,t.array,r.array),e._dirty=!0,e};Ie.set=function(e,t,r,i,n){ce.set(e.array,t,r,i,n),e._dirty=!0};Ie.copy=function(e,t){return ce.copy(e.array,t.array),e._dirty=!0,e};Ie.calculateW=function(e,t){return ce.calculateW(e.array,t.array),e._dirty=!0,e};Ie.conjugate=function(e,t){return ce.conjugate(e.array,t.array),e._dirty=!0,e};Ie.identity=function(e){return ce.identity(e.array),e._dirty=!0,e};Ie.invert=function(e,t){return ce.invert(e.array,t.array),e._dirty=!0,e};Ie.dot=function(e,t){return ce.dot(e.array,t.array)};Ie.len=function(e){return ce.length(e.array)};Ie.lerp=function(e,t,r,i){return ce.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};Ie.slerp=function(e,t,r,i){return ce.slerp(e.array,t.array,r.array,i),e._dirty=!0,e};Ie.mul=function(e,t,r){return ce.multiply(e.array,t.array,r.array),e._dirty=!0,e};Ie.multiply=Ie.mul;Ie.rotateX=function(e,t,r){return ce.rotateX(e.array,t.array,r),e._dirty=!0,e};Ie.rotateY=function(e,t,r){return ce.rotateY(e.array,t.array,r),e._dirty=!0,e};Ie.rotateZ=function(e,t,r){return ce.rotateZ(e.array,t.array,r),e._dirty=!0,e};Ie.setAxisAngle=function(e,t,r){return ce.setAxisAngle(e.array,t.array,r),e._dirty=!0,e};Ie.normalize=function(e,t){return ce.normalize(e.array,t.array),e._dirty=!0,e};Ie.sqrLen=function(e){return ce.sqrLen(e.array)};Ie.squaredLength=Ie.sqrLen;Ie.fromMat3=function(e,t){return ce.fromMat3(e.array,t.array),e._dirty=!0,e};Ie.setAxes=function(e,t,r,i){return ce.setAxes(e.array,t.array,r.array,i.array),e._dirty=!0,e};Ie.rotationTo=function(e,t,r){return ce.rotationTo(e.array,t.array,r.array),e._dirty=!0,e};Ie.fromEuler=function(e,t,u){e._dirty=!0,t=t.array;var i=e.array,n=Math.cos(t[0]/2),a=Math.cos(t[1]/2),o=Math.cos(t[2]/2),s=Math.sin(t[0]/2),l=Math.sin(t[1]/2),h=Math.sin(t[2]/2),u=(u||"XYZ").toUpperCase();switch(u){case"XYZ":i[0]=s*a*o+n*l*h,i[1]=n*l*o-s*a*h,i[2]=n*a*h+s*l*o,i[3]=n*a*o-s*l*h;break;case"YXZ":i[0]=s*a*o+n*l*h,i[1]=n*l*o-s*a*h,i[2]=n*a*h-s*l*o,i[3]=n*a*o+s*l*h;break;case"ZXY":i[0]=s*a*o-n*l*h,i[1]=n*l*o+s*a*h,i[2]=n*a*h+s*l*o,i[3]=n*a*o-s*l*h;break;case"ZYX":i[0]=s*a*o-n*l*h,i[1]=n*l*o+s*a*h,i[2]=n*a*h-s*l*o,i[3]=n*a*o+s*l*h;break;case"YZX":i[0]=s*a*o+n*l*h,i[1]=n*l*o+s*a*h,i[2]=n*a*h-s*l*o,i[3]=n*a*o-s*l*h;break;case"XZY":i[0]=s*a*o-n*l*h,i[1]=n*l*o-s*a*h,i[2]=n*a*h+s*l*o,i[3]=n*a*o+s*l*h;break}};const su=Ie;var Yr=A.set,ba=A.copy,Oa=function(e,t){this.min=e||new Z(1/0,1/0,1/0),this.max=t||new Z(-1/0,-1/0,-1/0),this.vertices=null};Oa.prototype={constructor:Oa,updateFromVertices:function(e){if(e.length>0){var t=this.min,r=this.max,i=t.array,n=r.array;ba(i,e[0]),ba(n,e[0]);for(var a=1;a<e.length;a++){var o=e[a];o[0]<i[0]&&(i[0]=o[0]),o[1]<i[1]&&(i[1]=o[1]),o[2]<i[2]&&(i[2]=o[2]),o[0]>n[0]&&(n[0]=o[0]),o[1]>n[1]&&(n[1]=o[1]),o[2]>n[2]&&(n[2]=o[2])}t._dirty=!0,r._dirty=!0}},union:function(e){var t=this.min,r=this.max;return A.min(t.array,t.array,e.min.array),A.max(r.array,r.array,e.max.array),t._dirty=!0,r._dirty=!0,this},intersection:function(e){var t=this.min,r=this.max;return A.max(t.array,t.array,e.min.array),A.min(r.array,r.array,e.max.array),t._dirty=!0,r._dirty=!0,this},intersectBoundingBox:function(e){var t=this.min.array,r=this.max.array,i=e.min.array,n=e.max.array;return!(t[0]>n[0]||t[1]>n[1]||t[2]>n[2]||r[0]<i[0]||r[1]<i[1]||r[2]<i[2])},containBoundingBox:function(e){var t=this.min.array,r=this.max.array,i=e.min.array,n=e.max.array;return t[0]<=i[0]&&t[1]<=i[1]&&t[2]<=i[2]&&r[0]>=n[0]&&r[1]>=n[1]&&r[2]>=n[2]},containPoint:function(e){var t=this.min.array,r=this.max.array,i=e.array;return t[0]<=i[0]&&t[1]<=i[1]&&t[2]<=i[2]&&r[0]>=i[0]&&r[1]>=i[1]&&r[2]>=i[2]},isFinite:function(){var e=this.min.array,t=this.max.array;return isFinite(e[0])&&isFinite(e[1])&&isFinite(e[2])&&isFinite(t[0])&&isFinite(t[1])&&isFinite(t[2])},applyTransform:function(e){this.transformFrom(this,e)},transformFrom:function(){var e=A.create(),t=A.create(),r=A.create(),i=A.create(),n=A.create(),a=A.create();return function(o,s){var l=o.min.array,h=o.max.array,u=s.array;return e[0]=u[0]*l[0],e[1]=u[1]*l[0],e[2]=u[2]*l[0],t[0]=u[0]*h[0],t[1]=u[1]*h[0],t[2]=u[2]*h[0],r[0]=u[4]*l[1],r[1]=u[5]*l[1],r[2]=u[6]*l[1],i[0]=u[4]*h[1],i[1]=u[5]*h[1],i[2]=u[6]*h[1],n[0]=u[8]*l[2],n[1]=u[9]*l[2],n[2]=u[10]*l[2],a[0]=u[8]*h[2],a[1]=u[9]*h[2],a[2]=u[10]*h[2],l=this.min.array,h=this.max.array,l[0]=Math.min(e[0],t[0])+Math.min(r[0],i[0])+Math.min(n[0],a[0])+u[12],l[1]=Math.min(e[1],t[1])+Math.min(r[1],i[1])+Math.min(n[1],a[1])+u[13],l[2]=Math.min(e[2],t[2])+Math.min(r[2],i[2])+Math.min(n[2],a[2])+u[14],h[0]=Math.max(e[0],t[0])+Math.max(r[0],i[0])+Math.max(n[0],a[0])+u[12],h[1]=Math.max(e[1],t[1])+Math.max(r[1],i[1])+Math.max(n[1],a[1])+u[13],h[2]=Math.max(e[2],t[2])+Math.max(r[2],i[2])+Math.max(n[2],a[2])+u[14],this.min._dirty=!0,this.max._dirty=!0,this}}(),applyProjection:function(e){var t=this.min.array,r=this.max.array,i=e.array,n=t[0],a=t[1],o=t[2],s=r[0],l=r[1],h=t[2],u=r[0],f=r[1],d=r[2];if(i[15]===1)t[0]=i[0]*n+i[12],t[1]=i[5]*a+i[13],r[2]=i[10]*o+i[14],r[0]=i[0]*u+i[12],r[1]=i[5]*f+i[13],t[2]=i[10]*d+i[14];else{var c=-1/o;t[0]=i[0]*n*c,t[1]=i[5]*a*c,r[2]=(i[10]*o+i[14])*c,c=-1/h,r[0]=i[0]*s*c,r[1]=i[5]*l*c,c=-1/d,t[2]=(i[10]*d+i[14])*c}return this.min._dirty=!0,this.max._dirty=!0,this},updateVertices:function(){var e=this.vertices;if(!e){e=[];for(var t=0;t<8;t++)e[t]=A.fromValues(0,0,0);this.vertices=e}var r=this.min.array,i=this.max.array;return Yr(e[0],r[0],r[1],r[2]),Yr(e[1],r[0],i[1],r[2]),Yr(e[2],i[0],r[1],r[2]),Yr(e[3],i[0],i[1],r[2]),Yr(e[4],r[0],r[1],i[2]),Yr(e[5],r[0],i[1],i[2]),Yr(e[6],i[0],r[1],i[2]),Yr(e[7],i[0],i[1],i[2]),this},copy:function(e){var t=this.min,r=this.max;return ba(t.array,e.min.array),ba(r.array,e.max.array),t._dirty=!0,r._dirty=!0,this},clone:function(){var e=new Oa;return e.copy(this),e}};const Nt=Oa;var hd=0,ud=Bt.extend({name:"",position:null,rotation:null,scale:null,worldTransform:null,localTransform:null,autoUpdateLocalTransform:!0,_parent:null,_scene:null,_needsUpdateWorldTransform:!0,_inIterating:!1,__depth:0},function(){this.name||(this.name=(this.type||"NODE")+"_"+hd++),this.position||(this.position=new Z),this.rotation||(this.rotation=new su),this.scale||(this.scale=new Z(1,1,1)),this.worldTransform=new re,this.localTransform=new re,this._children=[]},{target:null,invisible:!1,isSkinnedMesh:function(){return!1},isRenderable:function(){return!1},setName:function(e){var t=this._scene;if(t){var r=t._nodeRepository;delete r[this.name],r[e]=this}this.name=e},add:function(e){var t=e._parent;if(t!==this){t&&t.remove(e),e._parent=this,this._children.push(e);var r=this._scene;r&&r!==e.scene&&e.traverse(this._addSelfToScene,this),e._needsUpdateWorldTransform=!0}},remove:function(e){var t=this._children,r=t.indexOf(e);r<0||(t.splice(r,1),e._parent=null,this._scene&&e.traverse(this._removeSelfFromScene,this))},removeAll:function(){for(var e=this._children,t=0;t<e.length;t++)e[t]._parent=null,this._scene&&e[t].traverse(this._removeSelfFromScene,this);this._children=[]},getScene:function(){return this._scene},getParent:function(){return this._parent},_removeSelfFromScene:function(e){e._scene.removeFromScene(e),e._scene=null},_addSelfToScene:function(e){this._scene.addToScene(e),e._scene=this._scene},isAncestor:function(e){for(var t=e._parent;t;){if(t===this)return!0;t=t._parent}return!1},children:function(){return this._children.slice()},childAt:function(e){return this._children[e]},getChildByName:function(e){for(var t=this._children,r=0;r<t.length;r++)if(t[r].name===e)return t[r]},getDescendantByName:function(e){for(var t=this._children,r=0;r<t.length;r++){var i=t[r];if(i.name===e)return i;var n=i.getDescendantByName(e);if(n)return n}},queryNode:function(e){if(e){for(var t=e.split("/"),r=this,i=0;i<t.length;i++){var n=t[i];if(n){for(var a=!1,o=r._children,s=0;s<o.length;s++){var l=o[s];if(l.name===n){r=l,a=!0;break}}if(!a)return}}return r}},getPath:function(e){if(!this._parent)return"/";for(var t=this._parent,r=this.name;t._parent&&(r=t.name+"/"+r,t._parent!=e);)t=t._parent;return!t._parent&&e?null:r},traverse:function(e,t){e.call(t,this);for(var r=this._children,i=0,n=r.length;i<n;i++)r[i].traverse(e,t)},eachChild:function(e,t){for(var r=this._children,i=0,n=r.length;i<n;i++){var a=r[i];e.call(t,a,i)}},setLocalTransform:function(e){W.copy(this.localTransform.array,e.array),this.decomposeLocalTransform()},decomposeLocalTransform:function(e){var t=e?null:this.scale;this.localTransform.decomposeMatrix(t,this.rotation,this.position)},setWorldTransform:function(e){W.copy(this.worldTransform.array,e.array),this.decomposeWorldTransform()},decomposeWorldTransform:function(){var e=W.create();return function(t){var r=this.localTransform,i=this.worldTransform;this._parent?(W.invert(e,this._parent.worldTransform.array),W.multiply(r.array,e,i.array)):W.copy(r.array,i.array);var n=t?null:this.scale;r.decomposeMatrix(n,this.rotation,this.position)}}(),transformNeedsUpdate:function(){return this.position._dirty||this.rotation._dirty||this.scale._dirty},updateLocalTransform:function(){var e=this.position,t=this.rotation,r=this.scale;if(this.transformNeedsUpdate()){var i=this.localTransform.array;W.fromRotationTranslation(i,t.array,e.array),W.scale(i,i,r.array),t._dirty=!1,r._dirty=!1,e._dirty=!1,this._needsUpdateWorldTransform=!0}},_updateWorldTransformTopDown:function(){var e=this.localTransform.array,t=this.worldTransform.array;this._parent?W.multiplyAffine(t,this._parent.worldTransform.array,e):W.copy(t,e)},updateWorldTransform:function(){for(var e=this;e&&e.getParent()&&e.getParent().transformNeedsUpdate();)e=e.getParent();e.update()},update:function(e){this.autoUpdateLocalTransform?this.updateLocalTransform():e=!0,(e||this._needsUpdateWorldTransform)&&(this._updateWorldTransformTopDown(),e=!0,this._needsUpdateWorldTransform=!1);for(var t=this._children,r=0,i=t.length;r<i;r++)t[r].update(e)},getBoundingBox:function(){function e(n){return!n.invisible&&n.geometry}var t=new Nt,r=new re,i=new re;return function(n,a){return a=a||new Nt,this._parent?re.invert(i,this._parent.worldTransform):re.identity(i),this.traverse(function(o){o.geometry&&o.geometry.boundingBox&&(t.copy(o.geometry.boundingBox),re.multiply(r,i,o.worldTransform),t.applyTransform(r),a.union(t))},this,e),a}}(),getWorldPosition:function(e){this.transformNeedsUpdate()&&this.updateWorldTransform();var t=this.worldTransform.array;if(e){var r=e.array;return r[0]=t[12],r[1]=t[13],r[2]=t[14],e}else return new Z(t[12],t[13],t[14])},clone:function(){var e=new this.constructor,t=this._children;e.setName(this.name),e.position.copy(this.position),e.rotation.copy(this.rotation),e.scale.copy(this.scale);for(var r=0;r<t.length;r++)e.add(t[r].clone());return e},rotateAround:function(){var e=new Z,t=new re;return function(r,i,n){e.copy(this.position).subtract(r);var a=this.localTransform;a.identity(),a.translate(r),a.rotate(n,i),t.fromRotationTranslation(this.rotation,e),a.multiply(t),a.scale(this.scale),this.decomposeLocalTransform(),this._needsUpdateWorldTransform=!0}}(),lookAt:function(){var e=new re;return function(t,r){e.lookAt(this.position,t,r||this.localTransform.y).invert(),this.setLocalTransform(e),this.target=t}}()});const gr=ud;var jt=gr.extend({material:null,geometry:null,mode:I.TRIANGLES,_renderInfo:null},{__program:null,lightGroup:0,renderOrder:0,culling:!0,cullFace:I.BACK,frontFace:I.CCW,frustumCulling:!0,receiveShadow:!0,castShadow:!0,ignorePicking:!1,ignorePreZ:!1,ignoreGBuffer:!1,isRenderable:function(){return this.geometry&&this.material&&this.material.shader&&!this.invisible&&this.geometry.vertexCount>0},beforeRender:function(e){},afterRender:function(e,t){},getBoundingBox:function(e,t){return t=gr.prototype.getBoundingBox.call(this,e,t),this.geometry&&this.geometry.boundingBox&&t.union(this.geometry.boundingBox),t},clone:function(){var e=["castShadow","receiveShadow","mode","culling","cullFace","frontFace","frustumCulling","renderOrder","lineWidth","ignorePicking","ignorePreZ","ignoreGBuffer"];return function(){var t=gr.prototype.clone.call(this);t.geometry=this.geometry,t.material=this.material;for(var r=0;r<e.length;r++){var i=e[r];t[i]!==this[i]&&(t[i]=this[i])}return t}}()});jt.POINTS=I.POINTS;jt.LINES=I.LINES;jt.LINE_LOOP=I.LINE_LOOP;jt.LINE_STRIP=I.LINE_STRIP;jt.TRIANGLES=I.TRIANGLES;jt.TRIANGLE_STRIP=I.TRIANGLE_STRIP;jt.TRIANGLE_FAN=I.TRIANGLE_FAN;jt.BACK=I.BACK;jt.FRONT=I.FRONT;jt.FRONT_AND_BACK=I.FRONT_AND_BACK;jt.CW=I.CW;jt.CCW=I.CCW;const os=jt;var Ss=Bt.extend({scene:null,camera:null,renderer:null},function(){this._ray=new Ga,this._ndc=new Vt},{pick:function(e,t,r){var i=this.pickAll(e,t,[],r);return i[0]||null},pickAll:function(e,t,r,i){return this.renderer.screenToNDC(e,t,this._ndc),this.camera.castRay(this._ndc,this._ray),r=r||[],this._intersectNode(this.scene,r,i||!1),r.sort(this._intersectionCompareFunc),r},_intersectNode:function(e,t,r){e instanceof os&&e.isRenderable()&&(!e.ignorePicking||r)&&(e.mode===I.TRIANGLES&&e.geometry.isUseIndices()||e.geometry.pickByRay||e.geometry.pick)&&this._intersectRenderable(e,t);for(var i=0;i<e._children.length;i++)this._intersectNode(e._children[i],t,r)},_intersectRenderable:function(){var e=new Z,t=new Z,r=new Z,i=new Ga,n=new re;return function(a,o){var s=a.isSkinnedMesh();i.copy(this._ray),re.invert(n,a.worldTransform),s||i.applyTransform(n);var l=a.geometry,h=s?a.skeleton.boundingBox:l.boundingBox;if(!(h&&!i.intersectBoundingBox(h))){if(l.pick){l.pick(this._ndc.x,this._ndc.y,this.renderer,this.camera,a,o);return}else if(l.pickByRay){l.pickByRay(i,a,o);return}var u=a.cullFace===I.BACK&&a.frontFace===I.CCW||a.cullFace===I.FRONT&&a.frontFace===I.CW,f,d=l.indices,c=l.attributes.position,v=l.attributes.weight,p=l.attributes.joint,g,m=[];if(!(!c||!c.value||!d)){if(s){g=a.skeleton.getSubSkinMatrices(a.__uid__,a.joints);for(var _=0;_<a.joints.length;_++){m[_]=m[_]||[];for(var x=0;x<16;x++)m[_][x]=g[_*16+x]}var y=[],T=[],w=[],E=[],S=[],D=l.attributes.skinnedPosition;(!D||!D.value)&&(l.createAttribute("skinnedPosition","f",3),D=l.attributes.skinnedPosition,D.init(l.vertexCount));for(var _=0;_<l.vertexCount;_++){c.get(_,y),v.get(_,T),p.get(_,w),T[3]=1-T[0]-T[1]-T[2],A.set(E,0,0,0);for(var x=0;x<4;x++)w[x]>=0&&T[x]>1e-4&&(A.transformMat4(S,y,m[w[x]]),A.scaleAndAdd(E,E,S,T[x]));D.set(_,E)}}for(var _=0;_<d.length;_+=3){var M=d[_],C=d[_+1],N=d[_+2],O=s?l.attributes.skinnedPosition:c;if(O.get(M,e.array),O.get(C,t.array),O.get(N,r.array),u?f=i.intersectTriangle(e,t,r,a.culling):f=i.intersectTriangle(e,r,t,a.culling),f){var P=new Z;s?Z.copy(P,f):Z.transformMat4(P,f,a.worldTransform),o.push(new Ss.Intersection(f,P,a,[M,C,N],_/3,Z.dist(P,this._ray.origin)))}}}}}}(),_intersectionCompareFunc:function(e,t){return e.distance-t.distance}});Ss.Intersection=function(e,t,r,i,n,a){this.point=e,this.pointWorld=t,this.target=r,this.triangle=i,this.triangleIndex=n,this.distance=a};const fd=Ss;var wn="__dt__",ka=function(){this._contextId=0,this._caches=[],this._context={}};ka.prototype={use:function(e,t){var r=this._caches;r[e]||(r[e]={},t&&(r[e]=t())),this._contextId=e,this._context=r[e]},put:function(e,t){this._context[e]=t},get:function(e){return this._context[e]},dirty:function(e){e=e||"";var t=wn+e;this.put(t,!0)},dirtyAll:function(e){e=e||"";for(var t=wn+e,r=this._caches,i=0;i<r.length;i++)r[i]&&(r[i][t]=!0)},fresh:function(e){e=e||"";var t=wn+e;this.put(t,!1)},freshAll:function(e){e=e||"";for(var t=wn+e,r=this._caches,i=0;i<r.length;i++)r[i]&&(r[i][t]=!1)},isDirty:function(e){e=e||"";var t=wn+e,r=this._context;return!r.hasOwnProperty(t)||r[t]===!0},deleteContext:function(e){delete this._caches[e],this._context={}},delete:function(e){delete this._context[e]},clearAll:function(){this._caches={}},getContext:function(){return this._context},eachContext:function(e,t){var r=Object.keys(this._caches);r.forEach(function(i){e&&e.call(t,i)})},miss:function(e){return!this._context.hasOwnProperty(e)}};ka.prototype.constructor=ka;const Es=ka;var Le=Bt.extend({width:512,height:512,type:I.UNSIGNED_BYTE,format:I.RGBA,wrapS:I.REPEAT,wrapT:I.REPEAT,minFilter:I.LINEAR_MIPMAP_LINEAR,magFilter:I.LINEAR,useMipmap:!0,anisotropic:1,flipY:!0,sRGB:!0,unpackAlignment:4,premultiplyAlpha:!1,dynamic:!1,NPOT:!1,__used:0},function(){this._cache=new Es},{getWebGLTexture:function(e){var t=e.gl,r=this._cache;return r.use(e.__uid__),r.miss("webgl_texture")&&r.put("webgl_texture",t.createTexture()),this.dynamic?this.update(e):r.isDirty()&&(this.update(e),r.fresh()),r.get("webgl_texture")},bind:function(){},unbind:function(){},dirty:function(){this._cache&&this._cache.dirtyAll()},update:function(e){},updateCommon:function(e){var t=e.gl;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,this.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,this.unpackAlignment),this.format===I.DEPTH_COMPONENT&&(this.useMipmap=!1);var r=e.getGLExtension("EXT_sRGB");this.format===Le.SRGB&&!r&&(this.format=Le.RGB),this.format===Le.SRGB_ALPHA&&!r&&(this.format=Le.RGBA),this.NPOT=!this.isPowerOfTwo()},getAvailableWrapS:function(){return this.NPOT?I.CLAMP_TO_EDGE:this.wrapS},getAvailableWrapT:function(){return this.NPOT?I.CLAMP_TO_EDGE:this.wrapT},getAvailableMinFilter:function(){var e=this.minFilter;return this.NPOT||!this.useMipmap?e===I.NEAREST_MIPMAP_NEAREST||e===I.NEAREST_MIPMAP_LINEAR?I.NEAREST:e===I.LINEAR_MIPMAP_LINEAR||e===I.LINEAR_MIPMAP_NEAREST?I.LINEAR:e:e},getAvailableMagFilter:function(){return this.magFilter},nextHighestPowerOfTwo:function(e){--e;for(var t=1;t<32;t<<=1)e=e|e>>t;return e+1},dispose:function(e){var t=this._cache;t.use(e.__uid__);var r=t.get("webgl_texture");r&&e.gl.deleteTexture(r),t.deleteContext(e.__uid__)},isRenderable:function(){},isPowerOfTwo:function(){}});Object.defineProperty(Le.prototype,"width",{get:function(){return this._width},set:function(e){this._width=e}});Object.defineProperty(Le.prototype,"height",{get:function(){return this._height},set:function(e){this._height=e}});Le.BYTE=I.BYTE;Le.UNSIGNED_BYTE=I.UNSIGNED_BYTE;Le.SHORT=I.SHORT;Le.UNSIGNED_SHORT=I.UNSIGNED_SHORT;Le.INT=I.INT;Le.UNSIGNED_INT=I.UNSIGNED_INT;Le.FLOAT=I.FLOAT;Le.HALF_FLOAT=36193;Le.UNSIGNED_INT_24_8_WEBGL=34042;Le.DEPTH_COMPONENT=I.DEPTH_COMPONENT;Le.DEPTH_STENCIL=I.DEPTH_STENCIL;Le.ALPHA=I.ALPHA;Le.RGB=I.RGB;Le.RGBA=I.RGBA;Le.LUMINANCE=I.LUMINANCE;Le.LUMINANCE_ALPHA=I.LUMINANCE_ALPHA;Le.SRGB=35904;Le.SRGB_ALPHA=35906;Le.COMPRESSED_RGB_S3TC_DXT1_EXT=33776;Le.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777;Le.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778;Le.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779;Le.NEAREST=I.NEAREST;Le.LINEAR=I.LINEAR;Le.NEAREST_MIPMAP_NEAREST=I.NEAREST_MIPMAP_NEAREST;Le.LINEAR_MIPMAP_NEAREST=I.LINEAR_MIPMAP_NEAREST;Le.NEAREST_MIPMAP_LINEAR=I.NEAREST_MIPMAP_LINEAR;Le.LINEAR_MIPMAP_LINEAR=I.LINEAR_MIPMAP_LINEAR;Le.REPEAT=I.REPEAT;Le.CLAMP_TO_EDGE=I.CLAMP_TO_EDGE;Le.MIRRORED_REPEAT=I.MIRRORED_REPEAT;const ne=Le;var Zt=os.extend({skeleton:null,joints:null},function(){this.joints||(this.joints=[])},{offsetMatrix:null,isInstancedMesh:function(){return!1},isSkinnedMesh:function(){return!!(this.skeleton&&this.joints&&this.joints.length>0)},clone:function(){var e=os.prototype.clone.call(this);return e.skeleton=this.skeleton,this.joints&&(e.joints=this.joints.slice()),e}});Zt.POINTS=I.POINTS;Zt.LINES=I.LINES;Zt.LINE_LOOP=I.LINE_LOOP;Zt.LINE_STRIP=I.LINE_STRIP;Zt.TRIANGLES=I.TRIANGLES;Zt.TRIANGLE_STRIP=I.TRIANGLE_STRIP;Zt.TRIANGLE_FAN=I.TRIANGLE_FAN;Zt.BACK=I.BACK;Zt.FRONT=I.FRONT;Zt.FRONT_AND_BACK=I.FRONT_AND_BACK;Zt.CW=I.CW;Zt.CCW=I.CCW;const wi=Zt;var to={};to.isPowerOfTwo=function(e){return(e&e-1)===0};to.nextPowerOfTwo=function(e){return e--,e|=e>>1,e|=e>>2,e|=e>>4,e|=e>>8,e|=e>>16,e++,e};to.nearestPowerOfTwo=function(e){return Math.pow(2,Math.round(Math.log(e)/Math.LN2))};const lu=to;var Gl=lu.isPowerOfTwo;function kl(e){return Math.pow(2,Math.round(Math.log(e)/Math.LN2))}function cd(e,t){var r=kl(e.width),i=kl(e.height);t=t||document.createElement("canvas"),t.width=r,t.height=i;var n=t.getContext("2d");return n.drawImage(e.image,0,0,r,i),t}var As=ne.extend(function(){return{image:null,pixels:null,mipmaps:[],convertToPOT:!1}},{textureType:"texture2D",update:function(e){var t=e.gl;t.bindTexture(t.TEXTURE_2D,this._cache.get("webgl_texture")),this.updateCommon(e);var r=this.format,i=this.type,n=!!(this.convertToPOT&&!this.mipmaps.length&&this.image&&(this.wrapS===ne.REPEAT||this.wrapT===ne.REPEAT)&&this.NPOT);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,n?this.wrapS:this.getAvailableWrapS()),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,n?this.wrapT:this.getAvailableWrapT()),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n?this.magFilter:this.getAvailableMagFilter()),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n?this.minFilter:this.getAvailableMinFilter());var a=e.getGLExtension("EXT_texture_filter_anisotropic");if(a&&this.anisotropic>1&&t.texParameterf(t.TEXTURE_2D,a.TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropic),i===36193){var o=e.getGLExtension("OES_texture_half_float");o||(i=I.FLOAT)}if(this.mipmaps.length)for(var s=this.width,l=this.height,h=0;h<this.mipmaps.length;h++){var u=this.mipmaps[h];this._updateTextureData(t,u,h,s,l,r,i,!1),s/=2,l/=2}else this._updateTextureData(t,this,0,this.width,this.height,r,i,n),this.useMipmap&&(!this.NPOT||n)&&t.generateMipmap(t.TEXTURE_2D);t.bindTexture(t.TEXTURE_2D,null)},_updateTextureData:function(e,t,r,i,n,a,o,s){if(t.image){var l=t.image;s&&(this._potCanvas=cd(this,this._potCanvas),l=this._potCanvas),e.texImage2D(e.TEXTURE_2D,r,a,a,o,l)}else a<=ne.COMPRESSED_RGBA_S3TC_DXT5_EXT&&a>=ne.COMPRESSED_RGB_S3TC_DXT1_EXT?e.compressedTexImage2D(e.TEXTURE_2D,r,a,i,n,0,t.pixels):e.texImage2D(e.TEXTURE_2D,r,a,i,n,0,a,o,t.pixels)},generateMipmap:function(e){var t=e.gl;this.useMipmap&&!this.NPOT&&(t.bindTexture(t.TEXTURE_2D,this._cache.get("webgl_texture")),t.generateMipmap(t.TEXTURE_2D))},isPowerOfTwo:function(){return Gl(this.width)&&Gl(this.height)},isRenderable:function(){return this.image?this.image.width>0&&this.image.height>0:!!(this.width&&this.height)},bind:function(e){e.gl.bindTexture(e.gl.TEXTURE_2D,this.getWebGLTexture(e))},unbind:function(e){e.gl.bindTexture(e.gl.TEXTURE_2D,null)},load:function(e,t){var r=ft.createImage();t&&(r.crossOrigin=t);var i=this;return r.onload=function(){i.dirty(),i.trigger("success",i)},r.onerror=function(){i.trigger("error",i)},r.src=e,this.image=r,this}});Object.defineProperty(As.prototype,"width",{get:function(){return this.image?this.image.width:this._width},set:function(e){this.image?console.warn("Texture from image can't set width"):(this._width!==e&&this.dirty(),this._width=e)}});Object.defineProperty(As.prototype,"height",{get:function(){return this.image?this.image.height:this._height},set:function(e){this.image?console.warn("Texture from image can't set height"):(this._height!==e&&this.dirty(),this._height=e)}});const ge=As;function hu(e){return{byte:ft.Int8Array,ubyte:ft.Uint8Array,short:ft.Int16Array,ushort:ft.Uint16Array}[e]||ft.Float32Array}function Io(e){return"attr_"+e}function en(e,t,r,i){switch(this.name=e,this.type=t,this.size=r,this.semantic=i||"",this.value=null,r){case 1:this.get=function(n){return this.value[n]},this.set=function(n,a){this.value[n]=a},this.copy=function(n,a){this.value[n]=this.value[n]};break;case 2:this.get=function(n,a){var o=this.value;return a[0]=o[n*2],a[1]=o[n*2+1],a},this.set=function(n,a){var o=this.value;o[n*2]=a[0],o[n*2+1]=a[1]},this.copy=function(n,a){var o=this.value;a*=2,n*=2,o[n]=o[a],o[n+1]=o[a+1]};break;case 3:this.get=function(n,a){var o=n*3,s=this.value;return a[0]=s[o],a[1]=s[o+1],a[2]=s[o+2],a},this.set=function(n,a){var o=n*3,s=this.value;s[o]=a[0],s[o+1]=a[1],s[o+2]=a[2]},this.copy=function(n,a){var o=this.value;a*=3,n*=3,o[n]=o[a],o[n+1]=o[a+1],o[n+2]=o[a+2]};break;case 4:this.get=function(n,a){var o=this.value,s=n*4;return a[0]=o[s],a[1]=o[s+1],a[2]=o[s+2],a[3]=o[s+3],a},this.set=function(n,a){var o=this.value,s=n*4;o[s]=a[0],o[s+1]=a[1],o[s+2]=a[2],o[s+3]=a[3]},this.copy=function(n,a){var o=this.value;a*=4,n*=4,o[n]=o[a],o[n+1]=o[a+1],o[n+2]=o[a+2],o[n+3]=o[a+3]}}}en.prototype.init=function(e){if(!this.value||this.value.length!==e*this.size){var t=hu(this.type);this.value=new t(e*this.size)}};en.prototype.fromArray=function(e){var t=hu(this.type),r;if(e[0]&&e[0].length){var i=0,n=this.size;r=new t(e.length*n);for(var a=0;a<e.length;a++)for(var o=0;o<n;o++)r[i++]=e[a][o]}else r=new t(e);this.value=r};en.prototype.clone=function(e){var t=new en(this.name,this.type,this.size,this.semantic);return e&&console.warn("todo"),t};function uu(e,t,r,i,n){this.name=e,this.type=t,this.buffer=r,this.size=i,this.semantic=n,this.symbol="",this.needsRemove=!1}function fu(e){this.buffer=e,this.count=0}var Dr=Bt.extend(function(){return{attributes:{},indices:null,dynamic:!0,_enabledAttributes:null,__used:0}},function(){this._cache=new Es,this._attributeList=Object.keys(this.attributes),this.__vaoCache={}},{mainAttribute:"",pick:null,pickByRay:null,dirty:function(){for(var e=this.getEnabledAttributes(),t=0;t<e.length;t++)this.dirtyAttribute(e[t]);this.dirtyIndices(),this._enabledAttributes=null,this._cache.dirty("any")},dirtyIndices:function(){this._cache.dirtyAll("indices")},dirtyAttribute:function(e){this._cache.dirtyAll(Io(e)),this._cache.dirtyAll("attributes")},getTriangleIndices:function(e,t){if(e<this.triangleCount&&e>=0){t||(t=[]);var r=this.indices;return t[0]=r[e*3],t[1]=r[e*3+1],t[2]=r[e*3+2],t}},setTriangleIndices:function(e,t){var r=this.indices;r[e*3]=t[0],r[e*3+1]=t[1],r[e*3+2]=t[2]},isUseIndices:function(){return!!this.indices},initIndicesFromArray:function(e){var t,r=this.vertexCount>65535?ft.Uint32Array:ft.Uint16Array;if(e[0]&&e[0].length){var i=0,n=3;t=new r(e.length*n);for(var a=0;a<e.length;a++)for(var o=0;o<n;o++)t[i++]=e[a][o]}else t=new r(e);this.indices=t},createAttribute:function(e,t,r,i){var n=new en(e,t,r,i);return this.attributes[e]&&this.removeAttribute(e),this.attributes[e]=n,this._attributeList.push(e),n},removeAttribute:function(e){var t=this._attributeList,r=t.indexOf(e);return r>=0?(t.splice(r,1),delete this.attributes[e],!0):!1},getAttribute:function(e){return this.attributes[e]},getEnabledAttributes:function(){var e=this._enabledAttributes,t=this._attributeList;if(e)return e;for(var r=[],i=this.vertexCount,n=0;n<t.length;n++){var a=t[n],o=this.attributes[a];o.value&&o.value.length===i*o.size&&r.push(a)}return this._enabledAttributes=r,r},getBufferChunks:function(e){var t=this._cache;t.use(e.__uid__);var r=t.isDirty("attributes"),i=t.isDirty("indices");if(r||i){this._updateBuffer(e.gl,r,i);for(var n=this.getEnabledAttributes(),a=0;a<n.length;a++)t.fresh(Io(n[a]));t.fresh("attributes"),t.fresh("indices")}return t.fresh("any"),t.get("chunks")},_updateBuffer:function(e,t,r){var i=this._cache,n=i.get("chunks"),a=!1;n||(n=[],n[0]={attributeBuffers:[],indicesBuffer:null},i.put("chunks",n),a=!0);var o=n[0],s=o.attributeBuffers,l=o.indicesBuffer;if(t||a){var h=this.getEnabledAttributes(),u={};if(!a)for(var f=0;f<s.length;f++)u[s[f].name]=s[f];for(var d=0;d<h.length;d++){var c=h[d],v=this.attributes[c],p;a||(p=u[c]);var g;p?g=p.buffer:g=e.createBuffer(),i.isDirty(Io(c))&&(e.bindBuffer(e.ARRAY_BUFFER,g),e.bufferData(e.ARRAY_BUFFER,v.value,this.dynamic?e.DYNAMIC_DRAW:e.STATIC_DRAW)),s[d]=new uu(c,v.type,g,v.size,v.semantic)}for(var f=d;f<s.length;f++)e.deleteBuffer(s[f].buffer);s.length=d}this.isUseIndices()&&(r||a)&&(l||(l=new fu(e.createBuffer()),o.indicesBuffer=l),l.count=this.indices.length,e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,l.buffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,this.dynamic?e.DYNAMIC_DRAW:e.STATIC_DRAW))},dispose:function(e){var t=this._cache;t.use(e.__uid__);var r=t.get("chunks");if(r)for(var i=0;i<r.length;i++){for(var n=r[i],a=0;a<n.attributeBuffers.length;a++){var o=n.attributeBuffers[a];e.gl.deleteBuffer(o.buffer)}n.indicesBuffer&&e.gl.deleteBuffer(n.indicesBuffer.buffer)}if(this.__vaoCache){var s=e.getGLExtension("OES_vertex_array_object");for(var l in this.__vaoCache){var h=this.__vaoCache[l].vao;h&&s.deleteVertexArrayOES(h)}}this.__vaoCache={},t.deleteContext(e.__uid__)}});Object.defineProperty&&(Object.defineProperty(Dr.prototype,"vertexCount",{enumerable:!1,get:function(){var e=this.attributes[this.mainAttribute];return e||(e=this.attributes[this._attributeList[0]]),!e||!e.value?0:e.value.length/e.size}}),Object.defineProperty(Dr.prototype,"triangleCount",{enumerable:!1,get:function(){var e=this.indices;return e?e.length/3:0}}));Dr.STATIC_DRAW=I.STATIC_DRAW;Dr.DYNAMIC_DRAW=I.DYNAMIC_DRAW;Dr.STREAM_DRAW=I.STREAM_DRAW;Dr.AttributeBuffer=uu;Dr.IndicesBuffer=fu;Dr.Attribute=en;const Ri=Dr;var Pt=A.create,Gi=A.add,vi=A.set,dr=Ri.Attribute,Ni=Ri.extend(function(){return{attributes:{position:new dr("position","float",3,"POSITION"),texcoord0:new dr("texcoord0","float",2,"TEXCOORD_0"),texcoord1:new dr("texcoord1","float",2,"TEXCOORD_1"),normal:new dr("normal","float",3,"NORMAL"),tangent:new dr("tangent","float",4,"TANGENT"),color:new dr("color","float",4,"COLOR"),weight:new dr("weight","float",3,"WEIGHT"),joint:new dr("joint","float",4,"JOINT"),barycentric:new dr("barycentric","float",3,null)},boundingBox:null}},{mainAttribute:"position",updateBoundingBox:function(){var e=this.boundingBox;e||(e=this.boundingBox=new Nt);var t=this.attributes.position.value;if(t&&t.length){var r=e.min,i=e.max,n=r.array,a=i.array;A.set(n,t[0],t[1],t[2]),A.set(a,t[0],t[1],t[2]);for(var o=3;o<t.length;){var s=t[o++],l=t[o++],h=t[o++];s<n[0]&&(n[0]=s),l<n[1]&&(n[1]=l),h<n[2]&&(n[2]=h),s>a[0]&&(a[0]=s),l>a[1]&&(a[1]=l),h>a[2]&&(a[2]=h)}r._dirty=!0,i._dirty=!0}},generateVertexNormals:function(){if(this.vertexCount){var e=this.indices,t=this.attributes,r=t.position.value,i=t.normal.value;if(!i||i.length!==r.length)i=t.normal.value=new ft.Float32Array(r.length);else for(var n=0;n<i.length;n++)i[n]=0;for(var a=Pt(),o=Pt(),s=Pt(),l=Pt(),h=Pt(),u=Pt(),f=e?e.length:this.vertexCount,d,c,v,p=0;p<f;){e?(d=e[p++],c=e[p++],v=e[p++]):(d=p++,c=p++,v=p++),vi(a,r[d*3],r[d*3+1],r[d*3+2]),vi(o,r[c*3],r[c*3+1],r[c*3+2]),vi(s,r[v*3],r[v*3+1],r[v*3+2]),A.sub(l,a,o),A.sub(h,o,s),A.cross(u,l,h);for(var n=0;n<3;n++)i[d*3+n]=i[d*3+n]+u[n],i[c*3+n]=i[c*3+n]+u[n],i[v*3+n]=i[v*3+n]+u[n]}for(var n=0;n<i.length;)vi(u,i[n],i[n+1],i[n+2]),A.normalize(u,u),i[n++]=u[0],i[n++]=u[1],i[n++]=u[2];this.dirty()}},generateFaceNormals:function(){if(this.vertexCount){this.isUniqueVertex()||this.generateUniqueVertex();var e=this.indices,t=this.attributes,r=t.position.value,i=t.normal.value,n=Pt(),a=Pt(),o=Pt(),s=Pt(),l=Pt(),h=Pt();i||(i=t.normal.value=new Float32Array(r.length));for(var u=e?e.length:this.vertexCount,f,d,c,v=0;v<u;){e?(f=e[v++],d=e[v++],c=e[v++]):(f=v++,d=v++,c=v++),vi(n,r[f*3],r[f*3+1],r[f*3+2]),vi(a,r[d*3],r[d*3+1],r[d*3+2]),vi(o,r[c*3],r[c*3+1],r[c*3+2]),A.sub(s,n,a),A.sub(l,a,o),A.cross(h,s,l),A.normalize(h,h);for(var p=0;p<3;p++)i[f*3+p]=h[p],i[d*3+p]=h[p],i[c*3+p]=h[p]}this.dirty()}},generateTangents:function(){if(this.vertexCount){var e=this.vertexCount,t=this.attributes;t.tangent.value||(t.tangent.value=new Float32Array(e*4));var r=t.texcoord0.value,i=t.position.value,n=t.tangent.value,a=t.normal.value;if(!r){console.warn("Geometry without texcoords can't generate tangents.");return}for(var o=[],s=[],l=0;l<e;l++)o[l]=[0,0,0],s[l]=[0,0,0];for(var h=[0,0,0],u=[0,0,0],f=this.indices,d=f?f.length:this.vertexCount,c,v,p,l=0;l<d;){f?(c=f[l++],v=f[l++],p=f[l++]):(c=l++,v=l++,p=l++);var g=r[c*2],m=r[v*2],_=r[p*2],x=r[c*2+1],y=r[v*2+1],T=r[p*2+1],w=i[c*3],E=i[v*3],S=i[p*3],D=i[c*3+1],M=i[v*3+1],C=i[p*3+1],N=i[c*3+2],O=i[v*3+2],P=i[p*3+2],F=E-w,H=S-w,Y=M-D,z=C-D,Te=O-N,q=P-N,De=m-g,ve=_-g,oe=y-x,Q=T-x,L=1/(De*Q-oe*ve);h[0]=(Q*F-oe*H)*L,h[1]=(Q*Y-oe*z)*L,h[2]=(Q*Te-oe*q)*L,u[0]=(De*H-ve*F)*L,u[1]=(De*z-ve*Y)*L,u[2]=(De*q-ve*Te)*L,Gi(o[c],o[c],h),Gi(o[v],o[v],h),Gi(o[p],o[p],h),Gi(s[c],s[c],u),Gi(s[v],s[v],u),Gi(s[p],s[p],u)}for(var k=Pt(),V=Pt(),J=Pt(),l=0;l<e;l++){J[0]=a[l*3],J[1]=a[l*3+1],J[2]=a[l*3+2];var K=o[l];A.scale(k,J,A.dot(J,K)),A.sub(k,K,k),A.normalize(k,k),A.cross(V,J,K),n[l*4]=k[0],n[l*4+1]=k[1],n[l*4+2]=k[2],n[l*4+3]=A.dot(V,s[l])<0?-1:1}this.dirty()}},isUniqueVertex:function(){return this.isUseIndices()?this.vertexCount===this.indices.length:!0},generateUniqueVertex:function(){if(!(!this.vertexCount||!this.indices)){this.indices.length>65535&&(this.indices=new ft.Uint32Array(this.indices));for(var e=this.attributes,t=this.indices,r=this.getEnabledAttributes(),i={},n=0;n<r.length;n++){var a=r[n];i[a]=e[a].value,e[a].init(this.indices.length)}for(var o=0,s=0;s<t.length;s++){for(var l=t[s],n=0;n<r.length;n++)for(var a=r[n],h=e[a].value,u=e[a].size,f=0;f<u;f++)h[o*u+f]=i[a][l*u+f];t[s]=o,o++}this.dirty()}},generateBarycentric:function(){if(this.vertexCount){this.isUniqueVertex()||this.generateUniqueVertex();var e=this.attributes,t=e.barycentric.value,r=this.indices;if(!(t&&t.length===r.length*3)){t=e.barycentric.value=new Float32Array(r.length*3);for(var i=0;i<(r?r.length:this.vertexCount/3);)for(var n=0;n<3;n++){var a=r?r[i++]:i*3+n;t[a*3+n]=1}this.dirty()}}},applyTransform:function(e){var t=this.attributes,r=t.position.value,i=t.normal.value,n=t.tangent.value;e=e.array;var a=W.create();W.invert(a,e),W.transpose(a,a);var o=A.transformMat4,s=A.forEach;s(r,3,0,null,o,e),i&&s(i,3,0,null,o,a),n&&s(n,4,0,null,o,a),this.boundingBox&&this.updateBoundingBox()},dispose:function(e){var t=this._cache;t.use(e.__uid__);var r=t.get("chunks");if(r)for(var i=0;i<r.length;i++){for(var n=r[i],a=0;a<n.attributeBuffers.length;a++){var o=n.attributeBuffers[a];e.gl.deleteBuffer(o.buffer)}n.indicesBuffer&&e.gl.deleteBuffer(n.indicesBuffer.buffer)}if(this.__vaoCache){var s=e.getGLExtension("OES_vertex_array_object");for(var l in this.__vaoCache){var h=this.__vaoCache[l].vao;h&&s.deleteVertexArrayOES(h)}}this.__vaoCache={},t.deleteContext(e.__uid__)}});Ni.STATIC_DRAW=Ri.STATIC_DRAW;Ni.DYNAMIC_DRAW=Ri.DYNAMIC_DRAW;Ni.STREAM_DRAW=Ri.STREAM_DRAW;Ni.AttributeBuffer=Ri.AttributeBuffer;Ni.IndicesBuffer=Ri.IndicesBuffer;Ni.Attribute=dr;const Pe=Ni,dd=`vec3 calcAmbientSHLight(int idx, vec3 N) {
 int offset = 9 * idx;
 return ambientSHLightCoefficients[0]
 + ambientSHLightCoefficients[1] * N.x
 + ambientSHLightCoefficients[2] * N.y
 + ambientSHLightCoefficients[3] * N.z
 + ambientSHLightCoefficients[4] * N.x * N.z
 + ambientSHLightCoefficients[5] * N.z * N.y
 + ambientSHLightCoefficients[6] * N.y * N.x
 + ambientSHLightCoefficients[7] * (3.0 * N.z * N.z - 1.0)
 + ambientSHLightCoefficients[8] * (N.x * N.x - N.y * N.y);
}`;var sr="uniform vec3 ",bn="uniform float ",ki="@export clay.header.",Hi="@end",St=":unconfigurable;";const vd=[ki+"directional_light",sr+"directionalLightDirection[DIRECTIONAL_LIGHT_COUNT]"+St,sr+"directionalLightColor[DIRECTIONAL_LIGHT_COUNT]"+St,Hi,ki+"ambient_light",sr+"ambientLightColor[AMBIENT_LIGHT_COUNT]"+St,Hi,ki+"ambient_sh_light",sr+"ambientSHLightColor[AMBIENT_SH_LIGHT_COUNT]"+St,sr+"ambientSHLightCoefficients[AMBIENT_SH_LIGHT_COUNT * 9]"+St,dd,Hi,ki+"ambient_cubemap_light",sr+"ambientCubemapLightColor[AMBIENT_CUBEMAP_LIGHT_COUNT]"+St,"uniform samplerCube ambientCubemapLightCubemap[AMBIENT_CUBEMAP_LIGHT_COUNT]"+St,"uniform sampler2D ambientCubemapLightBRDFLookup[AMBIENT_CUBEMAP_LIGHT_COUNT]"+St,Hi,ki+"point_light",sr+"pointLightPosition[POINT_LIGHT_COUNT]"+St,bn+"pointLightRange[POINT_LIGHT_COUNT]"+St,sr+"pointLightColor[POINT_LIGHT_COUNT]"+St,Hi,ki+"spot_light",sr+"spotLightPosition[SPOT_LIGHT_COUNT]"+St,sr+"spotLightDirection[SPOT_LIGHT_COUNT]"+St,bn+"spotLightRange[SPOT_LIGHT_COUNT]"+St,bn+"spotLightUmbraAngleCosine[SPOT_LIGHT_COUNT]"+St,bn+"spotLightPenumbraAngleCosine[SPOT_LIGHT_COUNT]"+St,bn+"spotLightFalloffFactor[SPOT_LIGHT_COUNT]"+St,sr+"spotLightColor[SPOT_LIGHT_COUNT]"+St,Hi].join(`
`);G.import(vd);var pd=gr.extend(function(){return{color:[1,1,1],intensity:1,castShadow:!0,shadowResolution:512,group:0}},{type:"",clone:function(){var e=gr.prototype.clone.call(this);return e.color=Array.prototype.slice.call(this.color),e.intensity=this.intensity,e.castShadow=this.castShadow,e.shadowResolution=this.shadowResolution,e}});const cr=pd;var Ba=function(e,t){this.normal=e||new Z(0,1,0),this.distance=t||0};Ba.prototype={constructor:Ba,distanceToPoint:function(e){return A.dot(e.array,this.normal.array)-this.distance},projectPoint:function(e,t){t||(t=new Z);var r=this.distanceToPoint(e);return A.scaleAndAdd(t.array,e.array,this.normal.array,-r),t._dirty=!0,t},normalize:function(){var e=1/A.len(this.normal.array);A.scale(this.normal.array,e),this.distance*=e},intersectFrustum:function(e){for(var t=e.vertices,r=this.normal.array,i=A.dot(t[0].array,r)>this.distance,n=1;n<8;n++)if(A.dot(t[n].array,r)>this.distance!=i)return!0},intersectLine:function(){var e=A.create();return function(t,r,i){var n=this.distanceToPoint(t),a=this.distanceToPoint(r);if(n>0&&a>0||n<0&&a<0)return null;var o=this.normal.array,s=this.distance,l=t.array;A.sub(e,r.array,t.array),A.normalize(e,e);var h=A.dot(o,e);if(h===0)return null;i||(i=new Z);var u=(A.dot(o,l)-s)/h;return A.scaleAndAdd(i.array,l,e,-u),i._dirty=!0,i}}(),applyTransform:function(){var e=W.create(),t=$.create(),r=$.create();return r[3]=1,function(i){i=i.array,A.scale(r,this.normal.array,this.distance),$.transformMat4(r,r,i),this.distance=A.dot(r,this.normal.array),W.invert(e,i),W.transpose(e,e),t[3]=0,A.copy(t,this.normal.array),$.transformMat4(t,t,e),A.copy(this.normal.array,t)}}(),copy:function(e){A.copy(this.normal.array,e.normal.array),this.normal._dirty=!0,this.distance=e.distance},clone:function(){var e=new Ba;return e.copy(this),e}};const cu=Ba;var lt=A.set,Hl=A.copy,Vl=A.transformMat4,Oo=Math.min,Bo=Math.max,du=function(){this.planes=[];for(var e=0;e<6;e++)this.planes.push(new cu);this.boundingBox=new Nt,this.vertices=[];for(var e=0;e<8;e++)this.vertices[e]=A.fromValues(0,0,0)};du.prototype={setFromProjection:function(e){var t=this.planes,r=e.array,i=r[0],n=r[1],a=r[2],o=r[3],s=r[4],l=r[5],h=r[6],u=r[7],f=r[8],d=r[9],c=r[10],v=r[11],p=r[12],g=r[13],m=r[14],_=r[15];lt(t[0].normal.array,o-i,u-s,v-f),t[0].distance=-(_-p),t[0].normalize(),lt(t[1].normal.array,o+i,u+s,v+f),t[1].distance=-(_+p),t[1].normalize(),lt(t[2].normal.array,o+n,u+l,v+d),t[2].distance=-(_+g),t[2].normalize(),lt(t[3].normal.array,o-n,u-l,v-d),t[3].distance=-(_-g),t[3].normalize(),lt(t[4].normal.array,o-a,u-h,v-c),t[4].distance=-(_-m),t[4].normalize(),lt(t[5].normal.array,o+a,u+h,v+c),t[5].distance=-(_+m),t[5].normalize();var x=this.boundingBox,y=this.vertices;if(_===0){var T=l/i,w=-m/(c-1),E=-m/(c+1),S=-E/l,D=-w/l;x.min.set(-S*T,-S,E),x.max.set(S*T,S,w),lt(y[0],-S*T,-S,E),lt(y[1],-S*T,S,E),lt(y[2],S*T,-S,E),lt(y[3],S*T,S,E),lt(y[4],-D*T,-D,w),lt(y[5],-D*T,D,w),lt(y[6],D*T,-D,w),lt(y[7],D*T,D,w)}else{var M=(-1-p)/i,C=(1-p)/i,N=(1-g)/l,O=(-1-g)/l,P=(-1-m)/c,F=(1-m)/c;x.min.set(Math.min(M,C),Math.min(O,N),Math.min(F,P)),x.max.set(Math.max(C,M),Math.max(N,O),Math.max(P,F));var H=x.min.array,Y=x.max.array;lt(y[0],H[0],H[1],H[2]),lt(y[1],H[0],Y[1],H[2]),lt(y[2],Y[0],H[1],H[2]),lt(y[3],Y[0],Y[1],H[2]),lt(y[4],H[0],H[1],Y[2]),lt(y[5],H[0],Y[1],Y[2]),lt(y[6],Y[0],H[1],Y[2]),lt(y[7],Y[0],Y[1],Y[2])}},getTransformedBoundingBox:function(){var e=A.create();return function(t,r){var i=this.vertices,n=r.array,a=t.min,o=t.max,s=a.array,l=o.array,h=i[0];Vl(e,h,n),Hl(s,e),Hl(l,e);for(var u=1;u<8;u++)h=i[u],Vl(e,h,n),s[0]=Oo(e[0],s[0]),s[1]=Oo(e[1],s[1]),s[2]=Oo(e[2],s[2]),l[0]=Bo(e[0],l[0]),l[1]=Bo(e[1],l[1]),l[2]=Bo(e[2],l[2]);return a._dirty=!0,o._dirty=!0,t}}()};const Cs=du;var md=gr.extend(function(){return{projectionMatrix:new re,invProjectionMatrix:new re,viewMatrix:new re,frustum:new Cs}},function(){this.update(!0)},{update:function(e){gr.prototype.update.call(this,e),re.invert(this.viewMatrix,this.worldTransform),this.updateProjectionMatrix(),re.invert(this.invProjectionMatrix,this.projectionMatrix),this.frustum.setFromProjection(this.projectionMatrix)},setViewMatrix:function(e){re.copy(this.viewMatrix,e),re.invert(this.worldTransform,e),this.decomposeWorldTransform()},decomposeProjectionMatrix:function(){},setProjectionMatrix:function(e){re.copy(this.projectionMatrix,e),re.invert(this.invProjectionMatrix,e),this.decomposeProjectionMatrix()},updateProjectionMatrix:function(){},castRay:function(){var e=$.create();return function(t,r){var i=r!==void 0?r:new Ga,n=t.array[0],a=t.array[1];return $.set(e,n,a,-1,1),$.transformMat4(e,e,this.invProjectionMatrix.array),$.transformMat4(e,e,this.worldTransform.array),A.scale(i.origin.array,e,1/e[3]),$.set(e,n,a,1,1),$.transformMat4(e,e,this.invProjectionMatrix.array),$.transformMat4(e,e,this.worldTransform.array),A.scale(e,e,1/e[3]),A.sub(i.direction.array,e,i.origin.array),A.normalize(i.direction.array,i.direction.array),i.direction._dirty=!0,i.origin._dirty=!0,i}}()});const tn=md;var gd=W.create(),Wl=W.create(),Fo={};function _d(e){var t=[],r=Object.keys(e);r.sort();for(var i=0;i<r.length;i++){var n=r[i];t.push(n+" "+e[n])}var a=t.join(`
`);if(Fo[a])return Fo[a];var o=Et.genGUID();return Fo[a]=o,o}function ro(){this.opaque=[],this.transparent=[],this._opaqueCount=0,this._transparentCount=0}ro.prototype.startCount=function(){this._opaqueCount=0,this._transparentCount=0};ro.prototype.add=function(e,t){t?this.transparent[this._transparentCount++]=e:this.opaque[this._opaqueCount++]=e};ro.prototype.endCount=function(){this.transparent.length=this._transparentCount,this.opaque.length=this._opaqueCount};var yd=gr.extend(function(){return{material:null,lights:[],viewBoundingBoxLastFrame:new Nt,shadowUniforms:{},_cameraList:[],_lightUniforms:{},_previousLightNumber:{},_lightNumber:{},_lightProgramKeys:{},_nodeRepository:{},_renderLists:new eu(20)}},function(){this._scene=this},{addToScene:function(e){e instanceof tn?(this._cameraList.length>0&&console.warn("Found multiple camera in one scene. Use the fist one."),this._cameraList.push(e)):e instanceof cr&&this.lights.push(e),e.name&&(this._nodeRepository[e.name]=e)},removeFromScene:function(e){var t;e instanceof tn?(t=this._cameraList.indexOf(e),t>=0&&this._cameraList.splice(t,1)):e instanceof cr&&(t=this.lights.indexOf(e),t>=0&&this.lights.splice(t,1)),e.name&&delete this._nodeRepository[e.name]},getNode:function(e){return this._nodeRepository[e]},setMainCamera:function(e){var t=this._cameraList.indexOf(e);t>=0&&this._cameraList.splice(t,1),this._cameraList.unshift(e)},getMainCamera:function(){return this._cameraList[0]},getLights:function(){return this.lights},updateLights:function(){var e=this.lights;this._previousLightNumber=this._lightNumber;for(var t={},r=0;r<e.length;r++){var i=e[r];if(!i.invisible){var n=i.group;t[n]||(t[n]={}),t[n][i.type]=t[n][i.type]||0,t[n][i.type]++}}this._lightNumber=t;for(var a in t)this._lightProgramKeys[a]=_d(t[a]);this._updateLightUniforms()},cloneNode:function(e){var t=e.clone(),r={};function i(n,a){r[n.__uid__]=a;for(var o=0;o<n._children.length;o++){var s=n._children[o],l=a._children[o];i(s,l)}}return i(e,t),t.traverse(function(n){n.skeleton&&(n.skeleton=n.skeleton.clone(r)),n.material&&(n.material=n.material.clone())}),t},updateRenderList:function(e,t){var r=e.__uid__,i=this._renderLists.get(r);i||(i=new ro,this._renderLists.put(r,i)),i.startCount(),t&&(this.viewBoundingBoxLastFrame.min.set(1/0,1/0,1/0),this.viewBoundingBoxLastFrame.max.set(-1/0,-1/0,-1/0));var n=this.material&&this.material.transparent||!1;return this._doUpdateRenderList(this,e,n,i,t),i.endCount(),i},getRenderList:function(e){return this._renderLists.get(e.__uid__)},_doUpdateRenderList:function(e,t,r,i,n){if(!e.invisible)for(var a=0;a<e._children.length;a++){var o=e._children[a];if(o.isRenderable()){var s=o.isSkinnedMesh()?gd:o.worldTransform.array,l=o.geometry;W.multiplyAffine(Wl,t.viewMatrix.array,s),(n&&!l.boundingBox||!this.isFrustumCulled(o,t,Wl))&&i.add(o,o.material.transparent||r)}o._children.length>0&&this._doUpdateRenderList(o,t,r,i,n)}},isFrustumCulled:function(){var e=new Nt,t=new re;return function(r,i,n){var a=r.boundingBox;if(a||(r.skeleton&&r.skeleton.boundingBox?a=r.skeleton.boundingBox:a=r.geometry.boundingBox),!a)return!1;if(t.array=n,e.transformFrom(a,t),r.castShadow&&this.viewBoundingBoxLastFrame.union(e),r.frustumCulling){if(!e.intersectBoundingBox(i.frustum.boundingBox))return!0;t.array=i.projectionMatrix.array,e.max.array[2]>0&&e.min.array[2]<0&&(e.max.array[2]=-1e-20),e.applyProjection(t);var o=e.min.array,s=e.max.array;if(s[0]<-1||o[0]>1||s[1]<-1||o[1]>1||s[2]<-1||o[2]>1)return!0}return!1}}(),_updateLightUniforms:function(){var e=this.lights;e.sort(xd);var t=this._lightUniforms;for(var r in t)for(var i in t[r])t[r][i].value.length=0;for(var n=0;n<e.length;n++){var a=e[n];if(!a.invisible){var r=a.group;for(var i in a.uniformTemplates){var o=a.uniformTemplates[i],s=o.value(a);if(s!=null){t[r]||(t[r]={}),t[r][i]||(t[r][i]={type:"",value:[]});var l=t[r][i];switch(l.type=o.type+"v",o.type){case"1i":case"1f":case"t":l.value.push(s);break;case"2f":case"3f":case"4f":for(var h=0;h<s.length;h++)l.value.push(s[h]);break;default:console.error("Unkown light uniform type "+o.type)}}}}}},getLightGroups:function(){var e=[];for(var t in this._lightNumber)e.push(t);return e},getNumberChangedLightGroups:function(){var e=[];for(var t in this._lightNumber)this.isLightNumberChanged(t)&&e.push(t);return e},isLightNumberChanged:function(e){var t=this._previousLightNumber,r=this._lightNumber;for(var i in r[e])if(!t[e]||r[e][i]!==t[e][i])return!0;for(var i in t[e])if(!r[e]||r[e][i]!==t[e][i])return!0;return!1},getLightsNumbers:function(e){return this._lightNumber[e]},getProgramKey:function(e){return this._lightProgramKeys[e]},setLightUniforms:function(){function e(t,r,i){for(var n in t){var a=t[n];if(a.type==="tv"){if(!r.hasUniform(n))continue;for(var o=[],s=0;s<a.value.length;s++){var l=a.value[s],h=r.takeCurrentTextureSlot(i,l);o.push(h)}r.setUniform(i.gl,"1iv",n,o)}else r.setUniform(i.gl,a.type,n,a.value)}}return function(t,r,i){e(this._lightUniforms[r],t,i),e(this.shadowUniforms,t,i)}}(),dispose:function(){this.material=null,this._opaqueList=[],this._transparentList=[],this.lights=[],this._lightUniforms={},this._lightNumber={},this._nodeRepository={}}});function xd(e,t){if(t.castShadow&&!e.castShadow)return!0}const li=yd;var Sa=lu.isPowerOfTwo,Td=["px","nx","py","ny","pz","nz"],Ls=ne.extend(function(){return{image:{px:null,nx:null,py:null,ny:null,pz:null,nz:null},pixels:{px:null,nx:null,py:null,ny:null,pz:null,nz:null},mipmaps:[]}},{textureType:"textureCube",update:function(e){var t=e.gl;t.bindTexture(t.TEXTURE_CUBE_MAP,this._cache.get("webgl_texture")),this.updateCommon(e);var r=this.format,i=this.type;t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_WRAP_S,this.getAvailableWrapS()),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_WRAP_T,this.getAvailableWrapT()),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MAG_FILTER,this.getAvailableMagFilter()),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MIN_FILTER,this.getAvailableMinFilter());var n=e.getGLExtension("EXT_texture_filter_anisotropic");if(n&&this.anisotropic>1&&t.texParameterf(t.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropic),i===36193){var a=e.getGLExtension("OES_texture_half_float");a||(i=I.FLOAT)}if(this.mipmaps.length)for(var o=this.width,s=this.height,l=0;l<this.mipmaps.length;l++){var h=this.mipmaps[l];this._updateTextureData(t,h,l,o,s,r,i),o/=2,s/=2}else this._updateTextureData(t,this,0,this.width,this.height,r,i),!this.NPOT&&this.useMipmap&&t.generateMipmap(t.TEXTURE_CUBE_MAP);t.bindTexture(t.TEXTURE_CUBE_MAP,null)},_updateTextureData:function(e,t,r,i,n,a,o){for(var s=0;s<6;s++){var l=Td[s],h=t.image&&t.image[l];h?e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+s,r,a,a,o,h):e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+s,r,a,i,n,0,a,o,t.pixels&&t.pixels[l])}},generateMipmap:function(e){var t=e.gl;this.useMipmap&&!this.NPOT&&(t.bindTexture(t.TEXTURE_CUBE_MAP,this._cache.get("webgl_texture")),t.generateMipmap(t.TEXTURE_CUBE_MAP))},bind:function(e){e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP,this.getWebGLTexture(e))},unbind:function(e){e.gl.bindTexture(e.gl.TEXTURE_CUBE_MAP,null)},isPowerOfTwo:function(){return this.image.px?Sa(this.image.px.width)&&Sa(this.image.px.height):Sa(this.width)&&Sa(this.height)},isRenderable:function(){return this.image.px?Vi(this.image.px)&&Vi(this.image.nx)&&Vi(this.image.py)&&Vi(this.image.ny)&&Vi(this.image.pz)&&Vi(this.image.nz):!!(this.width&&this.height)},load:function(e,t){var r=0,i=this;return Et.each(e,function(n,a){var o=ft.createImage();t&&(o.crossOrigin=t),o.onload=function(){r--,r===0&&(i.dirty(),i.trigger("success",i))},o.onerror=function(){r--},r++,o.src=n,i.image[a]=o}),this}});Object.defineProperty(Ls.prototype,"width",{get:function(){return this.image&&this.image.px?this.image.px.width:this._width},set:function(e){this.image&&this.image.px?console.warn("Texture from image can't set width"):(this._width!==e&&this.dirty(),this._width=e)}});Object.defineProperty(Ls.prototype,"height",{get:function(){return this.image&&this.image.px?this.image.px.height:this._height},set:function(e){this.image&&this.image.px?console.warn("Texture from image can't set height"):(this._height!==e&&this.dirty(),this._height=e)}});function Vi(e){return e.width>0&&e.height>0}const zn=Ls;var wd=tn.extend({fov:50,aspect:1,near:.1,far:2e3},{updateProjectionMatrix:function(){var e=this.fov/180*Math.PI;this.projectionMatrix.perspective(e,this.aspect,this.near,this.far)},decomposeProjectionMatrix:function(){var e=this.projectionMatrix.array,t=Math.atan(1/e[5])*2;this.fov=t/Math.PI*180,this.aspect=e[5]/e[0],this.near=e[14]/(e[10]-1),this.far=e[14]/(e[10]+1)},clone:function(){var e=tn.prototype.clone.call(this);return e.fov=this.fov,e.aspect=this.aspect,e.near=this.near,e.far=this.far,e}});const xt=wd;var Ea="framebuffer",Cr="renderbuffer",Xl=Cr+"_width",jl=Cr+"_height",Uo=Cr+"_attached",zo="depthtexture_attached",pi=I.FRAMEBUFFER,Sn=I.RENDERBUFFER,Dn=I.DEPTH_ATTACHMENT,vu=I.COLOR_ATTACHMENT0,Qn=Bt.extend({depthBuffer:!0,viewport:null,_width:0,_height:0,_textures:null,_boundRenderer:null},function(){this._cache=new Es,this._textures={}},{getTextureWidth:function(){return this._width},getTextureHeight:function(){return this._height},bind:function(e){if(e.__currentFrameBuffer){if(e.__currentFrameBuffer===this)return;console.warn("Renderer already bound with another framebuffer. Unbind it first")}e.__currentFrameBuffer=this;var t=e.gl;t.bindFramebuffer(pi,this._getFrameBufferGL(e)),this._boundRenderer=e;var r=this._cache;r.put("viewport",e.viewport);var i=!1,n,a;for(var o in this._textures){i=!0;var s=this._textures[o];s&&(n=s.texture.width,a=s.texture.height,this._doAttach(e,s.texture,o,s.target))}this._width=n,this._height=a,!i&&this.depthBuffer&&console.error("Must attach texture before bind, or renderbuffer may have incorrect width and height."),this.viewport?e.setViewport(this.viewport):e.setViewport(0,0,n,a,1);var l=r.get("attached_textures");if(l){for(var o in l)if(!this._textures[o]){var h=l[o];this._doDetach(t,o,h)}}if(!r.get(zo)&&this.depthBuffer){r.miss(Cr)&&r.put(Cr,t.createRenderbuffer());var u=r.get(Cr);(n!==r.get(Xl)||a!==r.get(jl))&&(t.bindRenderbuffer(Sn,u),t.renderbufferStorage(Sn,t.DEPTH_COMPONENT16,n,a),r.put(Xl,n),r.put(jl,a),t.bindRenderbuffer(Sn,null)),r.get(Uo)||(t.framebufferRenderbuffer(pi,Dn,Sn,u),r.put(Uo,!0))}},unbind:function(e){e.__currentFrameBuffer=null;var t=e.gl;t.bindFramebuffer(pi,null),this._boundRenderer=null,this._cache.use(e.__uid__);var r=this._cache.get("viewport");r&&e.setViewport(r),this.updateMipmap(e)},updateMipmap:function(e){var t=e.gl;for(var r in this._textures){var i=this._textures[r];if(i){var n=i.texture;if(!n.NPOT&&n.useMipmap&&n.minFilter===ne.LINEAR_MIPMAP_LINEAR){var a=n.textureType==="textureCube"?I.TEXTURE_CUBE_MAP:I.TEXTURE_2D;t.bindTexture(a,n.getWebGLTexture(e)),t.generateMipmap(a),t.bindTexture(a,null)}}}},checkStatus:function(e){return e.checkFramebufferStatus(pi)},_getFrameBufferGL:function(e){var t=this._cache;return t.use(e.__uid__),t.miss(Ea)&&t.put(Ea,e.gl.createFramebuffer()),t.get(Ea)},attach:function(e,t,r){if(!e.width)throw new Error("The texture attached to color buffer is not a valid.");t=t||vu,r=r||I.TEXTURE_2D;var i=this._boundRenderer,n=i&&i.gl,a;if(n){var o=this._cache;o.use(i.__uid__),a=o.get("attached_textures")}var s=this._textures[t];if(!(s&&s.target===r&&s.texture===e&&a&&a[t]!=null)){var l=!0;i&&(l=this._doAttach(i,e,t,r),this.viewport||i.setViewport(0,0,e.width,e.height,1)),l&&(this._textures[t]=this._textures[t]||{},this._textures[t].texture=e,this._textures[t].target=r)}},_doAttach:function(e,t,r,i){var n=e.gl,a=t.getWebGLTexture(e),o=this._cache.get("attached_textures");if(o&&o[r]){var s=o[r];if(s.texture===t&&s.target===i)return}r=+r;var l=!0;if(r===Dn||r===I.DEPTH_STENCIL_ATTACHMENT){var h=e.getGLExtension("WEBGL_depth_texture");if(h||(console.error("Depth texture is not supported by the browser"),l=!1),t.format!==I.DEPTH_COMPONENT&&t.format!==I.DEPTH_STENCIL&&(console.error("The texture attached to depth buffer is not a valid."),l=!1),l){var u=this._cache.get(Cr);u&&(n.framebufferRenderbuffer(pi,Dn,Sn,null),n.deleteRenderbuffer(u),this._cache.put(Cr,!1)),this._cache.put(Uo,!1),this._cache.put(zo,!0)}}return n.framebufferTexture2D(pi,r,i,a,0),o||(o={},this._cache.put("attached_textures",o)),o[r]=o[r]||{},o[r].texture=t,o[r].target=i,l},_doDetach:function(e,t,r){e.framebufferTexture2D(pi,t,r,null,0);var i=this._cache.get("attached_textures");i&&i[t]&&(i[t]=null),(t===Dn||t===I.DEPTH_STENCIL_ATTACHMENT)&&this._cache.put(zo,!1)},detach:function(e,t){if(this._textures[e]=null,this._boundRenderer){var r=this._cache;r.use(this._boundRenderer.__uid__),this._doDetach(this._boundRenderer.gl,e,t)}},dispose:function(e){var t=e.gl,r=this._cache;r.use(e.__uid__);var i=r.get(Cr);i&&t.deleteRenderbuffer(i);var n=r.get(Ea);n&&t.deleteFramebuffer(n),r.deleteContext(e.__uid__),this._textures={}}});Qn.DEPTH_ATTACHMENT=Dn;Qn.COLOR_ATTACHMENT0=vu;Qn.STENCIL_ATTACHMENT=I.STENCIL_ATTACHMENT;Qn.DEPTH_STENCIL_ATTACHMENT=I.DEPTH_STENCIL_ATTACHMENT;const At=Qn;var bd=["px","nx","py","ny","pz","nz"],Sd=Bt.extend(function(){var e={position:new Z,far:1e3,near:.1,texture:null,shadowMapPass:null},t=e._cameras={px:new xt({fov:90}),nx:new xt({fov:90}),py:new xt({fov:90}),ny:new xt({fov:90}),pz:new xt({fov:90}),nz:new xt({fov:90})};return t.px.lookAt(Z.POSITIVE_X,Z.NEGATIVE_Y),t.nx.lookAt(Z.NEGATIVE_X,Z.NEGATIVE_Y),t.py.lookAt(Z.POSITIVE_Y,Z.POSITIVE_Z),t.ny.lookAt(Z.NEGATIVE_Y,Z.NEGATIVE_Z),t.pz.lookAt(Z.POSITIVE_Z,Z.NEGATIVE_Y),t.nz.lookAt(Z.NEGATIVE_Z,Z.NEGATIVE_Y),e._frameBuffer=new At,e},{getCamera:function(e){return this._cameras[e]},render:function(e,t,r){var i=e.gl;r||t.update();for(var n=this.texture.width,a=2*Math.atan(n/(n-.5))/Math.PI*180,o=0;o<6;o++){var s=bd[o],l=this._cameras[s];if(Z.copy(l.position,this.position),l.far=this.far,l.near=this.near,l.fov=a,this.shadowMapPass){l.update();var h=t.getBoundingBox();h.applyTransform(l.viewMatrix),t.viewBoundingBoxLastFrame.copy(h),this.shadowMapPass.render(e,t,l,!0)}this._frameBuffer.attach(this.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+o),this._frameBuffer.bind(e),e.render(t,l,!0),this._frameBuffer.unbind(e)}},dispose:function(e){this._frameBuffer.dispose(e)}});const Ms=Sd;var Ed=Pe.extend({dynamic:!1,widthSegments:1,heightSegments:1},function(){this.build()},{build:function(){for(var e=this.heightSegments,t=this.widthSegments,r=this.attributes,i=[],n=[],a=[],o=[],s=0;s<=e;s++)for(var l=s/e,h=0;h<=t;h++){var u=h/t;if(i.push([2*u-1,2*l-1,0]),n&&n.push([u,l]),a&&a.push([0,0,1]),h<t&&s<e){var f=h+s*(t+1);o.push([f,f+1,f+t+1]),o.push([f+t+1,f+1,f+t+2])}}r.position.fromArray(i),r.texcoord0.fromArray(n),r.normal.fromArray(a),this.initIndicesFromArray(o),this.boundingBox=new Nt,this.boundingBox.min.set(-1,-1,0),this.boundingBox.max.set(1,1,0)}});const io=Ed;var Je=new re,Ad=Pe.extend({dynamic:!1,widthSegments:1,heightSegments:1,depthSegments:1,inside:!1},function(){this.build()},{build:function(){var e={px:Wi("px",this.depthSegments,this.heightSegments),nx:Wi("nx",this.depthSegments,this.heightSegments),py:Wi("py",this.widthSegments,this.depthSegments),ny:Wi("ny",this.widthSegments,this.depthSegments),pz:Wi("pz",this.widthSegments,this.heightSegments),nz:Wi("nz",this.widthSegments,this.heightSegments)},t=["position","texcoord0","normal"],r=0,i=0;for(var n in e)r+=e[n].vertexCount,i+=e[n].indices.length;for(var a=0;a<t.length;a++)this.attributes[t[a]].init(r);this.indices=new ft.Uint16Array(i);var o=0,s=0;for(var n in e){for(var l=e[n],a=0;a<t.length;a++)for(var h=t[a],u=l.attributes[h].value,f=l.attributes[h].size,d=h==="normal",c=0;c<u.length;c++){var v=u[c];this.inside&&d&&(v=-v),this.attributes[h].value[c+f*s]=v}for(var p=l.indices.length,c=0;c<l.indices.length;c++)this.indices[c+o]=s+l.indices[this.inside?p-c-1:c];o+=l.indices.length,s+=l.vertexCount}this.boundingBox=new Nt,this.boundingBox.max.set(1,1,1),this.boundingBox.min.set(-1,-1,-1)}});function Wi(e,t,r){Je.identity();var i=new io({widthSegments:t,heightSegments:r});switch(e){case"px":re.translate(Je,Je,Z.POSITIVE_X),re.rotateY(Je,Je,Math.PI/2);break;case"nx":re.translate(Je,Je,Z.NEGATIVE_X),re.rotateY(Je,Je,-Math.PI/2);break;case"py":re.translate(Je,Je,Z.POSITIVE_Y),re.rotateX(Je,Je,-Math.PI/2);break;case"ny":re.translate(Je,Je,Z.NEGATIVE_Y),re.rotateX(Je,Je,Math.PI/2);break;case"pz":re.translate(Je,Je,Z.POSITIVE_Z);break;case"nz":re.translate(Je,Je,Z.NEGATIVE_Z),re.rotateY(Je,Je,Math.PI);break}return i.applyTransform(Je),i}const pu=Ad,Cd=`@export clay.skybox.vertex
#define SHADER_NAME skybox
uniform mat4 world : WORLD;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
attribute vec3 position : POSITION;
varying vec3 v_WorldPosition;
void main()
{
 v_WorldPosition = (world * vec4(position, 1.0)).xyz;
 gl_Position = worldViewProjection * vec4(position, 1.0);
}
@end
@export clay.skybox.fragment
#define PI 3.1415926
uniform mat4 viewInverse : VIEWINVERSE;
#ifdef EQUIRECTANGULAR
uniform sampler2D environmentMap;
#else
uniform samplerCube environmentMap;
#endif
uniform float lod: 0.0;
varying vec3 v_WorldPosition;
@import clay.util.rgbm
@import clay.util.srgb
@import clay.util.ACES
void main()
{
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(v_WorldPosition - eyePos);
#ifdef EQUIRECTANGULAR
 float phi = acos(V.y);
 float theta = atan(-V.x, V.z) + PI * 0.5;
 vec2 uv = vec2(theta / 2.0 / PI, phi / PI);
 vec4 texel = decodeHDR(texture2D(environmentMap, fract(uv)));
#else
 #if defined(LOD) || defined(SUPPORT_TEXTURE_LOD)
 vec4 texel = decodeHDR(textureCubeLodEXT(environmentMap, V, lod));
 #else
 vec4 texel = decodeHDR(textureCube(environmentMap, V));
 #endif
#endif
#ifdef SRGB_DECODE
 texel = sRGBToLinear(texel);
#endif
#ifdef TONEMAPPING
 texel.rgb = ACESToneMapping(texel.rgb);
#endif
#ifdef SRGB_ENCODE
 texel = linearTosRGB(texel);
#endif
 gl_FragColor = encodeHDR(vec4(texel.rgb, 1.0));
}
@end`;G.import(Cd);var Ld=wi.extend(function(){var e=new G({vertex:G.source("clay.skybox.vertex"),fragment:G.source("clay.skybox.fragment")}),t=new tr({shader:e,depthMask:!1});return{scene:null,geometry:new pu,material:t,environmentMap:null,culling:!1,_dummyCamera:new xt}},function(){var e=this.scene;e&&this.attachScene(e),this.environmentMap&&this.setEnvironmentMap(this.environmentMap)},{attachScene:function(e){this.scene&&this.detachScene(),e.skybox=this,this.scene=e,e.on("beforerender",this._beforeRenderScene,this)},detachScene:function(){this.scene&&(this.scene.off("beforerender",this._beforeRenderScene),this.scene.skybox=null),this.scene=null},dispose:function(e){this.detachScene(),this.geometry.dispose(e)},setEnvironmentMap:function(e){e.textureType==="texture2D"?(this.material.define("EQUIRECTANGULAR"),e.minFilter=ne.LINEAR):this.material.undefine("EQUIRECTANGULAR"),this.material.set("environmentMap",e)},getEnvironmentMap:function(){return this.material.get("environmentMap")},_beforeRenderScene:function(e,t,r){this.renderSkybox(e,r)},renderSkybox:function(e,t){var r=this._dummyCamera;r.aspect=e.getViewportAspect(),r.fov=t.fov||50,r.updateProjectionMatrix(),re.invert(r.invProjectionMatrix,r.projectionMatrix),r.worldTransform.copy(t.worldTransform),r.viewMatrix.copy(t.viewMatrix),this.position.copy(t.getWorldPosition()),this.update(),e.gl.disable(e.gl.BLEND),this.material.get("lod")>0?this.material.define("fragment","LOD"):this.material.undefine("fragment","LOD"),e.renderPass([this],r)}});const Gn=Ld;var Md=542327876,Dd=131072,Pd=512,Rd=4;function Ds(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}var Nd=31,Id=Ds("DXT1"),Od=Ds("DXT3"),Bd=Ds("DXT5"),Fd=0,Ud=1,zd=2,Gd=3,kd=4,Hd=7,Vd=20,Wd=21,Xd=28,jd={parse:function(e,t){var r=new Int32Array(e,0,Nd);if(r[Fd]!==Md||!r(Vd)&Rd)return null;var i=r(Wd),n=r[kd],a=r[Gd],o=r[Xd]&Pd,s=r[zd]&Dd,l,h;switch(i){case Id:l=8,h=ne.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case Od:l=16,h=ne.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case Bd:l=16,h=ne.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return null}var u=r[Ud]+4,f=o?6:1,d=1;s&&(d=Math.max(1,r[Hd]));for(var c=[],v=0;v<f;v++){var p=n,g=a;c[v]=new ge({width:p,height:g,format:h});for(var m=[],_=0;_<d;_++){var x=Math.max(4,p)/4*Math.max(4,g)/4*l,y=new Uint8Array(e,u,x);u+=x,p*=.5,g*=.5,m[_]=y}c[v].pixels=m[0],s&&(c[v].mipmaps=m)}if(t)t.width=c[0].width,t.height=c[0].height,t.format=c[0].format,t.pixels=c[0].pixels,t.mipmaps=c[0].mipmaps;else return c[0]}};const Zd=jd;var Fa=String.fromCharCode,qd=8,Yd=32767;function Kd(e,t,r,i){if(e[3]>0){var n=Math.pow(2,e[3]-128-8+i);t[r+0]=e[0]*n,t[r+1]=e[1]*n,t[r+2]=e[2]*n}else t[r+0]=0,t[r+1]=0,t[r+2]=0;return t[r+3]=1,t}function $d(e,t,r){for(var i="",n=t;n<r;n++)i+=Fa(e[n]);return i}function Qd(e,t){t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3]}function Zl(e,t,r,i){for(var n=0,a=0,o=i;o>0;)if(e[a][0]=t[r++],e[a][1]=t[r++],e[a][2]=t[r++],e[a][3]=t[r++],e[a][0]===1&&e[a][1]===1&&e[a][2]===1){for(var s=e[a][3]<<n>>>0;s>0;s--)Qd(e[a-1],e[a]),a++,o--;n+=8}else a++,o--,n=0;return r}function Jd(e,t,r,i){if(i<qd|i>Yd)return Zl(e,t,r,i);var n=t[r++];if(n!=2)return Zl(e,t,r-1,i);if(e[0][1]=t[r++],e[0][2]=t[r++],n=t[r++],(e[0][2]<<8>>>0|n)>>>0!==i)return null;for(var n=0;n<4;n++)for(var a=0;a<i;){var o=t[r++];if(o>128){o=(o&127)>>>0;for(var s=t[r++];o--;)e[a++][n]=s}else for(;o--;)e[a++][n]=t[r++]}return r}var ev={parseRGBE:function(e,t,r){r==null&&(r=0);var i=new Uint8Array(e),n=i.length;if($d(i,0,2)==="#?"){for(var a=2;a<n&&!(Fa(i[a])===`
`&&Fa(i[a+1])===`
`);a++);if(!(a>=n)){a+=2;for(var o="";a<n;a++){var s=Fa(i[a]);if(s===`
`)break;o+=s}var l=o.split(" "),h=parseInt(l[1]),u=parseInt(l[3]);if(!(!u||!h)){for(var f=a+1,d=[],c=0;c<u;c++){d[c]=[];for(var v=0;v<4;v++)d[c][v]=0}for(var p=new Float32Array(u*h*4),g=0,m=0;m<h;m++){var f=Jd(d,i,f,u);if(!f)return null;for(var c=0;c<u;c++)Kd(d[c],p,g,r),g+=4}return t||(t=new ge),t.width=u,t.height=h,t.pixels=p,t.type=ne.FLOAT,t}}}},parseRGBEFromPNG:function(e){}};const tv=ev;var Ua={loadTexture:function(e,t,r,i){var n;if(typeof t=="function"?(r=t,i=r,t={}):t=t||{},typeof e=="string"){if(e.match(/.hdr$/)||t.fileType==="hdr")return n=new ge({width:0,height:0,sRGB:!1}),Ua._fetchTexture(e,function(a){tv.parseRGBE(a,n,t.exposure),n.dirty(),r&&r(n)},i),n;e.match(/.dds$/)||t.fileType==="dds"?(n=new ge({width:0,height:0}),Ua._fetchTexture(e,function(a){Zd.parse(a,n),n.dirty(),r&&r(n)},i)):(n=new ge,n.load(e),n.success(r),n.error(i))}else typeof e=="object"&&typeof e.px<"u"&&(n=new zn,n.load(e),n.success(r),n.error(i));return n},loadPanorama:function(e,t,r,i,n,a){var o=this;typeof i=="function"?(n=i,a=n,i={}):i=i||{},Ua.loadTexture(t,i,function(s){s.flipY=i.flipY||!1,o.panoramaToCubeMap(e,s,r,i),s.dispose(e),n&&n(r)},a)},panoramaToCubeMap:function(e,t,r,i){var n=new Ms,a=new Gn({scene:new li});return a.setEnvironmentMap(t),i=i||{},i.encodeRGBM&&a.material.define("fragment","RGBM_ENCODE"),r.sRGB=t.sRGB,n.texture=r,n.render(e,a.scene),n.texture=null,n.dispose(e),r},heightToNormal:function(e,t){var r=document.createElement("canvas"),i=r.width=e.width,n=r.height=e.height,a=r.getContext("2d");a.drawImage(e,0,0,i,n),t=t||!1;for(var o=a.getImageData(0,0,i,n),s=a.createImageData(i,n),l=0;l<o.data.length;l+=4){if(t){var h=o.data[l],u=o.data[l+1],f=o.data[l+2],d=Math.abs(h-u)+Math.abs(u-f);if(d>20)return console.warn("Given image is not a height map"),e}var c,v,p,g;l%(i*4)===0?(c=o.data[l],p=o.data[l+4]):l%(i*4)===(i-1)*4?(c=o.data[l-4],p=o.data[l]):(c=o.data[l-4],p=o.data[l+4]),l<i*4?(v=o.data[l],g=o.data[l+i*4]):l>i*(n-1)*4?(v=o.data[l-i*4],g=o.data[l]):(v=o.data[l-i*4],g=o.data[l+i*4]),s.data[l]=c-p+127,s.data[l+1]=v-g+127,s.data[l+2]=255,s.data[l+3]=255}return a.putImageData(s,0,0),r},isHeightImage:function(e,t,r){if(!e||!e.width||!e.height)return!1;var i=document.createElement("canvas"),n=i.getContext("2d"),a=t||32;r=r||20,i.width=i.height=a,n.drawImage(e,0,0,a,a);for(var o=n.getImageData(0,0,a,a),s=0;s<o.data.length;s+=4){var l=o.data[s],h=o.data[s+1],u=o.data[s+2],f=Math.abs(l-h)+Math.abs(h-u);if(f>r)return!1}return!0},_fetchTexture:function(e,t,r){ft.request.get({url:e,responseType:"arraybuffer",onload:t,onerror:r})},createChessboard:function(e,t,r,i){e=e||512,t=t||64,r=r||"black",i=i||"white";var n=Math.ceil(e/t),a=document.createElement("canvas");a.width=e,a.height=e;var o=a.getContext("2d");o.fillStyle=i,o.fillRect(0,0,e,e),o.fillStyle=r;for(var s=0;s<n;s++)for(var l=0;l<n;l++){var h=l%2?s%2:s%2-1;h&&o.fillRect(s*t,l*t,t,t)}var u=new ge({image:a,anisotropic:8});return u},createBlank:function(e){var t=document.createElement("canvas");t.width=1,t.height=1;var r=t.getContext("2d");r.fillStyle=e,r.fillRect(0,0,1,1);var i=new ge({image:t});return i}};const Ei=Ua;var ss=["mousedown","mouseup","mousemove","mouseover","mouseout","click","dblclick","contextmenu"];function ls(e){return"_on"+e}var hs=function(e){var t=this;this._texture=new ge({anisotropic:32,flipY:!1,surface:this,dispose:function(r){t.dispose(),ge.prototype.dispose.call(this,r)}}),ss.forEach(function(r){this[ls(r)]=function(i){i.triangle&&this._meshes.forEach(function(n){this.dispatchEvent(r,n,i.triangle,i.point)},this)}},this),this._meshes=[],e&&this.setECharts(e),this.onupdate=null};hs.prototype={constructor:hs,getTexture:function(){return this._texture},setECharts:function(e){this._chart=e;var t=e.getDom();if(!(t instanceof HTMLCanvasElement))console.error("ECharts must init on canvas if it is used as texture."),t=document.createElement("canvas");else{var r=this,i=e.getZr(),n=i.__oldRefreshImmediately||i.refreshImmediately;i.refreshImmediately=function(){n.call(this),r._texture.dirty(),r.onupdate&&r.onupdate()},i.__oldRefreshImmediately=n}this._texture.image=t,this._texture.dirty(),this.onupdate&&this.onupdate()},dispatchEvent:function(){var e=new Z,t=new Z,r=new Z,i=new Vt,n=new Vt,a=new Vt,o=new Vt,s=new Z;return function(l,h,u,f){var d=h.geometry,c=d.attributes.position,v=d.attributes.texcoord0,p=Z.dot,g=Z.cross;c.get(u[0],e.array),c.get(u[1],t.array),c.get(u[2],r.array),v.get(u[0],i.array),v.get(u[1],n.array),v.get(u[2],a.array),g(s,t,r);var m=p(e,s),_=p(f,s)/m;g(s,r,e);var x=p(f,s)/m;g(s,e,t);var y=p(f,s)/m;Vt.scale(o,i,_),Vt.scaleAndAdd(o,o,n,x),Vt.scaleAndAdd(o,o,a,y);var T=o.x*this._chart.getWidth(),w=o.y*this._chart.getHeight();this._chart.getZr().handler.dispatch(l,{zrX:T,zrY:w})}}(),attachToMesh:function(e){this._meshes.indexOf(e)>=0||(ss.forEach(function(t){e.on(t,this[ls(t)],this)},this),this._meshes.push(e))},detachFromMesh:function(e){var t=this._meshes.indexOf(e);t>=0&&this._meshes.splice(t,1),ss.forEach(function(r){e.off(r,this[ls(r)])},this)},dispose:function(){this._meshes.forEach(function(e){this.detachFromMesh(e)},this)}};const rv=hs;var iv=tn.extend({left:-1,right:1,near:-1,far:1,top:1,bottom:-1},{updateProjectionMatrix:function(){this.projectionMatrix.ortho(this.left,this.right,this.bottom,this.top,this.near,this.far)},decomposeProjectionMatrix:function(){var e=this.projectionMatrix.array;this.left=(-1-e[12])/e[0],this.right=(1-e[12])/e[0],this.top=(1-e[13])/e[5],this.bottom=(-1-e[13])/e[5],this.near=-(-1-e[14])/e[10],this.far=-(1-e[14])/e[10]},clone:function(){var e=tn.prototype.clone.call(this);return e.left=this.left,e.right=this.right,e.near=this.near,e.far=this.far,e.top=this.top,e.bottom=this.bottom,e}});const rn=iv,nv=`
@export clay.compositor.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;
varying vec2 v_Texcoord;
void main()
{
 v_Texcoord = texcoord;
 gl_Position = worldViewProjection * vec4(position, 1.0);
}
@end`;G.import(nv);var av=new io,ql=new wi({geometry:av,frustumCulling:!1}),ov=new rn,sv=Bt.extend(function(){return{fragment:"",outputs:null,material:null,blendWithPrevious:!1,clearColor:!1,clearDepth:!0}},function(){var e=new G(G.source("clay.compositor.vertex"),this.fragment),t=new tr({shader:e});t.enableTexturesAll(),this.material=t},{setUniform:function(e,t){this.material.setUniform(e,t)},getUniform:function(e){var t=this.material.uniforms[e];if(t)return t.value},attachOutput:function(e,t){this.outputs||(this.outputs={}),t=t||I.COLOR_ATTACHMENT0,this.outputs[t]=e},detachOutput:function(e){for(var t in this.outputs)this.outputs[t]===e&&(this.outputs[t]=null)},bind:function(e,t){if(this.outputs)for(var r in this.outputs){var i=this.outputs[r];i&&t.attach(i,r)}t&&t.bind(e)},unbind:function(e,t){t.unbind(e)},render:function(e,t){var r=e.gl;if(t){this.bind(e,t);var i=e.getGLExtension("EXT_draw_buffers");if(i&&this.outputs){var n=[];for(var a in this.outputs)a=+a,a>=r.COLOR_ATTACHMENT0&&a<=r.COLOR_ATTACHMENT0+8&&n.push(a);i.drawBuffersEXT(n)}}this.trigger("beforerender",this,e);var o=this.clearDepth?r.DEPTH_BUFFER_BIT:0;if(r.depthMask(!0),this.clearColor){o=o|r.COLOR_BUFFER_BIT,r.colorMask(!0,!0,!0,!0);var s=this.clearColor;Array.isArray(s)&&r.clearColor(s[0],s[1],s[2],s[3])}r.clear(o),this.blendWithPrevious?(r.enable(r.BLEND),this.material.transparent=!0):(r.disable(r.BLEND),this.material.transparent=!1),this.renderQuad(e),this.trigger("afterrender",this,e),t&&this.unbind(e,t)},renderQuad:function(e){ql.material=this.material,e.renderPass([ql],ov)},dispose:function(e){}});const ct=sv,lv=`#define SAMPLE_NUMBER 1024
#define PI 3.14159265358979
uniform sampler2D normalDistribution;
uniform vec2 viewportSize : [512, 256];
const vec3 N = vec3(0.0, 0.0, 1.0);
const float fSampleNumber = float(SAMPLE_NUMBER);
vec3 importanceSampleNormal(float i, float roughness, vec3 N) {
 vec3 H = texture2D(normalDistribution, vec2(roughness, i)).rgb;
 vec3 upVector = abs(N.y) > 0.999 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
 vec3 tangentX = normalize(cross(N, upVector));
 vec3 tangentZ = cross(N, tangentX);
 return normalize(tangentX * H.x + N * H.y + tangentZ * H.z);
}
float G_Smith(float roughness, float NoV, float NoL) {
 float k = roughness * roughness / 2.0;
 float G1V = NoV / (NoV * (1.0 - k) + k);
 float G1L = NoL / (NoL * (1.0 - k) + k);
 return G1L * G1V;
}
void main() {
 vec2 uv = gl_FragCoord.xy / viewportSize;
 float NoV = uv.x;
 float roughness = uv.y;
 vec3 V;
 V.x = sqrt(1.0 - NoV * NoV);
 V.y = 0.0;
 V.z = NoV;
 float A = 0.0;
 float B = 0.0;
 for (int i = 0; i < SAMPLE_NUMBER; i++) {
 vec3 H = importanceSampleNormal(float(i) / fSampleNumber, roughness, N);
 vec3 L = reflect(-V, H);
 float NoL = clamp(L.z, 0.0, 1.0);
 float NoH = clamp(H.z, 0.0, 1.0);
 float VoH = clamp(dot(V, H), 0.0, 1.0);
 if (NoL > 0.0) {
 float G = G_Smith(roughness, NoV, NoL);
 float G_Vis = G * VoH / (NoH * NoV);
 float Fc = pow(1.0 - VoH, 5.0);
 A += (1.0 - Fc) * G_Vis;
 B += Fc * G_Vis;
 }
 }
 gl_FragColor = vec4(vec2(A, B) / fSampleNumber, 0.0, 1.0);
}
`,hv=`#define SHADER_NAME prefilter
#define SAMPLE_NUMBER 1024
#define PI 3.14159265358979
uniform mat4 viewInverse : VIEWINVERSE;
uniform samplerCube environmentMap;
uniform sampler2D normalDistribution;
uniform float roughness : 0.5;
varying vec2 v_Texcoord;
varying vec3 v_WorldPosition;
@import clay.util.rgbm
vec3 importanceSampleNormal(float i, float roughness, vec3 N) {
 vec3 H = texture2D(normalDistribution, vec2(roughness, i)).rgb;
 vec3 upVector = abs(N.y) > 0.999 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
 vec3 tangentX = normalize(cross(N, upVector));
 vec3 tangentZ = cross(N, tangentX);
 return normalize(tangentX * H.x + N * H.y + tangentZ * H.z);
}
void main() {
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(v_WorldPosition - eyePos);
 vec3 N = V;
 vec3 prefilteredColor = vec3(0.0);
 float totalWeight = 0.0;
 float fMaxSampleNumber = float(SAMPLE_NUMBER);
 for (int i = 0; i < SAMPLE_NUMBER; i++) {
 vec3 H = importanceSampleNormal(float(i) / fMaxSampleNumber, roughness, N);
 vec3 L = reflect(-V, H);
 float NoL = clamp(dot(N, L), 0.0, 1.0);
 if (NoL > 0.0) {
 prefilteredColor += decodeHDR(textureCube(environmentMap, L)).rgb * NoL;
 totalWeight += NoL;
 }
 }
 gl_FragColor = encodeHDR(vec4(prefilteredColor / totalWeight, 1.0));
}
`;var Ai={},Go=["px","nx","py","ny","pz","nz"];Ai.prefilterEnvironmentMap=function(e,t,r,i,n){(!n||!i)&&(i=Ai.generateNormalDistribution(),n=Ai.integrateBRDF(e,i)),r=r||{};var a=r.width||64,o=r.height||64,s=r.type||t.type,l=new zn({width:a,height:o,type:s,flipY:!1,mipmaps:[]});l.isPowerOfTwo()||console.warn("Width and height must be power of two to enable mipmap.");var h=Math.min(a,o),u=Math.log(h)/Math.log(2)+1,f=new tr({shader:new G({vertex:G.source("clay.skybox.vertex"),fragment:hv})});f.set("normalDistribution",i),r.encodeRGBM&&f.define("fragment","RGBM_ENCODE"),r.decodeRGBM&&f.define("fragment","RGBM_DECODE");var d=new li,c;if(t.textureType==="texture2D"){var v=new zn({width:a,height:o,type:s===ne.FLOAT?ne.HALF_FLOAT:s});Ei.panoramaToCubeMap(e,t,v,{encodeRGBM:r.decodeRGBM}),t=v}c=new Gn({scene:d,material:f}),c.material.set("environmentMap",t);var p=new Ms({texture:l});r.encodeRGBM&&(s=l.type=ne.UNSIGNED_BYTE);for(var g=new ge({width:a,height:o,type:s}),m=new At({depthBuffer:!1}),_=ft[s===ne.UNSIGNED_BYTE?"Uint8Array":"Float32Array"],x=0;x<u;x++){l.mipmaps[x]={pixels:{}},c.material.set("roughness",x/(u-1));for(var y=g.width,T=2*Math.atan(y/(y-.5))/Math.PI*180,w=0;w<Go.length;w++){var E=new _(g.width*g.height*4);m.attach(g),m.bind(e);var S=p.getCamera(Go[w]);S.fov=T,e.render(d,S),e.gl.readPixels(0,0,g.width,g.height,ne.RGBA,s,E),m.unbind(e),l.mipmaps[x].pixels[Go[w]]=E}g.width/=2,g.height/=2,g.dirty()}return m.dispose(e),g.dispose(e),c.dispose(e),i.dispose(e),{environmentMap:l,brdfLookup:n,normalDistribution:i,maxMipmapLevel:u}};Ai.integrateBRDF=function(e,t){t=t||Ai.generateNormalDistribution();var r=new At({depthBuffer:!1}),i=new ct({fragment:lv}),n=new ge({width:512,height:256,type:ne.HALF_FLOAT,wrapS:ne.CLAMP_TO_EDGE,wrapT:ne.CLAMP_TO_EDGE,minFilter:ne.NEAREST,magFilter:ne.NEAREST,useMipmap:!1});return i.setUniform("normalDistribution",t),i.setUniform("viewportSize",[512,256]),i.attachOutput(n),i.render(e,r),r.dispose(e),n};Ai.generateNormalDistribution=function(r,i){for(var r=r||256,i=i||1024,n=new ge({width:r,height:i,type:ne.FLOAT,minFilter:ne.NEAREST,magFilter:ne.NEAREST,wrapS:ne.CLAMP_TO_EDGE,wrapT:ne.CLAMP_TO_EDGE,useMipmap:!1}),a=new Float32Array(i*r*4),o=[],s=0;s<r;s++){for(var l=s/r,h=l*l,u=0;u<i;u++){var f=(u<<16|u>>>16)>>>0;f=((f&1431655765)<<1|(f&2863311530)>>>1)>>>0,f=((f&858993459)<<2|(f&3435973836)>>>2)>>>0,f=((f&252645135)<<4|(f&4042322160)>>>4)>>>0,f=(((f&16711935)<<8|(f&4278255360)>>>8)>>>0)/4294967296;var d=Math.sqrt((1-f)/(1+(h*h-1)*f));o[u]=d}for(var u=0;u<i;u++){var c=(u*r+s)*4,d=o[u],v=Math.sqrt(1-d*d),p=u/i,g=2*Math.PI*p;a[c]=v*Math.cos(g),a[c+1]=d,a[c+2]=v*Math.sin(g),a[c+3]=1}}return n.pixels=a,n};const za=Ai;var uv=cr.extend({cubemap:null,castShadow:!1,_normalDistribution:null,_brdfLookup:null},{type:"AMBIENT_CUBEMAP_LIGHT",prefilter:function(e,t){if(!e.getGLExtension("EXT_shader_texture_lod")){console.warn("Device not support textureCubeLodEXT");return}this._brdfLookup||(this._normalDistribution=za.generateNormalDistribution(),this._brdfLookup=za.integrateBRDF(e,this._normalDistribution));var r=this.cubemap;if(!r.__prefiltered){var i=za.prefilterEnvironmentMap(e,r,{encodeRGBM:!0,width:t,height:t},this._normalDistribution,this._brdfLookup);this.cubemap=i.environmentMap,this.cubemap.__prefiltered=!0,r.dispose(e)}},getBRDFLookup:function(){return this._brdfLookup},uniformTemplates:{ambientCubemapLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}},ambientCubemapLightCubemap:{type:"t",value:function(e){return e.cubemap}},ambientCubemapLightBRDFLookup:{type:"t",value:function(e){return e._brdfLookup}}}});const fv=uv;var cv=cr.extend({castShadow:!1,coefficients:[]},function(){this._coefficientsTmpArr=new ft.Float32Array(9*3)},{type:"AMBIENT_SH_LIGHT",uniformTemplates:{ambientSHLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}},ambientSHLightCoefficients:{type:"3f",value:function(e){for(var t=e._coefficientsTmpArr,r=0;r<e.coefficients.length;r++)t[r]=e.coefficients[r];return t}}}});const dv=cv;var mu={},bi=["px","nx","py","ny","pz","nz"];function vv(e,t){var r=e[0],i=e[1],n=e[2];return t===0?1:t===1?r:t===2?i:t===3?n:t===4?r*n:t===5?i*n:t===6?r*i:t===7?3*n*n-1:r*r-i*i}var pv={px:[2,1,0,-1,-1,1],nx:[2,1,0,1,-1,-1],py:[0,2,1,1,-1,-1],ny:[0,2,1,1,1,1],pz:[0,1,2,-1,-1,-1],nz:[0,1,2,1,-1,1]};function mv(e,t,r,i){for(var n=new ft.Float32Array(27),a=A.create(),o=A.create(),s=A.create(),l=0;l<9;l++){for(var h=A.create(),u=0;u<bi.length;u++){for(var f=t[bi[u]],d=A.create(),c=0,v=0,p=pv[bi[u]],g=0;g<i;g++)for(var m=0;m<r;m++){a[0]=m/(r-1)*2-1,a[1]=g/(i-1)*2-1,a[2]=-1,A.normalize(a,a),s[0]=a[p[0]]*p[3],s[1]=a[p[1]]*p[4],s[2]=a[p[2]]*p[5],o[0]=f[v++]/255,o[1]=f[v++]/255,o[2]=f[v++]/255;var _=f[v++]/255*8.12;o[0]*=_,o[1]*=_,o[2]*=_,A.scaleAndAdd(d,d,o,vv(s,l)*-a[2]),c+=-a[2]}A.scaleAndAdd(h,h,d,1/c)}n[l*3]=h[0]/6,n[l*3+1]=h[1]/6,n[l*3+2]=h[2]/6}return n}mu.projectEnvironmentMap=function(e,t,r){r=r||{},r.lod=r.lod||0;var i,n=new li,a=64;t.textureType==="texture2D"?i=new Gn({scene:n,environmentMap:t}):(a=t.image&&t.image.px?t.image.px.width:t.width,i=new Gn({scene:n,environmentMap:t}));var o=Math.ceil(a/Math.pow(2,r.lod)),s=Math.ceil(a/Math.pow(2,r.lod)),l=new ge({width:o,height:s}),h=new At;i.material.define("fragment","RGBM_ENCODE"),r.decodeRGBM&&i.material.define("fragment","RGBM_DECODE"),i.material.set("lod",r.lod);for(var u=new Ms({texture:l}),f={},d=0;d<bi.length;d++){f[bi[d]]=new Uint8Array(o*s*4);var c=u.getCamera(bi[d]);c.fov=90,h.attach(l),h.bind(e),e.render(n,c),e.gl.readPixels(0,0,o,s,ne.RGBA,ne.UNSIGNED_BYTE,f[bi[d]]),h.unbind(e)}return i.dispose(e),h.dispose(e),l.dispose(e),mv(e,f,o,s)};const gv=mu;var _v={firstNotNull:function(){for(var e=0,t=arguments.length;e<t;e++)if(arguments[e]!=null)return arguments[e]},queryDataIndex:function(e,t){if(t.dataIndexInside!=null)return t.dataIndexInside;if(t.dataIndex!=null)return ur(t.dataIndex)?al(t.dataIndex,function(r){return e.indexOfRawIndex(r)}):e.indexOfRawIndex(t.dataIndex);if(t.name!=null)return ur(t.name)?al(t.name,function(r){return e.indexOfName(r)}):e.indexOfName(t.name)}};const xe=_v;var yv=Pe.extend({dynamic:!1,widthSegments:40,heightSegments:20,phiStart:0,phiLength:Math.PI*2,thetaStart:0,thetaLength:Math.PI,radius:1},function(){this.build()},{build:function(){var e=this.heightSegments,t=this.widthSegments,r=this.attributes.position,i=this.attributes.texcoord0,n=this.attributes.normal,a=(t+1)*(e+1);r.init(a),i.init(a),n.init(a);var o=a>65535?Uint32Array:Uint16Array,s=this.indices=new o(t*e*6),l,h,u,f,d,c,v,x=this.radius,p=this.phiStart,g=this.phiLength,m=this.thetaStart,_=this.thetaLength,x=this.radius,y=[],T=[],w=0,E=1/x;for(v=0;v<=e;v++)for(c=0;c<=t;c++)f=c/t,d=v/e,l=-x*Math.cos(p+f*g)*Math.sin(m+d*_),h=x*Math.cos(m+d*_),u=x*Math.sin(p+f*g)*Math.sin(m+d*_),y[0]=l,y[1]=h,y[2]=u,T[0]=f,T[1]=d,r.set(w,y),i.set(w,T),y[0]*=E,y[1]*=E,y[2]*=E,n.set(w,y),w++;var S,D,M,C,N=t+1,O=0;for(v=0;v<e;v++)for(c=0;c<t;c++)D=v*N+c,S=v*N+c+1,C=(v+1)*N+c+1,M=(v+1)*N+c,s[O++]=S,s[O++]=D,s[O++]=C,s[O++]=D,s[O++]=M,s[O++]=C;this.boundingBox=new Nt,this.boundingBox.max.set(x,x,x),this.boundingBox.min.set(-x,-x,-x)}});const xv=yv;var Tv=cr.extend({castShadow:!1},{type:"AMBIENT_LIGHT",uniformTemplates:{ambientLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}}});const wv=Tv;var bv=cr.extend({shadowBias:.001,shadowSlopeScale:2,shadowCascade:1,cascadeSplitLogFactor:.2},{type:"DIRECTIONAL_LIGHT",uniformTemplates:{directionalLightDirection:{type:"3f",value:function(e){return e.__dir=e.__dir||new Z,e.__dir.copy(e.worldTransform.z).normalize().negate().array}},directionalLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}},clone:function(){var e=cr.prototype.clone.call(this);return e.shadowBias=this.shadowBias,e.shadowSlopeScale=this.shadowSlopeScale,e}});const Sv=bv;var Ev=cr.extend({range:100,castShadow:!1},{type:"POINT_LIGHT",uniformTemplates:{pointLightPosition:{type:"3f",value:function(e){return e.getWorldPosition().array}},pointLightRange:{type:"1f",value:function(e){return e.range}},pointLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}},clone:function(){var e=cr.prototype.clone.call(this);return e.range=this.range,e}});const Av=Ev;var Cv=cr.extend({range:20,umbraAngle:30,penumbraAngle:45,falloffFactor:2,shadowBias:.001,shadowSlopeScale:2},{type:"SPOT_LIGHT",uniformTemplates:{spotLightPosition:{type:"3f",value:function(e){return e.getWorldPosition().array}},spotLightRange:{type:"1f",value:function(e){return e.range}},spotLightUmbraAngleCosine:{type:"1f",value:function(e){return Math.cos(e.umbraAngle*Math.PI/180)}},spotLightPenumbraAngleCosine:{type:"1f",value:function(e){return Math.cos(e.penumbraAngle*Math.PI/180)}},spotLightFalloffFactor:{type:"1f",value:function(e){return e.falloffFactor}},spotLightDirection:{type:"3f",value:function(e){return e.__dir=e.__dir||new Z,e.__dir.copy(e.worldTransform.z).negate().array}},spotLightColor:{type:"3f",value:function(e){var t=e.color,r=e.intensity;return[t[0]*r,t[1]*r,t[2]*r]}}},clone:function(){var e=cr.prototype.clone.call(this);return e.range=this.range,e.umbraAngle=this.umbraAngle,e.penumbraAngle=this.penumbraAngle,e.falloffFactor=this.falloffFactor,e.shadowBias=this.shadowBias,e.shadowSlopeScale=this.shadowSlopeScale,e}});const Lv=Cv;var Me=function(e,t,r,i){e=e||0,t=t||0,r=r||0,i=i||0,this.array=$.fromValues(e,t,r,i),this._dirty=!0};Me.prototype={constructor:Me,add:function(e){return $.add(this.array,this.array,e.array),this._dirty=!0,this},set:function(e,t,r,i){return this.array[0]=e,this.array[1]=t,this.array[2]=r,this.array[3]=i,this._dirty=!0,this},setArray:function(e){return this.array[0]=e[0],this.array[1]=e[1],this.array[2]=e[2],this.array[3]=e[3],this._dirty=!0,this},clone:function(){return new Me(this.x,this.y,this.z,this.w)},copy:function(e){return $.copy(this.array,e.array),this._dirty=!0,this},dist:function(e){return $.dist(this.array,e.array)},distance:function(e){return $.distance(this.array,e.array)},div:function(e){return $.div(this.array,this.array,e.array),this._dirty=!0,this},divide:function(e){return $.divide(this.array,this.array,e.array),this._dirty=!0,this},dot:function(e){return $.dot(this.array,e.array)},len:function(){return $.len(this.array)},length:function(){return $.length(this.array)},lerp:function(e,t,r){return $.lerp(this.array,e.array,t.array,r),this._dirty=!0,this},min:function(e){return $.min(this.array,this.array,e.array),this._dirty=!0,this},max:function(e){return $.max(this.array,this.array,e.array),this._dirty=!0,this},mul:function(e){return $.mul(this.array,this.array,e.array),this._dirty=!0,this},multiply:function(e){return $.multiply(this.array,this.array,e.array),this._dirty=!0,this},negate:function(){return $.negate(this.array,this.array),this._dirty=!0,this},normalize:function(){return $.normalize(this.array,this.array),this._dirty=!0,this},random:function(e){return $.random(this.array,e),this._dirty=!0,this},scale:function(e){return $.scale(this.array,this.array,e),this._dirty=!0,this},scaleAndAdd:function(e,t){return $.scaleAndAdd(this.array,this.array,e.array,t),this._dirty=!0,this},sqrDist:function(e){return $.sqrDist(this.array,e.array)},squaredDistance:function(e){return $.squaredDistance(this.array,e.array)},sqrLen:function(){return $.sqrLen(this.array)},squaredLength:function(){return $.squaredLength(this.array)},sub:function(e){return $.sub(this.array,this.array,e.array),this._dirty=!0,this},subtract:function(e){return $.subtract(this.array,this.array,e.array),this._dirty=!0,this},transformMat4:function(e){return $.transformMat4(this.array,this.array,e.array),this._dirty=!0,this},transformQuat:function(e){return $.transformQuat(this.array,this.array,e.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};var En=Object.defineProperty;if(En){var Aa=Me.prototype;En(Aa,"x",{get:function(){return this.array[0]},set:function(e){this.array[0]=e,this._dirty=!0}}),En(Aa,"y",{get:function(){return this.array[1]},set:function(e){this.array[1]=e,this._dirty=!0}}),En(Aa,"z",{get:function(){return this.array[2]},set:function(e){this.array[2]=e,this._dirty=!0}}),En(Aa,"w",{get:function(){return this.array[3]},set:function(e){this.array[3]=e,this._dirty=!0}})}Me.add=function(e,t,r){return $.add(e.array,t.array,r.array),e._dirty=!0,e};Me.set=function(e,t,r,i,n){$.set(e.array,t,r,i,n),e._dirty=!0};Me.copy=function(e,t){return $.copy(e.array,t.array),e._dirty=!0,e};Me.dist=function(e,t){return $.distance(e.array,t.array)};Me.distance=Me.dist;Me.div=function(e,t,r){return $.divide(e.array,t.array,r.array),e._dirty=!0,e};Me.divide=Me.div;Me.dot=function(e,t){return $.dot(e.array,t.array)};Me.len=function(e){return $.length(e.array)};Me.lerp=function(e,t,r,i){return $.lerp(e.array,t.array,r.array,i),e._dirty=!0,e};Me.min=function(e,t,r){return $.min(e.array,t.array,r.array),e._dirty=!0,e};Me.max=function(e,t,r){return $.max(e.array,t.array,r.array),e._dirty=!0,e};Me.mul=function(e,t,r){return $.multiply(e.array,t.array,r.array),e._dirty=!0,e};Me.multiply=Me.mul;Me.negate=function(e,t){return $.negate(e.array,t.array),e._dirty=!0,e};Me.normalize=function(e,t){return $.normalize(e.array,t.array),e._dirty=!0,e};Me.random=function(e,t){return $.random(e.array,t),e._dirty=!0,e};Me.scale=function(e,t,r){return $.scale(e.array,t.array,r),e._dirty=!0,e};Me.scaleAndAdd=function(e,t,r,i){return $.scaleAndAdd(e.array,t.array,r.array,i),e._dirty=!0,e};Me.sqrDist=function(e,t){return $.sqrDist(e.array,t.array)};Me.squaredDistance=Me.sqrDist;Me.sqrLen=function(e){return $.sqrLen(e.array)};Me.squaredLength=Me.sqrLen;Me.sub=function(e,t,r){return $.subtract(e.array,t.array,r.array),e._dirty=!0,e};Me.subtract=Me.sub;Me.transformMat4=function(e,t,r){return $.transformMat4(e.array,t.array,r.array),e._dirty=!0,e};Me.transformQuat=function(e,t,r){return $.transformQuat(e.array,t.array,r.array),e._dirty=!0,e};const Mv=Me;var Dt={};Dt.create=function(){var e=new Lt(4);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e};Dt.clone=function(e){var t=new Lt(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t};Dt.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e};Dt.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e};Dt.transpose=function(e,t){if(e===t){var r=t[1];e[1]=t[2],e[2]=r}else e[0]=t[0],e[1]=t[2],e[2]=t[1],e[3]=t[3];return e};Dt.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=r*a-n*i;return o?(o=1/o,e[0]=a*o,e[1]=-i*o,e[2]=-n*o,e[3]=r*o,e):null};Dt.adjoint=function(e,t){var r=t[0];return e[0]=t[3],e[1]=-t[1],e[2]=-t[2],e[3]=r,e};Dt.determinant=function(e){return e[0]*e[3]-e[2]*e[1]};Dt.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=r[0],l=r[1],h=r[2],u=r[3];return e[0]=i*s+a*l,e[1]=n*s+o*l,e[2]=i*h+a*u,e[3]=n*h+o*u,e};Dt.mul=Dt.multiply;Dt.rotate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=Math.sin(r),l=Math.cos(r);return e[0]=i*l+a*s,e[1]=n*l+o*s,e[2]=i*-s+a*l,e[3]=n*-s+o*l,e};Dt.scale=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=r[0],l=r[1];return e[0]=i*s,e[1]=n*s,e[2]=a*l,e[3]=o*l,e};Dt.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2))};Dt.LDU=function(e,t,r,i){return e[2]=i[2]/i[0],r[0]=i[0],r[1]=i[1],r[3]=i[3]-e[2]*r[1],[e,t,r]};const rt=Dt;var Ot=function(){this.array=rt.create(),this._dirty=!0};Ot.prototype={constructor:Ot,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},clone:function(){return new Ot().copy(this)},copy:function(e){return rt.copy(this.array,e.array),this._dirty=!0,this},adjoint:function(){return rt.adjoint(this.array,this.array),this._dirty=!0,this},determinant:function(){return rt.determinant(this.array)},identity:function(){return rt.identity(this.array),this._dirty=!0,this},invert:function(){return rt.invert(this.array,this.array),this._dirty=!0,this},mul:function(e){return rt.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return rt.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return rt.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return rt.multiply(this.array,e.array,this.array),this._dirty=!0,this},rotate:function(e){return rt.rotate(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return rt.scale(this.array,this.array,e.array),this._dirty=!0,this},transpose:function(){return rt.transpose(this.array,this.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};Ot.adjoint=function(e,t){return rt.adjoint(e.array,t.array),e._dirty=!0,e};Ot.copy=function(e,t){return rt.copy(e.array,t.array),e._dirty=!0,e};Ot.determinant=function(e){return rt.determinant(e.array)};Ot.identity=function(e){return rt.identity(e.array),e._dirty=!0,e};Ot.invert=function(e,t){return rt.invert(e.array,t.array),e._dirty=!0,e};Ot.mul=function(e,t,r){return rt.mul(e.array,t.array,r.array),e._dirty=!0,e};Ot.multiply=Ot.mul;Ot.rotate=function(e,t,r){return rt.rotate(e.array,t.array,r),e._dirty=!0,e};Ot.scale=function(e,t,r){return rt.scale(e.array,t.array,r.array),e._dirty=!0,e};Ot.transpose=function(e,t){return rt.transpose(e.array,t.array),e._dirty=!0,e};const Dv=Ot;var kt={};kt.create=function(){var e=new Lt(6);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e};kt.clone=function(e){var t=new Lt(6);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t};kt.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e};kt.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e};kt.invert=function(e,t){var r=t[0],i=t[1],n=t[2],a=t[3],o=t[4],s=t[5],l=r*a-i*n;return l?(l=1/l,e[0]=a*l,e[1]=-i*l,e[2]=-n*l,e[3]=r*l,e[4]=(n*s-a*o)*l,e[5]=(i*o-r*s)*l,e):null};kt.determinant=function(e){return e[0]*e[3]-e[1]*e[2]};kt.multiply=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=r[0],u=r[1],f=r[2],d=r[3],c=r[4],v=r[5];return e[0]=i*h+a*u,e[1]=n*h+o*u,e[2]=i*f+a*d,e[3]=n*f+o*d,e[4]=i*c+a*v+s,e[5]=n*c+o*v+l,e};kt.mul=kt.multiply;kt.rotate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=Math.sin(r),u=Math.cos(r);return e[0]=i*u+a*h,e[1]=n*u+o*h,e[2]=i*-h+a*u,e[3]=n*-h+o*u,e[4]=s,e[5]=l,e};kt.scale=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=r[0],u=r[1];return e[0]=i*h,e[1]=n*h,e[2]=a*u,e[3]=o*u,e[4]=s,e[5]=l,e};kt.translate=function(e,t,r){var i=t[0],n=t[1],a=t[2],o=t[3],s=t[4],l=t[5],h=r[0],u=r[1];return e[0]=i,e[1]=n,e[2]=a,e[3]=o,e[4]=i*h+a*u+s,e[5]=n*h+o*u+l,e};kt.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+1)};const ut=kt;var Gt=function(){this.array=ut.create(),this._dirty=!0};Gt.prototype={constructor:Gt,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},clone:function(){return new Gt().copy(this)},copy:function(e){return ut.copy(this.array,e.array),this._dirty=!0,this},determinant:function(){return ut.determinant(this.array)},identity:function(){return ut.identity(this.array),this._dirty=!0,this},invert:function(){return ut.invert(this.array,this.array),this._dirty=!0,this},mul:function(e){return ut.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return ut.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return ut.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return ut.multiply(this.array,e.array,this.array),this._dirty=!0,this},rotate:function(e){return ut.rotate(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return ut.scale(this.array,this.array,e.array),this._dirty=!0,this},translate:function(e){return ut.translate(this.array,this.array,e.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};Gt.copy=function(e,t){return ut.copy(e.array,t.array),e._dirty=!0,e};Gt.determinant=function(e){return ut.determinant(e.array)};Gt.identity=function(e){return ut.identity(e.array),e._dirty=!0,e};Gt.invert=function(e,t){return ut.invert(e.array,t.array),e._dirty=!0,e};Gt.mul=function(e,t,r){return ut.mul(e.array,t.array,r.array),e._dirty=!0,e};Gt.multiply=Gt.mul;Gt.rotate=function(e,t,r){return ut.rotate(e.array,t.array,r),e._dirty=!0,e};Gt.scale=function(e,t,r){return ut.scale(e.array,t.array,r.array),e._dirty=!0,e};Gt.translate=function(e,t,r){return ut.translate(e.array,t.array,r.array),e._dirty=!0,e};const Pv=Gt;var mt=function(){this.array=Ce.create(),this._dirty=!0};mt.prototype={constructor:mt,setArray:function(e){for(var t=0;t<this.array.length;t++)this.array[t]=e[t];return this._dirty=!0,this},adjoint:function(){return Ce.adjoint(this.array,this.array),this._dirty=!0,this},clone:function(){return new mt().copy(this)},copy:function(e){return Ce.copy(this.array,e.array),this._dirty=!0,this},determinant:function(){return Ce.determinant(this.array)},fromMat2d:function(e){return Ce.fromMat2d(this.array,e.array),this._dirty=!0,this},fromMat4:function(e){return Ce.fromMat4(this.array,e.array),this._dirty=!0,this},fromQuat:function(e){return Ce.fromQuat(this.array,e.array),this._dirty=!0,this},identity:function(){return Ce.identity(this.array),this._dirty=!0,this},invert:function(){return Ce.invert(this.array,this.array),this._dirty=!0,this},mul:function(e){return Ce.mul(this.array,this.array,e.array),this._dirty=!0,this},mulLeft:function(e){return Ce.mul(this.array,e.array,this.array),this._dirty=!0,this},multiply:function(e){return Ce.multiply(this.array,this.array,e.array),this._dirty=!0,this},multiplyLeft:function(e){return Ce.multiply(this.array,e.array,this.array),this._dirty=!0,this},rotate:function(e){return Ce.rotate(this.array,this.array,e),this._dirty=!0,this},scale:function(e){return Ce.scale(this.array,this.array,e.array),this._dirty=!0,this},translate:function(e){return Ce.translate(this.array,this.array,e.array),this._dirty=!0,this},normalFromMat4:function(e){return Ce.normalFromMat4(this.array,e.array),this._dirty=!0,this},transpose:function(){return Ce.transpose(this.array,this.array),this._dirty=!0,this},toString:function(){return"["+Array.prototype.join.call(this.array,",")+"]"},toArray:function(){return Array.prototype.slice.call(this.array)}};mt.adjoint=function(e,t){return Ce.adjoint(e.array,t.array),e._dirty=!0,e};mt.copy=function(e,t){return Ce.copy(e.array,t.array),e._dirty=!0,e};mt.determinant=function(e){return Ce.determinant(e.array)};mt.identity=function(e){return Ce.identity(e.array),e._dirty=!0,e};mt.invert=function(e,t){return Ce.invert(e.array,t.array),e};mt.mul=function(e,t,r){return Ce.mul(e.array,t.array,r.array),e._dirty=!0,e};mt.multiply=mt.mul;mt.fromMat2d=function(e,t){return Ce.fromMat2d(e.array,t.array),e._dirty=!0,e};mt.fromMat4=function(e,t){return Ce.fromMat4(e.array,t.array),e._dirty=!0,e};mt.fromQuat=function(e,t){return Ce.fromQuat(e.array,t.array),e._dirty=!0,e};mt.normalFromMat4=function(e,t){return Ce.normalFromMat4(e.array,t.array),e._dirty=!0,e};mt.rotate=function(e,t,r){return Ce.rotate(e.array,t.array,r),e._dirty=!0,e};mt.scale=function(e,t,r){return Ce.scale(e.array,t.array,r.array),e._dirty=!0,e};mt.transpose=function(e,t){return Ce.transpose(e.array,t.array),e._dirty=!0,e};mt.translate=function(e,t,r){return Ce.translate(e.array,t.array,r.array),e._dirty=!0,e};const Rv=mt;var Nv={_animators:null,getAnimators:function(){return this._animators=this._animators||[],this._animators},animate:function(e,t){this._animators=this._animators||[];var r=this,i;if(e){for(var n=e.split("."),a=r,o=0,s=n.length;o<s;o++)a&&(a=a[n[o]]);a&&(i=a)}else i=r;if(i==null)throw new Error("Target "+e+" not exists");var l=this._animators,h=new Uf(i,t),u=this;return h.during(function(){u.__zr&&u.__zr.refresh()}).done(function(){var f=l.indexOf(h);f>=0&&l.splice(f,1)}),l.push(h),this.__zr&&this.__zr.animation.addAnimator(h),h},stopAnimation:function(e){this._animators=this._animators||[];for(var t=this._animators,r=t.length,i=0;i<r;i++)t[i].stop(e);return t.length=0,this},addAnimatorsToZr:function(e){if(this._animators)for(var t=0;t<this._animators.length;t++)e.animation.addAnimator(this._animators[t])},removeAnimatorsFromZr:function(e){if(this._animators)for(var t=0;t<this._animators.length;t++)e.animation.removeAnimator(this._animators[t])}};const Iv=Nv,gu=`
@export clay.util.rand
highp float rand(vec2 uv) {
 const highp float a = 12.9898, b = 78.233, c = 43758.5453;
 highp float dt = dot(uv.xy, vec2(a,b)), sn = mod(dt, 3.141592653589793);
 return fract(sin(sn) * c);
}
@end
@export clay.util.calculate_attenuation
uniform float attenuationFactor : 5.0;
float lightAttenuation(float dist, float range)
{
 float attenuation = 1.0;
 attenuation = dist*dist/(range*range+1.0);
 float att_s = attenuationFactor;
 attenuation = 1.0/(attenuation*att_s+1.0);
 att_s = 1.0/(att_s+1.0);
 attenuation = attenuation - att_s;
 attenuation /= 1.0 - att_s;
 return clamp(attenuation, 0.0, 1.0);
}
@end
@export clay.util.edge_factor
#ifdef SUPPORT_STANDARD_DERIVATIVES
float edgeFactor(float width)
{
 vec3 d = fwidth(v_Barycentric);
 vec3 a3 = smoothstep(vec3(0.0), d * width, v_Barycentric);
 return min(min(a3.x, a3.y), a3.z);
}
#else
float edgeFactor(float width)
{
 return 1.0;
}
#endif
@end
@export clay.util.encode_float
vec4 encodeFloat(const in float depth)
{
 const vec4 bitShifts = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);
 const vec4 bit_mask = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);
 vec4 res = fract(depth * bitShifts);
 res -= res.xxyz * bit_mask;
 return res;
}
@end
@export clay.util.decode_float
float decodeFloat(const in vec4 color)
{
 const vec4 bitShifts = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
 return dot(color, bitShifts);
}
@end
@export clay.util.float
@import clay.util.encode_float
@import clay.util.decode_float
@end
@export clay.util.rgbm_decode
vec3 RGBMDecode(vec4 rgbm, float range) {
 return range * rgbm.rgb * rgbm.a;
}
@end
@export clay.util.rgbm_encode
vec4 RGBMEncode(vec3 color, float range) {
 if (dot(color, color) == 0.0) {
 return vec4(0.0);
 }
 vec4 rgbm;
 color /= range;
 rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);
 rgbm.a = ceil(rgbm.a * 255.0) / 255.0;
 rgbm.rgb = color / rgbm.a;
 return rgbm;
}
@end
@export clay.util.rgbm
@import clay.util.rgbm_decode
@import clay.util.rgbm_encode
vec4 decodeHDR(vec4 color)
{
#if defined(RGBM_DECODE) || defined(RGBM)
 return vec4(RGBMDecode(color, 8.12), 1.0);
#else
 return color;
#endif
}
vec4 encodeHDR(vec4 color)
{
#if defined(RGBM_ENCODE) || defined(RGBM)
 return RGBMEncode(color.xyz, 8.12);
#else
 return color;
#endif
}
@end
@export clay.util.srgb
vec4 sRGBToLinear(in vec4 value) {
 return vec4(mix(pow(value.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), value.rgb * 0.0773993808, vec3(lessThanEqual(value.rgb, vec3(0.04045)))), value.w);
}
vec4 linearTosRGB(in vec4 value) {
 return vec4(mix(pow(value.rgb, vec3(0.41666)) * 1.055 - vec3(0.055), value.rgb * 12.92, vec3(lessThanEqual(value.rgb, vec3(0.0031308)))), value.w);
}
@end
@export clay.chunk.skinning_header
#ifdef SKINNING
attribute vec3 weight : WEIGHT;
attribute vec4 joint : JOINT;
#ifdef USE_SKIN_MATRICES_TEXTURE
uniform sampler2D skinMatricesTexture : ignore;
uniform float skinMatricesTextureSize: ignore;
mat4 getSkinMatrix(sampler2D tex, float idx) {
 float j = idx * 4.0;
 float x = mod(j, skinMatricesTextureSize);
 float y = floor(j / skinMatricesTextureSize) + 0.5;
 vec2 scale = vec2(skinMatricesTextureSize);
 return mat4(
 texture2D(tex, vec2(x + 0.5, y) / scale),
 texture2D(tex, vec2(x + 1.5, y) / scale),
 texture2D(tex, vec2(x + 2.5, y) / scale),
 texture2D(tex, vec2(x + 3.5, y) / scale)
 );
}
mat4 getSkinMatrix(float idx) {
 return getSkinMatrix(skinMatricesTexture, idx);
}
#else
uniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;
mat4 getSkinMatrix(float idx) {
 return skinMatrix[int(idx)];
}
#endif
#endif
@end
@export clay.chunk.skin_matrix
mat4 skinMatrixWS = getSkinMatrix(joint.x) * weight.x;
if (weight.y > 1e-4)
{
 skinMatrixWS += getSkinMatrix(joint.y) * weight.y;
}
if (weight.z > 1e-4)
{
 skinMatrixWS += getSkinMatrix(joint.z) * weight.z;
}
float weightW = 1.0-weight.x-weight.y-weight.z;
if (weightW > 1e-4)
{
 skinMatrixWS += getSkinMatrix(joint.w) * weightW;
}
@end
@export clay.chunk.instancing_header
#ifdef INSTANCING
attribute vec4 instanceMat1;
attribute vec4 instanceMat2;
attribute vec4 instanceMat3;
#endif
@end
@export clay.chunk.instancing_matrix
mat4 instanceMat = mat4(
 vec4(instanceMat1.xyz, 0.0),
 vec4(instanceMat2.xyz, 0.0),
 vec4(instanceMat3.xyz, 0.0),
 vec4(instanceMat1.w, instanceMat2.w, instanceMat3.w, 1.0)
);
@end
@export clay.util.parallax_correct
vec3 parallaxCorrect(in vec3 dir, in vec3 pos, in vec3 boxMin, in vec3 boxMax) {
 vec3 first = (boxMax - pos) / dir;
 vec3 second = (boxMin - pos) / dir;
 vec3 further = max(first, second);
 float dist = min(further.x, min(further.y, further.z));
 vec3 fixedPos = pos + dir * dist;
 vec3 boxCenter = (boxMax + boxMin) * 0.5;
 return normalize(fixedPos - boxCenter);
}
@end
@export clay.util.clamp_sample
vec4 clampSample(const in sampler2D texture, const in vec2 coord)
{
#ifdef STEREO
 float eye = step(0.5, coord.x) * 0.5;
 vec2 coordClamped = clamp(coord, vec2(eye, 0.0), vec2(0.5 + eye, 1.0));
#else
 vec2 coordClamped = clamp(coord, vec2(0.0), vec2(1.0));
#endif
 return texture2D(texture, coordClamped);
}
@end
@export clay.util.ACES
vec3 ACESToneMapping(vec3 color)
{
 const float A = 2.51;
 const float B = 0.03;
 const float C = 2.43;
 const float D = 0.59;
 const float E = 0.14;
 return (color * (A * color + B)) / (color * (C * color + D) + E);
}
@end`,Ov=`
@export ecgl.common.transformUniforms
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform mat4 worldInverseTranspose : WORLDINVERSETRANSPOSE;
uniform mat4 world : WORLD;
@end

@export ecgl.common.attributes
attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;
attribute vec3 normal : NORMAL;
@end

@export ecgl.common.uv.header
uniform vec2 uvRepeat : [1.0, 1.0];
uniform vec2 uvOffset : [0.0, 0.0];
uniform vec2 detailUvRepeat : [1.0, 1.0];
uniform vec2 detailUvOffset : [0.0, 0.0];

varying vec2 v_Texcoord;
varying vec2 v_DetailTexcoord;
@end

@export ecgl.common.uv.main
v_Texcoord = texcoord * uvRepeat + uvOffset;
v_DetailTexcoord = texcoord * detailUvRepeat + detailUvOffset;
@end

@export ecgl.common.uv.fragmentHeader
varying vec2 v_Texcoord;
varying vec2 v_DetailTexcoord;
@end


@export ecgl.common.albedo.main

 vec4 albedoTexel = vec4(1.0);
#ifdef DIFFUSEMAP_ENABLED
 albedoTexel = texture2D(diffuseMap, v_Texcoord);
 #ifdef SRGB_DECODE
 albedoTexel = sRGBToLinear(albedoTexel);
 #endif
#endif

#ifdef DETAILMAP_ENABLED
 vec4 detailTexel = texture2D(detailMap, v_DetailTexcoord);
 #ifdef SRGB_DECODE
 detailTexel = sRGBToLinear(detailTexel);
 #endif
 albedoTexel.rgb = mix(albedoTexel.rgb, detailTexel.rgb, detailTexel.a);
 albedoTexel.a = detailTexel.a + (1.0 - detailTexel.a) * albedoTexel.a;
#endif

@end

@export ecgl.common.wireframe.vertexHeader

#ifdef WIREFRAME_QUAD
attribute vec4 barycentric;
varying vec4 v_Barycentric;
#elif defined(WIREFRAME_TRIANGLE)
attribute vec3 barycentric;
varying vec3 v_Barycentric;
#endif

@end

@export ecgl.common.wireframe.vertexMain

#if defined(WIREFRAME_QUAD) || defined(WIREFRAME_TRIANGLE)
 v_Barycentric = barycentric;
#endif

@end


@export ecgl.common.wireframe.fragmentHeader

uniform float wireframeLineWidth : 1;
uniform vec4 wireframeLineColor: [0, 0, 0, 0.5];

#ifdef WIREFRAME_QUAD
varying vec4 v_Barycentric;
float edgeFactor () {
 vec4 d = fwidth(v_Barycentric);
 vec4 a4 = smoothstep(vec4(0.0), d * wireframeLineWidth, v_Barycentric);
 return min(min(min(a4.x, a4.y), a4.z), a4.w);
}
#elif defined(WIREFRAME_TRIANGLE)
varying vec3 v_Barycentric;
float edgeFactor () {
 vec3 d = fwidth(v_Barycentric);
 vec3 a3 = smoothstep(vec3(0.0), d * wireframeLineWidth, v_Barycentric);
 return min(min(a3.x, a3.y), a3.z);
}
#endif

@end


@export ecgl.common.wireframe.fragmentMain

#if defined(WIREFRAME_QUAD) || defined(WIREFRAME_TRIANGLE)
 if (wireframeLineWidth > 0.) {
 vec4 lineColor = wireframeLineColor;
#ifdef SRGB_DECODE
 lineColor = sRGBToLinear(lineColor);
#endif

 gl_FragColor.rgb = mix(gl_FragColor.rgb, lineColor.rgb, (1.0 - edgeFactor()) * lineColor.a);
 }
#endif
@end




@export ecgl.common.bumpMap.header

#ifdef BUMPMAP_ENABLED
uniform sampler2D bumpMap;
uniform float bumpScale : 1.0;


vec3 bumpNormal(vec3 surfPos, vec3 surfNormal, vec3 baseNormal)
{
 vec2 dSTdx = dFdx(v_Texcoord);
 vec2 dSTdy = dFdy(v_Texcoord);

 float Hll = bumpScale * texture2D(bumpMap, v_Texcoord).x;
 float dHx = bumpScale * texture2D(bumpMap, v_Texcoord + dSTdx).x - Hll;
 float dHy = bumpScale * texture2D(bumpMap, v_Texcoord + dSTdy).x - Hll;

 vec3 vSigmaX = dFdx(surfPos);
 vec3 vSigmaY = dFdy(surfPos);
 vec3 vN = surfNormal;

 vec3 R1 = cross(vSigmaY, vN);
 vec3 R2 = cross(vN, vSigmaX);

 float fDet = dot(vSigmaX, R1);

 vec3 vGrad = sign(fDet) * (dHx * R1 + dHy * R2);
 return normalize(abs(fDet) * baseNormal - vGrad);

}
#endif

@end

@export ecgl.common.normalMap.vertexHeader

#ifdef NORMALMAP_ENABLED
attribute vec4 tangent : TANGENT;
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif

@end

@export ecgl.common.normalMap.vertexMain

#ifdef NORMALMAP_ENABLED
 if (dot(tangent, tangent) > 0.0) {
 v_Tangent = normalize((worldInverseTranspose * vec4(tangent.xyz, 0.0)).xyz);
 v_Bitangent = normalize(cross(v_Normal, v_Tangent) * tangent.w);
 }
#endif

@end


@export ecgl.common.normalMap.fragmentHeader

#ifdef NORMALMAP_ENABLED
uniform sampler2D normalMap;
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif

@end

@export ecgl.common.normalMap.fragmentMain
#ifdef NORMALMAP_ENABLED
 if (dot(v_Tangent, v_Tangent) > 0.0) {
 vec3 normalTexel = texture2D(normalMap, v_DetailTexcoord).xyz;
 if (dot(normalTexel, normalTexel) > 0.0) { N = normalTexel * 2.0 - 1.0;
 mat3 tbn = mat3(v_Tangent, v_Bitangent, v_Normal);
 N = normalize(tbn * N);
 }
 }
#endif
@end



@export ecgl.common.vertexAnimation.header

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
attribute vec3 prevNormal;
uniform float percent;
#endif

@end

@export ecgl.common.vertexAnimation.main

#ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
 vec3 norm = mix(prevNormal, normal, percent);
#else
 vec3 pos = position;
 vec3 norm = normal;
#endif

@end


@export ecgl.common.ssaoMap.header
#ifdef SSAOMAP_ENABLED
uniform sampler2D ssaoMap;
uniform vec4 viewport : VIEWPORT;
#endif
@end

@export ecgl.common.ssaoMap.main
 float ao = 1.0;
#ifdef SSAOMAP_ENABLED
 ao = texture2D(ssaoMap, (gl_FragCoord.xy - viewport.xy) / viewport.zw).r;
#endif
@end




@export ecgl.common.diffuseLayer.header

#if (LAYER_DIFFUSEMAP_COUNT > 0)
uniform float layerDiffuseIntensity[LAYER_DIFFUSEMAP_COUNT];
uniform sampler2D layerDiffuseMap[LAYER_DIFFUSEMAP_COUNT];
#endif

@end

@export ecgl.common.emissiveLayer.header

#if (LAYER_EMISSIVEMAP_COUNT > 0)
uniform float layerEmissionIntensity[LAYER_EMISSIVEMAP_COUNT];
uniform sampler2D layerEmissiveMap[LAYER_EMISSIVEMAP_COUNT];
#endif

@end

@export ecgl.common.layers.header
@import ecgl.common.diffuseLayer.header
@import ecgl.common.emissiveLayer.header
@end

@export ecgl.common.diffuseLayer.main

#if (LAYER_DIFFUSEMAP_COUNT > 0)
 for (int _idx_ = 0; _idx_ < LAYER_DIFFUSEMAP_COUNT; _idx_++) {{
 float intensity = layerDiffuseIntensity[_idx_];
 vec4 texel2 = texture2D(layerDiffuseMap[_idx_], v_Texcoord);
 #ifdef SRGB_DECODE
 texel2 = sRGBToLinear(texel2);
 #endif
 albedoTexel.rgb = mix(albedoTexel.rgb, texel2.rgb * intensity, texel2.a);
 albedoTexel.a = texel2.a + (1.0 - texel2.a) * albedoTexel.a;
 }}
#endif

@end

@export ecgl.common.emissiveLayer.main

#if (LAYER_EMISSIVEMAP_COUNT > 0)
 for (int _idx_ = 0; _idx_ < LAYER_EMISSIVEMAP_COUNT; _idx_++)
 {{
 vec4 texel2 = texture2D(layerEmissiveMap[_idx_], v_Texcoord) * layerEmissionIntensity[_idx_];
 #ifdef SRGB_DECODE
 texel2 = sRGBToLinear(texel2);
 #endif
 float intensity = layerEmissionIntensity[_idx_];
 gl_FragColor.rgb += texel2.rgb * texel2.a * intensity;
 }}
#endif

@end
`,Bv=`@export ecgl.color.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

@import ecgl.common.uv.header

attribute vec2 texcoord : TEXCOORD_0;
attribute vec3 position: POSITION;

@import ecgl.common.wireframe.vertexHeader

#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
uniform float percent : 1.0;
#endif

#ifdef ATMOSPHERE_ENABLED
attribute vec3 normal: NORMAL;
uniform mat4 worldInverseTranspose : WORLDINVERSETRANSPOSE;
varying vec3 v_Normal;
#endif

void main()
{
#ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
#else
 vec3 pos = position;
#endif

 gl_Position = worldViewProjection * vec4(pos, 1.0);

 @import ecgl.common.uv.main

#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif

#ifdef ATMOSPHERE_ENABLED
 v_Normal = normalize((worldInverseTranspose * vec4(normal, 0.0)).xyz);
#endif

 @import ecgl.common.wireframe.vertexMain

}

@end

@export ecgl.color.fragment

#define LAYER_DIFFUSEMAP_COUNT 0
#define LAYER_EMISSIVEMAP_COUNT 0

uniform sampler2D diffuseMap;
uniform sampler2D detailMap;

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

#ifdef ATMOSPHERE_ENABLED
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform vec3 glowColor;
uniform float glowPower;
varying vec3 v_Normal;
#endif

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif

@import ecgl.common.layers.header

@import ecgl.common.uv.fragmentHeader

@import ecgl.common.wireframe.fragmentHeader

@import clay.util.srgb

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color);
#else
 gl_FragColor = color;
#endif

#ifdef VERTEX_COLOR
 gl_FragColor *= v_Color;
#endif

 @import ecgl.common.albedo.main

 @import ecgl.common.diffuseLayer.main

 gl_FragColor *= albedoTexel;

#ifdef ATMOSPHERE_ENABLED
 float atmoIntensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor.rgb += glowColor * atmoIntensity;
#endif

 @import ecgl.common.emissiveLayer.main

 @import ecgl.common.wireframe.fragmentMain

}
@end`,Fv=`/**
 * http: */

@export ecgl.lambert.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header


@import ecgl.common.attributes

@import ecgl.common.wireframe.vertexHeader

#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif


@import ecgl.common.vertexAnimation.header


varying vec3 v_Normal;
varying vec3 v_WorldPosition;

void main()
{
 @import ecgl.common.uv.main

 @import ecgl.common.vertexAnimation.main


 gl_Position = worldViewProjection * vec4(pos, 1.0);

 v_Normal = normalize((worldInverseTranspose * vec4(norm, 0.0)).xyz);
 v_WorldPosition = (world * vec4(pos, 1.0)).xyz;

#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif

 @import ecgl.common.wireframe.vertexMain
}

@end


@export ecgl.lambert.fragment

#define LAYER_DIFFUSEMAP_COUNT 0
#define LAYER_EMISSIVEMAP_COUNT 0

#define NORMAL_UP_AXIS 1
#define NORMAL_FRONT_AXIS 2

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform sampler2D diffuseMap;
uniform sampler2D detailMap;

@import ecgl.common.layers.header

uniform float emissionIntensity: 1.0;

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

uniform mat4 viewInverse : VIEWINVERSE;

#ifdef ATMOSPHERE_ENABLED
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform vec3 glowColor;
uniform float glowPower;
#endif

#ifdef AMBIENT_LIGHT_COUNT
@import clay.header.ambient_light
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
@import clay.header.ambient_sh_light
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif


@import ecgl.common.ssaoMap.header

@import ecgl.common.bumpMap.header

@import clay.util.srgb

@import ecgl.common.wireframe.fragmentHeader

@import clay.plugin.compute_shadow_map

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color);
#else
 gl_FragColor = color;
#endif

#ifdef VERTEX_COLOR
 #ifdef SRGB_DECODE
 gl_FragColor *= sRGBToLinear(v_Color);
 #else
 gl_FragColor *= v_Color;
 #endif
#endif

 @import ecgl.common.albedo.main

 @import ecgl.common.diffuseLayer.main

 gl_FragColor *= albedoTexel;

 vec3 N = v_Normal;
#ifdef DOUBLE_SIDED
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);

 if (dot(N, V) < 0.0) {
 N = -N;
 }
#endif

 float ambientFactor = 1.0;

#ifdef BUMPMAP_ENABLED
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 ambientFactor = dot(v_Normal, N);
#endif

 vec3 N2 = vec3(N.x, N[NORMAL_UP_AXIS], N[NORMAL_FRONT_AXIS]);

 vec3 diffuseColor = vec3(0.0, 0.0, 0.0);

 @import ecgl.common.ssaoMap.main

#ifdef AMBIENT_LIGHT_COUNT
 for(int i = 0; i < AMBIENT_LIGHT_COUNT; i++)
 {
 diffuseColor += ambientLightColor[i] * ambientFactor * ao;
 }
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)
 {{
 diffuseColor += calcAmbientSHLight(_idx_, N2) * ambientSHLightColor[_idx_] * ao;
 }}
#endif
#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
#endif
 for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++)
 {
 vec3 lightDirection = -directionalLightDirection[i];
 vec3 lightColor = directionalLightColor[i];

 float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 if (shadowEnabled)
 {
 shadowContrib = shadowContribsDir[i];
 }
#endif

 float ndl = dot(N, normalize(lightDirection)) * shadowContrib;

 diffuseColor += lightColor * clamp(ndl, 0.0, 1.0);
 }
#endif

 gl_FragColor.rgb *= diffuseColor;

#ifdef ATMOSPHERE_ENABLED
 float atmoIntensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor.rgb += glowColor * atmoIntensity;
#endif

 @import ecgl.common.emissiveLayer.main

 @import ecgl.common.wireframe.fragmentMain
}

@end`,Uv=`@export ecgl.realistic.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header

@import ecgl.common.attributes


@import ecgl.common.wireframe.vertexHeader

#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif

#ifdef NORMALMAP_ENABLED
attribute vec4 tangent : TANGENT;
varying vec3 v_Tangent;
varying vec3 v_Bitangent;
#endif

@import ecgl.common.vertexAnimation.header

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

void main()
{

 @import ecgl.common.uv.main

 @import ecgl.common.vertexAnimation.main

 gl_Position = worldViewProjection * vec4(pos, 1.0);

 v_Normal = normalize((worldInverseTranspose * vec4(norm, 0.0)).xyz);
 v_WorldPosition = (world * vec4(pos, 1.0)).xyz;

#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif

#ifdef NORMALMAP_ENABLED
 v_Tangent = normalize((worldInverseTranspose * vec4(tangent.xyz, 0.0)).xyz);
 v_Bitangent = normalize(cross(v_Normal, v_Tangent) * tangent.w);
#endif

 @import ecgl.common.wireframe.vertexMain

}

@end



@export ecgl.realistic.fragment

#define LAYER_DIFFUSEMAP_COUNT 0
#define LAYER_EMISSIVEMAP_COUNT 0
#define PI 3.14159265358979
#define ROUGHNESS_CHANEL 0
#define METALNESS_CHANEL 1

#define NORMAL_UP_AXIS 1
#define NORMAL_FRONT_AXIS 2

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform sampler2D diffuseMap;

uniform sampler2D detailMap;
uniform sampler2D metalnessMap;
uniform sampler2D roughnessMap;

@import ecgl.common.layers.header

uniform float emissionIntensity: 1.0;

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

uniform float metalness : 0.0;
uniform float roughness : 0.5;

uniform mat4 viewInverse : VIEWINVERSE;

#ifdef ATMOSPHERE_ENABLED
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform vec3 glowColor;
uniform float glowPower;
#endif

#ifdef AMBIENT_LIGHT_COUNT
@import clay.header.ambient_light
#endif

#ifdef AMBIENT_SH_LIGHT_COUNT
@import clay.header.ambient_sh_light
#endif

#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT
@import clay.header.ambient_cubemap_light
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

@import ecgl.common.normalMap.fragmentHeader

@import ecgl.common.ssaoMap.header

@import ecgl.common.bumpMap.header

@import clay.util.srgb

@import clay.util.rgbm

@import ecgl.common.wireframe.fragmentHeader

@import clay.plugin.compute_shadow_map

vec3 F_Schlick(float ndv, vec3 spec) {
 return spec + (1.0 - spec) * pow(1.0 - ndv, 5.0);
}

float D_Phong(float g, float ndh) {
 float a = pow(8192.0, g);
 return (a + 2.0) / 8.0 * pow(ndh, a);
}

void main()
{
 vec4 albedoColor = color;

 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);
#ifdef VERTEX_COLOR
 #ifdef SRGB_DECODE
 albedoColor *= sRGBToLinear(v_Color);
 #else
 albedoColor *= v_Color;
 #endif
#endif

 @import ecgl.common.albedo.main

 @import ecgl.common.diffuseLayer.main

 albedoColor *= albedoTexel;

 float m = metalness;

#ifdef METALNESSMAP_ENABLED
 float m2 = texture2D(metalnessMap, v_DetailTexcoord)[METALNESS_CHANEL];
 m = clamp(m2 + (m - 0.5) * 2.0, 0.0, 1.0);
#endif

 vec3 baseColor = albedoColor.rgb;
 albedoColor.rgb = baseColor * (1.0 - m);
 vec3 specFactor = mix(vec3(0.04), baseColor, m);

 float g = 1.0 - roughness;

#ifdef ROUGHNESSMAP_ENABLED
 float g2 = 1.0 - texture2D(roughnessMap, v_DetailTexcoord)[ROUGHNESS_CHANEL];
 g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);
#endif

 vec3 N = v_Normal;

#ifdef DOUBLE_SIDED
 if (dot(N, V) < 0.0) {
 N = -N;
 }
#endif

 float ambientFactor = 1.0;

#ifdef BUMPMAP_ENABLED
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 ambientFactor = dot(v_Normal, N);
#endif

@import ecgl.common.normalMap.fragmentMain

 vec3 N2 = vec3(N.x, N[NORMAL_UP_AXIS], N[NORMAL_FRONT_AXIS]);

 vec3 diffuseTerm = vec3(0.0);
 vec3 specularTerm = vec3(0.0);

 float ndv = clamp(dot(N, V), 0.0, 1.0);
 vec3 fresnelTerm = F_Schlick(ndv, specFactor);

 @import ecgl.common.ssaoMap.main

#ifdef AMBIENT_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_LIGHT_COUNT; _idx_++)
 {{
 diffuseTerm += ambientLightColor[_idx_] * ambientFactor * ao;
 }}
#endif

#ifdef AMBIENT_SH_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)
 {{
 diffuseTerm += calcAmbientSHLight(_idx_, N2) * ambientSHLightColor[_idx_] * ao;
 }}
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
#endif
 for(int _idx_ = 0; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++)
 {{
 vec3 L = -directionalLightDirection[_idx_];
 vec3 lc = directionalLightColor[_idx_];

 vec3 H = normalize(L + V);
 float ndl = clamp(dot(N, normalize(L)), 0.0, 1.0);
 float ndh = clamp(dot(N, H), 0.0, 1.0);

 float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 if (shadowEnabled)
 {
 shadowContrib = shadowContribsDir[_idx_];
 }
#endif

 vec3 li = lc * ndl * shadowContrib;

 diffuseTerm += li;
 specularTerm += li * fresnelTerm * D_Phong(g, ndh);
 }}
#endif


#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT
 vec3 L = reflect(-V, N);
 L = vec3(L.x, L[NORMAL_UP_AXIS], L[NORMAL_FRONT_AXIS]);
 float rough2 = clamp(1.0 - g, 0.0, 1.0);
 float bias2 = rough2 * 5.0;
 vec2 brdfParam2 = texture2D(ambientCubemapLightBRDFLookup[0], vec2(rough2, ndv)).xy;
 vec3 envWeight2 = specFactor * brdfParam2.x + brdfParam2.y;
 vec3 envTexel2;
 for(int _idx_ = 0; _idx_ < AMBIENT_CUBEMAP_LIGHT_COUNT; _idx_++)
 {{
 envTexel2 = RGBMDecode(textureCubeLodEXT(ambientCubemapLightCubemap[_idx_], L, bias2), 8.12);
 specularTerm += ambientCubemapLightColor[_idx_] * envTexel2 * envWeight2 * ao;
 }}
#endif

 gl_FragColor.rgb = albedoColor.rgb * diffuseTerm + specularTerm;
 gl_FragColor.a = albedoColor.a;

#ifdef ATMOSPHERE_ENABLED
 float atmoIntensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor.rgb += glowColor * atmoIntensity;
#endif

#ifdef SRGB_ENCODE
 gl_FragColor = linearTosRGB(gl_FragColor);
#endif

 @import ecgl.common.emissiveLayer.main

 @import ecgl.common.wireframe.fragmentMain
}

@end`,zv=`@export ecgl.hatching.vertex

@import ecgl.realistic.vertex

@end


@export ecgl.hatching.fragment

#define NORMAL_UP_AXIS 1
#define NORMAL_FRONT_AXIS 2

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform vec4 color : [0.0, 0.0, 0.0, 1.0];
uniform vec4 paperColor : [1.0, 1.0, 1.0, 1.0];

uniform mat4 viewInverse : VIEWINVERSE;

#ifdef AMBIENT_LIGHT_COUNT
@import clay.header.ambient_light
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
@import clay.header.ambient_sh_light
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif


@import ecgl.common.ssaoMap.header

@import ecgl.common.bumpMap.header

@import clay.util.srgb

@import ecgl.common.wireframe.fragmentHeader

@import clay.plugin.compute_shadow_map

uniform sampler2D hatch1;
uniform sampler2D hatch2;
uniform sampler2D hatch3;
uniform sampler2D hatch4;
uniform sampler2D hatch5;
uniform sampler2D hatch6;

float shade(in float tone) {
 vec4 c = vec4(1. ,1., 1., 1.);
 float step = 1. / 6.;
 vec2 uv = v_DetailTexcoord;
 if (tone <= step / 2.0) {
 c = mix(vec4(0.), texture2D(hatch6, uv), 12. * tone);
 }
 else if (tone <= step) {
 c = mix(texture2D(hatch6, uv), texture2D(hatch5, uv), 6. * tone);
 }
 if(tone > step && tone <= 2. * step){
 c = mix(texture2D(hatch5, uv), texture2D(hatch4, uv) , 6. * (tone - step));
 }
 if(tone > 2. * step && tone <= 3. * step){
 c = mix(texture2D(hatch4, uv), texture2D(hatch3, uv), 6. * (tone - 2. * step));
 }
 if(tone > 3. * step && tone <= 4. * step){
 c = mix(texture2D(hatch3, uv), texture2D(hatch2, uv), 6. * (tone - 3. * step));
 }
 if(tone > 4. * step && tone <= 5. * step){
 c = mix(texture2D(hatch2, uv), texture2D(hatch1, uv), 6. * (tone - 4. * step));
 }
 if(tone > 5. * step){
 c = mix(texture2D(hatch1, uv), vec4(1.), 6. * (tone - 5. * step));
 }

 return c.r;
}

const vec3 w = vec3(0.2125, 0.7154, 0.0721);

void main()
{
#ifdef SRGB_DECODE
 vec4 inkColor = sRGBToLinear(color);
#else
 vec4 inkColor = color;
#endif

#ifdef VERTEX_COLOR
 #ifdef SRGB_DECODE
 inkColor *= sRGBToLinear(v_Color);
 #else
 inkColor *= v_Color;
 #endif
#endif

 vec3 N = v_Normal;
#ifdef DOUBLE_SIDED
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);

 if (dot(N, V) < 0.0) {
 N = -N;
 }
#endif

 float tone = 0.0;

 float ambientFactor = 1.0;

#ifdef BUMPMAP_ENABLED
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 ambientFactor = dot(v_Normal, N);
#endif

 vec3 N2 = vec3(N.x, N[NORMAL_UP_AXIS], N[NORMAL_FRONT_AXIS]);

 @import ecgl.common.ssaoMap.main

#ifdef AMBIENT_LIGHT_COUNT
 for(int i = 0; i < AMBIENT_LIGHT_COUNT; i++)
 {
 tone += dot(ambientLightColor[i], w) * ambientFactor * ao;
 }
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
 for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)
 {{
 tone += dot(calcAmbientSHLight(_idx_, N2) * ambientSHLightColor[_idx_], w) * ao;
 }}
#endif
#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
#endif
 for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++)
 {
 vec3 lightDirection = -directionalLightDirection[i];
 float lightTone = dot(directionalLightColor[i], w);

 float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 if (shadowEnabled)
 {
 shadowContrib = shadowContribsDir[i];
 }
#endif

 float ndl = dot(N, normalize(lightDirection)) * shadowContrib;

 tone += lightTone * clamp(ndl, 0.0, 1.0);
 }
#endif

 gl_FragColor = mix(inkColor, paperColor, shade(clamp(tone, 0.0, 1.0)));
 }
@end
`,Gv=`@export ecgl.sm.depth.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
uniform float percent : 1.0;
#endif

varying vec4 v_ViewPosition;
varying vec2 v_Texcoord;

void main(){

#ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
#else
 vec3 pos = position;
#endif

 v_ViewPosition = worldViewProjection * vec4(pos, 1.0);
 gl_Position = v_ViewPosition;

 v_Texcoord = texcoord;

}
@end



@export ecgl.sm.depth.fragment

@import clay.sm.depth.fragment

@end`;Object.assign(gr.prototype,Iv);G.import(gu);G.import(ou);G.import(Ov);G.import(Bv);G.import(Fv);G.import(Uv);G.import(zv);G.import(Gv);function kv(e){return!e||e==="none"}function _u(e){return e instanceof HTMLCanvasElement||e instanceof HTMLImageElement||e instanceof Image}function Hv(e){return e.getZr&&e.setOption}var Vv=li.prototype.addToScene,Wv=li.prototype.removeFromScene;li.prototype.addToScene=function(e){if(Vv.call(this,e),this.__zr){var t=this.__zr;e.traverse(function(r){r.__zr=t,r.addAnimatorsToZr&&r.addAnimatorsToZr(t)})}};li.prototype.removeFromScene=function(e){Wv.call(this,e),e.traverse(function(t){var r=t.__zr;t.__zr=null,r&&t.removeAnimatorsFromZr&&t.removeAnimatorsFromZr(r)})};tr.prototype.setTextureImage=function(e,t,r,i){if(this.shader){var n=r.getZr(),a=this,o;return a.autoUpdateTextureStatus=!1,a.disableTexture(e),kv(t)||(o=fe.loadTexture(t,r,i,function(s){a.enableTexture(e),n&&n.refresh()}),a.set(e,o)),o}};var fe={};fe.Renderer=In;fe.Node=gr;fe.Mesh=wi;fe.Shader=G;fe.Material=tr;fe.Texture=ne;fe.Texture2D=ge;fe.Geometry=Pe;fe.SphereGeometry=xv;fe.PlaneGeometry=io;fe.CubeGeometry=pu;fe.AmbientLight=wv;fe.DirectionalLight=Sv;fe.PointLight=Av;fe.SpotLight=Lv;fe.PerspectiveCamera=xt;fe.OrthographicCamera=rn;fe.Vector2=Vt;fe.Vector3=Z;fe.Vector4=Mv;fe.Quaternion=su;fe.Matrix2=Dv;fe.Matrix2d=Pv;fe.Matrix3=Rv;fe.Matrix4=re;fe.Plane=cu;fe.Ray=Ga;fe.BoundingBox=Nt;fe.Frustum=Cs;var Ca=null;function Xv(){return Ca!==null||(Ca=Ei.createBlank("rgba(255,255,255,0)").image),Ca}function Yl(e){return Math.pow(2,Math.round(Math.log(e)/Math.LN2))}function Kl(e){if((e.wrapS===ne.REPEAT||e.wrapT===ne.REPEAT)&&e.image){var t=Yl(e.width),r=Yl(e.height);if(t!==e.width||r!==e.height){var i=document.createElement("canvas");i.width=t,i.height=r;var n=i.getContext("2d");n.drawImage(e.image,0,0,t,r),e.image=i}}}fe.loadTexture=function(e,t,r,i){typeof r=="function"&&(i=r,r={}),r=r||{};for(var n=Object.keys(r).sort(),a="",o=0;o<n.length;o++)a+=n[o]+"_"+r[n[o]]+"_";var s=t.__textureCache=t.__textureCache||new zf(20);if(Hv(e)){var l=e.__textureid__,h=s.get(a+l);if(h)h.texture.surface.setECharts(e),i&&i(h.texture);else{var u=new rv(e);u.onupdate=function(){t.getZr().refresh()},h={texture:u.getTexture()};for(var o=0;o<n.length;o++)h.texture[n[o]]=r[n[o]];l=e.__textureid__||"__ecgl_ec__"+h.texture.__uid__,e.__textureid__=l,s.put(a+l,h),i&&i(h.texture)}return h.texture}else if(_u(e)){var l=e.__textureid__,h=s.get(a+l);if(!h){h={texture:new fe.Texture2D({image:e})};for(var o=0;o<n.length;o++)h.texture[n[o]]=r[n[o]];l=e.__textureid__||"__ecgl_image__"+h.texture.__uid__,e.__textureid__=l,s.put(a+l,h),Kl(h.texture),i&&i(h.texture)}return h.texture}else{var h=s.get(a+e);if(h)h.callbacks?h.callbacks.push(i):i&&i(h.texture);else if(e.match(/.hdr$|^data:application\/octet-stream/)){h={callbacks:[i]};var f=Ei.loadTexture(e,{exposure:r.exposure,fileType:"hdr"},function(){f.dirty(),h.callbacks.forEach(function(v){v&&v(f)}),h.callbacks=null});h.texture=f,s.put(a+e,h)}else{for(var f=new fe.Texture2D({image:new Image}),o=0;o<n.length;o++)f[n[o]]=r[n[o]];h={texture:f,callbacks:[i]};var d=f.image;d.onload=function(){f.image=d,Kl(f),f.dirty(),h.callbacks.forEach(function(p){p&&p(f)}),h.callbacks=null},d.crossOrigin="Anonymous",d.src=e,f.image=Xv(),s.put(a+e,h)}return h.texture}};fe.createAmbientCubemap=function(e,t,r,i){e=e||{};var n=e.texture,a=xe.firstNotNull(e.exposure,1),o=new fv({intensity:xe.firstNotNull(e.specularIntensity,1)}),s=new dv({intensity:xe.firstNotNull(e.diffuseIntensity,1),coefficients:[.844,.712,.691,-.037,.083,.167,.343,.288,.299,-.041,-.021,-.009,-.003,-.041,-.064,-.011,-.007,-.004,-.031,.034,.081,-.06,-.049,-.06,.046,.056,.05]});return o.cubemap=fe.loadTexture(n,r,{exposure:a},function(){o.cubemap.flipY=!1,o.prefilter(t,32),s.coefficients=gv.projectEnvironmentMap(t,o.cubemap,{lod:1}),i&&i()}),{specular:o,diffuse:s}};fe.createBlankTexture=Ei.createBlank;fe.isImage=_u;fe.additiveBlend=function(e){e.blendEquation(e.FUNC_ADD),e.blendFunc(e.SRC_ALPHA,e.ONE)};fe.parseColor=function(e,t){return e instanceof Array?(t||(t=[]),t[0]=e[0],t[1]=e[1],t[2]=e[2],e.length>3?t[3]=e[3]:t[3]=1,t):(t=Vh(e||"#000",t)||[0,0,0,0],t[0]/=255,t[1]/=255,t[2]/=255,t)};fe.directionFromAlphaBeta=function(e,t){var r=e/180*Math.PI+Math.PI/2,i=-t/180*Math.PI+Math.PI/2,n=[],a=Math.sin(r);return n[0]=a*Math.cos(i),n[1]=-Math.cos(r),n[2]=a*Math.sin(i),n};fe.getShadowResolution=function(e){var t=1024;switch(e){case"low":t=512;break;case"medium":break;case"high":t=2048;break;case"ultra":t=4096;break}return t};fe.COMMON_SHADERS=["lambert","color","realistic","hatching","shadow"];fe.createShader=function(e){e==="ecgl.shadow"&&(e="ecgl.displayShadow");var t=G.source(e+".vertex"),r=G.source(e+".fragment");t||console.error("Vertex shader of '%s' not exits",e),r||console.error("Fragment shader of '%s' not exits",e);var i=new G(t,r);return i.name=e,i};fe.createMaterial=function(e,t){t instanceof Array||(t=[t]);var r=fe.createShader(e),i=new tr({shader:r});return t.forEach(function(n){typeof n=="string"&&i.define(n)}),i};fe.setMaterialFromModel=function(e,t,r,i){t.autoUpdateTextureStatus=!1;var n=r.getModel(e+"Material"),a=n.get("detailTexture"),o=xe.firstNotNull(n.get("textureTiling"),1),s=xe.firstNotNull(n.get("textureOffset"),0);typeof o=="number"&&(o=[o,o]),typeof s=="number"&&(s=[s,s]);var l=o[0]>1||o[1]>1?fe.Texture.REPEAT:fe.Texture.CLAMP_TO_EDGE,h={anisotropic:8,wrapS:l,wrapT:l};if(e==="realistic"){var u=n.get("roughness"),f=n.get("metalness");f!=null?isNaN(f)&&(t.setTextureImage("metalnessMap",f,i,h),f=xe.firstNotNull(n.get("metalnessAdjust"),.5)):f=0,u!=null?isNaN(u)&&(t.setTextureImage("roughnessMap",u,i,h),u=xe.firstNotNull(n.get("roughnessAdjust"),.5)):u=.5;var d=n.get("normalTexture");t.setTextureImage("detailMap",a,i,h),t.setTextureImage("normalMap",d,i,h),t.set({roughness:u,metalness:f,detailUvRepeat:o,detailUvOffset:s})}else if(e==="lambert")t.setTextureImage("detailMap",a,i,h),t.set({detailUvRepeat:o,detailUvOffset:s});else if(e==="color")t.setTextureImage("detailMap",a,i,h),t.set({detailUvRepeat:o,detailUvOffset:s});else if(e==="hatching"){var c=n.get("hatchingTextures")||[];c.length<6;for(var v=0;v<6;v++)t.setTextureImage("hatch"+(v+1),c[v],i,{anisotropic:8,wrapS:fe.Texture.REPEAT,wrapT:fe.Texture.REPEAT});t.set({detailUvRepeat:o,detailUvOffset:s})}};fe.updateVertexAnimation=function(e,t,r,i){var n=i.get("animation"),a=i.get("animationDurationUpdate"),o=i.get("animationEasingUpdate"),s=r.shadowDepthMaterial;if(n&&t&&a>0&&t.geometry.vertexCount===r.geometry.vertexCount){r.material.define("vertex","VERTEX_ANIMATION"),r.ignorePreZ=!0,s&&s.define("vertex","VERTEX_ANIMATION");for(var l=0;l<e.length;l++)r.geometry.attributes[e[l][0]].value=t.geometry.attributes[e[l][1]].value;r.geometry.dirty(),r.__percent=0,r.material.set("percent",0),r.stopAnimation(),r.animate().when(a,{__percent:1}).during(function(){r.material.set("percent",r.__percent),s&&s.set("percent",r.__percent)}).done(function(){r.ignorePreZ=!1,r.material.undefine("vertex","VERTEX_ANIMATION"),s&&s.undefine("vertex","VERTEX_ANIMATION")}).start(o)}else r.material.undefine("vertex","VERTEX_ANIMATION"),s&&s.undefine("vertex","VERTEX_ANIMATION")};const b=fe;var He=function(e,t){this.id=e,this.zr=t;try{this.renderer=new In({clearBit:0,devicePixelRatio:t.painter.dpr,preserveDrawingBuffer:!0,premultipliedAlpha:!0}),this.renderer.resize(t.painter.getWidth(),t.painter.getHeight())}catch(i){this.renderer=null,this.dom=document.createElement("div"),this.dom.style.cssText="position:absolute; left: 0; top: 0; right: 0; bottom: 0;",this.dom.className="ecgl-nowebgl",this.dom.innerHTML="Sorry, your browser does not support WebGL",console.error(i);return}this.onglobalout=this.onglobalout.bind(this),t.on("globalout",this.onglobalout),this.dom=this.renderer.canvas;var r=this.dom.style;r.position="absolute",r.left="0",r.top="0",this.views=[],this._picking=new fd({renderer:this.renderer}),this._viewsToDispose=[],this._accumulatingId=0,this._zrEventProxy=new Wh({shape:{x:-1,y:-1,width:2,height:2},__isGLToZRProxy:!0}),this._backgroundColor=null,this._disposed=!1};He.prototype.setUnpainted=function(){};He.prototype.addView=function(e){if(e.layer!==this){var t=this._viewsToDispose.indexOf(e);t>=0&&this._viewsToDispose.splice(t,1),this.views.push(e),e.layer=this;var r=this.zr;e.scene.traverse(function(i){i.__zr=r,i.addAnimatorsToZr&&i.addAnimatorsToZr(r)})}};function yu(e){var t=e.__zr;e.__zr=null,t&&e.removeAnimatorsFromZr&&e.removeAnimatorsFromZr(t)}He.prototype.removeView=function(e){if(e.layer===this){var t=this.views.indexOf(e);t>=0&&(this.views.splice(t,1),e.scene.traverse(yu,this),e.layer=null,this._viewsToDispose.push(e))}};He.prototype.removeViewsAll=function(){this.views.forEach(function(e){e.scene.traverse(yu,this),e.layer=null,this._viewsToDispose.push(e)},this),this.views.length=0};He.prototype.resize=function(e,t){var r=this.renderer;r.resize(e,t)};He.prototype.clear=function(){var e=this.renderer.gl,t=this._backgroundColor||[0,0,0,0];e.clearColor(t[0],t[1],t[2],t[3]),e.depthMask(!0),e.colorMask(!0,!0,!0,!0),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT)};He.prototype.clearDepth=function(){var e=this.renderer.gl;e.clear(e.DEPTH_BUFFER_BIT)};He.prototype.clearColor=function(){var e=this.renderer.gl;e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)};He.prototype.needsRefresh=function(){this.zr.refresh()};He.prototype.refresh=function(e){this._backgroundColor=e?b.parseColor(e):[0,0,0,0],this.renderer.clearColor=this._backgroundColor;for(var t=0;t<this.views.length;t++)this.views[t].prepareRender(this.renderer);this._doRender(!1),this._trackAndClean();for(var t=0;t<this._viewsToDispose.length;t++)this._viewsToDispose[t].dispose(this.renderer);this._viewsToDispose.length=0,this._startAccumulating()};He.prototype.renderToCanvas=function(e){this._startAccumulating(!0),e.drawImage(this.dom,0,0,e.canvas.width,e.canvas.height)};He.prototype._doRender=function(e){this.clear(),this.renderer.saveViewport();for(var t=0;t<this.views.length;t++)this.views[t].render(this.renderer,e);this.renderer.restoreViewport()};He.prototype._stopAccumulating=function(){this._accumulatingId=0,clearTimeout(this._accumulatingTimeout)};var jv=1;He.prototype._startAccumulating=function(e){var t=this;this._stopAccumulating();for(var r=!1,i=0;i<this.views.length;i++)r=this.views[i].needsAccumulate()||r;if(!r)return;function n(a){if(!(!t._accumulatingId||a!==t._accumulatingId)){for(var o=!0,s=0;s<t.views.length;s++)o=t.views[s].isAccumulateFinished()&&r;o||(t._doRender(!0),e?n(a):es(function(){n(a)}))}}this._accumulatingId=jv++,e?n(t._accumulatingId):this._accumulatingTimeout=setTimeout(function(){n(t._accumulatingId)},50)};He.prototype._trackAndClean=function(){var e=[],t=[];this._textureList&&(Ha(this._textureList),Ha(this._geometriesList));for(var r=0;r<this.views.length;r++)Zv(this.views[r].scene,e,t);this._textureList&&(Va(this.renderer,this._textureList),Va(this.renderer,this._geometriesList)),this._textureList=e,this._geometriesList=t};function Ha(e){for(var t=0;t<e.length;t++)e[t].__used__=0}function Va(e,t){for(var r=0;r<t.length;r++)t[r].__used__||t[r].dispose(e)}function La(e,t){e.__used__=e.__used__||0,e.__used__++,e.__used__===1&&t.push(e)}function Zv(e,t,r){var i,n;e.traverse(function(o){if(o.isRenderable()){var s=o.geometry,l=o.material;if(l!==i)for(var h=l.getTextureUniforms(),u=0;u<h.length;u++){var f=h[u],d=l.uniforms[f].value;if(d){if(d instanceof ne)La(d,t);else if(d instanceof Array)for(var c=0;c<d.length;c++)d[c]instanceof ne&&La(d[c],t)}}s!==n&&La(s,r),i=l,n=s}});for(var a=0;a<e.lights.length;a++)e.lights[a].cubemap&&La(e.lights[a].cubemap,t)}He.prototype.dispose=function(){this._disposed||(this._stopAccumulating(),this._textureList&&(Ha(this._textureList),Ha(this._geometriesList),Va(this.renderer,this._textureList),Va(this.renderer,this._geometriesList)),this.zr.off("globalout",this.onglobalout),this._disposed=!0)};He.prototype.onmousedown=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){e=e.event;var t=this.pickObject(e.offsetX,e.offsetY);t&&(this._dispatchEvent("mousedown",e,t),this._dispatchDataEvent("mousedown",e,t)),this._downX=e.offsetX,this._downY=e.offsetY}};He.prototype.onmousemove=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){e=e.event;var t=this.pickObject(e.offsetX,e.offsetY),r=t&&t.target,i=this._hovered;this._hovered=t,i&&r!==i.target&&(i.relatedTarget=r,this._dispatchEvent("mouseout",e,i),this.zr.setCursorStyle("default")),this._dispatchEvent("mousemove",e,t),t&&(this.zr.setCursorStyle("pointer"),(!i||r!==i.target)&&this._dispatchEvent("mouseover",e,t)),this._dispatchDataEvent("mousemove",e,t)}};He.prototype.onmouseup=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){e=e.event;var t=this.pickObject(e.offsetX,e.offsetY);t&&(this._dispatchEvent("mouseup",e,t),this._dispatchDataEvent("mouseup",e,t)),this._upX=e.offsetX,this._upY=e.offsetY}};He.prototype.onclick=He.prototype.dblclick=function(e){if(!(e.target&&e.target.__isGLToZRProxy)){var t=this._upX-this._downX,r=this._upY-this._downY;if(!(Math.sqrt(t*t+r*r)>20)){e=e.event;var i=this.pickObject(e.offsetX,e.offsetY);i&&(this._dispatchEvent(e.type,e,i),this._dispatchDataEvent(e.type,e,i));var n=this._clickToSetFocusPoint(e);if(n){var a=n.view.setDOFFocusOnPoint(n.distance);a&&this.zr.refresh()}}}};He.prototype._clickToSetFocusPoint=function(e){for(var t=this.renderer,r=t.viewport,i=this.views.length-1;i>=0;i--){var n=this.views[i];if(n.hasDOF()&&n.containPoint(e.offsetX,e.offsetY)){this._picking.scene=n.scene,this._picking.camera=n.camera,t.viewport=n.viewport;var a=this._picking.pick(e.offsetX,e.offsetY,!0);if(a)return a.view=n,a}}t.viewport=r};He.prototype.onglobalout=function(e){var t=this._hovered;t&&this._dispatchEvent("mouseout",e,{target:t.target})};He.prototype.pickObject=function(e,t){for(var r=[],i=this.renderer,n=i.viewport,a=0;a<this.views.length;a++){var o=this.views[a];o.containPoint(e,t)&&(this._picking.scene=o.scene,this._picking.camera=o.camera,i.viewport=o.viewport,this._picking.pickAll(e,t,r))}return i.viewport=n,r.sort(function(s,l){return s.distance-l.distance}),r[0]};He.prototype._dispatchEvent=function(e,t,r){r||(r={});var i=r.target;for(r.cancelBubble=!1,r.event=t,r.type=e,r.offsetX=t.offsetX,r.offsetY=t.offsetY;i&&(i.trigger(e,r),i=i.getParent(),!r.cancelBubble););this._dispatchToView(e,r)};He.prototype._dispatchDataEvent=function(e,t,r){var i=r&&r.target,n=i&&i.dataIndex,a=i&&i.seriesIndex,o=i&&i.eventData,s=!1,l=this._zrEventProxy;l.x=t.offsetX,l.y=t.offsetY,l.update();var h={target:l};const u=Gf(l);e==="mousemove"&&(n!=null?n!==this._lastDataIndex&&(parseInt(this._lastDataIndex,10)>=0&&(u.dataIndex=this._lastDataIndex,u.seriesIndex=this._lastSeriesIndex,this.zr.handler.dispatchToElement(h,"mouseout",t)),s=!0):o!=null&&o!==this._lastEventData&&(this._lastEventData!=null&&(u.eventData=this._lastEventData,this.zr.handler.dispatchToElement(h,"mouseout",t)),s=!0),this._lastEventData=o,this._lastDataIndex=n,this._lastSeriesIndex=a),u.eventData=o,u.dataIndex=n,u.seriesIndex=a,(o!=null||parseInt(n,10)>=0&&parseInt(a,10)>=0)&&(this.zr.handler.dispatchToElement(h,e,t),s&&this.zr.handler.dispatchToElement(h,"mouseover",t))};He.prototype._dispatchToView=function(e,t){for(var r=0;r<this.views.length;r++)this.views[r].containPoint(t.offsetX,t.offsetY)&&this.views[r].trigger(e,t)};Object.assign(He.prototype,bs);const xu=He;var qv=["bar3D","line3D","map3D","scatter3D","surface","lines3D","scatterGL","scatter3D"];function Pn(e,t){if(e&&e[t]&&(e[t].normal||e[t].emphasis)){var r=e[t].normal,i=e[t].emphasis;r&&(e[t]=r),i&&(e.emphasis=e.emphasis||{},e.emphasis[t]=i)}}function Yv(e){Pn(e,"itemStyle"),Pn(e,"lineStyle"),Pn(e,"areaStyle"),Pn(e,"label")}function Ma(e){e&&(e instanceof Array||(e=[e]),ir(e,function(t){if(t.axisLabel){var r=t.axisLabel;Object.assign(r,r.textStyle),r.textStyle=null}}))}function Kv(e){ir(e.series,function(t){kf(qv,t.type)>=0&&(Yv(t),t.coordinateSystem==="mapbox"&&(t.coordinateSystem="mapbox3D",e.mapbox3D=e.mapbox))}),Ma(e.xAxis3D),Ma(e.yAxis3D),Ma(e.zAxis3D),Ma(e.grid3D),Pn(e.geo3D)}function Tu(e){this._layers={},this._zr=e}Tu.prototype.update=function(e,t){var r=this,i=t.getZr();if(!i.getWidth()||!i.getHeight()){console.warn("Dom has no width or height");return}function n(s){i.setSleepAfterStill(0);var l;s.coordinateSystem&&s.coordinateSystem.model,l=s.get("zlevel");var h=r._layers,u=h[l];if(!u){if(u=h[l]=new xu("gl-"+l,i),i.painter.isSingleCanvas()){u.virtual=!0;var f=new Wf({z:1e4,style:{image:u.renderer.canvas},silent:!0});u.__hostImage=f,i.add(f)}i.painter.insertLayer(l,u)}return u.__hostImage&&u.__hostImage.setStyle({width:u.renderer.getWidth(),height:u.renderer.getHeight()}),u}function a(s,l){s&&s.traverse(function(h){h.isRenderable&&h.isRenderable()&&(h.ignorePicking=h.$ignorePicking!=null?h.$ignorePicking:l)})}for(var o in this._layers)this._layers[o].removeViewsAll();e.eachComponent(function(s,l){if(s!=="series"){var h=t.getViewOfComponentModel(l),u=l.coordinateSystem;if(h.__ecgl__){var f;if(u){if(!u.viewGL){console.error("Can't find viewGL in coordinateSystem of component "+l.id);return}f=u.viewGL}else{if(!l.viewGL){console.error("Can't find viewGL of component "+l.id);return}f=u.viewGL}var f=u.viewGL,d=n(l);d.addView(f),h.afterRender&&h.afterRender(l,e,t,d),a(h.groupGL,l.get("silent"))}}}),e.eachSeries(function(s){var l=t.getViewOfSeriesModel(s),h=s.coordinateSystem;if(l.__ecgl__){if(h&&!h.viewGL&&!l.viewGL){console.error("Can't find viewGL of series "+l.id);return}var u=h&&h.viewGL||l.viewGL,f=n(s);f.addView(u),l.afterRender&&l.afterRender(s,e,t,f),a(l.groupGL,s.get("silent"))}})};Hf(function(e){var t=e.getZr(),r=t.painter.dispose;t.painter.dispose=function(){typeof this.eachOtherLayer=="function"&&this.eachOtherLayer(function(i){i instanceof xu&&i.dispose()}),r.call(this)},t.painter.getRenderedCanvas=function(i){if(i=i||{},this._singleCanvas)return this._layers[0].dom;var n=document.createElement("canvas"),a=i.pixelRatio||this.dpr;n.width=this.getWidth()*a,n.height=this.getHeight()*a;var o=n.getContext("2d");o.dpr=a,o.clearRect(0,0,n.width,n.height),i.backgroundColor&&(o.fillStyle=i.backgroundColor,o.fillRect(0,0,n.width,n.height));var s=this.storage.getDisplayList(!0),l={},h,u=this;function f(p,g){var m=u._zlevelList;p==null&&(p=-1/0);for(var _,x=0;x<m.length;x++){var y=m[x],T=u._layers[y];if(!T.__builtin__&&y>p&&y<g){_=T;break}}_&&_.renderToCanvas&&(o.save(),_.renderToCanvas(o),o.restore())}for(var d={ctx:o},c=0;c<s.length;c++){var v=s[c];v.zlevel!==h&&(f(h,v.zlevel),h=v.zlevel),this._doPaintEl(v,d,!0,null,l)}return f(h,1/0),n}});Vf(function(e,t){var r=t.getZr(),i=r.__egl=r.__egl||new Tu(r);i.update(e,t)});Xh(Kv);const no={defaultOption:{viewControl:{projection:"perspective",autoRotate:!1,autoRotateDirection:"cw",autoRotateSpeed:10,autoRotateAfterStill:3,damping:.8,rotateSensitivity:1,zoomSensitivity:1,panSensitivity:1,panMouseButton:"middle",rotateMouseButton:"left",distance:150,minDistance:40,maxDistance:400,orthographicSize:150,maxOrthographicSize:400,minOrthographicSize:20,center:[0,0,0],alpha:0,beta:0,minAlpha:-90,maxAlpha:90}},setView:function(e){e=e||{},this.option.viewControl=this.option.viewControl||{},e.alpha!=null&&(this.option.viewControl.alpha=e.alpha),e.beta!=null&&(this.option.viewControl.beta=e.beta),e.distance!=null&&(this.option.viewControl.distance=e.distance),e.center!=null&&(this.option.viewControl.center=e.center)}},fn={defaultOption:{postEffect:{enable:!1,bloom:{enable:!0,intensity:.1},depthOfField:{enable:!1,focalRange:20,focalDistance:50,blurRadius:10,fstop:2.8,quality:"medium"},screenSpaceAmbientOcclusion:{enable:!1,radius:2,quality:"medium",intensity:1},screenSpaceReflection:{enable:!1,quality:"medium",maxRoughness:.8},colorCorrection:{enable:!0,exposure:0,brightness:0,contrast:1,saturation:1,lookupTexture:""},edge:{enable:!1},FXAA:{enable:!1}},temporalSuperSampling:{enable:"auto"}}},cn={defaultOption:{light:{main:{shadow:!1,shadowQuality:"high",color:"#fff",intensity:1,alpha:0,beta:0},ambient:{color:"#fff",intensity:.2},ambientCubemap:{texture:null,exposure:1,diffuseIntensity:.5,specularIntensity:.5}}}};var ao=ln.extend({type:"grid3D",dependencies:["xAxis3D","yAxis3D","zAxis3D"],defaultOption:{show:!0,zlevel:-10,left:0,top:0,width:"100%",height:"100%",environment:"auto",boxWidth:100,boxHeight:100,boxDepth:100,axisPointer:{show:!0,lineStyle:{color:"rgba(0, 0, 0, 0.8)",width:1},label:{show:!0,formatter:null,margin:8,textStyle:{fontSize:14,color:"#fff",backgroundColor:"rgba(0,0,0,0.5)",padding:3,borderRadius:3}}},axisLine:{show:!0,lineStyle:{color:"#333",width:2,type:"solid"}},axisTick:{show:!0,inside:!1,length:3,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,margin:8,textStyle:{fontSize:12}},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}},light:{main:{alpha:30,beta:40},ambient:{intensity:.4}},viewControl:{alpha:20,beta:40,autoRotate:!1,distance:200,minDistance:40,maxDistance:400}}});Be(ao.prototype,no);Be(ao.prototype,fn);Be(ao.prototype,cn);const $v=ao;var An=xe.firstNotNull,$l={left:0,middle:1,right:2};function Ql(e){return e instanceof Array||(e=[e,e]),e}var wu=Bt.extend(function(){return{zr:null,viewGL:null,_center:new Z,minDistance:.5,maxDistance:1.5,maxOrthographicSize:300,minOrthographicSize:30,minAlpha:-90,maxAlpha:90,minBeta:-1/0,maxBeta:1/0,autoRotateAfterStill:0,autoRotateDirection:"cw",autoRotateSpeed:60,damping:.8,rotateSensitivity:1,zoomSensitivity:1,panSensitivity:1,panMouseButton:"middle",rotateMouseButton:"left",_mode:"rotate",_camera:null,_needsUpdate:!1,_rotating:!1,_phi:0,_theta:0,_mouseX:0,_mouseY:0,_rotateVelocity:new Vt,_panVelocity:new Vt,_distance:500,_zoomSpeed:0,_stillTimeout:0,_animators:[]}},function(){["_mouseDownHandler","_mouseWheelHandler","_mouseMoveHandler","_mouseUpHandler","_pinchHandler","_contextMenuHandler","_update"].forEach(function(e){this[e]=this[e].bind(this)},this)},{init:function(){var e=this.zr;e&&(e.on("mousedown",this._mouseDownHandler),e.on("globalout",this._mouseUpHandler),e.on("mousewheel",this._mouseWheelHandler),e.on("pinch",this._pinchHandler),e.animation.on("frame",this._update),e.dom.addEventListener("contextmenu",this._contextMenuHandler))},dispose:function(){var e=this.zr;e&&(e.off("mousedown",this._mouseDownHandler),e.off("mousemove",this._mouseMoveHandler),e.off("mouseup",this._mouseUpHandler),e.off("mousewheel",this._mouseWheelHandler),e.off("pinch",this._pinchHandler),e.off("globalout",this._mouseUpHandler),e.dom.removeEventListener("contextmenu",this._contextMenuHandler),e.animation.off("frame",this._update)),this.stopAllAnimation()},getDistance:function(){return this._distance},setDistance:function(e){this._distance=e,this._needsUpdate=!0},getOrthographicSize:function(){return this._orthoSize},setOrthographicSize:function(e){this._orthoSize=e,this._needsUpdate=!0},getAlpha:function(){return this._theta/Math.PI*180},getBeta:function(){return-this._phi/Math.PI*180},getCenter:function(){return this._center.toArray()},setAlpha:function(e){e=Math.max(Math.min(this.maxAlpha,e),this.minAlpha),this._theta=e/180*Math.PI,this._needsUpdate=!0},setBeta:function(e){e=Math.max(Math.min(this.maxBeta,e),this.minBeta),this._phi=-e/180*Math.PI,this._needsUpdate=!0},setCenter:function(e){this._center.setArray(e)},setViewGL:function(e){this.viewGL=e},getCamera:function(){return this.viewGL.camera},setFromViewControlModel:function(e,t){t=t||{};var r=t.baseDistance||0,i=t.baseOrthoSize||1,n=e.get("projection");n!=="perspective"&&n!=="orthographic"&&n!=="isometric"&&(n="perspective"),this._projection=n,this.viewGL.setProjection(n);var a=e.get("distance")+r,o=e.get("orthographicSize")+i;[["damping",.8],["autoRotate",!1],["autoRotateAfterStill",3],["autoRotateDirection","cw"],["autoRotateSpeed",10],["minDistance",30],["maxDistance",400],["minOrthographicSize",30],["maxOrthographicSize",300],["minAlpha",-90],["maxAlpha",90],["minBeta",-1/0],["maxBeta",1/0],["rotateSensitivity",1],["zoomSensitivity",1],["panSensitivity",1],["panMouseButton","left"],["rotateMouseButton","middle"]].forEach(function(d){this[d[0]]=An(e.get(d[0]),d[1])},this),this.minDistance+=r,this.maxDistance+=r,this.minOrthographicSize+=i,this.maxOrthographicSize+=i;var s=e.ecModel,l={};["animation","animationDurationUpdate","animationEasingUpdate"].forEach(function(d){l[d]=An(e.get(d),s&&s.get(d))});var h=An(t.alpha,e.get("alpha"))||0,u=An(t.beta,e.get("beta"))||0,f=An(t.center,e.get("center"))||[0,0,0];l.animation&&l.animationDurationUpdate>0&&this._notFirst?this.animateTo({alpha:h,beta:u,center:f,distance:a,orthographicSize:o,easing:l.animationEasingUpdate,duration:l.animationDurationUpdate}):(this.setDistance(a),this.setAlpha(h),this.setBeta(u),this.setCenter(f),this.setOrthographicSize(o)),this._notFirst=!0,this._validateProperties()},_validateProperties:function(){},animateTo:function(e){var t=this.zr,r=this,i={},n={};return e.distance!=null&&(i.distance=this.getDistance(),n.distance=e.distance),e.orthographicSize!=null&&(i.orthographicSize=this.getOrthographicSize(),n.orthographicSize=e.orthographicSize),e.alpha!=null&&(i.alpha=this.getAlpha(),n.alpha=e.alpha),e.beta!=null&&(i.beta=this.getBeta(),n.beta=e.beta),e.center!=null&&(i.center=this.getCenter(),n.center=e.center),this._addAnimator(t.animation.animate(i).when(e.duration||1e3,n).during(function(){i.alpha!=null&&r.setAlpha(i.alpha),i.beta!=null&&r.setBeta(i.beta),i.distance!=null&&r.setDistance(i.distance),i.center!=null&&r.setCenter(i.center),i.orthographicSize!=null&&r.setOrthographicSize(i.orthographicSize),r._needsUpdate=!0})).start(e.easing||"linear")},stopAllAnimation:function(){for(var e=0;e<this._animators.length;e++)this._animators[e].stop();this._animators.length=0},update:function(){this._needsUpdate=!0,this._update(20)},_isAnimating:function(){return this._animators.length>0},_update:function(e){if(this._rotating){var t=(this.autoRotateDirection==="cw"?1:-1)*this.autoRotateSpeed/180*Math.PI;this._phi-=t*e/1e3,this._needsUpdate=!0}else this._rotateVelocity.len()>0&&(this._needsUpdate=!0);(Math.abs(this._zoomSpeed)>.1||this._panVelocity.len()>0)&&(this._needsUpdate=!0),this._needsUpdate&&(e=Math.min(e,50),this._updateDistanceOrSize(e),this._updatePan(e),this._updateRotate(e),this._updateTransform(),this.getCamera().update(),this.zr&&this.zr.refresh(),this.trigger("update"),this._needsUpdate=!1)},_updateRotate:function(e){var t=this._rotateVelocity;this._phi=t.y*e/20+this._phi,this._theta=t.x*e/20+this._theta,this.setAlpha(this.getAlpha()),this.setBeta(this.getBeta()),this._vectorDamping(t,Math.pow(this.damping,e/16))},_updateDistanceOrSize:function(e){this._projection==="perspective"?this._setDistance(this._distance+this._zoomSpeed*e/20):this._setOrthoSize(this._orthoSize+this._zoomSpeed*e/20),this._zoomSpeed*=Math.pow(this.damping,e/16)},_setDistance:function(e){this._distance=Math.max(Math.min(e,this.maxDistance),this.minDistance)},_setOrthoSize:function(e){this._orthoSize=Math.max(Math.min(e,this.maxOrthographicSize),this.minOrthographicSize);var t=this.getCamera(),r=this._orthoSize,i=r/this.viewGL.viewport.height*this.viewGL.viewport.width;t.left=-i/2,t.right=i/2,t.top=r/2,t.bottom=-r/2},_updatePan:function(e){var t=this._panVelocity,r=this._distance,i=this.getCamera(),n=i.worldTransform.y,a=i.worldTransform.x;this._center.scaleAndAdd(a,-t.x*r/200).scaleAndAdd(n,-t.y*r/200),this._vectorDamping(t,0)},_updateTransform:function(){var e=this.getCamera(),t=new Z,r=this._theta+Math.PI/2,i=this._phi+Math.PI/2,n=Math.sin(r);t.x=n*Math.cos(i),t.y=-Math.cos(r),t.z=n*Math.sin(i),e.position.copy(this._center).scaleAndAdd(t,this._distance),e.rotation.identity().rotateY(-this._phi).rotateX(-this._theta)},_startCountingStill:function(){clearTimeout(this._stillTimeout);var e=this.autoRotateAfterStill,t=this;!isNaN(e)&&e>0&&(this._stillTimeout=setTimeout(function(){t._rotating=!0},e*1e3))},_vectorDamping:function(e,t){var r=e.len();r=r*t,r<1e-4&&(r=0),e.normalize().scale(r)},_decomposeTransform:function(){if(this.getCamera()){this.getCamera().updateWorldTransform();var e=this.getCamera().worldTransform.z,t=Math.asin(e.y),r=Math.atan2(e.x,e.z);this._theta=t,this._phi=-r,this.setBeta(this.getBeta()),this.setAlpha(this.getAlpha()),this.getCamera().aspect?this._setDistance(this.getCamera().position.dist(this._center)):this._setOrthoSize(this.getCamera().top-this.getCamera().bottom)}},_mouseDownHandler:function(e){if(!e.target&&!this._isAnimating()){var t=e.offsetX,r=e.offsetY;this.viewGL&&!this.viewGL.containPoint(t,r)||(this.zr.on("mousemove",this._mouseMoveHandler),this.zr.on("mouseup",this._mouseUpHandler),e.event.targetTouches?e.event.targetTouches.length===1&&(this._mode="rotate"):e.event.button===$l[this.rotateMouseButton]?this._mode="rotate":e.event.button===$l[this.panMouseButton]?this._mode="pan":this._mode="",this._rotateVelocity.set(0,0),this._rotating=!1,this.autoRotate&&this._startCountingStill(),this._mouseX=e.offsetX,this._mouseY=e.offsetY)}},_mouseMoveHandler:function(e){if(!(e.target&&e.target.__isGLToZRProxy)&&!this._isAnimating()){var t=Ql(this.panSensitivity),r=Ql(this.rotateSensitivity);this._mode==="rotate"?(this._rotateVelocity.y=(e.offsetX-this._mouseX)/this.zr.getHeight()*2*r[0],this._rotateVelocity.x=(e.offsetY-this._mouseY)/this.zr.getWidth()*2*r[1]):this._mode==="pan"&&(this._panVelocity.x=(e.offsetX-this._mouseX)/this.zr.getWidth()*t[0]*400,this._panVelocity.y=(-e.offsetY+this._mouseY)/this.zr.getHeight()*t[1]*400),this._mouseX=e.offsetX,this._mouseY=e.offsetY,e.event.preventDefault()}},_mouseWheelHandler:function(e){if(!this._isAnimating()){var t=e.event.wheelDelta||-e.event.detail;this._zoomHandler(e,t)}},_pinchHandler:function(e){this._isAnimating()||(this._zoomHandler(e,e.pinchScale>1?1:-1),this._mode="")},_zoomHandler:function(e,t){if(t!==0){var r=e.offsetX,i=e.offsetY;if(!(this.viewGL&&!this.viewGL.containPoint(r,i))){var n;this._projection==="perspective"?n=Math.max(Math.max(Math.min(this._distance-this.minDistance,this.maxDistance-this._distance))/20,.5):n=Math.max(Math.max(Math.min(this._orthoSize-this.minOrthographicSize,this.maxOrthographicSize-this._orthoSize))/20,.5),this._zoomSpeed=(t>0?-1:1)*n*this.zoomSensitivity,this._rotating=!1,this.autoRotate&&this._mode==="rotate"&&this._startCountingStill(),e.event.preventDefault()}}},_mouseUpHandler:function(){this.zr.off("mousemove",this._mouseMoveHandler),this.zr.off("mouseup",this._mouseUpHandler)},_isRightMouseButtonUsed:function(){return this.rotateMouseButton==="right"||this.panMouseButton==="right"},_contextMenuHandler:function(e){this._isRightMouseButtonUsed()&&e.preventDefault()},_addAnimator:function(e){var t=this._animators;return t.push(e),e.done(function(){var r=t.indexOf(e);r>=0&&t.splice(r,1)}),e}});Object.defineProperty(wu.prototype,"autoRotate",{get:function(e){return this._autoRotate},set:function(e){this._autoRotate=e,this._rotating=e}});const oo=wu,Jn={convertToDynamicArray:function(e){e&&this.resetOffset();var t=this.attributes;for(var r in t)e||!t[r].value?t[r].value=[]:t[r].value=Array.prototype.slice.call(t[r].value);e||!this.indices?this.indices=[]:this.indices=Array.prototype.slice.call(this.indices)},convertToTypedArray:function(){var e=this.attributes;for(var t in e)e[t].value&&e[t].value.length>0?e[t].value=new Float32Array(e[t].value):e[t].value=null;this.indices&&this.indices.length>0&&(this.indices=this.vertexCount>65535?new Uint32Array(this.indices):new Uint16Array(this.indices)),this.dirty()}},ht={vec2:ae,vec3:A,vec4:$,mat2:rt,mat2d:ut,mat3:Ce,mat4:W,quat:ce};var ko=ht.vec3,Jl=[[0,0],[1,1]],bu=Pe.extend(function(){return{segmentScale:1,dynamic:!0,useNativeLine:!0,attributes:{position:new Pe.Attribute("position","float",3,"POSITION"),positionPrev:new Pe.Attribute("positionPrev","float",3),positionNext:new Pe.Attribute("positionNext","float",3),prevPositionPrev:new Pe.Attribute("prevPositionPrev","float",3),prevPosition:new Pe.Attribute("prevPosition","float",3),prevPositionNext:new Pe.Attribute("prevPositionNext","float",3),offset:new Pe.Attribute("offset","float",1),color:new Pe.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._triangleOffset=0,this._itemVertexOffsets=[]},setVertexCount:function(e){var t=this.attributes;this.vertexCount!==e&&(t.position.init(e),t.color.init(e),this.useNativeLine||(t.positionPrev.init(e),t.positionNext.init(e),t.offset.init(e)),e>65535?this.indices instanceof Uint16Array&&(this.indices=new Uint32Array(this.indices)):this.indices instanceof Uint32Array&&(this.indices=new Uint16Array(this.indices)))},setTriangleCount:function(e){this.triangleCount!==e&&(e===0?this.indices=null:this.indices=this.vertexCount>65535?new Uint32Array(e*3):new Uint16Array(e*3))},_getCubicCurveApproxStep:function(e,t,r,i){var n=ko.dist(e,t)+ko.dist(r,t)+ko.dist(i,r),a=1/(n+1)*this.segmentScale;return a},getCubicCurveVertexCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?a*2:a*2+2},getCubicCurveTriangleCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?0:a*2},getLineVertexCount:function(){return this.getPolylineVertexCount(Jl)},getLineTriangleCount:function(){return this.getPolylineTriangleCount(Jl)},getPolylineVertexCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/3}return this.useNativeLine?(t-1)*2:(t-1)*2+2},getPolylineTriangleCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/3}return this.useNativeLine?0:Math.max(t-1,0)*2},addCubicCurve:function(e,t,r,i,n,a){a==null&&(a=1);for(var o=e[0],s=e[1],l=e[2],h=t[0],u=t[1],f=t[2],d=r[0],c=r[1],v=r[2],p=i[0],g=i[1],m=i[2],_=this._getCubicCurveApproxStep(e,t,r,i),x=_*_,y=x*_,T=3*_,w=3*x,E=6*x,S=6*y,D=o-h*2+d,M=s-u*2+c,C=l-f*2+v,N=(h-d)*3-o+p,O=(u-c)*3-s+g,P=(f-v)*3-l+m,F=o,H=s,Y=l,z=(h-o)*T+D*w+N*y,Te=(u-s)*T+M*w+O*y,q=(f-l)*T+C*w+P*y,De=D*E+N*S,ve=M*E+O*S,oe=C*E+P*S,Q=N*S,L=O*S,k=P*S,V=0,J=0,K=Math.ceil(1/_),ie=new Float32Array((K+1)*3),ie=[],pe=0,J=0;J<K+1;J++)ie[pe++]=F,ie[pe++]=H,ie[pe++]=Y,F+=z,H+=Te,Y+=q,z+=De,Te+=ve,q+=oe,De+=Q,ve+=L,oe+=k,V+=_,V>1&&(F=z>0?Math.min(F,p):Math.max(F,p),H=Te>0?Math.min(H,g):Math.max(H,g),Y=q>0?Math.min(Y,m):Math.max(Y,m));return this.addPolyline(ie,n,a)},addLine:function(e,t,r,i){return this.addPolyline([e,t],r,i)},addPolyline:function(e,t,r,i,n){if(e.length){var a=typeof e[0]!="number";if(n==null&&(n=a?e.length:e.length/3),!(n<2)){i==null&&(i=0),r==null&&(r=1),this._itemVertexOffsets.push(this._vertexOffset);var a=typeof e[0]!="number",o=a?typeof t[0]!="number":t.length/4===n,s=this.attributes.position,l=this.attributes.positionPrev,h=this.attributes.positionNext,u=this.attributes.color,f=this.attributes.offset,d=this.indices,c=this._vertexOffset,v,p;r=Math.max(r,.01);for(var g=i;g<n;g++){if(a)v=e[g],o?p=t[g]:p=t;else{var m=g*3;if(v=v||[],v[0]=e[m],v[1]=e[m+1],v[2]=e[m+2],o){var _=g*4;p=p||[],p[0]=t[_],p[1]=t[_+1],p[2]=t[_+2],p[3]=t[_+3]}else p=t}if(this.useNativeLine?g>1&&(s.copy(c,c-1),u.copy(c,c-1),c++):(g<n-1&&(l.set(c+2,v),l.set(c+3,v)),g>0&&(h.set(c-2,v),h.set(c-1,v)),s.set(c,v),s.set(c+1,v),u.set(c,p),u.set(c+1,p),f.set(c,r/2),f.set(c+1,-r/2),c+=2),this.useNativeLine)u.set(c,p),s.set(c,v),c++;else if(g>0){var x=this._triangleOffset*3,d=this.indices;d[x]=c-4,d[x+1]=c-3,d[x+2]=c-2,d[x+3]=c-3,d[x+4]=c-1,d[x+5]=c-2,this._triangleOffset+=2}}if(!this.useNativeLine){var y=this._vertexOffset,T=this._vertexOffset+n*2;l.copy(y,y+2),l.copy(y+1,y+3),h.copy(T-1,T-3),h.copy(T-2,T-4)}return this._vertexOffset=c,this._vertexOffset}}},setItemColor:function(e,t){for(var r=this._itemVertexOffsets[e],i=e<this._itemVertexOffsets.length-1?this._itemVertexOffsets[e+1]:this._vertexOffset,n=r;n<i;n++)this.attributes.color.set(n,t);this.dirty("color")},currentTriangleOffset:function(){return this._triangleOffset},currentVertexOffset:function(){return this._vertexOffset}});si(bu.prototype,Jn);const Ii=bu;function Wa(e,t,r,i,n,a,o){this._zr=e,this._x=0,this._y=0,this._rowHeight=0,this.width=i,this.height=n,this.offsetX=t,this.offsetY=r,this.dpr=o,this.gap=a}Wa.prototype={constructor:Wa,clear:function(){this._x=0,this._y=0,this._rowHeight=0},add:function(e,t,r){var i=e.getBoundingRect();t==null&&(t=i.width),r==null&&(r=i.height),t*=this.dpr,r*=this.dpr,this._fitElement(e,t,r);var n=this._x,a=this._y,o=this.width*this.dpr,s=this.height*this.dpr,l=this.gap;if(n+t+l>o&&(n=this._x=0,a+=this._rowHeight+l,this._y=a,this._rowHeight=0),this._x+=t+l,this._rowHeight=Math.max(this._rowHeight,r),a+r+l>s)return null;e.x+=this.offsetX*this.dpr+n,e.y+=this.offsetY*this.dpr+a,this._zr.add(e);var h=[this.offsetX/this.width,this.offsetY/this.height],u=[[n/o+h[0],a/s+h[1]],[(n+t)/o+h[0],(a+r)/s+h[1]]];return u},_fitElement:function(e,t,r){var i=e.getBoundingRect(),n=t/i.width,a=r/i.height;e.x=-i.x*n,e.y=-i.y*a,e.scaleX=n,e.scaleY=a,e.update()}};function Xa(e){e=e||{},e.width=e.width||512,e.height=e.height||512,e.devicePixelRatio=e.devicePixelRatio||1,e.gap=e.gap==null?2:e.gap;var t=document.createElement("canvas");t.width=e.width*e.devicePixelRatio,t.height=e.height*e.devicePixelRatio,this._canvas=t,this._texture=new ge({image:t,flipY:!1});var r=this;this._zr=Xf(t);var i=this._zr.refreshImmediately;this._zr.refreshImmediately=function(){i.call(this),r._texture.dirty(),r.onupdate&&r.onupdate()},this._dpr=e.devicePixelRatio,this._coords={},this.onupdate=e.onupdate,this._gap=e.gap,this._textureAtlasNodes=[new Wa(this._zr,0,0,e.width,e.height,this._gap,this._dpr)],this._nodeWidth=e.width,this._nodeHeight=e.height,this._currentNodeIdx=0}Xa.prototype={clear:function(){for(var e=0;e<this._textureAtlasNodes.length;e++)this._textureAtlasNodes[e].clear();this._currentNodeIdx=0,this._zr.clear(),this._coords={}},getWidth:function(){return this._width},getHeight:function(){return this._height},getTexture:function(){return this._texture},getDevicePixelRatio:function(){return this._dpr},getZr:function(){return this._zr},_getCurrentNode:function(){return this._textureAtlasNodes[this._currentNodeIdx]},_expand:function(){if(this._currentNodeIdx++,this._textureAtlasNodes[this._currentNodeIdx])return this._textureAtlasNodes[this._currentNodeIdx];var e=4096/this._dpr,t=this._textureAtlasNodes,r=t.length,i=r*this._nodeWidth%e,n=Math.floor(r*this._nodeWidth/e)*this._nodeHeight;if(!(n>=e)){var a=(i+this._nodeWidth)*this._dpr,o=(n+this._nodeHeight)*this._dpr;try{this._zr.resize({width:a,height:o})}catch{this._canvas.width=a,this._canvas.height=o}var s=new Wa(this._zr,i,n,this._nodeWidth,this._nodeHeight,this._gap,this._dpr);return this._textureAtlasNodes.push(s),s}},add:function(e,t,r){if(this._coords[e.id])return this._coords[e.id];var i=this._getCurrentNode().add(e,t,r);if(!i){var n=this._expand();if(!n)return;i=n.add(e,t,r)}return this._coords[e.id]=i,i},getCoordsScale:function(){var e=this._dpr;return[this._nodeWidth/this._canvas.width*e,this._nodeHeight/this._canvas.height*e]},getCoords:function(e){return this._coords[e]},dispose:function(){this._zr.dispose()}};function ni(){}ni.prototype={constructor:ni,setScene:function(e){this._scene=e,this._skybox&&this._skybox.attachScene(this._scene)},initLight:function(e){this._lightRoot=e,this.mainLight=new b.DirectionalLight({shadowBias:.005}),this.ambientLight=new b.AmbientLight,e.add(this.mainLight),e.add(this.ambientLight)},dispose:function(){this._lightRoot&&(this._lightRoot.remove(this.mainLight),this._lightRoot.remove(this.ambientLight))},updateLight:function(e){var t=this.mainLight,r=this.ambientLight,i=e.getModel("light"),n=i.getModel("main"),a=i.getModel("ambient");t.intensity=n.get("intensity"),r.intensity=a.get("intensity"),t.color=b.parseColor(n.get("color")).slice(0,3),r.color=b.parseColor(a.get("color")).slice(0,3);var o=n.get("alpha")||0,s=n.get("beta")||0;t.position.setArray(b.directionFromAlphaBeta(o,s)),t.lookAt(b.Vector3.ZERO),t.castShadow=n.get("shadow"),t.shadowResolution=b.getShadowResolution(n.get("shadowQuality"))},updateAmbientCubemap:function(e,t,r){var i=t.getModel("light.ambientCubemap"),n=i.get("texture");if(n){this._cubemapLightsCache=this._cubemapLightsCache||{};var a=this._cubemapLightsCache[n];if(!a){var o=this;a=this._cubemapLightsCache[n]=b.createAmbientCubemap(i.option,e,r,function(){o._isSkyboxFromAmbientCubemap&&o._skybox.setEnvironmentMap(a.specular.cubemap),r.getZr().refresh()})}this._lightRoot.add(a.diffuse),this._lightRoot.add(a.specular),this._currentCubemapLights=a}else this._currentCubemapLights&&(this._lightRoot.remove(this._currentCubemapLights.diffuse),this._lightRoot.remove(this._currentCubemapLights.specular),this._currentCubemapLights=null)},updateSkybox:function(e,t,r){var i=t.get("environment"),n=this;function a(){return n._skybox=n._skybox||new Gn,n._skybox}var o=a();if(i&&i!=="none")if(i==="auto")if(this._isSkyboxFromAmbientCubemap=!0,this._currentCubemapLights){var s=this._currentCubemapLights.specular.cubemap;o.setEnvironmentMap(s),this._scene&&o.attachScene(this._scene),o.material.set("lod",3)}else this._skybox&&this._skybox.detachScene();else if(typeof i=="object"&&i.colorStops||typeof i=="string"&&Vh(i)){this._isSkyboxFromAmbientCubemap=!1;var l=new b.Texture2D({anisotropic:8,flipY:!1});o.setEnvironmentMap(l);var h=l.image=document.createElement("canvas");h.width=h.height=16;var u=h.getContext("2d"),f=new Wh({shape:{x:0,y:0,width:16,height:16},style:{fill:i}});jh(u,f),o.attachScene(this._scene)}else{this._isSkyboxFromAmbientCubemap=!1;var l=b.loadTexture(i,r,{anisotropic:8,flipY:!1});o.setEnvironmentMap(l),o.attachScene(this._scene)}else this._skybox&&this._skybox.detachScene(this._scene),this._skybox=null;var d=t.coordinateSystem;if(this._skybox)if(d&&d.viewGL&&i!=="auto"&&!(i.match&&i.match(/.hdr$/))){var c=d.viewGL.isLinearSpace()?"define":"undefine";this._skybox.material[c]("fragment","SRGB_DECODE")}else this._skybox.material.undefine("fragment","SRGB_DECODE")}};var mi=ht.vec3,Su=Pe.extend(function(){return{segmentScale:1,useNativeLine:!0,attributes:{position:new Pe.Attribute("position","float",3,"POSITION"),normal:new Pe.Attribute("normal","float",3,"NORMAL"),color:new Pe.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0},setQuadCount:function(e){var t=this.attributes,r=this.getQuadVertexCount()*e,i=this.getQuadTriangleCount()*e;this.vertexCount!==r&&(t.position.init(r),t.normal.init(r),t.color.init(r)),this.triangleCount!==i&&(this.indices=r>65535?new Uint32Array(i*3):new Uint16Array(i*3))},getQuadVertexCount:function(){return 4},getQuadTriangleCount:function(){return 2},addQuad:function(){var e=mi.create(),t=mi.create(),r=mi.create(),i=[0,3,1,3,2,1];return function(n,a){var o=this.attributes.position,s=this.attributes.normal,l=this.attributes.color;mi.sub(e,n[1],n[0]),mi.sub(t,n[2],n[1]),mi.cross(r,e,t),mi.normalize(r,r);for(var h=0;h<4;h++)o.set(this._vertexOffset+h,n[h]),l.set(this._vertexOffset+h,a),s.set(this._vertexOffset+h,r);for(var u=this._faceOffset*3,h=0;h<6;h++)this.indices[u+h]=i[h]+this._vertexOffset;this._vertexOffset+=4,this._faceOffset+=2}}()});si(Su.prototype,Jn);const Qv=Su;var us=xe.firstNotNull,Jv={x:0,y:2,z:1};function ep(e,t,r,i){var n=[0,0,0],a=i<0?r.getExtentMin():r.getExtentMax();n[Jv[r.dim]]=a,e.position.setArray(n),e.rotation.identity(),t.distance=-Math.abs(a),t.normal.set(0,0,0),r.dim==="x"?(e.rotation.rotateY(i*Math.PI/2),t.normal.x=-i):r.dim==="z"?(e.rotation.rotateX(-i*Math.PI/2),t.normal.y=-i):(i>0&&e.rotation.rotateY(Math.PI),t.normal.z=-i)}function so(e,t,r){this.rootNode=new b.Node;var i=new b.Mesh({geometry:new Ii({useNativeLine:!1}),material:t,castShadow:!1,ignorePicking:!0,$ignorePicking:!0,renderOrder:1}),n=new b.Mesh({geometry:new Qv,material:r,castShadow:!1,culling:!1,ignorePicking:!0,$ignorePicking:!0,renderOrder:0});this.rootNode.add(n),this.rootNode.add(i),this.faceInfo=e,this.plane=new b.Plane,this.linesMesh=i,this.quadsMesh=n}so.prototype.update=function(e,t,r){var i=e.coordinateSystem,n=[i.getAxis(this.faceInfo[0]),i.getAxis(this.faceInfo[1])],a=this.linesMesh.geometry,o=this.quadsMesh.geometry;a.convertToDynamicArray(!0),o.convertToDynamicArray(!0),this._updateSplitLines(a,n,e,r),this._udpateSplitAreas(o,n,e,r),a.convertToTypedArray(),o.convertToTypedArray();var s=i.getAxis(this.faceInfo[2]);ep(this.rootNode,this.plane,s,this.faceInfo[3])};so.prototype._updateSplitLines=function(e,t,r,i){var n=i.getDevicePixelRatio();t.forEach(function(a,o){var s=a.model,l=t[1-o].getExtent();if(!a.scale.isBlank()){var h=s.getModel("splitLine",r.getModel("splitLine"));if(h.get("show")){var u=h.getModel("lineStyle"),f=u.get("color"),d=us(u.get("opacity"),1),c=us(u.get("width"),1);f=ur(f)?f:[f];for(var v=a.getTicksCoords({tickModel:h}),p=0,g=0;g<v.length;g++){var m=v[g].coord,_=b.parseColor(f[p%f.length]);_[3]*=d;var x=[0,0,0],y=[0,0,0];x[o]=y[o]=m,x[1-o]=l[0],y[1-o]=l[1],e.addLine(x,y,_,c*n),p++}}}})};so.prototype._udpateSplitAreas=function(e,t,r,i){t.forEach(function(n,a){var o=n.model,s=t[1-a].getExtent();if(!n.scale.isBlank()){var l=o.getModel("splitArea",r.getModel("splitArea"));if(l.get("show")){var h=l.getModel("areaStyle"),u=h.get("color"),f=us(h.get("opacity"),1);u=ur(u)?u:[u];for(var d=n.getTicksCoords({tickModel:l,clamp:!0}),c=0,v=[0,0,0],p=[0,0,0],g=0;g<d.length;g++){var m=d[g].coord,_=[0,0,0],x=[0,0,0];if(_[a]=x[a]=m,_[1-a]=s[0],x[1-a]=s[1],g===0){v=_,p=x;continue}var y=b.parseColor(u[c%u.length]);y[3]*=f,e.addQuad([v,_,x,p],y),v=_,p=x,c++}}}})};var eh=[0,1,2,0,2,3],Eu=Pe.extend(function(){return{attributes:{position:new Pe.Attribute("position","float",3,"POSITION"),texcoord:new Pe.Attribute("texcoord","float",2,"TEXCOORD_0"),offset:new Pe.Attribute("offset","float",2),color:new Pe.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0},setSpriteCount:function(e){this._spriteCount=e;var t=e*4,r=e*2;this.vertexCount!==t&&(this.attributes.position.init(t),this.attributes.offset.init(t),this.attributes.color.init(t)),this.triangleCount!==r&&(this.indices=t>65535?new Uint32Array(r*3):new Uint16Array(r*3))},setSpriteAlign:function(e,t,r,i,n){r==null&&(r="left"),i==null&&(i="top");var a,o,s,l;switch(n=n||0,r){case"left":a=n,s=t[0]+n;break;case"center":case"middle":a=-t[0]/2,s=t[0]/2;break;case"right":a=-t[0]-n,s=-n;break}switch(i){case"bottom":o=n,l=t[1]+n;break;case"middle":o=-t[1]/2,l=t[1]/2;break;case"top":o=-t[1]-n,l=-n;break}var h=e*4,u=this.attributes.offset;u.set(h,[a,l]),u.set(h+1,[s,l]),u.set(h+2,[s,o]),u.set(h+3,[a,o])},addSprite:function(e,t,r,i,n,a){var o=this._vertexOffset;this.setSprite(this._vertexOffset/4,e,t,r,i,n,a);for(var s=0;s<eh.length;s++)this.indices[this._faceOffset*3+s]=eh[s]+o;return this._faceOffset+=2,this._vertexOffset+=4,o/4},setSprite:function(e,t,r,i,n,a,o){for(var s=e*4,l=this.attributes,h=0;h<4;h++)l.position.set(s+h,t);var u=l.texcoord;u.set(s,[i[0][0],i[0][1]]),u.set(s+1,[i[1][0],i[0][1]]),u.set(s+2,[i[1][0],i[1][1]]),u.set(s+3,[i[0][0],i[1][1]]),this.setSpriteAlign(e,r,n,a,o)}});si(Eu.prototype,Jn);const tp=Eu,rp=`@export ecgl.labels.vertex

attribute vec3 position: POSITION;
attribute vec2 texcoord: TEXCOORD_0;
attribute vec2 offset;
#ifdef VERTEX_COLOR
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;
#endif

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;

varying vec2 v_Texcoord;

void main()
{
 vec4 proj = worldViewProjection * vec4(position, 1.0);

 vec2 screen = (proj.xy / abs(proj.w) + 1.0) * 0.5 * viewport.zw;

 screen += offset;

 proj.xy = (screen / viewport.zw - 0.5) * 2.0 * abs(proj.w);
 gl_Position = proj;
#ifdef VERTEX_COLOR
 v_Color = a_Color;
#endif
 v_Texcoord = texcoord;
}
@end


@export ecgl.labels.fragment

uniform vec3 color : [1.0, 1.0, 1.0];
uniform float alpha : 1.0;
uniform sampler2D textureAtlas;
uniform vec2 uvScale: [1.0, 1.0];

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif
varying float v_Miter;

varying vec2 v_Texcoord;

void main()
{
 gl_FragColor = vec4(color, alpha) * texture2D(textureAtlas, v_Texcoord * uvScale);
#ifdef VERTEX_COLOR
 gl_FragColor *= v_Color;
#endif
}

@end`;b.Shader.import(rp);const Ps=b.Mesh.extend(function(){var e=new tp({dynamic:!0}),t=new b.Material({shader:b.createShader("ecgl.labels"),transparent:!0,depthMask:!1});return{geometry:e,material:t,culling:!1,castShadow:!1,ignorePicking:!0}});var gi=xe.firstNotNull,_i={x:0,y:2,z:1};function Rs(e,t){var r=new b.Mesh({geometry:new Ii({useNativeLine:!1}),material:t,castShadow:!1,ignorePicking:!0,renderOrder:2}),i=new Ps;i.material.depthMask=!1;var n=new b.Node;n.add(r),n.add(i),this.rootNode=n,this.dim=e,this.linesMesh=r,this.labelsMesh=i,this.axisLineCoords=null,this.labelElements=[]}var Ho={x:"y",y:"x",z:"y"};Rs.prototype.update=function(e,t,r){var i=e.coordinateSystem,n=i.getAxis(this.dim),a=this.linesMesh.geometry,o=this.labelsMesh.geometry;a.convertToDynamicArray(!0),o.convertToDynamicArray(!0);var s=n.model,l=n.getExtent(),C=r.getDevicePixelRatio(),h=s.getModel("axisLine",e.getModel("axisLine")),u=s.getModel("axisTick",e.getModel("axisTick")),f=s.getModel("axisLabel",e.getModel("axisLabel")),d=h.get("lineStyle.color");if(h.get("show")){var c=h.getModel("lineStyle"),v=[0,0,0],p=[0,0,0],g=_i[n.dim];v[g]=l[0],p[g]=l[1],this.axisLineCoords=[v,p];var m=b.parseColor(d),_=gi(c.get("width"),1),x=gi(c.get("opacity"),1);m[3]*=x,a.addLine(v,p,m,_*C)}if(u.get("show")){var y=u.getModel("lineStyle"),T=b.parseColor(gi(y.get("color"),d)),_=gi(y.get("width"),1);T[3]*=gi(y.get("opacity"),1);for(var w=n.getTicksCoords(),E=u.get("length"),S=0;S<w.length;S++){var D=w[S].coord,v=[0,0,0],p=[0,0,0],g=_i[n.dim],M=_i[Ho[n.dim]];v[g]=p[g]=D,p[M]=E,a.addLine(v,p,T,_*C)}}this.labelElements=[];var C=r.getDevicePixelRatio();if(f.get("show"))for(var w=n.getTicksCoords(),N=s.get("data"),O=f.get("margin"),P=n.getViewLabels(),S=0;S<P.length;S++){var F=P[S].tickValue,H=P[S].formattedLabel,Y=P[S].rawLabel,D=n.dataToCoord(F),z=[0,0,0],g=_i[n.dim],M=_i[Ho[n.dim]];z[g]=z[g]=D,z[M]=O;var Te=f;N&&N[F]&&N[F].textStyle&&(Te=new Qi(N[F].textStyle,f,s.ecModel));var q=gi(Te.get("color"),d),De=new Fn({style:Bn(Te,{text:H,fill:typeof q=="function"?q(n.type==="category"?Y:n.type==="value"?F+"":F,S):q,verticalAlign:"top",align:"left"})}),ve=t.add(De),oe=De.getBoundingRect();o.addSprite(z,[oe.width*C,oe.height*C],ve),this.labelElements.push(De)}if(s.get("name")){var Q=s.getModel("nameTextStyle"),z=[0,0,0],g=_i[n.dim],M=_i[Ho[n.dim]],L=gi(Q.get("color"),d),k=Q.get("borderColor"),_=Q.get("borderWidth");z[g]=z[g]=(l[0]+l[1])/2,z[M]=s.get("nameGap");var De=new Fn({style:Bn(Q,{text:s.get("name"),fill:L,stroke:k,lineWidth:_})}),ve=t.add(De),oe=De.getBoundingRect();o.addSprite(z,[oe.width*C,oe.height*C],ve),De.__idx=this.labelElements.length,this.nameLabelElement=De}this.labelsMesh.material.set("textureAtlas",t.getTexture()),this.labelsMesh.material.set("uvScale",t.getCoordsScale()),a.convertToTypedArray(),o.convertToTypedArray()};Rs.prototype.setSpriteAlign=function(e,t,r){for(var i=r.getDevicePixelRatio(),n=this.labelsMesh.geometry,a=0;a<this.labelElements.length;a++){var o=this.labelElements[a],s=o.getBoundingRect();n.setSpriteAlign(a,[s.width*i,s.height*i],e,t)}var l=this.nameLabelElement;if(l){var s=l.getBoundingRect();n.setSpriteAlign(l.__idx,[s.width*i,s.height*i],e,t),n.dirty()}this.textAlign=e,this.textVerticalAlign=t};const lo=`@export ecgl.lines3D.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec3 position: POSITION;
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;

void main()
{
 gl_Position = worldViewProjection * vec4(position, 1.0);
 v_Color = a_Color;
}

@end

@export ecgl.lines3D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;

@import clay.util.srgb

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color * v_Color);
#else
 gl_FragColor = color * v_Color;
#endif
}
@end



@export ecgl.lines3D.clipNear

vec4 clipNear(vec4 p1, vec4 p2) {
 float n = (p1.w - near) / (p1.w - p2.w);
 return vec4(mix(p1.xy, p2.xy, n), -near, near);
}

@end

@export ecgl.lines3D.expandLine
#ifdef VERTEX_ANIMATION
 vec4 prevProj = worldViewProjection * vec4(mix(prevPositionPrev, positionPrev, percent), 1.0);
 vec4 currProj = worldViewProjection * vec4(mix(prevPosition, position, percent), 1.0);
 vec4 nextProj = worldViewProjection * vec4(mix(prevPositionNext, positionNext, percent), 1.0);
#else
 vec4 prevProj = worldViewProjection * vec4(positionPrev, 1.0);
 vec4 currProj = worldViewProjection * vec4(position, 1.0);
 vec4 nextProj = worldViewProjection * vec4(positionNext, 1.0);
#endif

 if (currProj.w < 0.0) {
 if (nextProj.w > 0.0) {
 currProj = clipNear(currProj, nextProj);
 }
 else if (prevProj.w > 0.0) {
 currProj = clipNear(currProj, prevProj);
 }
 }

 vec2 prevScreen = (prevProj.xy / abs(prevProj.w) + 1.0) * 0.5 * viewport.zw;
 vec2 currScreen = (currProj.xy / abs(currProj.w) + 1.0) * 0.5 * viewport.zw;
 vec2 nextScreen = (nextProj.xy / abs(nextProj.w) + 1.0) * 0.5 * viewport.zw;

 vec2 dir;
 float len = offset;
 if (position == positionPrev) {
 dir = normalize(nextScreen - currScreen);
 }
 else if (position == positionNext) {
 dir = normalize(currScreen - prevScreen);
 }
 else {
 vec2 dirA = normalize(currScreen - prevScreen);
 vec2 dirB = normalize(nextScreen - currScreen);

 vec2 tanget = normalize(dirA + dirB);

 float miter = 1.0 / max(dot(tanget, dirA), 0.5);
 len *= miter;
 dir = tanget;
 }

 dir = vec2(-dir.y, dir.x) * len;
 currScreen += dir;

 currProj.xy = (currScreen / viewport.zw - 0.5) * 2.0 * abs(currProj.w);
@end


@export ecgl.meshLines3D.vertex

attribute vec3 position: POSITION;
attribute vec3 positionPrev;
attribute vec3 positionNext;
attribute float offset;
attribute vec4 a_Color : COLOR;

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
attribute vec3 prevPositionPrev;
attribute vec3 prevPositionNext;
uniform float percent : 1.0;
#endif

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;
uniform float near : NEAR;

varying vec4 v_Color;

@import ecgl.common.wireframe.vertexHeader

@import ecgl.lines3D.clipNear

void main()
{
 @import ecgl.lines3D.expandLine

 gl_Position = currProj;

 v_Color = a_Color;

 @import ecgl.common.wireframe.vertexMain
}
@end


@export ecgl.meshLines3D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;

@import ecgl.common.wireframe.fragmentHeader

@import clay.util.srgb

void main()
{
#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color * v_Color);
#else
 gl_FragColor = color * v_Color;
#endif

 @import ecgl.common.wireframe.fragmentMain
}

@end`;var th=xe.firstNotNull;b.Shader.import(lo);var yi={x:0,y:2,z:1};const ip=Kn.extend({type:"grid3D",__ecgl__:!0,init:function(e,t){var r=[["y","z","x",-1,"left"],["y","z","x",1,"right"],["x","y","z",-1,"bottom"],["x","y","z",1,"top"],["x","z","y",-1,"far"],["x","z","y",1,"near"]],i=["x","y","z"],n=new b.Material({shader:b.createShader("ecgl.color"),depthMask:!1,transparent:!0}),a=new b.Material({shader:b.createShader("ecgl.meshLines3D"),depthMask:!1,transparent:!0});n.define("fragment","DOUBLE_SIDED"),n.define("both","VERTEX_COLOR"),this.groupGL=new b.Node,this._control=new oo({zr:t.getZr()}),this._control.init(),this._faces=r.map(function(s){var l=new so(s,a,n);return this.groupGL.add(l.rootNode),l},this),this._axes=i.map(function(s){var l=new Rs(s,a);return this.groupGL.add(l.rootNode),l},this);var o=t.getDevicePixelRatio();this._axisLabelSurface=new Xa({width:256,height:256,devicePixelRatio:o}),this._axisLabelSurface.onupdate=function(){t.getZr().refresh()},this._axisPointerLineMesh=new b.Mesh({geometry:new Ii({useNativeLine:!1}),material:a,castShadow:!1,ignorePicking:!0,renderOrder:3}),this.groupGL.add(this._axisPointerLineMesh),this._axisPointerLabelsSurface=new Xa({width:128,height:128,devicePixelRatio:o}),this._axisPointerLabelsMesh=new Ps({ignorePicking:!0,renderOrder:4,castShadow:!1}),this._axisPointerLabelsMesh.material.set("textureAtlas",this._axisPointerLabelsSurface.getTexture()),this.groupGL.add(this._axisPointerLabelsMesh),this._lightRoot=new b.Node,this._sceneHelper=new ni,this._sceneHelper.initLight(this._lightRoot)},render:function(e,t,r){this._model=e,this._api=r;var i=e.coordinateSystem;i.viewGL.add(this._lightRoot),e.get("show")?i.viewGL.add(this.groupGL):i.viewGL.remove(this.groupGL);var n=this._control;n.setViewGL(i.viewGL);var a=e.getModel("viewControl");n.setFromViewControlModel(a,0),this._axisLabelSurface.clear(),n.off("update"),e.get("show")&&(this._faces.forEach(function(o){o.update(e,t,r)},this),this._axes.forEach(function(o){o.update(e,this._axisLabelSurface,r)},this)),n.on("update",this._onCameraChange.bind(this,e,r),this),this._sceneHelper.setScene(i.viewGL.scene),this._sceneHelper.updateLight(e),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._initMouseHandler(e)},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r)},showAxisPointer:function(e,t,r,i){this._doShowAxisPointer(),this._updateAxisPointer(i.value)},hideAxisPointer:function(e,t,r,i){this._doHideAxisPointer()},_initMouseHandler:function(e){var t=e.coordinateSystem,r=t.viewGL;e.get("show")&&e.get("axisPointer.show")?r.on("mousemove",this._updateAxisPointerOnMousePosition,this):r.off("mousemove",this._updateAxisPointerOnMousePosition)},_updateAxisPointerOnMousePosition:function(e){if(!e.target){for(var t=this._model,r=t.coordinateSystem,i=r.viewGL,n=i.castRay(e.offsetX,e.offsetY,new b.Ray),a,o=0;o<this._faces.length;o++){var s=this._faces[o];if(!s.rootNode.invisible){s.plane.normal.dot(i.camera.worldTransform.z)<0&&s.plane.normal.negate();var l=n.intersectPlane(s.plane);if(l){var h=r.getAxis(s.faceInfo[0]),u=r.getAxis(s.faceInfo[1]),f=yi[s.faceInfo[0]],d=yi[s.faceInfo[1]];h.contain(l.array[f])&&u.contain(l.array[d])&&(a=l)}}}if(a){var c=r.pointToData(a.array,[],!0);this._updateAxisPointer(c),this._doShowAxisPointer()}else this._doHideAxisPointer()}},_onCameraChange:function(e,t){e.get("show")&&(this._updateFaceVisibility(),this._updateAxisLinePosition());var r=this._control;t.dispatchAction({type:"grid3DChangeCamera",alpha:r.getAlpha(),beta:r.getBeta(),distance:r.getDistance(),center:r.getCenter(),from:this.uid,grid3DId:e.id})},_updateFaceVisibility:function(){var e=this._control.getCamera(),t=new b.Vector3;e.update();for(var r=0;r<this._faces.length/2;r++){for(var i=[],n=0;n<2;n++){var a=this._faces[r*2+n];a.rootNode.getWorldPosition(t),t.transformMat4(e.viewMatrix),i[n]=t.z}var o=i[0]>i[1]?0:1,s=this._faces[r*2+o],l=this._faces[r*2+1-o];s.rootNode.invisible=!0,l.rootNode.invisible=!1}},_updateAxisLinePosition:function(){var e=this._model.coordinateSystem,t=e.getAxis("x"),r=e.getAxis("y"),i=e.getAxis("z"),n=i.getExtentMax(),a=i.getExtentMin(),o=t.getExtentMin(),s=t.getExtentMax(),l=r.getExtentMax(),h=r.getExtentMin(),u=this._axes[0].rootNode,f=this._axes[1].rootNode,d=this._axes[2].rootNode,c=this._faces,v=c[4].rootNode.invisible?h:l,p=c[2].rootNode.invisible?n:a,g=c[0].rootNode.invisible?o:s,m=c[2].rootNode.invisible?n:a,_=c[0].rootNode.invisible?s:o,x=c[4].rootNode.invisible?h:l;u.rotation.identity(),f.rotation.identity(),d.rotation.identity(),c[4].rootNode.invisible&&(this._axes[0].flipped=!0,u.rotation.rotateX(Math.PI)),c[0].rootNode.invisible&&(this._axes[1].flipped=!0,f.rotation.rotateZ(Math.PI)),c[4].rootNode.invisible&&(this._axes[2].flipped=!0,d.rotation.rotateY(Math.PI)),u.position.set(0,p,v),f.position.set(g,m,0),d.position.set(_,0,x),u.update(),f.update(),d.update(),this._updateAxisLabelAlign()},_updateAxisLabelAlign:function(){var e=this._control.getCamera(),t=[new b.Vector4,new b.Vector4],r=new b.Vector4;this.groupGL.getWorldPosition(r),r.w=1,r.transformMat4(e.viewMatrix).transformMat4(e.projectionMatrix),r.x/=r.w,r.y/=r.w,this._axes.forEach(function(i){var n=i.axisLineCoords;i.labelsMesh.geometry;for(var a=0;a<t.length;a++)t[a].setArray(n[a]),t[a].w=1,t[a].transformMat4(i.rootNode.worldTransform).transformMat4(e.viewMatrix).transformMat4(e.projectionMatrix),t[a].x/=t[a].w,t[a].y/=t[a].w;var o=t[1].x-t[0].x,s=t[1].y-t[0].y,l=(t[1].x+t[0].x)/2,h=(t[1].y+t[0].y)/2,u,f;Math.abs(s/o)<.5?(u="center",f=h>r.y?"bottom":"top"):(f="middle",u=l>r.x?"left":"right"),i.setSpriteAlign(u,f,this._api)},this)},_doShowAxisPointer:function(){this._axisPointerLineMesh.invisible&&(this._axisPointerLineMesh.invisible=!1,this._axisPointerLabelsMesh.invisible=!1,this._api.getZr().refresh())},_doHideAxisPointer:function(){this._axisPointerLineMesh.invisible||(this._axisPointerLineMesh.invisible=!0,this._axisPointerLabelsMesh.invisible=!0,this._api.getZr().refresh())},_updateAxisPointer:function(e){var t=this._model.coordinateSystem,r=t.dataToPoint(e),i=this._axisPointerLineMesh,n=i.geometry,a=this._model.getModel("axisPointer"),o=this._api.getDevicePixelRatio();n.convertToDynamicArray(!0);function s(S){return xe.firstNotNull(S.model.get("axisPointer.show"),a.get("show"))}function l(S){var D=S.model.getModel("axisPointer",a),M=D.getModel("lineStyle"),C=b.parseColor(M.get("color")),N=th(M.get("width"),1),O=th(M.get("opacity"),1);return C[3]*=O,{color:C,lineWidth:N}}for(var h=0;h<this._faces.length;h++){var u=this._faces[h];if(!u.rootNode.invisible){for(var f=u.faceInfo,d=f[3]<0?t.getAxis(f[2]).getExtentMin():t.getAxis(f[2]).getExtentMax(),c=yi[f[2]],v=0;v<2;v++){var p=f[v],g=f[1-v],m=t.getAxis(p),_=t.getAxis(g);if(s(m)){var x=[0,0,0],y=[0,0,0],T=yi[p],w=yi[g];x[T]=y[T]=r[T],x[c]=y[c]=d,x[w]=_.getExtentMin(),y[w]=_.getExtentMax();var E=l(m);n.addLine(x,y,E.color,E.lineWidth*o)}}if(s(t.getAxis(f[2]))){var x=r.slice(),y=r.slice();y[c]=d;var E=l(t.getAxis(f[2]));n.addLine(x,y,E.color,E.lineWidth*o)}}}n.convertToTypedArray(),this._updateAxisPointerLabelsMesh(e),this._api.getZr().refresh()},_updateAxisPointerLabelsMesh:function(e){var t=this._model,r=this._axisPointerLabelsMesh,i=this._axisPointerLabelsSurface,n=t.coordinateSystem,a=t.getModel("axisPointer");r.geometry.convertToDynamicArray(!0),i.clear();var o={x:"y",y:"x",z:"y"};this._axes.forEach(function(s,l){var h=n.getAxis(s.dim),u=h.model,f=u.getModel("axisPointer",a),d=f.getModel("label"),c=f.get("lineStyle.color");if(!(!d.get("show")||!f.get("show"))){var v=e[l],p=d.get("formatter"),g=h.scale.getLabel({value:v});if(p!=null)g=p(g,e);else if(h.scale.type==="interval"||h.scale.type==="log"){var m=Zh(h.scale.getTicks()[0]);g=v.toFixed(m+2)}var _=d.get("color"),x=new Fn({style:Bn(d,{text:g,fill:_||c,align:"left",verticalAlign:"top"})}),y=i.add(x),T=x.getBoundingRect(),w=this._api.getDevicePixelRatio(),E=s.rootNode.position.toArray(),S=yi[o[s.dim]];E[S]+=(s.flipped?-1:1)*d.get("margin"),E[yi[s.dim]]=h.dataToCoord(e[l]),r.geometry.addSprite(E,[T.width*w,T.height*w],y,s.textAlign,s.textVerticalAlign)}},this),i.getZr().refreshImmediately(),r.material.set("uvScale",i.getCoordsScale()),r.geometry.convertToTypedArray()},dispose:function(){this.groupGL.removeAll(),this._control.dispose(),this._axisLabelSurface.dispose(),this._axisPointerLabelsSurface.dispose()}});function kn(e){qh.call(this,e),this.type="cartesian3D",this.dimensions=["x","y","z"],this.size=[0,0,0]}kn.prototype={constructor:kn,model:null,containPoint:function(e){return this.getAxis("x").contain(e[0])&&this.getAxis("y").contain(e[2])&&this.getAxis("z").contain(e[1])},containData:function(e){return this.getAxis("x").containData(e[0])&&this.getAxis("y").containData(e[1])&&this.getAxis("z").containData(e[2])},dataToPoint:function(e,t,r){return t=t||[],t[0]=this.getAxis("x").dataToCoord(e[0],r),t[2]=this.getAxis("y").dataToCoord(e[1],r),t[1]=this.getAxis("z").dataToCoord(e[2],r),t},pointToData:function(e,t,r){return t=t||[],t[0]=this.getAxis("x").coordToData(e[0],r),t[1]=this.getAxis("y").coordToData(e[2],r),t[2]=this.getAxis("z").coordToData(e[1],r),t}};Yh(kn,qh);function ja(e,t,r){Ja.call(this,e,t,r)}ja.prototype={constructor:ja,getExtentMin:function(){var e=this._extent;return Math.min(e[0],e[1])},getExtentMax:function(){var e=this._extent;return Math.max(e[0],e[1])},calculateCategoryInterval:function(){return Math.floor(this.scale.count()/8)}};Yh(ja,Ja);var fs=function(){this._pool={},this._allocatedTextures=[]};fs.prototype={constructor:fs,get:function(e){var t=rh(e);this._pool.hasOwnProperty(t)||(this._pool[t]=[]);var r=this._pool[t];if(!r.length){var i=new ge(e);return this._allocatedTextures.push(i),i}return r.pop()},put:function(e){var t=rh(e);this._pool.hasOwnProperty(t)||(this._pool[t]=[]);var r=this._pool[t];r.push(e)},clear:function(e){for(var t=0;t<this._allocatedTextures.length;t++)this._allocatedTextures[t].dispose(e);this._pool={},this._allocatedTextures=[]}};var Au={width:512,height:512,type:I.UNSIGNED_BYTE,format:I.RGBA,wrapS:I.CLAMP_TO_EDGE,wrapT:I.CLAMP_TO_EDGE,minFilter:I.LINEAR_MIPMAP_LINEAR,magFilter:I.LINEAR,useMipmap:!0,anisotropic:1,flipY:!0,unpackAlignment:4,premultiplyAlpha:!1},Vo=Object.keys(Au);function rh(e){Et.defaultsWithPropList(e,Au,Vo),np(e);for(var t="",r=0;r<Vo.length;r++){var i=Vo[r],n=e[i].toString();t+=n}return t}function np(e){var t=ap(e.width,e.height);e.format===I.DEPTH_COMPONENT&&(e.useMipmap=!1),(!t||!e.useMipmap)&&(e.minFilter==I.NEAREST_MIPMAP_NEAREST||e.minFilter==I.NEAREST_MIPMAP_LINEAR?e.minFilter=I.NEAREST:(e.minFilter==I.LINEAR_MIPMAP_LINEAR||e.minFilter==I.LINEAR_MIPMAP_NEAREST)&&(e.minFilter=I.LINEAR)),t||(e.wrapS=I.CLAMP_TO_EDGE,e.wrapT=I.CLAMP_TO_EDGE)}function ap(e,t){return(e&e-1)===0&&(t&t-1)===0}const Cu=fs,op=`@export clay.sm.depth.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
attribute vec3 position : POSITION;
attribute vec2 texcoord : TEXCOORD_0;
uniform vec2 uvRepeat = vec2(1.0, 1.0);
uniform vec2 uvOffset = vec2(0.0, 0.0);
@import clay.chunk.skinning_header
@import clay.chunk.instancing_header
varying vec4 v_ViewPosition;
varying vec2 v_Texcoord;
void main(){
 vec4 P = vec4(position, 1.0);
#ifdef SKINNING
 @import clay.chunk.skin_matrix
 P = skinMatrixWS * P;
#endif
#ifdef INSTANCING
 @import clay.chunk.instancing_matrix
 P = instanceMat * P;
#endif
 v_ViewPosition = worldViewProjection * P;
 gl_Position = v_ViewPosition;
 v_Texcoord = texcoord * uvRepeat + uvOffset;
}
@end
@export clay.sm.depth.fragment
varying vec4 v_ViewPosition;
varying vec2 v_Texcoord;
uniform float bias : 0.001;
uniform float slopeScale : 1.0;
uniform sampler2D alphaMap;
uniform float alphaCutoff: 0.0;
@import clay.util.encode_float
void main(){
 float depth = v_ViewPosition.z / v_ViewPosition.w;
 if (alphaCutoff > 0.0) {
 if (texture2D(alphaMap, v_Texcoord).a <= alphaCutoff) {
 discard;
 }
 }
#ifdef USE_VSM
 depth = depth * 0.5 + 0.5;
 float moment1 = depth;
 float moment2 = depth * depth;
 #ifdef SUPPORT_STANDARD_DERIVATIVES
 float dx = dFdx(depth);
 float dy = dFdy(depth);
 moment2 += 0.25*(dx*dx+dy*dy);
 #endif
 gl_FragColor = vec4(moment1, moment2, 0.0, 1.0);
#else
 #ifdef SUPPORT_STANDARD_DERIVATIVES
 float dx = dFdx(depth);
 float dy = dFdy(depth);
 depth += sqrt(dx*dx + dy*dy) * slopeScale + bias;
 #else
 depth += bias;
 #endif
 gl_FragColor = encodeFloat(depth * 0.5 + 0.5);
#endif
}
@end
@export clay.sm.debug_depth
uniform sampler2D depthMap;
varying vec2 v_Texcoord;
@import clay.util.decode_float
void main() {
 vec4 tex = texture2D(depthMap, v_Texcoord);
#ifdef USE_VSM
 gl_FragColor = vec4(tex.rgb, 1.0);
#else
 float depth = decodeFloat(tex);
 gl_FragColor = vec4(depth, depth, depth, 1.0);
#endif
}
@end
@export clay.sm.distance.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform mat4 world : WORLD;
attribute vec3 position : POSITION;
@import clay.chunk.skinning_header
varying vec3 v_WorldPosition;
void main (){
 vec4 P = vec4(position, 1.0);
#ifdef SKINNING
 @import clay.chunk.skin_matrix
 P = skinMatrixWS * P;
#endif
#ifdef INSTANCING
 @import clay.chunk.instancing_matrix
 P = instanceMat * P;
#endif
 gl_Position = worldViewProjection * P;
 v_WorldPosition = (world * P).xyz;
}
@end
@export clay.sm.distance.fragment
uniform vec3 lightPosition;
uniform float range : 100;
varying vec3 v_WorldPosition;
@import clay.util.encode_float
void main(){
 float dist = distance(lightPosition, v_WorldPosition);
#ifdef USE_VSM
 gl_FragColor = vec4(dist, dist * dist, 0.0, 0.0);
#else
 dist = dist / range;
 gl_FragColor = encodeFloat(dist);
#endif
}
@end
@export clay.plugin.shadow_map_common
@import clay.util.decode_float
float tapShadowMap(sampler2D map, vec2 uv, float z){
 vec4 tex = texture2D(map, uv);
 return step(z, decodeFloat(tex) * 2.0 - 1.0);
}
float pcf(sampler2D map, vec2 uv, float z, float textureSize, vec2 scale) {
 float shadowContrib = tapShadowMap(map, uv, z);
 vec2 offset = vec2(1.0 / textureSize) * scale;
#ifdef PCF_KERNEL_SIZE
 for (int _idx_ = 0; _idx_ < PCF_KERNEL_SIZE; _idx_++) {{
 shadowContrib += tapShadowMap(map, uv + offset * pcfKernel[_idx_], z);
 }}
 return shadowContrib / float(PCF_KERNEL_SIZE + 1);
#else
 shadowContrib += tapShadowMap(map, uv+vec2(offset.x, 0.0), z);
 shadowContrib += tapShadowMap(map, uv+vec2(offset.x, offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(0.0, offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, 0.0), z);
 shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, -offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(offset.x, -offset.y), z);
 shadowContrib += tapShadowMap(map, uv+vec2(0.0, -offset.y), z);
 return shadowContrib / 9.0;
#endif
}
float pcf(sampler2D map, vec2 uv, float z, float textureSize) {
 return pcf(map, uv, z, textureSize, vec2(1.0));
}
float chebyshevUpperBound(vec2 moments, float z){
 float p = 0.0;
 z = z * 0.5 + 0.5;
 if (z <= moments.x) {
 p = 1.0;
 }
 float variance = moments.y - moments.x * moments.x;
 variance = max(variance, 0.0000001);
 float mD = moments.x - z;
 float pMax = variance / (variance + mD * mD);
 pMax = clamp((pMax-0.4)/(1.0-0.4), 0.0, 1.0);
 return max(p, pMax);
}
float computeShadowContrib(
 sampler2D map, mat4 lightVPM, vec3 position, float textureSize, vec2 scale, vec2 offset
) {
 vec4 posInLightSpace = lightVPM * vec4(position, 1.0);
 posInLightSpace.xyz /= posInLightSpace.w;
 float z = posInLightSpace.z;
 if(all(greaterThan(posInLightSpace.xyz, vec3(-0.99, -0.99, -1.0))) &&
 all(lessThan(posInLightSpace.xyz, vec3(0.99, 0.99, 1.0)))){
 vec2 uv = (posInLightSpace.xy+1.0) / 2.0;
 #ifdef USE_VSM
 vec2 moments = texture2D(map, uv * scale + offset).xy;
 return chebyshevUpperBound(moments, z);
 #else
 return pcf(map, uv * scale + offset, z, textureSize, scale);
 #endif
 }
 return 1.0;
}
float computeShadowContrib(sampler2D map, mat4 lightVPM, vec3 position, float textureSize) {
 return computeShadowContrib(map, lightVPM, position, textureSize, vec2(1.0), vec2(0.0));
}
float computeShadowContribOmni(samplerCube map, vec3 direction, float range)
{
 float dist = length(direction);
 vec4 shadowTex = textureCube(map, direction);
#ifdef USE_VSM
 vec2 moments = shadowTex.xy;
 float variance = moments.y - moments.x * moments.x;
 float mD = moments.x - dist;
 float p = variance / (variance + mD * mD);
 if(moments.x + 0.001 < dist){
 return clamp(p, 0.0, 1.0);
 }else{
 return 1.0;
 }
#else
 return step(dist, (decodeFloat(shadowTex) + 0.0002) * range);
#endif
}
@end
@export clay.plugin.compute_shadow_map
#if defined(SPOT_LIGHT_SHADOWMAP_COUNT) || defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT) || defined(POINT_LIGHT_SHADOWMAP_COUNT)
#ifdef SPOT_LIGHT_SHADOWMAP_COUNT
uniform sampler2D spotLightShadowMaps[SPOT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform mat4 spotLightMatrices[SPOT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform float spotLightShadowMapSizes[SPOT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
#endif
#ifdef DIRECTIONAL_LIGHT_SHADOWMAP_COUNT
#if defined(SHADOW_CASCADE)
uniform sampler2D directionalLightShadowMaps[1]:unconfigurable;
uniform mat4 directionalLightMatrices[SHADOW_CASCADE]:unconfigurable;
uniform float directionalLightShadowMapSizes[1]:unconfigurable;
uniform float shadowCascadeClipsNear[SHADOW_CASCADE]:unconfigurable;
uniform float shadowCascadeClipsFar[SHADOW_CASCADE]:unconfigurable;
#else
uniform sampler2D directionalLightShadowMaps[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform mat4 directionalLightMatrices[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
uniform float directionalLightShadowMapSizes[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
#endif
#endif
#ifdef POINT_LIGHT_SHADOWMAP_COUNT
uniform samplerCube pointLightShadowMaps[POINT_LIGHT_SHADOWMAP_COUNT]:unconfigurable;
#endif
uniform bool shadowEnabled : true;
#ifdef PCF_KERNEL_SIZE
uniform vec2 pcfKernel[PCF_KERNEL_SIZE];
#endif
@import clay.plugin.shadow_map_common
#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)
void computeShadowOfSpotLights(vec3 position, inout float shadowContribs[SPOT_LIGHT_COUNT] ) {
 float shadowContrib;
 for(int _idx_ = 0; _idx_ < SPOT_LIGHT_SHADOWMAP_COUNT; _idx_++) {{
 shadowContrib = computeShadowContrib(
 spotLightShadowMaps[_idx_], spotLightMatrices[_idx_], position,
 spotLightShadowMapSizes[_idx_]
 );
 shadowContribs[_idx_] = shadowContrib;
 }}
 for(int _idx_ = SPOT_LIGHT_SHADOWMAP_COUNT; _idx_ < SPOT_LIGHT_COUNT; _idx_++){{
 shadowContribs[_idx_] = 1.0;
 }}
}
#endif
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
#ifdef SHADOW_CASCADE
void computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){
 float depth = (2.0 * gl_FragCoord.z - gl_DepthRange.near - gl_DepthRange.far)
 / (gl_DepthRange.far - gl_DepthRange.near);
 float shadowContrib;
 shadowContribs[0] = 1.0;
 for (int _idx_ = 0; _idx_ < SHADOW_CASCADE; _idx_++) {{
 if (
 depth >= shadowCascadeClipsNear[_idx_] &&
 depth <= shadowCascadeClipsFar[_idx_]
 ) {
 shadowContrib = computeShadowContrib(
 directionalLightShadowMaps[0], directionalLightMatrices[_idx_], position,
 directionalLightShadowMapSizes[0],
 vec2(1.0 / float(SHADOW_CASCADE), 1.0),
 vec2(float(_idx_) / float(SHADOW_CASCADE), 0.0)
 );
 shadowContribs[0] = shadowContrib;
 }
 }}
 for(int _idx_ = DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++) {{
 shadowContribs[_idx_] = 1.0;
 }}
}
#else
void computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){
 float shadowContrib;
 for(int _idx_ = 0; _idx_ < DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_++) {{
 shadowContrib = computeShadowContrib(
 directionalLightShadowMaps[_idx_], directionalLightMatrices[_idx_], position,
 directionalLightShadowMapSizes[_idx_]
 );
 shadowContribs[_idx_] = shadowContrib;
 }}
 for(int _idx_ = DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++) {{
 shadowContribs[_idx_] = 1.0;
 }}
}
#endif
#endif
#if defined(POINT_LIGHT_SHADOWMAP_COUNT)
void computeShadowOfPointLights(vec3 position, inout float shadowContribs[POINT_LIGHT_COUNT] ){
 vec3 lightPosition;
 vec3 direction;
 for(int _idx_ = 0; _idx_ < POINT_LIGHT_SHADOWMAP_COUNT; _idx_++) {{
 lightPosition = pointLightPosition[_idx_];
 direction = position - lightPosition;
 shadowContribs[_idx_] = computeShadowContribOmni(pointLightShadowMaps[_idx_], direction, pointLightRange[_idx_]);
 }}
 for(int _idx_ = POINT_LIGHT_SHADOWMAP_COUNT; _idx_ < POINT_LIGHT_COUNT; _idx_++) {{
 shadowContribs[_idx_] = 1.0;
 }}
}
#endif
#endif
@end`;var Kr=["px","nx","py","ny","pz","nz"];G.import(op);function Wo(e,t,r){if(r==="alphaMap")return e.material.get("diffuseMap");if(r==="alphaCutoff"){if(e.material.isDefined("fragment","ALPHA_TEST")&&e.material.get("diffuseMap")){var i=e.material.get("alphaCutoff");return i||0}return 0}else return r==="uvRepeat"?e.material.get("uvRepeat"):r==="uvOffset"?e.material.get("uvOffset"):t.get(r)}function ih(e,t){var r=e.material,i=t.material;return r.get("diffuseMap")!==i.get("diffuseMap")||(r.get("alphaCutoff")||0)!==(i.get("alphaCutoff")||0)}var vr=Bt.extend(function(){return{softShadow:vr.PCF,shadowBlur:1,lightFrustumBias:"auto",kernelPCF:new Float32Array([1,0,1,1,-1,1,0,1,-1,0,-1,-1,1,-1,0,-1]),precision:"highp",_lastRenderNotCastShadow:!1,_frameBuffer:new At,_textures:{},_shadowMapNumber:{POINT_LIGHT:0,DIRECTIONAL_LIGHT:0,SPOT_LIGHT:0},_depthMaterials:{},_distanceMaterials:{},_receivers:[],_lightsCastShadow:[],_lightCameras:{},_lightMaterials:{},_texturePool:new Cu}},function(){this._gaussianPassH=new ct({fragment:G.source("clay.compositor.gaussian_blur")}),this._gaussianPassV=new ct({fragment:G.source("clay.compositor.gaussian_blur")}),this._gaussianPassH.setUniform("blurSize",this.shadowBlur),this._gaussianPassH.setUniform("blurDir",0),this._gaussianPassV.setUniform("blurSize",this.shadowBlur),this._gaussianPassV.setUniform("blurDir",1),this._outputDepthPass=new ct({fragment:G.source("clay.sm.debug_depth")})},{render:function(e,t,r,i){r||(r=t.getMainCamera()),this.trigger("beforerender",this,e,t,r),this._renderShadowPass(e,t,r,i),this.trigger("afterrender",this,e,t,r)},renderDebug:function(e,t){e.saveClear();var r=e.viewport,i=0,n=0,a=t||r.width/4,o=a;this.softShadow===vr.VSM?this._outputDepthPass.material.define("fragment","USE_VSM"):this._outputDepthPass.material.undefine("fragment","USE_VSM");for(var s in this._textures){var l=this._textures[s];e.setViewport(i,n,a*l.width/l.height,o),this._outputDepthPass.setUniform("depthMap",l),this._outputDepthPass.render(e),i+=a*l.width/l.height}e.setViewport(r),e.restoreClear()},_updateReceivers:function(e,t){if(t.receiveShadow?(this._receivers.push(t),t.material.set("shadowEnabled",1),t.material.set("pcfKernel",this.kernelPCF)):t.material.set("shadowEnabled",0),this.softShadow===vr.VSM)t.material.define("fragment","USE_VSM"),t.material.undefine("fragment","PCF_KERNEL_SIZE");else{t.material.undefine("fragment","USE_VSM");var r=this.kernelPCF;r&&r.length?t.material.define("fragment","PCF_KERNEL_SIZE",r.length/2):t.material.undefine("fragment","PCF_KERNEL_SIZE")}},_update:function(e,t){var r=this;t.traverse(function(a){a.isRenderable()&&r._updateReceivers(e,a)});for(var i=0;i<t.lights.length;i++){var n=t.lights[i];n.castShadow&&!n.invisible&&this._lightsCastShadow.push(n)}},_renderShadowPass:function(e,t,r,i){for(var n in this._shadowMapNumber)this._shadowMapNumber[n]=0;this._lightsCastShadow.length=0,this._receivers.length=0;var a=e.gl;if(i||t.update(),r&&r.update(),t.updateLights(),this._update(e,t),!this._lightsCastShadow.length&&this._lastRenderNotCastShadow)return;this._lastRenderNotCastShadow=this._lightsCastShadow===0,a.enable(a.DEPTH_TEST),a.depthMask(!0),a.disable(a.BLEND),a.clearColor(1,1,1,1);for(var o=[],s=[],l=[],h=[],u=[],f=[],d,c=0;c<this._lightsCastShadow.length;c++){var v=this._lightsCastShadow[c];if(v.type==="DIRECTIONAL_LIGHT"){if(d){console.warn("Only one direectional light supported with shadow cascade");continue}if(v.shadowCascade>4){console.warn("Support at most 4 cascade");continue}v.shadowCascade>1&&(d=v),this.renderDirectionalLightShadow(e,t,r,v,u,h,l)}else v.type==="SPOT_LIGHT"?this.renderSpotLightShadow(e,t,v,s,o):v.type==="POINT_LIGHT"&&this.renderPointLightShadow(e,t,v,f);this._shadowMapNumber[v.type]++}for(var p in this._shadowMapNumber)for(var g=this._shadowMapNumber[p],m=p+"_SHADOWMAP_COUNT",c=0;c<this._receivers.length;c++){var _=this._receivers[c],x=_.material;x.fragmentDefines[m]!==g&&(g>0?x.define("fragment",m,g):x.isDefined("fragment",m)&&x.undefine("fragment",m))}for(var c=0;c<this._receivers.length;c++){var _=this._receivers[c],x=_.material;d?x.define("fragment","SHADOW_CASCADE",d.shadowCascade):x.undefine("fragment","SHADOW_CASCADE")}var y=t.shadowUniforms;function T(M){return M.height}if(l.length>0){var w=l.map(T);if(y.directionalLightShadowMaps={value:l,type:"tv"},y.directionalLightMatrices={value:h,type:"m4v"},y.directionalLightShadowMapSizes={value:w,type:"1fv"},d){var E=u.slice(),S=u.slice();E.pop(),S.shift(),E.reverse(),S.reverse(),h.reverse(),y.shadowCascadeClipsNear={value:E,type:"1fv"},y.shadowCascadeClipsFar={value:S,type:"1fv"}}}if(o.length>0){var D=o.map(T),y=t.shadowUniforms;y.spotLightShadowMaps={value:o,type:"tv"},y.spotLightMatrices={value:s,type:"m4v"},y.spotLightShadowMapSizes={value:D,type:"1fv"}}f.length>0&&(y.pointLightShadowMaps={value:f,type:"tv"})},renderDirectionalLightShadow:function(){var e=new Cs,t=new re,r=new Nt,i=new re,n=new re,a=new re,o=new re;return function(s,l,h,u,f,d,c){var v=this._getDepthMaterial(u),p={getMaterial:function(oe){return oe.shadowDepthMaterial||v},isMaterialChanged:ih,getUniform:Wo,ifRender:function(oe){return oe.castShadow},sortCompare:In.opaqueSortCompare};if(!l.viewBoundingBoxLastFrame.isFinite()){var g=l.getBoundingBox();l.viewBoundingBoxLastFrame.copy(g).applyTransform(h.viewMatrix)}var m=Math.min(-l.viewBoundingBoxLastFrame.min.z,h.far),_=Math.max(-l.viewBoundingBoxLastFrame.max.z,h.near),x=this._getDirectionalLightCamera(u,l,h),y=a.array;o.copy(x.projectionMatrix),W.invert(n.array,x.worldTransform.array),W.multiply(n.array,n.array,h.worldTransform.array),W.multiply(y,o.array,n.array);for(var T=[],w=h instanceof xt,E=(h.near+h.far)/(h.near-h.far),S=2*h.near*h.far/(h.near-h.far),D=0;D<=u.shadowCascade;D++){var M=_*Math.pow(m/_,D/u.shadowCascade),C=_+(m-_)*D/u.shadowCascade,N=M*u.cascadeSplitLogFactor+C*(1-u.cascadeSplitLogFactor);T.push(N),f.push(-(-N*E+S)/-N)}var O=this._getTexture(u,u.shadowCascade);c.push(O);var P=s.viewport,F=s.gl;this._frameBuffer.attach(O),this._frameBuffer.bind(s),F.clear(F.COLOR_BUFFER_BIT|F.DEPTH_BUFFER_BIT);for(var D=0;D<u.shadowCascade;D++){var H=T[D],Y=T[D+1];w?W.perspective(t.array,h.fov/180*Math.PI,h.aspect,H,Y):W.ortho(t.array,h.left,h.right,h.bottom,h.top,H,Y),e.setFromProjection(t),e.getTransformedBoundingBox(r,n),r.applyProjection(o);var z=r.min.array,Te=r.max.array;z[0]=Math.max(z[0],-1),z[1]=Math.max(z[1],-1),Te[0]=Math.min(Te[0],1),Te[1]=Math.min(Te[1],1),i.ortho(z[0],Te[0],z[1],Te[1],1,-1),x.projectionMatrix.multiplyLeft(i);var q=u.shadowResolution||512;s.setViewport((u.shadowCascade-D-1)*q,0,q,q,1);var De=l.updateRenderList(x);s.renderPass(De.opaque,x,p),this.softShadow===vr.VSM&&this._gaussianFilter(s,O,O.width);var ve=new re;ve.copy(x.viewMatrix).multiplyLeft(x.projectionMatrix),d.push(ve.array),x.projectionMatrix.copy(o)}this._frameBuffer.unbind(s),s.setViewport(P)}}(),renderSpotLightShadow:function(e,t,r,i,n){var a=this._getTexture(r),o=this._getSpotLightCamera(r),s=e.gl;this._frameBuffer.attach(a),this._frameBuffer.bind(e),s.clear(s.COLOR_BUFFER_BIT|s.DEPTH_BUFFER_BIT);var l=this._getDepthMaterial(r),h={getMaterial:function(d){return d.shadowDepthMaterial||l},isMaterialChanged:ih,getUniform:Wo,ifRender:function(d){return d.castShadow},sortCompare:In.opaqueSortCompare},u=t.updateRenderList(o);e.renderPass(u.opaque,o,h),this._frameBuffer.unbind(e),this.softShadow===vr.VSM&&this._gaussianFilter(e,a,a.width);var f=new re;f.copy(o.worldTransform).invert().multiplyLeft(o.projectionMatrix),n.push(a),i.push(f.array)},renderPointLightShadow:function(e,t,r,i){var n=this._getTexture(r),a=e.gl;i.push(n);var o=this._getDepthMaterial(r),s={getMaterial:function(_){return _.shadowDepthMaterial||o},getUniform:Wo,sortCompare:In.opaqueSortCompare},l={px:[],py:[],pz:[],nx:[],ny:[],nz:[]},h=new Nt,u=r.getWorldPosition().array,f=new Nt,d=r.range;f.min.setArray(u),f.max.setArray(u);var c=new Z(d,d,d);f.max.add(c),f.min.sub(c);var v={px:!1,py:!1,pz:!1,nx:!1,ny:!1,nz:!1};t.traverse(function(_){if(_.isRenderable()&&_.castShadow){var x=_.geometry;if(!x.boundingBox){for(var y=0;y<Kr.length;y++)l[Kr[y]].push(_);return}if(h.transformFrom(x.boundingBox,_.worldTransform),!h.intersectBoundingBox(f))return;h.updateVertices();for(var y=0;y<Kr.length;y++)v[Kr[y]]=!1;for(var y=0;y<8;y++){var T=h.vertices[y],w=T[0]-u[0],E=T[1]-u[1],S=T[2]-u[2],D=Math.abs(w),M=Math.abs(E),C=Math.abs(S);D>M?D>C?v[w>0?"px":"nx"]=!0:v[S>0?"pz":"nz"]=!0:M>C?v[E>0?"py":"ny"]=!0:v[S>0?"pz":"nz"]=!0}for(var y=0;y<Kr.length;y++)v[Kr[y]]&&l[Kr[y]].push(_)}});for(var p=0;p<6;p++){var g=Kr[p],m=this._getPointLightCamera(r,g);this._frameBuffer.attach(n,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+p),this._frameBuffer.bind(e),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),e.renderPass(l[g],m,s)}this._frameBuffer.unbind(e)},_getDepthMaterial:function(e){var t=this._lightMaterials[e.__uid__],r=e.type==="POINT_LIGHT";if(!t){var i=r?"clay.sm.distance.":"clay.sm.depth.";t=new tr({precision:this.precision,shader:new G(G.source(i+"vertex"),G.source(i+"fragment"))}),this._lightMaterials[e.__uid__]=t}return e.shadowSlopeScale!=null&&t.setUniform("slopeScale",e.shadowSlopeScale),e.shadowBias!=null&&t.setUniform("bias",e.shadowBias),this.softShadow===vr.VSM?t.define("fragment","USE_VSM"):t.undefine("fragment","USE_VSM"),r&&(t.set("lightPosition",e.getWorldPosition().array),t.set("range",e.range)),t},_gaussianFilter:function(e,t,r){var i={width:r,height:r,type:ne.FLOAT},n=this._texturePool.get(i);this._frameBuffer.attach(n),this._frameBuffer.bind(e),this._gaussianPassH.setUniform("texture",t),this._gaussianPassH.setUniform("textureWidth",r),this._gaussianPassH.render(e),this._frameBuffer.attach(t),this._gaussianPassV.setUniform("texture",n),this._gaussianPassV.setUniform("textureHeight",r),this._gaussianPassV.render(e),this._frameBuffer.unbind(e),this._texturePool.put(n)},_getTexture:function(e,t){var r=e.__uid__,i=this._textures[r],n=e.shadowResolution||512;return t=t||1,i||(e.type==="POINT_LIGHT"?i=new zn:i=new ge,i.width=n*t,i.height=n,this.softShadow===vr.VSM?(i.type=ne.FLOAT,i.anisotropic=4):(i.minFilter=I.NEAREST,i.magFilter=I.NEAREST,i.useMipmap=!1),this._textures[r]=i),i},_getPointLightCamera:function(e,t){this._lightCameras.point||(this._lightCameras.point={px:new xt,nx:new xt,py:new xt,ny:new xt,pz:new xt,nz:new xt});var r=this._lightCameras.point[t];switch(r.far=e.range,r.fov=90,r.position.set(0,0,0),t){case"px":r.lookAt(Z.POSITIVE_X,Z.NEGATIVE_Y);break;case"nx":r.lookAt(Z.NEGATIVE_X,Z.NEGATIVE_Y);break;case"py":r.lookAt(Z.POSITIVE_Y,Z.POSITIVE_Z);break;case"ny":r.lookAt(Z.NEGATIVE_Y,Z.NEGATIVE_Z);break;case"pz":r.lookAt(Z.POSITIVE_Z,Z.NEGATIVE_Y);break;case"nz":r.lookAt(Z.NEGATIVE_Z,Z.NEGATIVE_Y);break}return e.getWorldPosition(r.position),r.update(),r},_getDirectionalLightCamera:function(){var e=new re,t=new Nt,r=new Nt;return function(i,n,a){this._lightCameras.directional||(this._lightCameras.directional=new rn);var o=this._lightCameras.directional;t.copy(n.viewBoundingBoxLastFrame),t.intersection(a.frustum.boundingBox),o.position.copy(t.min).add(t.max).scale(.5).transformMat4(a.worldTransform),o.rotation.copy(i.rotation),o.scale.copy(i.scale),o.updateWorldTransform(),re.invert(e,o.worldTransform),re.multiply(e,e,a.worldTransform),r.copy(t).applyTransform(e);var s=r.min.array,l=r.max.array;return o.position.set((s[0]+l[0])/2,(s[1]+l[1])/2,l[2]).transformMat4(o.worldTransform),o.near=0,o.far=-s[2]+l[2],isNaN(this.lightFrustumBias)?o.far*=4:o.far+=this.lightFrustumBias,o.left=s[0],o.right=l[0],o.top=l[1],o.bottom=s[1],o.update(!0),o}}(),_getSpotLightCamera:function(e){this._lightCameras.spot||(this._lightCameras.spot=new xt);var t=this._lightCameras.spot;return t.fov=e.penumbraAngle*2,t.far=e.range,t.worldTransform.copy(e.worldTransform),t.updateProjectionMatrix(),W.invert(t.viewMatrix.array,t.worldTransform.array),t},dispose:function(e){var t=e.gl||e;this._frameBuffer&&this._frameBuffer.dispose(t);for(var r in this._textures)this._textures[r].dispose(t);this._texturePool.clear(e.gl),this._depthMaterials={},this._distanceMaterials={},this._textures={},this._lightCameras={},this._shadowMapNumber={POINT_LIGHT:0,DIRECTIONAL_LIGHT:0,SPOT_LIGHT:0},this._meshMaterials={};for(var i=0;i<this._receivers.length;i++){var n=this._receivers[i];if(n.material){var a=n.material;a.undefine("fragment","POINT_LIGHT_SHADOW_COUNT"),a.undefine("fragment","DIRECTIONAL_LIGHT_SHADOW_COUNT"),a.undefine("fragment","AMBIENT_LIGHT_SHADOW_COUNT"),a.set("shadowEnabled",0)}}this._receivers=[],this._lightsCastShadow=[]}});vr.VSM=1;vr.PCF=2;const sp=vr;var lp=Bt.extend(function(){return{name:"",inputLinks:{},outputLinks:{},_prevOutputTextures:{},_outputTextures:{},_outputReferences:{},_rendering:!1,_rendered:!1,_compositor:null}},{updateParameter:function(e,t){var r=this.outputs[e],i=r.parameters,n=r._parametersCopy;if(n||(n=r._parametersCopy={}),i)for(var a in i)a!=="width"&&a!=="height"&&(n[a]=i[a]);var o,s;return i.width instanceof Function?o=i.width.call(this,t):o=i.width,i.height instanceof Function?s=i.height.call(this,t):s=i.height,(n.width!==o||n.height!==s)&&this._outputTextures[e]&&this._outputTextures[e].dispose(t.gl),n.width=o,n.height=s,n},setParameter:function(e,t){},getParameter:function(e){},setParameters:function(e){for(var t in e)this.setParameter(t,e[t])},render:function(){},getOutput:function(e,t){if(t==null)return t=e,this._outputTextures[t];var r=this.outputs[t];if(r)return this._rendered?r.outputLastFrame?this._prevOutputTextures[t]:this._outputTextures[t]:this._rendering?(this._prevOutputTextures[t]||(this._prevOutputTextures[t]=this._compositor.allocateTexture(r.parameters||{})),this._prevOutputTextures[t]):(this.render(e),this._outputTextures[t])},removeReference:function(e){if(this._outputReferences[e]--,this._outputReferences[e]===0){var t=this.outputs[e];t.keepLastFrame?(this._prevOutputTextures[e]&&this._compositor.releaseTexture(this._prevOutputTextures[e]),this._prevOutputTextures[e]=this._outputTextures[e]):this._compositor.releaseTexture(this._outputTextures[e])}},link:function(e,t,r){this.inputLinks[e]={node:t,pin:r},t.outputLinks[r]||(t.outputLinks[r]=[]),t.outputLinks[r].push({node:this,pin:e}),this.pass.material.enableTexture(e)},clear:function(){this.inputLinks={},this.outputLinks={}},updateReference:function(e){if(!this._rendering){this._rendering=!0;for(var t in this.inputLinks){var r=this.inputLinks[t];r.node.updateReference(r.pin)}this._rendering=!1}e&&this._outputReferences[e]++},beforeFrame:function(){this._rendered=!1;for(var e in this.outputLinks)this._outputReferences[e]=0},afterFrame:function(){for(var e in this.outputLinks)if(this._outputReferences[e]>0){var t=this.outputs[e];t.keepLastFrame?(this._prevOutputTextures[e]&&this._compositor.releaseTexture(this._prevOutputTextures[e]),this._prevOutputTextures[e]=this._outputTextures[e]):this._compositor.releaseTexture(this._outputTextures[e])}}});const Hn=lp;var hp=Bt.extend(function(){return{nodes:[]}},{dirty:function(){this._dirty=!0},addNode:function(e){this.nodes.indexOf(e)>=0||(this.nodes.push(e),this._dirty=!0)},removeNode:function(e){typeof e=="string"&&(e=this.getNodeByName(e));var t=this.nodes.indexOf(e);t>=0&&(this.nodes.splice(t,1),this._dirty=!0)},getNodeByName:function(e){for(var t=0;t<this.nodes.length;t++)if(this.nodes[t].name===e)return this.nodes[t]},update:function(){for(var e=0;e<this.nodes.length;e++)this.nodes[e].clear();for(var e=0;e<this.nodes.length;e++){var t=this.nodes[e];if(t.inputs){for(var r in t.inputs)if(t.inputs[r]){if(t.pass&&!t.pass.material.isUniformEnabled(r)){console.warn("Pin "+t.name+"."+r+" not used.");continue}var i=t.inputs[r],n=this.findPin(i);n?t.link(r,n.node,n.pin):console.warn(typeof i=="string"?"Node "+i+" not exist":"Pin of "+i.node+"."+i.pin+" not exist")}}}},findPin:function(e){var t;if((typeof e=="string"||e instanceof Hn)&&(e={node:e}),typeof e.node=="string")for(var r=0;r<this.nodes.length;r++){var i=this.nodes[r];i.name===e.node&&(t=i)}else t=e.node;if(t){var n=e.pin;if(n||t.outputs&&(n=Object.keys(t.outputs)[0]),t.outputs[n])return{node:t,pin:n}}}});const nh=hp;var up=nh.extend(function(){return{_outputs:[],_texturePool:new Cu,_frameBuffer:new At({depthBuffer:!1})}},{addNode:function(e){nh.prototype.addNode.call(this,e),e._compositor=this},render:function(e,t){if(this._dirty){this.update(),this._dirty=!1,this._outputs.length=0;for(var r=0;r<this.nodes.length;r++)this.nodes[r].outputs||this._outputs.push(this.nodes[r])}for(var r=0;r<this.nodes.length;r++)this.nodes[r].beforeFrame();for(var r=0;r<this._outputs.length;r++)this._outputs[r].updateReference();for(var r=0;r<this._outputs.length;r++)this._outputs[r].render(e,t);for(var r=0;r<this.nodes.length;r++)this.nodes[r].afterFrame()},allocateTexture:function(e){return this._texturePool.get(e)},releaseTexture:function(e){this._texturePool.put(e)},getFrameBuffer:function(){return this._frameBuffer},dispose:function(e){this._texturePool.clear(e)}});const fp=up;var cp=Hn.extend({name:"scene",scene:null,camera:null,autoUpdateScene:!0,preZ:!1},function(){this.frameBuffer=new At},{render:function(e){this._rendering=!0;var t=e.gl;this.trigger("beforerender");var r;if(!this.outputs)r=e.render(this.scene,this.camera,!this.autoUpdateScene,this.preZ);else{var i=this.frameBuffer;for(var n in this.outputs){var a=this.updateParameter(n,e),o=this.outputs[n],s=this._compositor.allocateTexture(a);this._outputTextures[n]=s;var l=o.attachment||t.COLOR_ATTACHMENT0;typeof l=="string"&&(l=t[l]),i.attach(s,l)}i.bind(e);var h=e.getGLExtension("EXT_draw_buffers");if(h){var u=[];for(var l in this.outputs)l=parseInt(l),l>=t.COLOR_ATTACHMENT0&&l<=t.COLOR_ATTACHMENT0+8&&u.push(l);h.drawBuffersEXT(u)}e.saveClear(),e.clearBit=I.DEPTH_BUFFER_BIT|I.COLOR_BUFFER_BIT,r=e.render(this.scene,this.camera,!this.autoUpdateScene,this.preZ),e.restoreClear(),i.unbind(e)}this.trigger("afterrender",r),this._rendering=!1,this._rendered=!0}});const dp=cp;var vp=Hn.extend(function(){return{texture:null,outputs:{color:{}}}},function(){},{getOutput:function(e,t){return this.texture},beforeFrame:function(){},afterFrame:function(){}});const pp=vp;var mp=Hn.extend(function(){return{name:"",inputs:{},outputs:null,shader:"",inputLinks:{},outputLinks:{},pass:null,_prevOutputTextures:{},_outputTextures:{},_outputReferences:{},_rendering:!1,_rendered:!1,_compositor:null}},function(){var e=new ct({fragment:this.shader});this.pass=e},{render:function(e,t){this.trigger("beforerender",e),this._rendering=!0;var r=e.gl;for(var i in this.inputLinks){var n=this.inputLinks[i],a=n.node.getOutput(e,n.pin);this.pass.setUniform(i,a)}if(!this.outputs)this.pass.outputs=null,this._compositor.getFrameBuffer().unbind(e),this.pass.render(e,t);else{this.pass.outputs={};var o={};for(var s in this.outputs){var l=this.updateParameter(s,e);isNaN(l.width)&&this.updateParameter(s,e);var h=this.outputs[s],u=this._compositor.allocateTexture(l);this._outputTextures[s]=u;var f=h.attachment||r.COLOR_ATTACHMENT0;typeof f=="string"&&(f=r[f]),o[f]=u}this._compositor.getFrameBuffer().bind(e);for(var f in o)this._compositor.getFrameBuffer().attach(o[f],f);this.pass.render(e),this._compositor.getFrameBuffer().updateMipmap(e)}for(var i in this.inputLinks){var n=this.inputLinks[i];n.node.removeReference(n.pin)}this._rendering=!1,this._rendered=!0,this.trigger("afterrender",e)},updateParameter:function(e,t){var r=this.outputs[e],i=r.parameters,n=r._parametersCopy;if(n||(n=r._parametersCopy={}),i)for(var a in i)a!=="width"&&a!=="height"&&(n[a]=i[a]);var o,s;return typeof i.width=="function"?o=i.width.call(this,t):o=i.width,typeof i.height=="function"?s=i.height.call(this,t):s=i.height,o=Math.ceil(o),s=Math.ceil(s),(n.width!==o||n.height!==s)&&this._outputTextures[e]&&this._outputTextures[e].dispose(t),n.width=o,n.height=s,n},setParameter:function(e,t){this.pass.setUniform(e,t)},getParameter:function(e){return this.pass.getUniform(e)},setParameters:function(e){for(var t in e)this.setParameter(t,e[t])},define:function(e,t){this.pass.material.define("fragment",e,t)},undefine:function(e){this.pass.material.undefine("fragment",e)},removeReference:function(e){if(this._outputReferences[e]--,this._outputReferences[e]===0){var t=this.outputs[e];t.keepLastFrame?(this._prevOutputTextures[e]&&this._compositor.releaseTexture(this._prevOutputTextures[e]),this._prevOutputTextures[e]=this._outputTextures[e]):this._compositor.releaseTexture(this._outputTextures[e])}},clear:function(){Hn.prototype.clear.call(this),this.pass.material.disableTexturesAll()}});const gp=mp,_p=`@export clay.compositor.coloradjust
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float brightness : 0.0;
uniform float contrast : 1.0;
uniform float exposure : 0.0;
uniform float gamma : 1.0;
uniform float saturation : 1.0;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord);
 vec3 color = clamp(tex.rgb + vec3(brightness), 0.0, 1.0);
 color = clamp( (color-vec3(0.5))*contrast+vec3(0.5), 0.0, 1.0);
 color = clamp( color * pow(2.0, exposure), 0.0, 1.0);
 color = clamp( pow(color, vec3(gamma)), 0.0, 1.0);
 float luminance = dot( color, w );
 color = mix(vec3(luminance), color, saturation);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.brightness
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float brightness : 0.0;
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord);
 vec3 color = tex.rgb + vec3(brightness);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.contrast
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float contrast : 1.0;
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord);
 vec3 color = (tex.rgb-vec3(0.5))*contrast+vec3(0.5);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.exposure
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float exposure : 0.0;
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 vec3 color = tex.rgb * pow(2.0, exposure);
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.gamma
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float gamma : 1.0;
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 vec3 color = pow(tex.rgb, vec3(gamma));
 gl_FragColor = vec4(color, tex.a);
}
@end
@export clay.compositor.saturation
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float saturation : 1.0;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 vec3 color = tex.rgb;
 float luminance = dot(color, w);
 color = mix(vec3(luminance), color, saturation);
 gl_FragColor = vec4(color, tex.a);
}
@end`,Lu=`@export clay.compositor.kernel.gaussian_9
float gaussianKernel[9];
gaussianKernel[0] = 0.07;
gaussianKernel[1] = 0.09;
gaussianKernel[2] = 0.12;
gaussianKernel[3] = 0.14;
gaussianKernel[4] = 0.16;
gaussianKernel[5] = 0.14;
gaussianKernel[6] = 0.12;
gaussianKernel[7] = 0.09;
gaussianKernel[8] = 0.07;
@end
@export clay.compositor.kernel.gaussian_13
float gaussianKernel[13];
gaussianKernel[0] = 0.02;
gaussianKernel[1] = 0.03;
gaussianKernel[2] = 0.06;
gaussianKernel[3] = 0.08;
gaussianKernel[4] = 0.11;
gaussianKernel[5] = 0.13;
gaussianKernel[6] = 0.14;
gaussianKernel[7] = 0.13;
gaussianKernel[8] = 0.11;
gaussianKernel[9] = 0.08;
gaussianKernel[10] = 0.06;
gaussianKernel[11] = 0.03;
gaussianKernel[12] = 0.02;
@end
@export clay.compositor.gaussian_blur
#define SHADER_NAME gaussian_blur
uniform sampler2D texture;varying vec2 v_Texcoord;
uniform float blurSize : 2.0;
uniform vec2 textureSize : [512.0, 512.0];
uniform float blurDir : 0.0;
@import clay.util.rgbm
@import clay.util.clamp_sample
void main (void)
{
 @import clay.compositor.kernel.gaussian_9
 vec2 off = blurSize / textureSize;
 off *= vec2(1.0 - blurDir, blurDir);
 vec4 sum = vec4(0.0);
 float weightAll = 0.0;
 for (int i = 0; i < 9; i++) {
 float w = gaussianKernel[i];
 vec4 texel = decodeHDR(clampSample(texture, v_Texcoord + float(i - 4) * off));
 sum += texel * w;
 weightAll += w;
 }
 gl_FragColor = encodeHDR(sum / max(weightAll, 0.01));
}
@end
`,yp=`@export clay.compositor.hdr.log_lum
varying vec2 v_Texcoord;
uniform sampler2D texture;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
@import clay.util.rgbm
void main()
{
 vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));
 float luminance = dot(tex.rgb, w);
 luminance = log(luminance + 0.001);
 gl_FragColor = encodeHDR(vec4(vec3(luminance), 1.0));
}
@end
@export clay.compositor.hdr.lum_adaption
varying vec2 v_Texcoord;
uniform sampler2D adaptedLum;
uniform sampler2D currentLum;
uniform float frameTime : 0.02;
@import clay.util.rgbm
void main()
{
 float fAdaptedLum = decodeHDR(texture2D(adaptedLum, vec2(0.5, 0.5))).r;
 float fCurrentLum = exp(encodeHDR(texture2D(currentLum, vec2(0.5, 0.5))).r);
 fAdaptedLum += (fCurrentLum - fAdaptedLum) * (1.0 - pow(0.98, 30.0 * frameTime));
 gl_FragColor = encodeHDR(vec4(vec3(fAdaptedLum), 1.0));
}
@end
@export clay.compositor.lum
varying vec2 v_Texcoord;
uniform sampler2D texture;
const vec3 w = vec3(0.2125, 0.7154, 0.0721);
void main()
{
 vec4 tex = texture2D( texture, v_Texcoord );
 float luminance = dot(tex.rgb, w);
 gl_FragColor = vec4(vec3(luminance), 1.0);
}
@end`,Mu=`
@export clay.compositor.lut
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform sampler2D lookup;
void main()
{
 vec4 tex = texture2D(texture, v_Texcoord);
 float blueColor = tex.b * 63.0;
 vec2 quad1;
 quad1.y = floor(floor(blueColor) / 8.0);
 quad1.x = floor(blueColor) - (quad1.y * 8.0);
 vec2 quad2;
 quad2.y = floor(ceil(blueColor) / 8.0);
 quad2.x = ceil(blueColor) - (quad2.y * 8.0);
 vec2 texPos1;
 texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.r);
 texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.g);
 vec2 texPos2;
 texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.r);
 texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.g);
 vec4 newColor1 = texture2D(lookup, texPos1);
 vec4 newColor2 = texture2D(lookup, texPos2);
 vec4 newColor = mix(newColor1, newColor2, fract(blueColor));
 gl_FragColor = vec4(newColor.rgb, tex.w);
}
@end`,xp=`@export clay.compositor.vignette
#define OUTPUT_ALPHA
varying vec2 v_Texcoord;
uniform sampler2D texture;
uniform float darkness: 1;
uniform float offset: 1;
@import clay.util.rgbm
void main()
{
 vec4 texel = decodeHDR(texture2D(texture, v_Texcoord));
 gl_FragColor.rgb = texel.rgb;
 vec2 uv = (v_Texcoord - vec2(0.5)) * vec2(offset);
 gl_FragColor = encodeHDR(vec4(mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv)), texel.a));
}
@end`,Du=`@export clay.compositor.output
#define OUTPUT_ALPHA
varying vec2 v_Texcoord;
uniform sampler2D texture;
@import clay.util.rgbm
void main()
{
 vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));
 gl_FragColor.rgb = tex.rgb;
#ifdef OUTPUT_ALPHA
 gl_FragColor.a = tex.a;
#else
 gl_FragColor.a = 1.0;
#endif
 gl_FragColor = encodeHDR(gl_FragColor);
#ifdef PREMULTIPLY_ALPHA
 gl_FragColor.rgb *= gl_FragColor.a;
#endif
}
@end`,Pu=`@export clay.compositor.bright
uniform sampler2D texture;
uniform float threshold : 1;
uniform float scale : 1.0;
uniform vec2 textureSize: [512, 512];
varying vec2 v_Texcoord;
const vec3 lumWeight = vec3(0.2125, 0.7154, 0.0721);
@import clay.util.rgbm
vec4 median(vec4 a, vec4 b, vec4 c)
{
 return a + b + c - min(min(a, b), c) - max(max(a, b), c);
}
void main()
{
 vec4 texel = decodeHDR(texture2D(texture, v_Texcoord));
#ifdef ANTI_FLICKER
 vec3 d = 1.0 / textureSize.xyx * vec3(1.0, 1.0, 0.0);
 vec4 s1 = decodeHDR(texture2D(texture, v_Texcoord - d.xz));
 vec4 s2 = decodeHDR(texture2D(texture, v_Texcoord + d.xz));
 vec4 s3 = decodeHDR(texture2D(texture, v_Texcoord - d.zy));
 vec4 s4 = decodeHDR(texture2D(texture, v_Texcoord + d.zy));
 texel = median(median(texel, s1, s2), s3, s4);
#endif
 float lum = dot(texel.rgb , lumWeight);
 vec4 color;
 if (lum > threshold && texel.a > 0.0)
 {
 color = vec4(texel.rgb * scale, texel.a * scale);
 }
 else
 {
 color = vec4(0.0);
 }
 gl_FragColor = encodeHDR(color);
}
@end
`,Ru=`@export clay.compositor.downsample
uniform sampler2D texture;
uniform vec2 textureSize : [512, 512];
varying vec2 v_Texcoord;
@import clay.util.rgbm
float brightness(vec3 c)
{
 return max(max(c.r, c.g), c.b);
}
@import clay.util.clamp_sample
void main()
{
 vec4 d = vec4(-1.0, -1.0, 1.0, 1.0) / textureSize.xyxy;
#ifdef ANTI_FLICKER
 vec3 s1 = decodeHDR(clampSample(texture, v_Texcoord + d.xy)).rgb;
 vec3 s2 = decodeHDR(clampSample(texture, v_Texcoord + d.zy)).rgb;
 vec3 s3 = decodeHDR(clampSample(texture, v_Texcoord + d.xw)).rgb;
 vec3 s4 = decodeHDR(clampSample(texture, v_Texcoord + d.zw)).rgb;
 float s1w = 1.0 / (brightness(s1) + 1.0);
 float s2w = 1.0 / (brightness(s2) + 1.0);
 float s3w = 1.0 / (brightness(s3) + 1.0);
 float s4w = 1.0 / (brightness(s4) + 1.0);
 float oneDivideSum = 1.0 / (s1w + s2w + s3w + s4w);
 vec4 color = vec4(
 (s1 * s1w + s2 * s2w + s3 * s3w + s4 * s4w) * oneDivideSum,
 1.0
 );
#else
 vec4 color = decodeHDR(clampSample(texture, v_Texcoord + d.xy));
 color += decodeHDR(clampSample(texture, v_Texcoord + d.zy));
 color += decodeHDR(clampSample(texture, v_Texcoord + d.xw));
 color += decodeHDR(clampSample(texture, v_Texcoord + d.zw));
 color *= 0.25;
#endif
 gl_FragColor = encodeHDR(color);
}
@end`,Nu=`
@export clay.compositor.upsample
#define HIGH_QUALITY
uniform sampler2D texture;
uniform vec2 textureSize : [512, 512];
uniform float sampleScale: 0.5;
varying vec2 v_Texcoord;
@import clay.util.rgbm
@import clay.util.clamp_sample
void main()
{
#ifdef HIGH_QUALITY
 vec4 d = vec4(1.0, 1.0, -1.0, 0.0) / textureSize.xyxy * sampleScale;
 vec4 s;
 s = decodeHDR(clampSample(texture, v_Texcoord - d.xy));
 s += decodeHDR(clampSample(texture, v_Texcoord - d.wy)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord - d.zy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zw)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord )) * 4.0;
 s += decodeHDR(clampSample(texture, v_Texcoord + d.xw)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.wy)) * 2.0;
 s += decodeHDR(clampSample(texture, v_Texcoord + d.xy));
 gl_FragColor = encodeHDR(s / 16.0);
#else
 vec4 d = vec4(-1.0, -1.0, +1.0, +1.0) / textureSize.xyxy;
 vec4 s;
 s = decodeHDR(clampSample(texture, v_Texcoord + d.xy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zy));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.xw));
 s += decodeHDR(clampSample(texture, v_Texcoord + d.zw));
 gl_FragColor = encodeHDR(s / 4.0);
#endif
}
@end`,Iu=`@export clay.compositor.hdr.composite
#define TONEMAPPING
uniform sampler2D texture;
#ifdef BLOOM_ENABLED
uniform sampler2D bloom;
#endif
#ifdef LENSFLARE_ENABLED
uniform sampler2D lensflare;
uniform sampler2D lensdirt;
#endif
#ifdef LUM_ENABLED
uniform sampler2D lum;
#endif
#ifdef LUT_ENABLED
uniform sampler2D lut;
#endif
#ifdef COLOR_CORRECTION
uniform float brightness : 0.0;
uniform float contrast : 1.0;
uniform float saturation : 1.0;
#endif
#ifdef VIGNETTE
uniform float vignetteDarkness: 1.0;
uniform float vignetteOffset: 1.0;
#endif
uniform float exposure : 1.0;
uniform float bloomIntensity : 0.25;
uniform float lensflareIntensity : 1;
varying vec2 v_Texcoord;
@import clay.util.srgb
vec3 ACESToneMapping(vec3 color)
{
 const float A = 2.51;
 const float B = 0.03;
 const float C = 2.43;
 const float D = 0.59;
 const float E = 0.14;
 return (color * (A * color + B)) / (color * (C * color + D) + E);
}
float eyeAdaption(float fLum)
{
 return mix(0.2, fLum, 0.5);
}
#ifdef LUT_ENABLED
vec3 lutTransform(vec3 color) {
 float blueColor = color.b * 63.0;
 vec2 quad1;
 quad1.y = floor(floor(blueColor) / 8.0);
 quad1.x = floor(blueColor) - (quad1.y * 8.0);
 vec2 quad2;
 quad2.y = floor(ceil(blueColor) / 8.0);
 quad2.x = ceil(blueColor) - (quad2.y * 8.0);
 vec2 texPos1;
 texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);
 texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);
 vec2 texPos2;
 texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);
 texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);
 vec4 newColor1 = texture2D(lut, texPos1);
 vec4 newColor2 = texture2D(lut, texPos2);
 vec4 newColor = mix(newColor1, newColor2, fract(blueColor));
 return newColor.rgb;
}
#endif
@import clay.util.rgbm
void main()
{
 vec4 texel = vec4(0.0);
 vec4 originalTexel = vec4(0.0);
#ifdef TEXTURE_ENABLED
 texel = decodeHDR(texture2D(texture, v_Texcoord));
 originalTexel = texel;
#endif
#ifdef BLOOM_ENABLED
 vec4 bloomTexel = decodeHDR(texture2D(bloom, v_Texcoord));
 texel.rgb += bloomTexel.rgb * bloomIntensity;
 texel.a += bloomTexel.a * bloomIntensity;
#endif
#ifdef LENSFLARE_ENABLED
 texel += decodeHDR(texture2D(lensflare, v_Texcoord)) * texture2D(lensdirt, v_Texcoord) * lensflareIntensity;
#endif
 texel.a = min(texel.a, 1.0);
#ifdef LUM_ENABLED
 float fLum = texture2D(lum, vec2(0.5, 0.5)).r;
 float adaptedLumDest = 3.0 / (max(0.1, 1.0 + 10.0*eyeAdaption(fLum)));
 float exposureBias = adaptedLumDest * exposure;
#else
 float exposureBias = exposure;
#endif
#ifdef TONEMAPPING
 texel.rgb *= exposureBias;
 texel.rgb = ACESToneMapping(texel.rgb);
#endif
 texel = linearTosRGB(texel);
#ifdef LUT_ENABLED
 texel.rgb = lutTransform(clamp(texel.rgb,vec3(0.0),vec3(1.0)));
#endif
#ifdef COLOR_CORRECTION
 texel.rgb = clamp(texel.rgb + vec3(brightness), 0.0, 1.0);
 texel.rgb = clamp((texel.rgb - vec3(0.5))*contrast+vec3(0.5), 0.0, 1.0);
 float lum = dot(texel.rgb, vec3(0.2125, 0.7154, 0.0721));
 texel.rgb = mix(vec3(lum), texel.rgb, saturation);
#endif
#ifdef VIGNETTE
 vec2 uv = (v_Texcoord - vec2(0.5)) * vec2(vignetteOffset);
 texel.rgb = mix(texel.rgb, vec3(1.0 - vignetteDarkness), dot(uv, uv));
#endif
 gl_FragColor = encodeHDR(texel);
#ifdef DEBUG
 #if DEBUG == 1
 gl_FragColor = encodeHDR(decodeHDR(texture2D(texture, v_Texcoord)));
 #elif DEBUG == 2
 gl_FragColor = encodeHDR(decodeHDR(texture2D(bloom, v_Texcoord)) * bloomIntensity);
 #elif DEBUG == 3
 gl_FragColor = encodeHDR(decodeHDR(texture2D(lensflare, v_Texcoord) * lensflareIntensity));
 #endif
#endif
 if (originalTexel.a <= 0.01 && gl_FragColor.a > 1e-5) {
 gl_FragColor.a = dot(gl_FragColor.rgb, vec3(0.2125, 0.7154, 0.0721));
 }
#ifdef PREMULTIPLY_ALPHA
 gl_FragColor.rgb *= gl_FragColor.a;
#endif
}
@end`,Tp=`@export clay.compositor.lensflare
#define SAMPLE_NUMBER 8
uniform sampler2D texture;
uniform sampler2D lenscolor;
uniform vec2 textureSize : [512, 512];
uniform float dispersal : 0.3;
uniform float haloWidth : 0.4;
uniform float distortion : 1.0;
varying vec2 v_Texcoord;
@import clay.util.rgbm
vec4 textureDistorted(
 in vec2 texcoord,
 in vec2 direction,
 in vec3 distortion
) {
 return vec4(
 decodeHDR(texture2D(texture, texcoord + direction * distortion.r)).r,
 decodeHDR(texture2D(texture, texcoord + direction * distortion.g)).g,
 decodeHDR(texture2D(texture, texcoord + direction * distortion.b)).b,
 1.0
 );
}
void main()
{
 vec2 texcoord = -v_Texcoord + vec2(1.0); vec2 textureOffset = 1.0 / textureSize;
 vec2 ghostVec = (vec2(0.5) - texcoord) * dispersal;
 vec2 haloVec = normalize(ghostVec) * haloWidth;
 vec3 distortion = vec3(-textureOffset.x * distortion, 0.0, textureOffset.x * distortion);
 vec4 result = vec4(0.0);
 for (int i = 0; i < SAMPLE_NUMBER; i++)
 {
 vec2 offset = fract(texcoord + ghostVec * float(i));
 float weight = length(vec2(0.5) - offset) / length(vec2(0.5));
 weight = pow(1.0 - weight, 10.0);
 result += textureDistorted(offset, normalize(ghostVec), distortion) * weight;
 }
 result *= texture2D(lenscolor, vec2(length(vec2(0.5) - texcoord)) / length(vec2(0.5)));
 float weight = length(vec2(0.5) - fract(texcoord + haloVec)) / length(vec2(0.5));
 weight = pow(1.0 - weight, 10.0);
 vec2 offset = fract(texcoord + haloVec);
 result += textureDistorted(offset, normalize(ghostVec), distortion) * weight;
 gl_FragColor = result;
}
@end`,Ou=`@export clay.compositor.blend
#define SHADER_NAME blend
#ifdef TEXTURE1_ENABLED
uniform sampler2D texture1;
uniform float weight1 : 1.0;
#endif
#ifdef TEXTURE2_ENABLED
uniform sampler2D texture2;
uniform float weight2 : 1.0;
#endif
#ifdef TEXTURE3_ENABLED
uniform sampler2D texture3;
uniform float weight3 : 1.0;
#endif
#ifdef TEXTURE4_ENABLED
uniform sampler2D texture4;
uniform float weight4 : 1.0;
#endif
#ifdef TEXTURE5_ENABLED
uniform sampler2D texture5;
uniform float weight5 : 1.0;
#endif
#ifdef TEXTURE6_ENABLED
uniform sampler2D texture6;
uniform float weight6 : 1.0;
#endif
varying vec2 v_Texcoord;
@import clay.util.rgbm
void main()
{
 vec4 tex = vec4(0.0);
#ifdef TEXTURE1_ENABLED
 tex += decodeHDR(texture2D(texture1, v_Texcoord)) * weight1;
#endif
#ifdef TEXTURE2_ENABLED
 tex += decodeHDR(texture2D(texture2, v_Texcoord)) * weight2;
#endif
#ifdef TEXTURE3_ENABLED
 tex += decodeHDR(texture2D(texture3, v_Texcoord)) * weight3;
#endif
#ifdef TEXTURE4_ENABLED
 tex += decodeHDR(texture2D(texture4, v_Texcoord)) * weight4;
#endif
#ifdef TEXTURE5_ENABLED
 tex += decodeHDR(texture2D(texture5, v_Texcoord)) * weight5;
#endif
#ifdef TEXTURE6_ENABLED
 tex += decodeHDR(texture2D(texture6, v_Texcoord)) * weight6;
#endif
 gl_FragColor = encodeHDR(tex);
}
@end`,Bu=`@export clay.compositor.fxaa
uniform sampler2D texture;
uniform vec4 viewport : VIEWPORT;
varying vec2 v_Texcoord;
#define FXAA_REDUCE_MIN (1.0/128.0)
#define FXAA_REDUCE_MUL (1.0/8.0)
#define FXAA_SPAN_MAX 8.0
@import clay.util.rgbm
void main()
{
 vec2 resolution = 1.0 / viewport.zw;
 vec3 rgbNW = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ) ).xyz;
 vec3 rgbNE = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ) ).xyz;
 vec3 rgbSW = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ) ).xyz;
 vec3 rgbSE = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ) ).xyz;
 vec4 rgbaM = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution ) );
 vec3 rgbM = rgbaM.xyz;
 float opacity = rgbaM.w;
 vec3 luma = vec3( 0.299, 0.587, 0.114 );
 float lumaNW = dot( rgbNW, luma );
 float lumaNE = dot( rgbNE, luma );
 float lumaSW = dot( rgbSW, luma );
 float lumaSE = dot( rgbSE, luma );
 float lumaM = dot( rgbM, luma );
 float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );
 float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );
 vec2 dir;
 dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
 dir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));
 float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );
 float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );
 dir = min( vec2( FXAA_SPAN_MAX, FXAA_SPAN_MAX),
 max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
 dir * rcpDirMin)) * resolution;
 vec3 rgbA = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * ( 1.0 / 3.0 - 0.5 ) ) ).xyz;
 rgbA += decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * ( 2.0 / 3.0 - 0.5 ) ) ).xyz;
 rgbA *= 0.5;
 vec3 rgbB = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * -0.5 ) ).xyz;
 rgbB += decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * 0.5 ) ).xyz;
 rgbB *= 0.25;
 rgbB += rgbA * 0.5;
 float lumaB = dot( rgbB, luma );
 if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) )
 {
 gl_FragColor = vec4( rgbA, opacity );
 }
 else {
 gl_FragColor = vec4( rgbB, opacity );
 }
}
@end`;function wp(e){e.import(_p),e.import(Lu),e.import(yp),e.import(Mu),e.import(xp),e.import(Du),e.import(Pu),e.import(Ru),e.import(Nu),e.import(Iu),e.import(Tp),e.import(Ou),e.import(Bu)}wp(G);var bp=/^#source\((.*?)\)/;function Sp(e,t){var r=new fp;t=t||{};var i={textures:{},parameters:{}},n=function(s,l){for(var h=0;h<e.nodes.length;h++){var u=e.nodes[h],f=Ep(u,i,t);f&&r.addNode(f)}};for(var a in e.parameters){var o=e.parameters[a];i.parameters[a]=Ns(o)}return Lp(e,i,t,function(s){i.textures=s,n()}),r}function Ep(e,t,r){var i=e.type||"filter",n,a,o;if(i==="filter"){var s=e.shader.trim(),l=bp.exec(s);if(l?n=G.source(l[1].trim()):s.charAt(0)==="#"&&(n=t.shaders[s.substr(1)]),n||(n=s),!n)return}if(e.inputs){a={};for(var h in e.inputs)typeof e.inputs[h]=="string"?a[h]=e.inputs[h]:a[h]={node:e.inputs[h].node,pin:e.inputs[h].pin}}if(e.outputs){o={};for(var h in e.outputs){var u=e.outputs[h];o[h]={},u.attachment!=null&&(o[h].attachment=u.attachment),u.keepLastFrame!=null&&(o[h].keepLastFrame=u.keepLastFrame),u.outputLastFrame!=null&&(o[h].outputLastFrame=u.outputLastFrame),u.parameters&&(o[h].parameters=Ns(u.parameters))}}var f;if(i==="scene"?f=new dp({name:e.name,scene:r.scene,camera:r.camera,outputs:o}):i==="texture"?f=new pp({name:e.name,outputs:o}):f=new gp({name:e.name,shader:n,inputs:a,outputs:o}),f){if(e.parameters)for(var h in e.parameters){var d=e.parameters[h];typeof d=="string"?(d=d.trim(),d.charAt(0)==="#"?d=t.textures[d.substr(1)]:f.on("beforerender",Mp(h,Fu(d)))):typeof d=="function"&&f.on("beforerender",d),f.setParameter(h,d)}if(e.defines&&f.pass)for(var h in e.defines){var d=e.defines[h];f.pass.material.define("fragment",h,d)}}return f}function Ap(e,t){return e}function Cp(e,t){return t}function Ns(e){var t={};if(!e)return t;["type","minFilter","magFilter","wrapS","wrapT","flipY","useMipmap"].forEach(function(i){var n=e[i];n!=null&&(typeof n=="string"&&(n=ne[n]),t[i]=n)});var r=e.scale||1;return["width","height"].forEach(function(i){if(e[i]!=null){var n=e[i];typeof n=="string"?(n=n.trim(),t[i]=Dp(i,Fu(n),r)):t[i]=n}}),t.width||(t.width=Ap),t.height||(t.height=Cp),e.useMipmap!=null&&(t.useMipmap=e.useMipmap),t}function Lp(e,t,r,i){if(!e.textures){i({});return}var n={},a=0,o=!1,s=r.textureRootPath;Et.each(e.textures,function(l,h){var u,f=l.path,d=Ns(l.parameters);if(Array.isArray(f)&&f.length===6)s&&(f=f.map(function(c){return Et.relative2absolute(c,s)})),u=new zn(d);else if(typeof f=="string")s&&(f=Et.relative2absolute(f,s)),u=new ge(d);else return;u.load(f),a++,u.once("success",function(){n[h]=u,a--,a===0&&(i(n),o=!0)})}),a===0&&!o&&i(n)}function Mp(e,t){return function(r){var i=r.getDevicePixelRatio(),n=r.getWidth(),a=r.getHeight(),o=t(n,a,i);this.setParameter(e,o)}}function Dp(e,t,r){return r=r||1,function(i){var n=i.getDevicePixelRatio(),a=i.getWidth()*r,o=i.getHeight()*r;return t(a,o,n)}}function Fu(e){var t=/^expr\((.*)\)$/.exec(e);if(t)try{var r=new Function("width","height","dpr","return "+t[1]);return r(1,1),r}catch{throw new Error("Invalid expression.")}}function nn(e,t){for(var r=0,i=1/t,n=e;n>0;)r=r+i*(n%t),n=Math.floor(n/t),i=i/t;return r}const Pp=`@export ecgl.ssao.estimate

uniform sampler2D depthTex;

uniform sampler2D normalTex;

uniform sampler2D noiseTex;

uniform vec2 depthTexSize;

uniform vec2 noiseTexSize;

uniform mat4 projection;

uniform mat4 projectionInv;

uniform mat4 viewInverseTranspose;

uniform vec3 kernel[KERNEL_SIZE];

uniform float radius : 1;

uniform float power : 1;

uniform float bias: 1e-2;

uniform float intensity: 1.0;

varying vec2 v_Texcoord;

float ssaoEstimator(in vec3 originPos, in mat3 kernelBasis) {
 float occlusion = 0.0;

 for (int i = 0; i < KERNEL_SIZE; i++) {
 vec3 samplePos = kernel[i];
#ifdef NORMALTEX_ENABLED
 samplePos = kernelBasis * samplePos;
#endif
 samplePos = samplePos * radius + originPos;

 vec4 texCoord = projection * vec4(samplePos, 1.0);
 texCoord.xy /= texCoord.w;

 vec4 depthTexel = texture2D(depthTex, texCoord.xy * 0.5 + 0.5);

 float sampleDepth = depthTexel.r * 2.0 - 1.0;
 if (projection[3][3] == 0.0) {
 sampleDepth = projection[3][2] / (sampleDepth * projection[2][3] - projection[2][2]);
 }
 else {
 sampleDepth = (sampleDepth - projection[3][2]) / projection[2][2];
 }
 
 float rangeCheck = smoothstep(0.0, 1.0, radius / abs(originPos.z - sampleDepth));
 occlusion += rangeCheck * step(samplePos.z, sampleDepth - bias);
 }
#ifdef NORMALTEX_ENABLED
 occlusion = 1.0 - occlusion / float(KERNEL_SIZE);
#else
 occlusion = 1.0 - clamp((occlusion / float(KERNEL_SIZE) - 0.6) * 2.5, 0.0, 1.0);
#endif
 return pow(occlusion, power);
}

void main()
{

 vec4 depthTexel = texture2D(depthTex, v_Texcoord);

#ifdef NORMALTEX_ENABLED
 vec4 tex = texture2D(normalTex, v_Texcoord);
 if (dot(tex.rgb, tex.rgb) == 0.0) {
 gl_FragColor = vec4(1.0);
 return;
 }
 vec3 N = tex.rgb * 2.0 - 1.0;
 N = (viewInverseTranspose * vec4(N, 0.0)).xyz;

 vec2 noiseTexCoord = depthTexSize / vec2(noiseTexSize) * v_Texcoord;
 vec3 rvec = texture2D(noiseTex, noiseTexCoord).rgb * 2.0 - 1.0;
 vec3 T = normalize(rvec - N * dot(rvec, N));
 vec3 BT = normalize(cross(N, T));
 mat3 kernelBasis = mat3(T, BT, N);
#else
 if (depthTexel.r > 0.99999) {
 gl_FragColor = vec4(1.0);
 return;
 }
 mat3 kernelBasis;
#endif

 float z = depthTexel.r * 2.0 - 1.0;

 vec4 projectedPos = vec4(v_Texcoord * 2.0 - 1.0, z, 1.0);
 vec4 p4 = projectionInv * projectedPos;

 vec3 position = p4.xyz / p4.w;

 float ao = ssaoEstimator(position, kernelBasis);
 ao = clamp(1.0 - (1.0 - ao) * intensity, 0.0, 1.0);
 gl_FragColor = vec4(vec3(ao), 1.0);
}

@end


@export ecgl.ssao.blur
#define SHADER_NAME SSAO_BLUR

uniform sampler2D ssaoTexture;

#ifdef NORMALTEX_ENABLED
uniform sampler2D normalTex;
#endif

varying vec2 v_Texcoord;

uniform vec2 textureSize;
uniform float blurSize : 1.0;

uniform int direction: 0.0;

#ifdef DEPTHTEX_ENABLED
uniform sampler2D depthTex;
uniform mat4 projection;
uniform float depthRange : 0.5;

float getLinearDepth(vec2 coord)
{
 float depth = texture2D(depthTex, coord).r * 2.0 - 1.0;
 return projection[3][2] / (depth * projection[2][3] - projection[2][2]);
}
#endif

void main()
{
 float kernel[5];
 kernel[0] = 0.122581;
 kernel[1] = 0.233062;
 kernel[2] = 0.288713;
 kernel[3] = 0.233062;
 kernel[4] = 0.122581;

 vec2 off = vec2(0.0);
 if (direction == 0) {
 off[0] = blurSize / textureSize.x;
 }
 else {
 off[1] = blurSize / textureSize.y;
 }

 vec2 coord = v_Texcoord;

 float sum = 0.0;
 float weightAll = 0.0;

#ifdef NORMALTEX_ENABLED
 vec3 centerNormal = texture2D(normalTex, v_Texcoord).rgb * 2.0 - 1.0;
#endif
#if defined(DEPTHTEX_ENABLED)
 float centerDepth = getLinearDepth(v_Texcoord);
#endif

 for (int i = 0; i < 5; i++) {
 vec2 coord = clamp(v_Texcoord + vec2(float(i) - 2.0) * off, vec2(0.0), vec2(1.0));

 float w = kernel[i];
#ifdef NORMALTEX_ENABLED
 vec3 normal = texture2D(normalTex, coord).rgb * 2.0 - 1.0;
 w *= clamp(dot(normal, centerNormal), 0.0, 1.0);
#endif
#ifdef DEPTHTEX_ENABLED
 float d = getLinearDepth(coord);
 w *= (1.0 - smoothstep(abs(centerDepth - d) / depthRange, 0.0, 1.0));
#endif

 weightAll += w;
 sum += texture2D(ssaoTexture, coord).r * w;
 }

 gl_FragColor = vec4(vec3(sum / weightAll), 1.0);
}

@end
`;G.import(Pp);function Uu(e){for(var t=new Uint8Array(e*e*4),r=0,i=new Z,n=0;n<e;n++)for(var a=0;a<e;a++)i.set(Math.random()*2-1,Math.random()*2-1,0).normalize(),t[r++]=(i.x*.5+.5)*255,t[r++]=(i.y*.5+.5)*255,t[r++]=0,t[r++]=255;return t}function ah(e){return new ge({pixels:Uu(e),wrapS:ne.REPEAT,wrapT:ne.REPEAT,width:e,height:e})}function Rp(e,t,r){var i=new Float32Array(e*3);t=t||0;for(var n=0;n<e;n++){var a=nn(n+t,2)*(r?1:2)*Math.PI,o=nn(n+t,3)*Math.PI,s=Math.random(),l=Math.cos(a)*Math.sin(o)*s,h=Math.cos(o)*s,u=Math.sin(a)*Math.sin(o)*s;i[n*3]=l,i[n*3+1]=h,i[n*3+2]=u}return i}function Ir(e){e=e||{},this._ssaoPass=new ct({fragment:G.source("ecgl.ssao.estimate")}),this._blurPass=new ct({fragment:G.source("ecgl.ssao.blur")}),this._framebuffer=new At({depthBuffer:!1}),this._ssaoTexture=new ge,this._blurTexture=new ge,this._blurTexture2=new ge,this._depthTex=e.depthTexture,this._normalTex=e.normalTexture,this.setNoiseSize(4),this.setKernelSize(e.kernelSize||12),e.radius!=null&&this.setParameter("radius",e.radius),e.power!=null&&this.setParameter("power",e.power),this._normalTex||(this._ssaoPass.material.disableTexture("normalTex"),this._blurPass.material.disableTexture("normalTex")),this._depthTex||this._blurPass.material.disableTexture("depthTex"),this._blurPass.material.setUniform("normalTex",this._normalTex),this._blurPass.material.setUniform("depthTex",this._depthTex)}Ir.prototype.setDepthTexture=function(e){this._depthTex=e};Ir.prototype.setNormalTexture=function(e){this._normalTex=e,this._ssaoPass.material[e?"enableTexture":"disableTexture"]("normalTex"),this.setKernelSize(this._kernelSize)};Ir.prototype.update=function(e,t,r){var i=e.getWidth(),n=e.getHeight(),a=this._ssaoPass,o=this._blurPass;a.setUniform("kernel",this._kernels[r%this._kernels.length]),a.setUniform("depthTex",this._depthTex),this._normalTex!=null&&a.setUniform("normalTex",this._normalTex),a.setUniform("depthTexSize",[this._depthTex.width,this._depthTex.height]);var s=new re;re.transpose(s,t.worldTransform),a.setUniform("projection",t.projectionMatrix.array),a.setUniform("projectionInv",t.invProjectionMatrix.array),a.setUniform("viewInverseTranspose",s.array);var l=this._ssaoTexture,h=this._blurTexture,u=this._blurTexture2;l.width=i/2,l.height=n/2,h.width=i,h.height=n,u.width=i,u.height=n,this._framebuffer.attach(l),this._framebuffer.bind(e),e.gl.clearColor(1,1,1,1),e.gl.clear(e.gl.COLOR_BUFFER_BIT),a.render(e),o.setUniform("textureSize",[i/2,n/2]),o.setUniform("projection",t.projectionMatrix.array),this._framebuffer.attach(h),o.setUniform("direction",0),o.setUniform("ssaoTexture",l),o.render(e),this._framebuffer.attach(u),o.setUniform("textureSize",[i,n]),o.setUniform("direction",1),o.setUniform("ssaoTexture",h),o.render(e),this._framebuffer.unbind(e);var f=e.clearColor;e.gl.clearColor(f[0],f[1],f[2],f[3])};Ir.prototype.getTargetTexture=function(){return this._blurTexture2};Ir.prototype.setParameter=function(e,t){e==="noiseTexSize"?this.setNoiseSize(t):e==="kernelSize"?this.setKernelSize(t):e==="intensity"?this._ssaoPass.material.set("intensity",t):this._ssaoPass.setUniform(e,t)};Ir.prototype.setKernelSize=function(e){this._kernelSize=e,this._ssaoPass.material.define("fragment","KERNEL_SIZE",e),this._kernels=this._kernels||[];for(var t=0;t<30;t++)this._kernels[t]=Rp(e,t*e,!!this._normalTex)};Ir.prototype.setNoiseSize=function(e){var t=this._ssaoPass.getUniform("noiseTex");t?(t.data=Uu(e),t.width=t.height=e,t.dirty()):(t=ah(e),this._ssaoPass.setUniform("noiseTex",ah(e))),this._ssaoPass.setUniform("noiseTexSize",[e,e])};Ir.prototype.dispose=function(e){this._blurTexture.dispose(e),this._ssaoTexture.dispose(e),this._blurTexture2.dispose(e)};const Np=`@export ecgl.ssr.main

#define SHADER_NAME SSR
#define MAX_ITERATION 20;
#define SAMPLE_PER_FRAME 5;
#define TOTAL_SAMPLES 128;

uniform sampler2D sourceTexture;
uniform sampler2D gBufferTexture1;
uniform sampler2D gBufferTexture2;
uniform sampler2D gBufferTexture3;
uniform samplerCube specularCubemap;
uniform float specularIntensity: 1;

uniform mat4 projection;
uniform mat4 projectionInv;
uniform mat4 toViewSpace;
uniform mat4 toWorldSpace;

uniform float maxRayDistance: 200;

uniform float pixelStride: 16;
uniform float pixelStrideZCutoff: 50; 
uniform float screenEdgeFadeStart: 0.9; 
uniform float eyeFadeStart : 0.2; uniform float eyeFadeEnd: 0.8; 
uniform float minGlossiness: 0.2; uniform float zThicknessThreshold: 1;

uniform float nearZ;
uniform vec2 viewportSize : VIEWPORT_SIZE;

uniform float jitterOffset: 0;

varying vec2 v_Texcoord;

#ifdef DEPTH_DECODE
@import clay.util.decode_float
#endif

#ifdef PHYSICALLY_CORRECT
uniform sampler2D normalDistribution;
uniform float sampleOffset: 0;
uniform vec2 normalDistributionSize;

vec3 transformNormal(vec3 H, vec3 N) {
 vec3 upVector = N.y > 0.999 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
 vec3 tangentX = normalize(cross(N, upVector));
 vec3 tangentZ = cross(N, tangentX);
 return normalize(tangentX * H.x + N * H.y + tangentZ * H.z);
}
vec3 importanceSampleNormalGGX(float i, float roughness, vec3 N) {
 float p = fract((i + sampleOffset) / float(TOTAL_SAMPLES));
 vec3 H = texture2D(normalDistribution,vec2(roughness, p)).rgb;
 return transformNormal(H, N);
}
float G_Smith(float g, float ndv, float ndl) {
 float roughness = 1.0 - g;
 float k = roughness * roughness / 2.0;
 float G1V = ndv / (ndv * (1.0 - k) + k);
 float G1L = ndl / (ndl * (1.0 - k) + k);
 return G1L * G1V;
}
vec3 F_Schlick(float ndv, vec3 spec) {
 return spec + (1.0 - spec) * pow(1.0 - ndv, 5.0);
}
#endif

float fetchDepth(sampler2D depthTexture, vec2 uv)
{
 vec4 depthTexel = texture2D(depthTexture, uv);
 return depthTexel.r * 2.0 - 1.0;
}

float linearDepth(float depth)
{
 if (projection[3][3] == 0.0) {
 return projection[3][2] / (depth * projection[2][3] - projection[2][2]);
 }
 else {
 return (depth - projection[3][2]) / projection[2][2];
 }
}

bool rayIntersectDepth(float rayZNear, float rayZFar, vec2 hitPixel)
{
 if (rayZFar > rayZNear)
 {
 float t = rayZFar; rayZFar = rayZNear; rayZNear = t;
 }
 float cameraZ = linearDepth(fetchDepth(gBufferTexture2, hitPixel));
 return rayZFar <= cameraZ && rayZNear >= cameraZ - zThicknessThreshold;
}


bool traceScreenSpaceRay(
 vec3 rayOrigin, vec3 rayDir, float jitter,
 out vec2 hitPixel, out vec3 hitPoint, out float iterationCount
)
{
 float rayLength = ((rayOrigin.z + rayDir.z * maxRayDistance) > -nearZ)
 ? (-nearZ - rayOrigin.z) / rayDir.z : maxRayDistance;

 vec3 rayEnd = rayOrigin + rayDir * rayLength;

 vec4 H0 = projection * vec4(rayOrigin, 1.0);
 vec4 H1 = projection * vec4(rayEnd, 1.0);

 float k0 = 1.0 / H0.w, k1 = 1.0 / H1.w;

 vec3 Q0 = rayOrigin * k0, Q1 = rayEnd * k1;

 vec2 P0 = (H0.xy * k0 * 0.5 + 0.5) * viewportSize;
 vec2 P1 = (H1.xy * k1 * 0.5 + 0.5) * viewportSize;

 P1 += dot(P1 - P0, P1 - P0) < 0.0001 ? 0.01 : 0.0;
 vec2 delta = P1 - P0;

 bool permute = false;
 if (abs(delta.x) < abs(delta.y)) {
 permute = true;
 delta = delta.yx;
 P0 = P0.yx;
 P1 = P1.yx;
 }
 float stepDir = sign(delta.x);
 float invdx = stepDir / delta.x;

 vec3 dQ = (Q1 - Q0) * invdx;
 float dk = (k1 - k0) * invdx;

 vec2 dP = vec2(stepDir, delta.y * invdx);

 float strideScaler = 1.0 - min(1.0, -rayOrigin.z / pixelStrideZCutoff);
 float pixStride = 1.0 + strideScaler * pixelStride;

 dP *= pixStride; dQ *= pixStride; dk *= pixStride;

 vec4 pqk = vec4(P0, Q0.z, k0);
 vec4 dPQK = vec4(dP, dQ.z, dk);

 pqk += dPQK * jitter;
 float rayZFar = (dPQK.z * 0.5 + pqk.z) / (dPQK.w * 0.5 + pqk.w);
 float rayZNear;

 bool intersect = false;

 vec2 texelSize = 1.0 / viewportSize;

 iterationCount = 0.0;

 for (int i = 0; i < MAX_ITERATION; i++)
 {
 pqk += dPQK;

 rayZNear = rayZFar;
 rayZFar = (dPQK.z * 0.5 + pqk.z) / (dPQK.w * 0.5 + pqk.w);

 hitPixel = permute ? pqk.yx : pqk.xy;
 hitPixel *= texelSize;

 intersect = rayIntersectDepth(rayZNear, rayZFar, hitPixel);

 iterationCount += 1.0;

 dPQK *= 1.2;

 if (intersect) {
 break;
 }
 }

 Q0.xy += dQ.xy * iterationCount;
 Q0.z = pqk.z;
 hitPoint = Q0 / pqk.w;

 return intersect;
}

float calculateAlpha(
 float iterationCount, float reflectivity,
 vec2 hitPixel, vec3 hitPoint, float dist, vec3 rayDir
)
{
 float alpha = clamp(reflectivity, 0.0, 1.0);
 alpha *= 1.0 - (iterationCount / float(MAX_ITERATION));
 vec2 hitPixelNDC = hitPixel * 2.0 - 1.0;
 float maxDimension = min(1.0, max(abs(hitPixelNDC.x), abs(hitPixelNDC.y)));
 alpha *= 1.0 - max(0.0, maxDimension - screenEdgeFadeStart) / (1.0 - screenEdgeFadeStart);

 float _eyeFadeStart = eyeFadeStart;
 float _eyeFadeEnd = eyeFadeEnd;
 if (_eyeFadeStart > _eyeFadeEnd) {
 float tmp = _eyeFadeEnd;
 _eyeFadeEnd = _eyeFadeStart;
 _eyeFadeStart = tmp;
 }

 float eyeDir = clamp(rayDir.z, _eyeFadeStart, _eyeFadeEnd);
 alpha *= 1.0 - (eyeDir - _eyeFadeStart) / (_eyeFadeEnd - _eyeFadeStart);

 alpha *= 1.0 - clamp(dist / maxRayDistance, 0.0, 1.0);

 return alpha;
}

@import clay.util.rand

@import clay.util.rgbm

void main()
{
 vec4 normalAndGloss = texture2D(gBufferTexture1, v_Texcoord);

 if (dot(normalAndGloss.rgb, vec3(1.0)) == 0.0) {
 discard;
 }

 float g = normalAndGloss.a;
#if !defined(PHYSICALLY_CORRECT)
 if (g <= minGlossiness) {
 discard;
 }
#endif

 float reflectivity = (g - minGlossiness) / (1.0 - minGlossiness);

 vec3 N = normalize(normalAndGloss.rgb * 2.0 - 1.0);
 N = normalize((toViewSpace * vec4(N, 0.0)).xyz);

 vec4 projectedPos = vec4(v_Texcoord * 2.0 - 1.0, fetchDepth(gBufferTexture2, v_Texcoord), 1.0);
 vec4 pos = projectionInv * projectedPos;
 vec3 rayOrigin = pos.xyz / pos.w;
 vec3 V = -normalize(rayOrigin);

 float ndv = clamp(dot(N, V), 0.0, 1.0);
 float iterationCount;
 float jitter = rand(fract(v_Texcoord + jitterOffset));

#ifdef PHYSICALLY_CORRECT
 vec4 color = vec4(vec3(0.0), 1.0);
 vec4 albedoMetalness = texture2D(gBufferTexture3, v_Texcoord);
 vec3 albedo = albedoMetalness.rgb;
 float m = albedoMetalness.a;
 vec3 diffuseColor = albedo * (1.0 - m);
 vec3 spec = mix(vec3(0.04), albedo, m);

 float jitter2 = rand(fract(v_Texcoord)) * float(TOTAL_SAMPLES);

 for (int i = 0; i < SAMPLE_PER_FRAME; i++) {
 vec3 H = importanceSampleNormalGGX(float(i) + jitter2, 1.0 - g, N);
 vec3 rayDir = normalize(reflect(-V, H));
#else
 vec3 rayDir = normalize(reflect(-V, N));
#endif
 vec2 hitPixel;
 vec3 hitPoint;

 bool intersect = traceScreenSpaceRay(rayOrigin, rayDir, jitter, hitPixel, hitPoint, iterationCount);

 float dist = distance(rayOrigin, hitPoint);

 vec3 hitNormal = texture2D(gBufferTexture1, hitPixel).rgb * 2.0 - 1.0;
 hitNormal = normalize((toViewSpace * vec4(hitNormal, 0.0)).xyz);
#ifdef PHYSICALLY_CORRECT
 float ndl = clamp(dot(N, rayDir), 0.0, 1.0);
 float vdh = clamp(dot(V, H), 0.0, 1.0);
 float ndh = clamp(dot(N, H), 0.0, 1.0);
 vec3 litTexel = vec3(0.0);
 if (dot(hitNormal, rayDir) < 0.0 && intersect) {
 litTexel = texture2D(sourceTexture, hitPixel).rgb;
 litTexel *= pow(clamp(1.0 - dist / 200.0, 0.0, 1.0), 3.0);

 }
 else {
 #ifdef SPECULARCUBEMAP_ENABLED
 vec3 rayDirW = normalize(toWorldSpace * vec4(rayDir, 0.0)).rgb;
 litTexel = RGBMDecode(textureCubeLodEXT(specularCubemap, rayDirW, 0.0), 8.12).rgb * specularIntensity;
#endif
 }
 color.rgb += ndl * litTexel * (
 F_Schlick(ndl, spec) * G_Smith(g, ndv, ndl) * vdh / (ndh * ndv + 0.001)
 );
 }
 color.rgb /= float(SAMPLE_PER_FRAME);
#else
 #if !defined(SPECULARCUBEMAP_ENABLED)
 if (dot(hitNormal, rayDir) >= 0.0) {
 discard;
 }
 if (!intersect) {
 discard;
 }
#endif
 float alpha = clamp(calculateAlpha(iterationCount, reflectivity, hitPixel, hitPoint, dist, rayDir), 0.0, 1.0);
 vec4 color = texture2D(sourceTexture, hitPixel);
 color.rgb *= alpha;

#ifdef SPECULARCUBEMAP_ENABLED
 vec3 rayDirW = normalize(toWorldSpace * vec4(rayDir, 0.0)).rgb;
 alpha = alpha * (intersect ? 1.0 : 0.0);
 float bias = (1.0 -g) * 5.0;
 color.rgb += (1.0 - alpha)
 * RGBMDecode(textureCubeLodEXT(specularCubemap, rayDirW, bias), 8.12).rgb
 * specularIntensity;
#endif

#endif

 gl_FragColor = encodeHDR(color);
}
@end

@export ecgl.ssr.blur

uniform sampler2D texture;
uniform sampler2D gBufferTexture1;
uniform sampler2D gBufferTexture2;
uniform mat4 projection;
uniform float depthRange : 0.05;

varying vec2 v_Texcoord;

uniform vec2 textureSize;
uniform float blurSize : 1.0;

#ifdef BLEND
 #ifdef SSAOTEX_ENABLED
uniform sampler2D ssaoTex;
 #endif
uniform sampler2D sourceTexture;
#endif

float getLinearDepth(vec2 coord)
{
 float depth = texture2D(gBufferTexture2, coord).r * 2.0 - 1.0;
 return projection[3][2] / (depth * projection[2][3] - projection[2][2]);
}

@import clay.util.rgbm


void main()
{
 @import clay.compositor.kernel.gaussian_9

 vec4 centerNTexel = texture2D(gBufferTexture1, v_Texcoord);
 float g = centerNTexel.a;
 float maxBlurSize = clamp(1.0 - g, 0.0, 1.0) * blurSize;
#ifdef VERTICAL
 vec2 off = vec2(0.0, maxBlurSize / textureSize.y);
#else
 vec2 off = vec2(maxBlurSize / textureSize.x, 0.0);
#endif

 vec2 coord = v_Texcoord;

 vec4 sum = vec4(0.0);
 float weightAll = 0.0;

 vec3 cN = centerNTexel.rgb * 2.0 - 1.0;
 float cD = getLinearDepth(v_Texcoord);
 for (int i = 0; i < 9; i++) {
 vec2 coord = clamp((float(i) - 4.0) * off + v_Texcoord, vec2(0.0), vec2(1.0));
 float w = gaussianKernel[i]
 * clamp(dot(cN, texture2D(gBufferTexture1, coord).rgb * 2.0 - 1.0), 0.0, 1.0);
 float d = getLinearDepth(coord);
 w *= (1.0 - smoothstep(abs(cD - d) / depthRange, 0.0, 1.0));

 weightAll += w;
 sum += decodeHDR(texture2D(texture, coord)) * w;
 }

#ifdef BLEND
 float aoFactor = 1.0;
 #ifdef SSAOTEX_ENABLED
 aoFactor = texture2D(ssaoTex, v_Texcoord).r;
 #endif
 gl_FragColor = encodeHDR(
 sum / weightAll * aoFactor + decodeHDR(texture2D(sourceTexture, v_Texcoord))
 );
#else
 gl_FragColor = encodeHDR(sum / weightAll);
#endif
}

@end`;G.import(Np);function Or(e){e=e||{},this._ssrPass=new ct({fragment:G.source("ecgl.ssr.main"),clearColor:[0,0,0,0]}),this._blurPass1=new ct({fragment:G.source("ecgl.ssr.blur"),clearColor:[0,0,0,0]}),this._blurPass2=new ct({fragment:G.source("ecgl.ssr.blur"),clearColor:[0,0,0,0]}),this._blendPass=new ct({fragment:G.source("clay.compositor.blend")}),this._blendPass.material.disableTexturesAll(),this._blendPass.material.enableTexture(["texture1","texture2"]),this._ssrPass.setUniform("gBufferTexture1",e.normalTexture),this._ssrPass.setUniform("gBufferTexture2",e.depthTexture),this._blurPass1.setUniform("gBufferTexture1",e.normalTexture),this._blurPass1.setUniform("gBufferTexture2",e.depthTexture),this._blurPass2.setUniform("gBufferTexture1",e.normalTexture),this._blurPass2.setUniform("gBufferTexture2",e.depthTexture),this._blurPass2.material.define("fragment","VERTICAL"),this._blurPass2.material.define("fragment","BLEND"),this._ssrTexture=new ge({type:ne.HALF_FLOAT}),this._texture2=new ge({type:ne.HALF_FLOAT}),this._texture3=new ge({type:ne.HALF_FLOAT}),this._prevTexture=new ge({type:ne.HALF_FLOAT}),this._currentTexture=new ge({type:ne.HALF_FLOAT}),this._frameBuffer=new At({depthBuffer:!1}),this._normalDistribution=null,this._totalSamples=256,this._samplePerFrame=4,this._ssrPass.material.define("fragment","SAMPLE_PER_FRAME",this._samplePerFrame),this._ssrPass.material.define("fragment","TOTAL_SAMPLES",this._totalSamples),this._downScale=1}Or.prototype.setAmbientCubemap=function(e,t){this._ssrPass.material.set("specularCubemap",e),this._ssrPass.material.set("specularIntensity",t);var r=e&&t;this._ssrPass.material[r?"enableTexture":"disableTexture"]("specularCubemap")};Or.prototype.update=function(e,t,r,i){var n=e.getWidth(),a=e.getHeight(),o=this._ssrTexture,s=this._texture2,l=this._texture3;o.width=this._prevTexture.width=this._currentTexture.width=n/this._downScale,o.height=this._prevTexture.height=this._currentTexture.height=a/this._downScale,s.width=l.width=n,s.height=l.height=a;var h=this._frameBuffer,u=this._ssrPass,f=this._blurPass1,d=this._blurPass2,c=this._blendPass,v=new re,p=new re;re.transpose(v,t.worldTransform),re.transpose(p,t.viewMatrix),u.setUniform("sourceTexture",r),u.setUniform("projection",t.projectionMatrix.array),u.setUniform("projectionInv",t.invProjectionMatrix.array),u.setUniform("toViewSpace",v.array),u.setUniform("toWorldSpace",p.array),u.setUniform("nearZ",t.near);var g=i/this._totalSamples*this._samplePerFrame;if(u.setUniform("jitterOffset",g),u.setUniform("sampleOffset",i*this._samplePerFrame),f.setUniform("textureSize",[o.width,o.height]),d.setUniform("textureSize",[n,a]),d.setUniform("sourceTexture",r),f.setUniform("projection",t.projectionMatrix.array),d.setUniform("projection",t.projectionMatrix.array),h.attach(o),h.bind(e),u.render(e),this._physicallyCorrect&&(h.attach(this._currentTexture),c.setUniform("texture1",this._prevTexture),c.setUniform("texture2",o),c.material.set({weight1:i>=1?.95:0,weight2:i>=1?.05:1}),c.render(e)),h.attach(s),f.setUniform("texture",this._physicallyCorrect?this._currentTexture:o),f.render(e),h.attach(l),d.setUniform("texture",s),d.render(e),h.unbind(e),this._physicallyCorrect){var m=this._prevTexture;this._prevTexture=this._currentTexture,this._currentTexture=m}};Or.prototype.getTargetTexture=function(){return this._texture3};Or.prototype.setParameter=function(e,t){e==="maxIteration"?this._ssrPass.material.define("fragment","MAX_ITERATION",t):this._ssrPass.setUniform(e,t)};Or.prototype.setPhysicallyCorrect=function(e){e?(this._normalDistribution||(this._normalDistribution=za.generateNormalDistribution(64,this._totalSamples)),this._ssrPass.material.define("fragment","PHYSICALLY_CORRECT"),this._ssrPass.material.set("normalDistribution",this._normalDistribution),this._ssrPass.material.set("normalDistributionSize",[64,this._totalSamples])):this._ssrPass.material.undefine("fragment","PHYSICALLY_CORRECT"),this._physicallyCorrect=e};Or.prototype.setSSAOTexture=function(e){var t=this._blurPass2;e?(t.material.enableTexture("ssaoTex"),t.material.set("ssaoTex",e)):t.material.disableTexture("ssaoTex")};Or.prototype.isFinished=function(e){return this._physicallyCorrect?e>this._totalSamples/this._samplePerFrame:!0};Or.prototype.dispose=function(e){this._ssrTexture.dispose(e),this._texture2.dispose(e),this._texture3.dispose(e),this._prevTexture.dispose(e),this._currentTexture.dispose(e),this._frameBuffer.dispose(e)};const oh=[0,0,-.321585265978,-.154972575841,.458126042375,.188473391593,.842080129861,.527766490688,.147304551086,-.659453822776,-.331943915203,-.940619700594,.0479226680259,.54812163202,.701581552186,-.709825561388,-.295436780218,.940589268233,-.901489676764,.237713156085,.973570876096,-.109899459384,-.866792314779,-.451805525005,.330975007087,.800048655954,-.344275183665,.381779221166,-.386139432542,-.437418421534,-.576478634965,-.0148463392551,.385798197415,-.262426961053,-.666302061145,.682427250835,-.628010632582,-.732836215494,.10163141741,-.987658134403,.711995289051,-.320024291314,.0296005138058,.950296523438,.0130612307608,-.351024443122,-.879596633704,-.10478487883,.435712737232,.504254490347,.779203817497,.206477676721,.388264289969,-.896736162545,-.153106280781,-.629203242522,-.245517550697,.657969239148,.126830499058,.26862328493,-.634888119007,-.302301223431,.617074219636,.779817204925],Ip=`@export ecgl.normal.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header

@import ecgl.common.attributes

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

@import ecgl.common.normalMap.vertexHeader

@import ecgl.common.vertexAnimation.header

void main()
{

 @import ecgl.common.vertexAnimation.main

 @import ecgl.common.uv.main

 v_Normal = normalize((worldInverseTranspose * vec4(normal, 0.0)).xyz);
 v_WorldPosition = (world * vec4(pos, 1.0)).xyz;

 @import ecgl.common.normalMap.vertexMain

 gl_Position = worldViewProjection * vec4(pos, 1.0);

}


@end


@export ecgl.normal.fragment

#define ROUGHNESS_CHANEL 0

uniform bool useBumpMap;
uniform bool useRoughnessMap;
uniform bool doubleSide;
uniform float roughness;

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform mat4 viewInverse : VIEWINVERSE;

@import ecgl.common.normalMap.fragmentHeader
@import ecgl.common.bumpMap.header

uniform sampler2D roughnessMap;

void main()
{
 vec3 N = v_Normal;
 
 bool flipNormal = false;
 if (doubleSide) {
 vec3 eyePos = viewInverse[3].xyz;
 vec3 V = normalize(eyePos - v_WorldPosition);

 if (dot(N, V) < 0.0) {
 flipNormal = true;
 }
 }

 @import ecgl.common.normalMap.fragmentMain

 if (useBumpMap) {
 N = bumpNormal(v_WorldPosition, v_Normal, N);
 }

 float g = 1.0 - roughness;

 if (useRoughnessMap) {
 float g2 = 1.0 - texture2D(roughnessMap, v_DetailTexcoord)[ROUGHNESS_CHANEL];
 g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);
 }

 if (flipNormal) {
 N = -N;
 }

 gl_FragColor.rgb = (N.xyz + 1.0) * 0.5;
 gl_FragColor.a = g;
}
@end`;G.import(Ip);function Xo(e,t,r,i,n){var a=e.gl;t.setUniform(a,"1i",r,n),a.activeTexture(a.TEXTURE0+n),i.isRenderable()?i.bind(e):i.unbind(e)}function Op(e,t,r,i,n){var a,o,s,l,h=e.gl;return function(u,f,d){if(!(l&&l.material===u.material)){var c=u.material,v=u.__program,p=c.get("roughness");p==null&&(p=1);var g=c.get("normalMap")||t,m=c.get("roughnessMap"),_=c.get("bumpMap"),x=c.get("uvRepeat"),y=c.get("uvOffset"),T=c.get("detailUvRepeat"),w=c.get("detailUvOffset"),E=!!_&&c.isTextureEnabled("bumpMap"),S=!!m&&c.isTextureEnabled("roughnessMap"),D=c.isDefined("fragment","DOUBLE_SIDED");_=_||r,m=m||i,d!==f?(f.set("normalMap",g),f.set("bumpMap",_),f.set("roughnessMap",m),f.set("useBumpMap",E),f.set("useRoughnessMap",S),f.set("doubleSide",D),x!=null&&f.set("uvRepeat",x),y!=null&&f.set("uvOffset",y),T!=null&&f.set("detailUvRepeat",T),w!=null&&f.set("detailUvOffset",w),f.set("roughness",p)):(v.setUniform(h,"1f","roughness",p),a!==g&&Xo(e,v,"normalMap",g,0),o!==_&&_&&Xo(e,v,"bumpMap",_,1),s!==m&&m&&Xo(e,v,"roughnessMap",m,2),x!=null&&v.setUniform(h,"2f","uvRepeat",x),y!=null&&v.setUniform(h,"2f","uvOffset",y),T!=null&&v.setUniform(h,"2f","detailUvRepeat",T),w!=null&&v.setUniform(h,"2f","detailUvOffset",w),v.setUniform(h,"1i","useBumpMap",+E),v.setUniform(h,"1i","useRoughnessMap",+S),v.setUniform(h,"1i","doubleSide",+D)),a=g,o=_,s=m,l=u}}}function dn(e){this._depthTex=new ge({format:ne.DEPTH_COMPONENT,type:ne.UNSIGNED_INT}),this._normalTex=new ge({type:ne.HALF_FLOAT}),this._framebuffer=new At,this._framebuffer.attach(this._normalTex),this._framebuffer.attach(this._depthTex,At.DEPTH_ATTACHMENT),this._normalMaterial=new tr({shader:new G(G.source("ecgl.normal.vertex"),G.source("ecgl.normal.fragment"))}),this._normalMaterial.enableTexture(["normalMap","bumpMap","roughnessMap"]),this._defaultNormalMap=Ei.createBlank("#000"),this._defaultBumpMap=Ei.createBlank("#000"),this._defaultRoughessMap=Ei.createBlank("#000"),this._debugPass=new ct({fragment:G.source("clay.compositor.output")}),this._debugPass.setUniform("texture",this._normalTex),this._debugPass.material.undefine("fragment","OUTPUT_ALPHA")}dn.prototype.getDepthTexture=function(){return this._depthTex};dn.prototype.getNormalTexture=function(){return this._normalTex};dn.prototype.update=function(e,t,r){var i=e.getWidth(),n=e.getHeight(),a=this._depthTex,o=this._normalTex,s=this._normalMaterial;a.width=i,a.height=n,o.width=i,o.height=n;var l=t.getRenderList(r).opaque;this._framebuffer.bind(e),e.gl.clearColor(0,0,0,0),e.gl.clear(e.gl.COLOR_BUFFER_BIT|e.gl.DEPTH_BUFFER_BIT),e.gl.disable(e.gl.BLEND),e.renderPass(l,r,{getMaterial:function(){return s},ifRender:function(h){return h.renderNormal},beforeRender:Op(e,this._defaultNormalMap,this._defaultBumpMap,this._defaultRoughessMap,this._normalMaterial),sort:e.opaqueSortCompare}),this._framebuffer.unbind(e)};dn.prototype.renderDebug=function(e){this._debugPass.render(e)};dn.prototype.dispose=function(e){this._depthTex.dispose(e),this._normalTex.dispose(e)};function ea(e){e=e||{},this._edgePass=new ct({fragment:G.source("ecgl.edge")}),this._edgePass.setUniform("normalTexture",e.normalTexture),this._edgePass.setUniform("depthTexture",e.depthTexture),this._targetTexture=new ge({type:ne.HALF_FLOAT}),this._frameBuffer=new At,this._frameBuffer.attach(this._targetTexture)}ea.prototype.update=function(e,t,r,i){var n=e.getWidth(),a=e.getHeight(),o=this._targetTexture;o.width=n,o.height=a;var s=this._frameBuffer;s.bind(e),this._edgePass.setUniform("projectionInv",t.invProjectionMatrix.array),this._edgePass.setUniform("textureSize",[n,a]),this._edgePass.setUniform("texture",r),this._edgePass.render(e),s.unbind(e)};ea.prototype.getTargetTexture=function(){return this._targetTexture};ea.prototype.setParameter=function(e,t){this._edgePass.setUniform(e,t)};ea.prototype.dispose=function(e){this._targetTexture.dispose(e),this._frameBuffer.dispose(e)};const Bp={type:"compositor",nodes:[{name:"source",type:"texture",outputs:{color:{}}},{name:"source_half",shader:"#source(clay.compositor.downsample)",inputs:{texture:"source"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"}},{name:"bright",shader:"#source(clay.compositor.bright)",inputs:{texture:"source_half"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{threshold:2,scale:4,textureSize:"expr([width * 1.0 / 2, height / 2])"}},{name:"bright_downsample_4",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 2, height / 2] )"}},{name:"bright_downsample_8",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright_downsample_4"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 4, height / 4] )"}},{name:"bright_downsample_16",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright_downsample_8"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 16)",height:"expr(height * 1.0 / 16)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 8, height / 8] )"}},{name:"bright_downsample_32",shader:"#source(clay.compositor.downsample)",inputs:{texture:"bright_downsample_16"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 32)",height:"expr(height * 1.0 / 32)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0 / 16, height / 16] )"}},{name:"bright_upsample_16_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_32"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 16)",height:"expr(height * 1.0 / 16)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 32, height / 32] )"}},{name:"bright_upsample_16_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_16_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 16)",height:"expr(height * 1.0 / 16)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 16, height * 1.0 / 16] )"}},{name:"bright_upsample_8_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_16"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 16, height * 1.0 / 16] )"}},{name:"bright_upsample_8_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_8_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 8, height * 1.0 / 8] )"}},{name:"bright_upsample_8_blend",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_8_blur_v",texture2:"bright_upsample_16_blur_v"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 8)",height:"expr(height * 1.0 / 8)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"bright_upsample_4_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_8"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 8, height * 1.0 / 8] )"}},{name:"bright_upsample_4_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_4_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 4, height * 1.0 / 4] )"}},{name:"bright_upsample_4_blend",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_4_blur_v",texture2:"bright_upsample_8_blend"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 4)",height:"expr(height * 1.0 / 4)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"bright_upsample_2_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_downsample_4"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 4, height * 1.0 / 4] )"}},{name:"bright_upsample_2_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_2_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0 / 2, height * 1.0 / 2] )"}},{name:"bright_upsample_2_blend",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_2_blur_v",texture2:"bright_upsample_4_blend"},outputs:{color:{parameters:{width:"expr(width * 1.0 / 2)",height:"expr(height * 1.0 / 2)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"bright_upsample_full_blur_h",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:0,textureSize:"expr( [width * 1.0 / 2, height * 1.0 / 2] )"}},{name:"bright_upsample_full_blur_v",shader:"#source(clay.compositor.gaussian_blur)",inputs:{texture:"bright_upsample_full_blur_h"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{blurSize:1,blurDir:1,textureSize:"expr( [width * 1.0, height * 1.0] )"}},{name:"bloom_composite",shader:"#source(clay.compositor.blend)",inputs:{texture1:"bright_upsample_full_blur_v",texture2:"bright_upsample_2_blend"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{weight1:.3,weight2:.7}},{name:"coc",shader:"#source(ecgl.dof.coc)",outputs:{color:{parameters:{minFilter:"NEAREST",magFilter:"NEAREST",width:"expr(width * 1.0)",height:"expr(height * 1.0)"}}},parameters:{focalDist:50,focalRange:30}},{name:"dof_far_blur",shader:"#source(ecgl.dof.diskBlur)",inputs:{texture:"source",coc:"coc"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"}},{name:"dof_near_blur",shader:"#source(ecgl.dof.diskBlur)",inputs:{texture:"source",coc:"coc"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"},defines:{BLUR_NEARFIELD:null}},{name:"dof_coc_blur",shader:"#source(ecgl.dof.diskBlur)",inputs:{texture:"coc"},outputs:{color:{parameters:{minFilter:"NEAREST",magFilter:"NEAREST",width:"expr(width * 1.0)",height:"expr(height * 1.0)"}}},parameters:{textureSize:"expr( [width * 1.0, height * 1.0] )"},defines:{BLUR_COC:null}},{name:"dof_composite",shader:"#source(ecgl.dof.composite)",inputs:{original:"source",blurred:"dof_far_blur",nearfield:"dof_near_blur",coc:"coc",nearcoc:"dof_coc_blur"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)",type:"HALF_FLOAT"}}}},{name:"composite",shader:"#source(clay.compositor.hdr.composite)",inputs:{texture:"source",bloom:"bloom_composite"},outputs:{color:{parameters:{width:"expr(width * 1.0)",height:"expr(height * 1.0)"}}},defines:{}},{name:"FXAA",shader:"#source(clay.compositor.fxaa)",inputs:{texture:"composite"}}]},Fp=`@export ecgl.dof.coc

uniform sampler2D depth;

uniform float zNear: 0.1;
uniform float zFar: 2000;

uniform float focalDistance: 3;
uniform float focalRange: 1;
uniform float focalLength: 30;
uniform float fstop: 2.8;

varying vec2 v_Texcoord;

@import clay.util.encode_float

void main()
{
 float z = texture2D(depth, v_Texcoord).r * 2.0 - 1.0;

 float dist = 2.0 * zNear * zFar / (zFar + zNear - z * (zFar - zNear));

 float aperture = focalLength / fstop;

 float coc;

 float uppper = focalDistance + focalRange;
 float lower = focalDistance - focalRange;
 if (dist <= uppper && dist >= lower) {
 coc = 0.5;
 }
 else {
 float focalAdjusted = dist > uppper ? uppper : lower;

 coc = abs(aperture * (focalLength * (dist - focalAdjusted)) / (dist * (focalAdjusted - focalLength)));
 coc = clamp(coc, 0.0, 2.0) / 2.00001;

 if (dist < lower) {
 coc = -coc;
 }
 coc = coc * 0.5 + 0.5;
 }

 gl_FragColor = encodeFloat(coc);
}
@end


@export ecgl.dof.composite

#define DEBUG 0

uniform sampler2D original;
uniform sampler2D blurred;
uniform sampler2D nearfield;
uniform sampler2D coc;
uniform sampler2D nearcoc;
varying vec2 v_Texcoord;

@import clay.util.rgbm
@import clay.util.float

void main()
{
 vec4 blurredColor = texture2D(blurred, v_Texcoord);
 vec4 originalColor = texture2D(original, v_Texcoord);

 float fCoc = decodeFloat(texture2D(coc, v_Texcoord));

 fCoc = abs(fCoc * 2.0 - 1.0);

 float weight = smoothstep(0.0, 1.0, fCoc);
 
#ifdef NEARFIELD_ENABLED
 vec4 nearfieldColor = texture2D(nearfield, v_Texcoord);
 float fNearCoc = decodeFloat(texture2D(nearcoc, v_Texcoord));
 fNearCoc = abs(fNearCoc * 2.0 - 1.0);

 gl_FragColor = encodeHDR(
 mix(
 nearfieldColor, mix(originalColor, blurredColor, weight),
 pow(1.0 - fNearCoc, 4.0)
 )
 );
#else
 gl_FragColor = encodeHDR(mix(originalColor, blurredColor, weight));
#endif

}

@end



@export ecgl.dof.diskBlur

#define POISSON_KERNEL_SIZE 16;

uniform sampler2D texture;
uniform sampler2D coc;
varying vec2 v_Texcoord;

uniform float blurRadius : 10.0;
uniform vec2 textureSize : [512.0, 512.0];

uniform vec2 poissonKernel[POISSON_KERNEL_SIZE];

uniform float percent;

float nrand(const in vec2 n) {
 return fract(sin(dot(n.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

@import clay.util.rgbm
@import clay.util.float


void main()
{
 vec2 offset = blurRadius / textureSize;

 float rnd = 6.28318 * nrand(v_Texcoord + 0.07 * percent );
 float cosa = cos(rnd);
 float sina = sin(rnd);
 vec4 basis = vec4(cosa, -sina, sina, cosa);

#if !defined(BLUR_NEARFIELD) && !defined(BLUR_COC)
 offset *= abs(decodeFloat(texture2D(coc, v_Texcoord)) * 2.0 - 1.0);
#endif

#ifdef BLUR_COC
 float cocSum = 0.0;
#else
 vec4 color = vec4(0.0);
#endif


 float weightSum = 0.0;

 for (int i = 0; i < POISSON_KERNEL_SIZE; i++) {
 vec2 ofs = poissonKernel[i];

 ofs = vec2(dot(ofs, basis.xy), dot(ofs, basis.zw));

 vec2 uv = v_Texcoord + ofs * offset;
 vec4 texel = texture2D(texture, uv);

 float w = 1.0;
#ifdef BLUR_COC
 float fCoc = decodeFloat(texel) * 2.0 - 1.0;
 cocSum += clamp(fCoc, -1.0, 0.0) * w;
#else
 texel = texel;
 #if !defined(BLUR_NEARFIELD)
 float fCoc = decodeFloat(texture2D(coc, uv)) * 2.0 - 1.0;
 w *= abs(fCoc);
 #endif
 texel.rgb *= texel.a;
 color += texel * w;
#endif

 weightSum += w;
 }

#ifdef BLUR_COC
 gl_FragColor = encodeFloat(clamp(cocSum / weightSum, -1.0, 0.0) * 0.5 + 0.5);
#else
 color /= weightSum;
 color.rgb /= (color.a + 0.0001);
 gl_FragColor = color;
#endif
}

@end`,Up=`@export ecgl.edge

uniform sampler2D texture;

uniform sampler2D normalTexture;
uniform sampler2D depthTexture;

uniform mat4 projectionInv;

uniform vec2 textureSize;

uniform vec4 edgeColor: [0,0,0,0.8];

varying vec2 v_Texcoord;

vec3 packColor(vec2 coord) {
 float z = texture2D(depthTexture, coord).r * 2.0 - 1.0;
 vec4 p = vec4(v_Texcoord * 2.0 - 1.0, z, 1.0);
 vec4 p4 = projectionInv * p;

 return vec3(
 texture2D(normalTexture, coord).rg,
 -p4.z / p4.w / 5.0
 );
}

void main() {
 vec2 cc = v_Texcoord;
 vec3 center = packColor(cc);

 float size = clamp(1.0 - (center.z - 10.0) / 100.0, 0.0, 1.0) * 0.5;
 float dx = size / textureSize.x;
 float dy = size / textureSize.y;

 vec2 coord;
 vec3 topLeft = packColor(cc+vec2(-dx, -dy));
 vec3 top = packColor(cc+vec2(0.0, -dy));
 vec3 topRight = packColor(cc+vec2(dx, -dy));
 vec3 left = packColor(cc+vec2(-dx, 0.0));
 vec3 right = packColor(cc+vec2(dx, 0.0));
 vec3 bottomLeft = packColor(cc+vec2(-dx, dy));
 vec3 bottom = packColor(cc+vec2(0.0, dy));
 vec3 bottomRight = packColor(cc+vec2(dx, dy));

 vec3 v = -topLeft-2.0*top-topRight+bottomLeft+2.0*bottom+bottomRight;
 vec3 h = -bottomLeft-2.0*left-topLeft+bottomRight+2.0*right+topRight;

 float edge = sqrt(dot(h, h) + dot(v, v));

 edge = smoothstep(0.8, 1.0, edge);

 gl_FragColor = mix(texture2D(texture, v_Texcoord), vec4(edgeColor.rgb, 1.0), edgeColor.a * edge);
}
@end`;G.import(Lu);G.import(Mu);G.import(Du);G.import(Pu);G.import(Ru);G.import(Nu);G.import(Iu);G.import(Ou);G.import(Bu);G.import(Fp);G.import(Up);function zu(e,t){return{color:{parameters:{width:e,height:t}}}}var Is=["composite","FXAA"];function Ae(){this._width,this._height,this._dpr,this._sourceTexture=new ge({type:ne.HALF_FLOAT}),this._depthTexture=new ge({format:ne.DEPTH_COMPONENT,type:ne.UNSIGNED_INT}),this._framebuffer=new At,this._framebuffer.attach(this._sourceTexture),this._framebuffer.attach(this._depthTexture,At.DEPTH_ATTACHMENT),this._normalPass=new dn,this._compositor=Sp(Bp);var e=this._compositor.getNodeByName("source");e.texture=this._sourceTexture;var t=this._compositor.getNodeByName("coc");this._sourceNode=e,this._cocNode=t,this._compositeNode=this._compositor.getNodeByName("composite"),this._fxaaNode=this._compositor.getNodeByName("FXAA"),this._dofBlurNodes=["dof_far_blur","dof_near_blur","dof_coc_blur"].map(function(i){return this._compositor.getNodeByName(i)},this),this._dofBlurKernel=0,this._dofBlurKernelSize=new Float32Array(0),this._finalNodesChain=Is.map(function(i){return this._compositor.getNodeByName(i)},this);var r={normalTexture:this._normalPass.getNormalTexture(),depthTexture:this._normalPass.getDepthTexture()};this._ssaoPass=new Ir(r),this._ssrPass=new Or(r),this._edgePass=new ea(r)}Ae.prototype.resize=function(i,n,r){r=r||1;var i=i*r,n=n*r,a=this._sourceTexture,o=this._depthTexture;a.width=i,a.height=n,o.width=i,o.height=n;var s={getWidth:function(){return i},getHeight:function(){return n},getDevicePixelRatio:function(){return r}};function l(h,u){if(typeof h[u]=="function"){var f=h[u].__original||h[u];h[u]=function(d){return f.call(this,s)},h[u].__original=f}}this._compositor.nodes.forEach(function(h){for(var u in h.outputs){var f=h.outputs[u].parameters;f&&(l(f,"width"),l(f,"height"))}for(var d in h.parameters)l(h.parameters,d)}),this._width=i,this._height=n,this._dpr=r};Ae.prototype.getWidth=function(){return this._width};Ae.prototype.getHeight=function(){return this._height};Ae.prototype._ifRenderNormalPass=function(){return this._enableSSAO||this._enableEdge||this._enableSSR};Ae.prototype._getPrevNode=function(e){for(var t=Is.indexOf(e.name)-1,r=this._finalNodesChain[t];r&&!this._compositor.getNodeByName(r.name);)t-=1,r=this._finalNodesChain[t];return r};Ae.prototype._getNextNode=function(e){for(var t=Is.indexOf(e.name)+1,r=this._finalNodesChain[t];r&&!this._compositor.getNodeByName(r.name);)t+=1,r=this._finalNodesChain[t];return r};Ae.prototype._addChainNode=function(e){var t=this._getPrevNode(e),r=this._getNextNode(e);t&&(e.inputs.texture=t.name,r?(e.outputs=zu(this.getWidth.bind(this),this.getHeight.bind(this)),r.inputs.texture=e.name):e.outputs=null,this._compositor.addNode(e))};Ae.prototype._removeChainNode=function(e){var t=this._getPrevNode(e),r=this._getNextNode(e);t&&(r?(t.outputs=zu(this.getWidth.bind(this),this.getHeight.bind(this)),r.inputs.texture=t.name):t.outputs=null,this._compositor.removeNode(e))};Ae.prototype.updateNormal=function(e,t,r,i){this._ifRenderNormalPass()&&this._normalPass.update(e,t,r)};Ae.prototype.updateSSAO=function(e,t,r,i){this._ssaoPass.update(e,r,i)};Ae.prototype.enableSSAO=function(){this._enableSSAO=!0};Ae.prototype.disableSSAO=function(){this._enableSSAO=!1};Ae.prototype.enableSSR=function(){this._enableSSR=!0};Ae.prototype.disableSSR=function(){this._enableSSR=!1};Ae.prototype.getSSAOTexture=function(){return this._ssaoPass.getTargetTexture()};Ae.prototype.getSourceFrameBuffer=function(){return this._framebuffer};Ae.prototype.getSourceTexture=function(){return this._sourceTexture};Ae.prototype.disableFXAA=function(){this._removeChainNode(this._fxaaNode)};Ae.prototype.enableFXAA=function(){this._addChainNode(this._fxaaNode)};Ae.prototype.enableBloom=function(){this._compositeNode.inputs.bloom="bloom_composite",this._compositor.dirty()};Ae.prototype.disableBloom=function(){this._compositeNode.inputs.bloom=null,this._compositor.dirty()};Ae.prototype.enableDOF=function(){this._compositeNode.inputs.texture="dof_composite",this._compositor.dirty()};Ae.prototype.disableDOF=function(){this._compositeNode.inputs.texture="source",this._compositor.dirty()};Ae.prototype.enableColorCorrection=function(){this._compositeNode.define("COLOR_CORRECTION"),this._enableColorCorrection=!0};Ae.prototype.disableColorCorrection=function(){this._compositeNode.undefine("COLOR_CORRECTION"),this._enableColorCorrection=!1};Ae.prototype.enableEdge=function(){this._enableEdge=!0};Ae.prototype.disableEdge=function(){this._enableEdge=!1};Ae.prototype.setBloomIntensity=function(e){this._compositeNode.setParameter("bloomIntensity",e)};Ae.prototype.setSSAOParameter=function(e,t){switch(e){case"quality":var r={low:6,medium:12,high:32,ultra:62}[t]||12;this._ssaoPass.setParameter("kernelSize",r);break;case"radius":this._ssaoPass.setParameter(e,t),this._ssaoPass.setParameter("bias",t/200);break;case"intensity":this._ssaoPass.setParameter(e,t);break}};Ae.prototype.setDOFParameter=function(e,t){switch(e){case"focalDistance":case"focalRange":case"fstop":this._cocNode.setParameter(e,t);break;case"blurRadius":for(var r=0;r<this._dofBlurNodes.length;r++)this._dofBlurNodes[r].setParameter("blurRadius",t);break;case"quality":var i={low:4,medium:8,high:16,ultra:32}[t]||8;this._dofBlurKernelSize=i;for(var r=0;r<this._dofBlurNodes.length;r++)this._dofBlurNodes[r].pass.material.define("POISSON_KERNEL_SIZE",i);this._dofBlurKernel=new Float32Array(i*2);break}};Ae.prototype.setSSRParameter=function(e,t){if(t!=null)switch(e){case"quality":var r={low:10,medium:15,high:30,ultra:80}[t]||20,i={low:32,medium:16,high:8,ultra:4}[t]||16;this._ssrPass.setParameter("maxIteration",r),this._ssrPass.setParameter("pixelStride",i);break;case"maxRoughness":this._ssrPass.setParameter("minGlossiness",Math.max(Math.min(1-t,1),0));break;case"physical":this.setPhysicallyCorrectSSR(t);break;default:console.warn("Unkown SSR parameter "+e)}};Ae.prototype.setPhysicallyCorrectSSR=function(e){this._ssrPass.setPhysicallyCorrect(e)};Ae.prototype.setEdgeColor=function(e){var t=b.parseColor(e);this._edgePass.setParameter("edgeColor",t)};Ae.prototype.setExposure=function(e){this._compositeNode.setParameter("exposure",Math.pow(2,e))};Ae.prototype.setColorLookupTexture=function(e,t){this._compositeNode.pass.material.setTextureImage("lut",this._enableColorCorrection?e:"none",t,{minFilter:b.Texture.NEAREST,magFilter:b.Texture.NEAREST,flipY:!1})};Ae.prototype.setColorCorrection=function(e,t){this._compositeNode.setParameter(e,t)};Ae.prototype.isSSREnabled=function(){return this._enableSSR};Ae.prototype.composite=function(e,t,r,i,n){var a=this._sourceTexture,o=a;this._enableEdge&&(this._edgePass.update(e,r,a,n),a=o=this._edgePass.getTargetTexture()),this._enableSSR&&(this._ssrPass.update(e,r,a,n),o=this._ssrPass.getTargetTexture(),this._ssrPass.setSSAOTexture(this._enableSSAO?this._ssaoPass.getTargetTexture():null)),this._sourceNode.texture=o,this._cocNode.setParameter("depth",this._depthTexture);for(var s=this._dofBlurKernel,l=this._dofBlurKernelSize,h=Math.floor(oh.length/2/l),u=n%h,f=0;f<l*2;f++)s[f]=oh[f+u*l*2];for(var f=0;f<this._dofBlurNodes.length;f++)this._dofBlurNodes[f].setParameter("percent",n/30),this._dofBlurNodes[f].setParameter("poissonKernel",s);this._cocNode.setParameter("zNear",r.near),this._cocNode.setParameter("zFar",r.far),this._compositor.render(e,i)};Ae.prototype.dispose=function(e){this._sourceTexture.dispose(e),this._depthTexture.dispose(e),this._framebuffer.dispose(e),this._compositor.dispose(e),this._normalPass.dispose(e),this._ssaoPass.dispose(e)};function cs(e){for(var t=[],r=0;r<30;r++)t.push([nn(r,2),nn(r,3)]);this._haltonSequence=t,this._frame=0,this._sourceTex=new ge,this._sourceFb=new At,this._sourceFb.attach(this._sourceTex),this._prevFrameTex=new ge,this._outputTex=new ge;var i=this._blendPass=new ct({fragment:G.source("clay.compositor.blend")});i.material.disableTexturesAll(),i.material.enableTexture(["texture1","texture2"]),this._blendFb=new At({depthBuffer:!1}),this._outputPass=new ct({fragment:G.source("clay.compositor.output"),blendWithPrevious:!0}),this._outputPass.material.define("fragment","OUTPUT_ALPHA"),this._outputPass.material.blend=function(n){n.blendEquationSeparate(n.FUNC_ADD,n.FUNC_ADD),n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA)}}cs.prototype={constructor:cs,jitterProjection:function(e,t){var r=e.viewport,i=r.devicePixelRatio||e.getDevicePixelRatio(),n=r.width*i,a=r.height*i,o=this._haltonSequence[this._frame%this._haltonSequence.length],s=new re;s.array[12]=(o[0]*2-1)/n,s.array[13]=(o[1]*2-1)/a,re.mul(t.projectionMatrix,s,t.projectionMatrix),re.invert(t.invProjectionMatrix,t.projectionMatrix)},resetFrame:function(){this._frame=0},getFrame:function(){return this._frame},getSourceFrameBuffer:function(){return this._sourceFb},getOutputTexture:function(){return this._outputTex},resize:function(e,t){this._prevFrameTex.width=e,this._prevFrameTex.height=t,this._outputTex.width=e,this._outputTex.height=t,this._sourceTex.width=e,this._sourceTex.height=t,this._prevFrameTex.dirty(),this._outputTex.dirty(),this._sourceTex.dirty()},isFinished:function(){return this._frame>=this._haltonSequence.length},render:function(e,t,r){var i=this._blendPass;this._frame===0?(i.setUniform("weight1",0),i.setUniform("weight2",1)):(i.setUniform("weight1",.9),i.setUniform("weight2",.1)),i.setUniform("texture1",this._prevFrameTex),i.setUniform("texture2",t||this._sourceTex),this._blendFb.attach(this._outputTex),this._blendFb.bind(e),i.render(e),this._blendFb.unbind(e),r||(this._outputPass.setUniform("texture",this._outputTex),this._outputPass.render(e));var n=this._prevFrameTex;this._prevFrameTex=this._outputTex,this._outputTex=n,this._frame++},dispose:function(e){this._sourceFb.dispose(e),this._blendFb.dispose(e),this._prevFrameTex.dispose(e),this._outputTex.dispose(e),this._sourceTex.dispose(e),this._outputPass.dispose(e),this._blendPass.dispose(e)}};function Fe(e){e=e||"perspective",this.layer=null,this.scene=new li,this.rootNode=this.scene,this.viewport={x:0,y:0,width:0,height:0},this.setProjection(e),this._compositor=new Ae,this._temporalSS=new cs,this._shadowMapPass=new sp;for(var t=[],r=0,i=0;i<30;i++){for(var n=[],a=0;a<6;a++)n.push(nn(r,2)*4-2),n.push(nn(r,3)*4-2),r++;t.push(n)}this._pcfKernels=t,this.scene.on("beforerender",function(o,s,l){this.needsTemporalSS()&&this._temporalSS.jitterProjection(o,l)},this)}Fe.prototype.setProjection=function(e){var t=this.camera;t&&t.update(),e==="perspective"?this.camera instanceof xt||(this.camera=new xt,t&&this.camera.setLocalTransform(t.localTransform)):this.camera instanceof rn||(this.camera=new rn,t&&this.camera.setLocalTransform(t.localTransform)),this.camera.near=.1,this.camera.far=2e3};Fe.prototype.setViewport=function(e,t,r,i,n){this.camera instanceof xt&&(this.camera.aspect=r/i),n=n||1,this.viewport.x=e,this.viewport.y=t,this.viewport.width=r,this.viewport.height=i,this.viewport.devicePixelRatio=n,this._compositor.resize(r*n,i*n),this._temporalSS.resize(r*n,i*n)};Fe.prototype.containPoint=function(e,t){var r=this.viewport,i=this.layer.renderer.getHeight();return t=i-t,e>=r.x&&t>=r.y&&e<=r.x+r.width&&t<=r.y+r.height};var sh=new Vt;Fe.prototype.castRay=function(e,t,r){var i=this.layer.renderer,n=i.viewport;return i.viewport=this.viewport,i.screenToNDC(e,t,sh),this.camera.castRay(sh,r),i.viewport=n,r};Fe.prototype.prepareRender=function(){this.scene.update(),this.camera.update(),this.scene.updateLights();var e=this.scene.updateRenderList(this.camera);this._needsSortProgressively=!1;for(var t=0;t<e.transparent.length;t++){var r=e.transparent[t],i=r.geometry;i.needsSortVerticesProgressively&&i.needsSortVerticesProgressively()&&(this._needsSortProgressively=!0),i.needsSortTrianglesProgressively&&i.needsSortTrianglesProgressively()&&(this._needsSortProgressively=!0)}this._frame=0,this._temporalSS.resetFrame()};Fe.prototype.render=function(e,t){this._doRender(e,t,this._frame),this._frame++};Fe.prototype.needsAccumulate=function(){return this.needsTemporalSS()||this._needsSortProgressively};Fe.prototype.needsTemporalSS=function(){var e=this._enableTemporalSS;return e==="auto"&&(e=this._enablePostEffect),e};Fe.prototype.hasDOF=function(){return this._enableDOF};Fe.prototype.isAccumulateFinished=function(){return this.needsTemporalSS()?this._temporalSS.isFinished():this._frame>30};Fe.prototype._doRender=function(e,t,r){var i=this.scene,n=this.camera;r=r||0,this._updateTransparent(e,i,n,r),t||(this._shadowMapPass.kernelPCF=this._pcfKernels[0],this._shadowMapPass.render(e,i,n,!0)),this._updateShadowPCFKernel(r);var a=e.clearColor;if(e.gl.clearColor(a[0],a[1],a[2],a[3]),this._enablePostEffect&&(this.needsTemporalSS()&&this._temporalSS.jitterProjection(e,n),this._compositor.updateNormal(e,i,n,this._temporalSS.getFrame())),this._updateSSAO(e,i,n,this._temporalSS.getFrame()),this._enablePostEffect){var o=this._compositor.getSourceFrameBuffer();o.bind(e),e.gl.clear(e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT),e.render(i,n,!0,!0),o.unbind(e),this.needsTemporalSS()&&t?(this._compositor.composite(e,i,n,this._temporalSS.getSourceFrameBuffer(),this._temporalSS.getFrame()),e.setViewport(this.viewport),this._temporalSS.render(e)):(e.setViewport(this.viewport),this._compositor.composite(e,i,n,null,0))}else if(this.needsTemporalSS()&&t){var o=this._temporalSS.getSourceFrameBuffer();o.bind(e),e.saveClear(),e.clearBit=e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT,e.render(i,n,!0,!0),e.restoreClear(),o.unbind(e),e.setViewport(this.viewport),this._temporalSS.render(e)}else e.setViewport(this.viewport),e.render(i,n,!0,!0)};Fe.prototype._updateTransparent=function(e,t,r,i){for(var n=new Z,a=new re,o=r.getWorldPosition(),s=t.getRenderList(r).transparent,l=0;l<s.length;l++){var h=s[l],u=h.geometry;re.invert(a,h.worldTransform),Z.transformMat4(n,o,a),u.needsSortTriangles&&u.needsSortTriangles()&&u.doSortTriangles(n,i),u.needsSortVertices&&u.needsSortVertices()&&u.doSortVertices(n,i)}};Fe.prototype._updateSSAO=function(e,t,r){var i=this._enableSSAO&&this._enablePostEffect;i&&this._compositor.updateSSAO(e,t,r,this._temporalSS.getFrame());for(var n=t.getRenderList(r),a=0;a<n.opaque.length;a++){var o=n.opaque[a];o.renderNormal&&o.material[i?"enableTexture":"disableTexture"]("ssaoMap"),i&&o.material.set("ssaoMap",this._compositor.getSSAOTexture())}};Fe.prototype._updateShadowPCFKernel=function(e){for(var t=this._pcfKernels[e%this._pcfKernels.length],r=this.scene.getRenderList(this.camera),i=r.opaque,n=0;n<i.length;n++)i[n].receiveShadow&&(i[n].material.set("pcfKernel",t),i[n].material.define("fragment","PCF_KERNEL_SIZE",t.length/2))};Fe.prototype.dispose=function(e){this._compositor.dispose(e.gl),this._temporalSS.dispose(e.gl),this._shadowMapPass.dispose(e)};Fe.prototype.setPostEffect=function(e,t){var r=this._compositor;this._enablePostEffect=e.get("enable");var i=e.getModel("bloom"),n=e.getModel("edge"),a=e.getModel("DOF",e.getModel("depthOfField")),o=e.getModel("SSAO",e.getModel("screenSpaceAmbientOcclusion")),s=e.getModel("SSR",e.getModel("screenSpaceReflection")),l=e.getModel("FXAA"),h=e.getModel("colorCorrection");i.get("enable")?r.enableBloom():r.disableBloom(),a.get("enable")?r.enableDOF():r.disableDOF(),s.get("enable")?r.enableSSR():r.disableSSR(),h.get("enable")?r.enableColorCorrection():r.disableColorCorrection(),n.get("enable")?r.enableEdge():r.disableEdge(),l.get("enable")?r.enableFXAA():r.disableFXAA(),this._enableDOF=a.get("enable"),this._enableSSAO=o.get("enable"),this._enableSSAO?r.enableSSAO():r.disableSSAO(),r.setBloomIntensity(i.get("intensity")),r.setEdgeColor(n.get("color")),r.setColorLookupTexture(h.get("lookupTexture"),t),r.setExposure(h.get("exposure")),["radius","quality","intensity"].forEach(function(u){r.setSSAOParameter(u,o.get(u))}),["quality","maxRoughness","physical"].forEach(function(u){r.setSSRParameter(u,s.get(u))}),["quality","focalDistance","focalRange","blurRadius","fstop"].forEach(function(u){r.setDOFParameter(u,a.get(u))}),["brightness","contrast","saturation"].forEach(function(u){r.setColorCorrection(u,h.get(u))})};Fe.prototype.setDOFFocusOnPoint=function(e){if(this._enablePostEffect)return e>this.camera.far||e<this.camera.near?void 0:(this._compositor.setDOFParameter("focalDistance",e),!0)};Fe.prototype.setTemporalSuperSampling=function(e){this._enableTemporalSS=e.get("enable")};Fe.prototype.isLinearSpace=function(){return this._enablePostEffect};Fe.prototype.setRootNode=function(e){if(this.rootNode!==e){for(var t=this.rootNode.children(),r=0;r<t.length;r++)e.add(t[r]);e!==this.scene&&this.scene.add(e),this.rootNode=e}};Fe.prototype.add=function(e){this.rootNode.add(e)};Fe.prototype.remove=function(e){this.rootNode.remove(e)};Fe.prototype.removeAll=function(e){this.rootNode.removeAll(e)};Object.assign(Fe.prototype,bs);function zp(e,t){var r=e.getBoxLayoutParams(),i=$n(r,{width:t.getWidth(),height:t.getHeight()});i.y=t.getHeight()-i.y-i.height,this.viewGL.setViewport(i.x,i.y,i.width,i.height,t.getDevicePixelRatio());var n=e.get("boxWidth"),a=e.get("boxHeight"),o=e.get("boxDepth");this.getAxis("x").setExtent(-n/2,n/2),this.getAxis("y").setExtent(o/2,-o/2),this.getAxis("z").setExtent(-a/2,a/2),this.size=[n,a,o]}function Gp(e,t){var r={};function i(n,a){r[n]=r[n]||[1/0,-1/0],r[n][0]=Math.min(a[0],r[n][0]),r[n][1]=Math.max(a[1],r[n][1])}e.eachSeries(function(n){if(n.coordinateSystem===this){var a=n.getData();["x","y","z"].forEach(function(o){a.mapDimensionsAll(o,!0).forEach(function(s){i(o,a.getDataExtent(s,!0))})})}},this),["xAxis3D","yAxis3D","zAxis3D"].forEach(function(n){e.eachComponent(n,function(a){var o=n.charAt(0),s=a.getReferringComponents("grid3D").models[0],l=s.coordinateSystem;if(l===this){var h=l.getAxis(o);if(!h){var u=ws(r[o]||[1/0,-1/0],a);h=new ja(o,u),h.type=a.get("type");var f=h.type==="category";h.onBand=f&&a.get("boundaryGap"),h.inverse=a.get("inverse"),a.axis=h,h.model=a,h.getLabelModel=function(){return a.getModel("axisLabel",s.getModel("axisLabel"))},h.getTickModel=function(){return a.getModel("axisTick",s.getModel("axisTick"))},l.addAxis(h)}}},this)},this),this.resize(this.model,t)}var kp={dimensions:kn.prototype.dimensions,create:function(e,t){var r=[];e.eachComponent("grid3D",function(a){a.__viewGL=a.__viewGL||new Fe;var o=new kn;o.model=a,o.viewGL=a.__viewGL,a.coordinateSystem=o,r.push(o),o.resize=zp,o.update=Gp});var i=["xAxis3D","yAxis3D","zAxis3D"];function n(a,o){return i.map(function(s){var l=a.getReferringComponents(s).models[0];return l==null&&(l=o.getComponent(s)),l})}return e.eachSeries(function(a){if(a.get("coordinateSystem")==="cartesian3D"){var o=a.getReferringComponents("grid3D").models[0];if(o==null){var s=n(a,e),o=s[0].getCoordSysModel();s.forEach(function(u){u.getCoordSysModel()})}var l=o.coordinateSystem;a.coordinateSystem=l}}),r}};const Hp=kp;var Gu=ln.extend({type:"cartesian3DAxis",axis:null,getCoordSysModel:function(){return this.ecModel.queryComponents({mainType:"grid3D",index:this.option.gridIndex,id:this.option.gridId})[0]}});_c(Gu);const Vp=Gu;var ku={show:!0,grid3DIndex:0,inverse:!1,name:"",nameLocation:"middle",nameTextStyle:{fontSize:16},nameGap:20,axisPointer:{},axisLine:{},axisTick:{},axisLabel:{},splitArea:{}},Wp=Be({boundaryGap:!0,axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"},axisPointer:{label:{show:!1}}},ku),Os=Be({boundaryGap:[0,0],splitNumber:5,axisPointer:{label:{}}},ku),Xp=si({scale:!0,min:"dataMin",max:"dataMax"},Os),Hu=si({logBase:10},Os);Hu.scale=!0;const jp={categoryAxis3D:Wp,valueAxis3D:Os,timeAxis3D:Xp,logAxis3D:Hu};var Zp=["value","category","time","log"];function qp(e,t,r,i,n){Zp.forEach(function(a){var o=r.extend({type:t+"Axis3D."+a,__ordinalMeta:null,mergeDefaultAndTheme:function(s,l){var h=l.getTheme();Be(s,h.get(a+"Axis3D")),Be(s,this.getDefaultOption()),s.type=i(t,s)},optionUpdated:function(){var s=this.option;s.type==="category"&&(this.__ordinalMeta=jf.createByAxisModel(this))},getCategories:function(){if(this.option.type==="category")return this.__ordinalMeta.categories},getOrdinalMeta:function(){return this.__ordinalMeta},defaultOption:Be(Zf(jp[a+"Axis3D"]),n||{},!0)});e.registerComponentModel(o)}),e.registerSubTypeDefaulter(t+"Axis3D",qf(i,t))}function Yp(e,t){return t.type||(t.data?"category":"value")}function Kp(e){e.registerComponentModel($v),e.registerComponentView(ip),e.registerCoordinateSystem("grid3D",Hp),["x","y","z"].forEach(function(t){qp(e,t,Vp,Yp,{name:t.toUpperCase()});const r=e.ComponentView.extend({type:t+"Axis3D"});e.registerComponentView(r)}),e.registerAction({type:"grid3DChangeCamera",event:"grid3dcamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"grid3D",query:t},function(i){i.setView(t)})}),e.registerAction({type:"grid3DShowAxisPointer",event:"grid3dshowaxispointer",update:"grid3D:showAxisPointer"},function(t,r){}),e.registerAction({type:"grid3DHideAxisPointer",event:"grid3dhideaxispointer",update:"grid3D:hideAxisPointer"},function(t,r){})}Ct(Kp);const vn={defaultOption:{shading:null,realisticMaterial:{textureTiling:1,textureOffset:0,detailTexture:null},lambertMaterial:{textureTiling:1,textureOffset:0,detailTexture:null},colorMaterial:{textureTiling:1,textureOffset:0,detailTexture:null},hatchingMaterial:{textureTiling:1,textureOffset:0,paperColor:"#fff"}}},Vu={getFilledRegions:function(e,t){var r=(e||[]).slice(),i;if(typeof t=="string"?(t=ts(t),i=t&&t.geoJson):t&&t.features&&(i=t),!i)return[];for(var n={},a=i.features,o=0;o<r.length;o++)n[r[o].name]=r[o];for(var o=0;o<a.length;o++){var s=a[o].properties.name;n[s]||r.push({name:s})}return r},defaultOption:{show:!0,zlevel:-10,map:"",left:0,top:0,width:"100%",height:"100%",boxWidth:100,boxHeight:10,boxDepth:"auto",regionHeight:3,environment:"auto",groundPlane:{show:!1,color:"#aaa"},shading:"lambert",light:{main:{alpha:40,beta:30}},viewControl:{alpha:40,beta:0,distance:100,orthographicSize:60,minAlpha:5,minBeta:-80,maxBeta:80},label:{show:!1,distance:2,textStyle:{fontSize:20,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:4}},itemStyle:{color:"#fff",borderWidth:0,borderColor:"#333"},emphasis:{itemStyle:{color:"#639fc0"},label:{show:!0}}}};var pn=ln.extend({type:"geo3D",layoutMode:"box",coordinateSystem:null,optionUpdated:function(){var e=this.option;e.regions=this.getFilledRegions(e.regions,e.map);var t=hn(e.data||[],{coordDimensions:["value"],encodeDefine:this.get("encode"),dimensionsDefine:this.get("dimensions")}),r=new fr(t,this);r.initData(e.regions);var i={};r.each(function(n){var a=r.getName(n),o=r.getItemModel(n);i[a]=o}),this._regionModelMap=i,this._data=r},getData:function(){return this._data},getRegionModel:function(e){var t=this.getData().getName(e);return this._regionModelMap[t]||new Qi(null,this)},getRegionPolygonCoords:function(e){var t=this.getData().getName(e),r=this.coordinateSystem.getRegion(t);return r?r.geometries:[]},getFormattedLabel:function(e,t){var r=this._data.getName(e),i=this.getRegionModel(e),n=i.get(t==="normal"?["label","formatter"]:["emphasis","label","formatter"]);n==null&&(n=i.get(["label","formatter"]));var a={name:r};if(typeof n=="function")return a.status=t,n(a);if(typeof n=="string"){var o=a.seriesName;return n.replace("{a}",o??"")}else return r},defaultOption:{regions:[]}});Be(pn.prototype,Vu);Be(pn.prototype,no);Be(pn.prototype,fn);Be(pn.prototype,cn);Be(pn.prototype,vn);const $p=pn;function Wu(e,t,r){r=r||2;var i=t&&t.length,n=i?t[0]*r:e.length,a=Xu(e,0,n,r,!0),o=[];if(!a)return o;var s,l,h,u,f,d,c;if(i&&(a=rm(e,t,a,r)),e.length>80*r){s=h=e[0],l=u=e[1];for(var v=r;v<n;v+=r)f=e[v],d=e[v+1],f<s&&(s=f),d<l&&(l=d),f>h&&(h=f),d>u&&(u=d);c=Math.max(h-s,u-l)}return Wn(a,o,r,s,l,c),o}function Xu(e,t,r,i,n){var a,o;if(n===ps(e,t,r,i)>0)for(a=t;a<r;a+=i)o=lh(a,e[a],e[a+1],o);else for(a=r-i;a>=t;a-=i)o=lh(a,e[a],e[a+1],o);return o&&Si(o,o.next)&&(jn(o),o=o.next),o}function Vn(e,t){if(!e)return e;t||(t=e);var r=e,i;do if(i=!1,!r.steiner&&(Si(r,r.next)||It(r.prev,r,r.next)===0)){if(jn(r),r=t=r.prev,r===r.next)return null;i=!0}else r=r.next;while(i||r!==t);return t}function Wn(e,t,r,i,n,a,o){if(e){!o&&a&&om(e,i,n,a);for(var s=e,l,h;e.prev!==e.next;){if(l=e.prev,h=e.next,a?Jp(e,i,n,a):Qp(e)){t.push(l.i/r),t.push(e.i/r),t.push(h.i/r),jn(e),e=h.next,s=h.next;continue}if(e=h,e===s){o?o===1?(e=em(e,t,r),Wn(e,t,r,i,n,a,2)):o===2&&tm(e,t,r,i,n,a):Wn(Vn(e),t,r,i,n,a,1);break}}}}function Qp(e){var t=e.prev,r=e,i=e.next;if(It(t,r,i)>=0)return!1;for(var n=e.next.next;n!==e.prev;){if(Za(t.x,t.y,r.x,r.y,i.x,i.y,n.x,n.y)&&It(n.prev,n,n.next)>=0)return!1;n=n.next}return!0}function Jp(e,t,r,i){var n=e.prev,a=e,o=e.next;if(It(n,a,o)>=0)return!1;for(var s=n.x<a.x?n.x<o.x?n.x:o.x:a.x<o.x?a.x:o.x,l=n.y<a.y?n.y<o.y?n.y:o.y:a.y<o.y?a.y:o.y,h=n.x>a.x?n.x>o.x?n.x:o.x:a.x>o.x?a.x:o.x,u=n.y>a.y?n.y>o.y?n.y:o.y:a.y>o.y?a.y:o.y,f=ds(s,l,t,r,i),d=ds(h,u,t,r,i),c=e.nextZ;c&&c.z<=d;){if(c!==e.prev&&c!==e.next&&Za(n.x,n.y,a.x,a.y,o.x,o.y,c.x,c.y)&&It(c.prev,c,c.next)>=0)return!1;c=c.nextZ}for(c=e.prevZ;c&&c.z>=f;){if(c!==e.prev&&c!==e.next&&Za(n.x,n.y,a.x,a.y,o.x,o.y,c.x,c.y)&&It(c.prev,c,c.next)>=0)return!1;c=c.prevZ}return!0}function em(e,t,r){var i=e;do{var n=i.prev,a=i.next.next;!Si(n,a)&&ju(n,i,i.next,a)&&Xn(n,a)&&Xn(a,n)&&(t.push(n.i/r),t.push(i.i/r),t.push(a.i/r),jn(i),jn(i.next),i=e=a),i=i.next}while(i!==e);return i}function tm(e,t,r,i,n,a){var o=e;do{for(var s=o.next.next;s!==o.prev;){if(o.i!==s.i&&hm(o,s)){var l=Zu(o,s);o=Vn(o,o.next),l=Vn(l,l.next),Wn(o,t,r,i,n,a),Wn(l,t,r,i,n,a);return}s=s.next}o=o.next}while(o!==e)}function rm(e,t,r,i){var n=[],a,o,s,l,h;for(a=0,o=t.length;a<o;a++)s=t[a]*i,l=a<o-1?t[a+1]*i:e.length,h=Xu(e,s,l,i,!1),h===h.next&&(h.steiner=!0),n.push(lm(h));for(n.sort(im),a=0;a<n.length;a++)nm(n[a],r),r=Vn(r,r.next);return r}function im(e,t){return e.x-t.x}function nm(e,t){if(t=am(e,t),t){var r=Zu(t,e);Vn(r,r.next)}}function am(e,t){var r=t,i=e.x,n=e.y,a=-1/0,o;do{if(n<=r.y&&n>=r.next.y&&r.next.y!==r.y){var s=r.x+(n-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(s<=i&&s>a){if(a=s,s===i){if(n===r.y)return r;if(n===r.next.y)return r.next}o=r.x<r.next.x?r:r.next}}r=r.next}while(r!==t);if(!o)return null;if(i===a)return o.prev;var l=o,h=o.x,u=o.y,f=1/0,d;for(r=o.next;r!==l;)i>=r.x&&r.x>=h&&i!==r.x&&Za(n<u?i:a,n,h,u,n<u?a:i,n,r.x,r.y)&&(d=Math.abs(n-r.y)/(i-r.x),(d<f||d===f&&r.x>o.x)&&Xn(r,e)&&(o=r,f=d)),r=r.next;return o}function om(e,t,r,i){var n=e;do n.z===null&&(n.z=ds(n.x,n.y,t,r,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==e);n.prevZ.nextZ=null,n.prevZ=null,sm(n)}function sm(e){var t,r,i,n,a,o,s,l,h=1;do{for(r=e,e=null,a=null,o=0;r;){for(o++,i=r,s=0,t=0;t<h&&(s++,i=i.nextZ,!!i);t++);for(l=h;s>0||l>0&&i;)s!==0&&(l===0||!i||r.z<=i.z)?(n=r,r=r.nextZ,s--):(n=i,i=i.nextZ,l--),a?a.nextZ=n:e=n,n.prevZ=a,a=n;r=i}a.nextZ=null,h*=2}while(o>1);return e}function ds(e,t,r,i,n){return e=32767*(e-r)/n,t=32767*(t-i)/n,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function lm(e){var t=e,r=e;do t.x<r.x&&(r=t),t=t.next;while(t!==e);return r}function Za(e,t,r,i,n,a,o,s){return(n-o)*(t-s)-(e-o)*(a-s)>=0&&(e-o)*(i-s)-(r-o)*(t-s)>=0&&(r-o)*(a-s)-(n-o)*(i-s)>=0}function hm(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!um(e,t)&&Xn(e,t)&&Xn(t,e)&&fm(e,t)}function It(e,t,r){return(t.y-e.y)*(r.x-t.x)-(t.x-e.x)*(r.y-t.y)}function Si(e,t){return e.x===t.x&&e.y===t.y}function ju(e,t,r,i){return Si(e,t)&&Si(r,i)||Si(e,i)&&Si(r,t)?!0:It(e,t,r)>0!=It(e,t,i)>0&&It(r,i,e)>0!=It(r,i,t)>0}function um(e,t){var r=e;do{if(r.i!==e.i&&r.next.i!==e.i&&r.i!==t.i&&r.next.i!==t.i&&ju(r,r.next,e,t))return!0;r=r.next}while(r!==e);return!1}function Xn(e,t){return It(e.prev,e,e.next)<0?It(e,t,e.next)>=0&&It(e,e.prev,t)>=0:It(e,t,e.prev)<0||It(e,e.next,t)<0}function fm(e,t){var r=e,i=!1,n=(e.x+t.x)/2,a=(e.y+t.y)/2;do r.y>a!=r.next.y>a&&r.next.y!==r.y&&n<(r.next.x-r.x)*(a-r.y)/(r.next.y-r.y)+r.x&&(i=!i),r=r.next;while(r!==e);return i}function Zu(e,t){var r=new vs(e.i,e.x,e.y),i=new vs(t.i,t.x,t.y),n=e.next,a=t.prev;return e.next=t,t.prev=e,r.next=n,n.prev=r,i.next=r,r.prev=i,a.next=i,i.prev=a,i}function lh(e,t,r,i){var n=new vs(e,t,r);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function jn(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function vs(e,t,r){this.i=e,this.x=t,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}Wu.deviation=function(e,t,r,i){var n=t&&t.length,a=n?t[0]*r:e.length,o=Math.abs(ps(e,0,a,r));if(n)for(var s=0,l=t.length;s<l;s++){var h=t[s]*r,u=s<l-1?t[s+1]*r:e.length;o-=Math.abs(ps(e,h,u,r))}var f=0;for(s=0;s<i.length;s+=3){var d=i[s]*r,c=i[s+1]*r,v=i[s+2]*r;f+=Math.abs((e[d]-e[v])*(e[c+1]-e[d+1])-(e[d]-e[c])*(e[v+1]-e[d+1]))}return o===0&&f===0?0:Math.abs((f-o)/o)};function ps(e,t,r,i){for(var n=0,a=t,o=r-i;a<r;a+=i)n+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return n}function jo(e,t,r){var i=e[t];e[t]=e[r],e[r]=i}function qu(e,t,r,i,n){var a=r,o=e[t];jo(e,t,i);for(var s=r;s<i;s++)n(e[s],o)<0&&(jo(e,s,a),a++);return jo(e,i,a),a}function qa(e,t,r,i){if(r<i){var n=Math.floor((r+i)/2),a=qu(e,n,r,i,t);qa(e,t,r,a-1),qa(e,t,a+1,i)}}function an(){this._parts=[]}an.prototype.step=function(e,t,r){var i=e.length;if(r===0){this._parts=[],this._sorted=!1;var n=Math.floor(i/2);this._parts.push({pivot:n,left:0,right:i-1}),this._currentSortPartIdx=0}if(!this._sorted){var a=this._parts;if(a.length===0)return this._sorted=!0,!0;if(a.length<512){for(var o=0;o<a.length;o++)a[o].pivot=qu(e,a[o].pivot,a[o].left,a[o].right,t);for(var s=[],o=0;o<a.length;o++){var l=a[o].left,h=a[o].pivot-1;h>l&&s.push({pivot:Math.floor((h+l)/2),left:l,right:h});var l=a[o].pivot+1,h=a[o].right;h>l&&s.push({pivot:Math.floor((h+l)/2),left:l,right:h})}a=this._parts=s}else for(var o=0;o<Math.floor(a.length/10);o++){var u=a.length-1-this._currentSortPartIdx;if(qa(e,t,a[u].left,a[u].right),this._currentSortPartIdx++,this._currentSortPartIdx===a.length)return this._sorted=!0,!0}return!1}};an.sort=qa;var $i=ht.vec3,hh=$i.create(),uh=$i.create(),fh=$i.create();const Bs={needsSortTriangles:function(){return this.indices&&this.sortTriangles},needsSortTrianglesProgressively:function(){return this.needsSortTriangles()&&this.triangleCount>=2e4},doSortTriangles:function(e,t){var r=this.indices;if(t===0){var i=this.attributes.position,e=e.array;(!this._triangleZList||this._triangleZList.length!==this.triangleCount)&&(this._triangleZList=new Float32Array(this.triangleCount),this._sortedTriangleIndices=new Uint32Array(this.triangleCount),this._indicesTmp=new r.constructor(r.length),this._triangleZListTmp=new Float32Array(this.triangleCount));for(var n=0,a,o=0;o<r.length;){i.get(r[o++],hh),i.get(r[o++],uh),i.get(r[o++],fh);var s=$i.sqrDist(hh,e),l=$i.sqrDist(uh,e),h=$i.sqrDist(fh,e),u=Math.min(s,l);u=Math.min(u,h),o===3?(a=u,u=0):u=u-a,this._triangleZList[n++]=u}}for(var f=this._sortedTriangleIndices,o=0;o<f.length;o++)f[o]=o;if(this.triangleCount<2e4)t===0&&this._simpleSort(!0);else for(var o=0;o<3;o++)this._progressiveQuickSort(t*3+o);for(var d=this._indicesTmp,c=this._triangleZListTmp,v=this._triangleZList,o=0;o<this.triangleCount;o++){var p=f[o]*3,g=o*3;d[g++]=r[p++],d[g++]=r[p++],d[g]=r[p],c[o]=v[f[o]]}var m=this._indicesTmp;this._indicesTmp=this.indices,this.indices=m;var m=this._triangleZListTmp;this._triangleZListTmp=this._triangleZList,this._triangleZList=m,this.dirtyIndices()},_simpleSort:function(e){var t=this._triangleZList,r=this._sortedTriangleIndices;function i(n,a){return t[a]-t[n]}e?Array.prototype.sort.call(r,i):an.sort(r,i,0,r.length-1)},_progressiveQuickSort:function(e){var t=this._triangleZList,r=this._sortedTriangleIndices;this._quickSort=this._quickSort||new an,this._quickSort.step(r,function(i,n){return t[n]-t[i]},e)}};function cm(e){const t=e.getVisual("style");if(t){const r=e.getVisual("drawType");return t[r]}}function dm(e){return e.getVisual("style").opacity}function wt(e,t){const r=e.getItemVisual(t,"style");if(r){const i=e.getVisual("drawType");return r[i]}}function Tt(e,t){const r=e.getItemVisual(t,"style");return r&&r.opacity}var Yu=1,Ku=2;function Br(e,t,r){this._labelsMesh=new Ps,this._labelTextureSurface=new Xa({width:512,height:512,devicePixelRatio:r.getDevicePixelRatio(),onupdate:function(){r.getZr().refresh()}}),this._api=r,this._labelsMesh.material.set("textureAtlas",this._labelTextureSurface.getTexture())}Br.prototype.getLabelPosition=function(e,t,r){return[0,0,0]};Br.prototype.getLabelDistance=function(e,t,r){return 0};Br.prototype.getMesh=function(){return this._labelsMesh};Br.prototype.updateData=function(e,t,r){t==null&&(t=0),r==null&&(r=e.count()),(!this._labelsVisibilitiesBits||this._labelsVisibilitiesBits.length!==r-t)&&(this._labelsVisibilitiesBits=new Uint8Array(r-t));for(var i=["label","show"],n=["emphasis","label","show"],a=t;a<r;a++){var o=e.getItemModel(a),s=o.get(i),l=o.get(n);l==null&&(l=s);var h=(s?Yu:0)|(l?Ku:0);this._labelsVisibilitiesBits[a-t]=h}this._start=t,this._end=r,this._data=e};Br.prototype.updateLabels=function(e){if(this._data){e=e||[];for(var t=e.length>0,r={},i=0;i<e.length;i++)r[e[i]]=!0;this._labelsMesh.geometry.convertToDynamicArray(!0),this._labelTextureSurface.clear();for(var n=["label"],a=["emphasis","label"],o=this._data.hostModel,s=this._data,l=o.getModel(n),h=o.getModel(a,l),u={left:"right",right:"left",top:"center",bottom:"center"},f={left:"middle",right:"middle",top:"bottom",bottom:"top"},d=this._start;d<this._end;d++){var c=!1;t&&r[d]&&(c=!0);var v=this._labelsVisibilitiesBits[d-this._start]&(c?Ku:Yu);if(v){var p=s.getItemModel(d),g=p.getModel(c?a:n,c?h:l),m=g.get("distance")||0,_=g.get("position"),x=this._api.getDevicePixelRatio(),y=o.getFormattedLabel(d,c?"emphasis":"normal");if(y==null||y==="")return;var T=new Fn({style:Bn(g,{text:y,fill:g.get("color")||wt(s,d)||"#000",align:"left",verticalAlign:"top",opacity:xe.firstNotNull(g.get("opacity"),Tt(s,d),1)})}),w=T.getBoundingRect(),E=1.2;w.height*=E;var S=this._labelTextureSurface.add(T),D=u[_]||"center",M=f[_]||"bottom";this._labelsMesh.geometry.addSprite(this.getLabelPosition(d,_,m),[w.width*x,w.height*x],S,D,M,this.getLabelDistance(d,_,m)*x)}}this._labelsMesh.material.set("uvScale",this._labelTextureSurface.getCoordsScale()),this._labelTextureSurface.getZr().refreshImmediately(),this._labelsMesh.geometry.convertToTypedArray(),this._labelsMesh.geometry.dirty()}};Br.prototype.dispose=function(){this._labelTextureSurface.dispose()};var Ut=ht.vec3;b.Shader.import(lo);function on(e){this.rootNode=new b.Node,this._triangulationResults={},this._shadersMap=b.COMMON_SHADERS.filter(function(r){return r!=="shadow"}).reduce(function(r,i){return r[i]=b.createShader("ecgl."+i),r},{}),this._linesShader=b.createShader("ecgl.meshLines3D");var t={};b.COMMON_SHADERS.forEach(function(r){t[r]=new b.Material({shader:b.createShader("ecgl."+r)})}),this._groundMaterials=t,this._groundMesh=new b.Mesh({geometry:new b.PlaneGeometry({dynamic:!0}),castShadow:!1,renderNormal:!0,$ignorePicking:!0}),this._groundMesh.rotation.rotateX(-Math.PI/2),this._labelsBuilder=new Br(512,512,e),this._labelsBuilder.getMesh().renderOrder=100,this._labelsBuilder.getMesh().material.depthTest=!1,this.rootNode.add(this._labelsBuilder.getMesh()),this._initMeshes(),this._api=e}on.prototype={constructor:on,extrudeY:!0,update:function(e,t,r,i,n){var a=e.getData();i==null&&(i=0),n==null&&(n=a.count()),this._startIndex=i,this._endIndex=n-1,this._triangulation(e,i,n);var o=this._getShader(e.get("shading"));this._prepareMesh(e,o,r,i,n),this.rootNode.updateWorldTransform(),this._updateRegionMesh(e,r,i,n);var s=e.coordinateSystem;s.type==="geo3D"&&this._updateGroundPlane(e,s,r);var l=this;this._labelsBuilder.updateData(a,i,n),this._labelsBuilder.getLabelPosition=function(h,u,f){var d=a.getName(h),c,v=f;if(s.type==="geo3D"){var p=s.getRegion(d);if(!p)return[NaN,NaN,NaN];c=p.getCenter();var g=s.dataToPoint([c[0],c[1],v]);return g}else var m=l._triangulationResults[h-l._startIndex],c=l.extrudeY?[(m.max[0]+m.min[0])/2,m.max[1]+v,(m.max[2]+m.min[2])/2]:[(m.max[0]+m.min[0])/2,(m.max[1]+m.min[1])/2,m.max[2]+v]},this._data=a,this._labelsBuilder.updateLabels(),this._updateDebugWireframe(e),this._lastHoverDataIndex=0},_initMeshes:function(){var e=this;function t(){var n=new b.Mesh({name:"Polygon",material:new b.Material({shader:e._shadersMap.lambert}),geometry:new b.Geometry({sortTriangles:!0,dynamic:!0}),culling:!1,ignorePicking:!0,renderNormal:!0});return Object.assign(n.geometry,Bs),n}var r=t(),i=new b.Mesh({material:new b.Material({shader:this._linesShader}),castShadow:!1,ignorePicking:!0,$ignorePicking:!0,geometry:new Ii({useNativeLine:!1})});this.rootNode.add(r),this.rootNode.add(i),r.material.define("both","VERTEX_COLOR"),r.material.define("fragment","DOUBLE_SIDED"),this._polygonMesh=r,this._linesMesh=i,this.rootNode.add(this._groundMesh)},_getShader:function(e){var t=this._shadersMap[e];return t||(t=this._shadersMap.lambert),t.__shading=e,t},_prepareMesh:function(e,t,r,i,n){for(var a=0,o=0,s=0,l=0,h=i;h<n;h++){var u=this._getRegionPolygonInfo(h),f=this._getRegionLinesInfo(h,e,this._linesMesh.geometry);a+=u.vertexCount,o+=u.triangleCount,s+=f.vertexCount,l+=f.triangleCount}var d=this._polygonMesh,c=d.geometry;["position","normal","texcoord0","color"].forEach(function(v){c.attributes[v].init(a)}),c.indices=a>65535?new Uint32Array(o*3):new Uint16Array(o*3),d.material.shader!==t&&d.material.attachShader(t,!0),b.setMaterialFromModel(t.__shading,d.material,e,r),s>0&&(this._linesMesh.geometry.resetOffset(),this._linesMesh.geometry.setVertexCount(s),this._linesMesh.geometry.setTriangleCount(l)),this._dataIndexOfVertex=new Uint32Array(a),this._vertexRangeOfDataIndex=new Uint32Array((n-i)*2)},_updateRegionMesh:function(e,t,r,i){for(var n=e.getData(),a=0,o=0,s=!1,w=this._polygonMesh,l=this._linesMesh,h=r;h<i;h++){var u=e.getRegionModel(h),f=u.getModel("itemStyle"),d=xe.firstNotNull(wt(n,h),f.get("color"),"#fff"),c=xe.firstNotNull(Tt(n,h),f.get("opacity"),1),v=b.parseColor(d),p=b.parseColor(f.get("borderColor"));v[3]*=c,p[3]*=c;var g=v[3]<.99;w.material.set("color",[1,1,1,1]),s=s||g;for(var m=xe.firstNotNull(u.get("height",!0),e.get("regionHeight")),_=this._updatePolygonGeometry(e,w.geometry,h,m,a,o,v),x=a;x<_.vertexOffset;x++)this._dataIndexOfVertex[x]=h;this._vertexRangeOfDataIndex[(h-r)*2]=a,this._vertexRangeOfDataIndex[(h-r)*2+1]=_.vertexOffset,a=_.vertexOffset,o=_.triangleOffset;var y=f.get("borderWidth"),T=y>0;T&&(y*=t.getDevicePixelRatio(),this._updateLinesGeometry(l.geometry,e,h,m,y,e.coordinateSystem.transform)),l.invisible=!T,l.material.set({color:p})}var w=this._polygonMesh;w.material.transparent=s,w.material.depthMask=!s,w.geometry.updateBoundingBox(),w.frontFace=this.extrudeY?b.Mesh.CCW:b.Mesh.CW,w.material.get("normalMap")&&w.geometry.generateTangents(),w.seriesIndex=e.seriesIndex,w.on("mousemove",this._onmousemove,this),w.on("mouseout",this._onmouseout,this)},_updateDebugWireframe:function(e){var t=e.getModel("debug.wireframe");if(t.get("show")){var r=b.parseColor(t.get("lineStyle.color")||"rgba(0,0,0,0.5)"),i=xe.firstNotNull(t.get("lineStyle.width"),1),n=this._polygonMesh;n.geometry.generateBarycentric(),n.material.define("both","WIREFRAME_TRIANGLE"),n.material.set("wireframeLineColor",r),n.material.set("wireframeLineWidth",i)}},_onmousemove:function(e){var t=this._dataIndexOfVertex[e.triangle[0]];t==null&&(t=-1),t!==this._lastHoverDataIndex&&(this.downplay(this._lastHoverDataIndex),this.highlight(t),this._labelsBuilder.updateLabels([t])),this._lastHoverDataIndex=t,this._polygonMesh.dataIndex=t},_onmouseout:function(e){e.target&&(this.downplay(this._lastHoverDataIndex),this._lastHoverDataIndex=-1,this._polygonMesh.dataIndex=-1),this._labelsBuilder.updateLabels([])},_updateGroundPlane:function(e,t,r){var i=e.getModel("groundPlane",e);if(this._groundMesh.invisible=!i.get("show",!0),!this._groundMesh.invisible){var n=e.get("shading"),a=this._groundMaterials[n];a||(a=this._groundMaterials.lambert),b.setMaterialFromModel(n,a,i,r),a.get("normalMap")&&this._groundMesh.geometry.generateTangents(),this._groundMesh.material=a,this._groundMesh.material.set("color",b.parseColor(i.get("color"))),this._groundMesh.scale.set(t.size[0],t.size[2],1)}},_triangulation:function(e,t,r){this._triangulationResults=[];for(var i=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],a=e.coordinateSystem,o=t;o<r;o++){for(var s=[],l=e.getRegionPolygonCoords(o),h=0;h<l.length;h++){var u=l[h].exterior,f=l[h].interiors,d=[],c=[];if(!(u.length<3)){for(var v=0,p=0;p<u.length;p++){var g=u[p];d[v++]=g[0],d[v++]=g[1]}for(var p=0;p<f.length;p++)if(!(f[p].length<3)){for(var m=d.length/2,_=0;_<f[p].length;_++){var g=f[p][_];d.push(g[0]),d.push(g[1])}c.push(m)}for(var x=Wu(d,c),y=new Float64Array(d.length/2*3),T=[],w=[1/0,1/0,1/0],E=[-1/0,-1/0,-1/0],S=0,p=0;p<d.length;)Ut.set(T,d[p++],0,d[p++]),a&&a.transform&&Ut.transformMat4(T,T,a.transform),Ut.min(w,w,T),Ut.max(E,E,T),y[S++]=T[0],y[S++]=T[1],y[S++]=T[2];Ut.min(i,i,w),Ut.max(n,n,E),s.push({points:y,indices:x,min:w,max:E})}}this._triangulationResults.push(s)}this._geoBoundingBox=[i,n]},_getRegionPolygonInfo:function(e){for(var t=this._triangulationResults[e-this._startIndex],r=0,i=0,n=0;n<t.length;n++)r+=t[n].points.length/3,i+=t[n].indices.length/3;var a=r*2+r*4,o=i*2+r*2;return{vertexCount:a,triangleCount:o}},_updatePolygonGeometry:function(e,t,r,i,n,a,o){var s=e.get("projectUVOnGround"),l=t.attributes.position,h=t.attributes.normal,u=t.attributes.texcoord0,f=t.attributes.color,d=this._triangulationResults[r-this._startIndex],c=f.value&&o,v=t.indices,p=this.extrudeY?1:2,g=this.extrudeY?2:1,m=[this.rootNode.worldTransform.x.len(),this.rootNode.worldTransform.y.len(),this.rootNode.worldTransform.z.len()],_=Ut.mul([],this._geoBoundingBox[0],m),x=Ut.mul([],this._geoBoundingBox[1],m),y=Math.max(x[0]-_[0],x[2]-_[2]);function T(J,K,ie){for(var pe=J.points,we=pe.length,te=[],Ne=[],de=0;de<we;de+=3)te[0]=pe[de],te[p]=K,te[g]=pe[de+2],Ne[0]=(pe[de]*m[0]-_[0])/y,Ne[1]=(pe[de+2]*m[g]-_[2])/y,l.set(n,te),c&&f.set(n,o),u.set(n++,Ne)}function w(J,K,ie){var pe=n;T(J,K);for(var we=J.indices.length,te=0;te<we;te++)v[a*3+te]=J.indices[te]+pe;a+=J.indices.length/3}for(var E=this.extrudeY?[0,1,0]:[0,0,1],S=Ut.negate([],E),D=0;D<d.length;D++){var M=n,C=d[D];w(C,0),w(C,i);for(var N=C.points.length/3,O=0;O<N;O++)h.set(M+O,S),h.set(M+O+N,E);for(var P=[0,3,1,1,3,2],F=[[],[],[],[]],H=[],Y=[],z=[],Te=[],q=0,O=0;O<N;O++){for(var De=(O+1)%N,ve=(C.points[De*3]-C.points[O*3])*m[0],oe=(C.points[De*3+2]-C.points[O*3+2])*m[g],Q=Math.sqrt(ve*ve+oe*oe),L=0;L<4;L++){var k=L===0||L===3,V=(k?O:De)*3;F[L][0]=C.points[V],F[L][p]=L>1?i:0,F[L][g]=C.points[V+2],l.set(n+L,F[L]),s?(Te[0]=(C.points[V]*m[0]-_[0])/y,Te[1]=(C.points[V+2]*m[g]-_[g])/y):(Te[0]=(k?q:q+Q)/y,Te[1]=(F[L][p]*m[p]-_[p])/y),u.set(n+L,Te)}Ut.sub(H,F[1],F[0]),Ut.sub(Y,F[3],F[0]),Ut.cross(z,H,Y),Ut.normalize(z,z);for(var L=0;L<4;L++)h.set(n+L,z),c&&f.set(n+L,o);for(var L=0;L<6;L++)v[a*3+L]=P[L]+n;n+=4,a+=2,q+=Q}}return t.dirty(),{vertexOffset:n,triangleOffset:a}},_getRegionLinesInfo:function(e,t,r){var i=0,n=0,a=t.getRegionModel(e),o=a.getModel("itemStyle"),s=o.get("borderWidth");if(s>0){var l=t.getRegionPolygonCoords(e);l.forEach(function(h){var u=h.exterior,f=h.interiors;i+=r.getPolylineVertexCount(u),n+=r.getPolylineTriangleCount(u);for(var d=0;d<f.length;d++)i+=r.getPolylineVertexCount(f[d]),n+=r.getPolylineTriangleCount(f[d])},this)}return{vertexCount:i,triangleCount:n}},_updateLinesGeometry:function(e,t,r,i,n,a){function o(h){for(var u=new Float64Array(h.length*3),f=0,d=[],c=0;c<h.length;c++)d[0]=h[c][0],d[1]=i+.1,d[2]=h[c][1],a&&Ut.transformMat4(d,d,a),u[f++]=d[0],u[f++]=d[1],u[f++]=d[2];return u}var s=[1,1,1,1],l=t.getRegionPolygonCoords(r);l.forEach(function(h){var u=h.exterior,f=h.interiors;e.addPolyline(o(u),s,n);for(var d=0;d<f.length;d++)e.addPolyline(o(f[d]),s,n)})},highlight:function(e){var t=this._data;if(t){var r=t.getItemModel(e),i=r.getModel(["emphasis","itemStyle"]),n=i.get("color"),a=xe.firstNotNull(i.get("opacity"),Tt(t,e),1);if(n==null){var o=wt(t,e);n=xs(o,-.4)}a==null&&(a=Tt(t,e));var s=b.parseColor(n);s[3]*=a,this._setColorOfDataIndex(t,e,s)}},downplay:function(e){var t=this._data;if(t){var r=t.getItemModel(e),i=xe.firstNotNull(wt(t,e),r.get(["itemStyle","color"]),"#fff"),n=xe.firstNotNull(Tt(t,e),r.get(["itemStyle","opacity"]),1),a=b.parseColor(i);a[3]*=n,this._setColorOfDataIndex(t,e,a)}},dispose:function(){this._labelsBuilder.dispose()},_setColorOfDataIndex:function(e,t,r){if(!(t<this._startIndex&&t>this._endIndex)){t-=this._startIndex;for(var i=this._vertexRangeOfDataIndex[t*2];i<this._vertexRangeOfDataIndex[t*2+1];i++)this._polygonMesh.geometry.attributes.color.set(i,r);this._polygonMesh.geometry.dirty(),this._api.getZr().refresh()}}};const vm=Kn.extend({type:"geo3D",__ecgl__:!0,init:function(e,t){this._geo3DBuilder=new on(t),this.groupGL=new b.Node,this._lightRoot=new b.Node,this._sceneHelper=new ni(this._lightRoot),this._sceneHelper.initLight(this._lightRoot),this._control=new oo({zr:t.getZr()}),this._control.init()},render:function(e,t,r){this.groupGL.add(this._geo3DBuilder.rootNode);var i=e.coordinateSystem;if(!(!i||!i.viewGL)){i.viewGL.add(this._lightRoot),e.get("show")?i.viewGL.add(this.groupGL):i.viewGL.remove(this.groupGL);var n=this._control;n.setViewGL(i.viewGL);var a=e.getModel("viewControl");n.setFromViewControlModel(a,0),this._sceneHelper.setScene(i.viewGL.scene),this._sceneHelper.updateLight(e),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._geo3DBuilder.update(e,t,r,0,e.getData().count());var o=i.viewGL.isLinearSpace()?"define":"undefine";this._geo3DBuilder.rootNode.traverse(function(s){s.material&&s.material[o]("fragment","SRGB_DECODE")}),n.off("update"),n.on("update",function(){r.dispatchAction({type:"geo3DChangeCamera",alpha:n.getAlpha(),beta:n.getBeta(),distance:n.getDistance(),center:n.getCenter(),from:this.uid,geo3DId:e.id})}),n.update()}},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r)},dispose:function(){this._control.dispose(),this._geo3DBuilder.dispose()}});var pm={Russia:[100,60],"United States":[-99,38],"United States of America":[-99,38]};function mm(e,t){if(e==="world"){var r=pm[t.name];if(r){var i=[r[0],r[1]];t.setCenter(i)}}}var gm=ht.vec3,Yi=ht.mat4,_m=[Kf,mm];function Ya(e,t,r,i,n){this.name=e,this.map=t,this.regionHeight=0,this.regions=[],this._nameCoordMap={},this.loadGeoJson(r,i,n),this.transform=Yi.identity(new Float64Array(16)),this.invTransform=Yi.identity(new Float64Array(16)),this.extrudeY=!0,this.altitudeAxis}Ya.prototype={constructor:Ya,type:"geo3D",dimensions:["lng","lat","alt"],containPoint:function(){},loadGeoJson:function(e,t,r){var i=ol||ol;try{this.regions=e?i(e):[]}catch(h){throw`Invalid geoJson format
`+h}t=t||{},r=r||{};for(var n=this.regions,a={},o=0;o<n.length;o++){var s=n[o].name;s=r[s]||s,n[o].name=s,a[s]=n[o],this.addGeoCoord(s,n[o].getCenter());var l=t[s];l&&n[o].transformTo(l.left,l.top,l.width,l.height)}this._regionsMap=a,this._geoRect=null,_m.forEach(function(h){h(this)},this)},getGeoBoundingRect:function(){if(this._geoRect)return this._geoRect;for(var e,t=this.regions,r=0;r<t.length;r++){var i=t[r].getBoundingRect();e=e||i.clone(),e.union(i)}return this._geoRect=e||new Yf(0,0,0,0)},addGeoCoord:function(e,t){this._nameCoordMap[e]=t},getRegion:function(e){return this._regionsMap[e]},getRegionByCoord:function(e){for(var t=this.regions,r=0;r<t.length;r++)if(t[r].contain(e))return t[r]},setSize:function(e,t,r){this.size=[e,t,r];var i=this.getGeoBoundingRect(),n=e/i.width,a=-r/i.height,o=-e/2-i.x*n,s=r/2-i.y*a,l=this.extrudeY?[o,0,s]:[o,s,0],h=this.extrudeY?[n,1,a]:[n,a,1],u=this.transform;Yi.identity(u),Yi.translate(u,u,l),Yi.scale(u,u,h),Yi.invert(this.invTransform,u)},dataToPoint:function(e,t){t=t||[];var r=this.extrudeY?1:2,i=this.extrudeY?2:1,n=e[2];return isNaN(n)&&(n=0),t[0]=e[0],t[i]=e[1],this.altitudeAxis?t[r]=this.altitudeAxis.dataToCoord(n):t[r]=0,t[r]+=this.regionHeight,gm.transformMat4(t,t,this.transform),t},pointToData:function(e,t){}};function ym(e,t){var r=e.getBoxLayoutParams(),i=$n(r,{width:t.getWidth(),height:t.getHeight()});i.y=t.getHeight()-i.y-i.height,this.viewGL.setViewport(i.x,i.y,i.width,i.height,t.getDevicePixelRatio());var n=this.getGeoBoundingRect(),a=n.width/n.height*(e.get("aspectScale")||.75),o=e.get("boxWidth"),s=e.get("boxDepth"),l=e.get("boxHeight");l==null&&(l=5),isNaN(o)&&isNaN(s)&&(o=100),isNaN(s)?s=o/a:isNaN(o)&&(o=s/a),this.setSize(o,l,s),this.regionHeight=e.get("regionHeight"),this.altitudeAxis&&this.altitudeAxis.setExtent(0,Math.max(l-this.regionHeight,0))}function xm(e,t){var r=[1/0,-1/0];if(e.eachSeries(function(n){if(n.coordinateSystem===this&&n.type!=="series.map3D"){var a=n.getData(),o=n.coordDimToDataDim("alt"),s=o&&o[0];if(s){var l=a.getDataExtent(s,!0);r[0]=Math.min(r[0],l[0]),r[1]=Math.max(r[1],l[1])}}},this),r&&isFinite(r[1]-r[0])){var i=ws(r,{type:"value",min:"dataMin",max:"dataMax"});this.altitudeAxis=new Ja("altitude",i),this.resize(this.model,t)}}var ch=0,$u={dimensions:Ya.prototype.dimensions,create:function(e,t){var r=[];if(!ts)throw new Error("geo3D component depends on geo component");function i(n,a){var o=$u.createGeo3D(n);n.__viewGL=n.__viewGL||new Fe,o.viewGL=n.__viewGL,n.coordinateSystem=o,o.model=n,r.push(o),o.resize=ym,o.resize(n,t),o.update=xm}return e.eachComponent("geo3D",function(n,a){i(n)}),e.eachSeriesByType("map3D",function(n,a){var o=n.get("coordinateSystem");o==null&&(o="geo3D"),o==="geo3D"&&i(n)}),e.eachSeries(function(n){if(n.get("coordinateSystem")==="geo3D"){if(n.type==="series.map3D")return;var a=n.getReferringComponents("geo3D").models[0];if(a||(a=e.getComponent("geo3D")),!a)throw new Error('geo "'+xe.firstNotNull(n.get("geo3DIndex"),n.get("geo3DId"),0)+'" not found');n.coordinateSystem=a.coordinateSystem}}),r},createGeo3D:function(e){var t=e.get("map"),r;return typeof t=="string"?(r=t,t=ts(t)):t&&t.features&&(t={geoJson:t}),r==null&&(r="GEO_ANONYMOUS_"+ch++),new Ya(r+ch++,r,t&&t.geoJson,t&&t.specialAreas,e.get("nameMap"))}};const Qu=$u;function Ju(e){e.registerComponentModel($p),e.registerComponentView(vm),e.registerAction({type:"geo3DChangeCamera",event:"geo3dcamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"geo3D",query:t},function(i){i.setView(t)})}),e.registerCoordinateSystem("geo3D",Qu)}Ct(Ju);function dh(e,t){e.id=e.id||e.name||t+""}var Ci=ln.extend({type:"globe",layoutMode:"box",coordinateSystem:null,init:function(){Ci.superApply(this,"init",arguments),ir(this.option.layers,function(e,t){Be(e,this.defaultLayerOption),dh(e,t)},this)},mergeOption:function(e){var t=this.option.layers;this.option.layers=null,Ci.superApply(this,"mergeOption",arguments);function r(o){return $f(o,function(s,l,h){return dh(l,h),s[l.id]=l,s},{})}if(t&&t.length){var i=r(e.layers),n=r(t);for(var a in i)n[a]?Be(n[a],i[a],!0):t.push(e.layers[a]);this.option.layers=t}ir(this.option.layers,function(o){Be(o,this.defaultLayerOption)},this)},optionUpdated:function(){this.updateDisplacementHash()},defaultLayerOption:{show:!0,type:"overlay"},defaultOption:{show:!0,zlevel:-10,left:0,top:0,width:"100%",height:"100%",environment:"auto",baseColor:"#fff",baseTexture:"",heightTexture:"",displacementTexture:"",displacementScale:0,displacementQuality:"medium",globeRadius:100,globeOuterRadius:150,shading:"lambert",light:{main:{time:""}},atmosphere:{show:!1,offset:5,color:"#ffffff",glowPower:6,innerGlowPower:2},viewControl:{autoRotate:!0,panSensitivity:0,targetCoord:null},layers:[]},setDisplacementData:function(e,t,r){this.displacementData=e,this.displacementWidth=t,this.displacementHeight=r},getDisplacementTexture:function(){return this.get("displacementTexture")||this.get("heightTexture")},getDisplacemenScale:function(){var e=this.getDisplacementTexture(),t=this.get("displacementScale");return(!e||e==="none")&&(t=0),t},hasDisplacement:function(){return this.getDisplacemenScale()>0},_displacementChanged:!0,_displacementScale:0,updateDisplacementHash:function(){var e=this.getDisplacementTexture(),t=this.getDisplacemenScale();this._displacementChanged=this._displacementTexture!==e||this._displacementScale!==t,this._displacementTexture=e,this._displacementScale=t},isDisplacementChanged:function(){return this._displacementChanged}});Be(Ci.prototype,no);Be(Ci.prototype,fn);Be(Ci.prototype,cn);Be(Ci.prototype,vn);const Tm=Ci;var ef=Math.PI,rr=Math.sin,Mr=Math.cos,tf=Math.tan,rf=Math.asin,nf=Math.atan2,Li=ef/180,wm=1e3*60*60*24,bm=2440588,Sm=2451545;function Em(e){return e.valueOf()/wm-.5+bm}function Am(e){return Em(e)-Sm}var Ka=Li*23.4397;function Cm(e,t){return nf(rr(e)*Mr(Ka)-tf(t)*rr(Ka),Mr(e))}function Lm(e,t){return rf(rr(t)*Mr(Ka)+Mr(t)*rr(Ka)*rr(e))}function Mm(e,t,r){return nf(rr(e),Mr(e)*rr(t)-tf(r)*Mr(t))}function Dm(e,t,r){return rf(rr(t)*rr(r)+Mr(t)*Mr(r)*Mr(e))}function Pm(e,t){return Li*(280.16+360.9856235*e)-t}function Rm(e){return Li*(357.5291+.98560028*e)}function Nm(e){var t=Li*(1.9148*rr(e)+.02*rr(2*e)+3e-4*rr(3*e)),r=Li*102.9372;return e+t+r+ef}function Im(e){var t=Rm(e),r=Nm(t);return{dec:Lm(r,0),ra:Cm(r,0)}}var af={};af.getPosition=function(e,t,r){var i=Li*-r,n=Li*t,a=Am(e),o=Im(a),s=Pm(a,i)-o.ra;return{azimuth:Mm(s,n,o.dec),altitude:Dm(s,n,o.dec)}};const Om=af,Bm=`@export ecgl.atmosphere.vertex
attribute vec3 position: POSITION;
attribute vec3 normal : NORMAL;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform mat4 normalMatrix : WORLDINVERSETRANSPOSE;

varying vec3 v_Normal;

void main() {
 v_Normal = normalize((normalMatrix * vec4(normal, 0.0)).xyz);
 gl_Position = worldViewProjection * vec4(position, 1.0);
}
@end


@export ecgl.atmosphere.fragment
uniform mat4 viewTranspose: VIEWTRANSPOSE;
uniform float glowPower;
uniform vec3 glowColor;

varying vec3 v_Normal;

void main() {
 float intensity = pow(1.0 - dot(v_Normal, (viewTranspose * vec4(0.0, 0.0, 1.0, 0.0)).xyz), glowPower);
 gl_FragColor = vec4(glowColor, intensity * intensity);
}
@end`;b.Shader.import(gu);b.Shader.import(Bm);const Fm=Kn.extend({type:"globe",__ecgl__:!0,_displacementScale:0,init:function(e,t){this.groupGL=new b.Node,this._sphereGeometry=new b.SphereGeometry({widthSegments:200,heightSegments:100,dynamic:!0}),this._overlayGeometry=new b.SphereGeometry({widthSegments:80,heightSegments:40}),this._planeGeometry=new b.PlaneGeometry,this._earthMesh=new b.Mesh({renderNormal:!0}),this._atmosphereMesh=new b.Mesh,this._atmosphereGeometry=new b.SphereGeometry({widthSegments:80,heightSegments:40}),this._atmosphereMaterial=new b.Material({shader:new b.Shader(b.Shader.source("ecgl.atmosphere.vertex"),b.Shader.source("ecgl.atmosphere.fragment")),transparent:!0}),this._atmosphereMesh.geometry=this._atmosphereGeometry,this._atmosphereMesh.material=this._atmosphereMaterial,this._atmosphereMesh.frontFace=b.Mesh.CW,this._lightRoot=new b.Node,this._sceneHelper=new ni,this._sceneHelper.initLight(this._lightRoot),this.groupGL.add(this._atmosphereMesh),this.groupGL.add(this._earthMesh),this._control=new oo({zr:t.getZr()}),this._control.init(),this._layerMeshes={}},render:function(e,t,r){var i=e.coordinateSystem,n=e.get("shading");i.viewGL.add(this._lightRoot),e.get("show")?i.viewGL.add(this.groupGL):i.viewGL.remove(this.groupGL),this._sceneHelper.setScene(i.viewGL.scene),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling"));var a=this._earthMesh;a.geometry=this._sphereGeometry;var o="ecgl."+n;(!a.material||a.material.shader.name!==o)&&(a.material=b.createMaterial(o)),b.setMaterialFromModel(n,a.material,e,r),["roughnessMap","metalnessMap","detailMap","normalMap"].forEach(function(f){var d=a.material.get(f);d&&(d.flipY=!1)}),a.material.set("color",b.parseColor(e.get("baseColor")));var s=i.radius*.99;if(a.scale.set(s,s,s),e.get("atmosphere.show")){a.material.define("both","ATMOSPHERE_ENABLED"),this._atmosphereMesh.invisible=!1,this._atmosphereMaterial.setUniforms({glowPower:e.get("atmosphere.glowPower")||6,glowColor:e.get("atmosphere.color")||"#ffffff"}),a.material.setUniforms({glowPower:e.get("atmosphere.innerGlowPower")||2,glowColor:e.get("atmosphere.color")||"#ffffff"});var l=e.get("atmosphere.offset")||5;this._atmosphereMesh.scale.set(s+l,s+l,s+l)}else a.material.undefine("both","ATMOSPHERE_ENABLED"),this._atmosphereMesh.invisible=!0;var h=a.material.setTextureImage("diffuseMap",e.get("baseTexture"),r,{flipY:!1,anisotropic:8});h&&h.surface&&h.surface.attachToMesh(a);var u=a.material.setTextureImage("bumpMap",e.get("heightTexture"),r,{flipY:!1,anisotropic:8});u&&u.surface&&u.surface.attachToMesh(a),a.material[e.get("postEffect.enable")?"define":"undefine"]("fragment","SRGB_DECODE"),this._updateLight(e,r),this._displaceVertices(e,r),this._updateViewControl(e,r),this._updateLayers(e,r)},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r)},_updateLayers:function(e,t){var r=e.coordinateSystem,i=e.get("layers"),n=r.radius,a=[],o=[],s=[],l=[];ir(i,function(c){var v=new Qi(c),p=v.get("type"),g=b.loadTexture(v.get("texture"),t,{flipY:!1,anisotropic:8});if(g.surface&&g.surface.attachToMesh(this._earthMesh),p==="blend"){var m=v.get("blendTo"),_=xe.firstNotNull(v.get("intensity"),1);m==="emission"?(s.push(g),l.push(_)):(a.push(g),o.push(_))}else{var x=v.get("id"),y=this._layerMeshes[x];y||(y=this._layerMeshes[x]=new b.Mesh({geometry:this._overlayGeometry,castShadow:!1,ignorePicking:!0}));var T=v.get("shading");T==="lambert"?(y.material=y.__lambertMaterial||new b.Material({autoUpdateTextureStatus:!1,shader:b.createShader("ecgl.lambert"),transparent:!0,depthMask:!1}),y.__lambertMaterial=y.material):(y.material=y.__colorMaterial||new b.Material({autoUpdateTextureStatus:!1,shader:b.createShader("ecgl.color"),transparent:!0,depthMask:!1}),y.__colorMaterial=y.material),y.material.enableTexture("diffuseMap");var w=v.get("distance"),E=n+(w??r.radius/100);y.scale.set(E,E,E),n=E;var S=this._blankTexture||(this._blankTexture=b.createBlankTexture("rgba(255, 255, 255, 0)"));y.material.set("diffuseMap",S),b.loadTexture(v.get("texture"),t,{flipY:!1,anisotropic:8},function(D){D.surface&&D.surface.attachToMesh(y),y.material.set("diffuseMap",D),t.getZr().refresh()}),v.get("show")?this.groupGL.add(y):this.groupGL.remove(y)}},this);var h=this._earthMesh.material;h.define("fragment","LAYER_DIFFUSEMAP_COUNT",a.length),h.define("fragment","LAYER_EMISSIVEMAP_COUNT",s.length),h.set("layerDiffuseMap",a),h.set("layerDiffuseIntensity",o),h.set("layerEmissiveMap",s),h.set("layerEmissionIntensity",l);var u=e.getModel("debug.wireframe");if(u.get("show")){h.define("both","WIREFRAME_TRIANGLE");var f=b.parseColor(u.get("lineStyle.color")||"rgba(0,0,0,0.5)"),d=xe.firstNotNull(u.get("lineStyle.width"),1);h.set("wireframeLineWidth",d),h.set("wireframeLineColor",f)}else h.undefine("both","WIREFRAME_TRIANGLE")},_updateViewControl:function(e,t){var r=e.coordinateSystem,i=e.getModel("viewControl");r.viewGL.camera;var n=this;function a(){return{type:"globeChangeCamera",alpha:o.getAlpha(),beta:o.getBeta(),distance:o.getDistance()-r.radius,center:o.getCenter(),from:n.uid,globeId:e.id}}var o=this._control;o.setViewGL(r.viewGL);var s=i.get("targetCoord"),l,h;s!=null&&(h=s[0]+90,l=s[1]),o.setFromViewControlModel(i,{baseDistance:r.radius,alpha:l,beta:h}),o.off("update"),o.on("update",function(){t.dispatchAction(a())})},_displaceVertices:function(e,t){var r=e.get("displacementQuality"),i=e.get("debug.wireframe.show"),n=e.coordinateSystem;if(!(!e.isDisplacementChanged()&&r===this._displacementQuality&&i===this._showDebugWireframe)){this._displacementQuality=r,this._showDebugWireframe=i;var a=this._sphereGeometry,o={low:100,medium:200,high:400,ultra:800}[r]||200,s=o/2;(a.widthSegments!==o||i)&&(a.widthSegments=o,a.heightSegments=s,a.build()),this._doDisplaceVertices(a,n),i&&a.generateBarycentric()}},_doDisplaceVertices:function(e,t){var r=e.attributes.position.value,i=e.attributes.texcoord0.value,n=e.__originalPosition;(!n||n.length!==r.length)&&(n=new Float32Array(r.length),n.set(r),e.__originalPosition=n);for(var a=t.displacementWidth,o=t.displacementHeight,s=t.displacementData,l=0;l<e.vertexCount;l++){var h=l*3,u=l*2,f=n[h+1],d=n[h+2],c=n[h+3],v=i[u++],p=i[u++],g=Math.round(v*(a-1)),m=Math.round(p*(o-1)),_=m*a+g,x=s?s[_]:0;r[h+1]=f+f*x,r[h+2]=d+d*x,r[h+3]=c+c*x}e.generateVertexNormals(),e.dirty(),e.updateBoundingBox()},_updateLight:function(e,t){var r=this._earthMesh;this._sceneHelper.updateLight(e);var i=this._sceneHelper.mainLight,n=e.get("light.main.time")||new Date,a=Om.getPosition(Qf(n),0,0),o=Math.cos(a.altitude);i.position.y=-o*Math.cos(a.azimuth),i.position.x=Math.sin(a.altitude),i.position.z=o*Math.sin(a.azimuth),i.lookAt(r.getWorldPosition())},dispose:function(e,t){this.groupGL.removeAll(),this._control.dispose()}});var Um=ht.vec3;function $a(e){this.radius=e,this.viewGL=null,this.altitudeAxis,this.displacementData=null,this.displacementWidth,this.displacementHeight}$a.prototype={constructor:$a,dimensions:["lng","lat","alt"],type:"globe",containPoint:function(){},setDisplacementData:function(e,t,r){this.displacementData=e,this.displacementWidth=t,this.displacementHeight=r},_getDisplacementScale:function(e,t){var r=(e+180)/360*(this.displacementWidth-1),i=(90-t)/180*(this.displacementHeight-1),n=Math.round(r)+Math.round(i)*this.displacementWidth;return this.displacementData[n]},dataToPoint:function(e,t){var r=e[0],i=e[1],n=e[2]||0,a=this.radius;this.displacementData&&(a*=1+this._getDisplacementScale(r,i)),this.altitudeAxis&&(a+=this.altitudeAxis.dataToCoord(n)),r=r*Math.PI/180,i=i*Math.PI/180;var o=Math.cos(i)*a;return t=t||[],t[0]=-o*Math.cos(r+Math.PI),t[1]=Math.sin(i)*a,t[2]=o*Math.sin(r+Math.PI),t},pointToData:function(e,t){var r=e[0],i=e[1],n=e[2],a=Um.len(e);r/=a,i/=a,n/=a;var o=Math.asin(i),s=Math.atan2(n,-r);s<0&&(s=Math.PI*2+s);var l=o*180/Math.PI,h=s*180/Math.PI-180;return t=t||[],t[0]=h,t[1]=l,t[2]=a-this.radius,this.altitudeAxis&&(t[2]=this.altitudeAxis.coordToData(t[2])),t}};function zm(e,t){var r=document.createElement("canvas"),i=r.getContext("2d"),n=e.width,a=e.height;r.width=n,r.height=a,i.drawImage(e,0,0,n,a);for(var o=i.getImageData(0,0,n,a).data,s=new Float32Array(o.length/4),l=0;l<o.length/4;l++){var h=o[l*4];s[l]=h/255*t}return{data:s,width:n,height:a}}function Gm(e,t){var r=e.getBoxLayoutParams(),i=$n(r,{width:t.getWidth(),height:t.getHeight()});i.y=t.getHeight()-i.y-i.height,this.viewGL.setViewport(i.x,i.y,i.width,i.height,t.getDevicePixelRatio()),this.radius=e.get("globeRadius");var n=e.get("globeOuterRadius");this.altitudeAxis&&this.altitudeAxis.setExtent(0,n-this.radius)}function km(e,t){var r=[1/0,-1/0];if(e.eachSeries(function(n){if(n.coordinateSystem===this){var a=n.getData(),o=n.coordDimToDataDim("alt"),s=o&&o[0];if(s){var l=a.getDataExtent(s,!0);r[0]=Math.min(r[0],l[0]),r[1]=Math.max(r[1],l[1])}}},this),r&&isFinite(r[1]-r[0])){var i=ws(r,{type:"value",min:"dataMin",max:"dataMax"});this.altitudeAxis=new Ja("altitude",i),this.resize(this.model,t)}}var Hm={dimensions:$a.prototype.dimensions,create:function(e,t){var r=[];return e.eachComponent("globe",function(i){i.__viewGL=i.__viewGL||new Fe;var n=new $a;n.viewGL=i.__viewGL,i.coordinateSystem=n,n.model=i,r.push(n),n.resize=Gm,n.resize(i,t),n.update=km}),e.eachSeries(function(i){if(i.get("coordinateSystem")==="globe"){var n=i.getReferringComponents("globe").models[0];if(n||(n=e.getComponent("globe")),!n)throw new Error('globe "'+xe.firstNotNull(i.get("globe3DIndex"),i.get("globe3DId"),0)+'" not found');var a=n.coordinateSystem;i.coordinateSystem=a}}),e.eachComponent("globe",function(i,n){var a=i.coordinateSystem,o=i.getDisplacementTexture(),s=i.getDisplacemenScale();if(i.isDisplacementChanged()){if(i.hasDisplacement()){var l=!0;b.loadTexture(o,t,function(h){var u=h.image,f=zm(u,s);i.setDisplacementData(f.data,f.width,f.height),l||t.dispatchAction({type:"globeUpdateDisplacment"})}),l=!1}else a.setDisplacementData(null,0,0);a.setDisplacementData(i.displacementData,i.displacementWidth,i.displacementHeight)}}),r}};const Vm=Hm;function Wm(e){e.registerComponentModel(Tm),e.registerComponentView(Fm),e.registerCoordinateSystem("globe",Vm),e.registerAction({type:"globeChangeCamera",event:"globecamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"globe",query:t},function(i){i.setView(t)})}),e.registerAction({type:"globeUpdateDisplacment",event:"globedisplacementupdated",update:"update"},function(t,r){})}Ct(Wm);var vh=["zoom","center","pitch","bearing"],Fs=ln.extend({type:"mapbox3D",layoutMode:"box",coordinateSystem:null,defaultOption:{zlevel:-10,style:"mapbox://styles/mapbox/light-v9",center:[0,0],zoom:0,pitch:0,bearing:0,light:{main:{alpha:20,beta:30}},altitudeScale:1,boxHeight:"auto"},getMapboxCameraOption:function(){var e=this;return vh.reduce(function(t,r){return t[r]=e.get(r),t},{})},setMapboxCameraOption:function(e){e!=null&&vh.forEach(function(t){e[t]!=null&&(this.option[t]=e[t])},this)},getMapbox:function(){return this._mapbox},setMapbox:function(e){this._mapbox=e}});Be(Fs.prototype,fn);Be(Fs.prototype,cn);const Xm=Fs;function hi(e,t){if(this.id=e,this.zr=t,this.dom=document.createElement("div"),this.dom.style.cssText="position:absolute;left:0;right:0;top:0;bottom:0;",!mapboxgl)throw new Error("Mapbox GL library must be included. See https://www.mapbox.com/mapbox-gl-js/api/");this._mapbox=new mapboxgl.Map({container:this.dom}),this._initEvents()}hi.prototype.setUnpainted=function(){};hi.prototype.resize=function(){this._mapbox.resize()};hi.prototype.getMapbox=function(){return this._mapbox};hi.prototype.clear=function(){};hi.prototype.refresh=function(){this._mapbox.resize()};var of=["mousedown","mouseup","click","dblclick","mousemove","mousewheel","wheel","touchstart","touchend","touchmove","touchcancel"];hi.prototype._initEvents=function(){var e=this._mapbox.getCanvasContainer();this._handlers=this._handlers||{contextmenu:function(t){return t.preventDefault(),!1}},of.forEach(function(t){this._handlers[t]=function(r){var i={};for(var n in r)i[n]=r[n];i.bubbles=!1;var a=new r.constructor(r.type,i);e.dispatchEvent(a)},this.zr.dom.addEventListener(t,this._handlers[t])},this),this.zr.dom.addEventListener("contextmenu",this._handlers.contextmenu)};hi.prototype.dispose=function(){of.forEach(function(e){this.zr.dom.removeEventListener(e,this._handlers[e])},this)};const sf=`
@export ecgl.displayShadow.vertex

@import ecgl.common.transformUniforms

@import ecgl.common.uv.header

@import ecgl.common.attributes

varying vec3 v_WorldPosition;

varying vec3 v_Normal;

void main()
{
 @import ecgl.common.uv.main
 v_Normal = normalize((worldInverseTranspose * vec4(normal, 0.0)).xyz);

 v_WorldPosition = (world * vec4(position, 1.0)).xyz;
 gl_Position = worldViewProjection * vec4(position, 1.0);
}

@end


@export ecgl.displayShadow.fragment

@import ecgl.common.uv.fragmentHeader

varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform float roughness: 0.2;

#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

@import ecgl.common.ssaoMap.header

@import clay.plugin.compute_shadow_map

void main()
{
 float shadow = 1.0;

 @import ecgl.common.ssaoMap.main

#if defined(DIRECTIONAL_LIGHT_COUNT) && defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
 float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
 if(shadowEnabled)
 {
 computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
 }
 for (int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++) {
 shadow = min(shadow, shadowContribsDir[i] * 0.5 + 0.5);
 }
#endif

 shadow *= 0.5 + ao * 0.5;
 shadow = clamp(shadow, 0.0, 1.0);

 gl_FragColor = vec4(vec3(0.0), 1.0 - shadow);
}

@end`;b.Shader.import(sf);const jm=Kn.extend({type:"mapbox3D",__ecgl__:!0,init:function(e,t){var r=t.getZr();this._zrLayer=new hi("mapbox3D",r),r.painter.insertLayer(-1e3,this._zrLayer),this._lightRoot=new b.Node,this._sceneHelper=new ni(this._lightRoot),this._sceneHelper.initLight(this._lightRoot);var i=this._zrLayer.getMapbox(),n=this._dispatchInteractAction.bind(this,t,i);["zoom","rotate","drag","pitch","rotate","move"].forEach(function(a){i.on(a,n)}),this._groundMesh=new b.Mesh({geometry:new b.PlaneGeometry,material:new b.Material({shader:new b.Shader({vertex:b.Shader.source("ecgl.displayShadow.vertex"),fragment:b.Shader.source("ecgl.displayShadow.fragment")}),depthMask:!1}),renderOrder:-100,culling:!1,castShadow:!1,$ignorePicking:!0,renderNormal:!0})},render:function(e,t,r){var i=this._zrLayer.getMapbox(),n=e.get("style"),a=JSON.stringify(n);a!==this._oldStyleStr&&n&&i.setStyle(n),this._oldStyleStr=a,i.setCenter(e.get("center")),i.setZoom(e.get("zoom")),i.setPitch(e.get("pitch")),i.setBearing(e.get("bearing")),e.setMapbox(i);var o=e.coordinateSystem;o.viewGL.scene.add(this._lightRoot),o.viewGL.add(this._groundMesh),this._updateGroundMesh(),this._sceneHelper.setScene(o.viewGL.scene),this._sceneHelper.updateLight(e),o.viewGL.setPostEffect(e.getModel("postEffect"),r),o.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._mapbox3DModel=e},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r),e.coordinateSystem.viewGL.scene.traverse(function(a){a.material&&(a.material.define("fragment","NORMAL_UP_AXIS",2),a.material.define("fragment","NORMAL_FRONT_AXIS",1))})},updateCamera:function(e,t,r,i){e.coordinateSystem.setCameraOption(i),this._updateGroundMesh(),r.getZr().refresh()},_dispatchInteractAction:function(e,t,r){e.dispatchAction({type:"mapbox3DChangeCamera",pitch:t.getPitch(),zoom:t.getZoom(),center:t.getCenter().toArray(),bearing:t.getBearing(),mapbox3DId:this._mapbox3DModel&&this._mapbox3DModel.id})},_updateGroundMesh:function(){if(this._mapbox3DModel){var e=this._mapbox3DModel.coordinateSystem,t=e.dataToPoint(e.center);this._groundMesh.position.set(t[0],t[1],-.001);var r=new b.Plane(new b.Vector3(0,0,1),0),i=e.viewGL.camera.castRay(new b.Vector2(-1,-1)),n=e.viewGL.camera.castRay(new b.Vector2(1,1)),a=i.intersectPlane(r),o=n.intersectPlane(r),s=a.dist(o)/e.viewGL.rootNode.scale.x;this._groundMesh.scale.set(s,s,1)}},dispose:function(e,t){this._zrLayer&&this._zrLayer.dispose(),t.getZr().painter.delLayer(-1e3)}});var $r=ht.mat4,Cn=512,Zo=.6435011087932844,zt=Math.PI,Xi=1/10;function sn(){this.width=0,this.height=0,this.altitudeScale=1,this.boxHeight="auto",this.altitudeExtent,this.bearing=0,this.pitch=0,this.center=[0,0],this._origin,this.zoom=0,this._initialZoom,this.maxPitch=60,this.zoomOffset=0}sn.prototype={constructor:sn,dimensions:["lng","lat","alt"],containPoint:function(){},setCameraOption:function(e){this.bearing=e.bearing,this.pitch=e.pitch,this.center=e.center,this.zoom=e.zoom,this._origin||(this._origin=this.projectOnTileWithScale(this.center,Cn)),this._initialZoom==null&&(this._initialZoom=this.zoom),this.updateTransform()},updateTransform:function(){if(this.height){var e=.5/Math.tan(Zo/2)*this.height*Xi,t=Math.max(Math.min(this.pitch,this.maxPitch),0)/180*Math.PI,r=Zo/2,i=Math.PI/2+t,n=Math.sin(r)*e/Math.sin(Math.PI-i-r),a=Math.cos(Math.PI/2-t)*n+e,o=a*1.1;this.pitch>50&&(o=1e3);var s=[];$r.perspective(s,Zo,this.width/this.height,1,o),this.viewGL.camera.projectionMatrix.setArray(s),this.viewGL.camera.decomposeProjectionMatrix();var s=$r.identity([]),l=this.dataToPoint(this.center);$r.scale(s,s,[1,-1,1]),$r.translate(s,s,[0,0,-e]),$r.rotateX(s,s,t),$r.rotateZ(s,s,-this.bearing/180*Math.PI),$r.translate(s,s,[-l[0]*this.getScale()*Xi,-l[1]*this.getScale()*Xi,0]),this.viewGL.camera.viewMatrix.array=s;var h=[];$r.invert(h,s),this.viewGL.camera.worldTransform.array=h,this.viewGL.camera.decomposeWorldTransform();var u=Cn*this.getScale(),f;if(this.altitudeExtent&&!isNaN(this.boxHeight)){var d=this.altitudeExtent[1]-this.altitudeExtent[0];f=this.boxHeight/d*this.getScale()/Math.pow(2,this._initialZoom-this.zoomOffset)}else f=u/(2*Math.PI*6378e3*Math.abs(Math.cos(this.center[1]*(Math.PI/180))))*this.altitudeScale*Xi;this.viewGL.rootNode.scale.set(this.getScale()*Xi,this.getScale()*Xi,f)}},getScale:function(){return Math.pow(2,this.zoom-this.zoomOffset)},projectOnTile:function(e,t){return this.projectOnTileWithScale(e,this.getScale()*Cn,t)},projectOnTileWithScale:function(e,t,r){var i=e[0],n=e[1],a=i*zt/180,o=n*zt/180,s=t*(a+zt)/(2*zt),l=t*(zt-Math.log(Math.tan(zt/4+o*.5)))/(2*zt);return r=r||[],r[0]=s,r[1]=l,r},unprojectFromTile:function(e,t){return this.unprojectOnTileWithScale(e,this.getScale()*Cn,t)},unprojectOnTileWithScale:function(e,t,r){var i=e[0],n=e[1],a=i/t*(2*zt)-zt,o=2*(Math.atan(Math.exp(zt-n/t*(2*zt)))-zt/4);return r=r||[],r[0]=a*180/zt,r[1]=o*180/zt,r},dataToPoint:function(e,t){return t=this.projectOnTileWithScale(e,Cn,t),t[0]-=this._origin[0],t[1]-=this._origin[1],t[2]=isNaN(e[2])?0:e[2],isNaN(e[2])||(t[2]=e[2],this.altitudeExtent&&(t[2]-=this.altitudeExtent[0])),t}};function Zn(){sn.apply(this,arguments)}Zn.prototype=new sn;Zn.prototype.constructor=Zn;Zn.prototype.type="mapbox3D";function lf(e,t,r){function i(a,o){var s=o.getWidth(),l=o.getHeight(),h=o.getDevicePixelRatio();this.viewGL.setViewport(0,0,s,l,h),this.width=s,this.height=l,this.altitudeScale=a.get("altitudeScale"),this.boxHeight=a.get("boxHeight")}function n(a,o){if(this.model.get("boxHeight")!=="auto"){var s=[1/0,-1/0];a.eachSeries(function(l){if(l.coordinateSystem===this){var h=l.getData(),u=l.coordDimToDataDim("alt")[0];if(u){var f=h.getDataExtent(u,!0);s[0]=Math.min(s[0],f[0]),s[1]=Math.max(s[1],f[1])}}},this),s&&isFinite(s[1]-s[0])&&(this.altitudeExtent=s)}}return{dimensions:t.prototype.dimensions,create:function(a,o){var s=[];return a.eachComponent(e,function(l){var h=l.__viewGL;h||(h=l.__viewGL=new Fe,h.setRootNode(new b.Node));var u=new t;u.viewGL=l.__viewGL,u.resize=i,u.resize(l,o),s.push(u),l.coordinateSystem=u,u.model=l,u.update=n}),a.eachSeries(function(l){if(l.get("coordinateSystem")===e){var h=l.getReferringComponents(e).models[0];if(h||(h=a.getComponent(e)),!h)throw new Error(e+' "'+xe.firstNotNull(l.get(e+"Index"),l.get(e+"Id"),0)+'" not found');l.coordinateSystem=h.coordinateSystem}}),r&&r(s,a,o),s}}}var Zm=lf("mapbox3D",Zn,function(e){e.forEach(function(t){t.setCameraOption(t.model.getMapboxCameraOption())})});const qm=Zm;function Ym(e){e.registerComponentModel(Xm),e.registerComponentView(jm),e.registerCoordinateSystem("mapbox3D",qm),e.registerAction({type:"mapbox3DChangeCamera",event:"mapbox3dcamerachanged",update:"mapbox3D:updateCamera"},function(t,r){r.eachComponent({mainType:"mapbox3D",query:t},function(i){i.setMapboxCameraOption(t)})})}Ct(Ym);var ph=["zoom","center","pitch","bearing"],Us=ln.extend({type:"maptalks3D",layoutMode:"box",coordinateSystem:null,defaultOption:{zlevel:-10,urlTemplate:"http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',center:[0,0],zoom:0,pitch:0,bearing:0,light:{main:{alpha:20,beta:30}},altitudeScale:1,boxHeight:"auto"},getMaptalksCameraOption:function(){var e=this;return ph.reduce(function(t,r){return t[r]=e.get(r),t},{})},setMaptalksCameraOption:function(e){e!=null&&ph.forEach(function(t){e[t]!=null&&(this.option[t]=e[t])},this)},getMaptalks:function(){return this._maptalks},setMaptalks:function(e){this._maptalks=e}});Be(Us.prototype,fn);Be(Us.prototype,cn);const Km=Us;function ui(e,t,r,i){if(this.id=e,this.zr=t,this.dom=document.createElement("div"),this.dom.style.cssText="position:absolute;left:0;right:0;top:0;bottom:0;",!maptalks)throw new Error("Maptalks library must be included. See https://maptalks.org");this._maptalks=new maptalks.Map(this.dom,{center:r,zoom:i,doubleClickZoom:!1,fog:!1}),this._initEvents()}ui.prototype.setUnpainted=function(){};ui.prototype.resize=function(){this._maptalks.checkSize()};ui.prototype.getMaptalks=function(){return this._maptalks};ui.prototype.clear=function(){};ui.prototype.refresh=function(){this._maptalks.checkSize()};var hf=["mousedown","mouseup","click","dblclick","mousemove","mousewheel","DOMMouseScroll","touchstart","touchend","touchmove","touchcancel"];ui.prototype._initEvents=function(){var e=this.dom;this._handlers=this._handlers||{contextmenu:function(t){return t.preventDefault(),!1}},hf.forEach(function(t){this._handlers[t]=function(r){var i={};for(var n in r)i[n]=r[n];i.bubbles=!1;var a=new r.constructor(r.type,i);t==="mousewheel"||t==="DOMMouseScroll"?e.dispatchEvent(a):e.firstElementChild.dispatchEvent(a)},this.zr.dom.addEventListener(t,this._handlers[t])},this),this.zr.dom.addEventListener("contextmenu",this._handlers.contextmenu)};ui.prototype.dispose=function(){hf.forEach(function(e){this.zr.dom.removeEventListener(e,this._handlers[e])},this),this._maptalks.remove()};b.Shader.import(sf);const $m=Kn.extend({type:"maptalks3D",__ecgl__:!0,init:function(e,t){this._groundMesh=new b.Mesh({geometry:new b.PlaneGeometry,material:new b.Material({shader:new b.Shader({vertex:b.Shader.source("ecgl.displayShadow.vertex"),fragment:b.Shader.source("ecgl.displayShadow.fragment")}),depthMask:!1}),renderOrder:-100,culling:!1,castShadow:!1,$ignorePicking:!0,renderNormal:!0})},_initMaptalksLayer:function(e,t){var r=t.getZr();this._zrLayer=new ui("maptalks3D",r,e.get("center"),e.get("zoom")),r.painter.insertLayer(-1e3,this._zrLayer),this._lightRoot=new b.Node,this._sceneHelper=new ni(this._lightRoot),this._sceneHelper.initLight(this._lightRoot);var i=this._zrLayer.getMaptalks(),n=this._dispatchInteractAction.bind(this,t,i);["zoomend","zooming","zoomstart","dragrotating","pitch","pitchend","movestart","moving","moveend","resize","touchstart","touchmove","touchend","animating"].forEach(function(a){i.on(a,n)})},render:function(e,t,r){this._zrLayer||this._initMaptalksLayer(e,r);var i=this._zrLayer.getMaptalks(),n=e.get("urlTemplate"),a=i.getBaseLayer();n!==this._oldUrlTemplate&&(a?a.setOptions({urlTemplate:n,attribution:e.get("attribution")}):(a=new maptalks.TileLayer("maptalks-echarts-gl-baselayer",{urlTemplate:n,subdomains:["a","b","c"],attribution:e.get("attribution")}),i.setBaseLayer(a))),this._oldUrlTemplate=n,i.setCenter(e.get("center")),i.setZoom(e.get("zoom"),{animation:!1}),i.setPitch(e.get("pitch")),i.setBearing(e.get("bearing")),e.setMaptalks(i);var o=e.coordinateSystem;o.viewGL.scene.add(this._lightRoot),o.viewGL.add(this._groundMesh),this._updateGroundMesh(),this._sceneHelper.setScene(o.viewGL.scene),this._sceneHelper.updateLight(e),o.viewGL.setPostEffect(e.getModel("postEffect"),r),o.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling")),this._maptalks3DModel=e},afterRender:function(e,t,r,i){var n=i.renderer;this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r),e.coordinateSystem.viewGL.scene.traverse(function(a){a.material&&(a.material.define("fragment","NORMAL_UP_AXIS",2),a.material.define("fragment","NORMAL_FRONT_AXIS",1))})},updateCamera:function(e,t,r,i){e.coordinateSystem.setCameraOption(i),this._updateGroundMesh(),r.getZr().refresh()},_dispatchInteractAction:function(e,t,r){e.dispatchAction({type:"maptalks3DChangeCamera",pitch:t.getPitch(),zoom:Jm(t.getResolution())+1,center:t.getCenter().toArray(),bearing:t.getBearing(),maptalks3DId:this._maptalks3DModel&&this._maptalks3DModel.id})},_updateGroundMesh:function(){if(this._maptalks3DModel){var e=this._maptalks3DModel.coordinateSystem,t=e.dataToPoint(e.center);this._groundMesh.position.set(t[0],t[1],-.001);var r=new b.Plane(new b.Vector3(0,0,1),0),i=e.viewGL.camera.castRay(new b.Vector2(-1,-1)),n=e.viewGL.camera.castRay(new b.Vector2(1,1)),a=i.intersectPlane(r),o=n.intersectPlane(r),s=a.dist(o)/e.viewGL.rootNode.scale.x;this._groundMesh.scale.set(s,s,1)}},dispose:function(e,t){this._zrLayer&&this._zrLayer.dispose(),t.getZr().painter.delLayer(-1e3)}}),Qm=2*6378137*Math.PI/(256*Math.pow(2,20));function Jm(e){return 19-Math.log(e/Qm)/Math.LN2}function qn(){sn.apply(this,arguments),this.maxPitch=85,this.zoomOffset=1}qn.prototype=new sn;qn.prototype.constructor=qn;qn.prototype.type="maptalks3D";var eg=lf("maptalks3D",qn,function(e){e.forEach(function(t){t.setCameraOption(t.model.getMaptalksCameraOption())})});const tg=eg;function rg(e){e.registerComponentModel(Km),e.registerComponentView($m),e.registerCoordinateSystem("maptalks3D",tg),e.registerAction({type:"maptalks3DChangeCamera",event:"maptalks3dcamerachanged",update:"maptalks3D:updateCamera"},function(t,r){r.eachComponent({mainType:"maptalks3D",query:t},function(i){i.setMaptalksCameraOption(t)})})}Ct(rg);var ig=ht.vec3,ng=Ts.isDimensionStacked;function ag(e){var t=e[0],r=e[1];return!(t>0&&r>0||t<0&&r<0)}function og(e,t){var r=e.getData(),i=e.get("barSize");if(i==null){var n=t.size,a,o,s=t.getAxis("x"),l=t.getAxis("y");s.type==="category"?a=s.getBandWidth()*.7:a=Math.round(n[0]/Math.sqrt(r.count()))*.6,l.type==="category"?o=l.getBandWidth()*.7:o=Math.round(n[1]/Math.sqrt(r.count()))*.6,i=[a,o]}else ur(i)||(i=[i,i]);var h=t.getAxis("z").scale.getExtent(),u=ag(h),f=["x","y","z"].map(function(v){return e.coordDimToDataDim(v)[0]}),d=ng(r,f[2]),c=d?r.getCalculationInfo("stackResultDimension"):f[2];r.each(f,function(v,p,g,m){var _=r.get(c,m),x=d?_-g:u?0:h[0],y=t.dataToPoint([v,p,x]),T=t.dataToPoint([v,p,_]),w=ig.dist(y,T),E=[0,T[1]<y[1]?-1:1,0];Math.abs(w)===0&&(w=.1);var S=[i[0],w,i[1]];r.setItemLayout(m,[y,E,S])}),r.setLayout("orient",[1,0,0])}function zs(e,t,r){for(var i=e.getDataExtent(t),n=e.getDataExtent(r),a=i[1]-i[0]||i[0],o=n[1]-n[0]||n[0],s=50,l=new Uint8Array(s*s),h=0;h<e.count();h++){var u=e.get(t,h),f=e.get(r,h),d=Math.floor((u-i[0])/a*(s-1)),c=Math.floor((f-n[0])/o*(s-1)),v=c*s+d;l[v]=l[v]||1}for(var p=0,h=0;h<l.length;h++)l[h]&&p++;return p/l.length}var mh=ht.vec3,sg=Ts.isDimensionStacked;function lg(e,t){var r=e.getData(),i=e.get("minHeight")||0,n=e.get("barSize"),a=["lng","lat","alt"].map(function(h){return e.coordDimToDataDim(h)[0]});if(n==null){var o=t.radius*Math.PI,s=zs(r,a[0],a[1]);n=[o/Math.sqrt(r.count()/s),o/Math.sqrt(r.count()/s)]}else ur(n)||(n=[n,n]);var l=Gs(r,a);r.each(a,function(h,u,f,d){var c=r.get(l.dimension,d),v=l.isStacked?c-f:t.altitudeAxis.scale.getExtent()[0],p=Math.max(t.altitudeAxis.dataToCoord(f),i),g=t.dataToPoint([h,u,v]),m=t.dataToPoint([h,u,c]),_=mh.sub([],m,g);mh.normalize(_,_);var x=[n[0],p,n[1]];r.setItemLayout(d,[g,_,x])}),r.setLayout("orient",Z.UP.array)}function hg(e,t){var r=e.getData(),i=e.get("barSize"),n=e.get("minHeight")||0,a=["lng","lat","alt"].map(function(u){return e.coordDimToDataDim(u)[0]});if(i==null){var o=Math.min(t.size[0],t.size[2]),s=zs(r,a[0],a[1]);i=[o/Math.sqrt(r.count()/s),o/Math.sqrt(r.count()/s)]}else ur(i)||(i=[i,i]);var l=[0,1,0],h=Gs(r,a);r.each(a,function(u,f,d,c){var v=r.get(h.dimension,c),p=h.isStacked?v-d:t.altitudeAxis.scale.getExtent()[0],g=Math.max(t.altitudeAxis.dataToCoord(d),n),m=t.dataToPoint([u,f,p]),_=[i[0],g,i[1]];r.setItemLayout(c,[m,l,_])}),r.setLayout("orient",[1,0,0])}function ug(e,t){var r=e.getData(),i=e.coordDimToDataDim("lng")[0],n=e.coordDimToDataDim("lat")[0],a=e.coordDimToDataDim("alt")[0],o=e.get("barSize"),s=e.get("minHeight")||0;if(o==null){var l=r.getDataExtent(i),h=r.getDataExtent(n),u=t.dataToPoint([l[0],h[0]]),f=t.dataToPoint([l[1],h[1]]),d=Math.min(Math.abs(u[0]-f[0]),Math.abs(u[1]-f[1]))||1,c=zs(r,i,n);o=[d/Math.sqrt(r.count()/c),d/Math.sqrt(r.count()/c)]}else ur(o)||(o=[o,o]),o[0]/=t.getScale()/16,o[1]/=t.getScale()/16;var v=[0,0,1],p=[i,n,a],g=Gs(r,p);r.each(p,function(m,_,x,y){var T=r.get(g.dimension,y),w=g.isStacked?T-x:0,E=t.dataToPoint([m,_,w]),S=t.dataToPoint([m,_,T]),D=Math.max(S[2]-E[2],s),M=[o[0],D,o[1]];r.setItemLayout(y,[E,v,M])}),r.setLayout("orient",[1,0,0])}function Gs(e,t){var r=sg(e,t[2]);return{dimension:r?e.getCalculationInfo("stackResultDimension"):t[2],isStacked:r}}function fg(e){e.registerLayout(function(t,r){t.eachSeriesByType("bar3D",function(i){var n=i.coordinateSystem,a=n&&n.type;a==="globe"?lg(i,n):a==="cartesian3D"?og(i,n):a==="geo3D"?hg(i,n):(a==="mapbox3D"||a==="maptalks3D")&&ug(i,n)})})}var ks={};ks.getFormattedLabel=function(e,t,r,i,n){r=r||"normal";var a=e.getData(i),o=a.getItemModel(t),s=e.getDataParams(t,i);n!=null&&s.value instanceof Array&&(s.value=s.value[n]);var l=o.get(r==="normal"?["label","formatter"]:["emphasis","label","formatter"]);l==null&&(l=o.get(["label","formatter"]));var h;return typeof l=="function"?(s.status=r,h=l(s)):typeof l=="string"&&(h=Jf(l,s)),h};ks.normalizeToArray=function(e){return e instanceof Array?e:e==null?[]:[e]};const mn=ks;function cg(e,t){var r=[];return ir(e.dimensions,function(i){var n=e.getDimensionInfo(i),a=n.otherDims,o=a[t];o!=null&&o!==!1&&(r[o]=n.name)}),r}function ta(e,t,r){function i(f){var d=[],c=cg(n,"tooltip");c.length?ir(c,function(p){v(n.get(p,t),p)}):ir(f,v);function v(p,g){var m=n.getDimensionInfo(g);if(!(!m||m.otherDims.tooltip===!1)){var _=m.type,x="- "+(m.tooltipName||m.name)+": "+(_==="ordinal"?p+"":_==="time"?r?"":rc("yyyy/MM/dd hh:mm:ss",p):sl(p));x&&d.push(Zi(x))}}return"<br/>"+d.join("<br/>")}var n=e.getData(),a=e.getRawValue(t),o=ur(a)?i(a):Zi(sl(a)),s=n.getName(t),l=wt(n,t);ec(l)&&l.colorStops&&(l=(l.colorStops[0]||{}).color),l=l||"transparent";var h=tc(l),u=e.name;return u==="\0-"&&(u=""),u=u?Zi(u)+(r?": ":"<br/>"):"",r?h+u+o:u+h+(s?Zi(s)+": "+o:o)}function ho(e,t,r){r=r||e.getSource();var i=t||Kh(e.get("coordinateSystem"))||["x","y","z"],n=hn(r,{dimensionsDefine:r.dimensionsDefine||e.get("dimensions"),encodeDefine:r.encodeDefine||e.get("encode"),coordDimensions:i.map(function(s){var l=e.getReferringComponents(s+"Axis3D").models[0];return{type:l&&l.get("type")==="category"?"ordinal":"float",name:s}})});e.get("coordinateSystem")==="cartesian3D"&&n.forEach(function(s){if(i.indexOf(s.coordDim)>=0){var l=e.getReferringComponents(s.coordDim+"Axis3D").models[0];l&&l.get("type")==="category"&&(s.ordinalMeta=l.getOrdinalMeta())}});var a=Ts.enableDataStack(e,n,{byIndex:!0,stackedCoordDimension:"z"}),o=new fr(n,e);return o.setCalculationInfo(a),o.initData(r),o}var uf=Wt.extend({type:"series.bar3D",dependencies:["globe"],visualStyleAccessPathvisu:"itemStyle",getInitialData:function(e,t){return ho(this)},getFormattedLabel:function(e,t,r,i){var n=mn.getFormattedLabel(this,e,t,r,i);return n==null&&(n=this.getData().get("z",e)),n},formatTooltip:function(e){return ta(this,e)},defaultOption:{coordinateSystem:"cartesian3D",globeIndex:0,grid3DIndex:0,zlevel:-10,bevelSize:0,bevelSmoothness:2,onGridPlane:"xy",shading:"color",minHeight:0,itemStyle:{opacity:1},label:{show:!1,distance:2,textStyle:{fontSize:14,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:3}},emphasis:{label:{show:!0}},animationDurationUpdate:500}});Be(uf.prototype,vn);const dg=uf;var et=ht.vec3,vg=ht.mat3,Hs=Pe.extend(function(){return{attributes:{position:new Pe.Attribute("position","float",3,"POSITION"),normal:new Pe.Attribute("normal","float",3,"NORMAL"),color:new Pe.Attribute("color","float",4,"COLOR"),prevPosition:new Pe.Attribute("prevPosition","float",3),prevNormal:new Pe.Attribute("prevNormal","float",3)},dynamic:!0,enableNormal:!1,bevelSize:1,bevelSegments:0,_dataIndices:null,_vertexOffset:0,_triangleOffset:0}},{resetOffset:function(){this._vertexOffset=0,this._triangleOffset=0},setBarCount:function(e){var t=this.enableNormal,r=this.getBarVertexCount()*e,i=this.getBarTriangleCount()*e;this.vertexCount!==r&&(this.attributes.position.init(r),t?this.attributes.normal.init(r):this.attributes.normal.value=null,this.attributes.color.init(r)),this.triangleCount!==i&&(this.indices=r>65535?new Uint32Array(i*3):new Uint16Array(i*3),this._dataIndices=new Uint32Array(r))},getBarVertexCount:function(){var e=this.bevelSize>0?this.bevelSegments:0;return e>0?this._getBevelBarVertexCount(e):this.enableNormal?24:8},getBarTriangleCount:function(){var e=this.bevelSize>0?this.bevelSegments:0;return e>0?this._getBevelBarTriangleCount(e):12},_getBevelBarVertexCount:function(e){return(e+1)*4*(e+1)*2},_getBevelBarTriangleCount:function(e){var t=e*4+3,r=e*2+1;return(t+1)*r*2+4},setColor:function(e,t){for(var r=this.getBarVertexCount(),i=r*e,n=r*(e+1),a=i;a<n;a++)this.attributes.color.set(a,t);this.dirtyAttribute("color")},getDataIndexOfVertex:function(e){return this._dataIndices?this._dataIndices[e]:null},addBar:function(){for(var e=et.create,t=et.scaleAndAdd,r=e(),i=e(),n=e(),a=e(),o=e(),s=e(),l=e(),h=[],u=[],f=0;f<8;f++)h[f]=e();for(var d=[[0,1,5,4],[2,3,7,6],[4,5,6,7],[3,2,1,0],[0,4,7,3],[1,2,6,5]],c=[0,1,2,0,2,3],v=[],f=0;f<d.length;f++)for(var p=d[f],g=0;g<2;g++){for(var m=[],_=0;_<3;_++)m.push(p[c[g*3+_]]);v.push(m)}return function(x,y,T,w,E,S){var D=this._vertexOffset;if(this.bevelSize>0&&this.bevelSegments>0)this._addBevelBar(x,y,T,w,this.bevelSize,this.bevelSegments,E);else{et.copy(n,y),et.normalize(n,n),et.cross(a,T,n),et.normalize(a,a),et.cross(i,n,a),et.normalize(a,a),et.negate(o,i),et.negate(s,n),et.negate(l,a),t(h[0],x,i,w[0]/2),t(h[0],h[0],a,w[2]/2),t(h[1],x,i,w[0]/2),t(h[1],h[1],l,w[2]/2),t(h[2],x,o,w[0]/2),t(h[2],h[2],l,w[2]/2),t(h[3],x,o,w[0]/2),t(h[3],h[3],a,w[2]/2),t(r,x,n,w[1]),t(h[4],r,i,w[0]/2),t(h[4],h[4],a,w[2]/2),t(h[5],r,i,w[0]/2),t(h[5],h[5],l,w[2]/2),t(h[6],r,o,w[0]/2),t(h[6],h[6],l,w[2]/2),t(h[7],r,o,w[0]/2),t(h[7],h[7],a,w[2]/2);var M=this.attributes;if(this.enableNormal){u[0]=i,u[1]=o,u[2]=n,u[3]=s,u[4]=a,u[5]=l;for(var C=this._vertexOffset,N=0;N<d.length;N++){for(var O=this._triangleOffset*3,P=0;P<6;P++)this.indices[O++]=C+c[P];C+=4,this._triangleOffset+=2}for(var N=0;N<d.length;N++)for(var F=u[N],P=0;P<4;P++){var H=d[N][P];M.position.set(this._vertexOffset,h[H]),M.normal.set(this._vertexOffset,F),M.color.set(this._vertexOffset++,E)}}else{for(var N=0;N<v.length;N++){for(var O=this._triangleOffset*3,P=0;P<3;P++)this.indices[O+P]=v[N][P]+this._vertexOffset;this._triangleOffset++}for(var N=0;N<h.length;N++)M.position.set(this._vertexOffset,h[N]),M.color.set(this._vertexOffset++,E)}}for(var Y=this._vertexOffset,N=D;N<Y;N++)this._dataIndices[N]=S}}(),_addBevelBar:function(){var e=et.create(),t=et.create(),r=et.create(),i=vg.create(),n=[],a=[1,-1,-1,1],o=[1,1,-1,-1],s=[2,0];return function(l,h,u,f,d,c,v){et.copy(t,h),et.normalize(t,t),et.cross(r,u,t),et.normalize(r,r),et.cross(e,t,r),et.normalize(r,r),i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=t[0],i[4]=t[1],i[5]=t[2],i[6]=r[0],i[7]=r[1],i[8]=r[2],d=Math.min(f[0],f[2])/2*d;for(var p=0;p<3;p++)n[p]=Math.max(f[p]-d*2,0);for(var g=(f[0]-n[0])/2,m=(f[1]-n[1])/2,_=(f[2]-n[2])/2,x=[],y=[],T=this._vertexOffset,w=[],p=0;p<2;p++){w[p]=w[p]=[];for(var E=0;E<=c;E++)for(var S=0;S<4;S++){(E===0&&p===0||p===1&&E===c)&&w[p].push(T);for(var D=0;D<=c;D++){var M=D/c*Math.PI/2+Math.PI/2*S,C=E/c*Math.PI/2+Math.PI/2*p;y[0]=g*Math.cos(M)*Math.sin(C),y[1]=m*Math.cos(C),y[2]=_*Math.sin(M)*Math.sin(C),x[0]=y[0]+a[S]*n[0]/2,x[1]=y[1]+m+s[p]*n[1]/2,x[2]=y[2]+o[S]*n[2]/2,Math.abs(g-m)<1e-6&&Math.abs(m-_)<1e-6||(y[0]/=g*g,y[1]/=m*m,y[2]/=_*_),et.normalize(y,y),et.transformMat3(x,x,i),et.transformMat3(y,y,i),et.add(x,x,l),this.attributes.position.set(T,x),this.enableNormal&&this.attributes.normal.set(T,y),this.attributes.color.set(T,v),T++}}}for(var N=c*4+3,O=c*2+1,P=N+1,S=0;S<O;S++)for(var p=0;p<=N;p++){var F=S*P+p+this._vertexOffset,H=S*P+(p+1)%P+this._vertexOffset,Y=(S+1)*P+(p+1)%P+this._vertexOffset,z=(S+1)*P+p+this._vertexOffset;this.setTriangleIndices(this._triangleOffset++,[Y,F,H]),this.setTriangleIndices(this._triangleOffset++,[Y,z,F])}this.setTriangleIndices(this._triangleOffset++,[w[0][0],w[0][2],w[0][1]]),this.setTriangleIndices(this._triangleOffset++,[w[0][0],w[0][3],w[0][2]]),this.setTriangleIndices(this._triangleOffset++,[w[1][0],w[1][1],w[1][2]]),this.setTriangleIndices(this._triangleOffset++,[w[1][0],w[1][2],w[1][3]]),this._vertexOffset=T}}()});si(Hs.prototype,Jn);si(Hs.prototype,Bs);const pg=Hs;var mg=ht.vec3;const gg=Xt.extend({type:"bar3D",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this._api=t,this._labelsBuilder=new Br(256,256,t);var r=this;this._labelsBuilder.getLabelPosition=function(i,n,a){if(r._data){var o=r._data.getItemLayout(i),s=o[0],l=o[1],h=o[2][1];return mg.scaleAndAdd([],s,l,a+h)}else return[0,0]},this._labelsBuilder.getMesh().renderOrder=100},render:function(e,t,r){var i=this._prevBarMesh;this._prevBarMesh=this._barMesh,this._barMesh=i,this._barMesh||(this._barMesh=new b.Mesh({geometry:new pg,shadowDepthMaterial:new b.Material({shader:new b.Shader(b.Shader.source("ecgl.sm.depth.vertex"),b.Shader.source("ecgl.sm.depth.fragment"))}),culling:e.coordinateSystem.type==="cartesian3D",renderOrder:10,renderNormal:!0})),this.groupGL.remove(this._prevBarMesh),this.groupGL.add(this._barMesh),this.groupGL.add(this._labelsBuilder.getMesh());var n=e.coordinateSystem;if(this._doRender(e,r),n&&n.viewGL){n.viewGL.add(this.groupGL);var a=n.viewGL.isLinearSpace()?"define":"undefine";this._barMesh.material[a]("fragment","SRGB_DECODE")}this._data=e.getData(),this._labelsBuilder.updateData(this._data),this._labelsBuilder.updateLabels(),this._updateAnimation(e)},_updateAnimation:function(e){b.updateVertexAnimation([["prevPosition","position"],["prevNormal","normal"]],this._prevBarMesh,this._barMesh,e)},_doRender:function(e,t){var r=e.getData(),i=e.get("shading"),n=i!=="color",a=this,o=this._barMesh,s="ecgl."+i;(!o.material||o.material.shader.name!==s)&&(o.material=b.createMaterial(s,["VERTEX_COLOR"])),b.setMaterialFromModel(i,o.material,e,t),o.geometry.enableNormal=n,o.geometry.resetOffset();var l=e.get("bevelSize"),h=e.get("bevelSmoothness");o.geometry.bevelSegments=h,o.geometry.bevelSize=l;var u=[],f=new Float32Array(r.count()*4),d=0,g=0,c=!1;r.each(function(_){if(r.hasValue(_)){var x=wt(r,_),y=Tt(r,_);y==null&&(y=1),b.parseColor(x,u),u[3]*=y,f[d++]=u[0],f[d++]=u[1],f[d++]=u[2],f[d++]=u[3],u[3]>0&&(g++,u[3]<.99&&(c=!0))}}),o.geometry.setBarCount(g);var v=r.getLayout("orient"),p=this._barIndexOfData=new Int32Array(r.count()),g=0;r.each(function(_){if(!r.hasValue(_)){p[_]=-1;return}var x=r.getItemLayout(_),y=x[0],T=x[1],w=x[2],E=_*4;u[0]=f[E++],u[1]=f[E++],u[2]=f[E++],u[3]=f[E++],u[3]>0&&(a._barMesh.geometry.addBar(y,T,v,w,u,_),p[_]=g++)}),o.geometry.dirty(),o.geometry.updateBoundingBox();var m=o.material;m.transparent=c,m.depthMask=!c,o.geometry.sortTriangles=c,this._initHandler(e,t)},_initHandler:function(e,t){var r=e.getData(),i=this._barMesh,n=e.coordinateSystem.type==="cartesian3D";i.seriesIndex=e.seriesIndex;var a=-1;i.off("mousemove"),i.off("mouseout"),i.on("mousemove",function(o){var s=i.geometry.getDataIndexOfVertex(o.triangle[0]);s!==a&&(this._downplay(a),this._highlight(s),this._labelsBuilder.updateLabels([s]),n&&t.dispatchAction({type:"grid3DShowAxisPointer",value:[r.get("x",s),r.get("y",s),r.get("z",s,!0)]})),a=s,i.dataIndex=s},this),i.on("mouseout",function(o){this._downplay(a),this._labelsBuilder.updateLabels(),a=-1,i.dataIndex=-1,n&&t.dispatchAction({type:"grid3DHideAxisPointer"})},this)},_highlight:function(e){var t=this._data;if(t){var r=this._barIndexOfData[e];if(!(r<0)){var i=t.getItemModel(e),n=i.getModel("emphasis.itemStyle"),a=n.get("color"),o=n.get("opacity");if(a==null){var s=wt(t,e);a=xs(s,-.4)}o==null&&(o=Tt(t,e));var l=b.parseColor(a);l[3]*=o,this._barMesh.geometry.setColor(r,l),this._api.getZr().refresh()}}},_downplay:function(e){var t=this._data;if(t){var r=this._barIndexOfData[e];if(!(r<0)){var i=wt(t,e),n=Tt(t,e),a=b.parseColor(i);a[3]*=n,this._barMesh.geometry.setColor(r,a),this._api.getZr().refresh()}}},highlight:function(e,t,r,i){this._toggleStatus("highlight",e,t,r,i)},downplay:function(e,t,r,i){this._toggleStatus("downplay",e,t,r,i)},_toggleStatus:function(e,t,r,i,n){var a=t.getData(),o=xe.queryDataIndex(a,n),s=this;o!=null?ir(mn.normalizeToArray(o),function(l){e==="highlight"?this._highlight(l):this._downplay(l)},this):a.each(function(l){e==="highlight"?s._highlight(l):s._downplay(l)})},remove:function(){this.groupGL.removeAll()},dispose:function(){this._labelsBuilder.dispose(),this.groupGL.removeAll()}});function _g(e){e.registerChartView(gg),e.registerSeriesModel(dg),fg(e),e.registerProcessor(function(t,r){t.eachSeriesByType("bar3d",function(i){var n=i.getData();n.filterSelf(function(a){return n.hasValue(a)})})})}Ct(_g);var yg=Wt.extend({type:"series.line3D",dependencies:["grid3D"],visualStyleAccessPath:"lineStyle",visualDrawType:"stroke",getInitialData:function(e,t){return ho(this)},formatTooltip:function(e){return ta(this,e)},defaultOption:{coordinateSystem:"cartesian3D",zlevel:-10,grid3DIndex:0,lineStyle:{width:2},animationDurationUpdate:500}});const xg=yg;var Tg=ht.vec3;b.Shader.import(lo);const wg=Xt.extend({type:"line3D",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this._api=t},render:function(e,t,r){var i=this._prevLine3DMesh;this._prevLine3DMesh=this._line3DMesh,this._line3DMesh=i,this._line3DMesh||(this._line3DMesh=new b.Mesh({geometry:new Ii({useNativeLine:!1,sortTriangles:!0}),material:new b.Material({shader:b.createShader("ecgl.meshLines3D")}),renderOrder:10}),this._line3DMesh.geometry.pick=this._pick.bind(this)),this.groupGL.remove(this._prevLine3DMesh),this.groupGL.add(this._line3DMesh);var n=e.coordinateSystem;if(n&&n.viewGL){n.viewGL.add(this.groupGL);var a=n.viewGL.isLinearSpace()?"define":"undefine";this._line3DMesh.material[a]("fragment","SRGB_DECODE")}this._doRender(e,r),this._data=e.getData(),this._camera=n.viewGL.camera,this.updateCamera(),this._updateAnimation(e)},updateCamera:function(){this._updateNDCPosition()},_doRender:function(e,t){var r=e.getData(),i=this._line3DMesh;i.geometry.resetOffset();var n=r.getLayout("points"),a=[],o=new Float32Array(n.length/3*4),s=0,l=!1;r.each(function(f){var d=wt(r,f),c=Tt(r,f);c==null&&(c=1),b.parseColor(d,a),a[3]*=c,o[s++]=a[0],o[s++]=a[1],o[s++]=a[2],o[s++]=a[3],a[3]<.99&&(l=!0)}),i.geometry.setVertexCount(i.geometry.getPolylineVertexCount(n)),i.geometry.setTriangleCount(i.geometry.getPolylineTriangleCount(n)),i.geometry.addPolyline(n,o,xe.firstNotNull(e.get("lineStyle.width"),1)),i.geometry.dirty(),i.geometry.updateBoundingBox();var h=i.material;h.transparent=l,h.depthMask=!l;var u=e.getModel("debug.wireframe");u.get("show")?(i.geometry.createAttribute("barycentric","float",3),i.geometry.generateBarycentric(),i.material.set("both","WIREFRAME_TRIANGLE"),i.material.set("wireframeLineColor",b.parseColor(u.get("lineStyle.color")||"rgba(0,0,0,0.5)")),i.material.set("wireframeLineWidth",xe.firstNotNull(u.get("lineStyle.width"),1))):i.material.set("both","WIREFRAME_TRIANGLE"),this._points=n,this._initHandler(e,t)},_updateAnimation:function(e){b.updateVertexAnimation([["prevPosition","position"],["prevPositionPrev","positionPrev"],["prevPositionNext","positionNext"]],this._prevLine3DMesh,this._line3DMesh,e)},_initHandler:function(e,t){var r=e.getData(),i=e.coordinateSystem,n=this._line3DMesh,a=-1;n.seriesIndex=e.seriesIndex,n.off("mousemove"),n.off("mouseout"),n.on("mousemove",function(o){var s=i.pointToData(o.point.array),l=r.indicesOfNearest("x",s[0])[0];l!==a&&(t.dispatchAction({type:"grid3DShowAxisPointer",value:[r.get("x",l),r.get("y",l),r.get("z",l)]}),n.dataIndex=l),a=l},this),n.on("mouseout",function(o){a=-1,n.dataIndex=-1,t.dispatchAction({type:"grid3DHideAxisPointer"})},this)},_updateNDCPosition:function(){var e=new re,t=this._camera;re.multiply(e,t.projectionMatrix,t.viewMatrix);var r=this._positionNDC,i=this._points,n=i.length/3;(!r||r.length/2!==n)&&(r=this._positionNDC=new Float32Array(n*2));for(var a=[],o=0;o<n;o++){var s=o*3,l=o*2;a[0]=i[s],a[1]=i[s+1],a[2]=i[s+2],a[3]=1,Tg.transformMat4(a,a,e.array),r[l]=a[0]/a[3],r[l+1]=a[1]/a[3]}},_pick:function(e,t,r,i,n,a){var o=this._positionNDC,s=this._data.hostModel,l=s.get("lineStyle.width"),h=-1,u=r.viewport.width,f=r.viewport.height,d=u*.5,c=f*.5;e=(e+1)*d,t=(t+1)*c;for(var v=1;v<o.length/2;v++){var p=(o[(v-1)*2]+1)*d,g=(o[(v-1)*2+1]+1)*c,m=(o[v*2]+1)*d,_=(o[v*2+1]+1)*c;if(ic(p,g,m,_,l,e,t)){var x=(p-e)*(p-e)+(g-t)*(g-t),y=(m-e)*(m-e)+(_-t)*(_-t);h=x<y?v-1:v}}if(h>=0){var T=h*3,w=new Z(this._points[T],this._points[T+1],this._points[T+2]);a.push({dataIndex:h,point:w,pointWorld:w.clone(),target:this._line3DMesh,distance:this._camera.getWorldPosition().dist(w)})}},remove:function(){this.groupGL.removeAll()},dispose:function(){this.groupGL.removeAll()}});function bg(e){e.registerChartView(wg),e.registerSeriesModel(xg),e.registerLayout(function(t,r){t.eachSeriesByType("line3D",function(i){var n=i.getData(),a=i.coordinateSystem;if(a){if(a.type!=="cartesian3D")return;var o=new Float32Array(n.count()*3),s=[],l=[],h=a.dimensions,u=h.map(function(f){return i.coordDimToDataDim(f)[0]});a&&n.each(u,function(f,d,c,v){s[0]=f,s[1]=d,s[2]=c,a.dataToPoint(s,l),o[v*3]=l[0],o[v*3+1]=l[1],o[v*3+2]=l[2]}),n.setLayout("points",o)}})})}Ct(bg);const Sg=Wt.extend({type:"series.scatter3D",dependencies:["globe","grid3D","geo3D"],visualStyleAccessPath:"itemStyle",hasSymbolVisual:!0,getInitialData:function(e,t){return ho(this)},getFormattedLabel:function(e,t,r,i){var n=mn.getFormattedLabel(this,e,t,r,i);if(n==null){var a=this.getData(),o=a.dimensions[a.dimensions.length-1];n=a.get(o,e)}return n},formatTooltip:function(e){return ta(this,e)},defaultOption:{coordinateSystem:"cartesian3D",zlevel:-10,progressive:1e5,progressiveThreshold:1e5,grid3DIndex:0,globeIndex:0,symbol:"circle",symbolSize:10,blendMode:"source-over",label:{show:!1,position:"right",distance:5,textStyle:{fontSize:14,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:3}},itemStyle:{opacity:.8},emphasis:{label:{show:!0}},animationDurationUpdate:500}});function qo(e,i,r){var i=i||document.createElement("canvas");i.width=e,i.height=e;var n=i.getContext("2d");return r&&r(n),i}function Eg(e,t,r,i){ur(t)||(t=[t,t]);var n=Vs.getMarginByStyle(r,i),a=t[0]+n.left+n.right,o=t[1]+n.top+n.bottom,s=nc(e,0,0,t[0],t[1]),l=Math.max(a,o);s.x=n.left,s.y=n.top,a>o?s.y+=(l-o)/2:s.x+=(l-a)/2;var h=s.getBoundingRect();return s.x-=h.x,s.y-=h.y,s.setStyle(r),s.update(),s.__size=l,s}function Ag(e,t,r){var i=t.width,n=t.height,a=e.canvas.width,o=e.canvas.height,s=i/a,l=n/o;function h(m){return m<128?1:-1}function u(m,_){var x=1/0;m=Math.floor(m*s),_=Math.floor(_*l);for(var y=_*i+m,T=t.data[y*4],w=h(T),E=Math.max(_-r,0);E<Math.min(_+r,n);E++)for(var S=Math.max(m-r,0);S<Math.min(m+r,i);S++){var y=E*i+S,D=t.data[y*4],M=h(D),C=S-m,N=E-_;if(w!==M){var O=C*C+N*N;O<x&&(x=O)}}return w*Math.sqrt(x)}for(var f=e.createImageData(a,o),d=0;d<o;d++)for(var c=0;c<a;c++){var v=u(c,d),p=v/r*.5+.5,g=(d*a+c)*4;f.data[g++]=(1-p)*255,f.data[g++]=(1-p)*255,f.data[g++]=(1-p)*255,f.data[g++]=255}return f}var Vs={getMarginByStyle:function(e){var t=e.minMargin||0,r=0;e.stroke&&e.stroke!=="none"&&(r=e.lineWidth==null?1:e.lineWidth);var i=e.shadowBlur||0,n=e.shadowOffsetX||0,a=e.shadowOffsetY||0,o={};return o.left=Math.max(r/2,-n+i,t),o.right=Math.max(r/2,n+i,t),o.top=Math.max(r/2,-a+i,t),o.bottom=Math.max(r/2,a+i,t),o},createSymbolSprite:function(e,t,r,i){var n=Eg(e,t,r),a=Vs.getMarginByStyle(r);return{image:qo(n.__size,i,function(o){jh(o,n)}),margin:a}},createSDFFromCanvas:function(e,t,r,i){return qo(t,i,function(n){var a=e.getContext("2d"),o=a.getImageData(0,0,e.width,e.height);n.putImageData(Ag(n,o,r),0,0)})},createSimpleSprite:function(e,t){return qo(e,t,function(r){var i=e/2;r.beginPath(),r.arc(i,i,60,0,Math.PI*2,!1),r.closePath();var n=r.createRadialGradient(i,i,0,i,i,i);n.addColorStop(0,"rgba(255, 255, 255, 1)"),n.addColorStop(.5,"rgba(255, 255, 255, 0.5)"),n.addColorStop(1,"rgba(255, 255, 255, 0)"),r.fillStyle=n,r.fill()})}};const gh=Vs;var _h=ht.vec3;const Cg={needsSortVertices:function(){return this.sortVertices},needsSortVerticesProgressively:function(){return this.needsSortVertices()&&this.vertexCount>=2e4},doSortVertices:function(e,t){var r=this.indices,i=_h.create();if(!r){r=this.indices=this.vertexCount>65535?new Uint32Array(this.vertexCount):new Uint16Array(this.vertexCount);for(var n=0;n<r.length;n++)r[n]=n}if(t===0){var a=this.attributes.position,e=e.array,o=0;(!this._zList||this._zList.length!==this.vertexCount)&&(this._zList=new Float32Array(this.vertexCount));for(var s,n=0;n<this.vertexCount;n++){a.get(n,i);var l=_h.sqrDist(i,e);isNaN(l)&&(l=1e7,o++),n===0?(s=l,l=0):l=l-s,this._zList[n]=l}this._noneCount=o}if(this.vertexCount<2e4)t===0&&this._simpleSort(this._noneCount/this.vertexCount>.05);else for(var n=0;n<3;n++)this._progressiveQuickSort(t*3+n);this.dirtyIndices()},_simpleSort:function(e){var t=this._zList,r=this.indices;function i(n,a){return t[a]-t[n]}e?Array.prototype.sort.call(r,i):an.sort(r,i,0,r.length-1)},_progressiveQuickSort:function(e){var t=this._zList,r=this.indices;this._quickSort=this._quickSort||new an,this._quickSort.step(r,function(i,n){return t[n]-t[i]},e)}},Lg=`@export ecgl.sdfSprite.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform float elapsedTime : 0;

attribute vec3 position : POSITION;

#ifdef VERTEX_SIZE
attribute float size;
#else
uniform float u_Size;
#endif

#ifdef VERTEX_COLOR
attribute vec4 a_FillColor: COLOR;
varying vec4 v_Color;
#endif

#ifdef VERTEX_ANIMATION
attribute vec3 prevPosition;
attribute float prevSize;
uniform float percent : 1.0;
#endif


#ifdef POSITIONTEXTURE_ENABLED
uniform sampler2D positionTexture;
#endif

varying float v_Size;

void main()
{

#ifdef POSITIONTEXTURE_ENABLED
 gl_Position = worldViewProjection * vec4(texture2D(positionTexture, position.xy).xy, -10.0, 1.0);
#else

 #ifdef VERTEX_ANIMATION
 vec3 pos = mix(prevPosition, position, percent);
 #else
 vec3 pos = position;
 #endif
 gl_Position = worldViewProjection * vec4(pos, 1.0);
#endif

#ifdef VERTEX_SIZE
#ifdef VERTEX_ANIMATION
 v_Size = mix(prevSize, size, percent);
#else
 v_Size = size;
#endif
#else
 v_Size = u_Size;
#endif

#ifdef VERTEX_COLOR
 v_Color = a_FillColor;
 #endif

 gl_PointSize = v_Size;
}

@end

@export ecgl.sdfSprite.fragment

uniform vec4 color: [1, 1, 1, 1];
uniform vec4 strokeColor: [1, 1, 1, 1];
uniform float smoothing: 0.07;

uniform float lineWidth: 0.0;

#ifdef VERTEX_COLOR
varying vec4 v_Color;
#endif

varying float v_Size;

uniform sampler2D sprite;

@import clay.util.srgb

void main()
{
 gl_FragColor = color;

 vec4 _strokeColor = strokeColor;

#ifdef VERTEX_COLOR
 gl_FragColor *= v_Color;
 #endif

#ifdef SPRITE_ENABLED
 float d = texture2D(sprite, gl_PointCoord).r;
 gl_FragColor.a *= smoothstep(0.5 - smoothing, 0.5 + smoothing, d);

 if (lineWidth > 0.0) {
 float sLineWidth = lineWidth / 2.0;

 float outlineMaxValue0 = 0.5 + sLineWidth;
 float outlineMaxValue1 = 0.5 + sLineWidth + smoothing;
 float outlineMinValue0 = 0.5 - sLineWidth - smoothing;
 float outlineMinValue1 = 0.5 - sLineWidth;

 if (d <= outlineMaxValue1 && d >= outlineMinValue0) {
 float a = _strokeColor.a;
 if (d <= outlineMinValue1) {
 a = a * smoothstep(outlineMinValue0, outlineMinValue1, d);
 }
 else {
 a = a * smoothstep(outlineMaxValue1, outlineMaxValue0, d);
 }
 gl_FragColor.rgb = mix(gl_FragColor.rgb * gl_FragColor.a, _strokeColor.rgb, a);
 gl_FragColor.a = gl_FragColor.a * (1.0 - a) + a;
 }
 }
#endif

#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(gl_FragColor);
#endif
}
@end`;var Yo=ht.vec4;b.Shader.import(Lg);var Mg=b.Mesh.extend(function(){var e=new b.Geometry({dynamic:!0,attributes:{color:new b.Geometry.Attribute("color","float",4,"COLOR"),position:new b.Geometry.Attribute("position","float",3,"POSITION"),size:new b.Geometry.Attribute("size","float",1),prevPosition:new b.Geometry.Attribute("prevPosition","float",3),prevSize:new b.Geometry.Attribute("prevSize","float",1)}});Object.assign(e,Cg);var t=new b.Material({shader:b.createShader("ecgl.sdfSprite"),transparent:!0,depthMask:!1});t.enableTexture("sprite"),t.define("both","VERTEX_COLOR"),t.define("both","VERTEX_SIZE");var r=new b.Texture2D({image:document.createElement("canvas"),flipY:!1});return t.set("sprite",r),e.pick=this._pick.bind(this),{geometry:e,material:t,mode:b.Mesh.POINTS,sizeScale:1}},{_pick:function(e,t,r,i,n,a){var o=this._positionNDC;if(o)for(var s=r.viewport,l=2/s.width,h=2/s.height,u=this.geometry.vertexCount-1;u>=0;u--){var f;this.geometry.indices?f=this.geometry.indices[u]:f=u;var d=o[f*2],c=o[f*2+1],v=this.geometry.attributes.size.get(f)/this.sizeScale,p=v/2;if(e>d-p*l&&e<d+p*l&&t>c-p*h&&t<c+p*h){var g=new b.Vector3,m=new b.Vector3;this.geometry.attributes.position.get(f,g.array),b.Vector3.transformMat4(m,g,this.worldTransform),a.push({vertexIndex:f,point:g,pointWorld:m,target:this,distance:m.distance(i.getWorldPosition())})}}},updateNDCPosition:function(e,t,r){var i=this._positionNDC,n=this.geometry;(!i||i.length/2!==n.vertexCount)&&(i=this._positionNDC=new Float32Array(n.vertexCount*2));for(var a=Yo.create(),o=0;o<n.vertexCount;o++)n.attributes.position.get(o,a),a[3]=1,Yo.transformMat4(a,a,e.array),Yo.scale(a,a,1/a[3]),i[o*2]=a[0],i[o*2+1]=a[1]}});const Dg=Mg;var yh=20,xh=-10;function Pg(e,t){return e&&t&&e[0]===t[0]&&e[1]===t[1]}function Mi(e,t){this.rootNode=new b.Node,this.is2D=e,this._labelsBuilder=new Br(256,256,t),this._labelsBuilder.getMesh().renderOrder=100,this.rootNode.add(this._labelsBuilder.getMesh()),this._api=t,this._spriteImageCanvas=document.createElement("canvas"),this._startDataIndex=0,this._endDataIndex=0,this._sizeScale=1}Mi.prototype={constructor:Mi,highlightOnMouseover:!0,update:function(e,t,r,i,n){var a=this._prevMesh;this._prevMesh=this._mesh,this._mesh=a;var o=e.getData();if(i==null&&(i=0),n==null&&(n=o.count()),this._startDataIndex=i,this._endDataIndex=n-1,!this._mesh){var s=this._prevMesh&&this._prevMesh.material;this._mesh=new Dg({renderOrder:10,frustumCulling:!1}),s&&(this._mesh.material=s)}var s=this._mesh.material,l=this._mesh.geometry,h=l.attributes;this.rootNode.remove(this._prevMesh),this.rootNode.add(this._mesh),this._setPositionTextureToMesh(this._mesh,this._positionTexture);var u=this._getSymbolInfo(e,i,n),f=r.getDevicePixelRatio(),d=e.getModel("itemStyle").getItemStyle(),c=e.get("large"),v=1;u.maxSize>2?(v=this._updateSymbolSprite(e,d,u,f),s.enableTexture("sprite")):s.disableTexture("sprite"),h.position.init(n-i);var p=[];if(c){s.undefine("VERTEX_SIZE"),s.undefine("VERTEX_COLOR");var g=cm(o),m=dm(o);b.parseColor(g,p),p[3]*=m,s.set({color:p,u_Size:u.maxSize*this._sizeScale})}else s.set({color:[1,1,1,1]}),s.define("VERTEX_SIZE"),s.define("VERTEX_COLOR"),h.size.init(n-i),h.color.init(n-i),this._originalOpacity=new Float32Array(n-i);for(var _=o.getLayout("points"),x=h.position.value,y=0;y<n-i;y++){var T=y*3,w=y*2;if(this.is2D?(x[T]=_[w],x[T+1]=_[w+1],x[T+2]=xh):(x[T]=_[T],x[T+1]=_[T+1],x[T+2]=_[T+2]),!c){var g=wt(o,y),m=Tt(o,y);b.parseColor(g,p),p[3]*=m,h.color.set(y,p),p[3]<.99;var E=o.getItemVisual(y,"symbolSize");E=E instanceof Array?Math.max(E[0],E[1]):E,isNaN(E)&&(E=0),h.size.value[y]=E*v*this._sizeScale,this._originalOpacity[y]=p[3]}}this._mesh.sizeScale=v,l.updateBoundingBox(),l.dirty(),this._updateMaterial(e,d);var S=e.coordinateSystem;if(S&&S.viewGL){var D=S.viewGL.isLinearSpace()?"define":"undefine";s[D]("fragment","SRGB_DECODE")}c||this._updateLabelBuilder(e,i,n),this._updateHandler(e,t,r),this._updateAnimation(e),this._api=r},getPointsMesh:function(){return this._mesh},updateLabels:function(e){this._labelsBuilder.updateLabels(e)},hideLabels:function(){this.rootNode.remove(this._labelsBuilder.getMesh())},showLabels:function(){this.rootNode.add(this._labelsBuilder.getMesh())},dispose:function(){this._labelsBuilder.dispose()},_updateSymbolSprite:function(e,t,r,i){r.maxSize=Math.min(r.maxSize*2,200);var n=[];return r.aspect>1?(n[0]=r.maxSize,n[1]=r.maxSize/r.aspect):(n[1]=r.maxSize,n[0]=r.maxSize*r.aspect),n[0]=n[0]||1,n[1]=n[1]||1,(this._symbolType!==r.type||!Pg(this._symbolSize,n)||this._lineWidth!==t.lineWidth)&&(gh.createSymbolSprite(r.type,n,{fill:"#fff",lineWidth:t.lineWidth,stroke:"transparent",shadowColor:"transparent",minMargin:Math.min(n[0]/2,10)},this._spriteImageCanvas),gh.createSDFFromCanvas(this._spriteImageCanvas,Math.min(this._spriteImageCanvas.width,32),yh,this._mesh.material.get("sprite").image),this._symbolType=r.type,this._symbolSize=n,this._lineWidth=t.lineWidth),this._spriteImageCanvas.width/r.maxSize*i},_updateMaterial:function(e,t){var r=e.get("blendMode")==="lighter"?b.additiveBlend:null,i=this._mesh.material;i.blend=r,i.set("lineWidth",t.lineWidth/yh);var n=b.parseColor(t.stroke);i.set("strokeColor",n),i.transparent=!0,i.depthMask=!1,i.depthTest=!this.is2D,i.sortVertices=!this.is2D},_updateLabelBuilder:function(e,o,r){var i=e.getData(),n=this._mesh.geometry,a=n.attributes.position.value,o=this._startDataIndex,s=this._mesh.sizeScale;this._labelsBuilder.updateData(i,o,r),this._labelsBuilder.getLabelPosition=function(l,h,u){var f=(l-o)*3;return[a[f],a[f+1],a[f+2]]},this._labelsBuilder.getLabelDistance=function(l,h,u){var f=n.attributes.size.get(l-o)/s;return f/2+u},this._labelsBuilder.updateLabels()},_updateAnimation:function(e){b.updateVertexAnimation([["prevPosition","position"],["prevSize","size"]],this._prevMesh,this._mesh,e)},_updateHandler:function(e,t,r){var i=e.getData(),n=this._mesh,a=this,o=-1,s=e.coordinateSystem&&e.coordinateSystem.type==="cartesian3D",l;s&&(l=e.coordinateSystem.model),n.seriesIndex=e.seriesIndex,n.off("mousemove"),n.off("mouseout"),n.on("mousemove",function(h){var u=h.vertexIndex+a._startDataIndex;u!==o&&(this.highlightOnMouseover&&(this.downplay(i,o),this.highlight(i,u),this._labelsBuilder.updateLabels([u])),s&&r.dispatchAction({type:"grid3DShowAxisPointer",value:[i.get(e.coordDimToDataDim("x")[0],u),i.get(e.coordDimToDataDim("y")[0],u),i.get(e.coordDimToDataDim("z")[0],u)],grid3DIndex:l.componentIndex})),n.dataIndex=u,o=u},this),n.on("mouseout",function(h){var u=h.vertexIndex+a._startDataIndex;this.highlightOnMouseover&&(this.downplay(i,u),this._labelsBuilder.updateLabels()),o=-1,n.dataIndex=-1,s&&r.dispatchAction({type:"grid3DHideAxisPointer",grid3DIndex:l.componentIndex})},this)},updateLayout:function(e,t,r){var i=e.getData();if(this._mesh){var n=this._mesh.geometry.attributes.position.value,a=i.getLayout("points");if(this.is2D)for(var o=0;o<a.length/2;o++){var s=o*3,l=o*2;n[s]=a[l],n[s+1]=a[l+1],n[s+2]=xh}else for(var o=0;o<a.length;o++)n[o]=a[o];this._mesh.geometry.dirty(),r.getZr().refresh()}},updateView:function(e){if(this._mesh){var t=new re;re.mul(t,e.viewMatrix,this._mesh.worldTransform),re.mul(t,e.projectionMatrix,t),this._mesh.updateNDCPosition(t,this.is2D,this._api)}},highlight:function(e,t){if(!(t>this._endDataIndex||t<this._startDataIndex)){var r=e.getItemModel(t),i=r.getModel("emphasis.itemStyle"),n=i.get("color"),a=i.get("opacity");if(n==null){var o=wt(e,t);n=xs(o,-.4)}a==null&&(a=Tt(e,t));var s=b.parseColor(n);s[3]*=a,this._mesh.geometry.attributes.color.set(t-this._startDataIndex,s),this._mesh.geometry.dirtyAttribute("color"),this._api.getZr().refresh()}},downplay:function(e,t){if(!(t>this._endDataIndex||t<this._startDataIndex)){var r=wt(e,t),i=Tt(e,t),n=b.parseColor(r);n[3]*=i,this._mesh.geometry.attributes.color.set(t-this._startDataIndex,n),this._mesh.geometry.dirtyAttribute("color"),this._api.getZr().refresh()}},fadeOutAll:function(e){if(this._originalOpacity){for(var t=this._mesh.geometry,r=0;r<t.vertexCount;r++){var i=this._originalOpacity[r]*e;t.attributes.color.value[r*4+3]=i}t.dirtyAttribute("color"),this._api.getZr().refresh()}},fadeInAll:function(){this.fadeOutAll(1)},setPositionTexture:function(e){this._mesh&&this._setPositionTextureToMesh(this._mesh,e),this._positionTexture=e},removePositionTexture:function(){this._positionTexture=null,this._mesh&&this._setPositionTextureToMesh(this._mesh,null)},setSizeScale:function(e){if(e!==this._sizeScale){if(this._mesh){var t=this._mesh.material.get("u_Size");this._mesh.material.set("u_Size",t/this._sizeScale*e);var r=this._mesh.geometry.attributes;if(r.size.value)for(var i=0;i<r.size.value.length;i++)r.size.value[i]=r.size.value[i]/this._sizeScale*e}this._sizeScale=e}},_setPositionTextureToMesh:function(e,t){t&&e.material.set("positionTexture",t),e.material[t?"enableTexture":"disableTexture"]("positionTexture")},_getSymbolInfo:function(e,t,r){if(e.get("large")){var i=xe.firstNotNull(e.get("symbolSize"),1),s,a;return i instanceof Array?(s=Math.max(i[0],i[1]),a=i[0]/i[1]):(s=i,a=1),{maxSize:i,type:e.get("symbol"),aspect:a}}for(var n=e.getData(),a,o=n.getItemVisual(0,"symbol")||"circle",s=0,l=t;l<r;l++){var i=n.getItemVisual(l,"symbolSize"),h=n.getItemVisual(l,"symbol"),u;if(i instanceof Array)u=i[0]/i[1],s=Math.max(Math.max(i[0],i[1]),s);else{if(isNaN(i))continue;u=1,s=Math.max(i,s)}o=h,a=u}return{maxSize:s,type:o,aspect:a}}};const Rg=Xt.extend({type:"scatter3D",hasSymbolVisual:!0,__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this._pointsBuilderList=[],this._currentStep=0},render:function(e,t,r){if(this.groupGL.removeAll(),!!e.getData().count()){var i=e.coordinateSystem;if(i&&i.viewGL){i.viewGL.add(this.groupGL),this._camera=i.viewGL.camera;var n=this._pointsBuilderList[0];n||(n=this._pointsBuilderList[0]=new Mi(!1,r)),this._pointsBuilderList.length=1,this.groupGL.add(n.rootNode),n.update(e,t,r),n.updateView(i.viewGL.camera)}}},incrementalPrepareRender:function(e,t,r){var i=e.coordinateSystem;i&&i.viewGL&&(i.viewGL.add(this.groupGL),this._camera=i.viewGL.camera),this.groupGL.removeAll(),this._currentStep=0},incrementalRender:function(e,t,r,i){if(!(e.end<=e.start)){var n=this._pointsBuilderList[this._currentStep];n||(n=new Mi(!1,i),this._pointsBuilderList[this._currentStep]=n),this.groupGL.add(n.rootNode),n.update(t,r,i,e.start,e.end),n.updateView(t.coordinateSystem.viewGL.camera),this._currentStep++}},updateCamera:function(){this._pointsBuilderList.forEach(function(e){e.updateView(this._camera)},this)},highlight:function(e,t,r,i){this._toggleStatus("highlight",e,t,r,i)},downplay:function(e,t,r,i){this._toggleStatus("downplay",e,t,r,i)},_toggleStatus:function(e,t,r,i,n){var a=t.getData(),o=xe.queryDataIndex(a,n),s=e==="highlight";o!=null?ir(mn.normalizeToArray(o),function(l){for(var h=0;h<this._pointsBuilderList.length;h++){var u=this._pointsBuilderList[h];s?u.highlight(a,l):u.downplay(a,l)}},this):a.each(function(l){for(var h=0;h<this._pointsBuilderList.length;h++){var u=this._pointsBuilderList[h];s?u.highlight(a,l):u.downplay(a,l)}})},dispose:function(){this._pointsBuilderList.forEach(function(e){e.dispose()}),this.groupGL.removeAll()},remove:function(){this.groupGL.removeAll()}});function Ng(e){e.registerChartView(Rg),e.registerSeriesModel(Sg),e.registerLayout({seriesType:"scatter3D",reset:function(t){var r=t.coordinateSystem;if(r){var i=r.dimensions;if(i.length<3)return;var n=i.map(function(s){return t.coordDimToDataDim(s)[0]}),a=[],o=[];return{progress:function(s,l){for(var h=new Float32Array((s.end-s.start)*3),u=s.start;u<s.end;u++){var f=(u-s.start)*3;a[0]=l.get(n[0],u),a[1]=l.get(n[1],u),a[2]=l.get(n[2],u),r.dataToPoint(a,o),h[f]=o[0],h[f+1]=o[1],h[f+2]=o[2]}l.setLayout("points",h)}}}}})}Ct(Ng);var pt=ht.vec3,Th=ht.vec2,Ar=pt.normalize,Da=pt.cross,wh=pt.sub,Ko=pt.add,ti=pt.create,Qr=ti(),Qt=ti(),Jr=ti(),Ln=ti(),bh=[],Sh=[];function Ig(e,t){Th.copy(bh,e[0]),Th.copy(Sh,e[1]);var r=[],i=r[0]=ti(),n=r[1]=ti(),a=r[2]=ti(),o=r[3]=ti();t.dataToPoint(bh,i),t.dataToPoint(Sh,o),Ar(Qr,i),wh(Qt,o,i),Ar(Qt,Qt),Da(Jr,Qt,Qr),Ar(Jr,Jr),Da(Qt,Qr,Jr),Ko(n,Qr,Qt),Ar(n,n),Ar(Qr,o),wh(Qt,i,o),Ar(Qt,Qt),Da(Jr,Qt,Qr),Ar(Jr,Jr),Da(Qt,Qr,Jr),Ko(a,Qr,Qt),Ar(a,a),Ko(Ln,i,o),Ar(Ln,Ln);var s=pt.dot(i,Ln),l=pt.dot(Ln,n),h=(Math.max(pt.len(i),pt.len(o))-s)/l*2;return pt.scaleAndAdd(n,i,n,h),pt.scaleAndAdd(a,o,a,h),r}function Og(e,t,r){var i=[],n=i[0]=pt.create(),a=i[1]=pt.create(),o=i[2]=pt.create(),s=i[3]=pt.create();t.dataToPoint(e[0],n),t.dataToPoint(e[1],s);var l=pt.dist(n,s);return pt.lerp(a,n,s,.3),pt.lerp(o,n,s,.3),pt.scaleAndAdd(a,a,r,Math.min(l*.1,10)),pt.scaleAndAdd(o,o,r,Math.min(l*.1,10)),i}function ff(e,t){for(var r=new Float32Array(e.length*3),i=0,n=[],a=0;a<e.length;a++)t.dataToPoint(e[a],n),r[i++]=n[0],r[i++]=n[1],r[i++]=n[2];return r}function cf(e){var t=[];return e.each(function(r){var i=e.getItemModel(r),n=i.option instanceof Array?i.option:i.getShallow("coords",!0);t.push(n)}),{coordsList:t}}function Bg(e,t){var r=e.getData(),i=e.get("polyline");r.setLayout("lineType",i?"polyline":"cubicBezier");var n=cf(r);r.each(function(a){var o=n.coordsList[a],s=i?ff:Ig;r.setItemLayout(a,s(o,t))})}function Eh(e,t,r){var i=e.getData(),n=e.get("polyline"),a=cf(i);i.setLayout("lineType",n?"polyline":"cubicBezier"),i.each(function(o){var s=a.coordsList[o],l=n?ff(s,t):Og(s,t,r);i.setItemLayout(o,l)})}function Fg(e,t){e.eachSeriesByType("lines3D",function(r){var i=r.coordinateSystem;i.type==="globe"?Bg(r,i):i.type==="geo3D"?Eh(r,i,[0,1,0]):(i.type==="mapbox3D"||i.type==="maptalks3D")&&Eh(r,i,[0,0,1])})}const Ug=Wt.extend({type:"series.lines3D",dependencies:["globe"],visualStyleAccessPath:"lineStyle",visualDrawType:"stroke",getInitialData:function(e,t){var r=new fr(["value"],this);return r.hasItemOption=!1,r.initData(e.data,[],function(i,n,a,o){if(i instanceof Array)return NaN;r.hasItemOption=!0;var s=i.value;if(s!=null)return s instanceof Array?s[o]:s}),r},defaultOption:{coordinateSystem:"globe",globeIndex:0,geo3DIndex:0,zlevel:-10,polyline:!1,effect:{show:!1,period:4,trailWidth:4,trailLength:.2,spotIntensity:6},silent:!0,blendMode:"source-over",lineStyle:{width:1,opacity:.5}}}),zg=`@export ecgl.trail2.vertex
attribute vec3 position: POSITION;
attribute vec3 positionPrev;
attribute vec3 positionNext;
attribute float offset;
attribute float dist;
attribute float distAll;
attribute float start;

attribute vec4 a_Color : COLOR;

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;
uniform float near : NEAR;

uniform float speed : 0;
uniform float trailLength: 0.3;
uniform float time;
uniform float period: 1000;

uniform float spotSize: 1;

varying vec4 v_Color;
varying float v_Percent;
varying float v_SpotPercent;

@import ecgl.common.wireframe.vertexHeader

@import ecgl.lines3D.clipNear

void main()
{
 @import ecgl.lines3D.expandLine

 gl_Position = currProj;

 v_Color = a_Color;

 @import ecgl.common.wireframe.vertexMain

#ifdef CONSTANT_SPEED
 float t = mod((speed * time + start) / distAll, 1. + trailLength) - trailLength;
#else
 float t = mod((time + start) / period, 1. + trailLength) - trailLength;
#endif

 float trailLen = distAll * trailLength;

 v_Percent = (dist - t * distAll) / trailLen;

 v_SpotPercent = spotSize / distAll;

 }
@end


@export ecgl.trail2.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
uniform float spotIntensity: 5;

varying vec4 v_Color;
varying float v_Percent;
varying float v_SpotPercent;

@import ecgl.common.wireframe.fragmentHeader

@import clay.util.srgb

void main()
{
 if (v_Percent > 1.0 || v_Percent < 0.0) {
 discard;
 }

 float fade = v_Percent;

#ifdef SRGB_DECODE
 gl_FragColor = sRGBToLinear(color * v_Color);
#else
 gl_FragColor = color * v_Color;
#endif

 @import ecgl.common.wireframe.fragmentMain

 if (v_Percent > (1.0 - v_SpotPercent)) {
 gl_FragColor.rgb *= spotIntensity;
 }

 gl_FragColor.a *= fade;
}

@end`;var Ah=ht.vec3;function Gg(e){return e>0?1:-1}b.Shader.import(zg);const kg=b.Mesh.extend(function(){var e=new b.Material({shader:new b.Shader(b.Shader.source("ecgl.trail2.vertex"),b.Shader.source("ecgl.trail2.fragment")),transparent:!0,depthMask:!1}),t=new Ii({dynamic:!0});return t.createAttribute("dist","float",1),t.createAttribute("distAll","float",1),t.createAttribute("start","float",1),{geometry:t,material:e,culling:!1,$ignorePicking:!0}},{updateData:function(e,t,r){var i=e.hostModel,n=this.geometry,a=i.getModel("effect"),o=a.get("trailWidth")*t.getDevicePixelRatio(),s=a.get("trailLength"),l=i.get("effect.constantSpeed"),h=i.get("effect.period")*1e3,u=l!=null;u?this.material.set("speed",l/1e3):this.material.set("period",h),this.material[u?"define":"undefine"]("vertex","CONSTANT_SPEED");var f=i.get("polyline");n.trailLength=s,this.material.set("trailLength",s),n.resetOffset(),["position","positionPrev","positionNext"].forEach(function(E){n.attributes[E].value=r.attributes[E].value});var d=["dist","distAll","start","offset","color"];d.forEach(function(E){n.attributes[E].init(n.vertexCount)}),n.indices=r.indices;var c=[],v=a.get("trailColor"),p=a.get("trailOpacity"),g=v!=null,m=p!=null;this.updateWorldTransform();var _=this.worldTransform.x.len(),x=this.worldTransform.y.len(),y=this.worldTransform.z.len(),T=0,w=0;e.each(function(E){var S=e.getItemLayout(E),D=m?p:Tt(e,E),M=wt(e,E);D==null&&(D=1),c=b.parseColor(g?v:M,c),c[3]*=D;for(var C=f?r.getPolylineVertexCount(S):r.getCubicCurveVertexCount(S[0],S[1],S[2],S[3]),N=0,O=[],P=[],F=T;F<T+C;F++)n.attributes.position.get(F,O),O[0]*=_,O[1]*=x,O[2]*=y,F>T&&(N+=Ah.dist(O,P)),n.attributes.dist.set(F,N),Ah.copy(P,O);w=Math.max(w,N);for(var H=Math.random()*(u?N:h),F=T;F<T+C;F++)n.attributes.distAll.set(F,N),n.attributes.start.set(F,H),n.attributes.offset.set(F,Gg(r.attributes.offset.get(F))*o/2),n.attributes.color.set(F,c);T+=C}),this.material.set("spotSize",w*.1*s),this.material.set("spotIntensity",a.get("spotIntensity")),n.dirty()},setAnimationTime:function(e){this.material.set("time",e)}});b.Shader.import(lo);function Hg(e){return e.radius!=null?e.radius:e.size!=null?Math.max(e.size[0],e.size[1],e.size[2]):100}const Vg=Xt.extend({type:"lines3D",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this._meshLinesMaterial=new b.Material({shader:b.createShader("ecgl.meshLines3D"),transparent:!0,depthMask:!1}),this._linesMesh=new b.Mesh({geometry:new Ii,material:this._meshLinesMaterial,$ignorePicking:!0}),this._trailMesh=new kg},render:function(e,t,r){this.groupGL.add(this._linesMesh);var i=e.coordinateSystem,n=e.getData();if(i&&i.viewGL){var a=i.viewGL;a.add(this.groupGL),this._updateLines(e,t,r);var o=i.viewGL.isLinearSpace()?"define":"undefine";this._linesMesh.material[o]("fragment","SRGB_DECODE"),this._trailMesh.material[o]("fragment","SRGB_DECODE")}var s=this._trailMesh;if(s.stopAnimation(),e.get("effect.show")){this.groupGL.add(s),s.updateData(n,r,this._linesMesh.geometry),s.__time=s.__time||0;var l=3600*1e3;this._curveEffectsAnimator=s.animate("",{loop:!0}).when(l,{__time:l}).during(function(){s.setAnimationTime(s.__time)}).start()}else this.groupGL.remove(s),this._curveEffectsAnimator=null;this._linesMesh.material.blend=this._trailMesh.material.blend=e.get("blendMode")==="lighter"?b.additiveBlend:null},pauseEffect:function(){this._curveEffectsAnimator&&this._curveEffectsAnimator.pause()},resumeEffect:function(){this._curveEffectsAnimator&&this._curveEffectsAnimator.resume()},toggleEffect:function(){var e=this._curveEffectsAnimator;e&&(e.isPaused()?e.resume():e.pause())},_updateLines:function(e,t,r){var i=e.getData(),n=e.coordinateSystem,a=this._linesMesh.geometry,o=e.get("polyline");a.expandLine=!0;var s=Hg(n);a.segmentScale=s/20;var l="lineStyle.width".split("."),h=r.getDevicePixelRatio();i.each(function(c){var v=i.getItemModel(c),p=v.get(l);p==null&&(p=1),i.setItemVisual(c,"lineWidth",p)}),a.useNativeLine=!1;var u=0,f=0;i.each(function(c){var v=i.getItemLayout(c);o?(u+=a.getPolylineVertexCount(v),f+=a.getPolylineTriangleCount(v)):(u+=a.getCubicCurveVertexCount(v[0],v[1],v[2],v[3]),f+=a.getCubicCurveTriangleCount(v[0],v[1],v[2],v[3]))}),a.setVertexCount(u),a.setTriangleCount(f),a.resetOffset();var d=[];i.each(function(c){var v=i.getItemLayout(c),p=wt(i,c),g=Tt(i,c),m=i.getItemVisual(c,"lineWidth")*h;g==null&&(g=1),d=b.parseColor(p,d),d[3]*=g,o?a.addPolyline(v,d,m):a.addCubicCurve(v[0],v[1],v[2],v[3],d,m)}),a.dirty()},remove:function(){this.groupGL.removeAll()},dispose:function(){this.groupGL.removeAll()}});function Wg(e){e.registerChartView(Vg),e.registerSeriesModel(Ug),e.registerLayout(Fg),e.registerAction({type:"lines3DPauseEffect",event:"lines3deffectpaused",update:"series.lines3D:pauseEffect"},function(){}),e.registerAction({type:"lines3DResumeEffect",event:"lines3deffectresumed",update:"series.lines3D:resumeEffect"},function(){}),e.registerAction({type:"lines3DToggleEffect",event:"lines3deffectchanged",update:"series.lines3D:toggleEffect"},function(){})}Ct(Wg);function Ch(e,t){for(var r=[],i=0;i<t.length;i++)r.push(e.dataToPoint(t[i]));return r}var df=Wt.extend({type:"series.polygons3D",getRegionModel:function(e){return this.getData().getItemModel(e)},getRegionPolygonCoords:function(e){var t=this.coordinateSystem,r=this.getData().getItemModel(e),i=r.option instanceof Array?r.option:r.getShallow("coords");r.get("multiPolygon")||(i=[i]);for(var n=[],a=0;a<i.length;a++){for(var o=[],s=1;s<i[a].length;s++)o.push(Ch(t,i[a][s]));n.push({exterior:Ch(t,i[a][0]),interiors:o})}return n},getInitialData:function(e){var t=new fr(["value"],this);return t.hasItemOption=!1,t.initData(e.data,[],function(r,i,n,a){if(r instanceof Array)return NaN;t.hasItemOption=!0;var o=r.value;if(o!=null)return o instanceof Array?o[a]:o}),t},defaultOption:{show:!0,data:null,multiPolygon:!1,progressiveThreshold:1e3,progressive:1e3,zlevel:-10,label:{show:!1,distance:2,textStyle:{fontSize:20,color:"#000",backgroundColor:"rgba(255,255,255,0.7)",padding:3,borderRadius:4}},itemStyle:{color:"#fff",borderWidth:0,borderColor:"#333"},emphasis:{itemStyle:{color:"#639fc0"},label:{show:!0}}}});Be(df.prototype,vn);const Xg=df,jg=Xt.extend({type:"polygons3D",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this._geo3DBuilderList=[],this._currentStep=0},render:function(e,t,r){this.groupGL.removeAll();var i=e.coordinateSystem;i&&i.viewGL&&i.viewGL.add(this.groupGL);var n=this._geo3DBuilderList[0];n||(n=new on(r),n.extrudeY=i.type!=="mapbox3D"&&i.type!=="maptalks3D",this._geo3DBuilderList[0]=n),this._updateShaderDefines(i,n),n.update(e,t,r),this._geo3DBuilderList.length=1,this.groupGL.add(n.rootNode)},incrementalPrepareRender:function(e,t,r){this.groupGL.removeAll();var i=e.coordinateSystem;i&&i.viewGL&&i.viewGL.add(this.groupGL),this._currentStep=0},incrementalRender:function(e,t,r,i){var n=this._geo3DBuilderList[this._currentStep],a=t.coordinateSystem;n||(n=new on(i),n.extrudeY=a.type!=="mapbox3D"&&a.type!=="maptalks3D",this._geo3DBuilderList[this._currentStep]=n),n.update(t,r,i,e.start,e.end),this.groupGL.add(n.rootNode),this._updateShaderDefines(a,n),this._currentStep++},_updateShaderDefines:function(e,t){var r=e.viewGL.isLinearSpace()?"define":"undefine";t.rootNode.traverse(function(i){i.material&&(i.material[r]("fragment","SRGB_DECODE"),(e.type==="mapbox3D"||e.type==="maptalks3D")&&(i.material.define("fragment","NORMAL_UP_AXIS",2),i.material.define("fragment","NORMAL_FRONT_AXIS",1)))})},remove:function(){this.groupGL.removeAll()},dispose:function(){this.groupGL.removeAll(),this._geo3DBuilderList.forEach(function(e){e.dispose()})}});function Zg(e){e.registerChartView(jg),e.registerSeriesModel(Xg)}Ct(Zg);var vf=Wt.extend({type:"series.surface",dependencies:["globe","grid3D","geo3D"],visualStyleAccessPath:"itemStyle",formatTooltip:function(e){return ta(this,e)},getInitialData:function(e,t){var r=e.data;function i(Y){return!(isNaN(Y.min)||isNaN(Y.max)||isNaN(Y.step))}function n(Y){var z=Zh;return Math.max(z(Y.min),z(Y.max),z(Y.step))+1}if(!r)if(e.parametric){var y=e.parametricEquation||{},T=y.u||{},w=y.v||{};["u","v"].forEach(function(z){i(y[z])}),["x","y","z"].forEach(function(z){y[z]});var E=Math.floor((T.max+T.step-T.min)/T.step),S=Math.floor((w.max+w.step-w.min)/w.step);r=new Float32Array(E*S*5);for(var D=n(T),M=n(w),d=0,c=0;c<S;c++)for(var v=0;v<E;v++){var C=v*T.step+T.min,N=c*w.step+w.min,O=_a(Math.min(C,T.max),D),P=_a(Math.min(N,w.max),M),p=y.x(O,P),g=y.y(O,P),x=y.z(O,P);r[d++]=p,r[d++]=g,r[d++]=x,r[d++]=O,r[d++]=P}}else{var a=e.equation||{},o=a.x||{},s=a.y||{};if(["x","y"].forEach(function(Y){i(a[Y])}),typeof a.z!="function")return;var l=Math.floor((o.max+o.step-o.min)/o.step),h=Math.floor((s.max+s.step-s.min)/s.step);r=new Float32Array(l*h*3);for(var u=n(o),f=n(s),d=0,c=0;c<h;c++)for(var v=0;v<l;v++){var p=v*o.step+o.min,g=c*s.step+s.min,m=_a(Math.min(p,o.max),u),_=_a(Math.min(g,s.max),f),x=a.z(m,_);r[d++]=m,r[d++]=_,r[d++]=x}}var F=["x","y","z"];e.parametric&&F.push("u","v");var H=ho(this,F,r);return H},defaultOption:{coordinateSystem:"cartesian3D",zlevel:-10,grid3DIndex:0,shading:"lambert",parametric:!1,wireframe:{show:!0,lineStyle:{color:"rgba(0,0,0,0.5)",width:1}},equation:{x:{min:-1,max:1,step:.1},y:{min:-1,max:1,step:.1},z:null},parametricEquation:{u:{min:-1,max:1,step:.1},v:{min:-1,max:1,step:.1},x:null,y:null,z:null},dataShape:null,itemStyle:{},animationDurationUpdate:500}});Be(vf.prototype,vn);const qg=vf;var xi=ht.vec3;function Yg(e){return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])}const Kg=Xt.extend({type:"surface",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node},render:function(e,t,r){var i=this._prevSurfaceMesh;this._prevSurfaceMesh=this._surfaceMesh,this._surfaceMesh=i,this._surfaceMesh||(this._surfaceMesh=this._createSurfaceMesh()),this.groupGL.remove(this._prevSurfaceMesh),this.groupGL.add(this._surfaceMesh);var n=e.coordinateSystem,a=e.get("shading"),o=e.getData(),s="ecgl."+a;if((!this._surfaceMesh.material||this._surfaceMesh.material.shader.name!==s)&&(this._surfaceMesh.material=b.createMaterial(s,["VERTEX_COLOR","DOUBLE_SIDED"])),b.setMaterialFromModel(a,this._surfaceMesh.material,e,r),n&&n.viewGL){n.viewGL.add(this.groupGL);var l=n.viewGL.isLinearSpace()?"define":"undefine";this._surfaceMesh.material[l]("fragment","SRGB_DECODE")}var h=e.get("parametric"),u=e.get("dataShape");u||(u=this._getDataShape(o,h));var f=e.getModel("wireframe"),d=f.get("lineStyle.width"),c=f.get("show")&&d>0;this._updateSurfaceMesh(this._surfaceMesh,e,u,c);var v=this._surfaceMesh.material;c?(v.define("WIREFRAME_QUAD"),v.set("wireframeLineWidth",d),v.set("wireframeLineColor",b.parseColor(f.get("lineStyle.color")))):v.undefine("WIREFRAME_QUAD"),this._initHandler(e,r),this._updateAnimation(e)},_updateAnimation:function(e){b.updateVertexAnimation([["prevPosition","position"],["prevNormal","normal"]],this._prevSurfaceMesh,this._surfaceMesh,e)},_createSurfaceMesh:function(){var e=new b.Mesh({geometry:new b.Geometry({dynamic:!0,sortTriangles:!0}),shadowDepthMaterial:new b.Material({shader:new b.Shader(b.Shader.source("ecgl.sm.depth.vertex"),b.Shader.source("ecgl.sm.depth.fragment"))}),culling:!1,renderOrder:10,renderNormal:!0});return e.geometry.createAttribute("barycentric","float",4),e.geometry.createAttribute("prevPosition","float",3),e.geometry.createAttribute("prevNormal","float",3),Object.assign(e.geometry,Bs),e},_initHandler:function(e,t){var r=e.getData(),i=this._surfaceMesh,n=e.coordinateSystem;function a(s,l){for(var h=1/0,u=-1,f=[],d=0;d<s.length;d++){i.geometry.attributes.position.get(s[d],f);var c=xi.dist(l.array,f);c<h&&(h=c,u=s[d])}return u}i.seriesIndex=e.seriesIndex;var o=-1;i.off("mousemove"),i.off("mouseout"),i.on("mousemove",function(s){var l=a(s.triangle,s.point);if(l>=0){var h=[];i.geometry.attributes.position.get(l,h);for(var u=n.pointToData(h),f=1/0,d=-1,c=[],v=0;v<r.count();v++){c[0]=r.get("x",v),c[1]=r.get("y",v),c[2]=r.get("z",v);var p=xi.squaredDistance(c,u);p<f&&(d=v,f=p)}d!==o&&t.dispatchAction({type:"grid3DShowAxisPointer",value:u}),o=d,i.dataIndex=d}else i.dataIndex=-1},this),i.on("mouseout",function(s){o=-1,i.dataIndex=-1,t.dispatchAction({type:"grid3DHideAxisPointer"})},this)},_updateSurfaceMesh:function(e,t,r,i){var n=e.geometry,a=t.getData(),o=a.getLayout("points"),s=0;a.each(function(te){a.hasValue(te)||s++});var l=s||i,h=n.attributes.position,u=n.attributes.normal,f=n.attributes.texcoord0,d=n.attributes.barycentric,c=n.attributes.color,v=r[0],p=r[1],g=t.get("shading"),m=g!=="color";if(l){var _=(v-1)*(p-1)*4;h.init(_),i&&d.init(_)}else h.value=new Float32Array(o);c.init(n.vertexCount),f.init(n.vertexCount);var x=[0,3,1,1,3,2],y=[[1,1,0,0],[0,1,0,1],[1,0,0,1],[1,0,1,0]],T=n.indices=new(n.vertexCount>65535?Uint32Array:Uint16Array)((v-1)*(p-1)*6),w=function(te,Ne,de){de[1]=te*p+Ne,de[0]=te*p+Ne+1,de[3]=(te+1)*p+Ne+1,de[2]=(te+1)*p+Ne},E=!1;if(l){var S=[],D=[],M=0;m?u.init(n.vertexCount):u.value=null;for(var C=[[],[],[]],N=[],O=[],P=xi.create(),F=function(te,Ne,de){var Ee=Ne*3;return de[0]=te[Ee],de[1]=te[Ee+1],de[2]=te[Ee+2],de},H=new Float32Array(o.length),Y=new Float32Array(o.length/3*4),z=0;z<a.count();z++)if(a.hasValue(z)){var ie=b.parseColor(wt(a,z)),Te=Tt(a,z);Te!=null&&(ie[3]*=Te),ie[3]<.99&&(E=!0);for(var q=0;q<4;q++)Y[z*4+q]=ie[q]}for(var De=[1e7,1e7,1e7],z=0;z<v-1;z++)for(var ve=0;ve<p-1;ve++){var oe=z*(p-1)+ve,Q=oe*4;w(z,ve,S);for(var L=!1,q=0;q<4;q++)F(o,S[q],D),Yg(D)&&(L=!0);for(var q=0;q<4;q++)L?h.set(Q+q,De):(F(o,S[q],D),h.set(Q+q,D)),i&&d.set(Q+q,y[q]);for(var q=0;q<6;q++)T[M++]=x[q]+Q;if(m&&!L)for(var q=0;q<2;q++){for(var k=q*3,V=0;V<3;V++){var J=S[x[k]+V];F(o,J,C[V])}xi.sub(N,C[0],C[1]),xi.sub(O,C[1],C[2]),xi.cross(P,N,O);for(var V=0;V<3;V++){var K=S[x[k]+V]*3;H[K]=H[K]+P[0],H[K+1]=H[K+1]+P[1],H[K+2]=H[K+2]+P[2]}}}if(m)for(var z=0;z<H.length/3;z++)F(H,z,P),xi.normalize(P,P),H[z*3]=P[0],H[z*3+1]=P[1],H[z*3+2]=P[2];for(var ie=[],pe=[],z=0;z<v-1;z++)for(var ve=0;ve<p-1;ve++){var oe=z*(p-1)+ve,Q=oe*4;w(z,ve,S);for(var q=0;q<4;q++){for(var V=0;V<4;V++)ie[V]=Y[S[q]*4+V];c.set(Q+q,ie),m&&(F(H,S[q],P),u.set(Q+q,P));var J=S[q];pe[0]=J%p/(p-1),pe[1]=Math.floor(J/p)/(v-1),f.set(Q+q,pe)}oe++}}else{for(var pe=[],z=0;z<a.count();z++){pe[0]=z%p/(p-1),pe[1]=Math.floor(z/p)/(v-1);var ie=b.parseColor(wt(a,z)),Te=Tt(a,z);Te!=null&&(ie[3]*=Te),ie[3]<.99&&(E=!0),c.set(z,ie),f.set(z,pe)}for(var S=[],we=0,z=0;z<v-1;z++)for(var ve=0;ve<p-1;ve++){w(z,ve,S);for(var q=0;q<6;q++)T[we++]=S[x[q]]}m?n.generateVertexNormals():u.value=null}e.material.get("normalMap")&&n.generateTangents(),n.updateBoundingBox(),n.dirty(),e.material.transparent=E,e.material.depthMask=!E},_getDataShape:function(e,t){for(var r=-1/0,i=0,n=0,a=!1,o=t?"u":"x",s=e.count(),l=0;l<s;l++){var h=e.get(o,l);h<r&&(n=0,i++),r=h,n++}if((!i||n===1)&&(a=!0),!a)return[i+1,n];for(var u=Math.floor(Math.sqrt(s));u>0;){if(Math.floor(s/u)===s/u)return[u,s/u];u--}return u=Math.floor(Math.sqrt(s)),[u,u]},dispose:function(){this.groupGL.removeAll()},remove:function(){this.groupGL.removeAll()}});function $g(e){e.registerChartView(Kg),e.registerSeriesModel(qg),e.registerLayout(function(t,r){t.eachSeriesByType("surface",function(i){var n=i.coordinateSystem;!n||n.type;var a=i.getData(),o=new Float32Array(3*a.count()),s=[NaN,NaN,NaN];if(n&&n.type==="cartesian3D"){var l=n.dimensions,h=l.map(function(u){return i.coordDimToDataDim(u)[0]});a.each(h,function(u,f,d,c){var v;a.hasValue(c)?v=n.dataToPoint([u,f,d]):v=s,o[c*3]=v[0],o[c*3+1]=v[1],o[c*3+2]=v[2]})}a.setLayout("points",o)})})}Ct($g);function Lh(e,t){for(var r=[],i=0;i<t.length;i++)r.push(e.dataToPoint(t[i]));return r}var gn=Wt.extend({type:"series.map3D",layoutMode:"box",coordinateSystem:null,visualStyleAccessPath:"itemStyle",optionUpdated:function(e){var t=this.get("coordinateSystem");t==null||t==="geo3D"||(this.get("groundPlane.show")&&(this.option.groundPlane.show=!1),this._geo=null)},getInitialData:function(e){e.data=this.getFilledRegions(e.data,e.map);var t=hn(e.data,{coordDimensions:["value"]}),r=new fr(t,this);r.initData(e.data);var i={};return r.each(function(n){var a=r.getName(n),o=r.getItemModel(n);i[a]=o}),this._regionModelMap=i,r},formatTooltip:function(e){return ta(this,e)},getRegionModel:function(e){var t=this.getData().getName(e);return this._regionModelMap[t]||new Qi(null,this)},getRegionPolygonCoords:function(e){var t=this.coordinateSystem,r=this.getData().getName(e);if(t.transform){var i=t.getRegion(r);return i?i.geometries:[]}else{this._geo||(this._geo=Qu.createGeo3D(this));for(var i=this._geo.getRegion(r),n=[],a=0;a<i.geometries.length;a++){var o=i.geometries[a],s=[],l=Lh(t,o.exterior);if(s&&s.length)for(var h=0;h<o.interiors.length;h++)s.push(Lh(t,s[h]));n.push({interiors:s,exterior:l})}return n}},getFormattedLabel:function(e,t){var r=mn.getFormattedLabel(this,e,t);return r==null&&(r=this.getData().getName(e)),r},defaultOption:{coordinateSystem:"geo3D",data:null}});Be(gn.prototype,Vu);Be(gn.prototype,no);Be(gn.prototype,fn);Be(gn.prototype,cn);Be(gn.prototype,vn);const Qg=gn,Jg=Xt.extend({type:"map3D",__ecgl__:!0,init:function(e,t){this._geo3DBuilder=new on(t),this.groupGL=new b.Node},render:function(e,t,r){var i=e.coordinateSystem;if(!(!i||!i.viewGL)){if(this.groupGL.add(this._geo3DBuilder.rootNode),i.viewGL.add(this.groupGL),i.type==="geo3D"){this._sceneHelper||(this._sceneHelper=new ni,this._sceneHelper.initLight(this.groupGL)),this._sceneHelper.setScene(i.viewGL.scene),this._sceneHelper.updateLight(e),i.viewGL.setPostEffect(e.getModel("postEffect"),r),i.viewGL.setTemporalSuperSampling(e.getModel("temporalSuperSampling"));var n=this._control;n||(n=this._control=new oo({zr:r.getZr()}),this._control.init());var a=e.getModel("viewControl");n.setViewGL(i.viewGL),n.setFromViewControlModel(a,0),n.off("update"),n.on("update",function(){r.dispatchAction({type:"map3DChangeCamera",alpha:n.getAlpha(),beta:n.getBeta(),distance:n.getDistance(),from:this.uid,map3DId:e.id})}),this._geo3DBuilder.extrudeY=!0}else this._control&&(this._control.dispose(),this._control=null),this._sceneHelper&&(this._sceneHelper.dispose(),this._sceneHelper=null),e.getData().getLayout("geo3D"),this._geo3DBuilder.extrudeY=!1;this._geo3DBuilder.update(e,t,r,0,e.getData().count());var o=i.viewGL.isLinearSpace()?"define":"undefine";this._geo3DBuilder.rootNode.traverse(function(s){s.material&&s.material[o]("fragment","SRGB_DECODE")})}},afterRender:function(e,t,r,i){var n=i.renderer,a=e.coordinateSystem;a&&a.type==="geo3D"&&(this._sceneHelper.updateAmbientCubemap(n,e,r),this._sceneHelper.updateSkybox(n,e,r))},dispose:function(){this.groupGL.removeAll(),this._control.dispose(),this._geo3DBuilder.dispose()}});function e0(e){Ju(e),e.registerChartView(Jg),e.registerSeriesModel(Qg),e.registerAction({type:"map3DChangeCamera",event:"map3dcamerachanged",update:"series:updateCamera"},function(t,r){r.eachComponent({mainType:"series",subType:"map3D",query:t},function(i){i.setView(t)})})}Ct(e0);const t0=Wt.extend({type:"series.scatterGL",dependencies:["grid","polar","geo","singleAxis"],visualStyleAccessPath:"itemStyle",hasSymbolVisual:!0,getInitialData:function(){return gc(this)},defaultOption:{coordinateSystem:"cartesian2d",zlevel:10,progressive:1e5,progressiveThreshold:1e5,large:!1,symbol:"circle",symbolSize:10,zoomScale:0,blendMode:"source-over",itemStyle:{opacity:.8},postEffect:{enable:!1,colorCorrection:{exposure:0,brightness:0,contrast:1,saturation:1,enable:!0}}}});function Fr(e){this.viewGL=e}Fr.prototype.reset=function(e,t){this._updateCamera(t.getWidth(),t.getHeight(),t.getDevicePixelRatio()),this._viewTransform=ac(),this.updateTransform(e,t)};Fr.prototype.updateTransform=function(e,t){var r=e.coordinateSystem;r.getRoamTransform&&(oc(this._viewTransform,r.getRoamTransform()),this._setCameraTransform(this._viewTransform),t.getZr().refresh())};Fr.prototype.dataToPoint=function(e,t,r){r=e.dataToPoint(t,null,r);var i=this._viewTransform;i&&$h(r,r,i)};Fr.prototype.removeTransformInPoint=function(e){return this._viewTransform&&$h(e,e,this._viewTransform),e};Fr.prototype.getZoom=function(){if(this._viewTransform){var e=this._viewTransform;return 1/Math.max(Math.sqrt(e[0]*e[0]+e[1]*e[1]),Math.sqrt(e[2]*e[2]+e[3]*e[3]))}return 1};Fr.prototype._setCameraTransform=function(e){var t=this.viewGL.camera;t.position.set(e[4],e[5],0),t.scale.set(Math.sqrt(e[0]*e[0]+e[1]*e[1]),Math.sqrt(e[2]*e[2]+e[3]*e[3]),1)};Fr.prototype._updateCamera=function(e,t,r){this.viewGL.setViewport(0,0,e,t,r);var i=this.viewGL.camera;i.left=i.top=0,i.bottom=t,i.right=e,i.near=0,i.far=100};const r0=Xt.extend({type:"scatterGL",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this.viewGL=new Fe("orthographic"),this.viewGL.add(this.groupGL),this._pointsBuilderList=[],this._currentStep=0,this._sizeScale=1,this._glViewHelper=new Fr(this.viewGL)},render:function(e,t,r){if(this.groupGL.removeAll(),this._glViewHelper.reset(e,r),!!e.getData().count()){var i=this._pointsBuilderList[0];i||(i=this._pointsBuilderList[0]=new Mi(!0,r)),this._pointsBuilderList.length=1,this.groupGL.add(i.rootNode),this._removeTransformInPoints(e.getData().getLayout("points")),i.update(e,t,r),this.viewGL.setPostEffect(e.getModel("postEffect"),r)}},incrementalPrepareRender:function(e,t,r){this.groupGL.removeAll(),this._glViewHelper.reset(e,r),this._currentStep=0,this.viewGL.setPostEffect(e.getModel("postEffect"),r)},incrementalRender:function(e,t,r,i){if(!(e.end<=e.start)){var n=this._pointsBuilderList[this._currentStep];n||(n=new Mi(!0,i),this._pointsBuilderList[this._currentStep]=n),this.groupGL.add(n.rootNode),this._removeTransformInPoints(t.getData().getLayout("points")),n.setSizeScale(this._sizeScale),n.update(t,r,i,e.start,e.end),i.getZr().refresh(),this._currentStep++}},updateTransform:function(e,t,r){if(e.coordinateSystem.getRoamTransform){this._glViewHelper.updateTransform(e,r);var i=this._glViewHelper.getZoom(),n=Math.max((e.get("zoomScale")||0)*(i-1)+1,0);this._sizeScale=n,this._pointsBuilderList.forEach(function(a){a.setSizeScale(n)})}},_removeTransformInPoints:function(e){if(e)for(var t=[],r=0;r<e.length;r+=2)t[0]=e[r],t[1]=e[r+1],this._glViewHelper.removeTransformInPoint(t),e[r]=t[0],e[r+1]=t[1]},dispose:function(){this.groupGL.removeAll(),this._pointsBuilderList.forEach(function(e){e.dispose()})},remove:function(){this.groupGL.removeAll()}});function i0(e){e.registerChartView(r0),e.registerSeriesModel(t0),e.registerLayout({seriesType:"scatterGL",reset:function(t){var r=t.coordinateSystem,i=t.getData(),n;if(r){var a=r.dimensions.map(function(s){return i.mapDimension(s)}).slice(0,2),o=[];a.length===1?n=function(s){for(var l=new Float32Array((s.end-s.start)*2),h=s.start;h<s.end;h++){var u=(h-s.start)*2,f=i.get(a[0],h),d=r.dataToPoint(f);l[u]=d[0],l[u+1]=d[1]}i.setLayout("points",l)}:a.length===2&&(n=function(s){for(var l=new Float32Array((s.end-s.start)*2),h=s.start;h<s.end;h++){var u=(h-s.start)*2,f=i.get(a[0],h),d=i.get(a[1],h);o[0]=f,o[1]=d,o=r.dataToPoint(o),l[u]=o[0],l[u+1]=o[1]}i.setLayout("points",l)})}return{progress:n}}})}Ct(i0);function n0(e,t,r,i,n){for(var a=new sc(i),o=0;o<e.length;o++)a.addNode(xe.firstNotNull(e[o].id,e[o].name,o),o);for(var s=[],l=[],h=0,o=0;o<t.length;o++){var u=t[o],f=u.source,d=u.target;a.addEdge(f,d,h)&&(l.push(u),s.push(xe.firstNotNull(u.id,f+" > "+d)),h++)}var c,v=hn(e,{coordDimensions:["value"]});c=new fr(v,r),c.initData(e);var p=new fr(["value"],r);return p.initData(l,s),n&&n(c,p),lc({mainData:c,struct:a,structAttr:"graph",datas:{node:c,edge:p},datasAttr:{node:"data",edge:"edgeData"}}),a.update(),a}var Rn=Wt.extend({type:"series.graphGL",visualStyleAccessPath:"itemStyle",hasSymbolVisual:!0,init:function(e){Rn.superApply(this,"init",arguments),this.legendDataProvider=function(){return this._categoriesData},this._updateCategoriesData()},mergeOption:function(e){Rn.superApply(this,"mergeOption",arguments),this._updateCategoriesData()},getFormattedLabel:function(e,t,r,i){var n=mn.getFormattedLabel(this,e,t,r,i);if(n==null){var a=this.getData(),o=a.dimensions[a.dimensions.length-1];n=a.get(o,e)}return n},getInitialData:function(e,t){var r=e.edges||e.links||[],i=e.data||e.nodes||[],n=this;if(i&&r)return n0(i,r,this,!0,a).data;function a(o,s){o.wrapMethod("getItemModel",function(f){const d=n._categoriesModels,c=f.getShallow("category"),v=d[c];return v&&(v.parentModel=f.parentModel,f.parentModel=v),f});const l=t.getModel([]).getModel;function h(f,d){const c=l.call(this,f,d);return c.resolveParentPath=u,c}s.wrapMethod("getItemModel",function(f){return f.resolveParentPath=u,f.getModel=h,f});function u(f){if(f&&(f[0]==="label"||f[1]==="label")){const d=f.slice();return f[0]==="label"?d[0]="edgeLabel":f[1]==="label"&&(d[1]="edgeLabel"),d}return f}}},getGraph:function(){return this.getData().graph},getEdgeData:function(){return this.getGraph().edgeData},getCategoriesData:function(){return this._categoriesData},formatTooltip:function(e,t,r){if(r==="edge"){var i=this.getData(),n=this.getDataParams(e,r),a=i.graph.getEdgeByIndex(e),o=i.getName(a.node1.dataIndex),s=i.getName(a.node2.dataIndex),l=[];return o!=null&&l.push(o),s!=null&&l.push(s),l=Zi(l.join(" > ")),n.value&&(l+=" : "+Zi(n.value)),l}else return Rn.superApply(this,"formatTooltip",arguments)},_updateCategoriesData:function(){var e=(this.option.categories||[]).map(function(r){return r.value!=null?r:Object.assign({value:0},r)}),t=new fr(["value"],this);t.initData(e),this._categoriesData=t,this._categoriesModels=t.mapArray(function(r){return t.getItemModel(r,!0)})},setView:function(e){e.zoom!=null&&(this.option.zoom=e.zoom),e.offset!=null&&(this.option.offset=e.offset)},setNodePosition:function(e){for(var t=0;t<e.length/2;t++){var r=e[t*2],i=e[t*2+1],n=this.getData().getRawDataItem(t);n.x=r,n.y=i}},isAnimationEnabled:function(){return Rn.superCall(this,"isAnimationEnabled")&&!(this.get("layout")==="force"&&this.get("force.layoutAnimation"))},defaultOption:{zlevel:10,z:2,legendHoverLink:!0,layout:"forceAtlas2",forceAtlas2:{initLayout:null,GPU:!0,steps:1,maxSteps:1e3,repulsionByDegree:!0,linLogMode:!1,strongGravityMode:!1,gravity:1,edgeWeightInfluence:1,edgeWeight:[1,4],nodeWeight:[1,4],preventOverlap:!1,gravityCenter:null},focusNodeAdjacency:!0,focusNodeAdjacencyOn:"mouseover",left:"center",top:"center",symbol:"circle",symbolSize:5,roam:!1,center:null,zoom:1,label:{show:!1,formatter:"{b}",position:"right",distance:5,textStyle:{fontSize:14}},itemStyle:{},lineStyle:{color:"#aaa",width:1,opacity:.5},emphasis:{label:{show:!0}},animation:!1}});const a0=Rn;var vt=ht.vec2,Mh=[[0,0],[1,1]],pf=Pe.extend(function(){return{segmentScale:4,dynamic:!0,useNativeLine:!0,attributes:{position:new Pe.Attribute("position","float",2,"POSITION"),normal:new Pe.Attribute("normal","float",2),offset:new Pe.Attribute("offset","float",1),color:new Pe.Attribute("color","float",4,"COLOR")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0,this._itemVertexOffsets=[]},setVertexCount:function(e){var t=this.attributes;this.vertexCount!==e&&(t.position.init(e),t.color.init(e),this.useNativeLine||(t.offset.init(e),t.normal.init(e)),e>65535?this.indices instanceof Uint16Array&&(this.indices=new Uint32Array(this.indices)):this.indices instanceof Uint32Array&&(this.indices=new Uint16Array(this.indices)))},setTriangleCount:function(e){this.triangleCount!==e&&(e===0?this.indices=null:this.indices=this.vertexCount>65535?new Uint32Array(e*3):new Uint16Array(e*3))},_getCubicCurveApproxStep:function(e,t,r,i){var n=vt.dist(e,t)+vt.dist(r,t)+vt.dist(i,r),a=1/(n+1)*this.segmentScale;return a},getCubicCurveVertexCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?a*2:a*2+2},getCubicCurveTriangleCount:function(e,t,r,i){var n=this._getCubicCurveApproxStep(e,t,r,i),a=Math.ceil(1/n);return this.useNativeLine?0:a*2},getLineVertexCount:function(){return this.getPolylineVertexCount(Mh)},getLineTriangleCount:function(){return this.getPolylineTriangleCount(Mh)},getPolylineVertexCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/2}return this.useNativeLine?(t-1)*2:(t-1)*2+2},getPolylineTriangleCount:function(e){var t;if(typeof e=="number")t=e;else{var r=typeof e[0]!="number";t=r?e.length:e.length/2}return this.useNativeLine?0:(t-1)*2},addCubicCurve:function(e,t,r,i,n,a){a==null&&(a=1);for(var o=e[0],s=e[1],l=t[0],h=t[1],u=r[0],f=r[1],d=i[0],c=i[1],v=this._getCubicCurveApproxStep(e,t,r,i),p=v*v,g=p*v,m=3*v,_=3*p,x=6*p,y=6*g,T=o-l*2+u,w=s-h*2+f,E=(l-u)*3-o+d,S=(h-f)*3-s+c,D=o,M=s,C=(l-o)*m+T*_+E*g,N=(h-s)*m+w*_+S*g,O=T*x+E*y,P=w*x+S*y,F=E*y,H=S*y,Y=0,z=0,Te=Math.ceil(1/v),q=new Float32Array((Te+1)*3),q=[],De=0,z=0;z<Te+1;z++)q[De++]=D,q[De++]=M,D+=C,M+=N,C+=O,N+=P,O+=F,P+=H,Y+=v,Y>1&&(D=C>0?Math.min(D,d):Math.max(D,d),M=N>0?Math.min(M,c):Math.max(M,c));this.addPolyline(q,n,a)},addLine:function(e,t,r,i){this.addPolyline([e,t],r,i)},addPolyline:function(){var e=vt.create(),t=vt.create(),r=vt.create(),i=vt.create(),n=[],a=[],o=[];return function(s,l,h,u,f){if(s.length){var d=typeof s[0]!="number";if(f==null&&(f=d?s.length:s.length/2),!(f<2)){u==null&&(u=0),h==null&&(h=1),this._itemVertexOffsets.push(this._vertexOffset);for(var c=d?typeof l[0]!="number":l.length/4===f,v=this.attributes.position,p=this.attributes.color,g=this.attributes.offset,m=this.attributes.normal,_=this.indices,x=this._vertexOffset,y,T=0;T<f;T++){if(d)n=s[T+u],c?y=l[T+u]:y=l;else{var w=T*2+u;if(n=n||[],n[0]=s[w],n[1]=s[w+1],c){var E=T*4+u;y=y||[],y[0]=l[E],y[1]=l[E+1],y[2]=l[E+2],y[3]=l[E+3]}else y=l}if(this.useNativeLine)T>1&&(v.copy(x,x-1),p.copy(x,x-1),x++);else{var S;if(T<f-1){if(d)vt.copy(a,s[T+1]);else{var w=(T+1)*2+u;a=a||[],a[0]=s[w],a[1]=s[w+1]}if(T>0){vt.sub(e,n,o),vt.sub(t,a,n),vt.normalize(e,e),vt.normalize(t,t),vt.add(i,e,t),vt.normalize(i,i);var D=h/2*Math.min(1/vt.dot(e,i),2);r[0]=-i[1],r[1]=i[0],S=D}else vt.sub(e,a,n),vt.normalize(e,e),r[0]=-e[1],r[1]=e[0],S=h/2}else vt.sub(e,n,o),vt.normalize(e,e),r[0]=-e[1],r[1]=e[0],S=h/2;m.set(x,r),m.set(x+1,r),g.set(x,S),g.set(x+1,-S),vt.copy(o,n),v.set(x,n),v.set(x+1,n),p.set(x,y),p.set(x+1,y),x+=2}if(this.useNativeLine)p.set(x,y),v.set(x,n),x++;else if(T>0){var M=this._faceOffset*3,_=this.indices;_[M]=x-4,_[M+1]=x-3,_[M+2]=x-2,_[M+3]=x-3,_[M+4]=x-1,_[M+5]=x-2,this._faceOffset+=2}}this._vertexOffset=x}}}}(),setItemColor:function(e,t){for(var r=this._itemVertexOffsets[e],i=e<this._itemVertexOffsets.length-1?this._itemVertexOffsets[e+1]:this._vertexOffset,n=r;n<i;n++)this.attributes.color.set(n,t);this.dirty("color")}});si(pf.prototype,Jn);const mf=pf,o0=`@export ecgl.forceAtlas2.updateNodeRepulsion

#define NODE_COUNT 0

uniform sampler2D positionTex;

uniform vec2 textureSize;
uniform float gravity;
uniform float scaling;
uniform vec2 gravityCenter;

uniform bool strongGravityMode;
uniform bool preventOverlap;

varying vec2 v_Texcoord;

void main() {

 vec4 n0 = texture2D(positionTex, v_Texcoord);

 vec2 force = vec2(0.0);
 for (int i = 0; i < NODE_COUNT; i++) {
 vec2 uv = vec2(
 mod(float(i), textureSize.x) / (textureSize.x - 1.0),
 floor(float(i) / textureSize.x) / (textureSize.y - 1.0)
 );
 vec4 n1 = texture2D(positionTex, uv);

 vec2 dir = n0.xy - n1.xy;
 float d2 = dot(dir, dir);

 if (d2 > 0.0) {
 float factor = 0.0;
 if (preventOverlap) {
 float d = sqrt(d2);
 d = d - n0.w - n1.w;
 if (d > 0.0) {
 factor = scaling * n0.z * n1.z / (d * d);
 }
 else if (d < 0.0) {
 factor = scaling * 100.0 * n0.z * n1.z;
 }
 }
 else {
 factor = scaling * n0.z * n1.z / d2;
 }
 force += dir * factor;
 }
 }

 vec2 dir = gravityCenter - n0.xy;
 float d = 1.0;
 if (!strongGravityMode) {
 d = length(dir);
 }

 force += dir * n0.z * gravity / (d + 1.0);

 gl_FragColor = vec4(force, 0.0, 1.0);
}
@end

@export ecgl.forceAtlas2.updateEdgeAttraction.vertex

attribute vec2 node1;
attribute vec2 node2;
attribute float weight;

uniform sampler2D positionTex;
uniform float edgeWeightInfluence;
uniform bool preventOverlap;
uniform bool linLogMode;

uniform vec2 windowSize: WINDOW_SIZE;

varying vec2 v_Force;

void main() {

 vec4 n0 = texture2D(positionTex, node1);
 vec4 n1 = texture2D(positionTex, node2);

 vec2 dir = n1.xy - n0.xy;
 float d = length(dir);
 float w;
 if (edgeWeightInfluence == 0.0) {
 w = 1.0;
 }
 else if (edgeWeightInfluence == 1.0) {
 w = weight;
 }
 else {
 w = pow(weight, edgeWeightInfluence);
 }
 vec2 offset = vec2(1.0 / windowSize.x, 1.0 / windowSize.y);
 vec2 scale = vec2((windowSize.x - 1.0) / windowSize.x, (windowSize.y - 1.0) / windowSize.y);
 vec2 pos = node1 * scale * 2.0 - 1.0;
 gl_Position = vec4(pos + offset, 0.0, 1.0);
 gl_PointSize = 1.0;

 float factor;
 if (preventOverlap) {
 d = d - n1.w - n0.w;
 }
 if (d <= 0.0) {
 v_Force = vec2(0.0);
 return;
 }

 if (linLogMode) {
 factor = w * log(d) / d;
 }
 else {
 factor = w;
 }
 v_Force = dir * factor;
}
@end

@export ecgl.forceAtlas2.updateEdgeAttraction.fragment

varying vec2 v_Force;

void main() {
 gl_FragColor = vec4(v_Force, 0.0, 0.0);
}
@end

@export ecgl.forceAtlas2.calcWeightedSum.vertex

attribute vec2 node;

varying vec2 v_NodeUv;

void main() {

 v_NodeUv = node;
 gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
 gl_PointSize = 1.0;
}
@end

@export ecgl.forceAtlas2.calcWeightedSum.fragment

varying vec2 v_NodeUv;

uniform sampler2D positionTex;
uniform sampler2D forceTex;
uniform sampler2D forcePrevTex;

void main() {
 vec2 force = texture2D(forceTex, v_NodeUv).rg;
 vec2 forcePrev = texture2D(forcePrevTex, v_NodeUv).rg;

 float mass = texture2D(positionTex, v_NodeUv).z;
 float swing = length(force - forcePrev) * mass;
 float traction = length(force + forcePrev) * 0.5 * mass;

 gl_FragColor = vec4(swing, traction, 0.0, 0.0);
}
@end

@export ecgl.forceAtlas2.calcGlobalSpeed

uniform sampler2D globalSpeedPrevTex;
uniform sampler2D weightedSumTex;
uniform float jitterTolerence;

void main() {
 vec2 weightedSum = texture2D(weightedSumTex, vec2(0.5)).xy;
 float prevGlobalSpeed = texture2D(globalSpeedPrevTex, vec2(0.5)).x;
 float globalSpeed = jitterTolerence * jitterTolerence
 * weightedSum.y / weightedSum.x;
 if (prevGlobalSpeed > 0.0) {
 globalSpeed = min(globalSpeed / prevGlobalSpeed, 1.5) * prevGlobalSpeed;
 }
 gl_FragColor = vec4(globalSpeed, 0.0, 0.0, 1.0);
}
@end

@export ecgl.forceAtlas2.updatePosition

uniform sampler2D forceTex;
uniform sampler2D forcePrevTex;
uniform sampler2D positionTex;
uniform sampler2D globalSpeedTex;

varying vec2 v_Texcoord;

void main() {
 vec2 force = texture2D(forceTex, v_Texcoord).xy;
 vec2 forcePrev = texture2D(forcePrevTex, v_Texcoord).xy;
 vec4 node = texture2D(positionTex, v_Texcoord);

 float globalSpeed = texture2D(globalSpeedTex, vec2(0.5)).r;
 float swing = length(force - forcePrev);
 float speed = 0.1 * globalSpeed / (0.1 + globalSpeed * sqrt(swing));

 float df = length(force);
 if (df > 0.0) {
 speed = min(df * speed, 10.0) / df;

 gl_FragColor = vec4(node.xy + speed * force, node.zw);
 }
 else {
 gl_FragColor = node;
 }
}
@end

@export ecgl.forceAtlas2.edges.vertex
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec2 node;
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;

uniform sampler2D positionTex;

void main()
{
 gl_Position = worldViewProjection * vec4(
 texture2D(positionTex, node).xy, -10.0, 1.0
 );
 v_Color = a_Color;
}
@end

@export ecgl.forceAtlas2.edges.fragment
uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
varying vec4 v_Color;
void main() {
 gl_FragColor = color * v_Color;
}
@end`;b.Shader.import(o0);var $o={repulsionByDegree:!0,linLogMode:!1,strongGravityMode:!1,gravity:1,scaling:1,edgeWeightInfluence:1,jitterTolerence:.1,preventOverlap:!1,dissuadeHubs:!1,gravityCenter:null};function gt(e){var t={type:b.Texture.FLOAT,minFilter:b.Texture.NEAREST,magFilter:b.Texture.NEAREST};this._positionSourceTex=new b.Texture2D(t),this._positionSourceTex.flipY=!1,this._positionTex=new b.Texture2D(t),this._positionPrevTex=new b.Texture2D(t),this._forceTex=new b.Texture2D(t),this._forcePrevTex=new b.Texture2D(t),this._weightedSumTex=new b.Texture2D(t),this._weightedSumTex.width=this._weightedSumTex.height=1,this._globalSpeedTex=new b.Texture2D(t),this._globalSpeedPrevTex=new b.Texture2D(t),this._globalSpeedTex.width=this._globalSpeedTex.height=1,this._globalSpeedPrevTex.width=this._globalSpeedPrevTex.height=1,this._nodeRepulsionPass=new ct({fragment:b.Shader.source("ecgl.forceAtlas2.updateNodeRepulsion")}),this._positionPass=new ct({fragment:b.Shader.source("ecgl.forceAtlas2.updatePosition")}),this._globalSpeedPass=new ct({fragment:b.Shader.source("ecgl.forceAtlas2.calcGlobalSpeed")}),this._copyPass=new ct({fragment:b.Shader.source("clay.compositor.output")});var r=function(i){i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ONE)};this._edgeForceMesh=new b.Mesh({geometry:new b.Geometry({attributes:{node1:new b.Geometry.Attribute("node1","float",2),node2:new b.Geometry.Attribute("node2","float",2),weight:new b.Geometry.Attribute("weight","float",1)},dynamic:!0,mainAttribute:"node1"}),material:new b.Material({transparent:!0,shader:b.createShader("ecgl.forceAtlas2.updateEdgeAttraction"),blend:r,depthMask:!1,depthText:!1}),mode:b.Mesh.POINTS}),this._weightedSumMesh=new b.Mesh({geometry:new b.Geometry({attributes:{node:new b.Geometry.Attribute("node","float",2)},dynamic:!0,mainAttribute:"node"}),material:new b.Material({transparent:!0,shader:b.createShader("ecgl.forceAtlas2.calcWeightedSum"),blend:r,depthMask:!1,depthText:!1}),mode:b.Mesh.POINTS}),this._framebuffer=new At({depthBuffer:!1}),this._dummyCamera=new b.OrthographicCamera({left:-1,right:1,top:1,bottom:-1,near:0,far:100}),this._globalSpeed=0}gt.prototype.updateOption=function(e){for(var t in $o)this[t]=$o[t];var r=this._nodes.length;if(r>5e4?this.jitterTolerence=10:r>5e3?this.jitterTolerence=1:this.jitterTolerence=.1,r>100?this.scaling=2:this.scaling=10,e)for(var t in $o)e[t]!=null&&(this[t]=e[t]);if(this.repulsionByDegree)for(var i=this._positionSourceTex.pixels,n=0;n<this._nodes.length;n++)i[n*4+2]=(this._nodes[n].degree||0)+1};gt.prototype._updateGravityCenter=function(e){var t=this._nodes,r=this._edges;if(this.gravityCenter)this._gravityCenter=this.gravityCenter;else{for(var i=[1/0,1/0],n=[-1/0,-1/0],a=0;a<t.length;a++)i[0]=Math.min(t[a].x,i[0]),i[1]=Math.min(t[a].y,i[1]),n[0]=Math.max(t[a].x,n[0]),n[1]=Math.max(t[a].y,n[1]);this._gravityCenter=[(i[0]+n[0])*.5,(i[1]+n[1])*.5]}for(var a=0;a<r.length;a++){var o=r[a].node1,s=r[a].node2;t[o].degree=(t[o].degree||0)+1,t[s].degree=(t[s].degree||0)+1}};gt.prototype.initData=function(e,t){this._nodes=e,this._edges=t,this._updateGravityCenter();var r=Math.ceil(Math.sqrt(e.length)),i=r,n=new Float32Array(r*i*4);this._resize(r,i);for(var a=0,o=0;o<e.length;o++){var s=e[o];n[a++]=s.x||0,n[a++]=s.y||0,n[a++]=s.mass||1,n[a++]=s.size||1}this._positionSourceTex.pixels=n;var l=this._edgeForceMesh.geometry,h=t.length;l.attributes.node1.init(h*2),l.attributes.node2.init(h*2),l.attributes.weight.init(h*2);for(var u=[],o=0;o<t.length;o++){var f=l.attributes,d=t[o].weight;d==null&&(d=1),f.node1.set(o,this.getNodeUV(t[o].node1,u)),f.node2.set(o,this.getNodeUV(t[o].node2,u)),f.weight.set(o,d),f.node1.set(o+h,this.getNodeUV(t[o].node2,u)),f.node2.set(o+h,this.getNodeUV(t[o].node1,u)),f.weight.set(o+h,d)}var c=this._weightedSumMesh.geometry;c.attributes.node.init(e.length);for(var o=0;o<e.length;o++)c.attributes.node.set(o,this.getNodeUV(o,u));l.dirty(),c.dirty(),this._nodeRepulsionPass.material.define("fragment","NODE_COUNT",e.length),this._nodeRepulsionPass.material.setUniform("textureSize",[r,i]),this._inited=!1,this._frame=0};gt.prototype.getNodes=function(){return this._nodes};gt.prototype.getEdges=function(){return this._edges};gt.prototype.step=function(e){this._inited||(this._initFromSource(e),this._inited=!0),this._frame++,this._framebuffer.attach(this._forceTex),this._framebuffer.bind(e);var t=this._nodeRepulsionPass;t.setUniform("strongGravityMode",this.strongGravityMode),t.setUniform("gravity",this.gravity),t.setUniform("gravityCenter",this._gravityCenter),t.setUniform("scaling",this.scaling),t.setUniform("preventOverlap",this.preventOverlap),t.setUniform("positionTex",this._positionPrevTex),t.render(e);var r=this._edgeForceMesh;r.material.set("linLogMode",this.linLogMode),r.material.set("edgeWeightInfluence",this.edgeWeightInfluence),r.material.set("preventOverlap",this.preventOverlap),r.material.set("positionTex",this._positionPrevTex),e.gl.enable(e.gl.BLEND),e.renderPass([r],this._dummyCamera),this._framebuffer.attach(this._weightedSumTex),e.gl.clearColor(0,0,0,0),e.gl.clear(e.gl.COLOR_BUFFER_BIT),e.gl.enable(e.gl.BLEND);var i=this._weightedSumMesh;i.material.set("positionTex",this._positionPrevTex),i.material.set("forceTex",this._forceTex),i.material.set("forcePrevTex",this._forcePrevTex),e.renderPass([i],this._dummyCamera),this._framebuffer.attach(this._globalSpeedTex);var n=this._globalSpeedPass;n.setUniform("globalSpeedPrevTex",this._globalSpeedPrevTex),n.setUniform("weightedSumTex",this._weightedSumTex),n.setUniform("jitterTolerence",this.jitterTolerence),e.gl.disable(e.gl.BLEND),n.render(e);var a=this._positionPass;this._framebuffer.attach(this._positionTex),a.setUniform("globalSpeedTex",this._globalSpeedTex),a.setUniform("positionTex",this._positionPrevTex),a.setUniform("forceTex",this._forceTex),a.setUniform("forcePrevTex",this._forcePrevTex),a.render(e),this._framebuffer.unbind(e),this._swapTexture()};gt.prototype.update=function(e,t,r){t==null&&(t=1),t=Math.max(t,1);for(var i=0;i<t;i++)this.step(e);r&&r()};gt.prototype.getNodePositionTexture=function(){return this._inited?this._positionPrevTex:this._positionSourceTex};gt.prototype.getNodeUV=function(e,t){t=t||[];var r=this._positionTex.width,i=this._positionTex.height;return t[0]=e%r/(r-1),t[1]=Math.floor(e/r)/(i-1)||0,t};gt.prototype.getNodePosition=function(e,t){var r=this._positionArr,i=this._positionTex.width,n=this._positionTex.height,a=i*n;(!r||r.length!==a*4)&&(r=this._positionArr=new Float32Array(a*4)),this._framebuffer.bind(e),this._framebuffer.attach(this._positionPrevTex),e.gl.readPixels(0,0,i,n,e.gl.RGBA,e.gl.FLOAT,r),this._framebuffer.unbind(e),t||(t=new Float32Array(this._nodes.length*2));for(var o=0;o<this._nodes.length;o++)t[o*2]=r[o*4],t[o*2+1]=r[o*4+1];return t};gt.prototype.getTextureData=function(e,t){var r=this["_"+t+"Tex"],i=r.width,n=r.height;this._framebuffer.bind(e),this._framebuffer.attach(r);var a=new Float32Array(i*n*4);return e.gl.readPixels(0,0,i,n,e.gl.RGBA,e.gl.FLOAT,a),this._framebuffer.unbind(e),a};gt.prototype.getTextureSize=function(){return{width:this._positionTex.width,height:this._positionTex.height}};gt.prototype.isFinished=function(e){return this._frame>e};gt.prototype._swapTexture=function(){var e=this._positionPrevTex;this._positionPrevTex=this._positionTex,this._positionTex=e;var e=this._forcePrevTex;this._forcePrevTex=this._forceTex,this._forceTex=e;var e=this._globalSpeedPrevTex;this._globalSpeedPrevTex=this._globalSpeedTex,this._globalSpeedTex=e};gt.prototype._initFromSource=function(e){this._framebuffer.attach(this._positionPrevTex),this._framebuffer.bind(e),this._copyPass.setUniform("texture",this._positionSourceTex),this._copyPass.render(e),e.gl.clearColor(0,0,0,0),this._framebuffer.attach(this._forcePrevTex),e.gl.clear(e.gl.COLOR_BUFFER_BIT),this._framebuffer.attach(this._globalSpeedPrevTex),e.gl.clear(e.gl.COLOR_BUFFER_BIT),this._framebuffer.unbind(e)};gt.prototype._resize=function(e,t){["_positionSourceTex","_positionTex","_positionPrevTex","_forceTex","_forcePrevTex"].forEach(function(r){this[r].width=e,this[r].height=t,this[r].dirty()},this)};gt.prototype.dispose=function(e){this._framebuffer.dispose(e),this._copyPass.dispose(e),this._nodeRepulsionPass.dispose(e),this._positionPass.dispose(e),this._globalSpeedPass.dispose(e),this._edgeForceMesh.geometry.dispose(e),this._weightedSumMesh.geometry.dispose(e),this._positionSourceTex.dispose(e),this._positionTex.dispose(e),this._positionPrevTex.dispose(e),this._forceTex.dispose(e),this._forcePrevTex.dispose(e),this._weightedSumTex.dispose(e),this._globalSpeedTex.dispose(e),this._globalSpeedPrevTex.dispose(e)};function s0(){var e={create:function(){return new Float32Array(2)},dist:function(l,h){var u=h[0]-l[0],f=h[1]-l[1];return Math.sqrt(u*u+f*f)},len:function(l){var h=l[0],u=l[1];return Math.sqrt(h*h+u*u)},scaleAndAdd:function(l,h,u,f){return l[0]=h[0]+u[0]*f,l[1]=h[1]+u[1]*f,l},scale:function(l,h,u){return l[0]=h[0]*u,l[1]=h[1]*u,l},add:function(l,h,u){return l[0]=h[0]+u[0],l[1]=h[1]+u[1],l},sub:function(l,h,u){return l[0]=h[0]-u[0],l[1]=h[1]-u[1],l},normalize:function(l,h){var u=h[0],f=h[1],d=u*u+f*f;return d>0&&(d=1/Math.sqrt(d),l[0]=h[0]*d,l[1]=h[1]*d),l},negate:function(l,h){return l[0]=-h[0],l[1]=-h[1],l},copy:function(l,h){return l[0]=h[0],l[1]=h[1],l},set:function(l,h,u){return l[0]=h,l[1]=u,l}};function t(){this.subRegions=[],this.nSubRegions=0,this.node=null,this.mass=0,this.centerOfMass=null,this.bbox=new Float32Array(4),this.size=0}var r=t.prototype;r.beforeUpdate=function(){for(var l=0;l<this.nSubRegions;l++)this.subRegions[l].beforeUpdate();this.mass=0,this.centerOfMass&&(this.centerOfMass[0]=0,this.centerOfMass[1]=0),this.nSubRegions=0,this.node=null},r.afterUpdate=function(){this.subRegions.length=this.nSubRegions;for(var l=0;l<this.nSubRegions;l++)this.subRegions[l].afterUpdate()},r.addNode=function(l){if(this.nSubRegions===0)if(this.node==null){this.node=l;return}else this._addNodeToSubRegion(this.node),this.node=null;this._addNodeToSubRegion(l),this._updateCenterOfMass(l)},r.findSubRegion=function(l,h){for(var u=0;u<this.nSubRegions;u++){var f=this.subRegions[u];if(f.contain(l,h))return f}},r.contain=function(l,h){return this.bbox[0]<=l&&this.bbox[2]>=l&&this.bbox[1]<=h&&this.bbox[3]>=h},r.setBBox=function(l,h,u,f){this.bbox[0]=l,this.bbox[1]=h,this.bbox[2]=u,this.bbox[3]=f,this.size=(u-l+f-h)/2},r._newSubRegion=function(){var l=this.subRegions[this.nSubRegions];return l||(l=new t,this.subRegions[this.nSubRegions]=l),this.nSubRegions++,l},r._addNodeToSubRegion=function(l){var h=this.findSubRegion(l.position[0],l.position[1]),u=this.bbox;if(!h){var f=(u[0]+u[2])/2,d=(u[1]+u[3])/2,c=(u[2]-u[0])/2,v=(u[3]-u[1])/2,p=l.position[0]>=f?1:0,g=l.position[1]>=d?1:0,h=this._newSubRegion();h.setBBox(p*c+u[0],g*v+u[1],(p+1)*c+u[0],(g+1)*v+u[1])}h.addNode(l)},r._updateCenterOfMass=function(l){this.centerOfMass==null&&(this.centerOfMass=new Float32Array(2));var h=this.centerOfMass[0]*this.mass,u=this.centerOfMass[1]*this.mass;h+=l.position[0]*l.mass,u+=l.position[1]*l.mass,this.mass+=l.mass,this.centerOfMass[0]=h/this.mass,this.centerOfMass[1]=u/this.mass};function i(){this.position=new Float32Array(2),this.force=e.create(),this.forcePrev=e.create(),this.mass=1,this.inDegree=0,this.outDegree=0}function n(l,h){this.source=l,this.target=h,this.weight=1}function a(){this.autoSettings=!0,this.barnesHutOptimize=!0,this.barnesHutTheta=1.5,this.repulsionByDegree=!0,this.linLogMode=!1,this.strongGravityMode=!1,this.gravity=1,this.scaling=1,this.edgeWeightInfluence=1,this.jitterTolerence=.1,this.preventOverlap=!1,this.dissuadeHubs=!1,this.rootRegion=new t,this.rootRegion.centerOfMass=e.create(),this.nodes=[],this.edges=[],this.bbox=new Float32Array(4),this.gravityCenter=null,this._massArr=null,this._swingingArr=null,this._sizeArr=null,this._globalSpeed=0}var o=a.prototype;o.initNodes=function(l,h,u){var f=h.length;this.nodes.length=0;for(var d=typeof u<"u",c=0;c<f;c++){var v=new i;v.position[0]=l[c*2],v.position[1]=l[c*2+1],v.mass=h[c],d&&(v.size=u[c]),this.nodes.push(v)}this._massArr=h,this._swingingArr=new Float32Array(f),d&&(this._sizeArr=u)},o.initEdges=function(l,h){var u=l.length/2;this.edges.length=0;for(var f=0;f<u;f++){var d=l[f*2],c=l[f*2+1],v=this.nodes[d],p=this.nodes[c];if(!v||!p){console.error("Node not exists, try initNodes before initEdges");return}v.outDegree++,p.inDegree++;var g=new n(v,p);h&&(g.weight=h[f]),this.edges.push(g)}},o.updateSettings=function(){if(this.repulsionByDegree)for(var l=0;l<this.nodes.length;l++){var h=this.nodes[l];h.mass=h.inDegree+h.outDegree+1}else for(var l=0;l<this.nodes.length;l++){var h=this.nodes[l];h.mass=this._massArr[l]}},o.update=function(){var l=this.nodes.length;if(this.updateSettings(),this.updateBBox(),this.barnesHutOptimize){this.rootRegion.setBBox(this.bbox[0],this.bbox[1],this.bbox[2],this.bbox[3]),this.rootRegion.beforeUpdate();for(var h=0;h<l;h++)this.rootRegion.addNode(this.nodes[h]);this.rootRegion.afterUpdate()}for(var h=0;h<l;h++){var u=this.nodes[h];e.copy(u.forcePrev,u.force),e.set(u.force,0,0)}for(var h=0;h<l;h++){var f=this.nodes[h];if(this.barnesHutOptimize)this.applyRegionToNodeRepulsion(this.rootRegion,f);else for(var d=h+1;d<l;d++){var c=this.nodes[d];this.applyNodeToNodeRepulsion(f,c,!1)}this.gravity>0&&(this.strongGravityMode?this.applyNodeStrongGravity(f):this.applyNodeGravity(f))}for(var h=0;h<this.edges.length;h++)this.applyEdgeAttraction(this.edges[h]);for(var v=0,p=0,g=e.create(),h=0;h<l;h++){var u=this.nodes[h],m=e.dist(u.force,u.forcePrev);v+=m*u.mass,e.add(g,u.force,u.forcePrev);var _=e.len(g)*.5;p+=_*u.mass,this._swingingArr[h]=m}var x=this.jitterTolerence*this.jitterTolerence*p/v;this._globalSpeed>0&&(x=Math.min(x/this._globalSpeed,1.5)*this._globalSpeed),this._globalSpeed=x;for(var h=0;h<l;h++){var u=this.nodes[h],m=this._swingingArr[h],y=.1*x/(1+x*Math.sqrt(m)),T=e.len(u.force);T>0&&(y=Math.min(T*y,10)/T,e.scaleAndAdd(u.position,u.position,u.force,y))}},o.applyRegionToNodeRepulsion=function(){var l=e.create();return function(u,f){if(u.node)this.applyNodeToNodeRepulsion(u.node,f,!0);else{e.sub(l,f.position,u.centerOfMass);var d=l[0]*l[0]+l[1]*l[1];if(d>this.barnesHutTheta*u.size*u.size){var c=this.scaling*f.mass*u.mass/d;e.scaleAndAdd(f.force,f.force,l,c)}else for(var v=0;v<u.nSubRegions;v++)this.applyRegionToNodeRepulsion(u.subRegions[v],f)}}}(),o.applyNodeToNodeRepulsion=function(){var l=e.create();return function(u,f,d){if(u!=f){e.sub(l,u.position,f.position);var c=l[0]*l[0]+l[1]*l[1];if(c!==0){var v;if(this.preventOverlap){var p=Math.sqrt(c);if(p=p-u.size-f.size,p>0)v=this.scaling*u.mass*f.mass/(p*p);else if(p<0)v=this.scaling*100*u.mass*f.mass;else return}else v=this.scaling*u.mass*f.mass/c;e.scaleAndAdd(u.force,u.force,l,v),e.scaleAndAdd(f.force,f.force,l,-v)}}}}(),o.applyEdgeAttraction=function(){var l=e.create();return function(u){var f=u.source,d=u.target;e.sub(l,f.position,d.position);var c=e.len(l),v;this.edgeWeightInfluence===0?v=1:this.edgeWeightInfluence===1?v=u.weight:v=Math.pow(u.weight,this.edgeWeightInfluence);var p;this.preventOverlap&&(c=c-f.size-d.size,c<=0)||(this.linLogMode?p=-v*Math.log(c+1)/(c+1):p=-v,e.scaleAndAdd(f.force,f.force,l,p),e.scaleAndAdd(d.force,d.force,l,-p))}}(),o.applyNodeGravity=function(){var l=e.create();return function(h){e.sub(l,this.gravityCenter,h.position);var u=e.len(l);e.scaleAndAdd(h.force,h.force,l,this.gravity*h.mass/(u+1))}}(),o.applyNodeStrongGravity=function(){var l=e.create();return function(h){e.sub(l,this.gravityCenter,h.position),e.scaleAndAdd(h.force,h.force,l,this.gravity*h.mass)}}(),o.updateBBox=function(){for(var l=1/0,h=1/0,u=-1/0,f=-1/0,d=0;d<this.nodes.length;d++){var c=this.nodes[d].position;l=Math.min(l,c[0]),h=Math.min(h,c[1]),u=Math.max(u,c[0]),f=Math.max(f,c[1])}this.bbox[0]=l,this.bbox[1]=h,this.bbox[2]=u,this.bbox[3]=f},o.getGlobalSpeed=function(){return this._globalSpeed};var s=null;self.onmessage=function(l){switch(l.data.cmd){case"init":s=new a,s.initNodes(l.data.nodesPosition,l.data.nodesMass,l.data.nodesSize),s.initEdges(l.data.edges,l.data.edgesWeight);break;case"updateConfig":if(s)for(var h in l.data.config)s[h]=l.data.config[h];break;case"update":var u=l.data.steps;if(s){for(var f=0;f<u;f++)s.update();for(var d=s.nodes.length,c=new Float32Array(d*2),f=0;f<d;f++){var v=s.nodes[f];c[f*2]=v.position[0],c[f*2+1]=v.position[1]}self.postMessage({buffer:c.buffer,globalSpeed:s.getGlobalSpeed()},[c.buffer])}else{var p=new Float32Array;self.postMessage({buffer:p.buffer,globalSpeed:s.getGlobalSpeed()},[p.buffer])}break}}}var Nn=s0.toString();Nn=Nn.slice(Nn.indexOf("{")+1,Nn.lastIndexOf("}"));var On={barnesHutOptimize:!0,barnesHutTheta:1.5,repulsionByDegree:!0,linLogMode:!1,strongGravityMode:!1,gravity:1,scaling:1,edgeWeightInfluence:1,jitterTolerence:.1,preventOverlap:!1,dissuadeHubs:!1,gravityCenter:null},qt=function(e){for(var t in On)this[t]=On[t];if(e)for(var t in e)this[t]=e[t];this._nodes=[],this._edges=[],this._disposed=!1,this._positionTex=new ge({type:ne.FLOAT,flipY:!1,minFilter:ne.NEAREST,magFilter:ne.NEAREST})};qt.prototype.initData=function(e,t){var r=new Blob([Nn]),i=window.URL.createObjectURL(r);this._worker=new Worker(i),this._worker.onmessage=this._$onupdate.bind(this),this._nodes=e,this._edges=t,this._frame=0;for(var n=e.length,a=t.length,o=new Float32Array(n*2),s=new Float32Array(n),l=new Float32Array(n),h=new Float32Array(a*2),u=new Float32Array(a),f=0;f<e.length;f++){var d=e[f];o[f*2]=d.x,o[f*2+1]=d.y,s[f]=d.mass==null?1:d.mass,l[f]=d.size==null?1:d.size}for(var f=0;f<t.length;f++){var c=t[f],v=c.node1,p=c.node2;h[f*2]=v,h[f*2+1]=p,u[f]=c.weight==null?1:c.weight}var g=Math.ceil(Math.sqrt(e.length)),m=g,_=new Float32Array(g*m*4),x=this._positionTex;x.width=g,x.height=m,x.pixels=_,this._worker.postMessage({cmd:"init",nodesPosition:o,nodesMass:s,nodesSize:l,edges:h,edgesWeight:u}),this._globalSpeed=1/0};qt.prototype.updateOption=function(e){var t={};for(var r in On)t[r]=On[r];var i=this._nodes,n=this._edges,a=i.length;if(a>5e4?t.jitterTolerence=10:a>5e3?t.jitterTolerence=1:t.jitterTolerence=.1,a>100?t.scaling=2:t.scaling=10,a>1e3?t.barnesHutOptimize=!0:t.barnesHutOptimize=!1,e)for(var r in On)e[r]!=null&&(t[r]=e[r]);if(!t.gravityCenter){for(var o=[1/0,1/0],s=[-1/0,-1/0],l=0;l<i.length;l++)o[0]=Math.min(i[l].x,o[0]),o[1]=Math.min(i[l].y,o[1]),s[0]=Math.max(i[l].x,s[0]),s[1]=Math.max(i[l].y,s[1]);t.gravityCenter=[(o[0]+s[0])*.5,(o[1]+s[1])*.5]}for(var l=0;l<n.length;l++){var h=n[l].node1,u=n[l].node2;i[h].degree=(i[h].degree||0)+1,i[u].degree=(i[u].degree||0)+1}this._worker&&this._worker.postMessage({cmd:"updateConfig",config:t})};qt.prototype.update=function(e,t,r){t==null&&(t=1),t=Math.max(t,1),this._frame+=t,this._onupdate=r,this._worker&&this._worker.postMessage({cmd:"update",steps:Math.round(t)})};qt.prototype._$onupdate=function(e){if(!this._disposed){var t=new Float32Array(e.data.buffer);this._globalSpeed=e.data.globalSpeed,this._positionArr=t,this._updateTexture(t),this._onupdate&&this._onupdate()}};qt.prototype.getNodePositionTexture=function(){return this._positionTex};qt.prototype.getNodeUV=function(e,t){t=t||[];var r=this._positionTex.width,i=this._positionTex.height;return t[0]=e%r/(r-1),t[1]=Math.floor(e/r)/(i-1),t};qt.prototype.getNodes=function(){return this._nodes};qt.prototype.getEdges=function(){return this._edges};qt.prototype.isFinished=function(e){return this._frame>e};qt.prototype.getNodePosition=function(e,t){if(t||(t=new Float32Array(this._nodes.length*2)),this._positionArr)for(var r=0;r<this._positionArr.length;r++)t[r]=this._positionArr[r];return t};qt.prototype._updateTexture=function(e){for(var t=this._positionTex.pixels,r=0,i=0;i<e.length;)t[r++]=e[i++],t[r++]=e[i++],t[r++]=1,t[r++]=1;this._positionTex.dirty()};qt.prototype.dispose=function(e){this._disposed=!0,this._worker=null};const Dh=qt;var l0=Bt.extend(function(){return{zr:null,viewGL:null,minZoom:.2,maxZoom:5,_needsUpdate:!1,_dx:0,_dy:0,_zoom:1}},function(){this._mouseDownHandler=this._mouseDownHandler.bind(this),this._mouseWheelHandler=this._mouseWheelHandler.bind(this),this._mouseMoveHandler=this._mouseMoveHandler.bind(this),this._mouseUpHandler=this._mouseUpHandler.bind(this),this._update=this._update.bind(this)},{init:function(){var e=this.zr;e.on("mousedown",this._mouseDownHandler),e.on("mousewheel",this._mouseWheelHandler),e.on("globalout",this._mouseUpHandler),e.animation.on("frame",this._update)},setTarget:function(e){this._target=e},setZoom:function(e){this._zoom=Math.max(Math.min(e,this.maxZoom),this.minZoom),this._needsUpdate=!0},setOffset:function(e){this._dx=e[0],this._dy=e[1],this._needsUpdate=!0},getZoom:function(){return this._zoom},getOffset:function(){return[this._dx,this._dy]},_update:function(){if(this._target&&this._needsUpdate){var e=this._target,t=this._zoom;e.position.x=this._dx,e.position.y=this._dy,e.scale.set(t,t,t),this.zr.refresh(),this._needsUpdate=!1,this.trigger("update")}},_mouseDownHandler:function(e){if(!e.target){var t=e.offsetX,r=e.offsetY;if(!(this.viewGL&&!this.viewGL.containPoint(t,r))){this.zr.on("mousemove",this._mouseMoveHandler),this.zr.on("mouseup",this._mouseUpHandler);var i=this._convertPos(t,r);this._x=i.x,this._y=i.y}}},_convertPos:function(e,t){var r=this.viewGL.camera,i=this.viewGL.viewport;return{x:(e-i.x)/i.width*(r.right-r.left)+r.left,y:(t-i.y)/i.height*(r.bottom-r.top)+r.top}},_mouseMoveHandler:function(e){var t=this._convertPos(e.offsetX,e.offsetY);this._dx+=t.x-this._x,this._dy+=t.y-this._y,this._x=t.x,this._y=t.y,this._needsUpdate=!0},_mouseUpHandler:function(e){this.zr.off("mousemove",this._mouseMoveHandler),this.zr.off("mouseup",this._mouseUpHandler)},_mouseWheelHandler:function(e){e=e.event;var t=e.wheelDelta||-e.detail;if(t!==0){var r=e.offsetX,i=e.offsetY;if(!(this.viewGL&&!this.viewGL.containPoint(r,i))){var n=t>0?1.1:.9,a=Math.max(Math.min(this._zoom*n,this.maxZoom),this.minZoom);n=a/this._zoom;var o=this._convertPos(r,i),s=(o.x-this._dx)*(n-1),l=(o.y-this._dy)*(n-1);this._dx-=s,this._dy-=l,this._zoom=a,this._needsUpdate=!0}}},dispose:function(){var e=this.zr;e.off("mousedown",this._mouseDownHandler),e.off("mousemove",this._mouseMoveHandler),e.off("mouseup",this._mouseUpHandler),e.off("mousewheel",this._mouseWheelHandler),e.off("globalout",this._mouseUpHandler),e.animation.off("frame",this._update)}});const h0=l0,u0=`@export ecgl.lines2D.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

attribute vec2 position: POSITION;
attribute vec4 a_Color : COLOR;
varying vec4 v_Color;

#ifdef POSITIONTEXTURE_ENABLED
uniform sampler2D positionTexture;
#endif

void main()
{
 gl_Position = worldViewProjection * vec4(position, -10.0, 1.0);

 v_Color = a_Color;
}

@end

@export ecgl.lines2D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;

void main()
{
 gl_FragColor = color * v_Color;
}
@end


@export ecgl.meshLines2D.vertex

attribute vec2 position: POSITION;
attribute vec2 normal;
attribute float offset;
attribute vec4 a_Color : COLOR;

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform vec4 viewport : VIEWPORT;

varying vec4 v_Color;
varying float v_Miter;

void main()
{
 vec4 p2 = worldViewProjection * vec4(position + normal, -10.0, 1.0);
 gl_Position = worldViewProjection * vec4(position, -10.0, 1.0);

 p2.xy /= p2.w;
 gl_Position.xy /= gl_Position.w;

 vec2 N = normalize(p2.xy - gl_Position.xy);
 gl_Position.xy += N * offset / viewport.zw * 2.0;

 gl_Position.xy *= gl_Position.w;

 v_Color = a_Color;
}
@end


@export ecgl.meshLines2D.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];

varying vec4 v_Color;
varying float v_Miter;

void main()
{
 gl_FragColor = color * v_Color;
}

@end`;var Pa=ht.vec2;b.Shader.import(u0);var f0=1;const c0=Xt.extend({type:"graphGL",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this.viewGL=new Fe("orthographic"),this.viewGL.camera.left=this.viewGL.camera.right=0,this.viewGL.add(this.groupGL),this._pointsBuilder=new Mi(!0,t),this._forceEdgesMesh=new b.Mesh({material:new b.Material({shader:b.createShader("ecgl.forceAtlas2.edges"),transparent:!0,depthMask:!1,depthTest:!1}),$ignorePicking:!0,geometry:new b.Geometry({attributes:{node:new b.Geometry.Attribute("node","float",2),color:new b.Geometry.Attribute("color","float",4,"COLOR")},dynamic:!0,mainAttribute:"node"}),renderOrder:-1,mode:b.Mesh.LINES}),this._edgesMesh=new b.Mesh({material:new b.Material({shader:b.createShader("ecgl.meshLines2D"),transparent:!0,depthMask:!1,depthTest:!1}),$ignorePicking:!0,geometry:new mf({useNativeLine:!1,dynamic:!0}),renderOrder:-1,culling:!1}),this._layoutId=0,this._control=new h0({zr:t.getZr(),viewGL:this.viewGL}),this._control.setTarget(this.groupGL),this._control.init(),this._clickHandler=this._clickHandler.bind(this)},render:function(e,t,r){this.groupGL.add(this._pointsBuilder.rootNode),this._model=e,this._api=r,this._initLayout(e,t,r),this._pointsBuilder.update(e,t,r),this._forceLayoutInstance instanceof gt||this.groupGL.remove(this._forceEdgesMesh),this._updateCamera(e,r),this._control.off("update"),this._control.on("update",function(){r.dispatchAction({type:"graphGLRoam",seriesId:e.id,zoom:this._control.getZoom(),offset:this._control.getOffset()}),this._pointsBuilder.updateView(this.viewGL.camera)},this),this._control.setZoom(xe.firstNotNull(e.get("zoom"),1)),this._control.setOffset(e.get("offset")||[0,0]);var i=this._pointsBuilder.getPointsMesh();if(i.off("mousemove",this._mousemoveHandler),i.off("mouseout",this._mouseOutHandler,this),r.getZr().off("click",this._clickHandler),this._pointsBuilder.highlightOnMouseover=!0,e.get("focusNodeAdjacency")){var n=e.get("focusNodeAdjacencyOn");n==="click"?r.getZr().on("click",this._clickHandler):n==="mouseover"&&(i.on("mousemove",this._mousemoveHandler,this),i.on("mouseout",this._mouseOutHandler,this),this._pointsBuilder.highlightOnMouseover=!1)}this._lastMouseOverDataIndex=-1},_clickHandler:function(e){if(!this._layouting){var t=this._pointsBuilder.getPointsMesh().dataIndex;t>=0?this._api.dispatchAction({type:"graphGLFocusNodeAdjacency",seriesId:this._model.id,dataIndex:t}):this._api.dispatchAction({type:"graphGLUnfocusNodeAdjacency",seriesId:this._model.id})}},_mousemoveHandler:function(e){if(!this._layouting){var t=this._pointsBuilder.getPointsMesh().dataIndex;t>=0?t!==this._lastMouseOverDataIndex&&this._api.dispatchAction({type:"graphGLFocusNodeAdjacency",seriesId:this._model.id,dataIndex:t}):this._mouseOutHandler(e),this._lastMouseOverDataIndex=t}},_mouseOutHandler:function(e){this._layouting||(this._api.dispatchAction({type:"graphGLUnfocusNodeAdjacency",seriesId:this._model.id}),this._lastMouseOverDataIndex=-1)},_updateForceEdgesGeometry:function(e,t){var r=this._forceEdgesMesh.geometry,i=t.getEdgeData(),n=0,a=this._forceLayoutInstance,o=i.count()*2;r.attributes.node.init(o),r.attributes.color.init(o),i.each(function(s){var l=e[s];r.attributes.node.set(n,a.getNodeUV(l.node1)),r.attributes.node.set(n+1,a.getNodeUV(l.node2));var h=wt(i,l.dataIndex),u=b.parseColor(h);u[3]*=xe.firstNotNull(Tt(i,l.dataIndex),1),r.attributes.color.set(n,u),r.attributes.color.set(n+1,u),n+=2}),r.dirty()},_updateMeshLinesGeometry:function(){var t=this._model.getEdgeData(),e=this._edgesMesh.geometry,t=this._model.getEdgeData(),r=this._model.getData().getLayout("points");e.resetOffset(),e.setVertexCount(t.count()*e.getLineVertexCount()),e.setTriangleCount(t.count()*e.getLineTriangleCount());var i=[],n=[],a=["lineStyle","width"];this._originalEdgeColors=new Float32Array(t.count()*4),this._edgeIndicesMap=new Float32Array(t.count()),t.each(function(o){var s=t.graph.getEdgeByIndex(o),l=s.node1.dataIndex*2,h=s.node2.dataIndex*2;i[0]=r[l],i[1]=r[l+1],n[0]=r[h],n[1]=r[h+1];var u=wt(t,s.dataIndex),f=b.parseColor(u);f[3]*=xe.firstNotNull(Tt(t,s.dataIndex),1);var d=t.getItemModel(s.dataIndex),c=xe.firstNotNull(d.get(a),1)*this._api.getDevicePixelRatio();e.addLine(i,n,f,c);for(var v=0;v<4;v++)this._originalEdgeColors[s.dataIndex*4+v]=f[v];this._edgeIndicesMap[s.dataIndex]=o},this),e.dirty()},_updateForceNodesGeometry:function(e){for(var t=this._pointsBuilder.getPointsMesh(),r=[],i=0;i<e.count();i++)this._forceLayoutInstance.getNodeUV(i,r),t.geometry.attributes.position.set(i,r);t.geometry.dirty("position")},_initLayout:function(e,t,r){var i=e.get("layout"),n=e.getGraph(),a=e.getBoxLayoutParams(),o=$n(a,{width:r.getWidth(),height:r.getHeight()});i==="force"&&(i="forceAtlas2"),this.stopLayout(e,t,r,{beforeLayout:!0});var s=e.getData(),l=e.getData();if(i==="forceAtlas2"){var h=e.getModel("forceAtlas2"),u=this._forceLayoutInstance,f=[],d=[],c=s.getDataExtent("value"),v=l.getDataExtent("value"),p=xe.firstNotNull(h.get("edgeWeight"),1),g=xe.firstNotNull(h.get("nodeWeight"),1);typeof p=="number"&&(p=[p,p]),typeof g=="number"&&(g=[g,g]);var m=0,_={},x=new Float32Array(s.count()*2);if(n.eachNode(function(T){var w=T.dataIndex,E=s.get("value",w),S,D;if(s.hasItemOption){var M=s.getItemModel(w);S=M.get("x"),D=M.get("y")}S==null&&(S=o.x+Math.random()*o.width,D=o.y+Math.random()*o.height),x[m*2]=S,x[m*2+1]=D,_[T.id]=m++;var C=rs(E,c,g);isNaN(C)&&(isNaN(g[0])?C=1:C=g[0]),f.push({x:S,y:D,mass:C,size:s.getItemVisual(w,"symbolSize")})}),s.setLayout("points",x),n.eachEdge(function(T){var w=T.dataIndex,E=s.get("value",w),S=rs(E,v,p);isNaN(S)&&(isNaN(p[0])?S=1:S=p[0]),d.push({node1:_[T.node1.id],node2:_[T.node2.id],weight:S,dataIndex:w})}),!u){var y=h.get("GPU");this._forceLayoutInstance&&(y&&!(this._forceLayoutInstance instanceof gt)||!y&&!(this._forceLayoutInstance instanceof Dh))&&(this._forceLayoutInstanceToDispose=this._forceLayoutInstance),u=this._forceLayoutInstance=y?new gt:new Dh}u.initData(f,d),u.updateOption(h.option),this._updateForceEdgesGeometry(u.getEdges(),e),this._updatePositionTexture(),r.dispatchAction({type:"graphGLStartLayout",from:this.uid})}else{var x=new Float32Array(s.count()*2),m=0;n.eachNode(function(E){var S=E.dataIndex,D,M;if(s.hasItemOption){var C=s.getItemModel(S);D=C.get("x"),M=C.get("y")}x[m++]=D,x[m++]=M}),s.setLayout("points",x),this._updateAfterLayout(e,t,r)}},_updatePositionTexture:function(){var e=this._forceLayoutInstance.getNodePositionTexture();this._pointsBuilder.setPositionTexture(e),this._forceEdgesMesh.material.set("positionTex",e)},startLayout:function(e,t,a,i){if(!(i&&i.from!=null&&i.from!==this.uid)){var n=this.viewGL,a=this._api,o=this._forceLayoutInstance,s=this._model.getData(),l=this._model.getModel("forceAtlas2");if(o&&(this.groupGL.remove(this._edgesMesh),this.groupGL.add(this._forceEdgesMesh),!!this._forceLayoutInstance)){this._updateForceNodesGeometry(e.getData()),this._pointsBuilder.hideLabels();var h=this,u=this._layoutId=f0++,f=l.getShallow("maxSteps"),d=l.getShallow("steps"),c=0,v=Math.max(d*2,20),p=function(g){if(g===h._layoutId){if(o.isFinished(f)){a.dispatchAction({type:"graphGLStopLayout",from:h.uid}),a.dispatchAction({type:"graphGLFinishLayout",points:s.getLayout("points"),from:h.uid});return}o.update(n.layer.renderer,d,function(){h._updatePositionTexture(),c+=d,c>=v&&(h._syncNodePosition(e),c=0),a.getZr().refresh(),es(function(){p(g)})})}};es(function(){h._forceLayoutInstanceToDispose&&(h._forceLayoutInstanceToDispose.dispose(n.layer.renderer),h._forceLayoutInstanceToDispose=null),p(u)}),this._layouting=!0}}},stopLayout:function(e,t,r,i){i&&i.from!=null&&i.from!==this.uid||(this._layoutId=0,this.groupGL.remove(this._forceEdgesMesh),this.groupGL.add(this._edgesMesh),this._forceLayoutInstance&&this.viewGL.layer&&(i&&i.beforeLayout||(this._syncNodePosition(e),this._updateAfterLayout(e,t,r)),this._api.getZr().refresh(),this._layouting=!1))},_syncNodePosition:function(e){var t=this._forceLayoutInstance.getNodePosition(this.viewGL.layer.renderer);e.getData().setLayout("points",t),e.setNodePosition(t)},_updateAfterLayout:function(e,t,r){this._updateMeshLinesGeometry(),this._pointsBuilder.removePositionTexture(),this._pointsBuilder.updateLayout(e,t,r),this._pointsBuilder.updateView(this.viewGL.camera),this._pointsBuilder.updateLabels(),this._pointsBuilder.showLabels()},focusNodeAdjacency:function(e,t,r,i){var n=this._model.getData();this._downplayAll();var a=i.dataIndex,o=n.graph,s=[],l=o.getNodeByIndex(a);s.push(l),l.edges.forEach(function(u){u.dataIndex<0||(u.node1!==l&&s.push(u.node1),u.node2!==l&&s.push(u.node2))},this),this._pointsBuilder.fadeOutAll(.05),this._fadeOutEdgesAll(.05),s.forEach(function(u){this._pointsBuilder.highlight(n,u.dataIndex)},this),this._pointsBuilder.updateLabels(s.map(function(u){return u.dataIndex}));var h=[];l.edges.forEach(function(u){u.dataIndex>=0&&(this._highlightEdge(u.dataIndex),h.push(u))},this),this._focusNodes=s,this._focusEdges=h},unfocusNodeAdjacency:function(e,t,r,i){this._downplayAll(),this._pointsBuilder.fadeInAll(),this._fadeInEdgesAll(),this._pointsBuilder.updateLabels()},_highlightEdge:function(e){var t=this._model.getEdgeData().getItemModel(e),r=b.parseColor(t.get("emphasis.lineStyle.color")||t.get("lineStyle.color")),i=xe.firstNotNull(t.get("emphasis.lineStyle.opacity"),t.get("lineStyle.opacity"),1);r[3]*=i,this._edgesMesh.geometry.setItemColor(this._edgeIndicesMap[e],r)},_downplayAll:function(){this._focusNodes&&this._focusNodes.forEach(function(e){this._pointsBuilder.downplay(this._model.getData(),e.dataIndex)},this),this._focusEdges&&this._focusEdges.forEach(function(e){this._downplayEdge(e.dataIndex)},this)},_downplayEdge:function(e){var t=this._getColor(e,[]);this._edgesMesh.geometry.setItemColor(this._edgeIndicesMap[e],t)},_setEdgeFade:function(){var e=[];return function(t,r){this._getColor(t,e),e[3]*=r,this._edgesMesh.geometry.setItemColor(this._edgeIndicesMap[t],e)}}(),_getColor:function(e,t){for(var r=0;r<4;r++)t[r]=this._originalEdgeColors[e*4+r];return t},_fadeOutEdgesAll:function(e){var t=this._model.getData().graph;t.eachEdge(function(r){this._setEdgeFade(r.dataIndex,e)},this)},_fadeInEdgesAll:function(){this._fadeOutEdgesAll(1)},_updateCamera:function(e,t){this.viewGL.setViewport(0,0,t.getWidth(),t.getHeight(),t.getDevicePixelRatio());for(var r=this.viewGL.camera,i=e.getData(),n=i.getLayout("points"),a=Pa.create(1/0,1/0),o=Pa.create(-1/0,-1/0),s=[],l=0;l<n.length;)s[0]=n[l++],s[1]=n[l++],Pa.min(a,a,s),Pa.max(o,o,s);var h=(o[1]+a[1])/2,u=(o[0]+a[0])/2;if(!(u>r.left&&u<r.right&&h<r.bottom&&h>r.top)){var f=Math.max(o[0]-a[0],10),d=f/t.getWidth()*t.getHeight();f*=1.4,d*=1.4,a[0]-=f*.2,r.left=a[0],r.top=h-d/2,r.bottom=h+d/2,r.right=f+a[0],r.near=0,r.far=100}},dispose:function(){var e=this.viewGL.layer.renderer;this._forceLayoutInstance&&this._forceLayoutInstance.dispose(e),this.groupGL.removeAll(),this._layoutId=-1,this._pointsBuilder.dispose()},remove:function(){this.groupGL.removeAll(),this._control.dispose()}});function Ra(e){return e instanceof Array||(e=[e,e]),e}function d0(e){e.registerChartView(c0),e.registerSeriesModel(a0),e.registerVisual(function(r){const i={};r.eachSeriesByType("graphGL",function(n){var a=n.getCategoriesData(),o=n.getData(),s={};a.each(function(l){var h=a.getName(l);s["ec-"+h]=l;var u=a.getItemModel(l),f=u.getModel("itemStyle").getItemStyle();f.fill||(f.fill=n.getColorFromPalette(h,i)),a.setItemVisual(l,"style",f);var d=["symbol","symbolSize","symbolKeepAspect"];for(let v=0;v<d.length;v++){var c=u.getShallow(d[v],!0);c!=null&&a.setItemVisual(l,d[v],c)}}),a.count()&&o.each(function(l){var h=o.getItemModel(l);let u=h.getShallow("category");if(u!=null){typeof u=="string"&&(u=s["ec-"+u]);var f=a.getItemVisual(u,"style"),d=o.ensureUniqueItemVisual(l,"style");ll(d,f);var c=["symbol","symbolSize","symbolKeepAspect"];for(let v=0;v<c.length;v++)o.setItemVisual(l,c[v],a.getItemVisual(u,c[v]))}})})}),e.registerVisual(function(r){r.eachSeriesByType("graphGL",function(i){var n=i.getGraph(),a=i.getEdgeData(),o=Ra(i.get("edgeSymbol")),s=Ra(i.get("edgeSymbolSize"));a.setVisual("drawType","stroke"),a.setVisual("fromSymbol",o&&o[0]),a.setVisual("toSymbol",o&&o[1]),a.setVisual("fromSymbolSize",s&&s[0]),a.setVisual("toSymbolSize",s&&s[1]),a.setVisual("style",i.getModel("lineStyle").getLineStyle()),a.each(function(l){var h=a.getItemModel(l),u=n.getEdgeByIndex(l),f=Ra(h.getShallow("symbol",!0)),d=Ra(h.getShallow("symbolSize",!0)),c=h.getModel("lineStyle").getLineStyle(),v=a.ensureUniqueItemVisual(l,"style");switch(ll(v,c),v.stroke){case"source":{var p=u.node1.getVisual("style");v.stroke=p&&p.fill;break}case"target":{var p=u.node2.getVisual("style");v.stroke=p&&p.fill;break}}f[0]&&u.setVisual("fromSymbol",f[0]),f[1]&&u.setVisual("toSymbol",f[1]),d[0]&&u.setVisual("fromSymbolSize",d[0]),d[1]&&u.setVisual("toSymbolSize",d[1])})})}),e.registerAction({type:"graphGLRoam",event:"graphglroam",update:"series.graphGL:roam"},function(r,i){i.eachComponent({mainType:"series",query:r},function(n){n.setView(r)})});function t(){}e.registerAction({type:"graphGLStartLayout",event:"graphgllayoutstarted",update:"series.graphGL:startLayout"},t),e.registerAction({type:"graphGLStopLayout",event:"graphgllayoutstopped",update:"series.graphGL:stopLayout"},t),e.registerAction({type:"graphGLFocusNodeAdjacency",event:"graphGLFocusNodeAdjacency",update:"series.graphGL:focusNodeAdjacency"},t),e.registerAction({type:"graphGLUnfocusNodeAdjacency",event:"graphGLUnfocusNodeAdjacency",update:"series.graphGL:unfocusNodeAdjacency"},t)}Ct(d0);const v0=Wt.extend({type:"series.flowGL",dependencies:["geo","grid","bmap"],visualStyleAccessPath:"itemStyle",getInitialData:function(e,t){var r=this.get("coordinateSystem"),i=r==="geo"?["lng","lat"]:Kh(r)||["x","y"];i.push("vx","vy");var n=hn(this.getSource(),{coordDimensions:i,encodeDefine:this.get("encode"),dimensionsDefine:this.get("dimensions")}),a=new fr(n,this);return a.initData(this.getSource()),a},defaultOption:{coordinateSystem:"cartesian2d",zlevel:10,supersampling:1,particleType:"point",particleDensity:128,particleSize:1,particleSpeed:1,particleTrail:2,colorTexture:null,gridWidth:"auto",gridHeight:"auto",itemStyle:{color:"#fff",opacity:.8}}});var p0=Pe.extend(function(){return{dynamic:!0,attributes:{position:new Pe.Attribute("position","float",3,"POSITION")}}},{resetOffset:function(){this._vertexOffset=0,this._faceOffset=0},setLineCount:function(e){var t=this.attributes,r=4*e,i=2*e;this.vertexCount!==r&&t.position.init(r),this.triangleCount!==i&&(i===0?this.indices=null:this.indices=this.vertexCount>65535?new Uint32Array(i*3):new Uint16Array(i*3))},addLine:function(e){var t=this._vertexOffset;this.attributes.position.set(t,[e[0],e[1],1]),this.attributes.position.set(t+1,[e[0],e[1],-1]),this.attributes.position.set(t+2,[e[0],e[1],2]),this.attributes.position.set(t+3,[e[0],e[1],-2]),this.setTriangleIndices(this._faceOffset++,[t,t+1,t+2]),this.setTriangleIndices(this._faceOffset++,[t+1,t+2,t+3]),this._vertexOffset+=4}});const m0=p0,g0=`@export ecgl.vfParticle.particle.fragment

uniform sampler2D particleTexture;
uniform sampler2D spawnTexture;
uniform sampler2D velocityTexture;

uniform float deltaTime;
uniform float elapsedTime;

uniform float speedScaling : 1.0;

uniform vec2 textureSize;
uniform vec4 region : [0, 0, 1, 1];
uniform float firstFrameTime;

varying vec2 v_Texcoord;


void main()
{
 vec4 p = texture2D(particleTexture, v_Texcoord);
 bool spawn = false;
 if (p.w <= 0.0) {
 p = texture2D(spawnTexture, fract(v_Texcoord + elapsedTime / 10.0));
 p.w -= firstFrameTime;
 spawn = true;
 }
 vec2 v = texture2D(velocityTexture, fract(p.xy * region.zw + region.xy)).xy;
 v = (v - 0.5) * 2.0;
 p.z = length(v);
 p.xy += v * deltaTime / 10.0 * speedScaling;
 p.w -= deltaTime;

 if (spawn || p.xy != fract(p.xy)) {
 p.z = 0.0;
 }
 p.xy = fract(p.xy);

 gl_FragColor = p;
}
@end

@export ecgl.vfParticle.renderPoints.vertex

#define PI 3.1415926

attribute vec2 texcoord : TEXCOORD_0;

uniform sampler2D particleTexture;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

uniform float size : 1.0;

varying float v_Mag;
varying vec2 v_Uv;

void main()
{
 vec4 p = texture2D(particleTexture, texcoord);

 if (p.w > 0.0 && p.z > 1e-5) {
 gl_Position = worldViewProjection * vec4(p.xy * 2.0 - 1.0, 0.0, 1.0);
 }
 else {
 gl_Position = vec4(100000.0, 100000.0, 100000.0, 1.0);
 }

 v_Mag = p.z;
 v_Uv = p.xy;

 gl_PointSize = size;
}

@end

@export ecgl.vfParticle.renderPoints.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
uniform sampler2D gradientTexture;
uniform sampler2D colorTexture;
uniform sampler2D spriteTexture;

varying float v_Mag;
varying vec2 v_Uv;

void main()
{
 gl_FragColor = color;
#ifdef SPRITETEXTURE_ENABLED
 gl_FragColor *= texture2D(spriteTexture, gl_PointCoord);
 if (color.a == 0.0) {
 discard;
 }
#endif
#ifdef GRADIENTTEXTURE_ENABLED
 gl_FragColor *= texture2D(gradientTexture, vec2(v_Mag, 0.5));
#endif
#ifdef COLORTEXTURE_ENABLED
 gl_FragColor *= texture2D(colorTexture, v_Uv);
#endif
}

@end

@export ecgl.vfParticle.renderLines.vertex

#define PI 3.1415926

attribute vec3 position : POSITION;

uniform sampler2D particleTexture;
uniform sampler2D prevParticleTexture;

uniform float size : 1.0;
uniform vec4 vp: VIEWPORT;
uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;

varying float v_Mag;
varying vec2 v_Uv;

@import clay.util.rand

void main()
{
 vec4 p = texture2D(particleTexture, position.xy);
 vec4 p2 = texture2D(prevParticleTexture, position.xy);

 p.xy = p.xy * 2.0 - 1.0;
 p2.xy = p2.xy * 2.0 - 1.0;

 if (p.w > 0.0 && p.z > 1e-5) {
 vec2 dir = normalize(p.xy - p2.xy);
 vec2 norm = vec2(dir.y / vp.z, -dir.x / vp.w) * sign(position.z) * size;
 if (abs(position.z) == 2.0) {
 gl_Position = vec4(p.xy + norm, 0.0, 1.0);
 v_Uv = p.xy;
 v_Mag = p.z;
 }
 else {
 gl_Position = vec4(p2.xy + norm, 0.0, 1.0);
 v_Mag = p2.z;
 v_Uv = p2.xy;
 }
 gl_Position = worldViewProjection * gl_Position;
 }
 else {
 gl_Position = vec4(100000.0, 100000.0, 100000.0, 1.0);
 }
}

@end

@export ecgl.vfParticle.renderLines.fragment

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
uniform sampler2D gradientTexture;
uniform sampler2D colorTexture;

varying float v_Mag;
varying vec2 v_Uv;

void main()
{
 gl_FragColor = color;
 #ifdef GRADIENTTEXTURE_ENABLED
 gl_FragColor *= texture2D(gradientTexture, vec2(v_Mag, 0.5));
#endif
#ifdef COLORTEXTURE_ENABLED
 gl_FragColor *= texture2D(colorTexture, v_Uv);
#endif
}

@end
`;G.import(g0);function _0(e){var t=document.createElement("canvas");t.width=t.height=e;var r=t.getContext("2d");return r.fillStyle="#fff",r.arc(e/2,e/2,e/2,0,Math.PI*2),r.fill(),t}var ms=function(){this.motionBlurFactor=.99,this.vectorFieldTexture=new ge({type:ne.FLOAT,flipY:!1}),this.particleLife=[5,20],this._particleType="point",this._particleSize=1,this.particleColor=[1,1,1,1],this.particleSpeedScaling=1,this._thisFrameTexture=null,this._particlePass=null,this._spawnTexture=null,this._particleTexture0=null,this._particleTexture1=null,this._particlePointsMesh=null,this._surfaceFrameBuffer=null,this._elapsedTime=0,this._scene=null,this._camera=null,this._lastFrameTexture=null,this._supersampling=1,this._downsampleTextures=[],this._width=512,this._height=512,this.init()};ms.prototype={constructor:ms,init:function(){var e={type:ne.FLOAT,minFilter:ne.NEAREST,magFilter:ne.NEAREST,useMipmap:!1};this._spawnTexture=new ge(e),this._particleTexture0=new ge(e),this._particleTexture1=new ge(e),this._frameBuffer=new At({depthBuffer:!1}),this._particlePass=new ct({fragment:G.source("ecgl.vfParticle.particle.fragment")}),this._particlePass.setUniform("velocityTexture",this.vectorFieldTexture),this._particlePass.setUniform("spawnTexture",this._spawnTexture),this._downsamplePass=new ct({fragment:G.source("clay.compositor.downsample")});var t=new wi({renderOrder:10,material:new tr({shader:new G(G.source("ecgl.vfParticle.renderPoints.vertex"),G.source("ecgl.vfParticle.renderPoints.fragment"))}),mode:wi.POINTS,geometry:new Pe({dynamic:!0,mainAttribute:"texcoord0"})}),r=new wi({renderOrder:10,material:new tr({shader:new G(G.source("ecgl.vfParticle.renderLines.vertex"),G.source("ecgl.vfParticle.renderLines.fragment"))}),geometry:new m0,culling:!1}),i=new wi({material:new tr({shader:new G(G.source("ecgl.color.vertex"),G.source("ecgl.color.fragment"))}),geometry:new io});i.material.enableTexture("diffuseMap"),this._particlePointsMesh=t,this._particleLinesMesh=r,this._lastFrameFullQuadMesh=i,this._camera=new rn,this._thisFrameTexture=new ge,this._lastFrameTexture=new ge},setParticleDensity:function(e,t){for(var r=e*t,i=new Float32Array(r*4),n=0,a=this.particleLife,o=0;o<e;o++)for(var s=0;s<t;s++,n++){i[n*4]=Math.random(),i[n*4+1]=Math.random(),i[n*4+2]=Math.random();var l=(a[1]-a[0])*Math.random()+a[0];i[n*4+3]=l}this._particleType==="line"?this._setLineGeometry(e,t):this._setPointsGeometry(e,t),this._spawnTexture.width=e,this._spawnTexture.height=t,this._spawnTexture.pixels=i,this._particleTexture0.width=this._particleTexture1.width=e,this._particleTexture0.height=this._particleTexture1.height=t,this._particlePass.setUniform("textureSize",[e,t])},_setPointsGeometry:function(e,t){var r=e*t,i=this._particlePointsMesh.geometry,n=i.attributes;n.texcoord0.init(r);for(var a=0,o=0;o<e;o++)for(var s=0;s<t;s++,a++)n.texcoord0.value[a*2]=o/e,n.texcoord0.value[a*2+1]=s/t;i.dirty()},_setLineGeometry:function(e,t){var r=e*t,i=this._getParticleMesh().geometry;i.setLineCount(r),i.resetOffset();for(var n=0;n<e;n++)for(var a=0;a<t;a++)i.addLine([n/e,a/t]);i.dirty()},_getParticleMesh:function(){return this._particleType==="line"?this._particleLinesMesh:this._particlePointsMesh},update:function(e,t,r,i){var n=this._getParticleMesh(),a=this._frameBuffer,o=this._particlePass;i&&this._updateDownsampleTextures(e,t),n.material.set("size",this._particleSize*this._supersampling),n.material.set("color",this.particleColor),o.setUniform("speedScaling",this.particleSpeedScaling),a.attach(this._particleTexture1),o.setUniform("firstFrameTime",i?(this.particleLife[1]+this.particleLife[0])/2:0),o.setUniform("particleTexture",this._particleTexture0),o.setUniform("deltaTime",r),o.setUniform("elapsedTime",this._elapsedTime),o.render(e,a),n.material.set("particleTexture",this._particleTexture1),n.material.set("prevParticleTexture",this._particleTexture0),a.attach(this._thisFrameTexture),a.bind(e),e.gl.clear(e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT);var s=this._lastFrameFullQuadMesh;s.material.set("diffuseMap",this._lastFrameTexture),s.material.set("color",[1,1,1,this.motionBlurFactor]),this._camera.update(!0),e.renderPass([s,n],this._camera),a.unbind(e),this._downsample(e),this._swapTexture(),this._elapsedTime+=r},_downsample:function(e){var t=this._downsampleTextures;if(t.length!==0)for(var r=0,i=this._thisFrameTexture,n=t[r];n;)this._frameBuffer.attach(n),this._downsamplePass.setUniform("texture",i),this._downsamplePass.setUniform("textureSize",[i.width,i.height]),this._downsamplePass.render(e,this._frameBuffer),i=n,n=t[++r]},getSurfaceTexture:function(){var e=this._downsampleTextures;return e.length>0?e[e.length-1]:this._lastFrameTexture},setRegion:function(e){this._particlePass.setUniform("region",e)},resize:function(e,t){this._lastFrameTexture.width=e*this._supersampling,this._lastFrameTexture.height=t*this._supersampling,this._thisFrameTexture.width=e*this._supersampling,this._thisFrameTexture.height=t*this._supersampling,this._width=e,this._height=t},setParticleSize:function(e){var t=this._getParticleMesh();if(e<=2){t.material.disableTexture("spriteTexture"),t.material.transparent=!1;return}this._spriteTexture||(this._spriteTexture=new ge),(!this._spriteTexture.image||this._spriteTexture.image.width!==e)&&(this._spriteTexture.image=_0(e),this._spriteTexture.dirty()),t.material.transparent=!0,t.material.enableTexture("spriteTexture"),t.material.set("spriteTexture",this._spriteTexture),this._particleSize=e},setGradientTexture:function(e){var t=this._getParticleMesh().material;t[e?"enableTexture":"disableTexture"]("gradientTexture"),t.setUniform("gradientTexture",e)},setColorTextureImage:function(e,t){var r=this._getParticleMesh().material;r.setTextureImage("colorTexture",e,t,{flipY:!0})},setParticleType:function(e){this._particleType=e},clearFrame:function(e){var t=this._frameBuffer;t.attach(this._lastFrameTexture),t.bind(e),e.gl.clear(e.gl.DEPTH_BUFFER_BIT|e.gl.COLOR_BUFFER_BIT),t.unbind(e)},setSupersampling:function(e){this._supersampling=e,this.resize(this._width,this._height)},_updateDownsampleTextures:function(e,t){for(var r=this._downsampleTextures,i=Math.max(Math.floor(Math.log(this._supersampling/t.getDevicePixelRatio())/Math.log(2)),0),n=2,a=this._width*this._supersampling,o=this._height*this._supersampling,s=0;s<i;s++)r[s]=r[s]||new ge,r[s].width=a/n,r[s].height=o/n,n*=2;for(;s<r.length;s++)r[s].dispose(e);r.length=i},_swapTexture:function(){var e=this._particleTexture0;this._particleTexture0=this._particleTexture1,this._particleTexture1=e;var e=this._thisFrameTexture;this._thisFrameTexture=this._lastFrameTexture,this._lastFrameTexture=e},dispose:function(e){e.disposeFrameBuffer(this._frameBuffer),e.disposeTexture(this.vectorFieldTexture),e.disposeTexture(this._spawnTexture),e.disposeTexture(this._particleTexture0),e.disposeTexture(this._particleTexture1),e.disposeTexture(this._thisFrameTexture),e.disposeTexture(this._lastFrameTexture),e.disposeGeometry(this._particleLinesMesh.geometry),e.disposeGeometry(this._particlePointsMesh.geometry),e.disposeGeometry(this._lastFrameFullQuadMesh.geometry),this._spriteTexture&&e.disposeTexture(this._spriteTexture),this._particlePass.dispose(e),this._downsamplePass.dispose(e),this._downsampleTextures.forEach(function(t){t.dispose(e)})}};const y0=ms,x0=Xt.extend({type:"flowGL",__ecgl__:!0,init:function(e,t){this.viewGL=new Fe("orthographic"),this.groupGL=new b.Node,this.viewGL.add(this.groupGL),this._particleSurface=new y0;var r=new b.Mesh({geometry:new b.PlaneGeometry,material:new b.Material({shader:new b.Shader({vertex:b.Shader.source("ecgl.color.vertex"),fragment:b.Shader.source("ecgl.color.fragment")}),transparent:!0})});r.material.enableTexture("diffuseMap"),this.groupGL.add(r),this._planeMesh=r},render:function(e,t,r){var i=this._particleSurface;i.setParticleType(e.get("particleType")),i.setSupersampling(e.get("supersampling")),this._updateData(e,r),this._updateCamera(r.getWidth(),r.getHeight(),r.getDevicePixelRatio());var n=xe.firstNotNull(e.get("particleDensity"),128);i.setParticleDensity(n,n);var a=this._planeMesh,o=+new Date,s=this,l=!0;a.__percent=0,a.stopAnimation(),a.animate("",{loop:!0}).when(1e5,{__percent:1}).during(function(){var f=+new Date,d=Math.min(f-o,20);o=o+d,s._renderer&&(i.update(s._renderer,r,d/1e3,l),a.material.set("diffuseMap",i.getSurfaceTexture())),l=!1}).start();var h=e.getModel("itemStyle"),u=b.parseColor(h.get("color"));u[3]*=xe.firstNotNull(h.get("opacity"),1),a.material.set("color",u),i.setColorTextureImage(e.get("colorTexture"),r),i.setParticleSize(e.get("particleSize")),i.particleSpeedScaling=e.get("particleSpeed"),i.motionBlurFactor=1-Math.pow(.1,e.get("particleTrail"))},updateTransform:function(e,t,r){this._updateData(e,r)},afterRender:function(e,t,r,i){var n=i.renderer;this._renderer=n},_updateData:function(e,t){var r=e.coordinateSystem,i=r.dimensions.map(function(_){return e.coordDimToDataDim(_)[0]}),n=e.getData(),a=n.getDataExtent(i[0]),o=n.getDataExtent(i[1]),s=e.get("gridWidth"),l=e.get("gridHeight");if(s==null||s==="auto"){var h=(a[1]-a[0])/(o[1]-o[0]);s=Math.round(Math.sqrt(h*n.count()))}(l==null||l==="auto")&&(l=Math.ceil(n.count()/s));var u=this._particleSurface.vectorFieldTexture,f=u.pixels;if(!f||f.length!==l*s*4)f=u.pixels=new Float32Array(s*l*4);else for(var d=0;d<f.length;d++)f[d]=0;var c=0,v=1/0,p=new Float32Array(n.count()*2),g=0,m=[[1/0,1/0],[-1/0,-1/0]];n.each([i[0],i[1],"vx","vy"],function(_,x,y,T){var w=r.dataToPoint([_,x]);p[g++]=w[0],p[g++]=w[1],m[0][0]=Math.min(w[0],m[0][0]),m[0][1]=Math.min(w[1],m[0][1]),m[1][0]=Math.max(w[0],m[1][0]),m[1][1]=Math.max(w[1],m[1][1]);var E=Math.sqrt(y*y+T*T);c=Math.max(c,E),v=Math.min(v,E)}),n.each(["vx","vy"],function(_,x,y){var T=Math.round((p[y*2]-m[0][0])/(m[1][0]-m[0][0])*(s-1)),w=l-1-Math.round((p[y*2+1]-m[0][1])/(m[1][1]-m[0][1])*(l-1)),E=(w*s+T)*4;f[E]=_/c*.5+.5,f[E+1]=x/c*.5+.5,f[E+3]=1}),u.width=s,u.height=l,e.get("coordinateSystem")==="bmap"&&this._fillEmptyPixels(u),u.dirty(),this._updatePlanePosition(m[0],m[1],e,t),this._updateGradientTexture(n.getVisual("visualMeta"),[v,c])},_fillEmptyPixels:function(e){var t=e.pixels,r=e.width,i=e.height;function n(p,g,m){p=Math.max(Math.min(p,r-1),0),g=Math.max(Math.min(g,i-1),0);var _=(g*(r-1)+p)*4;return t[_+3]===0?!1:(m[0]=t[_],m[1]=t[_+1],!0)}function a(p,g,m){m[0]=p[0]+g[0],m[1]=p[1]+g[1]}for(var o=[],s=[],l=[],h=[],u=[],f=0,d=0;d<i;d++)for(var c=0;c<r;c++){var v=(d*(r-1)+c)*4;t[v+3]===0&&(f=o[0]=o[1]=0,n(c-1,d,s)&&(f++,a(s,o,o)),n(c+1,d,l)&&(f++,a(l,o,o)),n(c,d-1,h)&&(f++,a(h,o,o)),n(c,d+1,u)&&(f++,a(u,o,o)),o[0]/=f,o[1]/=f,t[v]=o[0],t[v+1]=o[1]),t[v+3]=1}},_updateGradientTexture:function(e,t){if(!e||!e.length){this._particleSurface.setGradientTexture(null);return}this._gradientTexture=this._gradientTexture||new b.Texture2D({image:document.createElement("canvas")});var r=this._gradientTexture,i=r.image;i.width=200,i.height=1;var n=i.getContext("2d"),a=n.createLinearGradient(0,.5,i.width,.5);e[0].stops.forEach(function(o){var s;t[1]===t[0]?s=0:(s=o.value/t[1],s=Math.min(Math.max(s,0),1)),a.addColorStop(s,o.color)}),n.fillStyle=a,n.fillRect(0,0,i.width,i.height),r.dirty(),this._particleSurface.setGradientTexture(this._gradientTexture)},_updatePlanePosition:function(e,t,r,i){var n=this._limitInViewportAndFullFill(e,t,r,i);e=n.leftTop,t=n.rightBottom,this._particleSurface.setRegion(n.region),this._planeMesh.position.set((e[0]+t[0])/2,i.getHeight()-(e[1]+t[1])/2,0);var a=t[0]-e[0],o=t[1]-e[1];this._planeMesh.scale.set(a/2,o/2,1),this._particleSurface.resize(Math.max(Math.min(a,2048),1),Math.max(Math.min(o,2048),1)),this._renderer&&this._particleSurface.clearFrame(this._renderer)},_limitInViewportAndFullFill:function(e,t,r,i){var n=[Math.max(e[0],0),Math.max(e[1],0)],a=[Math.min(t[0],i.getWidth()),Math.min(t[1],i.getHeight())];if(r.get("coordinateSystem")==="bmap"){var o=r.getData().getDataExtent(r.coordDimToDataDim("lng")[0]),s=Math.floor(o[1]-o[0])>=359;s&&(n[0]>0&&(n[0]=0),a[0]<i.getWidth()&&(a[0]=i.getWidth()))}var l=t[0]-e[0],h=t[1]-e[1],u=a[0]-n[0],f=a[1]-n[1],d=[(n[0]-e[0])/l,1-f/h-(n[1]-e[1])/h,u/l,f/h];return{leftTop:n,rightBottom:a,region:d}},_updateCamera:function(e,t,r){this.viewGL.setViewport(0,0,e,t,r);var i=this.viewGL.camera;i.left=i.bottom=0,i.top=t,i.right=e,i.near=0,i.far=100,i.position.z=10},remove:function(){this._planeMesh.stopAnimation(),this.groupGL.removeAll()},dispose:function(){this._renderer&&this._particleSurface.dispose(this._renderer),this.groupGL.removeAll()}});function T0(e){e.registerChartView(x0),e.registerSeriesModel(v0)}Ct(T0);var gs=Wt.extend({type:"series.linesGL",dependencies:["grid","geo"],visualStyleAccessPath:"lineStyle",visualDrawType:"stroke",streamEnabled:!0,init:function(e){var t=this._processFlatCoordsArray(e.data);this._flatCoords=t.flatCoords,this._flatCoordsOffset=t.flatCoordsOffset,t.flatCoords&&(e.data=new Float32Array(t.count)),gs.superApply(this,"init",arguments)},mergeOption:function(e){var t=this._processFlatCoordsArray(e.data);this._flatCoords=t.flatCoords,this._flatCoordsOffset=t.flatCoordsOffset,t.flatCoords&&(e.data=new Float32Array(t.count)),gs.superApply(this,"mergeOption",arguments)},appendData:function(e){var t=this._processFlatCoordsArray(e.data);t.flatCoords&&(this._flatCoords?(this._flatCoords=hl(this._flatCoords,t.flatCoords),this._flatCoordsOffset=hl(this._flatCoordsOffset,t.flatCoordsOffset)):(this._flatCoords=t.flatCoords,this._flatCoordsOffset=t.flatCoordsOffset),e.data=new Float32Array(t.count)),this.getRawData().appendData(e.data)},_getCoordsFromItemModel:function(e){var t=this.getData().getItemModel(e),r=t.option instanceof Array?t.option:t.getShallow("coords");return r},getLineCoordsCount:function(e){return this._flatCoordsOffset?this._flatCoordsOffset[e*2+1]:this._getCoordsFromItemModel(e).length},getLineCoords:function(e,t){if(this._flatCoordsOffset){for(var r=this._flatCoordsOffset[e*2],i=this._flatCoordsOffset[e*2+1],n=0;n<i;n++)t[n]=t[n]||[],t[n][0]=this._flatCoords[r+n*2],t[n][1]=this._flatCoords[r+n*2+1];return i}else{for(var a=this._getCoordsFromItemModel(e),n=0;n<a.length;n++)t[n]=t[n]||[],t[n][0]=a[n][0],t[n][1]=a[n][1];return a.length}},_processFlatCoordsArray:function(e){var t=0;if(this._flatCoords&&(t=this._flatCoords.length),typeof e[0]=="number"){for(var r=e.length,i=new Uint32Array(r),n=new Float64Array(r),a=0,o=0,s=0,l=0;l<r;){s++;var h=e[l++];i[o++]=a+t,i[o++]=h;for(var u=0;u<h;u++){var f=e[l++],d=e[l++];n[a++]=f,n[a++]=d}}return{flatCoordsOffset:new Uint32Array(i.buffer,0,o),flatCoords:n,count:s}}return{flatCoordsOffset:null,flatCoords:null,count:e.length}},getInitialData:function(e,t){var r=new fr(["value"],this);return r.hasItemOption=!1,r.initData(e.data,[],function(i,n,a,o){if(i instanceof Array)return NaN;r.hasItemOption=!0;var s=i.value;if(s!=null)return s instanceof Array?s[o]:s}),r},defaultOption:{coordinateSystem:"geo",zlevel:10,progressive:1e4,progressiveThreshold:5e4,blendMode:"source-over",lineStyle:{opacity:.8},postEffect:{enable:!1,colorCorrection:{exposure:0,brightness:0,contrast:1,saturation:1,enable:!0}}}});const w0=gs,b0=Xt.extend({type:"linesGL",__ecgl__:!0,init:function(e,t){this.groupGL=new b.Node,this.viewGL=new Fe("orthographic"),this.viewGL.add(this.groupGL),this._glViewHelper=new Fr(this.viewGL),this._nativeLinesShader=b.createShader("ecgl.lines3D"),this._meshLinesShader=b.createShader("ecgl.meshLines3D"),this._linesMeshes=[],this._currentStep=0},render:function(e,t,r){this.groupGL.removeAll(),this._glViewHelper.reset(e,r);var i=this._linesMeshes[0];i||(i=this._linesMeshes[0]=this._createLinesMesh(e)),this._linesMeshes.length=1,this.groupGL.add(i),this._updateLinesMesh(e,i,0,e.getData().count()),this.viewGL.setPostEffect(e.getModel("postEffect"),r)},incrementalPrepareRender:function(e,t,r){this.groupGL.removeAll(),this._glViewHelper.reset(e,r),this._currentStep=0,this.viewGL.setPostEffect(e.getModel("postEffect"),r)},incrementalRender:function(e,t,r,i){var n=this._linesMeshes[this._currentStep];n||(n=this._createLinesMesh(t),this._linesMeshes[this._currentStep]=n),this._updateLinesMesh(t,n,e.start,e.end),this.groupGL.add(n),i.getZr().refresh(),this._currentStep++},updateTransform:function(e,t,r){e.coordinateSystem.getRoamTransform&&this._glViewHelper.updateTransform(e,r)},_createLinesMesh:function(e){var t=new b.Mesh({$ignorePicking:!0,material:new b.Material({shader:b.createShader("ecgl.lines3D"),transparent:!0,depthMask:!1,depthTest:!1}),geometry:new mf({segmentScale:10,useNativeLine:!0,dynamic:!1}),mode:b.Mesh.LINES,culling:!1});return t},_updateLinesMesh:function(e,t,r,i){var n=e.getData();t.material.blend=e.get("blendMode")==="lighter"?b.additiveBlend:null;var a=e.get("lineStyle.curveness")||0,o=e.get("polyline"),s=t.geometry,l=e.coordinateSystem,h=xe.firstNotNull(e.get("lineStyle.width"),1);h>1?(t.material.shader!==this._meshLinesShader&&t.material.attachShader(this._meshLinesShader),t.mode=b.Mesh.TRIANGLES):(t.material.shader!==this._nativeLinesShader&&t.material.attachShader(this._nativeLinesShader),t.mode=b.Mesh.LINES),r=r||0,i=i||n.count(),s.resetOffset();var u=0,f=0,d=[],c=[],v=[],p=[],g=[],m=.3,_=.7;function x(){c[0]=d[0]*_+p[0]*m-(d[1]-p[1])*a,c[1]=d[1]*_+p[1]*m-(p[0]-d[0])*a,v[0]=d[0]*m+p[0]*_-(d[1]-p[1])*a,v[1]=d[1]*m+p[1]*_-(p[0]-d[0])*a}if(o||a!==0)for(var y=r;y<i;y++)if(o){var T=e.getLineCoordsCount(y);u+=s.getPolylineVertexCount(T),f+=s.getPolylineTriangleCount(T)}else e.getLineCoords(y,g),this._glViewHelper.dataToPoint(l,g[0],d),this._glViewHelper.dataToPoint(l,g[1],p),x(),u+=s.getCubicCurveVertexCount(d,c,v,p),f+=s.getCubicCurveTriangleCount(d,c,v,p);else{var w=i-r;u+=w*s.getLineVertexCount(),f+=w*s.getLineVertexCount()}s.setVertexCount(u),s.setTriangleCount(f);for(var E=r,S=[],y=r;y<i;y++){b.parseColor(wt(n,E),S);var D=xe.firstNotNull(Tt(n,E),1);S[3]*=D;for(var T=e.getLineCoords(y,g),M=0;M<T;M++)this._glViewHelper.dataToPoint(l,g[M],g[M]);o?s.addPolyline(g,S,h,0,T):a!==0?(d=g[0],p=g[1],x(),s.addCubicCurve(d,c,v,p,S,h)):s.addPolyline(g,S,h,0,2),E++}},dispose:function(){this.groupGL.removeAll()},remove:function(){this.groupGL.removeAll()}});function S0(e){e.registerChartView(b0),e.registerSeriesModel(w0)}Ct(S0);function E0(e){let t,r,i,n,a,o,s=(e[0]||"未选择")+"",l,h,u,f,d='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path></svg>',c,v,p,g,m,_,x,y,T,w,E;p=new Pi({props:{isLoading:e[2]}});function S(M){e[10](M)}let D={multiple:!1,knowledgeBases:e[3],title:"选择知识集",selectedKnowledgeBases:e[3].filter(e[9])};return e[4]!==void 0&&(D.visible=e[4]),x=new cc({props:D}),oi.push(()=>Af(x,"visible",S)),x.$on("confirm",e[5]),x.$on("cancel",e[11]),{c(){t=X("div"),r=X("div"),i=X("h2"),n=rl("svg"),a=rl("path"),o=he(),l=pr(s),h=pr("知识点"),u=he(),f=X("button"),f.innerHTML=d,c=he(),v=X("div"),it(p.$$.fragment),g=he(),m=X("div"),_=he(),it(x.$$.fragment),this.h()},l(M){t=j(M,"DIV",{class:!0});var C=ee(t);r=j(C,"DIV",{class:!0});var N=ee(r);i=j(N,"H2",{class:!0});var O=ee(i);n=il(O,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0,stroke:!0});var P=ee(n);a=il(P,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),ee(a).forEach(U),P.forEach(U),o=ue(O),l=mr(O,s),h=mr(O,"知识点"),O.forEach(U),u=ue(N),f=j(N,"BUTTON",{class:!0,"data-svelte-h":!0}),tt(f)!=="svelte-3tm8se"&&(f.innerHTML=d),N.forEach(U),c=ue(C),v=j(C,"DIV",{class:!0});var F=ee(v);nt(p.$$.fragment,F),g=ue(F),m=j(F,"DIV",{class:!0}),ee(m).forEach(U),F.forEach(U),C.forEach(U),_=ue(M),nt(x.$$.fragment,M),this.h()},h(){B(a,"stroke-linecap","round"),B(a,"stroke-linejoin","round"),B(a,"stroke-width","2"),B(a,"d","M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"),B(n,"xmlns","http://www.w3.org/2000/svg"),B(n,"class","h-5 w-5 mr-2 text-purple-600"),B(n,"fill","none"),B(n,"viewBox","0 0 24 24"),B(n,"stroke","currentColor"),B(i,"class","text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center"),B(f,"class","p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"),B(r,"class","flex justify-between items-center mb-4"),B(m,"class","absolute inset-0 min-h-80"),B(v,"class","relative flex-1"),B(t,"class","flex flex-col h-full")},m(M,C){Oe(M,t,C),R(t,r),R(r,i),R(i,n),R(n,a),R(i,o),R(i,l),R(i,h),R(r,u),R(r,f),R(t,c),R(t,v),at(p,v,null),R(v,g),R(v,m),e[8](m),Oe(M,_,C),at(x,M,C),T=!0,w||(E=Rt(f,"click",e[7]),w=!0)},p(M,[C]){(!T||C&1)&&s!==(s=(M[0]||"未选择")+"")&&Lr(l,s);const N={};C&4&&(N.isLoading=M[2]),p.$set(N);const O={};C&8&&(O.knowledgeBases=M[3]),C&9&&(O.selectedKnowledgeBases=M[3].filter(M[9])),!y&&C&16&&(y=!0,O.visible=M[4],wf(()=>y=!1)),x.$set(O)},i(M){T||(Xe(p.$$.fragment,M),Xe(x.$$.fragment,M),T=!0)},o(M){je(p.$$.fragment,M),je(x.$$.fragment,M),T=!1},d(M){M&&(U(t),U(_)),ot(p),e[8](null),ot(x,M),w=!1,E()}}}const A0="#e2e8f0";function Ph(){return document.documentElement.classList.contains("dark")}function C0(e,t,r){const i=bf();let{chartsData:n=[]}=t,{scopeName:a=""}=t,o,s=null,l=!0,h=[],u=!1;const f=T=>T/2;async function d(){!o||!n||(await Ki(),s||(s=Di(o)),c())}function c(){if(!s||!n)return;const T=Ph()?A0:"#1e293b",w=Ph()?"rgba(255, 255, 255, 0.2)":"rgba(0, 0, 0, 0.2)";s.setOption({backgroundColor:"transparent",tooltip:{formatter:E=>{const S=E.data.text.split(`
`).filter(M=>M.trim()!=="");return S.length>0?E.name+"<br/>"+S.join("<br/>"):""}},xAxis3D:{type:"value",name:"X轴",axisLabel:{color:T},axisLine:{lineStyle:{color:w}}},yAxis3D:{type:"value",name:"Y轴",axisLabel:{color:T},axisLine:{lineStyle:{color:w}}},zAxis3D:{type:"value",name:"Z轴",axisLabel:{color:T},axisLine:{lineStyle:{color:w}}},grid3D:{boxWidth:100,boxDepth:100,boxHeight:100,axisLine:{lineStyle:{color:w}},axisPointer:{lineStyle:{color:T}},light:{main:{intensity:1.2,shadow:!0},ambient:{intensity:.3}},viewControl:{autoRotate:!0,autoRotateSpeed:10,rotateSensitivity:1}},series:[{type:"scatter3D",data:n,symbolSize:f,itemStyle:{opacity:.8},label:{show:!1,position:"top",formatter:"{b}",color:T,fontSize:12},emphasis:{itemStyle:{opacity:1},label:{show:!0}}}]}),r(2,l=!1)}async function v(T){const{selKnowledge:w}=T.detail;w.length===0||a===w[0].name||(r(0,a=w[0].name),r(2,l=!0),s==null||s.clear(),i("changeScope",{scopeName:a}))}ai(async()=>{try{r(3,h=JSON.parse(await dc(localStorage.token)));const T=window.matchMedia("(prefers-color-scheme: dark)");T.addEventListener("change",c);const w=new MutationObserver(c);return w.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",p),()=>{T.removeEventListener("change",c),w.disconnect(),window.removeEventListener("resize",p)}}catch(T){console.error("Failed to load knowledge data:",T)}}),Yn(()=>{s&&(s.dispose(),s=null)});function p(){s==null||s.resize()}const g=()=>r(4,u=!0);function m(T){oi[T?"unshift":"push"](()=>{o=T,r(1,o)})}const _=T=>T.name===a;function x(T){u=T,r(4,u)}const y=()=>r(4,u=!1);return e.$$set=T=>{"chartsData"in T&&r(6,n=T.chartsData),"scopeName"in T&&r(0,a=T.scopeName)},e.$$.update=()=>{e.$$.dirty&66&&n&&o&&d()},[a,o,l,h,u,v,n,g,m,_,x,y]}class gf extends Rr{constructor(t){super(),Nr(this,t,C0,E0,Pr,{chartsData:6,scopeName:0})}}yc({type:"series.wordCloud",visualStyleAccessPath:"textStyle",visualStyleMapper:function(e){return{fill:e.get("color")}},visualDrawType:"fill",optionUpdated:function(){var e=this.option;e.gridSize=Math.max(Math.floor(e.gridSize),4)},getInitialData:function(e,t){var r=hn(e.data,{coordDimensions:["value"]}),i=new fr(r,this);return i.initData(e.data),i},defaultOption:{maskImage:null,shape:"circle",keepAspect:!1,left:"center",top:"center",width:"70%",height:"80%",sizeRange:[12,60],rotationRange:[-90,90],rotationStep:45,gridSize:8,drawOutOfBound:!1,shrinkToFit:!1,textStyle:{fontWeight:"normal"}}});xc({type:"wordCloud",render:function(e,t,r){var i=this.group;i.removeAll();var n=e.getData(),a=e.get("gridSize");e.layoutInstance.ondraw=function(o,s,l,h){var u=n.getItemModel(l),f=u.getModel("textStyle"),d=new Fn({style:To(f),scaleX:1/h.info.mu,scaleY:1/h.info.mu,x:(h.gx+h.info.gw/2)*a,y:(h.gy+h.info.gh/2)*a,rotation:h.rot});d.setStyle({x:h.info.fillTextOffsetX,y:h.info.fillTextOffsetY+s*.5,text:o,verticalAlign:"middle",fill:n.getItemVisual(l,"style").fill,fontSize:s}),i.add(d),n.setItemGraphicEl(l,d),d.ensureState("emphasis").style=To(u.getModel(["emphasis","textStyle"]),{state:"emphasis"}),d.ensureState("blur").style=To(u.getModel(["blur","textStyle"]),{state:"blur"}),hc(d,u.get(["emphasis","focus"]),u.get(["emphasis","blurScope"])),d.stateTransition={duration:e.get("animation")?e.get(["stateAnimation","duration"]):0,easing:e.get(["stateAnimation","easing"])},d.__highDownDispatcher=!0},this._model=e},remove:function(){this.group.removeAll(),this._model.layoutInstance.dispose()},dispose:function(){this._model.layoutInstance.dispose()}});/*!
 * wordcloud2.js
 * http://timdream.org/wordcloud2.js/
 *
 * Copyright 2011 - 2019 Tim Guan-tin Chien and contributors.
 * Released under the MIT license
 */window.setImmediate||(window.setImmediate=function(){return window.msSetImmediate||window.webkitSetImmediate||window.mozSetImmediate||window.oSetImmediate||function(){if(!window.postMessage||!window.addEventListener)return null;var r=[void 0],i="zero-timeout-message",n=function(o){var s=r.length;return r.push(o),window.postMessage(i+s.toString(36),"*"),s};return window.addEventListener("message",function(o){if(!(typeof o.data!="string"||o.data.substr(0,i.length)!==i)){o.stopImmediatePropagation();var s=parseInt(o.data.substr(i.length),36);r[s]&&(r[s](),r[s]=void 0)}},!0),window.clearImmediate=function(o){r[o]&&(r[o]=void 0)},n}()||function(r){window.setTimeout(r,0)}}());window.clearImmediate||(window.clearImmediate=function(){return window.msClearImmediate||window.webkitClearImmediate||window.mozClearImmediate||window.oClearImmediate||function(r){window.clearTimeout(r)}}());var Ws=function(){var t=document.createElement("canvas");if(!t||!t.getContext)return!1;var r=t.getContext("2d");return!(!r||!r.getImageData||!r.fillText||!Array.prototype.some||!Array.prototype.push)}(),_s=function(){if(Ws){for(var t=document.createElement("canvas").getContext("2d"),r=20,i,n;r;){if(t.font=r.toString(10)+"px sans-serif",t.measureText("Ｗ").width===i&&t.measureText("m").width===n)return r+1;i=t.measureText("Ｗ").width,n=t.measureText("m").width,r--}return 0}}(),L0=function(e){if(Array.isArray(e)){var t=e.slice();return t.splice(0,2),t}else return[]},M0=function(t){for(var r,i,n=t.length;n;)r=Math.floor(Math.random()*n),i=t[--n],t[n]=t[r],t[r]=i;return t},ji={},uo=function(t,r){if(!Ws)return;var i=Math.floor(Math.random()*Date.now());Array.isArray(t)||(t=[t]),t.forEach(function(Q,L){if(typeof Q=="string"){if(t[L]=document.getElementById(Q),!t[L])throw new Error("The element id specified is not found.")}else if(!Q.tagName&&!Q.appendChild)throw new Error("You must pass valid HTML elements, or ID of the element.")});var n={list:[],fontFamily:'"Trebuchet MS", "Heiti TC", "微軟正黑體", "Arial Unicode MS", "Droid Fallback Sans", sans-serif',fontWeight:"normal",color:"random-dark",minSize:0,weightFactor:1,clearCanvas:!0,backgroundColor:"#fff",gridSize:8,drawOutOfBound:!1,shrinkToFit:!1,origin:null,drawMask:!1,maskColor:"rgba(255,0,0,0.3)",maskGapWidth:.3,layoutAnimation:!0,wait:0,abortThreshold:0,abort:function(){},minRotation:-Math.PI/2,maxRotation:Math.PI/2,rotationStep:.1,shuffle:!0,rotateRatio:.1,shape:"circle",ellipticity:.65,classes:null,hover:null,click:null};if(r)for(var a in r)a in n&&(n[a]=r[a]);if(typeof n.weightFactor!="function"){var o=n.weightFactor;n.weightFactor=function(L){return L*o}}if(typeof n.shape!="function")switch(n.shape){case"circle":default:n.shape="circle";break;case"cardioid":n.shape=function(L){return 1-Math.sin(L)};break;case"diamond":n.shape=function(L){var k=L%(2*Math.PI/4);return 1/(Math.cos(k)+Math.sin(k))};break;case"square":n.shape=function(L){return Math.min(1/Math.abs(Math.cos(L)),1/Math.abs(Math.sin(L)))};break;case"triangle-forward":n.shape=function(L){var k=L%(2*Math.PI/3);return 1/(Math.cos(k)+Math.sqrt(3)*Math.sin(k))};break;case"triangle":case"triangle-upright":n.shape=function(L){var k=(L+Math.PI*3/2)%(2*Math.PI/3);return 1/(Math.cos(k)+Math.sqrt(3)*Math.sin(k))};break;case"pentagon":n.shape=function(L){var k=(L+.955)%(2*Math.PI/5);return 1/(Math.cos(k)+.726543*Math.sin(k))};break;case"star":n.shape=function(L){var k=(L+.955)%(2*Math.PI/10);return(L+.955)%(2*Math.PI/5)-2*Math.PI/10>=0?1/(Math.cos(2*Math.PI/10-k)+3.07768*Math.sin(2*Math.PI/10-k)):1/(Math.cos(k)+3.07768*Math.sin(k))};break}n.gridSize=Math.max(Math.floor(n.gridSize),4);var s=n.gridSize,l=s-n.maskGapWidth,h=Math.abs(n.maxRotation-n.minRotation),u=Math.min(n.maxRotation,n.minRotation),f=n.rotationStep,d,c,v,p,g,m,_;function x(Q,L){return"hsl("+(Math.random()*360).toFixed()+","+(Math.random()*30+70).toFixed()+"%,"+(Math.random()*(L-Q)+Q).toFixed()+"%)"}switch(n.color){case"random-dark":_=function(){return x(10,50)};break;case"random-light":_=function(){return x(50,90)};break;default:typeof n.color=="function"&&(_=n.color);break}var y;typeof n.fontWeight=="function"&&(y=n.fontWeight);var T=null;typeof n.classes=="function"&&(T=n.classes);var w=!1,E=[],S,D=function(L){var k=L.currentTarget,V=k.getBoundingClientRect(),J,K;L.touches?(J=L.touches[0].clientX,K=L.touches[0].clientY):(J=L.clientX,K=L.clientY);var ie=J-V.left,pe=K-V.top,we=Math.floor(ie*(k.width/V.width||1)/s),te=Math.floor(pe*(k.height/V.height||1)/s);return E[we]?E[we][te]:null},M=function(L){var k=D(L);if(S!==k){if(S=k,!k){n.hover(void 0,void 0,L);return}n.hover(k.item,k.dimension,L)}},C=function(L){var k=D(L);k&&(n.click(k.item,k.dimension,L),L.preventDefault())},N=[],O=function(L){if(N[L])return N[L];var k=L*8,V=k,J=[];for(L===0&&J.push([p[0],p[1],0]);V--;){var K=1;n.shape!=="circle"&&(K=n.shape(V/k*2*Math.PI)),J.push([p[0]+L*K*Math.cos(-V/k*2*Math.PI),p[1]+L*K*Math.sin(-V/k*2*Math.PI)*n.ellipticity,V/k*2*Math.PI])}return N[L]=J,J},P=function(){return n.abortThreshold>0&&new Date().getTime()-m>n.abortThreshold},F=function(){return n.rotateRatio===0||Math.random()>n.rotateRatio?0:h===0?u:u+Math.round(Math.random()*h/f)*f},H=function(L,k,V,J){var K=n.weightFactor(k);if(K<=n.minSize)return!1;var ie=1;K<_s&&(ie=function(){for(var $t=2;$t*K<_s;)$t+=2;return $t}());var pe;y?pe=y(L,k,K,J):pe=n.fontWeight;var we=document.createElement("canvas"),te=we.getContext("2d",{willReadFrequently:!0});te.font=pe+" "+(K*ie).toString(10)+"px "+n.fontFamily;var Ne=te.measureText(L).width/ie,de=Math.max(K*ie,te.measureText("m").width,te.measureText("Ｗ").width)/ie,Ee=Ne+de*2,ze=de*3,Ke=Math.ceil(Ee/s),Mt=Math.ceil(ze/s);Ee=Ke*s,ze=Mt*s;var $e=-Ne/2,be=-de*.4,Ve=Math.ceil((Ee*Math.abs(Math.sin(V))+ze*Math.abs(Math.cos(V)))/s),Ge=Math.ceil((Ee*Math.abs(Math.cos(V))+ze*Math.abs(Math.sin(V)))/s),st=Ge*s,yr=Ve*s;we.setAttribute("width",st),we.setAttribute("height",yr),te.scale(1/ie,1/ie),te.translate(st*ie/2,yr*ie/2),te.rotate(-V),te.font=pe+" "+(K*ie).toString(10)+"px "+n.fontFamily,te.fillStyle="#000",te.textBaseline="middle",te.fillText(L,$e*ie,(be+K*.5)*ie);var Ur=te.getImageData(0,0,st,yr).data;if(P())return!1;for(var nr=[],ar=Ge,yt,Yt,Ht,Kt=[Ve/2,Ge/2,Ve/2,Ge/2];ar--;)for(yt=Ve;yt--;){Ht=s;e:for(;Ht--;)for(Yt=s;Yt--;)if(Ur[((yt*s+Ht)*st+(ar*s+Yt))*4+3]){nr.push([ar,yt]),ar<Kt[3]&&(Kt[3]=ar),ar>Kt[1]&&(Kt[1]=ar),yt<Kt[0]&&(Kt[0]=yt),yt>Kt[2]&&(Kt[2]=yt);break e}}return{mu:ie,occupied:nr,bounds:Kt,gw:Ge,gh:Ve,fillTextOffsetX:$e,fillTextOffsetY:be,fillTextWidth:Ne,fillTextHeight:de,fontSize:K}},Y=function(L,k,V,J,K){for(var ie=K.length;ie--;){var pe=L+K[ie][0],we=k+K[ie][1];if(pe>=c||we>=v||pe<0||we<0){if(!n.drawOutOfBound)return!1;continue}if(!d[pe][we])return!1}return!0},z=function(L,k,V,J,K,ie,pe,we,te,Ne){var de=V.fontSize,Ee;_?Ee=_(J,K,de,ie,pe,Ne):Ee=n.color;var ze;y?ze=y(J,K,de,Ne):ze=n.fontWeight;var Ke;T?Ke=T(J,K,de,Ne):Ke=n.classes,t.forEach(function(Mt){if(Mt.getContext){var $e=Mt.getContext("2d"),be=V.mu;$e.save(),$e.scale(1/be,1/be),$e.font=ze+" "+(de*be).toString(10)+"px "+n.fontFamily,$e.fillStyle=Ee,$e.translate((L+V.gw/2)*s*be,(k+V.gh/2)*s*be),we!==0&&$e.rotate(-we),$e.textBaseline="middle",$e.fillText(J,V.fillTextOffsetX*be,(V.fillTextOffsetY+de*.5)*be),$e.restore()}else{var Ve=document.createElement("span"),Ge="";Ge="rotate("+-we/Math.PI*180+"deg) ",V.mu!==1&&(Ge+="translateX(-"+V.fillTextWidth/4+"px) scale("+1/V.mu+")");var st={position:"absolute",display:"block",font:ze+" "+de*V.mu+"px "+n.fontFamily,left:(L+V.gw/2)*s+V.fillTextOffsetX+"px",top:(k+V.gh/2)*s+V.fillTextOffsetY+"px",width:V.fillTextWidth+"px",height:V.fillTextHeight+"px",lineHeight:de+"px",whiteSpace:"nowrap",transform:Ge,webkitTransform:Ge,msTransform:Ge,transformOrigin:"50% 40%",webkitTransformOrigin:"50% 40%",msTransformOrigin:"50% 40%"};Ee&&(st.color=Ee),Ve.textContent=J;for(var yr in st)Ve.style[yr]=st[yr];if(te)for(var Ur in te)Ve.setAttribute(Ur,te[Ur]);Ke&&(Ve.className+=Ke),Mt.appendChild(Ve)}})},Te=function(L,k,V,J,K){if(!(L>=c||k>=v||L<0||k<0)){if(d[L][k]=!1,V){var ie=t[0].getContext("2d");ie.fillRect(L*s,k*s,l,l)}w&&(E[L][k]={item:K,dimension:J})}},q=function(L,k,V,J,K,ie){var pe=K.occupied,we=n.drawMask,te;we&&(te=t[0].getContext("2d"),te.save(),te.fillStyle=n.maskColor);var Ne;if(w){var de=K.bounds;Ne={x:(L+de[3])*s,y:(k+de[0])*s,w:(de[1]-de[3]+1)*s,h:(de[2]-de[0]+1)*s}}for(var Ee=pe.length;Ee--;){var ze=L+pe[Ee][0],Ke=k+pe[Ee][1];ze>=c||Ke>=v||ze<0||Ke<0||Te(ze,Ke,we,Ne,ie)}we&&te.restore()},De=function Q(L,k){if(k>20)return null;var V,J,K;Array.isArray(L)?(V=L[0],J=L[1]):(V=L.word,J=L.weight,K=L.attributes);var ie=F(),pe=L0(L),we=H(V,J,ie,pe);if(!we||P())return!1;if(!n.drawOutOfBound&&!n.shrinkToFit){var te=we.bounds;if(te[1]-te[3]+1>c||te[2]-te[0]+1>v)return!1}for(var Ne=g+1,de=function(Mt){var $e=Math.floor(Mt[0]-we.gw/2),be=Math.floor(Mt[1]-we.gh/2),Ve=we.gw,Ge=we.gh;return Y($e,be,Ve,Ge,we.occupied)?(z($e,be,we,V,J,g-Ne,Mt[2],ie,K,pe),q($e,be,Ve,Ge,we,L),{gx:$e,gy:be,rot:ie,info:we}):!1};Ne--;){var Ee=O(g-Ne);n.shuffle&&(Ee=[].concat(Ee),M0(Ee));for(var ze=0;ze<Ee.length;ze++){var Ke=de(Ee[ze]);if(Ke)return Ke}}return n.shrinkToFit?(Array.isArray(L)?L[1]=L[1]*3/4:L.weight=L.weight*3/4,Q(L,k+1)):null},ve=function(L,k,V){if(k)return!t.some(function(J){var K=new CustomEvent(L,{detail:V||{}});return!J.dispatchEvent(K)},this);t.forEach(function(J){var K=new CustomEvent(L,{detail:V||{}});J.dispatchEvent(K)},this)},oe=function(){var L=t[0];if(L.getContext)c=Math.ceil(L.width/s),v=Math.ceil(L.height/s);else{var k=L.getBoundingClientRect();c=Math.ceil(k.width/s),v=Math.ceil(k.height/s)}if(ve("wordcloudstart",!0)){p=n.origin?[n.origin[0]/s,n.origin[1]/s]:[c/2,v/2],g=Math.floor(Math.sqrt(c*c+v*v)),d=[];var V,J,K;if(!L.getContext||n.clearCanvas)for(t.forEach(function(be){if(be.getContext){var Ve=be.getContext("2d");Ve.fillStyle=n.backgroundColor,Ve.clearRect(0,0,c*(s+1),v*(s+1)),Ve.fillRect(0,0,c*(s+1),v*(s+1))}else be.textContent="",be.style.backgroundColor=n.backgroundColor,be.style.position="relative"}),V=c;V--;)for(d[V]=[],J=v;J--;)d[V][J]=!0;else{var ie=document.createElement("canvas").getContext("2d");ie.fillStyle=n.backgroundColor,ie.fillRect(0,0,1,1);var pe=ie.getImageData(0,0,1,1).data,we=L.getContext("2d").getImageData(0,0,c*s,v*s).data;V=c;for(var te,Ne;V--;)for(d[V]=[],J=v;J--;){Ne=s;e:for(;Ne--;)for(te=s;te--;)for(K=4;K--;)if(we[((J*s+Ne)*c*s+(V*s+te))*4+K]!==pe[K]){d[V][J]=!1;break e}d[V][J]!==!1&&(d[V][J]=!0)}we=ie=pe=void 0}if(n.hover||n.click){for(w=!0,V=c+1;V--;)E[V]=[];n.hover&&L.addEventListener("mousemove",M),n.click&&(L.addEventListener("click",C),L.addEventListener("touchstart",C),L.addEventListener("touchend",function(be){be.preventDefault()}),L.style.webkitTapHighlightColor="rgba(0, 0, 0, 0)"),L.addEventListener("wordcloudstart",function be(){L.removeEventListener("wordcloudstart",be),L.removeEventListener("mousemove",M),L.removeEventListener("click",C),S=void 0})}K=0;var de,Ee,ze=!0;n.layoutAnimation?n.wait!==0?(de=window.setTimeout,Ee=window.clearTimeout):(de=window.setImmediate,Ee=window.clearImmediate):(de=function(be){be()},Ee=function(){ze=!1});var Ke=function(Ve,Ge){t.forEach(function(st){st.addEventListener(Ve,Ge)},this)},Mt=function(Ve,Ge){t.forEach(function(st){st.removeEventListener(Ve,Ge)},this)},$e=function be(){Mt("wordcloudstart",be),Ee(ji[i])};Ke("wordcloudstart",$e),ji[i]=(n.layoutAnimation?de:setTimeout)(function be(){if(ze){if(K>=n.list.length){Ee(ji[i]),ve("wordcloudstop",!1),Mt("wordcloudstart",$e),delete ji[i];return}m=new Date().getTime();var Ve=De(n.list[K],0),Ge=!ve("wordclouddrawn",!0,{item:n.list[K],drawn:Ve});if(P()||Ge){Ee(ji[i]),n.abort(),ve("wordcloudabort",!1),ve("wordcloudstop",!1),Mt("wordcloudstart",$e);return}K++,ji[i]=de(be,n.wait)}},n.wait)}};oe()};uo.isSupported=Ws;uo.minFontSize=_s;if(!uo.isSupported)throw new Error("Sorry your browser not support wordCloud");function D0(e){for(var t=e.getContext("2d"),r=t.getImageData(0,0,e.width,e.height),i=t.createImageData(r),n=0,a=0,o=0;o<r.data.length;o+=4){var s=r.data[o+3];if(s>128){var l=r.data[o]+r.data[o+1]+r.data[o+2];n+=l,++a}}for(var h=n/a,o=0;o<r.data.length;o+=4){var l=r.data[o]+r.data[o+1]+r.data[o+2],s=r.data[o+3];s<128||l>h?(i.data[o]=0,i.data[o+1]=0,i.data[o+2]=0,i.data[o+3]=0):(i.data[o]=255,i.data[o+1]=255,i.data[o+2]=255,i.data[o+3]=255)}t.putImageData(i,0,0)}uc(function(e,t){e.eachSeriesByType("wordCloud",function(r){var i=$n(r.getBoxLayoutParams(),{width:t.getWidth(),height:t.getHeight()}),n=r.get("keepAspect"),a=r.get("maskImage"),o=a?a.width/a.height:1;n&&P0(i,o);var s=r.getData(),l=document.createElement("canvas");l.width=i.width,l.height=i.height;var h=l.getContext("2d");if(a)try{h.drawImage(a,0,0,l.width,l.height),D0(l)}catch(g){console.error("Invalid mask image"),console.error(g.toString())}var u=r.get("sizeRange"),f=r.get("rotationRange"),d=s.getDataExtent("value"),c=Math.PI/180,v=r.get("gridSize");uo(l,{list:s.mapArray("value",function(g,m){var _=s.getItemModel(m);return[s.getName(m),_.get("textStyle.fontSize",!0)||rs(g,d,u),m]}).sort(function(g,m){return m[1]-g[1]}),fontFamily:r.get("textStyle.fontFamily")||r.get("emphasis.textStyle.fontFamily")||e.get("textStyle.fontFamily"),fontWeight:r.get("textStyle.fontWeight")||r.get("emphasis.textStyle.fontWeight")||e.get("textStyle.fontWeight"),gridSize:v,ellipticity:i.height/i.width,minRotation:f[0]*c,maxRotation:f[1]*c,clearCanvas:!a,rotateRatio:1,rotationStep:r.get("rotationStep")*c,drawOutOfBound:r.get("drawOutOfBound"),shrinkToFit:r.get("shrinkToFit"),layoutAnimation:r.get("layoutAnimation"),shuffle:!1,shape:r.get("shape")});function p(g){var m=g.detail.item;g.detail.drawn&&r.layoutInstance.ondraw&&(g.detail.drawn.gx+=i.x/v,g.detail.drawn.gy+=i.y/v,r.layoutInstance.ondraw(m[0],m[1],m[2],g.detail.drawn))}l.addEventListener("wordclouddrawn",p),r.layoutInstance&&r.layoutInstance.dispose(),r.layoutInstance={ondraw:null,dispose:function(){l.removeEventListener("wordclouddrawn",p),l.addEventListener("wordclouddrawn",function(g){g.preventDefault()})}}})});Xh(function(e){var t=(e||{}).series;!ur(t)&&(t=t?[t]:[]);var r=["shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"];ir(t,function(n){if(n&&n.type==="wordCloud"){var a=n.textStyle||{};i(a.normal),i(a.emphasis)}});function i(n){n&&ir(r,function(a){n.hasOwnProperty(a)&&(n["text"+fc(a)]=n[a])})}});function P0(e,t){var r=e.width,i=e.height;r>i*t?(e.x+=(r-i*t)/2,e.width=i*t):(e.y+=(i-r/t)/2,e.height=r/t)}function R0(e){let t,r=`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
    热门问答关键字`,i,n,a,o,s,l,h;return a=new Pi({props:{isLoading:e[1]}}),{c(){t=X("h2"),t.innerHTML=r,i=he(),n=X("div"),it(a.$$.fragment),o=he(),s=X("div"),this.h()},l(u){t=j(u,"H2",{class:!0,"data-svelte-h":!0}),tt(t)!=="svelte-1jxponz"&&(t.innerHTML=r),i=ue(u),n=j(u,"DIV",{class:!0});var f=ee(n);nt(a.$$.fragment,f),o=ue(f),s=j(f,"DIV",{class:!0}),ee(s).forEach(U),f.forEach(U),this.h()},h(){B(t,"class","text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center"),B(s,"class",l="min-h-80 w-full "+(e[0]?"h-[80vh]":"h-[30vh]")),B(n,"class","relative")},m(u,f){Oe(u,t,f),Oe(u,i,f),Oe(u,n,f),at(a,n,null),R(n,o),R(n,s),e[4](s),h=!0},p(u,[f]){const d={};f&2&&(d.isLoading=u[1]),a.$set(d),(!h||f&1&&l!==(l="min-h-80 w-full "+(u[0]?"h-[80vh]":"h-[30vh]")))&&B(s,"class",l)},i(u){h||(Xe(a.$$.fragment,u),h=!0)},o(u){je(a.$$.fragment,u),h=!1},d(u){u&&(U(t),U(i),U(n)),ot(a),e[4](null)}}}function N0(e,t,r){let{isModal:i=!1}=t,{chartsData:n}=t,a=!0,o,s,l=!1;function h(){if(!l||!s||!n)return;r(1,a=!0),o||(o=Di(s));const d={backgroundColor:"transparent",series:[{type:"wordCloud",shape:"circle",left:"center",top:"center",width:"100%",height:"100%",right:null,bottom:null,sizeRange:[12,60],rotationRange:[-90,90],rotationStep:45,gridSize:8,drawOutOfBound:!1,layoutAnimation:!0,textStyle:{fontFamily:"sans-serif",fontWeight:"bold",color(){return"rgb("+[Math.round(Math.random()*160),Math.round(Math.random()*160),Math.round(Math.random()*160)].join(",")+")"}},emphasis:{focus:"self",textStyle:{shadowBlur:10,shadowColor:"#333"}},data:n.length===0?[{name:"热门关键字",value:0}]:n}]};o.setOption(d),r(1,a=!1)}function u(){o==null||o.resize()}ai(()=>(l=!0,h(),window.addEventListener("resize",u),()=>{window.removeEventListener("resize",u),o==null||o.dispose(),o=void 0})),Sf(()=>{l&&h()});function f(d){oi[d?"unshift":"push"](()=>{s=d,r(2,s)})}return e.$$set=d=>{"isModal"in d&&r(0,i=d.isModal),"chartsData"in d&&r(3,n=d.chartsData)},[i,a,s,n,f]}class _f extends Rr{constructor(t){super(),Nr(this,t,N0,R0,Pr,{isModal:0,chartsData:3})}}function Rh(e,t,r){const i=e.slice();return i[14]=t[r],i}function Nh(e){let t,r=ri(e[0]),i=[];for(let n=0;n<r.length;n+=1)i[n]=Ih(Rh(e,r,n));return{c(){for(let n=0;n<i.length;n+=1)i[n].c();t=_r()},l(n){for(let a=0;a<i.length;a+=1)i[a].l(n);t=_r()},m(n,a){for(let o=0;o<i.length;o+=1)i[o]&&i[o].m(n,a);Oe(n,t,a)},p(n,a){if(a&75){r=ri(n[0]);let o;for(o=0;o<r.length;o+=1){const s=Rh(n,r,o);i[o]?i[o].p(s,a):(i[o]=Ih(s),i[o].c(),i[o].m(t.parentNode,t))}for(;o<i.length;o+=1)i[o].d(1);i.length=r.length}},d(n){n&&U(t),Qa(i,n)}}}function Ih(e){let t,r=e[14]+"",i,n,a,o,s;function l(){return e[9](e[14])}return{c(){t=X("button"),i=pr(r),n=he(),this.h()},l(h){t=j(h,"BUTTON",{class:!0});var u=ee(t);i=mr(u,r),n=ue(u),u.forEach(U),this.h()},h(){B(t,"class",a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[14]?"bg-teal-600 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))},m(h,u){Oe(h,t,u),R(t,i),R(t,n),o||(s=Rt(t,"click",l),o=!0)},p(h,u){e=h,u&1&&r!==(r=e[14]+"")&&Lr(i,r),u&3&&a!==(a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[14]?"bg-teal-600 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))&&B(t,"class",a)},d(h){h&&U(t),o=!1,s()}}}function I0(e){let t,r,i=`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
        知识集使用次数`,n,a,o,s,l,h,u,f,d,c=!e[5]&&Nh(e);return l=new Pi({props:{isLoading:e[5]}}),{c(){t=X("div"),r=X("h2"),r.innerHTML=i,n=he(),a=X("div"),c&&c.c(),o=he(),s=X("div"),it(l.$$.fragment),h=he(),u=X("div"),this.h()},l(v){t=j(v,"DIV",{class:!0});var p=ee(t);r=j(p,"H2",{class:!0,"data-svelte-h":!0}),tt(r)!=="svelte-f0kwar"&&(r.innerHTML=i),n=ue(p),a=j(p,"DIV",{class:!0});var g=ee(a);c&&c.l(g),g.forEach(U),p.forEach(U),o=ue(v),s=j(v,"DIV",{class:!0});var m=ee(s);nt(l.$$.fragment,m),h=ue(m),u=j(m,"DIV",{class:!0}),ee(u).forEach(U),m.forEach(U),this.h()},h(){B(r,"class","text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center"),B(a,"class","flex space-x-2"),B(t,"class","flex justify-between items-center mb-4"),B(u,"class",f="min-h-80 w-full "+(e[2]?"h-[80vh]":"h-[30vh]")),B(s,"class","relative")},m(v,p){Oe(v,t,p),R(t,r),R(t,n),R(t,a),c&&c.m(a,null),Oe(v,o,p),Oe(v,s,p),at(l,s,null),R(s,h),R(s,u),e[10](u),d=!0},p(v,[p]){v[5]?c&&(c.d(1),c=null):c?c.p(v,p):(c=Nh(v),c.c(),c.m(a,null));const g={};p&32&&(g.isLoading=v[5]),l.$set(g),(!d||p&4&&f!==(f="min-h-80 w-full "+(v[2]?"h-[80vh]":"h-[30vh]")))&&B(u,"class",f)},i(v){d||(Xe(l.$$.fragment,v),d=!0)},o(v){je(l.$$.fragment,v),d=!1},d(v){v&&(U(t),U(o),U(s)),c&&c.d(),ot(l),e[10](null)}}}const O0="#e2e8f0",B0="rgba(255, 255, 255, 0.2)";function Qo(){return document.documentElement.classList.contains("dark")}function F0(e,t,r){let{isModal:i=!1}=t,{chartsData:n={}}=t,{days:a=[]}=t,{selectedDay:o=""}=t,{onDayChange:s=()=>{}}=t,l=!0,h,u=null,f=null;async function d(){if((!u||!u.isConnected)&&(console.warn("Chart container not ready, waiting..."),await Ki(),!u)){console.error("Chart container still not found after wait");return}if(u.offsetWidth===0||u.offsetHeight===0)return console.warn("Chart container has zero dimensions, retrying..."),await Ki(),d();try{r(5,l=!0),h&&(h.dispose(),r(8,h=void 0)),r(8,h=Di(u)),c()}catch(m){console.error("Chart initialization failed:",m)}finally{r(5,l=!1)}}function c(){if(!h||!o)return;let m=n[o];(!m||m.length===0)&&(m=[{name:"知识集",count:0}]);const _=Qo()?O0:"#1e293b",x=Qo()?B0:"rgba(0, 0, 0, 0.2)";h.setOption({color:["#06b6d4"],backgroundColor:"transparent",tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:m.map(y=>y.name),axisTick:{alignWithLabel:!0},axisLabel:{rotate:45,interval:0,color:_},axisLine:{lineStyle:{color:x}}}],yAxis:[{type:"value",minInterval:1,axisLabel:{color:_},axisLine:{lineStyle:{color:x}},splitLine:{lineStyle:{color:Qo()?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.05)"}}}],series:[{name:"使用次数",type:"bar",barWidth:"60%",data:m.map(y=>y.count),itemStyle:{color:new ys(0,0,0,1,[{offset:0,color:"#67e8f9"},{offset:1,color:"#06b6d4"}])}}]})}function v(){c()}ai(async()=>{await Ki(),await d(),f=new ResizeObserver(()=>{h==null||h.resize()}),u&&f.observe(u);const m=window.matchMedia("(prefers-color-scheme: dark)");return m.addEventListener("change",v),()=>{f&&f.disconnect(),m.removeEventListener("change",v)}}),Yn(()=>{h&&(h.dispose(),r(8,h=void 0))});const p=m=>{r(1,o=m),c(),s(m)};function g(m){oi[m?"unshift":"push"](()=>{u=m,r(4,u)})}return e.$$set=m=>{"isModal"in m&&r(2,i=m.isModal),"chartsData"in m&&r(7,n=m.chartsData),"days"in m&&r(0,a=m.days),"selectedDay"in m&&r(1,o=m.selectedDay),"onDayChange"in m&&r(3,s=m.onDayChange)},e.$$.update=()=>{e.$$.dirty&147&&n&&u&&(r(0,a=Object.keys(n)),a.length>0&&!o&&r(1,o=a[0]),d()),e.$$.dirty&386&&h&&o&&n!=null&&n[o]&&c()},[a,o,i,s,u,l,c,n,h,p,g]}class yf extends Rr{constructor(t){super(),Nr(this,t,F0,I0,Pr,{isModal:2,chartsData:7,days:0,selectedDay:1,onDayChange:3})}}function U0(e){let t,r=`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
    知识类型统计`,i,n,a,o,s,l,h;return a=new Pi({props:{isLoading:e[2]}}),{c(){t=X("h2"),t.innerHTML=r,i=he(),n=X("div"),it(a.$$.fragment),o=he(),s=X("div"),this.h()},l(u){t=j(u,"H2",{class:!0,"data-svelte-h":!0}),tt(t)!=="svelte-1h2ps0g"&&(t.innerHTML=r),i=ue(u),n=j(u,"DIV",{class:!0});var f=ee(n);nt(a.$$.fragment,f),o=ue(f),s=j(f,"DIV",{class:!0}),ee(s).forEach(U),f.forEach(U),this.h()},h(){B(t,"class","text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center"),B(s,"class",l="min-h-80 w-full "+(e[0]?"h-[80vh]":"h-[30vh]")),B(n,"class","relative")},m(u,f){Oe(u,t,f),Oe(u,i,f),Oe(u,n,f),at(a,n,null),R(n,o),R(n,s),e[5](s),h=!0},p(u,[f]){const d={};f&4&&(d.isLoading=u[2]),a.$set(d),(!h||f&1&&l!==(l="min-h-80 w-full "+(u[0]?"h-[80vh]":"h-[30vh]")))&&B(s,"class",l)},i(u){h||(Xe(a.$$.fragment,u),h=!0)},o(u){je(a.$$.fragment,u),h=!1},d(u){u&&(U(t),U(i),U(n)),ot(a),e[5](null)}}}const z0="#e2e8f0";function Oh(){return document.documentElement.classList.contains("dark")}function G0(e,t,r){let{isModal:i=!1}=t,{chartsData:n}=t,a,o=null,s=!0;const l={chunks:"#10b981",images:"#3b82f6",tables:"#8b5cf6"};async function h(){!a||!n||(await Ki(),r(4,o=Di(a)),u(),r(2,s=!1))}function u(){if(!o)return;n.chunks+n.images+n.tables;const v=Oh()?z0:"#1e293b",p={backgroundColor:"transparent",tooltip:{trigger:"item",formatter:g=>{const m=Math.round(g.percent);return`${g.name}<br/>${g.value} (${m}%)`}},legend:{orient:"vertical",left:10,data:["切片","图片","表格"],textStyle:{color:v}},series:[{name:"内容统计",type:"pie",radius:["40%","70%"],avoidLabelOverlap:!1,itemStyle:{borderRadius:10,borderColor:Oh()?"#1e293b":"#fff",borderWidth:2},label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"18",fontWeight:"bold",color:v,formatter:`{b}
{c} ({d}%)`}},labelLine:{show:!1},data:[{value:n.chunks,name:"切片",itemStyle:{color:l.chunks}},{value:n.images,name:"图片",itemStyle:{color:l.images}},{value:n.tables,name:"表格",itemStyle:{color:l.tables}}]}]};o.setOption(p),o.resize()}function f(){o==null||o.resize()}function d(){u()}ai(()=>{h();const v=window.matchMedia("(prefers-color-scheme: dark)");v.addEventListener("change",d);const p=new MutationObserver(d);return p.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",f),()=>{v.removeEventListener("change",d),p.disconnect(),window.removeEventListener("resize",f)}}),Yn(()=>{o&&(o.dispose(),r(4,o=null))});function c(v){oi[v?"unshift":"push"](()=>{a=v,r(1,a)})}return e.$$set=v=>{"isModal"in v&&r(0,i=v.isModal),"chartsData"in v&&r(3,n=v.chartsData)},e.$$.update=()=>{e.$$.dirty&24&&n&&o&&u()},[i,a,s,n,o,c]}class xf extends Rr{constructor(t){super(),Nr(this,t,G0,U0,Pr,{isModal:0,chartsData:3})}}function Bh(e,t,r){const i=e.slice();return i[14]=t[r],i}function Fh(e){let t,r=ri(e[0]),i=[];for(let n=0;n<r.length;n+=1)i[n]=Uh(Bh(e,r,n));return{c(){for(let n=0;n<i.length;n+=1)i[n].c();t=_r()},l(n){for(let a=0;a<i.length;a+=1)i[a].l(n);t=_r()},m(n,a){for(let o=0;o<i.length;o+=1)i[o]&&i[o].m(n,a);Oe(n,t,a)},p(n,a){if(a&75){r=ri(n[0]);let o;for(o=0;o<r.length;o+=1){const s=Bh(n,r,o);i[o]?i[o].p(s,a):(i[o]=Uh(s),i[o].c(),i[o].m(t.parentNode,t))}for(;o<i.length;o+=1)i[o].d(1);i.length=r.length}},d(n){n&&U(t),Qa(i,n)}}}function Uh(e){let t,r=e[14]+"",i,n,a,o,s;function l(){return e[8](e[14])}return{c(){t=X("button"),i=pr(r),n=he(),this.h()},l(h){t=j(h,"BUTTON",{class:!0});var u=ee(t);i=mr(u,r),n=ue(u),u.forEach(U),this.h()},h(){B(t,"class",a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[14]?"bg-yellow-500 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))},m(h,u){Oe(h,t,u),R(t,i),R(t,n),o||(s=Rt(t,"click",l),o=!0)},p(h,u){e=h,u&1&&r!==(r=e[14]+"")&&Lr(i,r),u&3&&a!==(a="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 "+(e[1]===e[14]?"bg-yellow-500 text-white shadow-md":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"))&&B(t,"class",a)},d(h){h&&U(t),o=!1,s()}}}function k0(e){let t,r,i=`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
        知识集问答好评榜单`,n,a,o,s,l,h,u,f,d,c=!e[4]&&Fh(e);return l=new Pi({props:{isLoading:e[4]}}),{c(){t=X("div"),r=X("h2"),r.innerHTML=i,n=he(),a=X("div"),c&&c.c(),o=he(),s=X("div"),it(l.$$.fragment),h=he(),u=X("div"),this.h()},l(v){t=j(v,"DIV",{class:!0});var p=ee(t);r=j(p,"H2",{class:!0,"data-svelte-h":!0}),tt(r)!=="svelte-19ubvvl"&&(r.innerHTML=i),n=ue(p),a=j(p,"DIV",{class:!0});var g=ee(a);c&&c.l(g),g.forEach(U),p.forEach(U),o=ue(v),s=j(v,"DIV",{class:!0});var m=ee(s);nt(l.$$.fragment,m),h=ue(m),u=j(m,"DIV",{class:!0}),ee(u).forEach(U),m.forEach(U),this.h()},h(){B(r,"class","text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center"),B(a,"class","flex space-x-2"),B(t,"class","flex justify-between items-center mb-4"),B(u,"class",f="min-h-80 w-full "+(e[2]?"h-[80vh]":"h-[30vh]")),B(s,"class","relative")},m(v,p){Oe(v,t,p),R(t,r),R(t,n),R(t,a),c&&c.m(a,null),Oe(v,o,p),Oe(v,s,p),at(l,s,null),R(s,h),R(s,u),e[9](u),d=!0},p(v,[p]){v[4]?c&&(c.d(1),c=null):c?c.p(v,p):(c=Fh(v),c.c(),c.m(a,null));const g={};p&16&&(g.isLoading=v[4]),l.$set(g),(!d||p&4&&f!==(f="min-h-80 w-full "+(v[2]?"h-[80vh]":"h-[30vh]")))&&B(u,"class",f)},i(v){d||(Xe(l.$$.fragment,v),d=!0)},o(v){je(l.$$.fragment,v),d=!1},d(v){v&&(U(t),U(o),U(s)),c&&c.d(),ot(l),e[9](null)}}}const H0="#e2e8f0",V0="rgba(255, 255, 255, 0.2)";function Jo(){return document.documentElement.classList.contains("dark")}function W0(e,t,r){let{isModal:i=!1}=t,{chartsData:n}=t,{days:a=[]}=t,{selectedDay:o=""}=t,{onDayChange:s=()=>{}}=t,l=!0,h,u=null;function f(){u&&(h&&h.dispose(),h=Di(u),d(),r(4,l=!1))}function d(){if(!h||!n||!o)return;let m=n[o];(!m||m.length===0)&&(m=[{name:"知识集",rating:0}]);const _=[...m].sort((w,E)=>E.rating-w.rating),x=Jo()?H0:"#1e293b",y=Jo()?V0:"rgba(0, 0, 0, 0.2)",T={backgroundColor:"transparent",tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter(w){const E=w[0];return`${E.name}<br/>评分: ${_[E.dataIndex].rating}<br/>`}},grid:{left:"3%",right:"15%",bottom:"3%",top:"3%",containLabel:!0},yAxis:[{type:"category",data:_.map(w=>w.name),axisTick:{alignWithLabel:!0},axisLabel:{color:x,fontWeight:"bold"}}],xAxis:[{type:"value",max:5,axisLabel:{formatter:"{value} 分",color:x},axisLine:{lineStyle:{color:y}},splitLine:{lineStyle:{color:Jo()?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.05)"}}}],series:[{name:"评分",type:"bar",barWidth:"60%",data:_.map(w=>w.rating),itemStyle:{color(w){const E=_[w.dataIndex].rating;return E>=4.8?"#f59e0b":E>=4.5?"#fbbf24":"#fcd34d"},borderRadius:[0,4,4,0]},label:{show:!0,position:"right",formatter(w){return w.value+"分"},fontWeight:"bold",color:x}}]};h.setOption(T)}function c(){h==null||h.resize()}function v(){d()}ai(()=>{n&&f();const m=window.matchMedia("(prefers-color-scheme: dark)");m.addEventListener("change",v);const _=new MutationObserver(v);return _.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",c),()=>{m.removeEventListener("change",v),_.disconnect(),window.removeEventListener("resize",c)}}),Yn(()=>{h&&(h.dispose(),h=void 0)});const p=m=>{r(1,o=m),d(),s(m)};function g(m){oi[m?"unshift":"push"](()=>{u=m,r(5,u)})}return e.$$set=m=>{"isModal"in m&&r(2,i=m.isModal),"chartsData"in m&&r(7,n=m.chartsData),"days"in m&&r(0,a=m.days),"selectedDay"in m&&r(1,o=m.selectedDay),"onDayChange"in m&&r(3,s=m.onDayChange)},e.$$.update=()=>{e.$$.dirty&131&&n&&(r(0,a=Object.keys(n)),a.includes(o)||r(1,o=a[0]||""),f()),e.$$.dirty&130&&o&&n&&d()},[a,o,i,s,l,u,d,n,p,g]}class Tf extends Rr{constructor(t){super(),Nr(this,t,W0,k0,Pr,{isModal:2,chartsData:7,days:0,selectedDay:1,onDayChange:3})}}const X0=async(e="",t)=>{let r=new AbortController,i=null;const n=await fetch(`${vc}/statisticsData`,{signal:r.signal,method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",...e&&{authorization:`Bearer ${e}`}},body:JSON.stringify({options:t})}).catch(a=>(i=a,console.log(a),null));if(i)throw i;return[n,r]};function zh(e){let t,r,i,n,a='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',o,s,l,h,u,f,d,c,v;const p=[Q0,$0,K0,Y0,q0,Z0,j0],g=[];function m(_,x){return _[13]==="trend"?0:_[13]==="userRanking"?1:_[13]==="contentStats"?2:_[13]==="knowledgeGraph"?3:_[13]==="wordCloud"?4:_[13]==="knowledgeSetUsage"?5:_[13]==="topRatedKnowledgeSet"?6:-1}return~(l=m(e))&&(h=g[l]=p[l](e)),{c(){t=X("div"),r=X("div"),i=X("div"),n=X("button"),n.innerHTML=a,o=he(),s=X("div"),h&&h.c(),this.h()},l(_){t=j(_,"DIV",{class:!0});var x=ee(t);r=j(x,"DIV",{class:!0});var y=ee(r);i=j(y,"DIV",{class:!0});var T=ee(i);n=j(T,"BUTTON",{class:!0,"data-svelte-h":!0}),tt(n)!=="svelte-1wrvkq4"&&(n.innerHTML=a),T.forEach(U),o=ue(y),s=j(y,"DIV",{class:!0});var w=ee(s);h&&h.l(w),w.forEach(U),y.forEach(U),x.forEach(U),this.h()},h(){B(n,"class","p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"),B(i,"class","flex justify-end p-4"),B(s,"class","px-5 pb-5 h-[88%] w-full"),B(r,"class","bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full h-full overflow-auto"),B(t,"class","fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4")},m(_,x){Oe(_,t,x),R(t,r),R(r,i),R(i,n),R(r,o),R(r,s),~l&&g[l].m(s,null),d=!0,c||(v=[Rt(n,"click",e[17]),Rt(t,"click",e[18])],c=!0)},p(_,x){let y=l;l=m(_),l===y?~l&&g[l].p(_,x):(h&&(kh(),je(g[y],1,1,()=>{g[y]=null}),Hh()),~l?(h=g[l],h?h.p(_,x):(h=g[l]=p[l](_),h.c()),Xe(h,1),h.m(s,null)):h=null)},i(_){d||(Xe(h),_&&nl(()=>{d&&(u||(u=ga(r,ul,{duration:200,start:.9},!0)),u.run(1))}),_&&nl(()=>{d&&(f||(f=ga(t,fl,{duration:200},!0)),f.run(1))}),d=!0)},o(_){je(h),_&&(u||(u=ga(r,ul,{duration:200,start:.9},!1)),u.run(0)),_&&(f||(f=ga(t,fl,{duration:200},!1)),f.run(0)),d=!1},d(_){_&&U(t),~l&&g[l].d(),_&&u&&u.end(),_&&f&&f.end(),c=!1,Gh(v)}}}function j0(e){let t,r;return t=new Tf({props:{chartsData:e[14],isModal:!0}}),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p(i,n){const a={};n[0]&16384&&(a.chartsData=i[14]),t.$set(a)},i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}function Z0(e){let t,r;return t=new yf({props:{chartsData:e[14],isModal:!0}}),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p(i,n){const a={};n[0]&16384&&(a.chartsData=i[14]),t.$set(a)},i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}function q0(e){let t,r;return t=new _f({props:{chartsData:e[14],isModal:!0}}),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p(i,n){const a={};n[0]&16384&&(a.chartsData=i[14]),t.$set(a)},i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}function Y0(e){let t,r;return t=new gf({props:{chartsData:e[14].data,scopeName:e[14].scopeName}}),t.$on("changeScope",e[15]),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p(i,n){const a={};n[0]&16384&&(a.chartsData=i[14].data),n[0]&16384&&(a.scopeName=i[14].scopeName),t.$set(a)},i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}function K0(e){let t,r;return t=new xf({props:{chartsData:e[14],isModal:!0}}),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p(i,n){const a={};n[0]&16384&&(a.chartsData=i[14]),t.$set(a)},i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}function $0(e){let t,r;return t=new Qh({props:{chartsData:e[14],isModal:!0}}),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p(i,n){const a={};n[0]&16384&&(a.chartsData=i[14]),t.$set(a)},i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}function Q0(e){let t,r;return t=new Jh({props:{chartsData:e[14],isModal:!0}}),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p(i,n){const a={};n[0]&16384&&(a.chartsData=i[14]),t.$set(a)},i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}function J0(e){var Ks;let t,r,i,n,a,o,s="累计问答次数",l,h,u,f,d,c='<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>',v,p,g,m,_,x="知识集数量",y,T,w,E,S,D='<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>',M,C,N,O,P,F="文档数量",H,Y,z,Te,q,De='<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',ve,oe,Q,L,k,V="用户数量",J,K,ie=(((Ks=e[3])==null?void 0:Ks.length)||0)+"",pe,we,te,Ne='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"></path></svg>',de,Ee,ze,Ke,Mt='<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>',$e,be,Ve,Ge,st,yr='<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>',Ur,nr,ar,yt,Yt,Ht,Kt='<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>',ra,$t,fo,zr,xr,Xs='<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>',co,Tr,vo,Gr,wr,js='<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>',po,kr,mo,Hr,Vr,br,Zs='<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>',go,Wr,_o,Xr,Sr,qs='<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>',yo,jr,ia,Oi,Zr,xo,Ys;be=new Jh({props:{chartsData:e[8]}}),nr=new Qh({props:{chartsData:e[5]}}),$t=new xf({props:{chartsData:e[4]}}),Tr=new gf({props:{chartsData:e[10],scopeName:e[11]}}),Tr.$on("changeScope",e[15]),kr=new _f({props:{chartsData:e[6]}}),Wr=new yf({props:{chartsData:e[7]}}),jr=new Tf({props:{chartsData:e[9]}});let dt=e[12]&&zh(e);return{c(){t=X("div"),r=X("div"),i=X("div"),n=X("div"),a=X("div"),o=X("h2"),o.textContent=s,l=he(),h=X("p"),u=pr(e[0]),f=he(),d=X("div"),d.innerHTML=c,v=he(),p=X("div"),g=X("div"),m=X("div"),_=X("h2"),_.textContent=x,y=he(),T=X("p"),w=pr(e[1]),E=he(),S=X("div"),S.innerHTML=D,M=he(),C=X("div"),N=X("div"),O=X("div"),P=X("h2"),P.textContent=F,H=he(),Y=X("p"),z=pr(e[2]),Te=he(),q=X("div"),q.innerHTML=De,ve=he(),oe=X("div"),Q=X("div"),L=X("div"),k=X("h2"),k.textContent=V,J=he(),K=X("p"),pe=pr(ie),we=he(),te=X("div"),te.innerHTML=Ne,de=he(),Ee=X("div"),ze=X("div"),Ke=X("button"),Ke.innerHTML=Mt,$e=he(),it(be.$$.fragment),Ve=he(),Ge=X("div"),st=X("button"),st.innerHTML=yr,Ur=he(),it(nr.$$.fragment),ar=he(),yt=X("div"),Yt=X("div"),Ht=X("button"),Ht.innerHTML=Kt,ra=he(),it($t.$$.fragment),fo=he(),zr=X("div"),xr=X("button"),xr.innerHTML=Xs,co=he(),it(Tr.$$.fragment),vo=he(),Gr=X("div"),wr=X("button"),wr.innerHTML=js,po=he(),it(kr.$$.fragment),mo=he(),Hr=X("div"),Vr=X("div"),br=X("button"),br.innerHTML=Zs,go=he(),it(Wr.$$.fragment),_o=he(),Xr=X("div"),Sr=X("button"),Sr.innerHTML=qs,yo=he(),it(jr.$$.fragment),ia=he(),dt&&dt.c(),Oi=_r(),this.h()},l(ye){t=j(ye,"DIV",{class:!0});var We=ee(t);r=j(We,"DIV",{class:!0});var or=ee(r);i=j(or,"DIV",{class:!0});var _n=ee(i);n=j(_n,"DIV",{class:!0});var fi=ee(n);a=j(fi,"DIV",{});var qr=ee(a);o=j(qr,"H2",{class:!0,"data-svelte-h":!0}),tt(o)!=="svelte-1kq431y"&&(o.textContent=s),l=ue(qr),h=j(qr,"P",{class:!0});var yn=ee(h);u=mr(yn,e[0]),yn.forEach(U),qr.forEach(U),f=ue(fi),d=j(fi,"DIV",{class:!0,"data-svelte-h":!0}),tt(d)!=="svelte-wa0vik"&&(d.innerHTML=c),fi.forEach(U),_n.forEach(U),v=ue(or),p=j(or,"DIV",{class:!0});var xn=ee(p);g=j(xn,"DIV",{class:!0});var ci=ee(g);m=j(ci,"DIV",{});var di=ee(m);_=j(di,"H2",{class:!0,"data-svelte-h":!0}),tt(_)!=="svelte-5679g5"&&(_.textContent=x),y=ue(di),T=j(di,"P",{class:!0});var $s=ee(T);w=mr($s,e[1]),$s.forEach(U),di.forEach(U),E=ue(ci),S=j(ci,"DIV",{class:!0,"data-svelte-h":!0}),tt(S)!=="svelte-z27s6a"&&(S.innerHTML=D),ci.forEach(U),xn.forEach(U),M=ue(or),C=j(or,"DIV",{class:!0});var Qs=ee(C);N=j(Qs,"DIV",{class:!0});var na=ee(N);O=j(na,"DIV",{});var aa=ee(O);P=j(aa,"H2",{class:!0,"data-svelte-h":!0}),tt(P)!=="svelte-fzkpoa"&&(P.textContent=F),H=ue(aa),Y=j(aa,"P",{class:!0});var Js=ee(Y);z=mr(Js,e[2]),Js.forEach(U),aa.forEach(U),Te=ue(na),q=j(na,"DIV",{class:!0,"data-svelte-h":!0}),tt(q)!=="svelte-abon50"&&(q.innerHTML=De),na.forEach(U),Qs.forEach(U),ve=ue(or),oe=j(or,"DIV",{class:!0});var el=ee(oe);Q=j(el,"DIV",{class:!0});var oa=ee(Q);L=j(oa,"DIV",{});var sa=ee(L);k=j(sa,"H2",{class:!0,"data-svelte-h":!0}),tt(k)!=="svelte-mbs05v"&&(k.textContent=V),J=ue(sa),K=j(sa,"P",{class:!0});var tl=ee(K);pe=mr(tl,ie),tl.forEach(U),sa.forEach(U),we=ue(oa),te=j(oa,"DIV",{class:!0,"data-svelte-h":!0}),tt(te)!=="svelte-94pmtk"&&(te.innerHTML=Ne),oa.forEach(U),el.forEach(U),or.forEach(U),de=ue(We),Ee=j(We,"DIV",{class:!0});var la=ee(Ee);ze=j(la,"DIV",{class:!0});var ha=ee(ze);Ke=j(ha,"BUTTON",{class:!0,title:!0,"data-svelte-h":!0}),tt(Ke)!=="svelte-17omdbv"&&(Ke.innerHTML=Mt),$e=ue(ha),nt(be.$$.fragment,ha),ha.forEach(U),Ve=ue(la),Ge=j(la,"DIV",{class:!0});var ua=ee(Ge);st=j(ua,"BUTTON",{class:!0,title:!0,"data-svelte-h":!0}),tt(st)!=="svelte-1l0hopa"&&(st.innerHTML=yr),Ur=ue(ua),nt(nr.$$.fragment,ua),ua.forEach(U),la.forEach(U),ar=ue(We),yt=j(We,"DIV",{class:!0});var Bi=ee(yt);Yt=j(Bi,"DIV",{class:!0});var fa=ee(Yt);Ht=j(fa,"BUTTON",{class:!0,title:!0,"data-svelte-h":!0}),tt(Ht)!=="svelte-1hoilv6"&&(Ht.innerHTML=Kt),ra=ue(fa),nt($t.$$.fragment,fa),fa.forEach(U),fo=ue(Bi),zr=j(Bi,"DIV",{class:!0});var ca=ee(zr);xr=j(ca,"BUTTON",{class:!0,title:!0,"data-svelte-h":!0}),tt(xr)!=="svelte-1a662t0"&&(xr.innerHTML=Xs),co=ue(ca),nt(Tr.$$.fragment,ca),ca.forEach(U),vo=ue(Bi),Gr=j(Bi,"DIV",{class:!0});var da=ee(Gr);wr=j(da,"BUTTON",{class:!0,title:!0,"data-svelte-h":!0}),tt(wr)!=="svelte-1u752f"&&(wr.innerHTML=js),po=ue(da),nt(kr.$$.fragment,da),da.forEach(U),Bi.forEach(U),mo=ue(We),Hr=j(We,"DIV",{class:!0});var va=ee(Hr);Vr=j(va,"DIV",{class:!0});var pa=ee(Vr);br=j(pa,"BUTTON",{class:!0,title:!0,"data-svelte-h":!0}),tt(br)!=="svelte-1uyhjap"&&(br.innerHTML=Zs),go=ue(pa),nt(Wr.$$.fragment,pa),pa.forEach(U),_o=ue(va),Xr=j(va,"DIV",{class:!0});var ma=ee(Xr);Sr=j(ma,"BUTTON",{class:!0,title:!0,"data-svelte-h":!0}),tt(Sr)!=="svelte-1xlwfvb"&&(Sr.innerHTML=qs),yo=ue(ma),nt(jr.$$.fragment,ma),ma.forEach(U),va.forEach(U),We.forEach(U),ia=ue(ye),dt&&dt.l(ye),Oi=_r(),this.h()},h(){B(o,"class","text-lg font-semibold text-gray-700 dark:text-gray-300"),B(h,"class","text-3xl font-bold mt-2 text-indigo-600"),B(d,"class","p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 shadow-inner"),B(n,"class","flex justify-between items-start"),B(i,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-indigo-500"),B(_,"class","text-lg font-semibold text-gray-700 dark:text-gray-300"),B(T,"class","text-3xl font-bold mt-2 text-blue-600"),B(S,"class","p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 shadow-inner"),B(g,"class","flex justify-between items-start"),B(p,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-blue-500"),B(P,"class","text-lg font-semibold text-gray-700 dark:text-gray-300"),B(Y,"class","text-3xl font-bold mt-2 text-green-600"),B(q,"class","p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 shadow-inner"),B(N,"class","flex justify-between items-start"),B(C,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-green-500"),B(k,"class","text-lg font-semibold text-gray-700 dark:text-gray-300"),B(K,"class","text-3xl font-bold mt-2 text-purple-600"),B(te,"class","p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 shadow-inner"),B(Q,"class","flex justify-between items-start"),B(oe,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-purple-500"),B(r,"class","grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"),B(Ke,"class","absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"),B(Ke,"title","放大查看"),B(ze,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"),B(st,"class","absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"),B(st,"title","放大查看"),B(Ge,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"),B(Ee,"class","grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"),B(Ht,"class","absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"),B(Ht,"title","放大查看"),B(Yt,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"),B(xr,"class","absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"),B(xr,"title","放大查看"),B(zr,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"),B(wr,"class","absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"),B(wr,"title","放大查看"),B(Gr,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"),B(yt,"class","grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"),B(br,"class","absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"),B(br,"title","放大查看"),B(Vr,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"),B(Sr,"class","absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"),B(Sr,"title","放大查看"),B(Xr,"class","bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative"),B(Hr,"class","grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"),B(t,"class","w-full max-h-screen overflow-y-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8 transition-colors duration-300")},m(ye,We){Oe(ye,t,We),R(t,r),R(r,i),R(i,n),R(n,a),R(a,o),R(a,l),R(a,h),R(h,u),R(n,f),R(n,d),R(r,v),R(r,p),R(p,g),R(g,m),R(m,_),R(m,y),R(m,T),R(T,w),R(g,E),R(g,S),R(r,M),R(r,C),R(C,N),R(N,O),R(O,P),R(O,H),R(O,Y),R(Y,z),R(N,Te),R(N,q),R(r,ve),R(r,oe),R(oe,Q),R(Q,L),R(L,k),R(L,J),R(L,K),R(K,pe),R(Q,we),R(Q,te),R(t,de),R(t,Ee),R(Ee,ze),R(ze,Ke),R(ze,$e),at(be,ze,null),R(Ee,Ve),R(Ee,Ge),R(Ge,st),R(Ge,Ur),at(nr,Ge,null),R(t,ar),R(t,yt),R(yt,Yt),R(Yt,Ht),R(Yt,ra),at($t,Yt,null),R(yt,fo),R(yt,zr),R(zr,xr),R(zr,co),at(Tr,zr,null),R(yt,vo),R(yt,Gr),R(Gr,wr),R(Gr,po),at(kr,Gr,null),R(t,mo),R(t,Hr),R(Hr,Vr),R(Vr,br),R(Vr,go),at(Wr,Vr,null),R(Hr,_o),R(Hr,Xr),R(Xr,Sr),R(Xr,yo),at(jr,Xr,null),Oe(ye,ia,We),dt&&dt.m(ye,We),Oe(ye,Oi,We),Zr=!0,xo||(Ys=[Rt(window,"keydown",e[19]),Rt(Ke,"click",e[20]),Rt(st,"click",e[21]),Rt(Ht,"click",e[22]),Rt(xr,"click",e[23]),Rt(wr,"click",e[24]),Rt(br,"click",e[25]),Rt(Sr,"click",e[26])],xo=!0)},p(ye,We){var di;(!Zr||We[0]&1)&&Lr(u,ye[0]),(!Zr||We[0]&2)&&Lr(w,ye[1]),(!Zr||We[0]&4)&&Lr(z,ye[2]),(!Zr||We[0]&8)&&ie!==(ie=(((di=ye[3])==null?void 0:di.length)||0)+"")&&Lr(pe,ie);const or={};We[0]&256&&(or.chartsData=ye[8]),be.$set(or);const _n={};We[0]&32&&(_n.chartsData=ye[5]),nr.$set(_n);const fi={};We[0]&16&&(fi.chartsData=ye[4]),$t.$set(fi);const qr={};We[0]&1024&&(qr.chartsData=ye[10]),We[0]&2048&&(qr.scopeName=ye[11]),Tr.$set(qr);const yn={};We[0]&64&&(yn.chartsData=ye[6]),kr.$set(yn);const xn={};We[0]&128&&(xn.chartsData=ye[7]),Wr.$set(xn);const ci={};We[0]&512&&(ci.chartsData=ye[9]),jr.$set(ci),ye[12]?dt?(dt.p(ye,We),We[0]&4096&&Xe(dt,1)):(dt=zh(ye),dt.c(),Xe(dt,1),dt.m(Oi.parentNode,Oi)):dt&&(kh(),je(dt,1,1,()=>{dt=null}),Hh())},i(ye){Zr||(Xe(be.$$.fragment,ye),Xe(nr.$$.fragment,ye),Xe($t.$$.fragment,ye),Xe(Tr.$$.fragment,ye),Xe(kr.$$.fragment,ye),Xe(Wr.$$.fragment,ye),Xe(jr.$$.fragment,ye),Xe(dt),Zr=!0)},o(ye){je(be.$$.fragment,ye),je(nr.$$.fragment,ye),je($t.$$.fragment,ye),je(Tr.$$.fragment,ye),je(kr.$$.fragment,ye),je(Wr.$$.fragment,ye),je(jr.$$.fragment,ye),je(dt),Zr=!1},d(ye){ye&&(U(t),U(ia),U(Oi)),ot(be),ot(nr),ot($t),ot(Tr),ot(kr),ot(Wr),ot(jr),dt&&dt.d(ye),xo=!1,Gh(Ys)}}}function e_(e,t,r){let i=0,n=0,a=0,o=0,s={chunks:0,images:0,tables:0},l,h,u,f,d,c,v,p,g=!1,m="",_=null;async function x(H){const Y=H?{kb_scatter:H}:{},[z,Te]=await X0(localStorage.token,Y);if(z&&z.ok){const q=z.body.pipeThrough(new TextDecoderStream).pipeThrough(pc(`
`)).getReader();for(;;){const{value:De,done:ve}=await q.read();if(ve)break;let oe=JSON.parse(De);oe.channel==="user_rank"?r(5,l=oe.data):oe.channel==="kb_usage"?r(7,u=oe.data):oe.channel==="wordcloud"?r(6,h=oe.data):oe.channel==="trend"?r(8,f=oe.data):oe.channel==="kb_rating"?r(9,d=oe.data):oe.channel==="kb_scatter"?(r(10,c=oe.data),r(11,v=oe.scopeName)):oe.channel==="general_info"&&(p=oe.data,r(0,i=p.totalQuestions.value),((i-p.totalQuestions.delta)/p.totalQuestions.delta).toFixed(2),r(1,n=p.knowledgeSets.value),((n-p.knowledgeSets.delta)/p.knowledgeSets.delta).toFixed(2),r(2,a=p.documents.value),((a-p.documents.delta)/p.documents.delta).toFixed(2),r(4,s=p.contentStatistics))}}}function y(H){r(11,v=H.detail.scopeName),x(v)}function T(H,Y){r(13,m=H),r(14,_=Y),r(12,g=!0)}function w(){r(12,g=!1),r(13,m=""),r(14,_=null)}function E(H){H.target===H.currentTarget&&w()}function S(H){H.key==="Escape"&&w()}return ai(async()=>{r(3,o=await mc(localStorage.token)),await x()}),[i,n,a,o,s,l,h,u,f,d,c,v,g,m,_,y,T,w,E,S,()=>T("trend",f),()=>T("userRanking",l),()=>T("contentStats",s),()=>T("knowledgeGraph",{data:c,scopeName:v}),()=>T("wordCloud",h),()=>T("knowledgeSetUsage",u),()=>T("topRatedKnowledgeSet",d)]}class t_ extends Rr{constructor(t){super(),Nr(this,t,e_,J0,Pr,{},null,[-1,-1])}}function r_(e){let t,r;return t=new t_({}),{c(){it(t.$$.fragment)},l(i){nt(t.$$.fragment,i)},m(i,n){at(t,i,n),r=!0},p:Ef,i(i){r||(Xe(t.$$.fragment,i),r=!0)},o(i){je(t.$$.fragment,i),r=!1},d(i){ot(t,i)}}}class v_ extends Rr{constructor(t){super(),Nr(this,t,null,r_,Pr,{})}}export{v_ as component};

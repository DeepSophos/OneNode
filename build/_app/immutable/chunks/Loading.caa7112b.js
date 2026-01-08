import{s as j,l as x,y as L,o as k,i as b,n as V,d as o,e as p,z as w,t as T,c as v,a as m,A as D,b as A,f as n,g as u,h as S,m as B}from"./scheduler.2615d30e.js";import{S as N,i as P}from"./index.5861eef5.js";function I(c){let a,i,t,s,e,l,h,f,g;return{c(){a=p("div"),i=p("div"),t=p("div"),s=w("svg"),e=w("circle"),l=w("path"),h=x(),f=p("p"),g=T(c[1]),this.h()},l(r){a=v(r,"DIV",{class:!0});var d=m(a);i=v(d,"DIV",{class:!0});var _=m(i);t=v(_,"DIV",{class:!0});var y=m(t);s=D(y,"svg",{class:!0,xmlns:!0,fill:!0,viewBox:!0});var E=m(s);e=D(E,"circle",{class:!0,cx:!0,cy:!0,r:!0,stroke:!0,"stroke-width":!0}),m(e).forEach(o),l=D(E,"path",{class:!0,fill:!0,d:!0}),m(l).forEach(o),E.forEach(o),h=k(y),f=v(y,"P",{class:!0});var C=m(f);g=A(C,c[1]),C.forEach(o),y.forEach(o),_.forEach(o),d.forEach(o),this.h()},h(){n(e,"class","opacity-25"),n(e,"cx","12"),n(e,"cy","12"),n(e,"r","10"),n(e,"stroke","currentColor"),n(e,"stroke-width","4"),n(l,"class","opacity-75"),n(l,"fill","currentColor"),n(l,"d","M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"),n(s,"class","animate-spin h-8 w-8 text-indigo-600 mx-auto"),n(s,"xmlns","http://www.w3.org/2000/svg"),n(s,"fill","none"),n(s,"viewBox","0 0 24 24"),n(f,"class","mt-2 text-gray-600 dark:text-gray-300"),n(t,"class","text-center p-4"),n(i,"class","absolute inset-0 flex items-center justify-center z-10"),n(a,"class","w-full h-full relative")},m(r,d){b(r,a,d),u(a,i),u(i,t),u(t,s),u(s,e),u(s,l),u(t,h),u(t,f),u(f,g)},p(r,d){d&2&&S(g,r[1])},d(r){r&&o(a)}}}function z(c){let a,i,t,s,e,l,h,f,g=`.mask-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            backdrop-filter: blur(2px);
        }

        .loading-content {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .spinner {
            animate: spin 1s linear infinite;
            width: 2rem;
            height: 2rem;
            border: 3px solid #e5e7eb;
            border-top-color: #3b82f6;
            border-radius: 50%;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }`;return{c(){a=p("div"),i=p("div"),t=p("div"),s=x(),e=p("p"),l=T(c[1]),h=x(),f=p("style"),f.textContent=g,this.h()},l(r){a=v(r,"DIV",{class:!0});var d=m(a);i=v(d,"DIV",{class:!0});var _=m(i);t=v(_,"DIV",{class:!0}),m(t).forEach(o),s=k(_),e=v(_,"P",{class:!0});var y=m(e);l=A(y,c[1]),y.forEach(o),_.forEach(o),d.forEach(o),h=k(r),f=v(r,"STYLE",{"data-svelte-h":!0}),B(f)!=="svelte-v287lu"&&(f.textContent=g),this.h()},h(){n(t,"class","spinner"),n(e,"class","text-gray-700 font-medium"),n(i,"class","loading-content"),n(a,"class","mask-overlay")},m(r,d){b(r,a,d),u(a,i),u(i,t),u(i,s),u(i,e),u(e,l),b(r,h,d),b(r,f,d)},p(r,d){d&2&&S(l,r[1])},d(r){r&&(o(a),o(h),o(f))}}}function q(c){let a,i,t=c[0]&&c[2]==="modal"&&I(c),s=c[0]&&c[2]==="page"&&z(c);return{c(){t&&t.c(),a=x(),s&&s.c(),i=L()},l(e){t&&t.l(e),a=k(e),s&&s.l(e),i=L()},m(e,l){t&&t.m(e,l),b(e,a,l),s&&s.m(e,l),b(e,i,l)},p(e,[l]){e[0]&&e[2]==="modal"?t?t.p(e,l):(t=I(e),t.c(),t.m(a.parentNode,a)):t&&(t.d(1),t=null),e[0]&&e[2]==="page"?s?s.p(e,l):(s=z(e),s.c(),s.m(i.parentNode,i)):s&&(s.d(1),s=null)},i:V,o:V,d(e){e&&(o(a),o(i)),t&&t.d(e),s&&s.d(e)}}}function F(c,a,i){let{isLoading:t}=a,{message:s="数据加载中..."}=a,{loadType:e="modal"}=a;return c.$$set=l=>{"isLoading"in l&&i(0,t=l.isLoading),"message"in l&&i(1,s=l.message),"loadType"in l&&i(2,e=l.loadType)},[t,s,e]}class Y extends N{constructor(a){super(),P(this,a,F,q,j,{isLoading:0,message:1,loadType:2})}}export{Y as L};

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["collect"],{"0c03":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"collect"}},[i("mt-header",{attrs:{fixed:"",title:"我的收藏"}},[i("mt-button",{attrs:{slot:"right"},on:{click:t.clear},slot:"right"},[t._v("清空收藏")])],1),t._l(t.list,(function(e,s){return i("div",{key:s,staticClass:"list"},[i("van-cell",{staticClass:"item"},[i("van-tag",{staticClass:"tag",attrs:{mark:"",size:"medium",type:"success"}},[t._v(t._s(e.category))]),i("van-tag",{staticClass:"del",attrs:{size:"large",type:"danger"},on:{click:function(e){return t.del(s)}}},[t._v("删除")]),i("div",{staticClass:"title"},[t._v(t._s(e.title))]),i("img",{attrs:{src:e.pic,alt:""}}),i("div",{staticClass:"detail"},[i("span",[t._v("来源："+t._s(e.src))]),i("span",{staticClass:"time"},[t._v(t._s(e.time))])])],1)],1)})),t.empty?i("van-empty",{attrs:{image:"error",description:"收藏夹一尘不染~"}}):t._e()],2)},a=[],n=(i("a434"),{data:function(){return{list:[],empty:!1}},methods:{del:function(t){this.list.splice(t,1),0===this.list.length&&(this.empty=!0);var e=JSON.stringify(this.list);window.localStorage.setItem("collect",e)},clear:function(){var t=this;this.$messagebox({title:"提示",message:"您正在清空全部收藏",showCancelButton:!0}).then((function(e){if("confirm"===e){t.list.splice(0),t.empty=!0;var i=JSON.stringify(t.list);window.localStorage.setItem("collect",i)}}))}},mounted:function(){var t=window.localStorage.getItem("collect");0==JSON.parse(t).length?this.empty=!0:(this.empty=!1,this.list=JSON.parse(window.localStorage.getItem("collect")))}}),l=n,r=(i("4f54"),i("2877")),c=Object(r["a"])(l,s,a,!1,null,"48702602",null);e["default"]=c.exports},"4f54":function(t,e,i){"use strict";var s=i("9e7d"),a=i.n(s);a.a},"9e7d":function(t,e,i){},a434:function(t,e,i){"use strict";var s=i("23e7"),a=i("23cb"),n=i("a691"),l=i("50c4"),r=i("7b0b"),c=i("65f0"),o=i("8418"),f=i("1dde"),u=i("ae40"),d=f("splice"),m=u("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,h=Math.min,p=9007199254740991,v="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!d||!m},{splice:function(t,e){var i,s,f,u,d,m,w=r(this),S=l(w.length),y=a(t,S),C=arguments.length;if(0===C?i=s=0:1===C?(i=0,s=S-y):(i=C-2,s=h(g(n(e),0),S-y)),S+i-s>p)throw TypeError(v);for(f=c(w,s),u=0;u<s;u++)d=y+u,d in w&&o(f,u,w[d]);if(f.length=s,i<s){for(u=y;u<S-s;u++)d=u+s,m=u+i,d in w?w[m]=w[d]:delete w[m];for(u=S;u>S-s+i;u--)delete w[u-1]}else if(i>s)for(u=S-s;u>y;u--)d=u+s-1,m=u+i-1,d in w?w[m]=w[d]:delete w[m];for(u=0;u<i;u++)w[u+y]=arguments[u+2];return w.length=S-s+i,f}})},ae40:function(t,e,i){var s=i("83ab"),a=i("d039"),n=i("5135"),l=Object.defineProperty,r={},c=function(t){throw t};t.exports=function(t,e){if(n(r,t))return r[t];e||(e={});var i=[][t],o=!!n(e,"ACCESSORS")&&e.ACCESSORS,f=n(e,0)?e[0]:c,u=n(e,1)?e[1]:void 0;return r[t]=!!i&&!a((function(){if(o&&!s)return!0;var t={length:-1};o?l(t,1,{enumerable:!0,get:c}):t[1]=1,i.call(t,f,u)}))}}}]);
//# sourceMappingURL=collect.f1a6c8d7.js.map
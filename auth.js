!function t(e,n,i){function r(a,s){if(!n[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var h=n[a]={exports:{}};e[a][0].call(h.exports,(function(t){return r(e[a][1][t]||t)}),h,h.exports,t,e,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(t,e,n){(function(t){var n="application/x-postmate-v1+json",i=0,r=function(){var t;return d.debug?(t=console).log.apply(t,arguments):null},o={handshake:1,"handshake-reply":1,call:1,emit:1,reply:1,request:1},a=function(t,e){return("string"!=typeof e||t.origin===e)&&(!!t.data&&(("object"!=typeof t.data||"postmate"in t.data)&&(t.data.type===n&&!!o[t.data.postmate])))},s=function(){function e(e){var n=this;this.parent=e.parent,this.frame=e.frame,this.child=e.child,this.childOrigin=e.childOrigin,this.events={},"production"!==t.env.NODE_ENV&&(r("Parent: Registering API"),r("Parent: Awaiting messages...")),this.listener=function(e){if(!a(e,n.childOrigin))return!1;var i=((e||{}).data||{}).value||{},o=i.data,s=i.name;"emit"===e.data.postmate&&("production"!==t.env.NODE_ENV&&r("Parent: Received event emission: "+s),s in n.events&&n.events[s].call(n,o))},this.parent.addEventListener("message",this.listener,!1),"production"!==t.env.NODE_ENV&&r("Parent: Awaiting event emissions from Child")}var o=e.prototype;return o.get=function(t){var e=this;return new d.Promise((function(r){var o=++i;e.parent.addEventListener("message",(function t(n){n.data.uid===o&&"reply"===n.data.postmate&&(e.parent.removeEventListener("message",t,!1),r(n.data.value))}),!1),e.child.postMessage({postmate:"request",type:n,property:t,uid:o},e.childOrigin)}))},o.call=function(t,e){this.child.postMessage({postmate:"call",type:n,property:t,data:e},this.childOrigin)},o.on=function(t,e){this.events[t]=e},o.destroy=function(){"production"!==t.env.NODE_ENV&&r("Parent: Destroying Postmate instance"),window.removeEventListener("message",this.listener,!1),this.frame.parentNode.removeChild(this.frame)},e}(),c=function(){function e(e){var i=this;this.model=e.model,this.parent=e.parent,this.parentOrigin=e.parentOrigin,this.child=e.child,"production"!==t.env.NODE_ENV&&(r("Child: Registering API"),r("Child: Awaiting messages...")),this.child.addEventListener("message",(function(e){if(a(e,i.parentOrigin)){"production"!==t.env.NODE_ENV&&r("Child: Received request",e.data);var o=e.data,s=o.property,c=o.uid,h=o.data;"call"!==e.data.postmate?function(t,e){var n="function"==typeof t[e]?t[e]():t[e];return d.Promise.resolve(n)}(i.model,s).then((function(t){return e.source.postMessage({property:s,postmate:"reply",type:n,uid:c,value:t},e.origin)})):s in i.model&&"function"==typeof i.model[s]&&i.model[s](h)}}))}return e.prototype.emit=function(e,i){"production"!==t.env.NODE_ENV&&r('Child: Emitting Event "'+e+'"',i),this.parent.postMessage({postmate:"emit",type:n,value:{name:e,data:i}},this.parentOrigin)},e}(),d=function(){function e(t){var e=t.container,n=void 0===e?void 0!==n?n:document.body:e,i=t.model,r=t.url,o=t.name,a=t.classListArray,s=void 0===a?[]:a;return this.parent=window,this.frame=document.createElement("iframe"),this.frame.name=o||"",this.frame.classList.add.apply(this.frame.classList,s),n.appendChild(this.frame),this.child=this.frame.contentWindow||this.frame.contentDocument.parentWindow,this.model=i||{},this.sendHandshake(r)}return e.prototype.sendHandshake=function(i){var o,c=this,d=function(t){var e=document.createElement("a");e.href=t;var n=e.protocol.length>4?e.protocol:window.location.protocol,i=e.host.length?"80"===e.port||"443"===e.port?e.hostname:e.host:window.location.host;return e.origin||n+"//"+i}(i),h=0;return new e.Promise((function(e,u){c.parent.addEventListener("message",(function n(i){return!!a(i,d)&&("handshake-reply"===i.data.postmate?(clearInterval(o),"production"!==t.env.NODE_ENV&&r("Parent: Received handshake reply from Child"),c.parent.removeEventListener("message",n,!1),c.childOrigin=i.origin,"production"!==t.env.NODE_ENV&&r("Parent: Saving Child origin",c.childOrigin),e(new s(c))):("production"!==t.env.NODE_ENV&&r("Parent: Invalid handshake reply"),u("Failed handshake")))}),!1);var l=function(){h++,"production"!==t.env.NODE_ENV&&r("Parent: Sending handshake attempt "+h,{childOrigin:d}),c.child.postMessage({postmate:"handshake",type:n,model:c.model},d),5===h&&clearInterval(o)},p=function(){l(),o=setInterval(l,500)};c.frame.attachEvent?c.frame.attachEvent("onload",p):c.frame.onload=p,"production"!==t.env.NODE_ENV&&r("Parent: Loading frame",{url:i}),c.frame.src=i}))},e}();d.debug=!1,d.Promise=function(){try{return window?window.Promise:Promise}catch(t){return null}}(),d.Model=function(){function e(t){return this.child=window,this.model=t,this.parent=this.child.parent,this.sendHandshakeReply()}return e.prototype.sendHandshakeReply=function(){var e=this;return new d.Promise((function(i,o){e.child.addEventListener("message",(function a(s){if(s.data.postmate){if("handshake"===s.data.postmate){"production"!==t.env.NODE_ENV&&r("Child: Received handshake from Parent"),e.child.removeEventListener("message",a,!1),"production"!==t.env.NODE_ENV&&r("Child: Sending handshake reply to Parent"),s.source.postMessage({postmate:"handshake-reply",type:n},s.origin),e.parentOrigin=s.origin;var d=s.data.model;return d&&(Object.keys(d).forEach((function(t){e.model[t]=d[t]})),"production"!==t.env.NODE_ENV&&r("Child: Inherited and extended model from Parent")),"production"!==t.env.NODE_ENV&&r("Child: Saving Parent origin",e.parentOrigin),i(new c(e))}return o("Handshake Reply Failed")}}),!1)}))},e}(),e.exports=d}).call(this,t("_process"))},{_process:2}],2:[function(t,e,n){var i,r,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function c(t){if(i===setTimeout)return setTimeout(t,0);if((i===a||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(e){try{return i.call(null,t,0)}catch(e){return i.call(this,t,0)}}}!function(){try{i="function"==typeof setTimeout?setTimeout:a}catch(t){i=a}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(t){r=s}}();var d,h=[],u=!1,l=-1;function p(){u&&d&&(u=!1,d.length?h=d.concat(h):l=-1,h.length&&m())}function m(){if(!u){var t=c(p);u=!0;for(var e=h.length;e;){for(d=h,h=[];++l<e;)d&&d[l].run();l=-1,e=h.length}d=null,u=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function f(t,e){this.fun=t,this.array=e}function v(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new f(t,e)),1!==h.length||u||c(m)},f.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}],3:[function(t,e,n){const i=t("postmate");const r=new class{async init(){var t=document.createElement("style");t.type="text/css",t.innerHTML=".twetchAuthFrame {\n\t\t\tborder: none;\n\t\t\toverflow: hidden;\n\t\t\twidth: 0px;\n\t\t\theight: 0px;\n\t\t\tposition: fixed;\n\t\t\tbottom: 0;\n\t\t\tleft: 0;\n\t\t}",document.getElementsByTagName("head")[0].appendChild(t);const e=new URLSearchParams(window.location.search).get("tncpw_session");this.child=await new i({container:document.body,url:e?`https://auth.twetch.com/sign-up?tncpw_session=${e}`:"https://auth.twetch.com",classListArray:["twetchAuthFrame"]}),this.iframe=this.child.frame,this.child.on("init",t=>{this.displayIframe(),this.didInit=!0})}displayIframe(){this.iframe.style.height="100%",this.iframe.style.width="100vw"}hideIframe(){this.iframe.style.width="0px",this.iframe.style.height="0px"}token(){return new Promise((t,e)=>{this.child.on("tokenTwetchAuth",({token:e})=>t(e))})}logout(){}};window.addEventListener("load",(function(){r.init()})),window.twetchAuth=r},{postmate:1}]},{},[3]);
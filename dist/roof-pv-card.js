const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:a,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:d}=Object,p=globalThis,u=p.trustedTypes,f=u?u.emptyScript:"",$=p.reactiveElementPolyfillSupport,m=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!r(t,e),v={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&a(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);n?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:g).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=i;const o=n.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const o=this.constructor;if(!1===i&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??_)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,$?.({ReactiveElement:y}),(p.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,b=w.trustedTypes,k=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+M,E=`<${S}>`,C=document,z=()=>C.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,I="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,H=/>/g,R=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,j=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),F=j(1),W=j(2),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,K=C.createTreeWalker(C,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=O;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(r.lastIndex=h,l=r.exec(s),null!==l);)h=r.lastIndex,r===O?"!--"===l[1]?r=T:void 0!==l[1]?r=H:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=n??O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?R:'"'===l[3]?D:N):r===D||r===N?r=R:r===T||r===H?r=O:(r=R,n=void 0);const d=r===R&&t[e+1].startsWith("/>")?" ":"";o+=r===O?s+E:c>=0?(i.push(a),s.slice(0,c)+A+s.slice(c)+M+d):s+M+(-2===c?e:d)}return[Z(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=G(t,e);if(this.el=J.createElement(l,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(A)){const e=c[o++],s=i.getAttribute(t).split(M),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(M),e=t.length-1;if(e>0){i.textContent=b?b.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],z()),K.nextNode(),a.push({type:2,index:++n});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(M,t+1));)a.push({type:7,index:n}),t+=M.length-1}n++}}static createElement(t,e){const s=C.createElement("template");return s.innerHTML=t,s}}function Y(t,e,s=t,i){if(e===B)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=P(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??C).importNode(e,!0);K.currentNode=i;let n=K.nextNode(),o=0,r=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=s[++r]}o!==a?.index&&(n=K.nextNode(),o++)}return K.currentNode=C,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),P(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(Z(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new X(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=Y(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Y(this,i[s+r],e,r),a===B&&(a=this._$AH[r]),o||=!P(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??q)===B)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(J,X),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class at extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new X(e.insertBefore(z(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct=["power_ch_1","power_ch_2","temperature","frequency","voltage","signal","online"],ht={up:0,right:90,down:180,left:270};function dt(t,e){return"number"==typeof t.azimuth?pt(t.azimuth):t.slope?pt(ht[t.slope]-e):180}const pt=t=>(t%360+360)%360,ut=(t,e)=>`${t}:${e}`;const ft=Math.PI/180,$t=23.4397*ft;function mt(t,e,s){const i=ft*-s,n=ft*e,o=(t=>t.valueOf()/864e5-.5+2440588-2451545)(t),r=function(t){const e=ft*(357.5291+.98560028*t),s=e+ft*(1.9148*Math.sin(e)+.02*Math.sin(2*e)+3e-4*Math.sin(3*e))+102.9372*ft+Math.PI;return{dec:Math.asin(Math.sin(0)*Math.cos($t)+Math.cos(0)*Math.sin($t)*Math.sin(s)),ra:Math.atan2(Math.sin(s)*Math.cos($t)-Math.tan(0)*Math.sin($t),Math.cos(s))}}(o),a=ft*(280.16+360.9856235*o)-i-r.ra,l=Math.atan2(Math.sin(a),Math.cos(a)*Math.sin(n)-Math.tan(r.dec)*Math.cos(n)),c=Math.asin(Math.sin(n)*Math.sin(r.dec)+Math.cos(n)*Math.cos(r.dec)*Math.cos(a));return{azimuth:(l/ft+180+360)%360,elevation:c/ft}}function gt(t,e,s,i=5){const n=new Date(t);n.setHours(0,0,0,0);const o=[];let r,a,l,c,h,d=-90;const p=-.833;for(let t=0;t<=1440;t+=i){const i=new Date(n.getTime()+6e4*t),u=mt(i,e,s);c&&h&&(c.elevation<p&&u.elevation>=p&&(r=_t(h,i,c.elevation,u.elevation,p)),c.elevation>=p&&u.elevation<p&&(a=_t(h,i,c.elevation,u.elevation,p))),u.elevation>d&&(d=u.elevation,l=i),u.elevation>=p-1&&o.push({t:i,...u}),c=u,h=i}return{sunrise:r,sunset:a,noon:l,path:o}}function _t(t,e,s,i,n){const o=(n-s)/(i-s);return new Date(t.getTime()+o*(e.getTime()-t.getTime()))}function vt(t,e,s){if(t.elevation<=0)return 0;const i=t.elevation*ft,n=s*ft,o=Math.sin(i)*Math.cos(n)+Math.cos(i)*Math.sin(n)*Math.cos((t.azimuth-e)*ft);return Math.max(0,o)}function yt(t,e){if(!t.length)return"";const s=e.res??.05,i=e.margin+e.merge;let n=1/0,o=1/0,r=-1/0,a=-1/0;for(const e of t)n=Math.min(n,e.x),o=Math.min(o,e.y),r=Math.max(r,e.x+e.w),a=Math.max(a,e.y+e.h);const l=i+2*s;n-=l,o-=l,r+=l,a+=l;const c=Math.ceil((r-n)/s),h=Math.ceil((a-o)/s);let d=new Uint8Array(c*h);for(const e of t){const t=Math.max(0,Math.round((e.x-i-n)/s)),r=Math.min(c,Math.round((e.x+e.w+i-n)/s)),a=Math.max(0,Math.round((e.y-i-o)/s)),l=Math.min(h,Math.round((e.y+e.h+i-o)/s));for(let e=a;e<l;e++)d.fill(1,e*c+t,e*c+r)}const p=Math.round(e.merge/s);p>0&&(d=function(t,e,s,i){const n=new Uint8Array(e*s);for(let o=0;o<s;o++){let s=0;const r=o*e,a=new Int32Array(e);for(let i=0;i<e;i++)s=t[r+i]?s+1:0,a[i]=s;s=0;for(let o=e-1;o>=0;o--)s=t[r+o]?s+1:0,a[o]>i&&s>i&&(n[r+o]=1)}const o=new Uint8Array(e*s),r=new Int32Array(e*s);for(let t=0;t<e;t++){let a=0;for(let i=0;i<s;i++)a=n[i*e+t]?a+1:0,r[i*e+t]=a;a=0;for(let l=s-1;l>=0;l--)a=n[l*e+t]?a+1:0,r[l*e+t]>i&&a>i&&(o[l*e+t]=1)}return o}(d,c,h,p));const u=(t,e)=>t>=0&&e>=0&&t<c&&e<h?d[e*c+t]:0,f=new Map,$=(t,e)=>e*(c+1)+t,m=(t,e,s,i)=>{const n=$(t,e),o=f.get(n);o?o.push($(s,i)):f.set(n,[$(s,i)])};for(let t=0;t<h;t++)for(let e=0;e<c;e++)d[t*c+e]&&(u(e,t-1)||m(e,t,e+1,t),u(e+1,t)||m(e+1,t,e+1,t+1),u(e,t+1)||m(e+1,t+1,e,t+1),u(e-1,t)||m(e,t+1,e,t));const g=[],_=t=>n+t%(c+1)*s,v=t=>o+Math.floor(t/(c+1))*s;for(const t of[...f.keys()])for(;f.get(t)?.length;){const e=[t];let s=f.get(t).pop(),i=0;for(;s!==t&&i++<1e6;){e.push(s);const t=f.get(s);if(!t||!t.length)break;s=t.pop()}const n=[];for(let t=0;t<e.length;t++){const s=e[(t-1+e.length)%e.length],i=e[t],o=e[(t+1)%e.length],r=_(i)-_(s),a=v(i)-v(s),l=_(o)-_(i),c=v(o)-v(i);Math.abs(r*c-a*l)>1e-9&&n.push(i)}n.length<3||g.push("M"+n.map(t=>`${_(t).toFixed(3)},${v(t).toFixed(3)}`).join("L")+"Z")}return g.join("")}const wt={missing:5,offline:4,fault:3,low:2,ok:1,night:0},xt={missing:"no entities",offline:"offline",fault:"no output",low:"low output",ok:"ok",night:"night"},bt={missing:"#9e9e9e",offline:"#e53935",fault:"#e53935",low:"#fb8c00",ok:"#43a047",night:"#5c6bc0"},kt=[[0,"#0b0f14"],[.12,"#122a4d"],[.35,"#1d5fa3"],[.6,"#2fa8d5"],[.82,"#f2c14e"],[1,"#fff1b8"]],At="#0e1a2b",Mt=[[0,"#7f1d1d"],[.5,"#d32f2f"],[.75,"#f57c00"],[.9,"#fbc02d"],[1,"#2e7d32"]];function St(t){const e=parseInt(t.slice(1),16);return[e>>16&255,e>>8&255,255&e]}function Et(t,e){e=Math.max(0,Math.min(1,e));for(let s=1;s<t.length;s++)if(e<=t[s][0]){const[i,n]=t[s-1],[o,r]=t[s],a=(e-i)/(o-i||1),l=St(n),c=St(r),h=l.map((t,e)=>Math.round(t+(c[e]-t)*a));return`rgb(${h[0]},${h[1]},${h[2]})`}return t[t.length-1][1]}const Ct=t=>{if(null==t)return null;if("unavailable"===t||"unknown"===t||""===t||"None"===t)return null;const e=parseFloat(t);return isFinite(e)?e:null},zt=t=>{if(void 0===t)return null;const e=t.toLowerCase();return!!["true","on","1","online","yes"].includes(e)||!["false","off","0","offline","no"].includes(e)&&null},Pt=(t,e=1)=>null!=t&&isFinite(t)?Math.abs(t)>=1e3?`${(t/1e3).toFixed(0===e?1:2)} kW`:`${Math.round(t)} W`:"–",Ut=(t,e,s=0)=>null!=t&&isFinite(t)?`${t.toFixed(s)} ${e}`:"–",It=t=>null!=t&&isFinite(t)?`${Math.round(100*t)} %`:"–",Ot=t=>{if(!t.length)return null;const e=[...t].sort((t,e)=>t-e),s=e.length>>1;return e.length%2?e[s]:(e[s-1]+e[s])/2},Tt=t=>t?t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"–",Ht=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Rt=["header","roof","sun","strings","inverters","inventory"];class Nt extends at{constructor(){super(...arguments),this._mode="power",this._tick=0,this._showAllInventory=!1,this._picked=[],this._watched=[],this._outline=""}static getStubConfig(){return{title:"Roof PV",panel_wp:400,north:0,entity_pattern:"sensor.inverter_{serial}_{key}",faces:[{name:"South",slope:"down",tilt:30,x:0,y:0,map:"1a 1a 1b 1b\n1a 1a 1b 1b"}],inverters:[{slot:1,serial:"000000000000"}]}}setConfig(t){if(!t||!Array.isArray(t.faces)||!t.faces.length)throw new Error('roof-pv-card: "faces" is required');if(!Array.isArray(t.inverters)||!t.inverters.length)throw new Error('roof-pv-card: "inverters" is required');this._config=t,this._model=function(t){const e=t.north??0,[s,i]=t.panel_size??[.6,1.2],n=[],o=new Map,r=[],a=[],l=new Set(t.inverters.map(t=>t.slot));t.faces.forEach((t,c)=>{const[h,d]=t.panel_size??[s,i],p=t,u=Number(t.position?.[0]??t.left??t.x??0),f=Number(t.position?.[1]??t.top??t.y??p.true??0),$=(t.map||"").split("\n").map(t=>t.trim()).filter(t=>t.length),m=[],g=new Set;let _=0;$.forEach((e,s)=>{const i=e.split(/\s+/);_=Math.max(_,i.length),i.forEach((e,i)=>{if("."===e)return;const r={x:u+i*h,y:f+s*d,w:h,h:d,face:c,row:s+1,col:i+1};if("-"===e)r.roof=!0;else if("x"===e.toLowerCase())r.dummy=!0;else{const i=/^(\d+)([ab12])$/i.exec(e);if(!i)return void n.push(`${t.name}: unknown token "${e}" in row ${s+1}`);const a=parseInt(i[1],10),h=/[a1]/i.test(i[2])?0:1;l.has(a)||n.push(`${t.name}: slot ${a} is not configured under inverters`),r.slot=a,r.input=h,g.add(a);const d=ut(a,h),p=o.get(d)??{slot:a,input:h,panels:0,faces:new Set};p.panels++,p.faces.add(c),o.set(d,p)}m.push(r),a.push(r)})}),r.push({index:c,name:t.name??`Face ${c+1}`,azimuth:dt(t,e),tilt:t.tilt??30,slope:t.slope,bbox:{x:u,y:f,w:_*h,h:$.length*d},cells:m,panels:m.filter(t=>!t.dummy&&!t.roof).length,slots:g})});for(const e of t.inverters)for(const t of[0,1])o.has(ut(e.slot,t))||n.push(`Inverter ${e.slot}: input ${t+1} has no panels in any face map`);let c=1/0,h=1/0,d=-1/0,p=-1/0;for(const t of r)c=Math.min(c,t.bbox.x),h=Math.min(h,t.bbox.y),d=Math.max(d,t.bbox.x+t.bbox.w),p=Math.max(p,t.bbox.y+t.bbox.h);return isFinite(c)||(c=0,h=0,d=1,p=1),{faces:r,cells:a,inputs:o,bbox:{x:c,y:h,w:d-c,h:p-h},totalPanels:a.filter(t=>!t.dummy&&!t.roof).length,warnings:n}}(t),this._outline="panels"===(t.outline??"panels")?yt(this._model.cells,{margin:t.outline_margin??.1,merge:t.outline_merge??.35}):"",this._mode=t.mode??"power",this._watched=this._collectWatched(t)}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6,rows:"auto"}}getLayoutOptions(){return{grid_columns:"full",grid_min_columns:4}}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>this._tick=Date.now(),6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}_entity(t,e){if(t.entities?.[e])return t.entities[e];if(t.prefix)return`${t.prefix}_${e}`;return(this._config?.entity_pattern??"sensor.inverter_{serial}_{key}").replace("{serial}",t.serial).replace("{key}",e)}_collectWatched(t){const e=[];for(const s of t.inverters)for(const t of ct)e.push(this._entity(s,t));for(const s of t.strings??[])s.breaker&&e.push(s.breaker);return t.total_power_entity&&e.push(t.total_power_entity),t.today_energy_entity&&e.push(t.today_energy_entity),e}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;const e=t.get("hass");if(!e||!this.hass)return!0;for(const t of this._watched)if(e.states[t]!==this.hass.states[t])return!0;return!1}_snapshot(){const t=this._config,e=this._model,s=this.hass,i=t.latitude??s.config.latitude,n=t.longitude??s.config.longitude,o=mt(new Date,i,n),r=o.elevation>(t.daylight_elevation??5),a=new Map;for(const e of t.inverters){const t=s.states[this._entity(e,"power_ch_1")],i=s.states[this._entity(e,"power_ch_2")];a.set(e.slot,{inv:e,missing:!t&&!i,p:[Ct(t?.state),Ct(i?.state)]})}const l=(t,s)=>{const i=e.inputs.get(ut(t,s));return i?[...i.faces][0]:void 0},c=t=>void 0===t?"x":String(5*Math.round(e.faces[t].azimuth/5)),h=new Map;for(const[t,s]of a)for(const i of[0,1]){const n=e.inputs.get(ut(t,i)),o=s.p[i];if(!n||null===o)continue;const r=c(l(t,i)),a=h.get(r)??[];a.push(o/n.panels),h.set(r,a)}const d=new Map;for(const[t,e]of h)d.set(t,Ot(e));const p=new Map;let u=0;for(const[t,i]of a){const n=i.inv,o=t=>s.states[this._entity(n,t)],a=zt(o("online")?.state),h=[0,1].map(s=>{const n=e.inputs.get(ut(t,s)),o=n?.panels??0,a=i.p[s],h=null!==a&&o?a/o:null,p=d.get(c(l(t,s)))??null,u=null!==h&&p&&p>0?h/p:null;let f;return f=i.missing?"missing":null===a?r?"offline":"night":r?null===p||p<5?"ok":h<.1*p?"fault":h<.7*p?"low":"ok":"night",{panels:o,power:a,wpp:h,rel:u,ref:p,status:f}});let f=wt[h[0].status]>=wt[h[1].status]?h[0].status:h[1].status;r&&!1===a&&wt[f]<wt.offline&&(f="offline");const $=null===i.p[0]&&null===i.p[1]?null:(i.p[0]??0)+(i.p[1]??0);$&&(u+=$),p.set(t,{inv:n,missing:i.missing,online:a,inputs:h,power:$,temperature:Ct(o("temperature")?.state),frequency:Ct(o("frequency")?.state),voltage:Ct(o("voltage")?.state),signal:Ct(o("signal")?.state),status:f,lastUpdate:o("power_ch_1")?.attributes?.last_data_update??o("power_ch_1")?.last_updated})}const f=e.faces.map(t=>{let e=0;for(const s of t.cells){if(void 0===s.slot||void 0===s.input)continue;const t=p.get(s.slot)?.inputs[s.input];t?.wpp&&(e+=t.wpp)}return{power:e,panels:t.panels,wpp:t.panels?e/t.panels:null,incidence:vt(o,t.azimuth,t.tilt)}});return{sun:o,day:r,inv:p,total:u,faces:f}}render(){if(!this._config||!this._model||!this.hass)return q;const t=this._snapshot(),e=this._config.show??Rt,s={header:()=>this._renderHeader(t),roof:()=>this._renderRoof(t),sun:()=>this._renderSun(t),strings:()=>this._renderStrings(t),inverters:()=>this._renderInverters(t),inventory:()=>this._renderInventory(t)};return F`<ha-card>
      ${e.map(t=>s[t]?s[t]():q)}
      ${this._model.warnings.length?F`<div class="warn">${this._model.warnings.map(t=>F`<div>⚠ ${t}</div>`)}</div>`:q}
    </ha-card>`}_renderHeader(t){const e=this._config,s=e.total_power_entity?Ct(this.hass.states[e.total_power_entity]?.state):null,i=e.today_energy_entity?this.hass.states[e.today_energy_entity]:void 0,n=(e.panel_wp??0)*this._model.totalPanels,o=s??t.total,r={};for(const e of t.inv.values())r[e.status]=(r[e.status]??0)+1;return F`<div class="header">
      <div class="title">${e.title??"Roof PV"}</div>
      <div class="kpis">
        <div class="kpi"><span class="v">${Pt(o)}</span><span class="l">now${n?F` · ${It(o/n)} of ${(n/1e3).toFixed(1)} kWp`:q}</span></div>
        ${i?F`<div class="kpi clickable" @click=${()=>this._moreInfo(i.entity_id)}>
              <span class="v">${i.state} ${i.attributes.unit_of_measurement??""}</span><span class="l">today</span>
            </div>`:q}
        <div class="kpi">
          <span class="v status-row">
            ${["offline","fault","low","missing"].filter(t=>r[t]).map(t=>F`<span class="chip" style="--c:${bt[t]}">${r[t]} ${xt[t]}</span>`)}
            ${r.offline||r.fault||r.low||r.missing?q:F`<span class="chip" style="--c:${t.day?bt.ok:bt.night}">${t.inv.size} ${t.day?"ok":"night"}</span>`}
          </span>
          <span class="l">${t.inv.size} inverters · ${this._model.totalPanels} panels</span>
        </div>
      </div>
      <div class="modes">
        <button class=${"power"===this._mode?"on":""} @click=${()=>this._mode="power"}>Power</button>
        <button class=${"relative"===this._mode?"on":""} @click=${()=>this._mode="relative"}>Relative</button>
      </div>
    </div>`}_cellColor(t,e,s){const i=t.inv.get(e),n=i?.inputs[s];if(!i||!n)return{fill:"#3a3a3a",status:"missing"};if("missing"===n.status||"offline"===n.status)return{fill:"#1a1a1a",status:n.status,s:n};const o=t.day&&null!==n.rel?Et(Mt,n.rel):"#2fa8d5";if("relative"===this._mode)return t.day&&null!==n.rel?{fill:o,status:n.status,s:n}:{fill:At,status:n.status,s:n};const r=this._config.panel_wp??400,a=Math.max(0,Math.min(1,(n.wpp??0)/r));return{fill:At,status:n.status,s:n,bar:{frac:a,color:o}}}_renderRoof(t){const e=this._model,s=this._config.slot_labels??"eave",i="eave"===s?.75:.5,n=[e.bbox.x-i,e.bbox.y-i,e.bbox.w+2*i+2.2,e.bbox.h+2*i],o=this._config.north??0,r=this._selected,a=this._hoverKey,l=this._config.outline??"panels",c="faces"===l?e.faces.map(t=>{const e=t.bbox;return W`<rect class="face" x=${e.x-.08} y=${e.y-.08} width=${e.w+.16} height=${e.h+.16} rx="0.08"></rect>`}):"panels"===l&&this._outline?W`<path class="face" d=${this._outline} fill-rule="evenodd"></path>`:q,h=e.cells.map(e=>{if(e.roof)return q;if(e.dummy)return W`<rect class="dummy" x=${e.x+.02} y=${e.y+.02} width=${e.w-.04} height=${e.h-.04}></rect>`;const{fill:s,status:i,s:n,bar:o}=this._cellColor(t,e.slot,e.input),l=.08,c=o?(e.h-.16)*o.frac:0,h=ut(e.slot,e.input),d=void 0!==r&&r!==e.slot,p=r===e.slot||a===h,u=this._picked.includes(this._cellId(e)),f=`Inverter ${e.slot} · input ${e.input+1} · ${n?.panels??0} panels\n${Pt(n?.power)} · ${null!=n?.wpp?Math.round(n.wpp)+" W/panel":"–"} · ${It(n?.rel)} of median\n${xt[i]}`;return W`<g class="cell ${d?"dim":""}" @click=${t=>this._cellClick(t,e)}
          @mouseenter=${()=>this._hoverKey=h} @mouseleave=${()=>this._hoverKey=void 0}>
        <title>${f}</title>
        <rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} fill=${s} class="panel"></rect>
        ${o&&c>.005?W`<rect x=${e.x+l} y=${e.y+e.h-l-c} width=${e.w-.16} height=${c} fill=${o.color} rx="0.02" pointer-events="none"></rect>`:q}
        <rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} fill="url(#glass)" pointer-events="none"></rect>
        ${"offline"===i||"missing"===i?W`<rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} fill="url(#hatch-${i})" pointer-events="none"></rect>`:q}
        ${"fault"===i||"low"===i?W`<rect x=${e.x+.06} y=${e.y+.06} width=${e.w-.12} height=${e.h-.12} fill="none" stroke=${bt[i]} stroke-width="0.05" pointer-events="none"></rect>`:q}
        ${u?W`<circle cx=${e.x+e.w/2} cy=${e.y+e.h/2} r=${.22*Math.min(e.w,e.h)} class="pick" pointer-events="none"></circle>`:q}
        ${p?W`<rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} class="hl" pointer-events="none"></rect>`:q}
      </g>`}),d=[];for(const t of e.faces){const e=new Map;for(const s of t.cells){if(void 0===s.slot)continue;const t=e.get(s.slot)??{x:0,y:0,n:0};t.x+=s.x+s.w/2,t.y+=s.y+s.h/2,t.n++,e.set(s.slot,t)}const i=t.bbox,n=.38;for(const[o,r]of e){const e=r.x/r.n,a=r.y/r.n;if("none"===s)continue;if("center"===s||!t.slope){d.push(W`<text class="slot" x=${e} y=${a} pointer-events="none">${o}</text>`);continue}const l=t.cells.filter(t=>t.slot===o),c="down"===t.slope||"up"===t.slope,h=e=>"down"===t.slope?e.row:"up"===t.slope?-e.row:"right"===t.slope?e.col:-e.col,p=Math.max(...l.map(h)),u=l.filter(t=>h(t)===p),f=u.reduce((t,e)=>t+(c?e.x+e.w/2:e.y+e.h/2),0)/u.length,[$,m]="down"===t.slope?[f,i.y+i.h+n]:"up"===t.slope?[f,i.y-n]:"left"===t.slope?[i.x-n,f]:[i.x+i.w+n,f],g=this._selected===o;d.push(W`<text class="slot eave ${g?"sel":""}" x=${$} y=${m} @click=${()=>this._select(o)}>${o}</text>`)}}const p=e.faces.map((e,s)=>{const i=e.bbox,n=t.faces[s],r=i.x+i.w/2,a=i.y+i.h/2,l=e.slope?{up:0,right:90,down:180,left:270}[e.slope]:pt(e.azimuth+o);return W`<g class="facelabel" pointer-events="none">
        <g transform="translate(${r} ${a}) rotate(${l})">
          <path d="M0,-0.55 L0.28,-0.1 L0.1,-0.1 L0.1,0.45 L-0.1,0.45 L-0.1,-0.1 L-0.28,-0.1 Z" class="slopearrow"></path>
        </g>
        <text x=${r} y=${a+.95} class="fname">${e.name}</text>
        <text x=${r} y=${a+1.35} class="fsub">${Math.round(e.azimuth)}° · ${e.tilt}° · ${Pt(n.power)}</text>
      </g>`}),u=e.bbox.x+e.bbox.w+i+1.1,f=e.bbox.y+1.2,$=W`<g transform="translate(${u} ${f}) rotate(${o})" class="compass">
      <circle r="0.85"></circle>
      <path d="M0,-0.75 L0.22,0 L0,0.12 L-0.22,0 Z" class="n"></path>
      <path d="M0,0.75 L0.22,0 L0,-0.12 L-0.22,0 Z" class="s"></path>
      <text y="-0.95" transform="rotate(${-o} 0 -1.15)" x="0">N</text>
    </g>`,m="power"===this._mode?this._legend(Mt,"0 %","100 % of median",`bar height: 0–${this._config.panel_wp??400} W per panel · colour:`):this._legend(Mt,"0 %","100 % of median");return F`<div class="roof">
      <svg viewBox=${n.join(" ")} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#fff" stop-opacity="0.14"></stop>
            <stop offset="0.45" stop-color="#fff" stop-opacity="0.02"></stop>
            <stop offset="1" stop-color="#000" stop-opacity="0.15"></stop>
          </linearGradient>
          <pattern id="hatch-offline" width="0.18" height="0.18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="0.06" height="0.18" fill="#e53935" opacity="0.8"></rect>
          </pattern>
          <pattern id="hatch-missing" width="0.18" height="0.18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="0.06" height="0.18" fill="#9e9e9e" opacity="0.7"></rect>
          </pattern>
        </defs>
        ${c}${h}${d}${this._config.face_labels?p:q}${$}
      </svg>
      ${m}
      ${this._renderPicked()}
      ${void 0!==r?this._renderDetail(t,r):F`<div class="hint">Tap a panel to see its inverter · Shift+click marks a panel and copies its ID.</div>`}
    </div>`}_legend(t,e,s,i){const n=t.map(([t,e])=>`${e} ${100*t}%`).join(",");return F`<div class="legend">
      ${i?F`<span>${i}</span>`:q}
      <span>${e}</span><span class="bar" style="background:linear-gradient(90deg,${n})"></span><span>${s}</span>
      <span class="sw" style="--c:${bt.offline}">offline</span>
      <span class="sw" style="--c:${bt.low}">low</span>
    </div>`}_cellId(t){const e=`F${t.face+1} R${t.row} C${t.col}`;if(t.dummy||void 0===t.slot)return`${e} · dummy`;const s=this._config.inverters.find(e=>e.slot===t.slot);return`${e} · inv ${t.slot} in ${t.input+1}${s?` · ${s.serial}`:""}`}_cellClick(t,e){if(this._lastCell=e,t.shiftKey||t.ctrlKey||t.metaKey||t.altKey){const t=this._cellId(e);return this._picked.includes(t)?this._picked=this._picked.filter(e=>e!==t):this._picked=[...this._picked,t],void this._copy(this._picked.length>1?this._picked.join("\n"):t,this._picked.length>1?`${this._picked.length} panels copied`:`copied: ${t}`)}void 0!==e.slot&&this._select(e.slot)}async _copy(t,e){let s=!1;try{navigator.clipboard&&window.isSecureContext&&(await navigator.clipboard.writeText(t),s=!0)}catch(t){s=!1}if(!s){const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{s=document.execCommand("copy")}catch(t){s=!1}e.remove()}this._toast=s?e:"copy failed – select the text below",this._toastTimer&&window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast=void 0,2500)}_renderPicked(){return this._picked.length||this._toast?F`<div class="picked">
      ${this._toast?F`<div class="toast">${this._toast}</div>`:q}
      ${this._picked.length?F`<div class="pickhead">
              <b>Marked panels (${this._picked.length})</b>
              <button @click=${()=>this._copy(this._picked.join("\n"),`${this._picked.length} panels copied`)}>Copy all</button>
              <button @click=${()=>this._picked=[]}>Clear</button>
            </div>
            <pre class="picklist">${this._picked.join("\n")}</pre>`:q}
    </div>`:q}_select(t){this._selected=this._selected===t?void 0:t}_moreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}_renderDetail(t,e){const s=t.inv.get(e);if(!s)return q;const i=s.inv,n=this._config.strings?.find(t=>t.id===i.string),o=new Set;for(const t of[0,1]){const s=this._model.inputs.get(ut(e,t));s?.faces.forEach(t=>o.add(this._model.faces[t].name))}return F`<div class="detail">
      <div class="dhead">
        <span class="dot" style="--c:${bt[s.status]}"></span>
        <b>Inverter ${e}${i.name?` · ${i.name}`:""}</b>
        <span class="muted">${i.serial}</span>
        <span class="muted">${i.string??""}${n?.phase?` · ${n.phase}`:""} · ${[...o].join(", ")}</span>
        <span class="badge" style="--c:${bt[s.status]}">${xt[s.status]}</span>
        <button class="x" @click=${()=>this._selected=void 0}>✕</button>
      </div>
      <div class="dgrid">
        ${[0,1].map(t=>F`<div class="dinput clickable" @click=${()=>this._moreInfo(this._entity(i,t?"power_ch_2":"power_ch_1"))}
              @mouseenter=${()=>this._hoverKey=ut(e,t)} @mouseleave=${()=>this._hoverKey=void 0}>
            <div class="muted">Input ${t+1} · ${s.inputs[t].panels} panels</div>
            <div class="big">${Pt(s.inputs[t].power)}</div>
            <div class="muted">${null!==s.inputs[t].wpp?`${Math.round(s.inputs[t].wpp)} W/panel`:"–"} · ${It(s.inputs[t].rel)} of median</div>
          </div>`)}
        <div class="dvals">
          ${this._val("Temperature",Ut(s.temperature,"°C"),"temperature",i)}
          ${this._val("Frequency",Ut(s.frequency,"Hz",1),"frequency",i)}
          ${this._val("Voltage",Ut(s.voltage,"V"),"voltage",i)}
          ${this._val("Signal",Ut(s.signal,"dBm"),"signal",i)}
          ${this._val("Online",null===s.online?"–":s.online?"yes":"no","online",i)}
        </div>
      </div>
      ${this._lastCell&&this._lastCell.slot===e?F`<div class="small">Panel <span class="mono">${this._cellId(this._lastCell)}</span>
            <button class="mini" @click=${()=>this._copy(this._cellId(this._lastCell),"copied")}>Copy ID</button></div>`:q}
      ${s.lastUpdate?F`<div class="muted small">last data: ${s.lastUpdate}</div>`:q}
      ${i.history?.length?F`<div class="muted small">History: ${i.history.map(t=>`${t.serial}${t.replaced?` (replaced ${t.replaced})`:""}${t.note?` – ${t.note}`:""}`).join(" → ")} → ${i.serial}</div>`:q}
    </div>`}_val(t,e,s,i){return F`<div class="clickable" @click=${()=>this._moreInfo(this._entity(i,s))}><span class="muted">${t}</span> ${e}</div>`}_sunDay(){const t=this._config,e=t.latitude??this.hass.config.latitude,s=t.longitude??this.hass.config.longitude,i=new Date,n=`${i.toDateString()}|${e}|${s}`;return this._sunDayCache?.key!==n&&(this._sunDayCache={key:n,day:gt(i,e,s,5)}),this._sunDayCache.day}_renderSun(t){const e=this._model,s=this._config.north??0,i=this._sunDay(),n=100,o=t=>(t+s)*Math.PI/180,r=(t,e)=>{const s=n*(90-Math.max(-2,e))/90;return[Math.sin(o(t))*s,-Math.cos(o(t))*s]},a=i.path.map(t=>r(t.azimuth,t.elevation).map(t=>t.toFixed(1)).join(",")).join(" "),l=t.sun.elevation>-1?r(t.sun.azimuth,t.sun.elevation):null,c=i.sunrise?mt(i.sunrise,this._lat(),this._lon()):null,h=i.sunset?mt(i.sunset,this._lat(),this._lon()):null,d=52/Math.max(e.bbox.w,e.bbox.h),p=-(e.bbox.x+e.bbox.w/2)*d,u=-(e.bbox.y+e.bbox.h/2)*d,f=this._config.panel_wp??400,$=e.faces.map((e,s)=>{const i=e.bbox,n=t.faces[s],o=Et(kt,Math.sqrt(Math.max(0,n.wpp??0)/f));return W`<rect x=${p+i.x*d} y=${u+i.y*d} width=${i.w*d} height=${i.h*d} fill=${o} class="miniface"></rect>`}),m=e.faces.map((e,s)=>{const i=e.bbox,n=p+(i.x+i.w/2)*d,r=u+(i.y+i.h/2)*d,a=o(e.azimuth),l=14+22*t.faces[s].incidence;return W`<line x1=${n} y1=${r} x2=${n+Math.sin(a)*l} y2=${r-Math.cos(a)*l} class="normal" style="opacity:${.35+.65*t.faces[s].incidence}"></line>
        <circle cx=${n+Math.sin(a)*l} cy=${r-Math.cos(a)*l} r="2" class="normaltip"></circle>`}),g=e.faces.map((e,s)=>{const i=t.faces[s],n=i.panels*f/1e3;return F`<tr>
        <td>${e.name}</td>
        <td>${Math.round(e.azimuth)}° / ${e.tilt}°</td>
        <td>${It(i.incidence)}</td>
        <td>${Pt(i.power)}</td>
        <td>${n?It(i.power/(1e3*n)):"–"}</td>
      </tr>`});return F`<div class="sun">
      <svg viewBox="-135 -122 270 244" class="sky">
        <circle r=${n} class="horizon"></circle>
        <circle r=${6e3/90} class="ring"></circle>
        <circle r=${3e3/90} class="ring"></circle>
        ${[["N",0],["E",90],["S",180],["W",270]].map(([t,e])=>{const[s,i]=r(e,-10);return W`<text x=${s} y=${i} class="card ${"N"===t?"north":""}">${t}</text>`})}
        ${$}${m}
        <polyline points=${a} class="sunpath"></polyline>
        ${c?this._sunMark(r(c.azimuth,0),`↑ ${Tt(i.sunrise)}`):q}
        ${h?this._sunMark(r(h.azimuth,0),`↓ ${Tt(i.sunset)}`):q}
        ${l?W`<circle cx=${l[0]} cy=${l[1]} r="9" class="sunglow"></circle><circle cx=${l[0]} cy=${l[1]} r="5" class="sundot"></circle>`:q}
      </svg>
      <div class="suninfo">
        <div class="sunline">
          <span>☀ ${t.sun.elevation>0?`${Math.round(t.sun.azimuth)}° az · ${Math.round(t.sun.elevation)}° el`:"below horizon"}</span>
          <span class="muted">↑ ${Tt(i.sunrise)} · ↓ ${Tt(i.sunset)}</span>
        </div>
        <table class="faces">
          <thead><tr><th>Face</th><th>Az / tilt</th><th title="share of direct sunlight on the face right now (geometry only)">Sun angle</th><th>Power</th><th>of kWp</th></tr></thead>
          <tbody>${g}</tbody>
        </table>
      </div>
    </div>`}_lat(){return this._config.latitude??this.hass.config.latitude}_lon(){return this._config.longitude??this.hass.config.longitude}_sunMark(t,e){const[s,i]=t;return W`<circle cx=${s} cy=${i} r="2.5" class="riseset"></circle>
      <text x=${1.13*s} y=${1.13*i+3} class="rslabel">${e}</text>`}_renderStrings(t){const e=this._config.strings;if(!e?.length)return q;const s=new Map,i=e.map(e=>{const i=[...t.inv.values()].filter(t=>t.inv.string===e.id),n=i.reduce((t,e)=>t+(e.power??0),0);e.phase&&s.set(e.phase,(s.get(e.phase)??0)+n);let o="night";for(const t of i)wt[t.status]>wt[o]&&(o=t.status);const r=e.breaker?this.hass.states[e.breaker]:void 0,a=r?zt(r.state):null,l=t.day&&i.length>0&&i.every(t=>"offline"===t.status||"fault"===t.status);return F`<div class="string ${l||!1===a?"down":""}">
        <div class="sname"><span class="dot" style="--c:${bt[o]}"></span>${e.name??e.id}${e.phase?F` <span class="muted">${e.phase}</span>`:q}</div>
        <div class="sval">${Pt(n)}</div>
        <div class="muted small">${i.map(t=>t.inv.slot).join(" ")}</div>
        ${r?F`<div class="small clickable" @click=${()=>this._moreInfo(r.entity_id)}>breaker: ${null===a?r.state:a?"on":F`<b class="bad">OFF</b>`}</div>`:l?F`<div class="small bad">whole string down – check RCBO</div>`:q}
      </div>`}),n=[...s.values()],o=n.length>1?Math.max(...n)-Math.min(...n):0;return F`<div class="section">
      <div class="stitle">Strings</div>
      <div class="strings">${i}</div>
      ${s.size?F`<div class="phases">${[...s.entries()].sort().map(([t,e])=>F`<span><b>${t}</b> ${Pt(e)}</span>`)}
            <span class="muted">imbalance ${Pt(o)}</span></div>`:q}
    </div>`}_renderInverters(t){const e=[...t.inv.values()].sort((t,e)=>t.inv.slot-e.inv.slot);return F`<div class="section">
      <div class="stitle">Inverters</div>
      <div class="tablewrap">
        <table class="inv">
          <thead><tr>
            <th></th><th>#</th><th>Serial</th><th>String</th><th>In 1</th><th>In 2</th><th>W/panel</th><th>°C</th><th>Hz</th><th>V</th><th>dBm</th>
          </tr></thead>
          <tbody>
            ${e.map(t=>{const e=t.inputs.map(t=>null===t.wpp?"–":Math.round(t.wpp)).join(" / ");return F`<tr class=${this._selected===t.inv.slot?"sel":""} @click=${()=>this._select(t.inv.slot)}>
                <td><span class="dot" title=${xt[t.status]} style="--c:${bt[t.status]}"></span></td>
                <td>${t.inv.slot}</td>
                <td class="mono">${t.inv.serial}</td>
                <td>${t.inv.string??""}</td>
                <td class=${"low"===t.inputs[0].status||"fault"===t.inputs[0].status?"warncell":""}>${Pt(t.inputs[0].power)}</td>
                <td class=${"low"===t.inputs[1].status||"fault"===t.inputs[1].status?"warncell":""}>${Pt(t.inputs[1].power)}</td>
                <td>${e}</td>
                <td>${Ut(t.temperature,"")}</td>
                <td>${Ut(t.frequency,"",1)}</td>
                <td>${Ut(t.voltage,"")}</td>
                <td>${Ut(t.signal,"")}</td>
              </tr>`})}
          </tbody>
        </table>
      </div>
    </div>`}_inventory(){const t=this._config,e=this.hass,s=new Set;s.add(t.entity_pattern??"sensor.inverter_{serial}_{key}");for(const e of t.inverters)e.prefix?.includes(e.serial)&&s.add(e.prefix.replace(e.serial,"{serial}")+"_{key}");const i=[...s].map(t=>new RegExp("^"+Ht(t).replace(Ht("{serial}"),"([0-9A-Za-z]+)").replace(Ht("{key}"),"power_ch_1")+"$")),n=new Map;for(const t of Object.keys(e.states))for(const s of i){const i=s.exec(t);i&&n.set(i[1],e.states[t])}const o=new Set(t.inverters.map(t=>t.serial)),r=new Set(t.ignore_serials??[]),a=new Set(t.inverters.flatMap(t=>(t.history??[]).map(t=>t.serial))),l=[];for(const[t,e]of n)o.has(t)||r.has(t)||l.push({serial:t,state:e.state,reporting:null!==Ct(e.state),old:a.has(t)});const c=t.inverters.filter(t=>!e.states[this._entity(t,"power_ch_1")]);return{found:n.size,unknown:l,missing:c,configured:t.inverters.length,ignored:[...r].filter(t=>n.has(t))}}_renderInventory(t){const e=this._inventory(),s=e.unknown.length+e.missing.length,i=e.configured-e.missing.length;return F`<div class="section inventory ${s?"bad":""}">
      <div class="stitle clickable" @click=${()=>this._showAllInventory=!this._showAllInventory}>
        Inventory ${s?"⚠":"✓"}
        <span class="muted small">${i}/${e.configured} configured inverters found in HA${e.unknown.length?` · ${e.unknown.length} unknown`:""}${e.ignored.length?` · ${e.ignored.length} ignored`:""}</span>
      </div>
      ${s||this._showAllInventory?F`<ul class="small">
            ${e.missing.map(t=>F`<li>Slot ${t.slot}: <span class="mono">${t.serial}</span> – no entity <span class="mono">${this._entity(t,"power_ch_1")}</span></li>`)}
            ${e.unknown.map(t=>F`<li><span class="mono">${t.serial}</span> is in HA but not mapped to a slot –
                ${t.reporting?F`<b>reporting (${t.state} W)</b>`:`state ${t.state}`}${t.old?" (listed as a replaced unit)":""}</li>`)}
            ${this._showAllInventory&&e.ignored.length?F`<li>Ignored: ${e.ignored.join(", ")}</li>`:q}
          </ul>`:q}
    </div>`}}Nt.properties={hass:{attribute:!1},_config:{state:!0},_mode:{state:!0},_selected:{state:!0},_hoverKey:{state:!0},_tick:{state:!0},_showAllInventory:{state:!0},_picked:{state:!0},_lastCell:{state:!0},_toast:{state:!0}},Nt.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(i,t,s)})`
    :host {
      --roof: #2a2f36;
      --roof-edge: #444b55;
    }
    ha-card {
      padding: 12px 14px 14px;
      overflow: hidden;
    }
    .header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 18px;
      margin-bottom: 8px;
    }
    .title {
      font-size: 1.25em;
      font-weight: 500;
      flex: 1 1 auto;
    }
    .kpis {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
    }
    .kpi {
      display: flex;
      flex-direction: column;
    }
    .kpi .v {
      font-size: 1.15em;
      font-weight: 600;
    }
    .kpi .l,
    .muted {
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    .small {
      font-size: 0.82em;
    }
    .mono {
      font-family: var(--code-font-family, monospace);
      font-size: 0.92em;
    }
    .chip {
      display: inline-block;
      padding: 1px 8px;
      border-radius: 10px;
      font-size: 0.8em;
      font-weight: 500;
      background: color-mix(in srgb, var(--c) 22%, transparent);
      color: var(--primary-text-color);
      border: 1px solid var(--c);
      margin-right: 4px;
    }
    .modes button {
      background: none;
      border: 1px solid var(--divider-color, #555);
      color: var(--primary-text-color);
      padding: 3px 10px;
      cursor: pointer;
      font: inherit;
      font-size: 0.85em;
    }
    .modes button:first-child {
      border-radius: 12px 0 0 12px;
    }
    .modes button:last-child {
      border-radius: 0 12px 12px 0;
      border-left: none;
    }
    .modes button.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color);
    }
    .roof svg {
      width: 100%;
      height: auto;
      display: block;
      background: radial-gradient(ellipse at 30% 20%, #1b222b, #0f1318);
      border-radius: 10px;
    }
    .face {
      fill: var(--roof);
      stroke: var(--roof-edge);
      stroke-width: 0.05;
      stroke-linejoin: round;
    }
    .dummy {
      fill: #15191e;
      stroke: #000;
      stroke-width: 0.02;
    }
    .panel {
      stroke: #000;
      stroke-width: 0.02;
    }
    .cell {
      cursor: pointer;
    }
    .cell.dim {
      opacity: 0.4;
    }
    .hl {
      fill: none;
      stroke: #fff;
      stroke-width: 0.07;
    }
    text.slot {
      font-size: 0.32px;
      fill: #fff;
      fill-opacity: 0.75;
      text-anchor: middle;
      dominant-baseline: central;
      font-weight: 600;
      paint-order: stroke;
      stroke: #000;
      stroke-opacity: 0.5;
      stroke-width: 0.06px;
    }
    text.slot.eave {
      fill: var(--secondary-text-color, #aaa);
      fill-opacity: 1;
      stroke: none;
      cursor: pointer;
      font-weight: 500;
    }
    text.slot.eave.sel {
      fill: var(--primary-text-color, #fff);
      font-weight: 700;
    }
    .facelabel .slopearrow {
      fill: #fff;
      fill-opacity: 0.35;
    }
    .facelabel text {
      text-anchor: middle;
      fill: #fff;
      paint-order: stroke;
      stroke: #000;
      stroke-width: 0.12px;
      stroke-opacity: 0.7;
    }
    .fname {
      font-size: 0.42px;
      font-weight: 600;
    }
    .fsub {
      font-size: 0.32px;
      fill-opacity: 0.85;
    }
    .compass circle {
      fill: #0f1318;
      stroke: #555;
      stroke-width: 0.04;
    }
    .compass .n {
      fill: #e53935;
    }
    .compass .s {
      fill: #ccc;
    }
    .compass text {
      font-size: 0.42px;
      fill: #fff;
      text-anchor: middle;
      font-weight: 700;
    }
    .legend {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78em;
      color: var(--secondary-text-color);
      margin: 6px 2px 0;
      flex-wrap: wrap;
    }
    .legend .bar {
      width: 120px;
      height: 8px;
      border-radius: 4px;
    }
    .legend .sw::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 2px solid var(--c);
      margin: 0 3px 0 8px;
      vertical-align: -2px;
    }
    .pick {
      fill: #fff;
      stroke: #e91e63;
      stroke-width: 0.06;
    }
    .picked {
      margin: 6px 2px 0;
      font-size: 0.85em;
    }
    .toast {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 10px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      margin-bottom: 4px;
    }
    .pickhead {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .pickhead button,
    button.mini {
      background: none;
      border: 1px solid var(--divider-color, #555);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 1px 8px;
      cursor: pointer;
      font: inherit;
      font-size: 0.9em;
    }
    .picklist {
      margin: 4px 0 0;
      padding: 6px 8px;
      border-radius: 6px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      user-select: all;
      white-space: pre-wrap;
      font-size: 0.9em;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 0.8em;
      margin: 4px 2px;
    }
    .detail {
      margin-top: 8px;
      padding: 10px;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    .dhead {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
      align-items: center;
      margin-bottom: 8px;
    }
    .dhead .x {
      margin-left: auto;
      background: none;
      border: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      font-size: 1em;
    }
    .badge {
      font-size: 0.78em;
      padding: 1px 8px;
      border-radius: 10px;
      border: 1px solid var(--c);
      background: color-mix(in srgb, var(--c) 20%, transparent);
    }
    .dgrid {
      display: grid;
      grid-template-columns: 1fr 1fr 1.3fr;
      gap: 10px;
    }
    .dinput .big {
      font-size: 1.3em;
      font-weight: 600;
    }
    .dvals {
      display: grid;
      gap: 2px;
      font-size: 0.9em;
    }
    .dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--c);
      margin-right: 4px;
    }
    .clickable {
      cursor: pointer;
    }
    .sun {
      display: grid;
      grid-template-columns: minmax(180px, 1fr) 1.4fr;
      gap: 12px;
      align-items: center;
      margin-top: 14px;
    }
    .sky {
      width: 100%;
      height: auto;
    }
    .horizon {
      fill: color-mix(in srgb, var(--primary-color) 6%, transparent);
      stroke: var(--divider-color, #666);
      stroke-width: 1;
    }
    .ring {
      fill: none;
      stroke: var(--divider-color, #666);
      stroke-width: 0.5;
      stroke-dasharray: 2 3;
    }
    .sky .card {
      font-size: 10px;
      fill: var(--secondary-text-color);
      text-anchor: middle;
      dominant-baseline: central;
    }
    .sky .card.north {
      fill: #e53935;
      font-weight: 700;
    }
    .sunpath {
      fill: none;
      stroke: #f2c14e;
      stroke-width: 1.6;
      stroke-dasharray: 4 3;
    }
    .sundot {
      fill: #ffd54f;
      stroke: #fff;
      stroke-width: 1;
    }
    .sunglow {
      fill: #ffd54f;
      opacity: 0.3;
    }
    .riseset {
      fill: #f2c14e;
    }
    .rslabel {
      font-size: 8px;
      fill: var(--secondary-text-color);
      text-anchor: middle;
    }
    .miniface {
      stroke: #000;
      stroke-width: 0.6;
    }
    .normal {
      stroke: #f2c14e;
      stroke-width: 1.4;
    }
    .normaltip {
      fill: #f2c14e;
    }
    .sunline {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.85em;
    }
    th {
      text-align: left;
      font-weight: 500;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color, #444);
      padding: 3px 4px;
      white-space: nowrap;
    }
    td {
      padding: 3px 4px;
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color, #444) 50%, transparent);
      white-space: nowrap;
    }
    .section {
      margin-top: 14px;
    }
    .stitle {
      font-weight: 500;
      margin-bottom: 6px;
    }
    .strings {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 6px;
    }
    .string {
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      border: 1px solid transparent;
    }
    .string.down {
      border-color: #e53935;
    }
    .sval {
      font-weight: 600;
    }
    .bad {
      color: #e53935;
    }
    .phases {
      display: flex;
      gap: 14px;
      margin-top: 6px;
      font-size: 0.9em;
      flex-wrap: wrap;
    }
    .tablewrap {
      overflow-x: auto;
    }
    table.inv tr {
      cursor: pointer;
    }
    table.inv tr.sel td {
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    }
    .warncell {
      color: #fb8c00;
      font-weight: 600;
    }
    .inventory.bad .stitle {
      color: #fb8c00;
    }
    .inventory ul {
      margin: 0;
      padding-left: 18px;
    }
    .warn {
      margin-top: 10px;
      font-size: 0.8em;
      color: #fb8c00;
    }
    @media (max-width: 600px) {
      .sun {
        grid-template-columns: 1fr;
      }
      .dgrid {
        grid-template-columns: 1fr 1fr;
      }
      .dvals {
        grid-column: span 2;
        grid-template-columns: 1fr 1fr;
      }
    }
  `,customElements.get("roof-pv-card")||customElements.define("roof-pv-card",Nt),window.customCards=window.customCards||[],window.customCards.push({type:"roof-pv-card",name:"Roof PV Card",description:"Ennogie-style roof visualisation of a PV system with micro inverters",preview:!1,documentationURL:"https://github.com/MrJones4u/HA-card-ennogie-style-roof-visualisation"}),console.info("%c ROOF-PV-CARD %c 0.1.7 ","color:#fff;background:#1d5fa3;font-weight:700","color:#1d5fa3;background:#fff");

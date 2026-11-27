const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:a,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:d}=Object,p=globalThis,u=p.trustedTypes,f=u?u.emptyScript:"",g=p.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!r(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&a(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);n?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const o=n.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const o=this.constructor;if(!1===i&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??_)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,g?.({ReactiveElement:y}),(p.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,b=w.trustedTypes,k=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+A,E=`<${S}>`,C=document,z=()=>C.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,I="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,U=/>/g,R=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,N=/"/g,L=/^(?:script|style|textarea|title)$/i,j=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),q=j(1),W=j(2),F=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,K=C.createTreeWalker(C,129);function Z(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(r.lastIndex=h,l=r.exec(s),null!==l);)h=r.lastIndex,r===H?"!--"===l[1]?r=D:void 0!==l[1]?r=U:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=n??H,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?R:'"'===l[3]?N:O):r===N||r===O?r=R:r===D||r===U?r=H:(r=R,n=void 0);const d=r===R&&t[e+1].startsWith("/>")?" ":"";o+=r===H?s+E:c>=0?(i.push(a),s.slice(0,c)+M+s.slice(c)+A+d):s+A+(-2===c?e:d)}return[Z(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=G(t,e);if(this.el=J.createElement(l,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(M)){const e=c[o++],s=i.getAttribute(t).split(A),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(A)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(A),e=t.length-1;if(e>0){i.textContent=b?b.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],z()),K.nextNode(),a.push({type:2,index:++n});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const s=C.createElement("template");return s.innerHTML=t,s}}function Y(t,e,s=t,i){if(e===F)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=T(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??C).importNode(e,!0);K.currentNode=i;let n=K.nextNode(),o=0,r=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=s[++r]}o!==a?.index&&(n=K.nextNode(),o++)}return K.currentNode=C,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),T(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(Z(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Q(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=Y(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Y(this,i[s+r],e,r),a===F&&(a=this._$AH[r]),o||=!T(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends tt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??B)===F)return;const s=this._$AH,i=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(J,Q),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class at extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new Q(e.insertBefore(z(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct=["power_ch_1","power_ch_2","temperature","frequency","voltage","signal","online"],ht={up:0,right:90,down:180,left:270};function dt(t,e){return"number"==typeof t.azimuth?pt(t.azimuth):t.slope?pt(ht[t.slope]-e):180}const pt=t=>(t%360+360)%360,ut=(t,e)=>`${t}:${e}`;const ft=Math.PI/180,gt=23.4397*ft;function mt(t,e,s){const i=ft*-s,n=ft*e,o=(t=>t.valueOf()/864e5-.5+2440588-2451545)(t),r=function(t){const e=ft*(357.5291+.98560028*t),s=e+ft*(1.9148*Math.sin(e)+.02*Math.sin(2*e)+3e-4*Math.sin(3*e))+102.9372*ft+Math.PI;return{dec:Math.asin(Math.sin(0)*Math.cos(gt)+Math.cos(0)*Math.sin(gt)*Math.sin(s)),ra:Math.atan2(Math.sin(s)*Math.cos(gt)-Math.tan(0)*Math.sin(gt),Math.cos(s))}}(o),a=ft*(280.16+360.9856235*o)-i-r.ra,l=Math.atan2(Math.sin(a),Math.cos(a)*Math.sin(n)-Math.tan(r.dec)*Math.cos(n)),c=Math.asin(Math.sin(n)*Math.sin(r.dec)+Math.cos(n)*Math.cos(r.dec)*Math.cos(a));return{azimuth:(l/ft+180+360)%360,elevation:c/ft}}function $t(t,e,s,i=5){const n=new Date(t);n.setHours(0,0,0,0);const o=[];let r,a,l,c,h,d=-90;const p=-.833;for(let t=0;t<=1440;t+=i){const i=new Date(n.getTime()+6e4*t),u=mt(i,e,s);c&&h&&(c.elevation<p&&u.elevation>=p&&(r=_t(h,i,c.elevation,u.elevation,p)),c.elevation>=p&&u.elevation<p&&(a=_t(h,i,c.elevation,u.elevation,p))),u.elevation>d&&(d=u.elevation,l=i),u.elevation>=p-1&&o.push({t:i,...u}),c=u,h=i}return{sunrise:r,sunset:a,noon:l,path:o}}function _t(t,e,s,i,n){const o=(n-s)/(i-s);return new Date(t.getTime()+o*(e.getTime()-t.getTime()))}function vt(t,e,s){if(t.elevation<=0)return 0;const i=t.elevation*ft,n=s*ft,o=Math.sin(i)*Math.cos(n)+Math.cos(i)*Math.sin(n)*Math.cos((t.azimuth-e)*ft);return Math.max(0,o)}function yt(t,e){if(!t.length)return"";const s=e.res??.05,i=e.margin+e.merge;let n=1/0,o=1/0,r=-1/0,a=-1/0;for(const e of t)n=Math.min(n,e.x),o=Math.min(o,e.y),r=Math.max(r,e.x+e.w),a=Math.max(a,e.y+e.h);const l=i+2*s;n-=l,o-=l,r+=l,a+=l;const c=Math.ceil((r-n)/s),h=Math.ceil((a-o)/s);let d=new Uint8Array(c*h);for(const e of t){const t=Math.max(0,Math.round((e.x-i-n)/s)),r=Math.min(c,Math.round((e.x+e.w+i-n)/s)),a=Math.max(0,Math.round((e.y-i-o)/s)),l=Math.min(h,Math.round((e.y+e.h+i-o)/s));for(let e=a;e<l;e++)d.fill(1,e*c+t,e*c+r)}const p=Math.round(e.merge/s);p>0&&(d=function(t,e,s,i){const n=new Uint8Array(e*s);for(let o=0;o<s;o++){let s=0;const r=o*e,a=new Int32Array(e);for(let i=0;i<e;i++)s=t[r+i]?s+1:0,a[i]=s;s=0;for(let o=e-1;o>=0;o--)s=t[r+o]?s+1:0,a[o]>i&&s>i&&(n[r+o]=1)}const o=new Uint8Array(e*s),r=new Int32Array(e*s);for(let t=0;t<e;t++){let a=0;for(let i=0;i<s;i++)a=n[i*e+t]?a+1:0,r[i*e+t]=a;a=0;for(let l=s-1;l>=0;l--)a=n[l*e+t]?a+1:0,r[l*e+t]>i&&a>i&&(o[l*e+t]=1)}return o}(d,c,h,p));const u=(t,e)=>t>=0&&e>=0&&t<c&&e<h?d[e*c+t]:0,f=new Map,g=(t,e)=>e*(c+1)+t,m=(t,e,s,i)=>{const n=g(t,e),o=f.get(n);o?o.push(g(s,i)):f.set(n,[g(s,i)])};for(let t=0;t<h;t++)for(let e=0;e<c;e++)d[t*c+e]&&(u(e,t-1)||m(e,t,e+1,t),u(e+1,t)||m(e+1,t,e+1,t+1),u(e,t+1)||m(e+1,t+1,e,t+1),u(e-1,t)||m(e,t+1,e,t));const $=[],_=t=>n+t%(c+1)*s,v=t=>o+Math.floor(t/(c+1))*s;for(const t of[...f.keys()])for(;f.get(t)?.length;){const e=[t];let s=f.get(t).pop(),i=0;for(;s!==t&&i++<1e6;){e.push(s);const t=f.get(s);if(!t||!t.length)break;s=t.pop()}const n=[];for(let t=0;t<e.length;t++){const s=e[(t-1+e.length)%e.length],i=e[t],o=e[(t+1)%e.length],r=_(i)-_(s),a=v(i)-v(s),l=_(o)-_(i),c=v(o)-v(i);Math.abs(r*c-a*l)>1e-9&&n.push(i)}n.length<3||$.push("M"+n.map(t=>`${_(t).toFixed(3)},${v(t).toFixed(3)}`).join("L")+"Z")}return $.join("")}const wt={missing:5,offline:4,fault:3,low:2,ok:1,night:0},xt={missing:"no entities",offline:"offline",fault:"no output",low:"low output",ok:"ok",night:"night"},bt={missing:"#9e9e9e",offline:"#e53935",fault:"#e53935",low:"#fb8c00",ok:"#43a047",night:"#5c6bc0"},kt=[[0,"#0b0f14"],[.12,"#122a4d"],[.35,"#1d5fa3"],[.6,"#2fa8d5"],[.82,"#f2c14e"],[1,"#fff1b8"]],Mt=-.833,At="#0e1a2b",St=[[0,"#7f1d1d"],[.5,"#d32f2f"],[.75,"#f57c00"],[.9,"#fbc02d"],[1,"#2e7d32"]];function Et(t){const e=parseInt(t.slice(1),16);return[e>>16&255,e>>8&255,255&e]}function Ct(t,e){e=Math.max(0,Math.min(1,e));for(let s=1;s<t.length;s++)if(e<=t[s][0]){const[i,n]=t[s-1],[o,r]=t[s],a=(e-i)/(o-i||1),l=Et(n),c=Et(r),h=l.map((t,e)=>Math.round(t+(c[e]-t)*a));return`rgb(${h[0]},${h[1]},${h[2]})`}return t[t.length-1][1]}const zt=t=>{if(null==t)return null;if("unavailable"===t||"unknown"===t||""===t||"None"===t)return null;const e=parseFloat(t);return isFinite(e)?e:null},Tt=t=>{if(void 0===t)return null;const e=t.toLowerCase();return!!["true","on","1","online","yes"].includes(e)||!["false","off","0","offline","no"].includes(e)&&null},Pt=(t,e=1)=>null!=t&&isFinite(t)?Math.abs(t)>=1e3?`${(t/1e3).toFixed(0===e?1:2)} kW`:`${Math.round(t)} W`:"–",It=(t,e,s=0)=>null!=t&&isFinite(t)?`${t.toFixed(s)} ${e}`:"–",Ht=t=>null!=t&&isFinite(t)?`${Math.round(100*t)} %`:"–",Dt=t=>{if(!t.length)return null;const e=[...t].sort((t,e)=>t-e),s=e.length>>1;return e.length%2?e[s]:(e[s-1]+e[s])/2},Ut=t=>t?t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"–",Rt=t=>{const e=new Date(t);return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`},Ot=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");function Nt(t,e){const s=[],i=.05;for(const e of t.cells)s.push([e.x-i,e.y-i],[e.x+e.w+i,e.y-i],[e.x-i,e.y+e.h+i],[e.x+e.w+i,e.y+e.h+i]);if(e){const e=.6;for(const i of t.faces){const t=i.bbox;"down"===i.slope&&s.push([t.x,t.y+t.h+e],[t.x+t.w,t.y+t.h+e]),"up"===i.slope&&s.push([t.x,t.y-e],[t.x+t.w,t.y-e]),"left"===i.slope&&s.push([t.x-e,t.y],[t.x-e,t.y+t.h]),"right"===i.slope&&s.push([t.x+t.w+e,t.y],[t.x+t.w+e,t.y+t.h])}}return s.length?function(t){const e=[...t];for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}const s=(t,e)=>Math.hypot(e[0]-t.cx,e[1]-t.cy)<=t.r+1e-9,i=(t,e)=>({cx:(t[0]+e[0])/2,cy:(t[1]+e[1])/2,r:Math.hypot(t[0]-e[0],t[1]-e[1])/2}),n=(t,e,s)=>{const n=2*(t[0]*(e[1]-s[1])+e[0]*(s[1]-t[1])+s[0]*(t[1]-e[1]));if(Math.abs(n)<1e-12){const n=[i(t,e),i(t,s),i(e,s)].sort((t,e)=>e.r-t.r);return n[0]}const o=t[0]**2+t[1]**2,r=e[0]**2+e[1]**2,a=s[0]**2+s[1]**2,l=(o*(e[1]-s[1])+r*(s[1]-t[1])+a*(t[1]-e[1]))/n,c=(o*(s[0]-e[0])+r*(t[0]-s[0])+a*(e[0]-t[0]))/n;return{cx:l,cy:c,r:Math.hypot(t[0]-l,t[1]-c)}};let o={cx:e[0][0],cy:e[0][1],r:0};for(let t=1;t<e.length;t++)if(!s(o,e[t])){o={cx:e[t][0],cy:e[t][1],r:0};for(let r=0;r<t;r++)if(!s(o,e[r])){o=i(e[t],e[r]);for(let i=0;i<r;i++)s(o,e[i])||(o=n(e[t],e[r],e[i]))}}return o}(s):void 0}const Lt=["header","roof","sun","strings","inverters","inventory"];class jt extends at{constructor(){super(...arguments),this._mode="power",this._view="compass",this._history=[],this._dragging=!1,this._invHist=new Map,this._invHistAt=0,this._invHistLoading=!1,this._historyKey="",this._historyAt=0,this._loadSeq=0,this._tick=0,this._showAllInventory=!1,this._picked=[],this._watched=[],this._outline=""}static getStubConfig(){return{title:"Roof PV",panel_wp:400,north:0,entity_pattern:"sensor.inverter_{serial}_{key}",faces:[{name:"South",slope:"down",tilt:30,x:0,y:0,map:"1a 1a 1b 1b\n1a 1a 1b 1b"}],inverters:[{slot:1,serial:"000000000000"}]}}setConfig(t){if(t?.config_url){const e=++this._loadSeq;this._loadError=void 0;const s=t.config_url+(t.config_url.includes("?")?"&":"?")+"t="+Date.now();return void fetch(s,{cache:"no-store"}).then(t=>{if(!t.ok)throw new Error(`${t.status} ${t.statusText}`);return t.json()}).then(s=>{if(e!==this._loadSeq)return;const i={...s,...t};try{this._applyConfig(i)}catch(t){this._loadError=String(t.message??t)}this.requestUpdate()}).catch(s=>{e===this._loadSeq&&(this._loadError=`could not load ${t.config_url}: ${s.message??s}`)})}this._applyConfig(t)}_applyConfig(t){if(!t||!Array.isArray(t.faces)||!t.faces.length)throw new Error('roof-pv-card: "faces" is required');if(!Array.isArray(t.inverters)||!t.inverters.length)throw new Error('roof-pv-card: "inverters" is required');this._config=t,this._model=function(t){const e=t.north??0,[s,i]=t.panel_size??[.6,1.2],n=[],o=new Map,r=[],a=[],l=new Set(t.inverters.map(t=>t.slot));t.faces.forEach((t,c)=>{const[h,d]=t.panel_size??[s,i],p=t,u=Number(t.position?.[0]??t.left??t.x??0),f=Number(t.position?.[1]??t.top??t.y??p.true??0),g=(t.map||"").split("\n").map(t=>t.trim()).filter(t=>t.length),m=[],$=new Set;let _=0;g.forEach((e,s)=>{const i=e.split(/\s+/);_=Math.max(_,i.length),i.forEach((e,i)=>{if("."===e)return;const r={x:u+i*h,y:f+s*d,w:h,h:d,face:c,row:s+1,col:i+1};if("-"===e)r.roof=!0;else if("x"===e.toLowerCase())r.dummy=!0;else{const i=/^(\d+)([ab12])$/i.exec(e);if(!i)return void n.push(`${t.name}: unknown token "${e}" in row ${s+1}`);const a=parseInt(i[1],10),h=/[a1]/i.test(i[2])?0:1;l.has(a)||n.push(`${t.name}: slot ${a} is not configured under inverters`),r.slot=a,r.input=h,$.add(a);const d=ut(a,h),p=o.get(d)??{slot:a,input:h,panels:0,faces:new Set};p.panels++,p.faces.add(c),o.set(d,p)}m.push(r),a.push(r)})}),r.push({index:c,name:t.name??`Face ${c+1}`,azimuth:dt(t,e),tilt:t.tilt??30,slope:t.slope,bbox:{x:u,y:f,w:_*h,h:g.length*d},cells:m,panels:m.filter(t=>!t.dummy&&!t.roof).length,slots:$})});for(const e of t.inverters)for(const t of[0,1])o.has(ut(e.slot,t))||n.push(`Inverter ${e.slot}: input ${t+1} has no panels in any face map`);let c=1/0,h=1/0,d=-1/0,p=-1/0;for(const t of r)c=Math.min(c,t.bbox.x),h=Math.min(h,t.bbox.y),d=Math.max(d,t.bbox.x+t.bbox.w),p=Math.max(p,t.bbox.y+t.bbox.h);return isFinite(c)||(c=0,h=0,d=1,p=1),{faces:r,cells:a,inputs:o,bbox:{x:c,y:h,w:d-c,h:p-h},totalPanels:a.filter(t=>!t.dummy&&!t.roof).length,warnings:n}}(t),this._outline="panels"===(t.outline??"panels")?yt(this._model.cells,{margin:t.outline_margin??.1,merge:t.outline_merge??.35}):"",this._mode=t.mode??"power",this._view=t.view??"compass",this._circle=Nt(this._model,"eave"===(t.slot_labels??"eave")),this._watched=this._collectWatched(t)}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6,rows:"auto"}}getLayoutOptions(){return{grid_columns:"full",grid_min_columns:4}}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>{this._tick=Date.now(),this._maybeLoadHistory()},6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer),this._stopReplay()}_entity(t,e){if(t.entities?.[e])return t.entities[e];if(t.prefix)return`${t.prefix}_${e}`;return(this._config?.entity_pattern??"sensor.inverter_{serial}_{key}").replace("{serial}",t.serial).replace("{key}",e)}_collectWatched(t){const e=[];for(const s of t.inverters)for(const t of ct)e.push(this._entity(s,t));for(const s of t.strings??[])s.breaker&&e.push(s.breaker);return t.total_power_entity&&e.push(t.total_power_entity),t.today_energy_entity&&e.push(t.today_energy_entity),e}updated(){this._maybeLoadHistory()}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;const e=t.get("hass");if(!e||!this.hass)return!0;for(const t of this._watched)if(e.states[t]!==this.hass.states[t])return!0;return!1}_snapshot(){const t=this._config,e=this._model,s=this.hass,i=t.latitude??s.config.latitude,n=t.longitude??s.config.longitude,o=this._scrubTime,r=mt(void 0!==o?new Date(o):new Date,i,n),a=r.elevation>(t.daylight_elevation??5),l=t=>void 0!==o?this._histVal(t,o):zt(s.states[t]?.state),c=new Map;for(const e of t.inverters){const t=this._entity(e,"power_ch_1"),i=this._entity(e,"power_ch_2");c.set(e.slot,{inv:e,missing:!s.states[t]&&!s.states[i],p:[l(t),l(i)]})}const h=(t,s)=>{const i=e.inputs.get(ut(t,s));return i?[...i.faces][0]:void 0},d=t=>void 0===t?"x":String(5*Math.round(e.faces[t].azimuth/5)),p=new Map;for(const[t,s]of c)for(const i of[0,1]){const n=e.inputs.get(ut(t,i)),o=s.p[i];if(!n||null===o)continue;const r=d(h(t,i)),a=p.get(r)??[];a.push(o/n.panels),p.set(r,a)}const u=new Map;for(const[t,e]of p)u.set(t,Dt(e));const f=a||[...u.values()].some(t=>(t??0)>=3),g=new Map;let m=0;for(const[t,i]of c){const n=i.inv,r=t=>s.states[this._entity(n,t)],c=void 0!==o?null:Tt(r("online")?.state),p=[0,1].map(s=>{const n=e.inputs.get(ut(t,s)),o=n?.panels??0,r=i.p[s],l=null!==r&&o?r/o:null,c=u.get(d(h(t,s)))??null,p=null!==l&&c&&c>0?l/c:null;let f;return f=i.missing?"missing":null===r?a?"offline":"night":null===c||c<3?a?"ok":"night":l<.1*c?"fault":l<.7*c?"low":"ok",{panels:o,power:r,wpp:l,rel:p,ref:c,status:f}});let $=wt[p[0].status]>=wt[p[1].status]?p[0].status:p[1].status;f&&!1===c&&wt[$]<wt.offline&&($="offline");const _=null===i.p[0]&&null===i.p[1]?null:(i.p[0]??0)+(i.p[1]??0);_&&(m+=_),g.set(t,{inv:n,missing:i.missing,online:c,inputs:p,power:_,temperature:l(this._entity(n,"temperature")),frequency:void 0!==o?null:zt(r("frequency")?.state),voltage:void 0!==o?null:zt(r("voltage")?.state),signal:void 0!==o?null:zt(r("signal")?.state),status:$,lastUpdate:r("power_ch_1")?.attributes?.last_data_update??r("power_ch_1")?.last_updated})}const $=e.faces.map(t=>{let e=0;for(const s of t.cells){if(void 0===s.slot||void 0===s.input)continue;const t=g.get(s.slot)?.inputs[s.input];t?.wpp&&(e+=t.wpp)}return{power:e,panels:t.panels,wpp:t.panels?e/t.panels:null,incidence:vt(r,t.azimuth,t.tilt)}});return{sun:r,day:f,inv:g,total:m,faces:$}}render(){if(this._loadError)return q`<ha-card><div class="warn" style="padding:12px">roof-pv-card: ${this._loadError}</div></ha-card>`;if(!this._config||!this._model||!this.hass)return q`<ha-card><div class="hint" style="padding:12px">loading…</div></ha-card>`;const t=this._snapshot(),e=this._config.show??Lt,s={header:()=>this._renderHeader(t),roof:()=>this._renderRoof(t),sun:()=>this._renderSun(t),strings:()=>this._renderStrings(t),inverters:()=>this._renderInverters(t),inventory:()=>this._renderInventory(t)};return q`<ha-card>
      ${e.map(t=>s[t]?s[t]():B)}
      ${this._model.warnings.length?q`<div class="warn">${this._model.warnings.map(t=>q`<div>⚠ ${t}</div>`)}</div>`:B}
    </ha-card>`}_renderHeader(t){const e=this._config,s=e.total_power_entity?zt(this.hass.states[e.total_power_entity]?.state):null,i=e.today_energy_entity?this.hass.states[e.today_energy_entity]:void 0,n=(e.panel_wp??0)*this._model.totalPanels,o=void 0!==this._scrubTime?t.total:s??t.total,r={};for(const e of t.inv.values())r[e.status]=(r[e.status]??0)+1;return q`<div class="header">
      <div class="title">${e.title??"Roof PV"}</div>
      <div class="kpis">
        <div class="kpi"><span class="v">${Pt(o)}</span><span class="l">${void 0!==this._scrubTime?`@${Rt(this._scrubTime)}`:"now"}${n?q` · ${Ht(o/n)} of ${(n/1e3).toFixed(1)} kWp`:B}</span></div>
        ${i?q`<div class="kpi clickable" @click=${()=>this._moreInfo(i.entity_id)}>
              <span class="v">${i.state} ${i.attributes.unit_of_measurement??""}</span><span class="l">today</span>
            </div>`:B}
        <div class="kpi">
          <span class="v status-row">
            ${["offline","fault","low","missing"].filter(t=>r[t]).map(t=>q`<span class="chip" style="--c:${bt[t]}">${r[t]} ${xt[t]}</span>`)}
            ${r.offline||r.fault||r.low||r.missing?B:q`<span class="chip" style="--c:${t.day?bt.ok:bt.night}">${t.inv.size} ${t.day?"ok":"night"}</span>`}
          </span>
          <span class="l">${t.inv.size} inverters · ${this._model.totalPanels} panels</span>
        </div>
      </div>
      <div class="modes">
        <button class=${"compass"===this._view?"on":""} @click=${()=>this._view="compass"} title="Roof inside a compass">Compass</button>
        <button class=${"plan"===this._view?"on":""} @click=${()=>this._view="plan"} title="Roof plan">Plan</button>
      </div>
      <div class="modes">
        <button class=${"power"===this._mode?"on":""} @click=${()=>this._mode="power"}>Power</button>
        <button class=${"relative"===this._mode?"on":""} @click=${()=>this._mode="relative"}>Relative</button>
      </div>
    </div>`}_cellColor(t,e,s){const i=t.inv.get(e),n=i?.inputs[s];if(!i||!n)return{fill:"#3a3a3a",status:"missing"};if("missing"===n.status||"offline"===n.status)return{fill:"#1a1a1a",status:n.status,s:n};const o=null!==n.ref&&n.ref>=3&&null!==n.rel?Ct(St,n.rel):"#2fa8d5";if("relative"===this._mode)return null===n.ref||n.ref<3||null===n.rel?{fill:At,status:n.status,s:n}:{fill:o,status:n.status,s:n};const r=this._config.panel_wp??400,a=Math.max(0,Math.min(1,(n.wpp??0)/r));return{fill:At,status:n.status,s:n,bar:{frac:a,color:o}}}_renderRoof(t){const e=this._model,s=this._config.slot_labels??"eave",i="eave"===s?.75:.5,n=this._config.north??0,o=this._view;let r,a=B;if("compass"===o&&this._circle){const{cx:e,cy:s,r:i}=this._circle,o=i/.885,l=1.32*o;r=[e-l,s-l,2*l,2*l],a=this._compassRing(e,s,o,n,t),this._dial={cx:e,cy:s,R:o,north:n}}else{const t=e.bbox.w+2*i+2.2,s=e.bbox.h+2*i,n=Math.max(t,s);r=[e.bbox.x-i-(n-t)/2,e.bbox.y-i-(n-s)/2,n,n]}const l=this._selected,c=this._hoverKey,h=this._config.outline??"panels",d="faces"===h?e.faces.map(t=>{const e=t.bbox;return W`<rect class="face" x=${e.x-.08} y=${e.y-.08} width=${e.w+.16} height=${e.h+.16} rx="0.08"></rect>`}):"panels"===h&&this._outline?W`<path class="face" d=${this._outline} fill-rule="evenodd"></path>`:B,p=e.cells.map(e=>{if(e.roof)return B;if(e.dummy)return W`<rect class="dummy" x=${e.x+.02} y=${e.y+.02} width=${e.w-.04} height=${e.h-.04}></rect>`;const{fill:s,status:i,s:n,bar:o}=this._cellColor(t,e.slot,e.input),r=.08,a=o?Math.max((e.h-.16)*o.frac,(n?.wpp??0)>.5?.04:0):0,h=ut(e.slot,e.input),d=void 0!==l&&l!==e.slot,p=l===e.slot||c===h,u=this._picked.includes(this._cellId(e)),f=`Inverter ${e.slot} · input ${e.input+1} · ${n?.panels??0} panels\n${Pt(n?.power)} · ${null!=n?.wpp?Math.round(n.wpp)+" W/panel":"–"} · ${Ht(n?.rel)} of median\n${xt[i]}`;return W`<g class="cell ${d?"dim":""}" @click=${t=>this._cellClick(t,e)}
          @mouseenter=${()=>this._hoverKey=h} @mouseleave=${()=>this._hoverKey=void 0}>
        <title>${f}</title>
        <rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} fill=${s} class="panel"></rect>
        ${o&&a>.005?W`<rect x=${e.x+r} y=${e.y+e.h-r-a} width=${e.w-.16} height=${a} fill=${o.color} rx="0.02" pointer-events="none"></rect>`:B}
        <rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} fill="url(#glass)" pointer-events="none"></rect>
        ${"offline"===i||"missing"===i?W`<rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} fill="url(#hatch-${i})" pointer-events="none"></rect>`:B}
        ${"fault"===i||"low"===i?W`<rect x=${e.x+.06} y=${e.y+.06} width=${e.w-.12} height=${e.h-.12} fill="none" stroke=${bt[i]} stroke-width="0.05" pointer-events="none"></rect>`:B}
        ${u?W`<circle cx=${e.x+e.w/2} cy=${e.y+e.h/2} r=${.22*Math.min(e.w,e.h)} class="pick" pointer-events="none"></circle>`:B}
        ${p?W`<rect x=${e.x+.025} y=${e.y+.025} width=${e.w-.05} height=${e.h-.05} class="hl" pointer-events="none"></rect>`:B}
      </g>`}),u=[];for(const t of e.faces){const e=new Map;for(const s of t.cells){if(void 0===s.slot)continue;const t=e.get(s.slot)??{x:0,y:0,n:0};t.x+=s.x+s.w/2,t.y+=s.y+s.h/2,t.n++,e.set(s.slot,t)}const i=t.bbox,n=.38;for(const[o,r]of e){const e=r.x/r.n,a=r.y/r.n;if("none"===s)continue;if("center"===s||!t.slope){u.push(W`<text class="slot" x=${e} y=${a} pointer-events="none">${o}</text>`);continue}const l=t.cells.filter(t=>t.slot===o),c="down"===t.slope||"up"===t.slope,h=e=>"down"===t.slope?e.row:"up"===t.slope?-e.row:"right"===t.slope?e.col:-e.col,d=Math.max(...l.map(h)),p=l.filter(t=>h(t)===d),f=p.reduce((t,e)=>t+(c?e.x+e.w/2:e.y+e.h/2),0)/p.length,[g,m]="down"===t.slope?[f,i.y+i.h+n]:"up"===t.slope?[f,i.y-n]:"left"===t.slope?[i.x-n,f]:[i.x+i.w+n,f],$=this._selected===o;u.push(W`<text class="slot eave ${$?"sel":""}" x=${g} y=${m} @click=${()=>this._select(o)}>${o}</text>`)}}const f=e.faces.map((e,s)=>{const i=e.bbox,o=t.faces[s],r=i.x+i.w/2,a=i.y+i.h/2,l=e.slope?{up:0,right:90,down:180,left:270}[e.slope]:pt(e.azimuth+n);return W`<g class="facelabel" pointer-events="none">
        <g transform="translate(${r} ${a}) rotate(${l})">
          <path d="M0,-0.55 L0.28,-0.1 L0.1,-0.1 L0.1,0.45 L-0.1,0.45 L-0.1,-0.1 L-0.28,-0.1 Z" class="slopearrow"></path>
        </g>
        <text x=${r} y=${a+.95} class="fname">${e.name}</text>
        <text x=${r} y=${a+1.35} class="fsub">${Math.round(e.azimuth)}° · ${e.tilt}° · ${Pt(o.power)}</text>
      </g>`}),g=e.bbox.x+e.bbox.w+i+1.1,m=e.bbox.y+1.2,$="compass"===o?B:W`<g transform="translate(${g} ${m}) rotate(${n})" class="compass">
      <circle r="0.85"></circle>
      <path d="M0,-0.75 L0.22,0 L0,0.12 L-0.22,0 Z" class="n"></path>
      <path d="M0,0.75 L0.22,0 L0,-0.12 L-0.22,0 Z" class="s"></path>
      <text y="-0.95" transform="rotate(${-n} 0 -1.15)" x="0">N</text>
    </g>`,_="power"===this._mode?this._legend(St,"0 %","100 % of median",`bar height: 0–${this._config.panel_wp??400} W per panel · colour:`):this._legend(St,"0 %","100 % of median"),v=void 0!==this._scrubTime;return q`<div class="roof">
      <div class="clock ${v?"past":""}">${v?"@":""}${Rt(this._scrubTime??Date.now())}</div>
      <svg viewBox=${r.join(" ")} preserveAspectRatio="xMidYMid meet"
        @pointermove=${t=>this._dragMove(t)}
        @pointerup=${t=>this._dragEnd(t)}
        @pointercancel=${t=>this._dragEnd(t)}>
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
        ${a}${d}${p}${u}${this._config.face_labels?f:B}${$}
      </svg>
      ${_}
      ${this._renderPicked()}
      ${void 0!==l?this._renderDetail(t,l):q`<div class="hint">Tap a panel to see its inverter · Shift+click marks a panel and copies its ID.</div>`}
    </div>`}_compassRing(t,e,s,i,n){const o=(s,n)=>{const o=(s+i)*Math.PI/180;return[t+Math.sin(o)*n,e-Math.cos(o)*n]},r=[];for(let t=0;t<360;t+=5){const e=t%45==0,i=s*(e?.05:t%15==0?.03:.015),[n,a]=o(t,s),[l,c]=o(t,s-i);r.push(W`<line x1=${n} y1=${a} x2=${l} y2=${c} class="tick ${e?"major":""}" style="stroke-width:${s*(e?.006:.003)}"></line>`)}const a=[["N",0],["NE",45],["E",90],["SE",135],["S",180],["SW",225],["W",270],["NW",315]].map(([t,e])=>{const i=1===t.length,n=s*(i?.042:.03),[r,a]=o(e,.95*s-.75*n);return W`<text x=${r} y=${a} class="rose ${"N"===t?"north":""}" style="font-size:${n}px">${t}</text>`}),l=[],c=this._lat(),h=this._lon(),d=this._history,p=(this._config.panel_wp??400)*this._model.totalPanels||1,u=d.reduce((t,e)=>Math.max(t,e.p),0),f=Math.max(u,.2*p),g=1.025*s,m=.22*s;for(const t of d){if(t.p<=0)continue;const e=mt(new Date(t.t),c,h);if(e.elevation<-2)continue;const i=m*Math.min(1,t.p/f),[n,r]=o(e.azimuth,g),[a,d]=o(e.azimuth,g+i),p=Math.min(1,t.p/f),u=void 0!==this._scrubTime&&t.t>this._scrubTime;l.push(W`<line x1=${n} y1=${r} x2=${a} y2=${d} class="ray" style="stroke:${Ct(kt,.35+.65*p)};stroke-width:${.009*s};opacity:${u?.25:1}"></line>`),e.azimuth}let $=B;const _=.028*s,v=n.sun.elevation>Mt,y=this._sunDay(),w=v?n.sun.azimuth:y.sunset&&Date.now()>y.sunset.getTime()?mt(y.sunset,c,h).azimuth:void 0;if(void 0!==w){const[t,e]=o(w,s),i=v?[0,45,90,135,180,225,270,315].map(s=>{const i=s*Math.PI/180;return W`<line x1=${t+Math.cos(i)*_*1.35} y1=${e+Math.sin(i)*_*1.35} x2=${t+Math.cos(i)*_*1.9} y2=${e+Math.sin(i)*_*1.9} style="stroke-width:${.32*_}"></line>`}):B;$=W`<g class="sunicon ${v?"":"down"} ${this._dragging?"dragging":""}" @pointerdown=${t=>this._dragStart(t)}>
        <circle cx=${t} cy=${e} r=${2.6*_} class="grab"></circle>
        <circle cx=${t} cy=${e} r=${_} class="disc" style="stroke-width:${.25*_}"></circle>${i}
      </g>`}return W`<g class="compassring">
      <g pointer-events="none">
        <circle cx=${t} cy=${e} r=${s} class="dial" style="stroke-width:${.006*s}"></circle>
        ${l}${r}${a}
      </g>
      ${$}
    </g>`}_svgPoint(t){const e=this.shadowRoot?.querySelector(".roof svg"),s=e?.getScreenCTM();if(!e||!s)return;const i=new DOMPoint(t.clientX,t.clientY).matrixTransform(s.inverse());return[i.x,i.y]}_dragStart(t){t.preventDefault(),t.stopPropagation(),this._stopReplay(),this._dragging=!0,this.shadowRoot?.querySelector(".roof svg")?.setPointerCapture(t.pointerId),this._loadInverterHistory(),this._dragMove(t)}_dragMove(t){if(!this._dragging||!this._dial)return;const e=this._svgPoint(t);if(!e)return;const{cx:s,cy:i,north:n}=this._dial,o=180*Math.atan2(e[0]-s,-(e[1]-i))/Math.PI,r=pt(o-n),a=this._timeForAzimuth(r);void 0!==a&&(this._scrubTime=6e4*Math.round(a/6e4))}_dragEnd(t){if(this._dragging){this._dragging=!1;try{this.shadowRoot?.querySelector(".roof svg")?.releasePointerCapture(t.pointerId)}catch(t){}this._stopReplay(),this._scrubTimer=window.setTimeout(()=>{this._replayTimer=window.setInterval(()=>{const t=Date.now(),e=this._sunDay().sunset?.getTime(),s=(this._scrubTime??t)+3e5;s>=t||void 0!==e&&s>=e?(this._stopReplay(),this._scrubTime=void 0):this._scrubTime=s},150)},1e4),this.requestUpdate()}}_stopReplay(){this._scrubTimer&&window.clearTimeout(this._scrubTimer),this._replayTimer&&window.clearInterval(this._replayTimer),this._scrubTimer=void 0,this._replayTimer=void 0}_timeForAzimuth(t){const e=this._sunDay();if(!e.sunrise)return;const s=e.sunrise.getTime(),i=Math.min(Date.now(),e.sunset?.getTime()??Date.now());if(i<=s)return;const n=this._lat(),o=this._lon();let r=s,a=1/0;for(let e=0;e<=240;e++){const l=s+(i-s)*e/240,c=mt(new Date(l),n,o).azimuth,h=Math.abs((c-t+540)%360-180);h<a&&(a=h,r=l)}return r}_histVal(t,e){const s=this._invHist.get(t);if(!s||!s.length||s[0].t>e)return null;let i=0,n=s.length-1;for(;i<n;){const t=i+n+1>>1;s[t].t<=e?i=t:n=t-1}return s[i].v}_loadInverterHistory(){if(!this.hass?.callWS||this._invHistLoading)return;if(Date.now()-this._invHistAt<12e4&&this._invHist.size)return;const t=[];for(const e of this._config.inverters)for(const s of["power_ch_1","power_ch_2","temperature"])t.push(this._entity(e,s));const e=new Date;e.setHours(0,0,0,0),this._invHistLoading=!0,this.hass.callWS({type:"history/history_during_period",start_time:e.toISOString(),end_time:(new Date).toISOString(),entity_ids:t,minimal_response:!0,no_attributes:!0}).then(e=>{const s=new Map;for(const i of t){let t=0;const n=(e?.[i]??[]).map(e=>(t=e.lu?1e3*e.lu:t,{t:t,v:zt(e.s)}));s.set(i,n)}this._invHist=s,this._invHistAt=Date.now(),this.requestUpdate()}).catch(()=>{}).finally(()=>this._invHistLoading=!1)}_maybeLoadHistory(t=!1){const e=this._config?.total_power_entity;if(!e||!this.hass?.callWS)return;const s=new Date;s.setHours(0,0,0,0);const i=`${e}|${s.toDateString()}`;!t&&i===this._historyKey&&Date.now()-this._historyAt<3e5||(this._historyKey=i,this._historyAt=Date.now(),this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),end_time:(new Date).toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0}).then(t=>{const s=t?.[e]??[],i=[];for(const t of s){const e=parseFloat(t.s);isFinite(e)&&i.push({t:1e3*t.lu,p:e})}this._history=function(t,e){if(!t.length)return[];const s=[];let i=0;const n=Math.min(Date.now(),t[t.length-1].t+9e5);for(let o=Math.ceil(t[0].t/e)*e;o<=n;o+=e){for(;i+1<t.length&&t[i+1].t<=o;)i++;s.push({t:o,p:t[i].p})}return s}(i,3e5),this.requestUpdate()}).catch(()=>{}))}_legend(t,e,s,i){const n=t.map(([t,e])=>`${e} ${100*t}%`).join(",");return q`<div class="legend">
      ${i?q`<span>${i}</span>`:B}
      <span>${e}</span><span class="bar" style="background:linear-gradient(90deg,${n})"></span><span>${s}</span>
      <span class="sw" style="--c:${bt.offline}">offline</span>
      <span class="sw" style="--c:${bt.low}">low</span>
    </div>`}_cellId(t){const e=`F${t.face+1} R${t.row} C${t.col}`;if(t.dummy||void 0===t.slot)return`${e} · dummy`;const s=this._config.inverters.find(e=>e.slot===t.slot);return`${e} · inv ${t.slot} in ${t.input+1}${s?` · ${s.serial}`:""}`}_cellClick(t,e){if(this._lastCell=e,t.shiftKey||t.ctrlKey||t.metaKey||t.altKey){const t=this._cellId(e);return this._picked.includes(t)?this._picked=this._picked.filter(e=>e!==t):this._picked=[...this._picked,t],void this._copy(this._picked.length>1?this._picked.join("\n"):t,this._picked.length>1?`${this._picked.length} panels copied`:`copied: ${t}`)}void 0!==e.slot&&this._select(e.slot)}async _copy(t,e){let s=!1;try{navigator.clipboard&&window.isSecureContext&&(await navigator.clipboard.writeText(t),s=!0)}catch(t){s=!1}if(!s){const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{s=document.execCommand("copy")}catch(t){s=!1}e.remove()}this._toast=s?e:"copy failed – select the text below",this._toastTimer&&window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast=void 0,2500)}_renderPicked(){return this._picked.length||this._toast?q`<div class="picked">
      ${this._toast?q`<div class="toast">${this._toast}</div>`:B}
      ${this._picked.length?q`<div class="pickhead">
              <b>Marked panels (${this._picked.length})</b>
              <button @click=${()=>this._copy(this._picked.join("\n"),`${this._picked.length} panels copied`)}>Copy all</button>
              <button @click=${()=>this._picked=[]}>Clear</button>
            </div>
            <pre class="picklist">${this._picked.join("\n")}</pre>`:B}
    </div>`:B}_select(t){this._selected=this._selected===t?void 0:t}_moreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}_renderDetail(t,e){const s=t.inv.get(e);if(!s)return B;const i=s.inv,n=this._config.strings?.find(t=>t.id===i.string),o=new Set;for(const t of[0,1]){const s=this._model.inputs.get(ut(e,t));s?.faces.forEach(t=>o.add(this._model.faces[t].name))}return q`<div class="detail">
      <div class="dhead">
        <span class="dot" style="--c:${bt[s.status]}"></span>
        <b>Inverter ${e}${i.name?` · ${i.name}`:""}</b>
        <span class="muted">${i.serial}</span>
        <span class="muted">${i.string??""}${n?.phase?` · ${n.phase}`:""} · ${[...o].join(", ")}</span>
        <span class="badge" style="--c:${bt[s.status]}">${xt[s.status]}</span>
        <button class="x" @click=${()=>this._selected=void 0}>✕</button>
      </div>
      <div class="dgrid">
        ${[0,1].map(t=>q`<div class="dinput clickable" @click=${()=>this._moreInfo(this._entity(i,t?"power_ch_2":"power_ch_1"))}
              @mouseenter=${()=>this._hoverKey=ut(e,t)} @mouseleave=${()=>this._hoverKey=void 0}>
            <div class="muted">Input ${t+1} · ${s.inputs[t].panels} panels</div>
            <div class="big">${Pt(s.inputs[t].power)}</div>
            <div class="muted">${null!==s.inputs[t].wpp?`${Math.round(s.inputs[t].wpp)} W/panel`:"–"} · ${Ht(s.inputs[t].rel)} of median</div>
          </div>`)}
        <div class="dvals">
          ${this._val("Temperature",It(s.temperature,"°C"),"temperature",i)}
          ${this._val("Frequency",It(s.frequency,"Hz",1),"frequency",i)}
          ${this._val("Voltage",It(s.voltage,"V"),"voltage",i)}
          ${this._val("Signal",It(s.signal,"dBm"),"signal",i)}
          ${this._val("Online",null===s.online?"–":s.online?"yes":"no","online",i)}
        </div>
      </div>
      ${this._lastCell&&this._lastCell.slot===e?q`<div class="small">Panel <span class="mono">${this._cellId(this._lastCell)}</span>
            <button class="mini" @click=${()=>this._copy(this._cellId(this._lastCell),"copied")}>Copy ID</button></div>`:B}
      ${s.lastUpdate?q`<div class="muted small">last data: ${s.lastUpdate}</div>`:B}
      ${i.history?.length?q`<div class="muted small">History: ${i.history.map(t=>`${t.serial}${t.replaced?` (replaced ${t.replaced})`:""}${t.note?` – ${t.note}`:""}`).join(" → ")} → ${i.serial}</div>`:B}
    </div>`}_val(t,e,s,i){return q`<div class="clickable" @click=${()=>this._moreInfo(this._entity(i,s))}><span class="muted">${t}</span> ${e}</div>`}_sunDay(){const t=this._config,e=t.latitude??this.hass.config.latitude,s=t.longitude??this.hass.config.longitude,i=new Date,n=`${i.toDateString()}|${e}|${s}`;return this._sunDayCache?.key!==n&&(this._sunDayCache={key:n,day:$t(i,e,s,5)}),this._sunDayCache.day}_renderSun(t){const e=this._model,s=this._config.north??0,i=this._sunDay(),n=100,o=t=>(t+s)*Math.PI/180,r=(t,e)=>{const s=n*(90-Math.max(-2,e))/90;return[Math.sin(o(t))*s,-Math.cos(o(t))*s]},a=i.path.map(t=>r(t.azimuth,t.elevation).map(t=>t.toFixed(1)).join(",")).join(" "),l=t.sun.elevation>Mt?r(t.sun.azimuth,t.sun.elevation):null,c=i.sunrise?mt(i.sunrise,this._lat(),this._lon()):null,h=i.sunset?mt(i.sunset,this._lat(),this._lon()):null,d=52/Math.max(e.bbox.w,e.bbox.h),p=-(e.bbox.x+e.bbox.w/2)*d,u=-(e.bbox.y+e.bbox.h/2)*d,f=this._config.panel_wp??400,g=e.faces.map((e,s)=>{const i=e.bbox,n=t.faces[s],o=Ct(kt,Math.sqrt(Math.max(0,n.wpp??0)/f));return W`<rect x=${p+i.x*d} y=${u+i.y*d} width=${i.w*d} height=${i.h*d} fill=${o} class="miniface"></rect>`}),m=e.faces.map((e,s)=>{const i=e.bbox,n=p+(i.x+i.w/2)*d,r=u+(i.y+i.h/2)*d,a=o(e.azimuth),l=14+22*t.faces[s].incidence;return W`<line x1=${n} y1=${r} x2=${n+Math.sin(a)*l} y2=${r-Math.cos(a)*l} class="normal" style="opacity:${.35+.65*t.faces[s].incidence}"></line>
        <circle cx=${n+Math.sin(a)*l} cy=${r-Math.cos(a)*l} r="2" class="normaltip"></circle>`}),$=e.faces.map((e,s)=>{const i=t.faces[s],n=i.panels*f/1e3;return q`<tr>
        <td>${e.name}</td>
        <td>${Math.round(e.azimuth)}° / ${e.tilt}°</td>
        <td>${Ht(i.incidence)}</td>
        <td>${Pt(i.power)}</td>
        <td>${n?Ht(i.power/(1e3*n)):"–"}</td>
      </tr>`});return q`<div class="sun">
      <svg viewBox="-135 -122 270 244" class="sky">
        <circle r=${n} class="horizon"></circle>
        <circle r=${6e3/90} class="ring"></circle>
        <circle r=${3e3/90} class="ring"></circle>
        ${[["N",0],["E",90],["S",180],["W",270]].map(([t,e])=>{const[s,i]=r(e,-10);return W`<text x=${s} y=${i} class="card ${"N"===t?"north":""}">${t}</text>`})}
        ${g}${m}
        <polyline points=${a} class="sunpath"></polyline>
        ${c?this._sunMark(r(c.azimuth,0),`↑ ${Ut(i.sunrise)}`):B}
        ${h?this._sunMark(r(h.azimuth,0),`↓ ${Ut(i.sunset)}`):B}
        ${l?W`<circle cx=${l[0]} cy=${l[1]} r="9" class="sunglow"></circle><circle cx=${l[0]} cy=${l[1]} r="5" class="sundot"></circle>`:B}
      </svg>
      <div class="suninfo">
        <div class="sunline">
          <span>☀ ${t.sun.elevation>Mt?`${Math.round(t.sun.azimuth)}° az · ${Math.round(t.sun.elevation)}° el`:"below horizon"}</span>
          <span class="muted">↑ ${Ut(i.sunrise)} · ↓ ${Ut(i.sunset)}</span>
        </div>
        <table class="faces">
          <thead><tr><th>Face</th><th>Az / tilt</th><th title="share of direct sunlight on the face right now (geometry only)">Sun angle</th><th>Power</th><th>of kWp</th></tr></thead>
          <tbody>${$}</tbody>
        </table>
      </div>
    </div>`}_lat(){return this._config.latitude??this.hass.config.latitude}_lon(){return this._config.longitude??this.hass.config.longitude}_sunMark(t,e){const[s,i]=t;return W`<circle cx=${s} cy=${i} r="2.5" class="riseset"></circle>
      <text x=${1.13*s} y=${1.13*i+3} class="rslabel">${e}</text>`}_renderStrings(t){const e=this._config.strings;if(!e?.length)return B;const s=new Map,i=e.map(e=>{const i=[...t.inv.values()].filter(t=>t.inv.string===e.id),n=i.reduce((t,e)=>t+(e.power??0),0);e.phase&&s.set(e.phase,(s.get(e.phase)??0)+n);let o="night";for(const t of i)wt[t.status]>wt[o]&&(o=t.status);const r=e.breaker?this.hass.states[e.breaker]:void 0,a=r?Tt(r.state):null,l=t.day&&i.length>0&&i.every(t=>"offline"===t.status||"fault"===t.status);return q`<div class="string ${l||!1===a?"down":""}">
        <div class="sname"><span class="dot" style="--c:${bt[o]}"></span>${e.name??e.id}${e.phase?q` <span class="muted">${e.phase}</span>`:B}</div>
        <div class="sval">${Pt(n)}</div>
        <div class="muted small">${i.map(t=>t.inv.slot).join(" ")}</div>
        ${r?q`<div class="small clickable" @click=${()=>this._moreInfo(r.entity_id)}>breaker: ${null===a?r.state:a?"on":q`<b class="bad">OFF</b>`}</div>`:l?q`<div class="small bad">whole string down – check RCBO</div>`:B}
      </div>`}),n=[...s.values()],o=n.length>1?Math.max(...n)-Math.min(...n):0;return q`<div class="section">
      <div class="stitle">Strings</div>
      <div class="strings">${i}</div>
      ${s.size?q`<div class="phases">${[...s.entries()].sort().map(([t,e])=>q`<span><b>${t}</b> ${Pt(e)}</span>`)}
            <span class="muted">imbalance ${Pt(o)}</span></div>`:B}
    </div>`}_renderInverters(t){const e=[...t.inv.values()].sort((t,e)=>t.inv.slot-e.inv.slot);return q`<div class="section">
      <div class="stitle">Inverters</div>
      <div class="tablewrap">
        <table class="inv">
          <thead><tr>
            <th></th><th>#</th><th>Serial</th><th>String</th><th>In 1</th><th>In 2</th><th>W/panel</th><th>°C</th><th>Hz</th><th>V</th><th>dBm</th>
          </tr></thead>
          <tbody>
            ${e.map(t=>{const e=t.inputs.map(t=>null===t.wpp?"–":Math.round(t.wpp)).join(" / ");return q`<tr class=${this._selected===t.inv.slot?"sel":""} @click=${()=>this._select(t.inv.slot)}>
                <td><span class="dot" title=${xt[t.status]} style="--c:${bt[t.status]}"></span></td>
                <td>${t.inv.slot}</td>
                <td class="mono">${t.inv.serial}</td>
                <td>${t.inv.string??""}</td>
                <td class=${"low"===t.inputs[0].status||"fault"===t.inputs[0].status?"warncell":""}>${Pt(t.inputs[0].power)}</td>
                <td class=${"low"===t.inputs[1].status||"fault"===t.inputs[1].status?"warncell":""}>${Pt(t.inputs[1].power)}</td>
                <td>${e}</td>
                <td>${It(t.temperature,"")}</td>
                <td>${It(t.frequency,"",1)}</td>
                <td>${It(t.voltage,"")}</td>
                <td>${It(t.signal,"")}</td>
              </tr>`})}
          </tbody>
        </table>
      </div>
    </div>`}_inventory(){const t=this._config,e=this.hass,s=new Set;s.add(t.entity_pattern??"sensor.inverter_{serial}_{key}");for(const e of t.inverters)e.prefix?.includes(e.serial)&&s.add(e.prefix.replace(e.serial,"{serial}")+"_{key}");const i=[...s].map(t=>new RegExp("^"+Ot(t).replace(Ot("{serial}"),"([0-9A-Za-z]+)").replace(Ot("{key}"),"power_ch_1")+"$")),n=new Map;for(const t of Object.keys(e.states))for(const s of i){const i=s.exec(t);i&&n.set(i[1],e.states[t])}const o=new Set(t.inverters.map(t=>t.serial)),r=new Set(t.ignore_serials??[]),a=new Set(t.inverters.flatMap(t=>(t.history??[]).map(t=>t.serial))),l=[];for(const[t,e]of n)o.has(t)||r.has(t)||l.push({serial:t,state:e.state,reporting:null!==zt(e.state),old:a.has(t)});const c=t.inverters.filter(t=>!e.states[this._entity(t,"power_ch_1")]);return{found:n.size,unknown:l,missing:c,configured:t.inverters.length,ignored:[...r].filter(t=>n.has(t))}}_renderInventory(t){const e=this._inventory(),s=e.unknown.length+e.missing.length,i=e.configured-e.missing.length;return q`<div class="section inventory ${s?"bad":""}">
      <div class="stitle clickable" @click=${()=>this._showAllInventory=!this._showAllInventory}>
        Inventory ${s?"⚠":"✓"}
        <span class="muted small">${i}/${e.configured} configured inverters found in HA${e.unknown.length?` · ${e.unknown.length} unknown`:""}${e.ignored.length?` · ${e.ignored.length} ignored`:""}</span>
      </div>
      ${s||this._showAllInventory?q`<ul class="small">
            ${e.missing.map(t=>q`<li>Slot ${t.slot}: <span class="mono">${t.serial}</span> – no entity <span class="mono">${this._entity(t,"power_ch_1")}</span></li>`)}
            ${e.unknown.map(t=>q`<li><span class="mono">${t.serial}</span> is in HA but not mapped to a slot –
                ${t.reporting?q`<b>reporting (${t.state} W)</b>`:`state ${t.state}`}${t.old?" (listed as a replaced unit)":""}</li>`)}
            ${this._showAllInventory&&e.ignored.length?q`<li>Ignored: ${e.ignored.join(", ")}</li>`:B}
          </ul>`:B}
    </div>`}}jt.properties={hass:{attribute:!1},_config:{state:!0},_mode:{state:!0},_view:{state:!0},_loadError:{state:!0},_scrubTime:{state:!0},_selected:{state:!0},_hoverKey:{state:!0},_tick:{state:!0},_showAllInventory:{state:!0},_picked:{state:!0},_lastCell:{state:!0},_toast:{state:!0}},jt.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(i,t,s)})`
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
    .roof {
      position: relative;
    }
    .clock {
      position: absolute;
      top: 10px;
      right: 14px;
      font-size: 1.1em;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--secondary-text-color);
      pointer-events: none;
      z-index: 1;
    }
    .clock.past {
      color: #ffd54f;
    }
    .roof svg {
      touch-action: pan-y;
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
    .compassring .dial {
      stroke-dasharray: none;
      fill: rgba(255, 255, 255, 0.02);
      stroke: #4a525d;
    }
    .compassring .tick {
      stroke: #59616c;
    }
    .compassring .tick.major {
      stroke: #8a929c;
    }
    .compassring .ray {
      stroke-linecap: butt;
    }
    .compassring .sunicon {
      cursor: grab;
      touch-action: none;
    }
    .compassring .sunicon.dragging {
      cursor: grabbing;
    }
    .compassring .sunicon .grab {
      fill: transparent;
    }
    .compassring .sunicon .disc {
      fill: #ffd54f;
      stroke: none;
    }
    .compassring .sunicon.down .disc {
      fill: rgba(255, 213, 79, 0.12);
      stroke: rgba(255, 213, 79, 0.5);
    }
    .compassring .sunicon line {
      stroke: #ffd54f;
      stroke-linecap: round;
    }
    .compassring .rose {
      stroke: none;
      fill: #9aa3ad;
      text-anchor: middle;
      dominant-baseline: central;
      font-weight: 600;
    }
    .compassring .rose.north {
      fill: #e53935;
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
  `,customElements.get("roof-pv-card")||customElements.define("roof-pv-card",jt),window.customCards=window.customCards||[],window.customCards.push({type:"roof-pv-card",name:"Roof PV Card",description:"Ennogie-style roof visualisation of a PV system with micro inverters",preview:!1,documentationURL:"https://github.com/MrJones4u/HA-card-ennogie-style-roof-visualisation"}),console.info("%c ROOF-PV-CARD %c 0.3.1 ","color:#fff;background:#1d5fa3;font-weight:700","color:#1d5fa3;background:#fff");

import{t as e}from"./analytics.DJaM8039.js";import{a as t,o as n,r,t as i}from"./cart.D058zq__.js";import{n as a,t as o}from"./products.D0ZgV0Fo.js";var s=7.99,c=`sg-promo-code`;function l(){try{return JSON.parse(localStorage.getItem(c)??`null`)}catch{return null}}function u(e){try{e?localStorage.setItem(c,JSON.stringify(e)):localStorage.removeItem(c)}catch{}}function d(e,t){return!e||t<=0||e.minimumAmount&&t<e.minimumAmount?0:e.percentOff?Math.round(t*e.percentOff)/100:e.amountOff?Math.min(e.amountOff,t):0}function f(e){return o.find(t=>t.slug===e)}function p(){let e=document.getElementById(`cart-lines`),t=document.getElementById(`cart-empty`),n=document.getElementById(`cart-summary`),i=document.getElementById(`cart-suggestions-section`),c=document.getElementById(`cart-suggestions`),u=document.getElementById(`cart-checkout`);if(!e||!n)return;let p=r().map(e=>({line:e,product:f(e.slug)})).filter(e=>!!e.product),g=p.length>0;t?.classList.toggle(`hidden`,g),e.classList.toggle(`hidden`,!g),u&&(u.disabled=!g),e.innerHTML=p.map(({line:e,product:t})=>{let n=t.price*e.qty;return`
        <div class="flex gap-4 py-6">
          <img src="${t.image}" alt="${t.name}" class="h-24 w-24 shrink-0 rounded-xl bg-ink-soft object-contain p-2" />
          <div class="flex flex-1 flex-col justify-between">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.1em] text-mist">${t.category}</p>
                <h3 class="mt-1 text-base font-semibold text-paper">${t.name}</h3>
              </div>
              <button type="button" data-remove="${t.slug}" class="shrink-0 text-xs uppercase tracking-[0.1em] text-mist transition-colors hover:text-accent" aria-label="Retirer ${t.name} du panier">
                Retirer
              </button>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <div class="flex items-center rounded-lg border border-ink-line">
                <button type="button" data-qty-minus="${t.slug}" class="px-3 py-1.5 text-paper-dim transition-colors hover:text-accent" aria-label="Diminuer la quantité">−</button>
                <span class="w-8 text-center font-mono text-sm text-paper">${e.qty}</span>
                <button type="button" data-qty-plus="${t.slug}" class="px-3 py-1.5 text-paper-dim transition-colors hover:text-accent" aria-label="Augmenter la quantité">+</button>
              </div>
              <p class="text-sm font-semibold text-paper">${a(n,t.currency)}</p>
            </div>
          </div>
        </div>
      `}).join(``);let _=p.reduce((e,{line:t,product:n})=>e+n.price*t.qty,0),v=l(),y=d(v,_),b=Math.max(0,49-_),x=g&&b>0?s:0,S=_-y+x,C=g&&v?y>0?`<div class="mt-2 flex items-center justify-between text-sm text-signal">
            <span>Code ${v.code}${v.percentOff?` (−${v.percentOff} %)`:``}</span>
            <span>−${a(y)}</span>
          </div>`:`<p class="mt-2 text-xs text-paper-dim">Code ${v.code} : valable dès ${a(v.minimumAmount??0)} d'achat.</p>`:``,w=g?b>0?`<div class="mt-2 flex items-center justify-between text-sm text-paper-dim">
          <span>Livraison</span>
          <span>${a(x)}</span>
        </div>
        <p class="mt-2 text-xs text-paper-dim">Plus que <span class="font-semibold text-accent">${b.toFixed(2).replace(`.`,`,`)} €</span> d'achat pour la livraison offerte.</p>`:`<div class="mt-2 flex items-center justify-between text-sm text-paper-dim"><span>Livraison</span><span class="text-signal">Offerte</span></div>`:``;if(n.innerHTML=`
    <div class="flex items-center justify-between text-sm text-paper-dim">
      <span>Sous-total</span>
      <span class="text-paper">${a(_)}</span>
    </div>
    ${C}
    ${w}
    ${g?`<div class="mt-4 flex items-baseline justify-between border-t border-ink-line pt-4">
            <span class="text-sm font-semibold text-paper">Total</span>
            <span class="font-display text-2xl font-semibold text-paper">${a(S)}</span>
          </div>
          ${v?.firstOrderOnly?`<p class="mt-2 text-xs text-mist">Code valable sur une première commande.</p>`:``}`:``}
    <p class="mt-4 text-xs leading-relaxed text-mist">
      Livraison offerte dès 49&nbsp;€ TTC d'achat, sinon 7,99&nbsp;€ de frais de livraison.
    </p>
  `,h(g),c&&i){let e=new Set(p.map(({product:e})=>e.slug)),t=o.filter(t=>!e.has(t.slug)&&!t.comingSoon);i.classList.toggle(`hidden`,t.length===0);let n={"alarme-sos":`Et pour un proche ? L'alarme SOS le relie à vous d'une simple pression.`,obd:`Et pour la voiture ? Le tracker OBD la localise en temps réel.`};c.innerHTML=t.map(e=>`
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-2xl border border-ink-line bg-white p-3 sm:grid-cols-[auto_1fr_auto] sm:gap-4 sm:p-4">
          <img src="${e.image}" alt="${e.name}" class="h-16 w-16 shrink-0 rounded-xl bg-ink-soft object-contain p-2 sm:h-20 sm:w-20" />
          <div class="min-w-0">
            <p class="text-xs text-paper-dim sm:text-sm">${n[e.slug]??``}</p>
            <h4 class="mt-0.5 text-sm font-semibold text-paper sm:mt-1 sm:text-base">${e.name}</h4>
            <p class="mt-0.5 whitespace-nowrap text-sm font-semibold text-paper">${a(e.price,e.currency)}${e.originalPrice?` <span class="text-xs font-normal text-mist line-through">${a(e.originalPrice,e.currency)}</span>`:``}</p>
          </div>
          <button type="button" data-quick-add="${e.slug}" class="col-span-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-gold-soft sm:col-span-1" aria-label="Ajouter ${e.name} au panier">
            Ajouter au panier
          </button>
        </div>
      `).join(``)}m()}function m(){document.querySelectorAll(`[data-qty-plus]`).forEach(e=>{e.onclick=()=>{let t=e.dataset.qtyPlus,i=r().find(e=>e.slug===t)?.qty??0;n(t,i+1),p()}}),document.querySelectorAll(`[data-qty-minus]`).forEach(e=>{e.onclick=()=>{let t=e.dataset.qtyMinus,i=r().find(e=>e.slug===t)?.qty??0;n(t,i-1),p()}}),document.querySelectorAll(`[data-remove]`).forEach(e=>{e.onclick=()=>{t(e.dataset.remove),p()}}),document.querySelectorAll(`[data-quick-add]`).forEach(e=>{e.onclick=()=>{i(e.dataset.quickAdd,1),e.disabled=!0,e.textContent=`✓`,e.classList.remove(`border-accent`,`text-accent`,`hover:bg-gold`,`hover:text-night`),e.classList.add(`border-signal`,`bg-signal`,`text-night`),window.setTimeout(p,500)}})}function h(e){let t=document.getElementById(`cart-promo`);if(!t)return;t.classList.toggle(`hidden`,!e);let n=l(),r=t.querySelector(`[data-promo-form]`),i=t.querySelector(`[data-promo-applied]`);if(r&&(r.hidden=!!n),i){i.hidden=!n;let e=i.querySelector(`[data-promo-label]`);e&&n&&(e.textContent=n.code)}}function g(e,t=`error`){let n=document.querySelector(`[data-promo-message]`);n&&(n.textContent=e,n.className=`mt-2 text-xs ${t===`error`?`text-promo`:`text-signal`}`,n.hidden=!e)}function _(){let t=document.getElementById(`cart-promo`);if(!t||t.dataset.wired)return;t.dataset.wired=`true`;let n=t.querySelector(`[data-promo-form]`);n?.addEventListener(`submit`,async t=>{t.preventDefault();let r=n.querySelector(`input[name=code]`),i=n.querySelector(`button`),a=r?.value.trim()??``;if(a){i&&(i.disabled=!0),g(``);try{let t=await fetch(`/api/promo-code`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:a})}),n=await t.json();if(!t.ok||!n.ok)throw Error(n.error??`Ce code promo n'est pas valide.`);u({code:n.code,percentOff:n.percentOff,amountOff:n.amountOff,minimumAmount:n.minimumAmount,firstOrderOnly:n.firstOrderOnly}),r&&(r.value=``),g(`Code appliqué.`,`ok`),e(`select_promotion`,{promotion_name:n.code}),p()}catch(e){g(e instanceof Error?e.message:`Ce code promo n'est pas valide.`)}finally{i&&(i.disabled=!1)}}}),t.querySelector(`[data-promo-remove]`)?.addEventListener(`click`,()=>{u(null),g(``),p()})}async function v(){let t=document.getElementById(`cart-checkout`),n=document.getElementById(`cart-checkout-error`);if(!t)return;n?.classList.add(`hidden`),t.disabled=!0;let i=t.textContent;t.textContent=`Redirection vers le paiement…`;try{e(`begin_checkout`,{currency:`EUR`,value:r().reduce((e,t)=>e+(f(t.slug)?.price??0)*t.qty,0)});let n=await fetch(`/api/checkout`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({lines:r(),promoCode:l()?.code??null})}),a=await n.json();if(a.invalidPromo){u(null),p(),g(a.error),t.disabled=!1,t.textContent=i;return}if(!n.ok||!a.url)throw Error(a.error??`Erreur inconnue`);window.location.href=a.url}catch{n&&(n.textContent=`Le paiement en ligne est momentanément indisponible — utilisez le formulaire de contact pour commander.`,n.classList.remove(`hidden`)),t.disabled=!1,t.textContent=i}}function y(){document.getElementById(`cart-lines`)&&(document.getElementById(`cart-checkout`)?.addEventListener(`click`,v),_(),p())}document.addEventListener(`astro:page-load`,y);
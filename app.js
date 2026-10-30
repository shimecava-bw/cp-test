(function(){
  var NAV = [
    ["トップ","HOME","index.html"],
    ["OEM・ODM","OEM SERVICE","oem.html"],
    ["実績","WORKS","works.html"],
    ["商品・ブランド","PRODUCTS","products.html"],
    ["お見積りシミュレーター","ESTIMATE","estimate.html"],
    ["会社概要","COMPANY","company.html"],
    ["お問い合わせ","CONTACT","contact.html"]
  ];
  function pic(src,alt){ return '<img class="ph" src="'+src+'" alt="'+(alt||'')+'">'; }
  function ph(t){ return '<div class="ph">'+(t||'ここに画像が入ります')+'</div>'; }
  window.PH = ph;

  function qs(k){ var m=new URLSearchParams(location.search).getAll(k); return m; }
  window.QS = qs;

  /* ---------- header / drawer / footer ---------- */
  var hdEl = document.getElementById('hd');
  if(hdEl){
    hdEl.outerHTML =
    '<header class="hd"><div class="hd-in">'+
      '<a class="logo" href="index.html"><b>CP JAPAN TRADING</b><small>Co., Ltd.</small></a>'+
      '<div class="hd-r">'+
        '<a class="hd-search" href="works.html#finder"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="8" r="6"/><path d="M12.5 12.5L18 18"/></svg><span>絞り込み検索</span></a>'+
        '<button class="burger" id="burger" aria-label="メニューを開く"><i></i><i></i><i></i></button>'+
      '</div></div></header>'+
    '<div class="ov" id="ov"></div>'+
    '<aside class="drawer" id="drawer" aria-hidden="true">'+
      '<div class="drawer-top"><button class="close" id="close" aria-label="閉じる"><i></i><i></i></button></div>'+
      '<nav class="dnav">'+NAV.map(function(n){return '<a href="'+n[2]+'">'+n[0]+'<span>'+n[1]+'</span></a>';}).join('')+'</nav>'+
      '<div class="dsearch"><h4>キーワードで実績を探す</h4>'+
        '<form action="works.html" method="get"><input type="search" name="q" placeholder="例:バッグ、OEM"><button type="submit">検索</button></form></div>'+
    '</aside>'+
    '<a class="fix-contact" href="contact.html" aria-label="お問い合わせ">'+'<svg class="fc-ring" viewBox="0 0 130 130" aria-hidden="true"><defs><path id="fcPath" d="M65,65 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0"/></defs>'+'<text><textPath href="#fcPath" textLength="336" lengthAdjust="spacing">CP JAPAN TRADING Co., Ltd. ・</textPath></text></svg>'+'<span class="fc-core">お問い<br>合わせ</span></a>';
  }
  var ftEl = document.getElementById('ft');
  if(ftEl){
    var fl = function(k,list){ return list.map(function(v){return '<a href="works.html?'+k+'='+encodeURIComponent(v)+'#finder">'+v+'</a>';}).join(''); };
    ftEl.outerHTML =
    '<section class="finder"><div class="wrap finder-in">'+
      Object.keys(AXES).map(function(k){return '<div><h4>'+AXES[k].label+'</h4>'+fl(k,AXES[k].list)+'</div>';}).join('')+
    '</div></section>'+
    '<footer class="ft"><div class="wrap">'+
      '<nav class="ft-nav">'+NAV.slice(1).map(function(n){return '<a href="'+n[2]+'">'+n[0]+'</a>';}).join('')+'</nav>'+
      '<div class="ft-sub"><a href="#">新着情報</a><a href="#">プライバシーポリシー</a><a href="#">サイトマップ</a></div>'+
      '<small>© CP JAPAN TRADING Co., Ltd.</small></div></footer>';
  }
  var body=document.body;
  function openD(){ body.classList.add('open'); document.getElementById('drawer').setAttribute('aria-hidden','false'); }
  function closeD(){ body.classList.remove('open'); document.getElementById('drawer').setAttribute('aria-hidden','true'); }
  document.addEventListener('click',function(e){
    if(e.target.closest('#burger')) openD();
    else if(e.target.closest('#close')||e.target.id==='ov') closeD();
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeD(); });

  /* ---------- placeholders ---------- */
  document.querySelectorAll('[data-ph]').forEach(function(el){ el.innerHTML = ph(el.getAttribute('data-ph')||''); });

  /* ---------- mosaic render (top / works) ---------- */
  function tileHTML(w,cls){
    return '<a class="tile ph-box '+cls+'" href="work-detail.html?id='+w.id+'">'+(w.img?pic(w.img,w.title):ph())+'<figcaption>'+w.client+'</figcaption></a>';
  }
  function sizeClass(i){ var r=i%7; return r===0?'w2 h2':(r===4?'w2':''); }

  var topM = document.getElementById('topMosaic');
  if(topM){
    var picks=[1,5,2,6,4,9,3,7].map(function(id){return WORKS.filter(function(w){return w.id===id;})[0];});
    topM.innerHTML = picks.map(function(w,i){ return tileHTML(w, i===0?'w2 h2':(i===5?'w2':'')); }).join('');
  }

  /* ---------- works list + filter ---------- */
  var list = document.getElementById('worksList');
  if(list){
    var state = { q:'', item:[], type:[], mat:[] };
    var p = new URLSearchParams(location.search);
    state.q = p.get('q')||'';
    ['item','type','mat'].forEach(function(k){ state[k]=p.getAll(k); });

    var fb = document.getElementById('fltAxes');
    fb.innerHTML = Object.keys(AXES).map(function(k,idx){
      var open = state[k].length>0;
      return '<button class="acc-h'+(open?' on':'')+'" data-acc="'+k+'" type="button">'+AXES[k].label+'</button>'+
        '<div class="acc-b'+(open?' on':'')+'" id="acc-'+k+'">'+AXES[k].list.map(function(v){
          return '<label class="chip"><input type="checkbox" data-k="'+k+'" value="'+v+'"'+(state[k].indexOf(v)>-1?' checked':'')+'><span>'+v+'</span></label>';
        }).join('')+'</div>';
    }).join('');
    var qi=document.getElementById('fltQ'); qi.value=state.q;

    function match(w){
      if(state.q){
        var hay=(w.client+w.title+w.item.join('')+w.type.join('')+w.mat.join('')).toLowerCase();
        if(hay.indexOf(state.q.toLowerCase())<0) return false;
      }
      return ['item','type','mat'].every(function(k){
        return !state[k].length || state[k].some(function(v){return w[k].indexOf(v)>-1;});
      });
    }
    function render(){
      var res = WORKS.filter(match);
      list.innerHTML = res.map(function(w,i){ return tileHTML(w,sizeClass(i)); }).join('');
      document.getElementById('cnt').textContent = res.length;
      document.getElementById('empty').style.display = res.length?'none':'block';
    }
    fb.addEventListener('click',function(e){
      var b=e.target.closest('.acc-h'); if(!b) return;
      b.classList.toggle('on'); document.getElementById('acc-'+b.getAttribute('data-acc')).classList.toggle('on');
    });
    fb.addEventListener('change',function(e){
      var k=e.target.getAttribute('data-k'); if(!k) return;
      state[k]=[].slice.call(fb.querySelectorAll('input[data-k="'+k+'"]:checked')).map(function(i){return i.value;});
      render();
    });
    qi.addEventListener('input',function(){ state.q=qi.value.trim(); render(); });
    document.getElementById('fltClear').addEventListener('click',function(){
      state={q:'',item:[],type:[],mat:[]}; qi.value='';
      fb.querySelectorAll('input').forEach(function(i){i.checked=false;}); render();
    });
    render();
    if(location.hash==='#finder'){ var f=document.getElementById('finder'); if(f) f.scrollIntoView(); }
  }

  /* ---------- work detail ---------- */
  var dt = document.getElementById('detail');
  if(dt){
    var id = parseInt(new URLSearchParams(location.search).get('id'),10)||1;
    var w = WORKS.filter(function(x){return x.id===id;})[0]||WORKS[0];
    document.title = w.title+' | CP JAPAN TRADING';
    document.getElementById('dtTitle').textContent = w.title;
    document.getElementById('dtClient').textContent = w.client;
    document.getElementById('crumbTitle').textContent = w.title;
    document.getElementById('dtProd').textContent = w.prod || '製品名(ダミー)';
    if(w.spec){ document.getElementById('dtSpec').innerHTML = w.spec; }
    document.getElementById('dtType').textContent = w.type.join(' / ');
    document.getElementById('dtMat').textContent = w.mat.join(' / ');
    document.getElementById('dtItem').textContent = w.item.join(' / ');
    document.getElementById('dtTags').innerHTML = [].concat(w.item.map(function(v){return ['item',v];}),w.type.map(function(v){return ['type',v];}),w.mat.map(function(v){return ['mat',v];}))
      .map(function(t){return '<a href="works.html?'+t[0]+'='+encodeURIComponent(t[1])+'#finder">'+t[1]+'</a>';}).join('');
    // slider
    var n=5, cur=0, view=document.getElementById('slView'), dots=document.getElementById('dots');
    view.innerHTML = Array.apply(null,Array(n)).map(function(_,i){return w.img ? '<img class="ph'+(i===0?' on':'')+'" src="'+w.img+'" alt="'+w.title+'">' : '<div class="ph'+(i===0?' on':'')+'">ここに画像が入ります ('+(i+1)+'/'+n+')</div>';}).join('');
    dots.innerHTML = Array.apply(null,Array(n)).map(function(_,i){return '<i class="'+(i===0?'on':'')+'" data-i="'+i+'"></i>';}).join('');
    function go(i){ cur=(i+n)%n; view.querySelectorAll('.ph').forEach(function(e,j){e.classList.toggle('on',j===cur);}); dots.querySelectorAll('i').forEach(function(e,j){e.classList.toggle('on',j===cur);}); }
    document.getElementById('slPrev').onclick=function(){go(cur-1)};
    document.getElementById('slNext').onclick=function(){go(cur+1)};
    dots.onclick=function(e){ if(e.target.dataset.i) go(+e.target.dataset.i); };
    // related
    var rel = WORKS.filter(function(x){return x.id!==w.id;}).slice(0,3);
    document.getElementById('rel').innerHTML = rel.map(function(r){
      return '<a href="work-detail.html?id='+r.id+'"><span class="ph-box">'+ph('')+'</span><span>'+r.client+' /<br>'+r.title+'</span></a>';
    }).join('');
    var ps = document.getElementById('prodStrip');
    ps.innerHTML = [1,2,3,4,5].map(function(i){return '<li class="ph-box">'+(w.strip?pic(w.strip[i-1],''):ph(''))+'</li>';}).join('');
  }

  /* ---------- products tabs ---------- */
  var tabs=document.getElementById('tabs');
  if(tabs){
    tabs.addEventListener('click',function(e){
      var b=e.target.closest('button'); if(!b) return;
      tabs.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);});
      document.querySelectorAll('.tp').forEach(function(x){x.classList.toggle('on',x.id==='tp-'+b.dataset.t);});
    });
    var h=location.hash.replace('#','');
    var tb=tabs.querySelector('[data-t="'+h+'"]'); if(tb) tb.click();
  }

  /* ---------- estimator (ダミー計算) ---------- */
  var est=document.getElementById('est');
  if(est){
    var BASE={ bag:[420,30], kitchen:[560,35], stat:[210,25], toy:[480,40], wood:[690,40], resin:[380,35], metal:[620,45], eco:[540,40] };
    var step=1;
    var qty=document.getElementById('qty'), qo=document.getElementById('qtyOut');
    qty.addEventListener('input',function(){ qo.innerHTML=Number(qty.value).toLocaleString()+'<small>個</small>'; });
    function show(s){
      step=s;
      document.querySelectorAll('.st').forEach(function(e,i){e.classList.toggle('on',i===s-1);});
      document.querySelectorAll('.steps li').forEach(function(e,i){e.classList.toggle('on',i===s-1);});
      document.getElementById('bk').style.display = s>1&&s<4?'':'none';
      document.getElementById('nx').style.display = s<3?'':'none';
      document.getElementById('rs').style.display = s===3?'':'none';
      document.getElementById('re').style.display = s===4?'':'none';
      window.scrollTo({top:document.getElementById('est').offsetTop-80,behavior:'smooth'});
    }
    function calc(){
      var cat=(document.querySelector('input[name=cat]:checked')||{}).value||'bag';
      var q=+qty.value, pr=+(document.querySelector('input[name=print]:checked')||{value:0}).value, pk=+(document.querySelector('input[name=pack]:checked')||{value:0}).value;
      var b=BASE[cat], f= q>=5000?0.62:q>=2000?0.74:q>=1000?0.84:q>=500?0.93:1;
      var unit=Math.round((b[0]*f+pr+pk)/10)*10, days=b[1]+(pr?7:0)+(pk?5:0)+(q>=3000?10:0);
      var lo=Math.round(unit*0.85/10)*10, hi=Math.round(unit*1.15/10)*10;
      document.getElementById('rUnit').textContent='¥'+lo.toLocaleString()+' ~ ¥'+hi.toLocaleString();
      document.getElementById('rTotal').textContent='¥'+(lo*q).toLocaleString()+' ~ ¥'+(hi*q).toLocaleString();
      document.getElementById('rDays').textContent=days+' ~ '+(days+10)+' 日';
      document.getElementById('rQty').textContent=q.toLocaleString()+' 個';
    }
    document.getElementById('nx').onclick=function(){ show(step+1); };
    document.getElementById('bk').onclick=function(){ show(step-1); };
    document.getElementById('rs').onclick=function(){ calc(); show(4); };
    document.getElementById('re').onclick=function(){ show(1); };
    show(1);
  }
})();

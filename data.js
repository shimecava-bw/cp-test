/* テスト用ダミーデータ(取引先名・案件名・数値はすべて仮) */
var AXES = {
  item: { label: "アイテムで探す", list: ["バッグ","キッチン雑貨","バスルーム雑貨","キャンドル・インテリア","文具","玩具"] },
  type: { label: "取引形態で探す", list: ["OEM","ODM","PBブランド","販促品"] },
  mat:  { label: "素材・仕様で探す", list: ["木","樹脂","金属","紙・布","コンクリート","サステナブル素材"] }
};

var WORKS = [
  { id:1,  client:"取引先名A 様", title:"NUNOGAMI A4トートバッグ(マチあり)",   item:["バッグ"],               type:["OEM"],          mat:["紙・布"],
    img:"images/work01-main.jpg",
    prod:"A4 トートバッグ(マチあり)",
    spec:"サイズ: L225 x H350 x D120mm<br>生地厚: 0.55mm<br>取っ手: ポリコットン<br>ロゴ: 1C・4C対応可能<br>MOQ: 100枚",
    strip:["images/work01-p1.jpg","images/work01-p2.jpg","images/work01-p3.jpg","images/work01-p4.jpg","images/work01-p5.jpg"] },
  { id:2,  client:"取引先名B 様", title:"キッチン雑貨セット(案件名ダミー)", item:["キッチン雑貨"],         type:["OEM","ODM"],    mat:["木","樹脂"] },
  { id:3,  client:"取引先名C 様", title:"ノベルティ文具(案件名ダミー)",     item:["文具"],                 type:["販促品"],       mat:["紙・布"] },
  { id:4,  client:"取引先名D 様", title:"コンクリート雑貨(案件名ダミー)",   item:["バスルーム雑貨"],       type:["PBブランド"],   mat:["コンクリート"] },
  { id:5,  client:"取引先名E 様", title:"サステナブルタンブラー(案件名ダミー)", item:["キッチン雑貨"],     type:["OEM"],          mat:["サステナブル素材","樹脂"] },
  { id:6,  client:"取引先名F 様", title:"LEDキャンドル(案件名ダミー)",     item:["キャンドル・インテリア"], type:["ODM","PBブランド"], mat:["樹脂"] },
  { id:7,  client:"取引先名G 様", title:"木製トイ(案件名ダミー)",           item:["玩具"],                 type:["ODM"],          mat:["木"] },
  { id:8,  client:"取引先名H 様", title:"金属製キーホルダー(案件名ダミー)", item:["文具"],                 type:["販促品"],       mat:["金属"] },
  { id:9,  client:"取引先名I 様", title:"エコバッグ(案件名ダミー)",         item:["バッグ"],               type:["OEM","販促品"], mat:["サステナブル素材","紙・布"] },
  { id:10, client:"取引先名J 様", title:"バスルームセット(案件名ダミー)",   item:["バスルーム雑貨"],       type:["PBブランド"],   mat:["コンクリート","金属"] },
  { id:11, client:"取引先名K 様", title:"木製トレイ(案件名ダミー)",         item:["キッチン雑貨","キャンドル・インテリア"], type:["OEM"], mat:["木"] },
  { id:12, client:"取引先名L 様", title:"ぬいぐるみキーホルダー(案件名ダミー)", item:["玩具"],             type:["ODM","販促品"], mat:["紙・布"] }
];

var BRANDS = [
  { key:"yura", name:"YuRa",          sub:"LED Tea lights",  text:"ブランド紹介文が入ります。(ダミー)" },
  { key:"c360", name:"360° CANDLES",  sub:"LED Candles",     text:"ブランド紹介文が入ります。(ダミー)" },
  { key:"mini", name:"MINIMALISM.",   sub:"Bathroom goods",  text:"ブランド紹介文が入ります。(ダミー)" }
];

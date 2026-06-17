/* ============================================================
   RBT ROOFING — Portfolio Dashboard
   ============================================================ */
const RM = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const TARGET_MARGIN = 25;          // company gross-margin target (%)
const RETAINAGE_PCT = 0.10;        // standard 10% retainage held
const DATA_AS_OF = window.AS_OF || '2026-05-29';
const AS_OF_DATE = new Date(DATA_AS_OF + 'T00:00');
const AS_OF_LABEL = AS_OF_DATE.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});

/* ---------------- Lucide icons (inline, no runtime dep) ---------------- */
const LU = {
  grid:'<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  list:'<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
  board:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>',
  map:'<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  cal:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  dollar:'<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>',
  layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  trend:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  trenddown:'<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>',
  warn:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  check:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  hardhat:'<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
  building:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  briefcase:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  pinoff:'<path d="M5.43 5.43A8 8 0 0 0 4 10c0 6 8 12 8 12a29.94 29.94 0 0 0 5-5"/><path d="M19.18 13.52A8 8 0 0 0 20 10a8 8 0 0 0-8-8 7.88 7.88 0 0 0-3.52.82"/><path d="M9.13 9.13A2.74 2.74 0 0 0 9 10a3 3 0 0 0 3 3 2.74 2.74 0 0 0 .87-.13"/><path d="m2 2 20 20"/>',
  chevdown:'<path d="m6 9 6 6 6-6"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
  ruler:'<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
  receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
};
function ic(name, size){ const s=size?` style="width:${size}px;height:${size}px"`:''; return `<svg class="lucide" viewBox="0 0 24 24"${s}>${LU[name]||''}</svg>`; }

/* ---------------- status meta ---------------- */
/* old report status -> industry-standard pipeline stage */
const STATUS_RENAME = {'In Progress':'In Production','Demobilized':'Substantial Completion','Postponed':'On Hold','Close Out':'Closeout'};
const STAT = {
  'Pre-Construction':{cls:'pre',col:'#b8860b',short:'Pre-Con'},
  'In Production':{cls:'prog',col:'#031b52',short:'In Production'},
  'Substantial Completion':{cls:'subc',col:'#0e7490',short:'Substantial'},
  'On Hold':{cls:'post',col:'#c8102e',short:'On Hold'},
  'Closeout':{cls:'close',col:'#1a7a4f',short:'Closeout'},
};
const STAT_ORDER = ['Pre-Construction','In Production','Substantial Completion','Closeout','On Hold'];
const ACTIVE_ST = ['In Production','Substantial Completion'];
const sm = s => STAT[s] || {cls:'demo',col:'#6b7280',short:s||'—'};
const stChip = s => `<span class="st ${sm(s).cls}"><span class="d"></span>${s}</span>`;

/* ---------------- helpers ---------------- */
const money = n => { const s=n<0?'-':''; n=Math.abs(n);
  if(n>=1e6) return s+'$'+(n/1e6).toFixed(n>=1e7?1:2)+'M';
  if(n>=1e3) return s+'$'+Math.round(n/1e3)+'K';
  return s+'$'+Math.round(n).toLocaleString(); };
const money0 = n => (n<0?'-':'')+'$'+Math.abs(Math.round(n)).toLocaleString();
const sum = (a,f)=>a.reduce((s,x)=>s+f(x),0);
const PROG_COL = p => p.pctComplete>=90?'#1a7a4f':p.pctComplete>=40?'#031b52':'#b8860b';
const dateFmt = d => { if(!d)return '—'; const x=new Date(d+'T00:00'); return x.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}); };
const dateShort = d => { if(!d)return '—'; const x=new Date(d+'T00:00'); return x.toLocaleDateString('en-US',{month:'short',day:'numeric'}); };
const squares = sqft => (sqft/100);

const personColors = ['#031b52','#2a3f6b','#5a6b8c','#8a97b0'];
const pcolor = name => { let h=0; for(let i=0;i<(name||'').length;i++) h=name.charCodeAt(i)+((h<<5)-h); return personColors[Math.abs(h)%personColors.length]; };
const initials = n => n? n.split(/[\s&/]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase():'—';
const personTag = n => n ? `${n}` : '<span class="muted">—</span>';

const countBy = (arr,key)=>{ const m={}; arr.forEach(x=>{const k=key(x); m[k]=(m[k]||0)+1;}); return m; };
const sumBy = (arr,key,val)=>{ const m={}; arr.forEach(x=>{const k=key(x); m[k]=(m[k]||0)+val(x);}); return m; };

/* canonicalize manufacturer names (merge spelling variants) */
function canonMfg(m){ if(!m)return ''; const s=m.toLowerCase().replace(/[\s.]/g,'');
  if(s.startsWith('durolast')||s.startsWith('duro-last'))return 'Duro-Last';
  if(s==='jm'||s.startsWith('johns'))return 'JM';
  if(s.startsWith('carlisle'))return 'Carlisle';
  if(s.startsWith('gaf'))return 'GAF';
  if(s.startsWith('garland'))return 'Garland';
  if(s.startsWith('ludowici'))return 'Ludowici';
  return m; }
function sectorOf(p){ const n=(p.name||'').toLowerCase();
  if(/usps|post office|postal|federal|\bva\b|court|government|gsa|military|naval|army|air force/.test(n)) return 'Government';
  if(/school|isd|univ|college|academy|education|campus|elementary|high school/.test(n)) return 'Education';
  if(/hospital|clinic|health|medical|surgery|care center/.test(n)) return 'Healthcare';
  if(/mall|store|retail|shop|market|plaza|outlet|walmart|target/.test(n)) return 'Retail';
  return 'Industrial'; }

/* ---------------- geo (for CSV imports lacking coords) ---------------- */
const STATE_LL={NY:[42.9,-75.5],OK:[35.5,-97.5],MO:[38.4,-92.3],TX:[31,-99],PA:[40.9,-77.7],CA:[36.7,-119.7],FL:[27.9,-81.7],IL:[40,-89],OH:[40.4,-82.9],GA:[32.9,-83.6],NC:[35.6,-79],MI:[44.3,-85.6],NJ:[40.1,-74.5],VA:[37.5,-78.6],WA:[47.4,-120.7],AZ:[34.2,-111.6],TN:[35.7,-86.7],IN:[39.8,-86.3],MA:[42.2,-71.5],MD:[39,-76.6],WI:[44.5,-89.5],MN:[46.3,-94.3],CO:[39,-105.5],AL:[32.8,-86.8],SC:[33.9,-80.9],LA:[31,-92],KY:[37.7,-84.9],OR:[43.9,-120.6],CT:[41.6,-72.7],KS:[38.5,-98],AR:[34.8,-92.2],NV:[39.3,-116.6],IA:[42,-93.5],MS:[32.7,-89.7],NM:[34.4,-106.1],NE:[41.5,-99.8],WV:[38.6,-80.6],ID:[44.1,-114.7],NH:[43.4,-71.6],ME:[45.4,-69.2],UT:[39.3,-111.7],DE:[39,-75.5],RI:[41.7,-71.5],MT:[46.9,-110.4],SD:[44.4,-100.2],ND:[47.5,-100.5],WY:[43,-107.5],VT:[44,-72.7],DC:[38.9,-77],HI:[20.8,-156.3],AK:[64.2,-149.5]};
function stateOf(addr){ const m=(addr||'').match(/,\s*([A-Z]{2})\s+\d{5}/)||(addr||'').match(/\b([A-Z]{2})\b\s+\d{5}/); return m?m[1]:''; }
function hashStr(s){ let h=0; s=String(s||''); for(let i=0;i<s.length;i++) h=(s.charCodeAt(i)+((h<<5)-h))|0; return Math.abs(h); }

/* real city coordinates for the cities in this dataset (matched by name in the address) */
const CITY_COORDS={
 'texarkana':[33.4418,-94.0377],'fort sill':[34.659,-98.402],'queen city':[33.1471,-94.1502],
 'chicopee':[42.1487,-72.6079],'westover':[42.1487,-72.6079],'lawton':[34.6036,-98.3959],
 'san diego':[32.7157,-117.1611],'white plains':[41.034,-73.7629],'cumberland':[39.6529,-78.7625],
 'rosenberg':[29.5572,-95.8086],'dublin':[40.0992,-83.1141],'longview':[32.5007,-94.7405],
 'new braunfels':[29.703,-98.1245],'boca raton':[26.3683,-80.1289],'duluth':[46.7867,-92.1005],
 'waxahachie':[32.3865,-96.8483],'tyler':[32.3513,-95.3011],'honolulu':[21.3069,-157.8583],
 'placida':[26.842,-82.262],'akron':[41.0814,-81.519],'albany':[31.5785,-84.1557],
 'albuquerque':[35.0844,-106.6504],'allen park':[42.2573,-83.211],'alma':[35.4773,-94.2213],
 'arkadelphia':[34.1209,-93.0538],'barksdale':[32.5018,-93.6627],'beaumont':[30.0802,-94.1266],
 'brady':[31.1352,-99.3351],'bremerton':[47.5673,-122.6326],'nasp':[30.3525,-87.3128],
 'pensacola':[30.4213,-87.2169],'chula vista':[32.6401,-117.0842],'cleveland':[41.4993,-81.6944],
 'dothan':[31.2232,-85.3905],'fayetteville':[36.0626,-94.1574],'fort plain':[42.9317,-74.6243],
 'fort smith':[35.3859,-94.3985],'fort worth':[32.7555,-97.3308],'kaufman':[32.5887,-96.3088],
 'pasadena':[29.6911,-95.2091],'laredo':[27.5306,-99.4803],'lewisburg':[37.8018,-80.4456],
 'los fresnos':[26.0712,-97.4761],'lufkin':[31.3382,-94.7291],'madison':[43.0731,-89.4012],
 'marion':[37.7306,-88.9331],'memphis':[35.1495,-90.049],'millinton':[35.3415,-89.8973],
 'millington':[35.3415,-89.8973],'mission':[39.0277,-94.6558],'montgomery':[32.3668,-86.3],
 'houston':[29.7604,-95.3698],'orange':[33.7879,-117.8531],'owensboro':[37.7742,-87.1133],
 'pennington gap':[36.7595,-83.0277],'phoenix':[33.4484,-112.074],'portsmouth':[43.0718,-70.7626],
 'reading':[40.3356,-75.9269],'richmond':[29.5822,-95.7607],'rosharon':[29.3741,-95.4849],
 'st. louis':[38.627,-90.1994],'st louis':[38.627,-90.1994],'stilwell':[35.8151,-94.6269],
 'tulsa':[36.154,-95.9928],'university park':[40.7982,-77.8599],'vicksbug':[32.3526,-90.8779],
 'vicksburg':[32.3526,-90.8779],'westhampton':[40.8259,-72.6601],'chimney hills':[36.154,-95.9928],
};
const CITY_KEYS=Object.keys(CITY_COORDS).sort((a,b)=>b.length-a.length);
function geocode(addr,state,seed){
  const a=(addr||'').toLowerCase();
  let ll=null;
  for(const k of CITY_KEYS){ if(a.includes(k)){ ll=CITY_COORDS[k]; break; } }
  if(!ll) ll=STATE_LL[state]||[39.5,-98.35];
  // small deterministic jitter so co-located jobs don't perfectly overlap
  return [ll[0]+(((seed%100)/100)-.5)*0.08, ll[1]+((((seed>>7)%100)/100)-.5)*0.08];
}

/* fill any missing fields deterministically (used for CSV imports) */
function synthMissing(p,i){
  const seed=hashStr(p.pid||p.name||('row'+i));
  const has=v=>v!==undefined&&v!==null&&v!=='';
  if(p.status&&STATUS_RENAME[p.status]) p.status=STATUS_RENAME[p.status];
  p.status = p.status || 'In Production';
  if(!has(p.state)) p.state = stateOf(p.address);
  if(!has(p.city) && p.address && p.address.includes(',')) p.city = p.address.split(',')[1].trim();
  if(!has(p.roofSystem)) p.roofSystem='';
  if(!has(p.manufacturer)) p.manufacturer = (p.roofSystem||'').split(' ')[0]||'';
  const band={'Pre-Construction':[2,12],'In Production':[35,80],'On Hold':[20,55],'Substantial Completion':[88,97],'Closeout':[97,100]}[p.status]||[10,50];
  if(!has(p.pctComplete)) p.pctComplete = band[0]+(seed%(band[1]-band[0]+1));
  if(!has(p.contractValue)) p.contractValue = Math.round((80000+(seed%23)*95000+((seed>>5)%7)*60000)/1000)*1000;
  if(!has(p.costToDate)) p.costToDate = Math.round(p.contractValue*p.pctComplete/100*(0.9+(seed%21)/100)/100)*100;
  if(!has(p.marginTarget)) p.marginTarget = 18+(seed%15);
  if(!has(p.crewSize)) p.crewSize = 3+(seed%9);
  if(!has(p.roofAreaSqft)) p.roofAreaSqft = 5000+(seed%40)*2300;
  const dur=25+(seed%90);
  if(!has(p.startDate)||!has(p.endDate)){
    let start,end;
    if(p.status==='Closeout'){start=new Date(AS_OF_DATE-((dur+(seed%30))*864e5));end=new Date(AS_OF_DATE-((seed%14)*864e5));}
    else if(p.status==='Pre-Construction'){start=new Date(+AS_OF_DATE+((14+(seed%680))*864e5));end=new Date(+start+dur*864e5);}
    else {const el=Math.round(dur*p.pctComplete/100);start=new Date(AS_OF_DATE-el*864e5);end=new Date(+start+dur*864e5);}
    if(!has(p.startDate)) p.startDate=start.toISOString().slice(0,10);
    if(!has(p.endDate)) p.endDate=end.toISOString().slice(0,10);
  }
  if(!has(p.changeOrders)) p.changeOrders = seed%4;
  if(!has(p.changeOrderValue)) p.changeOrderValue = p.changeOrders? Math.round(p.contractValue*((seed%8)/100)/100)*100 : 0;
  if(!has(p.lat)||!has(p.lng)){ const ll=STATE_LL[p.state]||[39.5,-98.35]; p.lat=ll[0]+((seed%100)/100-.5)*2.2; p.lng=ll[1]+(((seed>>7)%100)/100-.5)*2.2; }
  return p;
}

/* ---------------- job-cost / phase-code model ---------------- */
const CAT={L:'Labor',M:'Material',E:'Equipment',S:'Subcontract',B:'Burden',O:'Other'};
const EM_LABEL={P6:'Units %',P1:'Cost %'}; // earn method: P6=units % complete, P1=cost % complete
const DIVISIONS={'01':'General Conditions','02':'Demolition & Haul-Off','03':'Roof System','04':'Flashing & Detail','05':'Sheet Metal','06':'Equipment','07':'Accessories','09':'Closeout & Warranty'};
const CC_TEMPLATE=[
  {code:'01.500',desc:'Mobilization & General Conditions',um:'LS',cat:'O',em:'P1',share:.05},
  {code:'01.600',desc:'Labor Burden & Insurance',um:'LS',cat:'B',em:'P1',share:.03},
  {code:'02.100',desc:'Tear-Off & Demolition',um:'SQ',cat:'L',em:'P6',share:.10},
  {code:'02.150',desc:'Debris Haul-Off & Disposal',um:'TN',cat:'S',em:'P6',share:.05},
  {code:'03.200',desc:'Insulation & Cover Board',um:'SQ',cat:'M',em:'P6',share:.13},
  {code:'03.250',desc:'Tapered Insulation & Crickets',um:'SQ',cat:'M',em:'P6',share:.05},
  {code:'03.300',desc:'Membrane Roof System — Material',um:'SQ',cat:'M',em:'P6',share:.16},
  {code:'03.350',desc:'Membrane Installation — Labor',um:'SQ',cat:'L',em:'P6',share:.10},
  {code:'03.400',desc:'Fasteners, Plates & Adhesive',um:'SQ',cat:'M',em:'P6',share:.04},
  {code:'04.400',desc:'Flashings & Detail Work',um:'LF',cat:'L',em:'P6',share:.06},
  {code:'04.450',desc:'RTU & Curb Flashings',um:'EA',cat:'L',em:'P6',share:.04},
  {code:'05.500',desc:'Edge Metal & Sheet Metal',um:'LF',cat:'S',em:'P6',share:.06},
  {code:'05.550',desc:'Coping & Counterflashing',um:'LF',cat:'L',em:'P6',share:.04},
  {code:'06.600',desc:'Crane & Equipment Rental',um:'DAY',cat:'E',em:'P1',share:.04},
  {code:'07.700',desc:'Roof Drains, Scuppers & Accessories',um:'EA',cat:'M',em:'P6',share:.04},
  {code:'09.900',desc:'Inspection, Warranty & Closeout',um:'LS',cat:'O',em:'P1',share:.03},
  {code:'09.950',desc:'Demobilization',um:'LS',cat:'O',em:'P1',share:.015},
];
const CC_SHARE_SUM=CC_TEMPLATE.reduce((s,c)=>s+c.share,0);
const HAUL_VENDORS=['Concho Haul-Off','Lone Star Disposal','Regional Waste LLC','Tri-County Dumpsters'];
const METAL_VENDORS=['Metal Masters','Summit Sheet Metal','TexAr Metals','PAC-CLAD Fabrication'];
function genCostCodes(p){
  const out=[];
  CC_TEMPLATE.forEach(t=>{
    const sd=hashStr(p.pid+t.code);
    let cat=t.cat, vendor=null;
    if(t.code==='03.350'&&p.subcontractor){cat='S';vendor=p.subcontractor;}
    if(t.code==='02.150')vendor=HAUL_VENDORS[sd%HAUL_VENDORS.length];
    if(t.code==='05.500')vendor=METAL_VENDORS[sd%METAL_VENDORS.length];
    const revBudget=Math.round(p.costBudget*t.share/CC_SHARE_SUM/10)*10;
    const origBudget=Math.round(revBudget*(0.95+(sd%10)/100)/10)*10;
    const coBump=(p.changeOrders>0&&sd%3===0)?Math.round(revBudget*0.05/10)*10:0;
    const adjBudget=revBudget+coBump;
    let pct=p.status==='Pre-Construction'?0:p.status==='Closeout'?Math.min(100,96+sd%5):Math.max(0,Math.min(100,p.pctComplete+((sd%21)-10)));
    const perf=0.9+(sd%22)/100; // 0.90..1.11 cost performance
    const actual=Math.round(revBudget*pct/100*perf);
    const earned=Math.round(revBudget*pct/100);
    const atCompl=pct>3?Math.round(actual/(pct/100)):Math.round(revBudget*perf);
    const toCompl=Math.max(0,atCompl-actual);
    // quantities by unit of measure
    const sq=squares(p.roofAreaSqft);
    const qty=t.um==='SQ'?Math.round(sq):t.um==='LF'?Math.round(Math.sqrt(p.roofAreaSqft)*3.6):t.um==='TN'?Math.round(sq*0.45):t.um==='EA'?4+(sd%18):t.um==='DAY'?4+(sd%26):1;
    const status=['In Production','Substantial Completion','Closeout'].includes(p.status)?'bought':p.status==='On Hold'?'pending':(sd%3===0?'open':sd%3===1?'pending':'bought');
    const award=new Date(+new Date(p.startDate+'T00:00')+ (sd%10)*864e5).toISOString().slice(0,10);
    out.push({...t,cat,vendor,origBudget,revBudget,adjBudget,pct,actual,earned,
      glTD:earned-actual, toCompl, atCompl, glProj:revBudget-atCompl, qty,
      unitRev:revBudget/qty, unitTD:actual/Math.max(1,qty*pct/100), unitCompl:atCompl/qty,
      status, award});
  });
  return out;
}

/* derive computed fields */
function enrich(p){
  p.pctComplete=+p.pctComplete; p.contractValue=+p.contractValue; p.costToDate=+p.costToDate;
  p.crewSize=+p.crewSize; p.roofAreaSqft=+p.roofAreaSqft; p.marginTarget=+p.marginTarget;
  // Projects that haven't started yet cannot have any progress
  if(new Date(p.startDate+'T00:00') > AS_OF_DATE){ p.pctComplete = 0; p.costToDate = 0; }
  p.daysRemaining = Math.round((new Date(p.endDate+'T00:00')-AS_OF_DATE)/864e5);
  const gll=geocode(p.address,p.state,hashStr(p.pid||p.name)); p.lat=gll[0]; p.lng=gll[1];
  p.manufacturer = canonMfg(p.manufacturer || (p.roofSystem||'').split(' ')[0]);
  p.sector = sectorOf(p);
  p.earned = p.contractValue*p.pctComplete/100;
  p.billed = p.earned*(0.9+((String(p.pid).charCodeAt(String(p.pid).length-1)||5)%17)/100);
  p.overUnder = p.billed - p.earned;
  p.retainage = p.billed*RETAINAGE_PCT;
  p.costBudget = p.contractValue*(1-p.marginTarget/100);
  p.projFinalCost = p.pctComplete>5 ? p.costToDate/(p.pctComplete/100) : p.costBudget;
  p.projMargin = (p.contractValue - p.projFinalCost)/p.contractValue*100;
  const active = p.status==='In Production'||p.status==='Substantial Completion';
  p.onTrack = true;
  if(active){ const dur=Math.max(1,(new Date(p.endDate+'T00:00')-new Date(p.startDate+'T00:00'))/864e5);
    const timePct=Math.max(1,Math.min(99,Math.round(100*(AS_OF_DATE-new Date(p.startDate+'T00:00'))/864e5/dur)));
    p.onTrack = p.pctComplete >= timePct-12; }
  p.costCodes = genCostCodes(p);
  return p;
}

/* ---------------- global state + recompute ---------------- */
let P, M={};
function setData(arr){ P = arr.map((p,i)=>enrich(synthMissing({...p},i))); recompute(); }
function recompute(){
  M.totalContract=sum(P,p=>p.contractValue);
  M.totalCost=sum(P,p=>p.costToDate);
  M.active=P.filter(p=>p.status==='In Production'||p.status==='Substantial Completion');
  M.precon=P.filter(p=>p.status==='Pre-Construction');
  M.backlog=sum(P.filter(p=>p.status!=='Closeout'),p=>p.contractValue*(1-p.pctComplete/100));
  const monthlyRun=sum(M.active,p=>{const mo=Math.max(.5,(new Date(p.endDate+'T00:00')-new Date(p.startDate+'T00:00'))/864e5/30);return p.contractValue/mo;});
  M.backlogMonths = monthlyRun? M.backlog/monthlyRun : 0;
  M.overUnder=sum(P,p=>p.overUnder);
  M.wtMargin=sum(P,p=>p.marginTarget*p.contractValue)/M.totalContract;
  M.coValue=sum(P,p=>p.changeOrderValue);
  M.coCount=P.filter(p=>p.changeOrders>0).length;
  M.retainage=sum(P,p=>p.retainage);
  M.slipped=M.active.filter(p=>p.daysRemaining<0&&p.pctComplete<100);
  M.onTrackActive=M.active.filter(p=>p.onTrack).length;
  M.onSchedRate=M.active.length?Math.round(M.onTrackActive/M.active.length*100):0;
  M.states=new Set(P.map(p=>p.state).filter(Boolean)).size;
  M.totalSquares=sum(P,p=>squares(p.roofAreaSqft));
  // contract buyout (subcontract cost codes across portfolio)
  M.buyout=[];
  P.forEach(p=>p.costCodes.filter(c=>c.cat==='S').forEach(c=>M.buyout.push({p,c,committed:c.atCompl})));
  M.buyout.sort((a,b)=>b.committed-a.committed);
  M.committed=sum(M.buyout,b=>b.committed);
  M.boughtOut=sum(M.buyout.filter(b=>b.c.status==='bought'),b=>b.committed);
  M.boughtPct=M.committed?Math.round(M.boughtOut/M.committed*100):0;
  M.openScopes=M.buyout.filter(b=>b.c.status!=='bought').length;
  M.vendors=new Set(M.buyout.map(b=>b.c.vendor).filter(Boolean)).size;
  M.attn=getAttention();
}

/* needs-attention triage (sorted by $ at risk) */
function getAttention(){
  const out=[];
  P.forEach(p=>{
    let risk=0,type,ic2,warn=false,note;
    if(p.status==='On Hold'){ risk=p.contractValue*(1-p.pctComplete/100); type='post'; ic2='hardhat'; note='On hold · '+(p.city||p.state); }
    else if((p.status==='In Production'||p.status==='Substantial Completion')&&!p.onTrack){ risk=p.contractValue*(1-p.pctComplete/100)*0.12; ic2='clock'; warn=true; note='Behind schedule · '+p.pctComplete+'% complete'; }
    else if((p.status==='In Production'||p.status==='Substantial Completion') && p.projFinalCost>p.costBudget && p.projMargin < p.marginTarget-5){ risk=Math.max(0,(p.marginTarget-p.projMargin)/100*p.contractValue); ic2='trenddown'; note='Margin erosion · '+p.projMargin.toFixed(1)+'% proj ('+p.marginTarget+'% target)'; }
    if(risk>0&&ic2) out.push({p,risk,ic:ic2,warn,note});
  });
  return out.sort((a,b)=>b.risk-a.risk);
}

/* ---------------- chart helpers ---------------- */
function donut(segs,total,centerTop,centerBot){
  const r=58,c=2*Math.PI*r,size=152;let off=0;
  const arcs=segs.filter(s=>s.value>0).map(s=>{const len=s.value/total*c;
    const el=`<circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${s.color}" stroke-width="16" stroke-dasharray="${len.toFixed(2)} ${(c-len).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${size/2} ${size/2})"/>`;
    off+=len;return el;}).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${arcs}
    <text x="${size/2}" y="${size/2-3}" text-anchor="middle" font-size="22" font-weight="700" fill="#0c1c3a" font-family="Inter" style="font-variant-numeric:tabular-nums">${centerTop}</text>
    <text x="${size/2}" y="${size/2+17}" text-anchor="middle" font-size="12" font-weight="500" fill="#5f6b85" font-family="Inter" letter-spacing=".5">${centerBot}</text></svg>`;
}
function hbars(items,fmtVal){
  const mx=Math.max(...items.map(i=>i.value))||1;
  return items.map(i=>`<div class="hbar"><div class="hl">${i.label}</div><div class="ht"><i data-w="${(i.value/mx*100).toFixed(1)}%" style="width:0${i.color?';background:'+i.color:''}"></i></div><div class="hv">${fmtVal(i.value)}</div></div>`).join('');
}

/* ---------------- animation utilities ---------------- */
function reveal(scope){ const els=scope.querySelectorAll('[data-w]');
  if(RM){els.forEach(e=>e.style.width=e.dataset.w);return;}
  requestAnimationFrame(()=>requestAnimationFrame(()=>els.forEach(e=>e.style.width=e.dataset.w)));
}
function runCountup(scope){
  scope.querySelectorAll('.countup').forEach(el=>{
    const tgt=+el.dataset.target, fmt=el.dataset.fmt;
    const f=v=>fmt==='money'?money(v):fmt==='signed'?((v>=0?'+':'')+money(v)):fmt==='pct1'?v.toFixed(1)+'%':Math.round(v).toLocaleString();
    if(RM){el.textContent=f(tgt);return;}
    const dur=900,t0=performance.now();
    (function step(t){let p=Math.min(1,(t-t0)/dur);p=1-Math.pow(2,-10*p);el.textContent=f(tgt*p);p<1?requestAnimationFrame(step):(el.textContent=f(tgt));})(performance.now());
  });
}

/* ============================================================
   NAV / ROUTER
   ============================================================ */
const NAV=[
  {grp:'Workspace'},
  {id:'overview',label:'Overview',icon:'grid',title:'Current Projects',sub:'Active jobs — what\'s behind schedule and where money is at risk'},
  {id:'projects',label:'Projects',icon:'list',title:'All Projects',sub:'Sortable register of every project in the portfolio'},
  {id:'schedule',label:'Schedule',icon:'cal',title:'Project Schedule',sub:'Timeline of active and upcoming work'},
  {id:'map',label:'Job Map',icon:'map',title:'Job-Site Map',sub:'Geographic view of all project locations'},
  {grp:'Job Costing'},
  {id:'cost',label:'Cost Control',icon:'receipt',title:'Cost Control',sub:'Phase-code job cost report — budget vs. actual vs. projected'},
  {id:'changeorders',label:'Change Orders',icon:'ruler',title:'Change Orders',sub:'Approved scope additions and contract adjustments'},
  {id:'buyout',label:'Contract Buyout',icon:'briefcase',title:'Contract Buyout',sub:'Subcontractor & vendor commitments and buyout status'},
  {grp:'Financials'},
  {id:'billing',label:'Billing & AR',icon:'dollar',title:'Billing & Accounts Receivable',sub:'Progress billing, retainage and over/under billing by job'},
  {id:'financials',label:'Financials',icon:'trend',title:'Financials',sub:'Contract value, cost-to-date, billing and margin'},
  {grp:'Field'},
  {id:'crews',label:'Crews & Teams',icon:'users',title:'Crews & Teams',sub:'Workload by project manager, supervisor and subcontractor'},
  {id:'weather',label:'Weather Planning',icon:'cal',title:'Weather Planning',sub:'14-day forecast by job site — plan around rain days'},
];
let mapInited=false, curView='overview';
function buildNav(){
  document.getElementById('nav').innerHTML=NAV.map(n=>{
    if(n.grp)return `<div class="lbl">${n.grp}</div>`;
    return `<a data-view="${n.id}"${n.id===curView?' class="active"':''}>${ic(n.icon)}<span>${n.label}</span></a>`;
  }).join('');
  document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>route(a.dataset.view));
}
function route(id){
  curView=id;
  document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('active',a.dataset.view===id));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('show'));
  const v=document.getElementById('view-'+id); v.classList.add('show');
  const meta=NAV.find(n=>n.id===id);
  document.getElementById('vtitle').textContent=meta.title;
  document.getElementById('vsub').textContent=meta.sub;
  document.getElementById('printTitle').textContent=meta.title;
  if(id==='cost') renderCost();
  if(id==='weather') renderWeather();
  reveal(v); runCountup(v);
  if(id==='map'){ if(!mapInited) setTimeout(initMap,60); else setTimeout(()=>window._lmap.invalidateSize(),60); }
}

/* ============================================================
   OVERVIEW
   ============================================================ */
function renderOverview(){
  const cur=M.active;                                  // current jobs = In Production + Substantial Completion
  const behindJobs=cur.filter(p=>!p.onTrack);
  const behind=behindJobs.length;
  const expPct=p=>{const dur=Math.max(1,(new Date(p.endDate+'T00:00')-new Date(p.startDate+'T00:00'))/864e5);return Math.max(1,Math.min(99,Math.round(100*(AS_OF_DATE-new Date(p.startDate+'T00:00'))/864e5/dur)));};
  const overrun=p=>Math.max(0,p.projFinalCost-p.costBudget);
  const atRiskTotal=sum(M.attn,a=>a.risk);
  const curValue=sum(cur,p=>p.contractValue);            // contract value of active jobs (pipeline)
  const billedYTD=sum(P,p=>p.billed);                    // total billed to date (cash)
  const netVar=sum(cur,p=>p.projFinalCost-p.costBudget); // net projected cost vs cost budget (+ over / − under)
  const projMargin=curValue?(curValue-sum(cur,p=>p.projFinalCost))/curValue*100:0; // projected gross margin on active work (profit)
  const strip=[
    {lbl:'Work in Progress',val:money(curValue),unit:`across ${cur.length} active jobs`},
    {lbl:'Projected Margin',val:`${projMargin.toFixed(1)}%`,unit:`vs ${TARGET_MARGIN}% target`,good:projMargin>=TARGET_MARGIN,risk:projMargin<0},
    {lbl:'Projected Cost vs Budget',val:`${netVar>=0?'+':'−'}${money(Math.abs(netVar))}`,unit:netVar>=0?'over budget':'under budget',risk:netVar>0,good:netVar<0},
    {lbl:'Billed to Date',val:money(billedYTD),unit:`(${Math.round(billedYTD/M.totalContract*100)}% of contract value)`},
  ];
  // active-work health composition (mutually exclusive buckets, weighted by contract value)
  const hbucket=p=>!p.onTrack?'behind':(p.projFinalCost>p.costBudget?'overbudget':'ontrack');
  const healthMix=[
    {k:'ontrack',label:'On Track',col:'#1a7a4f'},
    {k:'overbudget',label:'Over Budget',col:'#b8860b'},
    {k:'behind',label:'Behind',col:'#c8102e'},
  ].map(s=>{const j=cur.filter(p=>hbucket(p)===s.k);return{...s,n:j.length,val:sum(j,p=>p.contractValue)};});
  const revToDate=sum(cur,p=>p.earned);                  // revenue recognized to date on active jobs
  const marginToDate=revToDate?(revToDate-sum(cur,p=>p.costToDate))/revToDate*100:0; // realized gross margin to date

  document.getElementById('view-overview').innerHTML=`
  <div class="confstrip" style="padding:18px 8px">${strip.map((s,i)=>`
    <div style="flex:1;padding:0 26px;${i?'border-left:1px solid var(--line2)':''}">
      <div style="font-size:var(--fs-base);font-weight:var(--fw-bold);color:var(--ink)">${s.lbl}</div>
      <div style="font-size:var(--fs-sm);color:var(--muted);font-weight:var(--fw-normal);margin-top:4px"><span${s.risk?' style="color:var(--red)"':s.good?' style="color:var(--success)"':''}>${s.val}</span> ${s.unit}</div>
    </div>`).join('')}
  </div>

  <div class="card" style="margin-bottom:20px"><div class="hd"><div><h3>Active Work Health</h3><div class="sub">${cur.length} active jobs · ${money(curValue)} contract value by status</div></div>
    <div style="display:flex;gap:28px;text-align:right;flex:none">
      <div><div style="font-size:var(--fs-sm);text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:var(--fw-bold)">Revenue to Date</div><div class="num" style="font-size:var(--fs-base);font-weight:var(--fw-bold);color:var(--ink);margin-top:3px">${money(revToDate)}</div></div>
      <div><div style="font-size:var(--fs-sm);text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:var(--fw-bold)">Margin to Date</div><div class="num" style="font-size:var(--fs-base);font-weight:var(--fw-bold);margin-top:3px;color:${marginToDate>=TARGET_MARGIN?'var(--success)':marginToDate<0?'var(--red)':'var(--ink)'}">${marginToDate.toFixed(1)}%</div></div>
    </div></div>
    <div class="bd">
      <div class="stackbar">${healthMix.filter(g=>g.val>0).map(g=>`<i data-w="${(g.val/(curValue||1)*100).toFixed(1)}%" style="width:0;background:${g.col}" title="${g.label}: ${g.n} jobs · ${money(g.val)}">${g.val/(curValue||1)>0.07?money(g.val):''}</i>`).join('')}</div>
      <div class="stacklegend">${healthMix.map(g=>`<span><i style="background:${g.col}"></i>${g.label}<b>${g.n} · ${money(g.val)}</b></span>`).join('')}</div>
    </div></div>

  <div class="grid2">
    <div class="card"><div class="hd"><div><h3>Behind Schedule</h3><div class="sub">${behind} current job${behind===1?'':'s'} behind pace</div></div></div>
      <div class="bd tbl-wrap">${behind?`<table><thead><tr><th>Project</th><th style="width:160px">Progress</th><th>Target Finish</th></tr></thead>
      <tbody>${behindJobs.slice().sort((a,b)=>(expPct(b)-b.pctComplete)-(expPct(a)-a.pctComplete)).map(p=>{const dr=p.daysRemaining;return `<tr data-pid="${p.pid}">
        <td><div class="pname">${p.name}</div><div class="pid">${p.pid} · ${p.city||p.state} · ${p.pm}</div></td>
        <td><div style="display:flex;align-items:center;gap:9px"><div class="pbar"><i data-w="${p.pctComplete}%" style="width:0;background:${PROG_COL(p)}"></i></div><b class="num" style="font-size:var(--fs-sm)">${p.pctComplete}%</b></div></td>
        <td><span class="loc num">${dateFmt(p.endDate)}</span> <span class="num" style="font-size:var(--fs-sm);color:${dr<0?'var(--red)':'var(--faint)'}">${dr<0?Math.abs(dr)+'d over':dr+'d left'}</span></td>
      </tr>`;}).join('')}</tbody></table>`:`<div class="empty">${ic('check',30)}All current jobs on schedule</div>`}</div></div>

    <div class="card"><div class="hd"><div><h3>Money at Risk</h3><div class="sub">${money(atRiskTotal)} · ranked by exposure</div></div></div>
      <div class="bd" style="padding-top:6px"><div class="alist">
        ${M.attn.slice(0,7).map(a=>`<div class="arow" data-pid="${a.p.pid}">
          <div style="min-width:0"><div class="t">${a.p.name}</div><div class="s">${a.note}</div></div>
          <div class="r"><div class="risk">${money(a.risk)}</div><div class="who">${a.p.pm}</div></div>
        </div>`).join('') || `<div class="empty">${ic('check',30)}No flagged jobs</div>`}
      </div></div></div>
  </div>

  <div class="card"><div class="hd"><div><h3>Current Projects · Cost Projection</h3><div class="sub">${cur.length} active job${cur.length===1?'':'s'} — projected final cost vs. contract</div></div>
    <div class="legend"><span><i style="background:#1a7a4f"></i>On track</span><span><i style="background:#b8860b"></i>Over budget</span><span><i style="background:#c8102e"></i>Behind / loss</span></div></div>
    <div class="bd tbl-wrap"><table><thead><tr><th>Project</th><th style="width:150px">Progress</th><th class="r">Contract</th><th class="r">Cost Budget</th><th class="r">Proj. Final</th><th class="r">Proj. Margin</th><th>Health</th></tr></thead>
    <tbody>${cur.slice().sort((a,b)=>overrun(b)-overrun(a)).map(p=>{const over=p.projFinalCost>p.costBudget;const loss=p.projFinalCost>p.contractValue;const mcol=p.projMargin<0?'var(--red)':p.projMargin>=p.marginTarget?'var(--success)':'var(--ink2)';const bad=!p.onTrack||over;return `<tr data-pid="${p.pid}">
      <td><div class="pname">${p.name}</div><div class="pid">${p.pid} · ${p.city||p.state}</div></td>
      <td><div style="display:flex;align-items:center;gap:9px"><div class="pbar"><i data-w="${p.pctComplete}%" style="width:0;background:${PROG_COL(p)}"></i></div><b class="num" style="font-size:var(--fs-sm)">${p.pctComplete}%</b></div></td>
      <td class="r mono-val">${money(p.contractValue)}</td>
      <td class="r mono-val">${money(p.costBudget)}</td>
      <td class="r mono-val"${loss?' style="color:var(--red);font-weight:var(--fw-bold)"':over?' style="color:var(--warn);font-weight:var(--fw-bold)"':''}>${money(p.projFinalCost)}</td>
      <td class="r mono-val" style="color:${mcol}">${p.projMargin.toFixed(1)}%</td>
      <td>${!bad?'<span class="st close"><span class="d"></span>On track</span>':`<span class="st post"><span class="d"></span>${p.onTrack?'Over budget':'Behind'}</span>`}</td>
    </tr>`;}).join('')}</tbody></table></div></div>`;
  bindRows('view-overview');
}

/* ============================================================
   PROJECTS
   ============================================================ */
let pFilter='all', pSector='all', pState='all', pPm='all', pSort={k:'contractValue',dir:-1};
const sortVals=(arr)=>[...new Set(arr.filter(Boolean))].sort();
function renderProjects(){
  const statuses=['all',...STAT_ORDER.filter(s=>P.some(p=>p.status===s))];
  const sectors=['all',...sortVals(P.map(p=>p.sector))];
  const states=['all',...sortVals(P.map(p=>p.state))];
  const pms=['all',...sortVals(P.map(p=>p.pm))];
  document.getElementById('view-projects').innerHTML=`
    <div class="fbar">
      ${fsel('status','Status',statuses,pFilter)}
      ${fsel('sector','Type',sectors,pSector)}
      ${fsel('state','State',states,pState)}
      ${fsel('pm','Project Manager',pms,pPm)}
      <button class="fclear" id="fclear">Clear filters</button>
      <div style="margin-left:auto;font-size:var(--fs-sm);color:var(--muted);font-weight:var(--fw-normal)" class="num" id="projStat"></div>
    </div>
    <div class="card"><div class="bd tbl-wrap" id="projTbl"></div></div>`;
  wireFilters('view-projects',{status:v=>pFilter=v,sector:v=>pSector=v,state:v=>pState=v,pm:v=>pPm=v},renderProjects);
  document.getElementById('fclear').onclick=()=>{pFilter=pSector=pState=pPm='all';renderProjects();};
  drawProjTable();
}
/* compact filter dropdown (construction-software style) */
function fsel(field,label,opts,cur){
  return `<div class="fsel" data-field="${field}">
    <div class="fsel-lbl">${label}</div>
    <button type="button" class="fsel-btn"><span>${cur==='all'?'All':cur}</span>${ic('chevdown')}</button>
    <div class="csel-panel">${opts.map(o=>`<div class="csel-opt${o===cur?' on':''}" data-v="${o}">${o==='all'?'All':o}</div>`).join('')}</div>
  </div>`;
}
function wireFilters(scope,setters,rerender){
  const root=document.getElementById(scope);
  root.querySelectorAll('.fsel').forEach(fs=>{
    const btn=fs.querySelector('.fsel-btn'), field=fs.dataset.field;
    btn.onclick=e=>{e.stopPropagation();const open=fs.classList.contains('open');root.querySelectorAll('.fsel').forEach(x=>x.classList.remove('open'));if(!open)fs.classList.add('open');};
    fs.querySelectorAll('.csel-opt').forEach(o=>o.onclick=()=>{setters[field](o.dataset.v);rerender();});
  });
  document.addEventListener('click',function close(ev){if(!root.contains(ev.target)){root.querySelectorAll('.fsel').forEach(x=>x.classList.remove('open'));document.removeEventListener('click',close);}});
}
function drawProjTable(){
  const q=(document.getElementById('search').value||'').toLowerCase();
  let rows=P.filter(p=>(pFilter==='all'||p.status===pFilter)&&(pSector==='all'||p.sector===pSector)&&(pState==='all'||p.state===pState)&&(pPm==='all'||p.pm===pPm));
  if(q) rows=rows.filter(p=>(p.name+p.pid+p.address+p.pm+p.roofSystem+(p.supervisor||'')+(p.subcontractor||'')).toLowerCase().includes(q));
  const {k,dir}=pSort;
  rows.sort((a,b)=>{let x=a[k],y=b[k];if(typeof x==='string'){x=x.toLowerCase();y=(y||'').toLowerCase();}return x<y?-dir:x>y?dir:0;});
  const ps=document.getElementById('projStat'); if(ps) ps.textContent=`${rows.length} of ${P.length} projects · ${money(sum(rows,p=>p.contractValue))} contract`;
  const cols=[['name','Project',''],['sector','Type',''],['state','State',''],['status','Status',''],['pctComplete','% Compl','r'],['contractValue','Contract','r'],['costToDate','Cost to Date','r'],['pm','Project Mgr',''],['endDate','Target Finish','']];
  const arrow=key=>pSort.k===key?`<span class="sorti" style="${dir<0?'':'transform:rotate(180deg)'}">${ic('chevdown',11)}</span>`:'';
  const tC=sum(rows,p=>p.contractValue), tK=sum(rows,p=>p.costToDate);
  document.getElementById('projTbl').innerHTML=`<table><thead><tr>${cols.map(c=>`<th data-k="${c[0]}" class="${c[2]}">${c[1]}${arrow(c[0])}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(p=>{const dr=p.daysRemaining;
      const tl=p.status==='Closeout'?`<span class="loc num">Done ${dateFmt(p.endDate)}</span>`
        :p.status==='Pre-Construction'?`<span class="loc num">Starts ${dateFmt(p.startDate)}</span>`
        :`<span class="loc num">${dateFmt(p.endDate)}</span> <span style="font-size:var(--fs-sm);color:${dr<0?'var(--red)':'var(--faint)'}" class="num">${dr<0?Math.abs(dr)+'d over':dr+'d left'}</span>`;
      return `<tr data-pid="${p.pid}">
        <td><div class="pname">${p.name}</div><div class="pid">${p.pid} · ${p.city||'—'}</div></td>
        <td><span style="font-weight:var(--fw-normal);font-size:var(--fs-sm)">${p.sector||'—'}</span></td>
        <td><span class="loc num">${p.state||'—'}</span></td>
        <td>${stChip(p.status)}</td>
        <td class="r"><div style="display:flex;align-items:center;gap:9px;justify-content:flex-end"><div class="pbar" style="min-width:54px"><i data-w="${p.pctComplete}%" style="width:0;background:${PROG_COL(p)}"></i></div><b style="font-size:var(--fs-sm)" class="num">${p.pctComplete}%</b></div></td>
        <td class="r mono-val">${money(p.contractValue)}</td>
        <td class="r mono-val">${money(p.costToDate)}</td>
        <td>${personTag(p.pm)}</td>
        <td>${tl}</td></tr>`;}).join('')}</tbody>
    ${rows.length?`<tfoot><tr class="totalrow"><td>Total · ${rows.length} jobs</td><td></td><td></td><td></td><td></td><td class="r mono-val">${money(tC)}</td><td class="r mono-val">${money(tK)}</td><td></td><td></td></tr></tfoot>`:''}</table>
    ${rows.length?'':`<div class="empty">${ic('inbox',30)}No projects match your filters.</div>`}`;
  document.querySelectorAll('#projTbl th').forEach(th=>th.onclick=()=>{const k=th.dataset.k;pSort.dir=pSort.k===k?-pSort.dir:-1;pSort.k=k;drawProjTable();});
  bindRows('projTbl'); reveal(document.getElementById('projTbl'));
}

/* ============================================================
   MAP
   ============================================================ */
function initMap(){
  const map=L.map('map',{scrollWheelZoom:true}).setView([39.2,-95],4.3);
  window._lmap=map;
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{attribution:'© OpenStreetMap © CARTO',subdomains:'abcd',maxZoom:19}).addTo(map);
  const rad=v=>6+Math.sqrt(v/1e6)*9;
  P.forEach(p=>{
    const risk=p.status==='On Hold'||((p.status==='In Production'||p.status==='Substantial Completion')&&!p.onTrack);
    const col=risk?'#c8102e':'#031b52';
    L.circleMarker([p.lat,p.lng],{radius:rad(p.contractValue),fillColor:col,color:'#fff',weight:1.5,fillOpacity:.78})
     .bindPopup(`<div class="mp"><div class="mp-h"><div class="t">${p.name}</div><div class="p">${p.pid} · ${p.status}</div></div>
       <div class="mp-b">
        <div class="mp-r"><span class="k">Location</span><span class="v">${p.address}</span></div>
        <div class="mp-r"><span class="k">Value</span><span class="v">${money0(p.contractValue)} · ${p.pctComplete}% complete</span></div>
        <div class="mp-r"><span class="k">System</span><span class="v">${p.roofSystem||'—'}</span></div>
        <div class="mp-r"><span class="k">Team</span><span class="v">${p.pm}${p.supervisor?' · '+p.supervisor:''}</span></div>
       </div></div>`,{maxWidth:280}).addTo(map);
  });
  const lg=L.control({position:'bottomright'});
  lg.onAdd=()=>{const d=L.DomUtil.create('div');d.style.cssText='background:#fff;padding:11px 13px;border-radius:10px;box-shadow:0 12px 32px rgba(3,27,82,.18);font:var(--fw-normal) var(--fs-sm) Inter';
    d.innerHTML='<div style="font-weight:var(--fw-bold);margin-bottom:7px;font-size:var(--fs-sm);text-transform:uppercase;letter-spacing:.6px;color:#94a3b8">Job Sites</div>'+
      '<div style="display:flex;align-items:center;gap:7px;margin:4px 0;color:#33415c"><i style="width:10px;height:10px;border-radius:50%;background:#031b52;display:inline-block"></i>On track</div>'+
      '<div style="display:flex;align-items:center;gap:7px;margin:4px 0;color:#33415c"><i style="width:10px;height:10px;border-radius:50%;background:#c8102e;display:inline-block"></i>Needs attention</div>'+
      '<div style="margin-top:8px;font-size:var(--fs-sm);color:#94a3b8">Dot size = contract value</div>';return d;};
  lg.addTo(map); mapInited=true;
}

/* ============================================================
   SCHEDULE (Gantt)
   ============================================================ */
function renderSchedule(){
  const rows=P.filter(p=>p.status!=='Closeout').slice().sort((a,b)=>new Date(a.startDate)-new Date(b.startDate));
  if(!rows.length){document.getElementById('view-schedule').innerHTML=`<div class="card"><div class="empty">${ic('cal',30)}No active or upcoming work scheduled.</div></div>`;return;}
  const min=new Date(Math.min(...rows.map(p=>+new Date(p.startDate)))); min.setDate(1);
  const max=new Date(Math.max(...rows.map(p=>+new Date(p.endDate))));
  const span=(max-min)/864e5+15;
  const pos=d=>((new Date(d)-min)/864e5)/span*100;
  let months=[],cur=new Date(min);
  while(cur<=max){months.push(new Date(cur));cur.setMonth(cur.getMonth()+1);}
  const monthEls=months.map(m=>`<div class="gt-month" style="left:${pos(m)}%">${m.toLocaleDateString('en-US',{month:'short',year:'2-digit'})}</div>`).join('');
  document.getElementById('view-schedule').innerHTML=`
   <div class="filters"><div class="pill on" style="cursor:default">${rows.length} active &amp; upcoming jobs</div>
     <div class="legend" style="margin-left:6px">${['Pre-Construction','In Production','Substantial Completion','On Hold'].map(s=>`<span><i style="background:${sm(s).col}"></i>${s}</span>`).join('')}</div></div>
   <div class="card"><div class="bd"><div class="gantt"><div style="min-width:940px">
     <div class="gt-head"><div></div><div class="gt-months">${monthEls}</div></div>
     <div style="position:relative">
       <div class="gt-today" style="left:calc(230px + (100% - 230px) * ${pos(DATA_AS_OF)/100})"><b>TODAY</b></div>
       ${rows.map((p,i)=>{const l=pos(p.startDate),w=Math.max(pos(p.endDate)-l,1.4);const c=sm(p.status).col;
         return `<div class="gt-row" data-pid="${p.pid}">
           <div class="gt-lbl"><div class="n">${p.name}</div><div class="m">${p.crewSize} crew</div></div>
           <div class="gt-track"><div class="gt-bar" style="left:${l}%;width:${w}%;animation-delay:${RM?0:Math.min(i*30,600)}ms" title="${dateShort(p.startDate)} → ${dateShort(p.endDate)} · ${p.pctComplete}%">
             <div class="fill" style="width:100%;background:${c};opacity:.22"></div>
             <div class="fill" style="width:${p.pctComplete}%;background:${c}"></div>
             ${w>7?`<span class="lab">${p.pctComplete}%</span>`:''}</div></div>
         </div>`;}).join('')}
     </div></div></div></div></div>`;
  bindRows('view-schedule');
}

/* ============================================================
   CREWS & TEAMS
   ============================================================ */
function renderCrews(){
  function agg(keyFn){const m={};P.forEach(p=>{const k=keyFn(p);if(!k)return;(m[k]=m[k]||{n:0,active:0,val:0,crew:0,pct:0,pctn:0});const o=m[k];o.n++;o.val+=p.contractValue;
    if(p.status==='In Production'||p.status==='Substantial Completion'){o.active++;o.crew+=p.crewSize;}
    if(p.status!=='Pre-Construction'){o.pct+=p.pctComplete;o.pctn++;}});
    return Object.entries(m).map(([name,o])=>({name,...o,avg:o.pctn?Math.round(o.pct/o.pctn):0})).sort((a,b)=>b.val-a.val);}
  const pms=agg(p=>p.pm),sups=agg(p=>p.supervisor),subs=agg(p=>p.subcontractor);
  const deployed=sum(M.active,p=>p.crewSize);
  const supLoad=sups.filter(s=>s.crew>0).sort((a,b)=>b.crew-a.crew).slice(0,8);
  const teamTable=(data,roleLbl)=>`<table><thead><tr><th>${roleLbl}</th><th class="r">Projects</th><th class="r">Active</th><th class="r">Value Managed</th><th style="width:130px">Avg %</th></tr></thead>
    <tbody>${data.map(d=>`<tr style="cursor:default">
      <td>${personTag(d.name)}</td><td class="r"><b class="num">${d.n}</b></td>
      <td class="r"><span class="st prog" style="padding:2px 9px"><span class="d"></span>${d.active}</span></td>
      <td class="r mono-val">${money(d.val)}</td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="pbar" style="min-width:54px"><i data-w="${d.avg}%" style="width:0;background:${PROG_COL({pctComplete:d.avg})}"></i></div><b style="font-size:var(--fs-sm)" class="num">${d.avg}%</b></div></td>
    </tr>`).join('')}</tbody></table>`;
  document.getElementById('view-crews').innerHTML=`
   <div class="grid2">
     <div class="card"><div class="hd"><div><h3>Project Manager Workload</h3><div class="sub">Ranked by total contract value managed</div></div></div><div class="bd tbl-wrap">${teamTable(pms,'Project Manager')}</div></div>
     <div class="card"><div class="hd"><div><h3>Supervisor Crew Load</h3><div class="sub">Workers on active sites — who can take the next job</div></div></div>
       <div class="bd">${supLoad.length?hbars(supLoad.map(s=>({label:s.name,value:s.crew})),v=>v+' crew'):`<div class="empty">${ic('hardhat',30)}No active crews deployed.</div>`}</div></div>
   </div>
   <div class="grid-2e">
     <div class="card"><div class="hd"><div><h3>Field Supervisors</h3><div class="sub">Boots-on-the-ground leads</div></div></div><div class="bd tbl-wrap">${teamTable(sups.slice(0,12),'Supervisor')}</div></div>
     <div class="card"><div class="hd"><div><h3>Subcontractors</h3><div class="sub">Installing crews</div></div></div><div class="bd tbl-wrap">${teamTable(subs.slice(0,12),'Subcontractor')}</div></div>
   </div>`;
}

/* ============================================================
   FINANCIALS
   ============================================================ */
function renderFinancials(){
  const releasable=sum(P.filter(p=>p.status==='Closeout'),p=>p.retainage);
  const over=P.filter(p=>p.overUnder>0),under=P.filter(p=>p.overUnder<0);
  const bv=P.filter(p=>p.pctComplete>5).sort((a,b)=>b.contractValue-a.contractValue).slice(0,10);
  const bvMax=Math.max(...bv.map(p=>Math.max(p.contractValue,p.costToDate,p.costBudget*1.05)));
  const bullets=bv.map(p=>{const overB=p.costToDate>p.costBudget;
    const warnL=p.costBudget/bvMax*100, warnW=Math.min(100,(p.costBudget*1.05)/bvMax*100)-warnL;
    return `<div class="bullet"><div class="bt"><span class="nm">${p.name}</span><span class="vv">${money(p.costToDate)} <span>/ ${money(p.costBudget)}</span></span></div>
      <div class="track"><div class="warnband" style="left:${warnL.toFixed(1)}%;width:${warnW.toFixed(1)}%"></div>
        <div class="fill" data-w="${(p.costToDate/bvMax*100).toFixed(1)}%" style="width:0;background:${overB?'#c8102e':'#031b52'}"></div>
        <div class="target" style="left:${(p.costBudget/bvMax*100).toFixed(1)}%" title="Cost budget ${money(p.costBudget)}"></div></div></div>`;}).join('');
  const byStat=STAT_ORDER.map(s=>({label:sm(s).short,value:sum(P.filter(p=>p.status===s),p=>p.contractValue)}));

  document.getElementById('view-financials').innerHTML=`

   <div class="grid2">
     <div class="card"><div class="hd"><div><h3>Cost vs. Budget</h3><div class="sub">Actual cost-to-date vs. cost budget · top 10 jobs</div></div>
       <div class="legend"><span><i style="background:#031b52"></i>On budget</span><span><i style="background:#c8102e"></i>Over</span><span><i style="background:#031b52;width:2px;height:11px;border-radius:1px"></i>Budget</span></div></div>
       <div class="bd">${bullets}</div></div>
     <div class="card"><div class="hd"><div><h3>Work-in-Progress Billing</h3><div class="sub">Billed vs. earned revenue</div></div></div>
       <div class="bd">
        <div style="text-align:center;padding:6px 0 16px">
          <div class="num" style="font-family:var(--font-display);font-size:var(--fs-lg);font-weight:var(--fw-bold);line-height:1;letter-spacing:-.01em;color:var(--ink)">${M.overUnder>=0?'+':''}${money(M.overUnder)}</div>
          <div style="font-size:var(--fs-sm);color:var(--muted);font-weight:var(--fw-normal);margin-top:4px">net ${M.overUnder>=0?'over-billing':'under-billing'} position</div></div>
        <div class="dr-line"><span class="k">Total earned revenue</span><span class="v num">${money(sum(P,p=>p.earned))}</span></div>
        <div class="dr-line"><span class="k">Total billed to date</span><span class="v num">${money(sum(P,p=>p.billed))}</span></div>
        <div class="dr-line"><span class="k">Over-billed jobs</span><span class="v">${over.length} · <span class="pos num">${money(sum(over,p=>p.overUnder))}</span></span></div>
        <div class="dr-line"><span class="k">Under-billed jobs</span><span class="v">${under.length} · <span class="neg num">${money(Math.abs(sum(under,p=>p.overUnder)))}</span></span></div>
       </div></div>
   </div>

   <div class="grid3">
     <div class="card"><div class="hd"><div><h3>Change Orders</h3><div class="sub">Approved scope additions</div></div></div>
       <div class="bd"><div class="num" style="font-family:var(--font-display);font-size:var(--fs-lg);font-weight:var(--fw-bold);line-height:1;letter-spacing:-.01em">${money(M.coValue)}</div>
         <div style="font-size:var(--fs-sm);color:var(--muted);font-weight:var(--fw-normal);margin:5px 0 14px">across ${M.coCount} projects</div>
         <div class="dr-line"><span class="k">% of contract value</span><span class="v num">${(M.coValue/M.totalContract*100).toFixed(1)}%</span></div>
         <div class="dr-line"><span class="k">Avg. per CO project</span><span class="v num">${money(M.coCount?M.coValue/M.coCount:0)}</span></div></div></div>
     <div class="card"><div class="hd"><div><h3>Retainage</h3><div class="sub">Held at 10% until close-out</div></div></div>
       <div class="bd"><div class="num" style="font-family:var(--font-display);font-size:var(--fs-lg);font-weight:var(--fw-bold);line-height:1;letter-spacing:-.01em">${money(M.retainage)}</div>
         <div style="font-size:var(--fs-sm);color:var(--muted);font-weight:var(--fw-normal);margin:5px 0 14px">total currently withheld</div>
         <div class="dr-line"><span class="k">Releasable at close-out</span><span class="v num pos">${money(releasable)}</span></div>
         <div class="dr-line"><span class="k">Held on active work</span><span class="v num">${money(M.retainage-releasable)}</span></div></div></div>
     <div class="card"><div class="hd"><div><h3>Margin Snapshot</h3><div class="sub">Profitability across the book</div></div></div>
       <div class="bd">
         <div class="dr-line"><span class="k">Projected gross profit</span><span class="v num pos">${money(sum(P,p=>p.contractValue*p.marginTarget/100))}</span></div>
         <div class="dr-line"><span class="k">Avg. project size</span><span class="v num">${money(M.totalContract/P.length)}</span></div>
         <div class="dr-line"><span class="k">Largest contract</span><span class="v num">${money(Math.max(...P.map(p=>p.contractValue)))}</span></div></div></div>
   </div>

   <div class="card"><div class="hd"><div><h3>Contract Value by Stage</h3><div class="sub">Where the portfolio value sits</div></div></div><div class="bd">${hbars(byStat,money)}</div></div>`;
}

/* ============================================================
   COST CONTROL (phase-code job cost report)
   ============================================================ */
let ccPid=null;
const cnum=n=>Math.round(n).toLocaleString();
function openCost(pid){ ccPid=pid; closeDrawer(); route('cost'); }
window.openCost=openCost;
function renderCost(){
  if(!ccPid||!P.find(p=>p.pid===ccPid)) ccPid=(M.active[0]||P[0]).pid;
  const p=P.find(x=>x.pid===ccPid);
  const opts=P.slice().sort((a,b)=>a.pid<b.pid?-1:1).map(x=>`<div class="csel-opt${x.pid===ccPid?' on':''}" data-pid="${x.pid}">${x.pid} — ${x.name}</div>`).join('');
  // group cost codes by division
  const groups={};
  p.costCodes.forEach(c=>{const d=c.code.slice(0,2);(groups[d]=groups[d]||[]).push(c);});
  const T={orig:0,rev:0,adj:0,act:0,earn:0,toc:0,atc:0};
  p.costCodes.forEach(c=>{T.orig+=c.origBudget;T.rev+=c.revBudget;T.adj+=c.adjBudget;T.act+=c.actual;T.earn+=c.earned;T.toc+=c.toCompl;T.atc+=c.atCompl;});
  const glc=v=>`<span class="gl ${v>=0?'pos':'neg'}">${v>=0?'':'('}${cnum(Math.abs(v))}${v>=0?'':')'}</span>`;
  let body='';
  Object.keys(groups).sort().forEach(d=>{
    const codes=groups[d];
    body+=`<tr class="divrow"><td class="l" colspan="17">${d} · ${DIVISIONS[d]||'Other'}</td></tr>`;
    const s={orig:0,rev:0,adj:0,act:0,earn:0,toc:0,atc:0,gtd:0,gpr:0};
    codes.forEach(c=>{
      s.orig+=c.origBudget;s.rev+=c.revBudget;s.adj+=c.adjBudget;s.act+=c.actual;s.earn+=c.earned;s.toc+=c.toCompl;s.atc+=c.atCompl;s.gtd+=c.glTD;s.gpr+=c.glProj;
      body+=`<tr class="coderow">
        <td class="l"><span class="ccode">${c.code}</span> <span class="cdesc">${c.desc}</span></td>
        <td><span class="catb ${c.cat}">${c.cat}</span></td><td>${EM_LABEL[c.em]||c.em}</td><td>${c.um}</td>
        <td>${cnum(c.origBudget)}</td><td>${cnum(c.revBudget)}</td><td>${cnum(c.adjBudget)}</td>
        <td>${cnum(c.actual)}</td><td>${cnum(c.earned)}</td><td>${glc(c.glTD)}</td>
        <td>${cnum(c.toCompl)}</td><td>${cnum(c.atCompl)}</td><td>${glc(c.glProj)}</td>
        <td>${c.unitRev.toFixed(2)}</td><td>${c.pct>0?c.unitTD.toFixed(2):'—'}</td><td>${c.unitCompl.toFixed(2)}</td>
        <td><b>${Math.round(c.pct)}%</b></td></tr>`;
      if(c.cat==='S'&&c.vendor) body+=`<tr class="vendrow"><td class="l" colspan="17"><span class="vendln">${ic('briefcase',12)} Awarded ${dateFmt(c.award)} · <b>${c.vendor}</b> · <span class="price">$${c.unitRev.toFixed(2)}/${c.um}</span> ${boBadge(c.status)}</span></td></tr>`;
    });
    body+=`<tr class="subrow"><td class="l">${d} Total</td><td></td><td></td><td></td>
      <td>${cnum(s.orig)}</td><td>${cnum(s.rev)}</td><td>${cnum(s.adj)}</td>
      <td>${cnum(s.act)}</td><td>${cnum(s.earn)}</td><td>${glc(s.gtd)}</td>
      <td>${cnum(s.toc)}</td><td>${cnum(s.atc)}</td><td>${glc(s.gpr)}</td>
      <td></td><td></td><td></td><td></td></tr>`;
  });
  document.getElementById('view-cost').innerHTML=`
   <div class="ccbar">
     <div class="csel" id="ccSel">
       <button type="button" class="csel-btn" id="ccSelBtn"><span>${p.pid} — ${p.name}</span>${ic('chevdown')}</button>
       <div class="csel-panel" id="ccSelPanel">${opts}</div>
     </div>
     <div class="ccmeta">${stChip(p.status)} <span>Contract <b>${money(p.contractValue)}</b></span> <span>Cost budget <b>${money(p.costBudget)}</b></span> <span>${p.roofSystem||'—'}</span></div>
   </div>
   <div class="card"><div class="bd ccwrap">
     <table class="costtbl">
       <thead>
         <tr class="grp"><th class="l" colspan="4">Phase / Description</th><th colspan="3">Budget</th><th colspan="3">To Date</th><th colspan="3">Projected</th><th colspan="3">Unit Cost</th><th rowspan="2">% Compl</th></tr>
         <tr><th class="l">Phase Code &amp; Description</th><th>Cat</th><th>Earn</th><th>UM</th>
           <th>Original</th><th>Revised</th><th>Adjusted</th>
           <th>Actual Cost</th><th>Earned</th><th>Gain/Loss</th>
           <th>Cost to Compl</th><th>Cost at Compl</th><th>Gain/Loss</th>
           <th>Rev Est</th><th>To Date</th><th>Compl</th></tr>
       </thead>
       <tbody>${body}
         <tr class="totalrow"><td class="l">JOB ${p.pid} TOTAL</td><td></td><td></td><td></td>
           <td>${cnum(T.orig)}</td><td>${cnum(T.rev)}</td><td>${cnum(T.adj)}</td>
           <td>${cnum(T.act)}</td><td>${cnum(T.earn)}</td><td>${glc(T.earn-T.act)}</td>
           <td>${cnum(T.toc)}</td><td>${cnum(T.atc)}</td><td>${glc(T.rev-T.atc)}</td>
           <td></td><td></td><td></td><td></td></tr>
       </tbody>
     </table>
   </div></div>`;
  const csel=document.getElementById('ccSel'), cbtn=document.getElementById('ccSelBtn'), cpanel=document.getElementById('ccSelPanel');
  if(cbtn){
    cbtn.onclick=e=>{ e.stopPropagation(); const open=csel.classList.toggle('open'); if(open){ const on=cpanel.querySelector('.csel-opt.on'); if(on) on.scrollIntoView({block:'center'}); } };
    cpanel.querySelectorAll('.csel-opt').forEach(o=>o.onclick=()=>{ ccPid=o.dataset.pid; renderCost(); });
    document.addEventListener('click', function close(ev){ if(!csel.contains(ev.target)){ csel.classList.remove('open'); document.removeEventListener('click',close); } });
  }
}
function boBadge(s){const m={bought:['bought','Bought Out'],pending:['pending','Pending'],open:['open','Open']}[s]||['open','Open'];return `<span class="bo ${m[0]}"><span class="d"></span>${m[1]}</span>`;}

/* ============================================================
   CONTRACT BUYOUT
   ============================================================ */
let boFilter='all';
function renderBuyout(){
  const counts={all:M.buyout.length,bought:M.buyout.filter(b=>b.c.status==='bought').length,pending:M.buyout.filter(b=>b.c.status==='pending').length,open:M.buyout.filter(b=>b.c.status==='open').length};
  let rows=M.buyout.filter(b=>boFilter==='all'||b.c.status===boFilter);
  const pills=[['all','All'],['bought','Bought Out'],['pending','Pending'],['open','Open']];
  document.getElementById('view-buyout').innerHTML=`
   <div class="filters">${pills.map(p=>`<div class="pill bo-pill ${boFilter===p[0]?'on':''}" data-f="${p[0]}">${p[1]}<span class="ct">${counts[p[0]]}</span></div>`).join('')}</div>
   <div class="card"><div class="bd tbl-wrap">
     <table><thead><tr><th>Project</th><th>Scope / Phase</th><th>Vendor / Subcontractor</th><th>UM</th><th class="r">Unit Price</th><th class="r">Committed</th><th>Award Date</th><th>Buyout Status</th></tr></thead>
     <tbody>${rows.map(b=>`<tr data-pid="${b.p.pid}">
       <td><div class="pname" style="max-width:220px">${b.p.name}</div><div class="pid">${b.p.pid}</div></td>
       <td style="white-space:nowrap"><span class="ccode" style="font-family:ui-monospace,monospace;font-size:var(--fs-sm);font-weight:var(--fw-normal);color:var(--navy)">${b.c.code}</span> <span style="font-weight:var(--fw-normal)">${b.c.desc}</span></td>
       <td>${personTag(b.c.vendor)}</td><td>${b.c.um}</td>
       <td class="r mono-val">$${b.c.unitRev.toFixed(2)}</td>
       <td class="r mono-val">${money(b.committed)}</td>
       <td class="num loc">${dateFmt(b.c.award)}</td>
       <td>${boBadge(b.c.status)}</td></tr>`).join('')}</tbody></table>
     ${rows.length?'':`<div class="empty">${ic('inbox',30)}No scopes in this category.</div>`}
   </div></div>`;
  document.querySelectorAll('#view-buyout .bo-pill').forEach(el=>el.onclick=()=>{boFilter=el.dataset.f;renderBuyout();});
  bindRows('view-buyout');
}

/* ============================================================
   CHANGE ORDERS
   ============================================================ */
function renderChangeOrders(){
  const rows=P.filter(p=>p.changeOrders>0).sort((a,b)=>b.changeOrderValue-a.changeOrderValue);
  document.getElementById('view-changeorders').innerHTML=`
   <div class="card"><div class="hd"><div><h3>Change Orders by Project</h3><div class="sub">${rows.length} projects with approved change orders · ${money(M.coValue)} total</div></div></div>
     <div class="bd tbl-wrap">
     <table><thead><tr><th>Project</th><th>Status</th><th class="r">Change Orders</th><th class="r">CO Value</th><th class="r">% of Contract</th><th>Project Mgr</th></tr></thead>
     <tbody>${rows.map(p=>{const pct=p.contractValue?p.changeOrderValue/p.contractValue*100:0;return `<tr data-pid="${p.pid}">
       <td><div class="pname">${p.name}</div><div class="pid">${p.pid} · ${p.city||p.state}</div></td>
       <td>${stChip(p.status)}</td>
       <td class="r mono-val">${p.changeOrders}</td>
       <td class="r mono-val">${money(p.changeOrderValue)}</td>
       <td class="r mono-val">${pct.toFixed(1)}%</td>
       <td>${personTag(p.pm)}</td></tr>`;}).join('')}</tbody></table>
     ${rows.length?'':`<div class="empty">${ic('inbox',30)}No change orders recorded.</div>`}
   </div></div>`;
  bindRows('view-changeorders');
}

/* ============================================================
   BILLING & ACCOUNTS RECEIVABLE
   ============================================================ */
function renderBilling(){
  const rows=P.filter(p=>p.status!=='Pre-Construction').sort((a,b)=>b.contractValue-a.contractValue);
  document.getElementById('view-billing').innerHTML=`
   <div class="card"><div class="hd"><div><h3>Billing Status by Job</h3><div class="sub">Billed vs. earned, retainage held and over/under position</div></div></div>
     <div class="bd tbl-wrap">
     <table><thead><tr><th>Project</th><th>Status</th><th class="r">Contract</th><th class="r">Billed</th><th class="r">Earned</th><th class="r">Over / Under</th><th class="r">Retainage</th><th class="r">% Compl</th></tr></thead>
     <tbody>${rows.map(p=>`<tr data-pid="${p.pid}">
       <td><div class="pname">${p.name}</div><div class="pid">${p.pid}</div></td>
       <td>${stChip(p.status)}</td>
       <td class="r mono-val">${money(p.contractValue)}</td>
       <td class="r mono-val">${money(p.billed)}</td>
       <td class="r mono-val">${money(p.earned)}</td>
       <td class="r mono-val" style="color:${p.overUnder>=0?'var(--success)':'var(--red)'}">${p.overUnder>=0?'+':''}${money(p.overUnder)}</td>
       <td class="r mono-val">${money(p.retainage)}</td>
       <td class="r mono-val">${p.pctComplete}%</td></tr>`).join('')}</tbody></table>
     ${rows.length?'':`<div class="empty">${ic('inbox',30)}No active billing.</div>`}
   </div></div>`;
  bindRows('view-billing');
}

/* ============================================================
   WEATHER PLANNING  (14-day outlook by job site, Open-Meteo)
   ============================================================ */
let weatherCache=null, weatherLoading=false;
const WX_DESC={0:'Clear',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',75:'Heavy snow',80:'Rain showers',81:'Rain showers',82:'Violent showers',95:'Thunderstorm',96:'Thunderstorm',99:'Thunderstorm'};
function weatherJobs(){return P.filter(p=>p.status!=='Closeout'&&p.lat&&p.lng).slice(0,40);}
function renderWeather(){
  const el=document.getElementById('view-weather'); if(!el) return;
  const jobs=weatherJobs();
  if(weatherCache){ el.innerHTML=weatherHTML(jobs,weatherCache); bindRows('view-weather'); return; }
  el.innerHTML=`<div class="card"><div class="bd"><div class="empty">${ic('clock',30)}Loading 14-day weather outlook for ${jobs.length} active job sites…</div></div></div>`;
  if(weatherLoading) return; weatherLoading=true;
  const lats=jobs.map(p=>p.lat.toFixed(3)).join(','), lngs=jobs.map(p=>p.lng.toFixed(3)).join(',');
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=14&timezone=auto&temperature_unit=fahrenheit`)
    .then(r=>r.json()).then(d=>{ weatherCache=Array.isArray(d)?d:[d]; weatherLoading=false; renderWeather(); })
    .catch(()=>{ weatherLoading=false; el.innerHTML=`<div class="card"><div class="bd"><div class="empty">${ic('warn',30)}Couldn't load forecast — needs an internet connection. <span style="color:var(--navy);font-weight:var(--fw-bold);cursor:pointer;text-decoration:underline" onclick="weatherCache=null;renderWeather()">Retry</span></div></div></div>`; });
}
function wxClass(prob){ return prob>=60?'wx-bad':prob>=35?'wx-warn':'wx-ok'; }
function weatherHTML(jobs,data){
  // align each job to its forecast block (data index matches job order)
  const rows=jobs.map((p,i)=>({p,wx:data[i]&&data[i].daily?data[i].daily:null})).filter(r=>r.wx);
  const days=rows.length?rows[0].wx.time:[];
  const dayHdr=days.map(d=>{const dt=new Date(d+'T00:00');return `<th class="wx-dh">${dt.toLocaleDateString('en-US',{weekday:'short'})}<br><span>${dt.toLocaleDateString('en-US',{month:'numeric',day:'numeric'})}</span></th>`;}).join('');
  return `
   <div class="card"><div class="hd"><div><h3>14-Day Weather Outlook by Job Site</h3><div class="sub">Daily max precipitation probability · plan tear-offs and dry-in around rain days</div></div>
     <div class="legend"><span><i style="background:#1a7a4f"></i>Workable (&lt;35%)</span><span><i style="background:#d99a00"></i>Watch (35–59%)</span><span><i style="background:#c8102e"></i>Rain risk (60%+)</span></div></div>
     <div class="bd tbl-wrap"><table class="wxtbl"><thead><tr><th>Project</th><th class="r">Workable</th><th class="r">Rain</th>${dayHdr}</tr></thead>
     <tbody>${rows.map(({p,wx})=>{const pr=wx.precipitation_probability_max,tmax=wx.temperature_2m_max,wc=wx.weathercode;
       const work=pr.filter(x=>x<35).length, rain=pr.filter(x=>x>=60).length;
       return `<tr data-pid="${p.pid}">
         <td><div class="pname">${p.name}</div><div class="pid">${p.pid} · ${p.city||p.state}</div></td>
         <td class="r mono-val">${work}d</td>
         <td class="r mono-val" style="color:${rain?'var(--red)':'var(--muted)'}">${rain}d</td>
         ${pr.map((prob,di)=>`<td class="wx-cell"><div class="wx-day ${wxClass(prob)}" title="${days[di]} · ${WX_DESC[wc[di]]||''} · ${prob}% precip · ${Math.round(tmax[di])}°F">${prob}</div></td>`).join('')}
       </tr>`;}).join('')}</tbody></table>
     ${rows.length?'':`<div class="empty">${ic('inbox',30)}No active job sites to forecast.</div>`}
   </div></div>`;
}

/* ============================================================
   DRAWER
   ============================================================ */
function openDrawer(pid){
  const p=P.find(x=>x.pid===pid); if(!p)return;
  const costPct=Math.min(100,Math.round(p.costToDate/p.contractValue*100));
  const d=document.getElementById('drawer');
  d.innerHTML=`
   <div class="dr-head">
     <img class="logo" src="logo-white.svg" alt="">
     <button class="dr-close" onclick="closeDrawer()">${ic('x')}</button>
     <div class="pid">${p.pid}</div><h2>${p.name}</h2>
     <div class="loc">${ic('pin',14)} ${p.address}</div>
     <div style="margin-top:12px">${stChip(p.status)} <span class="st demo" style="margin-left:4px">${p.sector}</span></div>
   </div>
   <div class="dr-body dr-anim">
     <div class="dr-stats">
       <div class="dr-stat"><div class="l">Contract Value</div><div class="v num">${money(p.contractValue)}</div></div>
       <div class="dr-stat"><div class="l">% Complete</div><div class="v num">${p.pctComplete}%</div></div>
     </div>
     <div class="dr-sec"><h4>Progress</h4>
       <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);font-weight:var(--fw-normal)"><span class="num">${p.pctComplete}% complete</span><span class="muted">${p.onTrack?'On track':'Behind schedule'}</span></div>
       <div class="bigbar"><i data-w="${p.pctComplete}%" style="width:0;background:${PROG_COL(p)}"></i></div>
       <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);color:var(--muted);margin-top:4px"><span class="num">Start ${dateFmt(p.startDate)}</span><span class="num">Finish ${dateFmt(p.endDate)}</span></div></div>
     <div class="dr-sec"><h4>Budget</h4>
       <div style="display:flex;justify-content:space-between;font-size:var(--fs-sm);font-weight:var(--fw-normal)"><span class="num">${money(p.costToDate)} spent</span><span class="muted num">Budget ${money(p.costBudget)}</span></div>
       <div class="bigbar"><i data-w="${costPct}%" style="width:0;background:${p.costToDate>p.costBudget?'#c8102e':'#031b52'}"></i></div>
       <div class="dr-line" style="margin-top:8px"><span class="k">Margin target</span><span class="v num">${p.marginTarget}%</span></div>
       <div class="dr-line"><span class="k">Projected margin</span><span class="v num ${p.projMargin<p.marginTarget-3?'neg':'pos'}">${p.projMargin.toFixed(1)}%</span></div>
       <div class="dr-line"><span class="k">Change orders</span><span class="v num">${p.changeOrders}${p.changeOrderValue?' · '+money(p.changeOrderValue):''}</span></div>
       <div class="dr-line"><span class="k">Retainage held</span><span class="v num">${money(p.retainage)}</span></div>
       <div class="dr-line"><span class="k">Billed vs earned</span><span class="v num ${p.overUnder>=0?'pos':'neg'}">${p.overUnder>=0?'+':''}${money(p.overUnder)}</span></div></div>
     <div class="dr-sec"><h4>Scope</h4>
       <div class="dr-line"><span class="k">Roof system</span><span class="v">${p.roofSystem||'—'}</span></div>
       <div class="dr-line"><span class="k">Manufacturer</span><span class="v">${p.manufacturer||'—'}</span></div>
       <div class="dr-line"><span class="k">Market sector</span><span class="v">${p.sector}</span></div>
       <div class="dr-line"><span class="k">Crew size</span><span class="v num">${p.crewSize} workers</span></div></div>
     <div class="dr-sec"><h4>Cost Breakdown by Phase</h4>
       <table style="width:100%;font-size:var(--fs-sm);border-collapse:collapse">
         <thead><tr style="font-size:var(--fs-sm);text-transform:uppercase;letter-spacing:.05em;color:var(--faint)">
           <th style="text-align:left;padding:0 0 7px;font-weight:var(--fw-bold)">Phase</th>
           <th style="text-align:right;padding:0 0 7px;font-weight:var(--fw-bold)">Budget</th>
           <th style="text-align:right;padding:0 0 7px;font-weight:var(--fw-bold)">Actual</th>
           <th style="text-align:right;padding:0 0 7px;font-weight:var(--fw-bold)">Gain/Loss</th>
           <th style="text-align:right;padding:0 0 7px 8px;font-weight:var(--fw-bold)">%</th></tr></thead>
         <tbody>${p.costCodes.slice().sort((a,b)=>b.revBudget-a.revBudget).slice(0,6).map(c=>`<tr style="border-top:1px solid var(--line2)">
           <td style="padding:7px 0;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span class="catb ${c.cat}" style="margin-right:5px">${c.cat}</span><span style="font-weight:var(--fw-normal)">${c.desc}</span></td>
           <td style="text-align:right;font-variant-numeric:tabular-nums" class="num">${money(c.revBudget)}</td>
           <td style="text-align:right;font-variant-numeric:tabular-nums" class="num">${money(c.actual)}</td>
           <td style="text-align:right;font-variant-numeric:tabular-nums;font-weight:var(--fw-normal);color:${c.glProj>=0?'var(--success)':'var(--red)'}">${c.glProj>=0?'+':''}${money(c.glProj)}</td>
           <td style="text-align:right;padding-left:8px;font-weight:var(--fw-bold)" class="num">${Math.round(c.pct)}%</td></tr>`).join('')}</tbody></table>
       <button class="btn" style="width:100%;justify-content:center;margin-top:12px" onclick="openCost('${p.pid}')">${ic('receipt',15)} View full cost report</button></div>
     <div class="dr-sec"><h4>Team</h4>
       <div class="dr-line"><span class="k">Project manager</span><span class="v">${personTag(p.pm)}</span></div>
       <div class="dr-line"><span class="k">Field supervisor</span><span class="v">${p.supervisor?personTag(p.supervisor):'—'}</span></div>
       <div class="dr-line"><span class="k">Subcontractor</span><span class="v">${p.subcontractor?personTag(p.subcontractor):'—'}</span></div></div>
   </div>`;
  d.classList.add('open'); document.getElementById('drawerBg').classList.add('open');
  reveal(d);
}
function closeDrawer(){document.getElementById('drawer').classList.remove('open');document.getElementById('drawerBg').classList.remove('open');}
function bindRows(scope){document.querySelectorAll('#'+scope+' [data-pid]').forEach(el=>el.onclick=()=>openDrawer(el.dataset.pid));}

/* ============================================================
   CSV / DOC IMPORT
   ============================================================ */
const FIELD_MAP={pid:['pid','project id','id','job #','job number','project number','number'],
  name:['project name','name','project','job name','job'],status:['status','stage','phase'],
  address:['site address','address','location','site','job site'],roofSystem:['roof system','system','roof type','roofing system','scope'],
  pm:['project manager','pm','manager','project mgr'],supervisor:['field supervisor','supervisor','foreman','super'],
  subcontractor:['roofing subcontractor','subcontractor','sub','crew','installer'],
  contractValue:['contract value','contract','value','amount','price','total','contract amount'],
  pctComplete:['percent complete','% complete','pct complete','progress','complete','completion'],
  costToDate:['cost to date','cost','actual cost','spent','costs'],startDate:['start date','start','begin','start dt'],
  endDate:['end date','end','finish','completion date','target finish','end dt'],
  crewSize:['crew size','crew','crew count','workers'],roofAreaSqft:['roof area sqft','roof area','area','sqft','square feet','sf'],
  marginTarget:['margin target','margin','target margin','gross margin']};
function normHeader(h){h=h.trim().toLowerCase();for(const f in FIELD_MAP)if(FIELD_MAP[f].includes(h))return f;return null;}
function parseCSV(text){
  const rows=[];let row=[],cell='',q=false;
  text=text.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
  for(let i=0;i<text.length;i++){const c=text[i];
    if(q){if(c==='"'){if(text[i+1]==='"'){cell+='"';i++;}else q=false;}else cell+=c;}
    else{if(c==='"')q=true;else if(c===','){row.push(cell);cell='';}else if(c==='\n'){row.push(cell);rows.push(row);row=[];cell='';}else cell+=c;}}
  if(cell!==''||row.length){row.push(cell);rows.push(row);}
  return rows.filter(r=>r.some(c=>c.trim()!==''));
}
const STATUS_NORM={'pre-construction':'Pre-Construction','preconstruction':'Pre-Construction','pre con':'Pre-Construction','pre-con':'Pre-Construction','submittals':'Pre-Construction','awarded':'Pre-Construction','in progress':'In Production','in production':'In Production','production':'In Production','active':'In Production','in-progress':'In Production','mobilized':'In Production','postponed':'On Hold','on hold':'On Hold','hold':'On Hold','demobilized':'Substantial Completion','demob':'Substantial Completion','substantial completion':'Substantial Completion','substantially complete':'Substantial Completion','punch list':'Substantial Completion','punch':'Substantial Completion','close out':'Closeout','closeout':'Closeout','closed':'Closeout','complete':'Closeout','completed':'Closeout','warranty':'Closeout'};
function rowsToProjects(rows){
  const hdr=rows[0].map(normHeader);
  const out=[];
  for(let r=1;r<rows.length;r++){const obj={};let any=false;
    hdr.forEach((f,c)=>{if(f&&rows[r][c]!==undefined){let v=rows[r][c].trim();if(v==='')return;
      if(['contractValue','costToDate','pctComplete','crewSize','roofAreaSqft','marginTarget'].includes(f))v=parseFloat(v.replace(/[$,%\s]/g,''))||undefined;
      if(f==='status'){const k=String(v).toLowerCase().trim();v=STATUS_NORM[k]||v;}
      obj[f]=v;any=true;}});
    if(any&&(obj.name||obj.pid)){if(!obj.pid)obj.pid='IMP-'+(out.length+1);if(!obj.name)obj.name=obj.pid;out.push(obj);}}
  return out;
}
/* shared column set for template / import round-trip / export */
const EXPORT_COLS=[
  ['pid','PID'],['name','Project Name'],['status','Status'],['address','Site Address'],
  ['roofSystem','Roof System'],['pm','Project Manager'],['supervisor','Field Supervisor'],
  ['subcontractor','Roofing Subcontractor'],['contractValue','Contract Value'],
  ['pctComplete','Percent Complete'],['costToDate','Cost To Date'],['startDate','Start Date'],
  ['endDate','End Date'],['crewSize','Crew Size'],['roofAreaSqft','Roof Area Sqft'],['marginTarget','Margin Target']
];
function csvCell(c){const s=String(c==null?'':c);return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
function csvTemplate(){
  const sample=['R26-01','Sample Commercial Reroof','In Production','100 Main St, Dallas, TX 75201','Carlisle TPO','Cole Harris','Juan Garcia','Vazquez Services','845000','45','360000','2026-05-01','2026-07-15','7','62000','24'];
  return EXPORT_COLS.map(c=>c[1]).join(',')+'\n'+sample.map(csvCell).join(',')+'\n';
}
function download(name,text,type='text/csv'){const b=new Blob([text],{type});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);}

/* ---- exportable report types (each builds its own column set) ---- */
const REPORTS=[
  {key:'portfolio',label:'Project Portfolio',sheet:'Projects',file:'rbt-project-portfolio',rows:()=>P,cols:EXPORT_COLS},
  {key:'financial',label:'Financial Summary',sheet:'Financials',file:'rbt-financial-summary',rows:()=>P,cols:[
    ['pid','PID'],['name','Project'],['status','Status'],['contractValue','Contract Value'],
    [null,'Earned Revenue',p=>Math.round(p.earned)],
    [null,'Billed to Date',p=>Math.round(p.billed)],
    [null,'Over/Under Billing',p=>Math.round(p.overUnder)],
    ['costToDate','Cost to Date'],
    [null,'Projected Margin %',p=>+(p.projMargin||0).toFixed(1)],
    [null,'Retainage Held',p=>Math.round(p.retainage)]]},
  {key:'schedule',label:'Schedule Report',sheet:'Schedule',file:'rbt-schedule-report',rows:()=>P,cols:[
    ['pid','PID'],['name','Project'],['status','Status'],['startDate','Start Date'],['endDate','End Date'],
    ['pctComplete','% Complete'],
    [null,'Days Remaining',p=>p.daysRemaining],
    [null,'On Track',p=>p.onTrack?'Yes':'No']]},
  {key:'changeorders',label:'Change Orders',sheet:'Change Orders',file:'rbt-change-orders',rows:()=>P.filter(p=>p.changeOrders>0),cols:[
    ['pid','PID'],['name','Project'],['status','Status'],
    ['changeOrders','# Change Orders'],
    [null,'CO Value',p=>Math.round(p.changeOrderValue)],
    [null,'% of Contract',p=>+(p.contractValue?p.changeOrderValue/p.contractValue*100:0).toFixed(1)],
    ['pm','Project Manager']]},
  {key:'billing',label:'Billing & AR',sheet:'Billing',file:'rbt-billing-ar',rows:()=>P.filter(p=>p.status!=='Pre-Construction'),cols:[
    ['pid','PID'],['name','Project'],['status','Status'],['contractValue','Contract Value'],
    [null,'Billed to Date',p=>Math.round(p.billed)],
    [null,'Earned Revenue',p=>Math.round(p.earned)],
    [null,'Over/Under Billing',p=>Math.round(p.overUnder)],
    [null,'Retainage Held',p=>Math.round(p.retainage)],
    ['pctComplete','% Complete']]},
  {key:'buyout',label:'Contract Buyout',sheet:'Buyout',file:'rbt-contract-buyout',rows:()=>M.buyout,cols:[
    [null,'PID',b=>b.p.pid],[null,'Project',b=>b.p.name],[null,'Scope',b=>b.c.desc],
    [null,'Vendor',b=>b.c.vendor||'—'],[null,'Committed',b=>Math.round(b.committed)],
    [null,'Status',b=>b.c.status]]},
];
function cellOf(item,c){const v=c[2]?c[2](item):item[c[0]];return v==null?'':v;}
function reportAOA(rep){return [rep.cols.map(c=>c[1]), ...rep.rows().map(it=>rep.cols.map(c=>cellOf(it,c)))];}
function exportReport(key,fmt){
  const rep=REPORTS.find(r=>r.key===key); if(!rep)return;
  const aoa=reportAOA(rep);
  if(fmt==='csv'){ download(rep.file+'.csv', aoa.map(r=>r.map(csvCell).join(',')).join('\n'),'text/csv'); return; }
  if(typeof XLSX==='undefined'){alert('Spreadsheet library is still loading — please try again in a moment, or choose CSV.');return;}
  const ws=XLSX.utils.aoa_to_sheet(aoa); ws['!cols']=rep.cols.map(c=>({wch:Math.max(12,c[1].length+2)}));
  const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,rep.sheet);
  XLSX.writeFile(wb, rep.file+'.xlsx');
}
function openExportMenu(btn){
  let m=document.getElementById('exportMenu');
  if(m){m.remove();return;}
  let fmt='xlsx';
  m=document.createElement('div'); m.id='exportMenu'; m.className='expmenu';
  m.innerHTML=`
    <div class="expmenu-lbl">Export report</div>
    ${REPORTS.map(r=>`<button data-r="${r.key}">${r.label}</button>`).join('')}
    <div class="expmenu-sep"></div>
    <div class="expmenu-fmt">Format
      <span class="expfmt on" data-fmt="xlsx">Excel</span>
      <span class="expfmt" data-fmt="csv">CSV</span>
    </div>
    <div class="expmenu-sep"></div>
    <button data-r="__print">Print / Save as PDF</button>`;
  document.body.appendChild(m);
  const r=btn.getBoundingClientRect();
  m.style.top=(r.bottom+6)+'px'; m.style.left=Math.max(8,r.right-238)+'px';
  m.querySelectorAll('.expfmt').forEach(s=>s.onclick=e=>{e.stopPropagation();fmt=s.dataset.fmt;m.querySelectorAll('.expfmt').forEach(x=>x.classList.toggle('on',x===s));});
  m.querySelectorAll('button[data-r]').forEach(b=>b.onclick=()=>{ if(b.dataset.r==='__print'){window.print();}else{exportReport(b.dataset.r,fmt);} m.remove();});
  setTimeout(()=>document.addEventListener('click',function close(ev){if(!m.contains(ev.target)&&ev.target!==btn&&!btn.contains(ev.target)){m.remove();document.removeEventListener('click',close);}}),0);
}

let importStaged=null;
function openImport(){
  let m=document.getElementById('importModal');
  if(!m){m=document.createElement('div');m.id='importModal';document.body.appendChild(m);}
  m.innerHTML=`
   <div class="im-bg"></div>
   <div class="im-card">
     <div class="im-head"><div><h3>Import Projects</h3><p>Upload an Excel or CSV file to add your own projects and details.</p></div>
       <button class="dr-close" id="imClose" style="background:rgba(3,27,82,.06);color:var(--navy)">${ic('x')}</button></div>
     <div class="im-drop" id="imDrop">${ic('upload',28)}<div class="im-dt">Drag &amp; drop your Excel or CSV file here</div><div class="im-ds">or <span style="color:var(--navy);font-weight:var(--fw-bold);text-decoration:underline">browse files</span> · .xlsx, .xls, .csv, .tsv accepted</div>
       <input type="file" id="imFile" accept=".csv,.tsv,.txt,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" hidden></div>
     <div id="imResult"></div>
     <div class="im-foot">
       <button class="btn" id="imTpl">${ic('upload',15)} Download template</button>
       <div style="flex:1"></div>
       <button class="btn" id="imCancel">Cancel</button>
       <button class="btn im-primary" id="imLoad" disabled>Load projects</button>
     </div>
     <div class="im-note">${ic('shield',13)} Imported data loads into this session only.</div>
   </div>`;
  m.classList.add('open');
  const close=()=>{m.classList.remove('open');importStaged=null;};
  m.querySelector('.im-bg').onclick=close; m.querySelector('#imClose').onclick=close; m.querySelector('#imCancel').onclick=close;
  m.querySelector('#imTpl').onclick=()=>download('rbt-projects-template.csv',csvTemplate());
  const fileInput=m.querySelector('#imFile'), drop=m.querySelector('#imDrop');
  drop.onclick=()=>fileInput.click();
  fileInput.onchange=e=>{if(e.target.files[0])handleFile(e.target.files[0]);};
  drop.ondragover=e=>{e.preventDefault();drop.classList.add('over');};
  drop.ondragleave=()=>drop.classList.remove('over');
  drop.ondrop=e=>{e.preventDefault();drop.classList.remove('over');if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0]);};
  function handleFile(file){
    const res=m.querySelector('#imResult'),load=m.querySelector('#imLoad');
    const isExcel=/\.(xlsx|xls|xlsm)$/i.test(file.name);
    const isText=/\.(csv|tsv|txt)$/i.test(file.name);
    if(!isExcel&&!isText){res.innerHTML=`<div class="im-err">${ic('warn',16)} Unsupported file. Upload an Excel (<b>.xlsx</b>, <b>.xls</b>) or <b>.csv</b> / <b>.tsv</b> file.</div>`;return;}
    if(isExcel&&typeof XLSX==='undefined'){res.innerHTML=`<div class="im-err">${ic('warn',16)} Spreadsheet library is still loading — try again in a moment, or import a <b>.csv</b>.</div>`;return;}
    const rdr=new FileReader();
    rdr.onload=()=>{try{
      let rows;
      if(isExcel){
        const wb=XLSX.read(rdr.result,{type:'array'});
        const ws=wb.Sheets[wb.SheetNames[0]];
        rows=XLSX.utils.sheet_to_json(ws,{header:1,blankrows:false,defval:''}).map(r=>r.map(c=>c==null?'':String(c)));
        rows=rows.filter(r=>r.some(c=>c.trim()!==''));
      }else{
        rows=parseCSV(rdr.result);
      }
      if(rows.length<2)throw 0;
      const mapped=rows[0].map(normHeader);
      const recognized=mapped.filter(Boolean);
      const projs=rowsToProjects(rows);
      if(!projs.length)throw 1;
      importStaged=projs;
      res.innerHTML=`<div class="im-ok">${ic('check',16)} Parsed <b>${projs.length} projects</b> from <b>${file.name}</b>.
        <div class="im-cols">Recognized columns: ${recognized.map(c=>`<span>${c}</span>`).join('')||'<i>none — check your headers</i>'}</div>
        <div class="im-sub">Any missing financial/date fields will be auto-filled so every view stays populated.</div></div>`;
      load.disabled=false;
    }catch(err){res.innerHTML=`<div class="im-err">${ic('warn',16)} Couldn't read that file. Make sure the first row has column headers like <b>Project Name, Status, Contract Value</b>. Use the template for the exact format.</div>`;load.disabled=true;importStaged=null;}};
    if(isExcel) rdr.readAsArrayBuffer(file); else rdr.readAsText(file);
  }
  m.querySelector('#imLoad').onclick=()=>{if(!importStaged)return;
    const hasFin=importStaged.filter(r=>r.contractValue).length/importStaged.length>0.6;
    setData(importStaged);buildNav();renderAll();route(curView);close();
    {const a=document.getElementById('asofText'); if(a) a.textContent=`Loaded ${P.length} imported projects`;}
    const bd=document.getElementById('dataBadge'),bt=document.getElementById('dataBadgeText');
    if(hasFin){bd.classList.add('imported');bt.textContent='Imported data';bd.title='Figures loaded from your imported file. Any blank fields were auto-filled to keep every view populated.';}
    else{bd.classList.remove('imported');bt.textContent='Sample figures';}};
}

/* ============================================================
   INIT
   ============================================================ */
function renderAll(){renderOverview();renderProjects();renderSchedule();renderCrews();renderCost();renderChangeOrders();renderBuyout();renderBilling();renderFinancials();}
setData(window.PROJECTS);
buildNav();
renderAll();
{const a=document.getElementById('asofText'); if(a) a.textContent='Data current as of '+AS_OF_LABEL;}
document.getElementById('drawerBg').onclick=closeDrawer;
document.getElementById('exportBtn').onclick=()=>openExportMenu(document.getElementById('exportBtn'));
document.getElementById('importBtn').onclick=openImport;
// mobile off-canvas sidebar
{const hb=document.getElementById('hamburger'), sb=document.querySelector('.sidebar'), bg=document.getElementById('sidebarBg');
 const closeSb=()=>{sb.classList.remove('open');bg.classList.remove('open');};
 if(hb) hb.onclick=()=>{const o=sb.classList.toggle('open');bg.classList.toggle('open',o);};
 if(bg) bg.onclick=closeSb;
 const nv=document.getElementById('nav'); if(nv) nv.addEventListener('click',e=>{if(e.target.closest('a'))closeSb();});
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});
document.getElementById('search').addEventListener('input',()=>{if(curView!=='projects')route('projects');drawProjTable();});
// reveal initial overview animations
reveal(document.getElementById('view-overview')); runCountup(document.getElementById('view-overview'));
// deep-link support: open a view directly via #hash (e.g. index.html#cost)
{ const h=(location.hash||'').replace('#',''); if(h&&NAV.find(n=>n.id===h)) route(h); }

/* expose import opener for the topbar button (added below) */
window.openImport=openImport;

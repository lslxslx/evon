'use strict';
function letterPdfName(d) {
  return ('Shkresa_'+d.teacher+'_'+d.year).replace(/[^\p{L}\p{N}_-]/gu,'_').replace(/_+/g,'_')+'.pdf';
}
function letterPdfDefinition(d, images) {
  const b=t=>({text:String(t),bold:true});
  const excess=Math.max(0,Math.round((d.total-d.norm)*1e6)/1e6);
  return {pageSize:'A4',pageMargins:[43,36,43,36],
    info:{title:letterPdfName(d).replace(/\.pdf$/,''),author:d.teacher},
    defaultStyle:{font:'HelveticaNeue',fontSize:11,lineHeight:1.15},images,
    content:[
      // Koka sipas pozicioneve dhe përmasave të modelit Word (njësia: pt).
      // Stema rezervon edhe hapësirën e kokës; logot e tjera nuk shtyjnë tekstin.
      {image:'coat',width:24.35,height:34,alignment:'center',margin:[0,0.7,0,89.3]},
      {image:'upt',width:32.95,height:36.85,absolutePosition:{x:71.9,y:70.2}},
      {image:'fgjm',width:37.45,height:36.85,absolutePosition:{x:110.5,y:70.7}},
      {image:'department',width:76.55,height:76.55,absolutePosition:{x:469,y:60.95}},
      {text:'REPUBLIKA E SHQIPËRISË',fontSize:9,lineHeight:1,alignment:'center',width:509.28,absolutePosition:{x:43,y:75.7}},
      {text:'UNIVERSITETI POLITEKNIK I TIRANËS',fontSize:9,lineHeight:1,alignment:'center',width:509.28,absolutePosition:{x:43,y:92.1}},
      {text:'FAKULTETI I GJEOLOGJISË DHE I MINIERAVE',fontSize:9,lineHeight:1,alignment:'center',width:509.28,absolutePosition:{x:43,y:105.35}},
      {text:'DEPARTAMENTI I GJEOLOGJISË SË ZBATUAR DHE GJEOINFORMATIKËS',fontSize:9,lineHeight:1,alignment:'center',width:509.28,absolutePosition:{x:43,y:118.6}},
      {columns:[{text:'Nr. _____ Prot.'},{text:'Tiranë, më ____.____.________',alignment:'right'}],margin:[0,0,0,22]},
      {text:[b('Lënda: '),'Realizimi i ngarkesës mësimore për vitin akademik '+d.year]},
      {text:'ADMINISTRATORIT TË FAKULTETIT TË GJEOLOGJISË DHE MINIERAVE\nZ. SELAM AGA',bold:true,alignment:'center',margin:[0,22,0,22]},
      {text:[b(d.teacher),' ka dhënë mësim si ',b(d.status),', pranë grupit mësimor të ',b(d.group),' gjatë vitit akademik ',b(d.year),' dhe ka realizuar ngarkesën mësimore në mbështetje të procesit mësimor, si më poshtë:'],alignment:'justify',margin:[0,0,0,10]},
      {fontSize:9,table:{headerRows:1,dontBreakRows:true,widths:[22,'*',80,75,45],body:d.rows.map((r,i)=>r.cells.map((t,j)=>({text:t,alignment:j===1?'left':'center',bold:i===0||r.total,fillColor:i===0?'#f0f0f0':r.total?'#f4f4f4':null})))},layout:{hLineWidth:()=>0.5,vLineWidth:()=>0.5,hLineColor:()=>'#cdcdcd',vLineColor:()=>'#cdcdcd',paddingLeft:()=>4,paddingRight:()=>4,paddingTop:()=>4,paddingBottom:()=>4},margin:[0,0,0,10]},
      {text:['Ngarkesa e realizuar si veprimtari në auditor në mbështetje të procesit mësimor është ',b(d.total),' orë.'],margin:[0,0,0,10]},
      {text:excess>0?['Për ngarkesën e realizuar ',b(excess),' orë, mbi normën ',b(d.norm),' orë, të bëhet pagesa sipas Udhëzimit nr. 29 dt. 10.09.2018.']:['Ngarkesa e realizuar nuk e tejkalon normën prej ',b(d.norm),' orësh. Nuk ka ngarkesë mbi normë.'],alignment:'justify'},
      {unbreakable:true,margin:[0,20,0,0],columns:[
        {width:'auto',alignment:'left',stack:[{text:'DREJTUES DEPARTAMENTI'},{text:'Prof. Asoc. Dr. Luis LAMANI',margin:[0,8,0,0]}]},
        {width:'*',text:''},
        {width:'auto',alignment:'right',stack:[{text:'DEKANI'},{text:'Prof. Asoc. Dr. Shkëlqim DAJA',margin:[0,8,0,0]}]}
      ]}
    ]};
}
async function downloadWorkloadLetter(data) {
  if(typeof pdfMake==='undefined') throw new Error('Biblioteka pdfmake nuk u ngarkua.');
  const paths={coat:'images/stema.jpg',upt:'images/upt.png',fgjm:'images/fgjm.jpg',department:'images/departamenti.png'};
  const images=Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([key,path])=>{
    const response=await fetch(path);if(!response.ok)throw new Error('Nuk u ngarkua '+path);
    const blob=await response.blob();const value=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error('Nuk u lexua '+path));r.readAsDataURL(blob);});return [key,value];
  })));
  pdfMake.fonts={HelveticaNeue:{normal:new URL('fonts/HelveticaNeue-Regular.ttf',location.href).href,bold:new URL('fonts/HelveticaNeue-Bold.ttf',location.href).href,italics:new URL('fonts/HelveticaNeue-Regular.ttf',location.href).href,bolditalics:new URL('fonts/HelveticaNeue-Bold.ttf',location.href).href}};
  const blob=await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('PDF-ja nuk u gjenerua. Kontrolloni ngarkimin e fonteve.')),60000);
    try{pdfMake.createPdf(letterPdfDefinition(data,images)).getBuffer(bytes=>{clearTimeout(timer);resolve(new Blob([bytes],{type:'application/pdf'}));});}catch(e){clearTimeout(timer);reject(e);}
  });
  const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=letterPdfName(data);document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}

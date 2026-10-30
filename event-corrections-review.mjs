import fs from 'node:fs';
const report=JSON.parse(fs.readFileSync('docs/20261030_資料完整性檢查.json','utf8'));
const findings=report.findings.filter(f=>f.rule==='dangling-figure-event');
const raw={};
for(const dataset of [...new Set(findings.map(f=>f.dataset))]){
 raw[dataset]={};
 for(const kind of ['events','figures']) raw[dataset][kind]=Object.values(await import('./src/data/periods/'+dataset+'/'+kind+'.js')).find(Array.isArray);
}
const corrections={
 'warringStates:evt_wangjian_mie_liuguo_221':{
  to:'evt_qin_unify_221',
  allowedFigureIds:['qin_shihuang','wang_jian','li_si','meng_tian'],
  evidence:'現有 evt_qin_unify_221 年份為前221年，標題為秦始皇席捲六國統一天下；figureIds 明列秦始皇、王翦、李斯、蒙恬，summary 明列王翦、王賁、蒙恬與十年統一戰爭，各人物傳記亦記載相關行動。僅修事件ID別名，不把李牧或韓非自動連到前221年。'
 },
 'warringStates:evt_goujian_494':{
  to:'evt_goujian_woxin_494',
  allowedFigureIds:['wu_zixu','gou_jian','fan_li','xi_shi'],
  evidence:'舊ID與現有 evt_goujian_woxin_494 同為前494年勾踐事件；現有事件標題為夫椒之辱會稽入質與臥薪嚐膽，figureIds 明列伍子胥、勾踐、范蠡、西施，四人傳記均記載相對應情節。'
 },
 'warringStates:evt_guiling_353':{
  to:'evt_guiling_354',
  allowedFigureIds:['sun_bin','pang_juan'],
  evidence:'現有唯一桂陵之戰事件 evt_guiling_354 的標題、summary、figureIds 均明列孫臏與龐涓，兩人傳記均記載桂陵圍魏救趙；舊ID年份353與現有事件年份354不同，本次只消除失效別名，保留現有日期，並不判定哪個年份為史實。'
 },
 'warringStates:evt_hufuqishe_307':{
  to:'evt_hufu_qishe_307',
  allowedFigureIds:['zhao_wulingwang'],
  evidence:'舊ID僅少一底線；現有事件 evt_hufu_qishe_307 為前307年趙武靈王胡服騎射，figureIds 只列 zhao_wulingwang，其傳記亦明記前307年推行胡服騎射。'
 },
 'warringStates:evt_leyi_poqi_284':{
  to:'evt_jixi_284',
  allowedFigureIds:['le_yi','tian_dan'],
  evidence:'現有 evt_jixi_284 為前284年樂毅五國合縱濟西大破齊，樂毅傳記明記前284年五國伐齊；田單傳記明記五國破齊、臨淄陷落、突圍保即墨。白起傳記沒有明記此事，故白起不在白名單。'
 },
 'warringStates:evt_wanbigui_zhao_279':{
  to:'evt_linxiangru_bi_283',
  allowedFigureIds:['lin_xiangru','lian_po'],
  evidence:'現有唯一完璧歸趙事件 evt_linxiangru_bi_283 標題同時收錄澠池之會與廉頗負荊請罪，figureIds 明列藺相如、廉頗；兩人傳記亦有相同情節。舊ID279與現有事件283不同，本次不改既有日期、不將這個綜合事件當作單一精確年份證據。'
 },
 'warringStates:evt_bizhi_597':{
  to:'evt_bi_597',
  allowedFigureIds:['chu_zhuangwang'],
  evidence:'現有 evt_bi_597 為前597年楚莊王邲之戰，figureIds 明列 chu_zhuangwang；人物傳記也明記邲之戰大破晉國三軍，與舊ID同年同主題。'
 }
};
const pending={
 bai_qi:'候選 evt_jixi_284 可辨認為同名同年前284年樂毅破齊，但白起傳記及候選事件人物欄沒有明記白起參與；不可把同年秦國參加盟軍直接推成白起參戰。',
 li_mu:'候選 evt_qin_unify_221 是前221年統一天下綜合事件；人物記載卒於前229年，傳記記其於前229年王翦伐趙時被殺。是否應連到前期秦趙戰事需人工判定，不以此別名推定參加前221年事件。',
 han_feizi:'候選 evt_qin_unify_221 是前221年；人物記載卒於前233年。雖另有 evt_hanfeizi_qin_233，但將統一天下改成韓非入秦屬改寫關聯含義，不能當作同事件別名自動替換。',
 qi_huangong:'人物傳記記南征召陵，但現有事件庫無前656年召陵事件；葵丘前651年、管仲拜相前685年是不同事件，不替代。',
 guan_zhong:'現有事件庫無前656年召陵事件；同人物其他事件不能當同一事件別名。',
 kong_zi:'舊ID疑指田氏代齊/前403年，但現有田氏代齊事件為前386年，孔子生卒記前551～前479年；有其他孔子事件不代表可以改寫此關聯。',
 lao_zi:'舊ID疑指田氏代齊/前403年，老子生卒記約前571～前471年；事件與人物傳記沒有直接對應，保留待確認。',
 mo_zi:'現有田氏代齊事件為前386年，墨子生卒記約前476～前390年且傳記沒有參與田氏代齊記錄；不能以百家爭鳴背景推定參與。',
 meng_zi:'舊ID前403年及候選田氏代齊前386年都早於記載出生前372年；人物另有出遊記載不等同此事件。',
 zhuang_zi:'舊ID前403年及候選田氏代齊前386年都早於記載出生約前369年；不可套到同時期思想家背景。',
 qu_yuan:'候選 evt_danyang_312 題名包含藍田且同年前312年，但人物傳記只記聯齊抗秦與張儀欺楚後被放逐等背景，事件人物欄沒有屈原；直接參與關係未獲現有文本確認。',
 li_bing:'舊ID可辨認為司馬錯前316年伐蜀；但李冰生卒約前302～前235年，事件早於出生。另有都江堰前256年事件，但改成都江堰會改寫連結主題，不能冒充別名修復。',
 huan_wen:'人物傳記明記枋頭遭慕容垂重挫，但現有事件庫無 evt_fangtou_369 或相同事件；另有同名戰役資料不能把事件ID改連成戰役。',
 murong_chui:'需逐舊ID判定：枋頭有傳記而事件缺漏；參合陂只記戰後反應，現有為拓跋珪386～398年開國綜合事件，不能以其中提及參合陂直接視為同一事件別名。',
 tuoba_gui:'傳記明記395年參合陂，現有 evt_tuoba_gui_386 綜合記386～398年且summary提及395年；但其主年份386、主題北魏開國，與獨立395年參合陂並非精確同事件。保留候選供人工選擇，不自動合併。',
 tuoba_dao:'人物明確記生於408年，395年參合陂早於出生；不能因同屬北魏拓跋氏就連結。'
};
const candidateIds={
 evt_wangjian_mie_liuguo_221:['evt_qin_unify_221'],evt_leyi_poqi_284:['evt_jixi_284'],evt_goujian_494:['evt_goujian_woxin_494'],evt_guiling_353:['evt_guiling_354'],evt_hufuqishe_307:['evt_hufu_qishe_307'],evt_wanbigui_zhao_279:['evt_linxiangru_bi_283'],evt_lantian_312:['evt_danyang_312'],evt_shaoling_656:[],evt_bizhi_597:['evt_bi_597'],evt_tian_dai_qi_403:['evt_tianshi_daiqi_386'],evt_simacuo_shubashu_316:['evt_simacuo_shu_316'],evt_fangtou_369:[],evt_canhebei_395:['evt_tuoba_gui_386']};
const items=findings.map((finding,index)=>{
 const oldID=finding.detail.split('：')[1];
 const figure=raw[finding.dataset].figures.find(f=>f.id===finding.id);
 const entry=corrections[finding.dataset+':'+oldID];
 const applied=entry?.allowedFigureIds.includes(finding.id) || false;
 const candidates=(candidateIds[oldID]||[]).map(id=>{const event=raw[finding.dataset].events.find(e=>e.id===id); return {dataset:finding.dataset,id,title:event.title,year:event.year,yearDisplay:event.yearDisplay,figureIds:event.figureIds||[],source:'src/data/periods/'+finding.dataset+'/events.js'};});
 return {index:index+1,dataset:finding.dataset,figureID:figure.id,figureName:figure.name,oldEventID:oldID,status:applied?'修復':'待確認',to:applied?entry.to:null,
 reason:applied?entry.evidence:pending[figure.id],candidates,
 evidence:{figureSource:'src/data/periods/'+finding.dataset+'/figures.js',figureLifespan:figure.birthDeathDisplay||figure.lifeSpan||[figure.birthYear??null,figure.deathYear??null],figureBio:figure.bio},
 scope:'僅依現有專案文字判斷ID與關聯；未驗證史實、未更改原始人物或事件內容'};
});
const body={created:'2026-10-30',sourceReport:'docs/20261030_資料完整性檢查.json',scope:'33項 dangling-figure-event；以白名單套用事件別名，原始資料不變。',method:['核對現有事件標題、年份、摘要、人物欄與人物傳記','同名或同年代不足以證明參與；先有直接文字對應才列白名單','舊ID與現有日期不同者保留既有日期、記錄差異，不宣稱已作歷史日期校正','精確事件缺漏、人物生卒矛盾、只具背景或影響關係者列待確認；不新增事件或補造史實'],summary:{reviewed:items.length,repaired:items.filter(i=>i.status==='修復').length,pending:items.filter(i=>i.status==='待確認').length,correctionGroups:Object.keys(corrections).length},items};
fs.writeFileSync('src/data/eventLinkCorrections.js', '// 2026-10-30：事件ID別名白名單。消費端必須同時檢查 allowedFigureIds。\n// evidence 來自現有專案文本，並不等同已經外部史料查證。\nexport const EVENT_ID_CORRECTIONS = '+JSON.stringify(corrections,null,2)+';\n');
fs.writeFileSync('docs/20261030_事件連結修復判定.json',JSON.stringify(body,null,2)+'\n');
for(const [key,entry] of Object.entries(corrections)){
 const dataset=key.split(':')[0];
 if(!raw[dataset].events.some(e=>e.id===entry.to)) throw new Error('missing target '+entry.to);
 for(const id of entry.allowedFigureIds) if(!raw[dataset].figures.some(f=>f.id===id)) throw new Error('missing figure '+id);
}
console.log(JSON.stringify(body.summary));

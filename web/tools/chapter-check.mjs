import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {BANK} from '../data/questions.js';
import {bank,session,persist,recordMistake,mistakeList,masteryByKnowledgePoint,selectPracticeScope} from '../js/store.js';
const memory=new Map();globalThis.localStorage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)};
bank.load(BANK);
assert.equal(bank.allQuestions.length,59);assert.equal(bank.questions.length,40);
assert.equal(bank.chapterQuestions('derivatives').length,19);
assert.equal(new Set(bank.allQuestions.map(q=>q.id)).size,59);
for(const q of bank.allQuestions){
  assert(BANK.analysis[q.id]);assert.equal(q.options.length,4);
  assert(q.options.some(o=>o.key===q.correctAnswer));
  assert(existsSync(fileURLToPath(new URL('../assets/source/'+q.src,import.meta.url))));
  if(q.figureSrc)assert(existsSync(fileURLToPath(new URL('../'+q.figureSrc,import.meta.url))));
}
const legacy=bank.get('T1-01');recordMistake(legacy,'B');
session.create({limit:1,order:'origin'});session.submit('B');session.finish();
bank.selectChapter('derivatives');assert.equal(bank.title,'导数与微分');assert.equal(mistakeList().length,0);
assert(masteryByKnowledgePoint().every(k=>k.attempts===0));
const cfg={kps:[]};selectPracticeScope(cfg,['高阶导数']);assert.equal(cfg.limit,1);
session.create({limit:0,order:'origin'});assert.equal(session.active.queue.length,19);
assert(session.active.queue.every(id=>id.startsWith('D')));
session.submit('B');session.saveDraft();const oldId=session.active.id;session.active=null;
bank.selectChapter('limits');assert(session.restoreDraft());assert.equal(session.active.id,oldId);assert.equal(session.active.config.chapterId,'derivatives');
bank.selectChapter('derivatives');for(let i=1;i<19;i++){session.advance();session.submit(session.current().correctAnswer);}
assert(session.isComplete());const report=session.finish();assert.equal(report.stats.total,19);assert.equal(report.config.chapterId,'derivatives');
assert.equal(report.stats.wrong,1);assert.equal(mistakeList().length,1);
persist.clearChapter();assert.equal(mistakeList().length,0);assert.equal(persist.history.length,1);
bank.selectChapter('limits');assert.equal(mistakeList().length,1);assert.equal(bank.questions.length,40);
memory.set('ghb.active.v1',JSON.stringify({queue:['D1-01'],attempts:[null],config:{kps:[],mode:'immediate',groupSize:5},cursor:0,startedAt:0}));
assert.equal(session.restoreDraft(),false);
console.log('章节隔离、59题资源、默认限额、恢复进度和旧记录保护：全部通过');

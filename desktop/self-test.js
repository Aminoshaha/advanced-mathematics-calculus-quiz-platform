// 在真实 WebView2 中操作界面，仅使用独立测试配置，不触碰用户的学习记录。
(async () => {
  const checks = [];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const assert = (condition, label) => { if (!condition) throw new Error(label); checks.push(label); };
  const until = async (fn, label) => {
    for (let i = 0; i < 100; i++) { if (fn()) return; await wait(100); }
    throw new Error('等待超时：' + label);
  };
  const click = (text, scope = document) => {
    const button = [...scope.querySelectorAll('button')].find(b => b.textContent.trim() === text || b.textContent.trim().startsWith(text));
    if (!button) throw new Error('找不到按钮：' + text);
    button.click();
  };
  const capture = async name => {
    await wait(1200);
    window.__captureDone = false;
    window.chrome.webview.postMessage({type: 'capture', name});
    await until(() => window.__captureDone, '截图');
  };
  const finish = async () => {
    click('结束并结算');
    await until(() => document.querySelector('.sheet-mask'), '结算确认');
    click('结束并结算', document.querySelector('.sheet-mask'));
    await until(() => document.body.textContent.includes('答对题数'), '结算报告');
  };
  try {
    await until(() => [...document.querySelectorAll('button')].some(b => b.textContent.includes('进入极限题库')), '章节首页加载');
    const {bank, session, persist, theme} = await import('./js/store.js');
    assert(bank.questions.length === 40, '40 道题完整加载');
    assert(bank.questions.every(q => bank.anaOf(q.id)), '40 道解析完整加载');
    const previous = Number(localStorage.getItem('desktop-test-runs') || 0);
    if (previous) assert(persist.history.length >= 2 && Object.keys(persist.mistakes).length >= 1, '重启后历史与错题仍存在');
    for(let i=0;i<3 && document.documentElement.dataset.theme !== 'light';i++) document.getElementById('theme-btn').click();
    assert(document.querySelectorAll('.chapter-card').length === 4, '章节首页含极限及三个小测预留区域');
    assert(document.querySelectorAll('.chapter-card--pending button:disabled').length === 3, '未开发小测不能误进入');
    await capture('00-章节首页');
    click('进入极限题库');
    await capture('01-练习配置');
    click('开始刷题');
    assert(document.querySelectorAll('.opt').length === 4, '真实答题界面含四个选项');
    assert(document.getElementById('practice-progress').textContent === '第1题/共40题', '不限模式第一题显示第1题/共40题');
    await capture('02-答题');
    const wrong = bank.get(session.active.queue[0]).options.find(o => o.key !== session.current().correctAnswer).key;
    document.querySelector('.opt[data-key="' + wrong + '"]').click();
    assert(document.querySelector('.opt.is-correct'), '即时反馈标记正确答案');
    assert(document.querySelector('.opt.is-wrong'), '即时反馈标记错误选项');
    await capture('03-即时解析');
    await finish();
    assert(persist.history[0].stats.wrong === 1, '结算记录正确判错');
    await capture('04-结算报告');
    window.__downloadDone = false;
    click('导出错题本');
    await until(() => window.__downloadDone, '报告文件导出');
    assert(window.__downloadDone, 'Markdown 错题报告真实导出完成');
    click('错题本');
    assert(document.body.textContent.includes('错题本'), '错题本可进入');
    await capture('05-错题本');
    click('掌握度');
    assert(document.body.textContent.includes('知识点掌握度'), '掌握度页面使用学习记录');
    await capture('06-掌握度');
    click('素材库');
    assert(document.body.textContent.includes('素材库'), '素材库可进入');
    await capture('07-素材库');
    click('题库刷题');
    click('进入极限题库');
    click('整组延迟');
    click('10 题');
    click('原序');
    click('开始刷题');
    for(let i = 0; i < 5; i++) {
      document.querySelector('.opt[data-key="' + session.current().correctAnswer + '"]').click();
      assert(!document.querySelector('.opt.is-correct'), '整组模式第 ' + (i+1) + ' 题暂不泄露答案');
      click(i === 4 ? '本组已完成' : '下一题');
    }
    assert(session.inGroupReview(), '整组完成后统一复盘');
    await capture('08-整组复盘');
    click('继续下一组');
    for(let i = 5; i < 10; i++) {
      assert(document.getElementById('practice-progress').textContent === `第${i+1}题/共10题`, '限额进度准确：第' + (i+1) + '题');
      document.querySelector('.opt[data-key="' + session.current().correctAnswer + '"]').click();
      if(i < 9) click('下一题');
    }
    assert(session.active.finished && persist.history[0].stats.correct === 10, '整组限额十题答完自动结算');

    const startChapter = () => { click('题库刷题'); click('进入极限题库'); };
    startChapter();
    click('逐题即时');
    const names = bank.knowledgePoints().slice(0, 2).map(k => k.name);
    click(names[0], document.querySelector('.chip-wrap'));
    assert(document.body.textContent.includes('限额刷题'), '选择单个考点默认限额刷题');
    const firstCount = bank.byKnowledgePoint(names[0]).length;
    click('开始刷题');
    assert(session.active.config.limit === Math.min(10, firstCount), '单考点默认十题且不超过题池');
    const total = session.active.queue.length;
    assert(document.getElementById('practice-progress').textContent === `第1题/共${total}题`, '筛选后的进度总量使用实际题量');
    await capture('10-考点限额进度');
    for(let i = 0; i < total; i++) {
      document.querySelector('.opt[data-key="' + session.current().correctAnswer + '"]').click();
      if(i < total - 1) click('下一题');
    }
    assert(session.active.finished && persist.history[0].stats.total === total, '考点限额答完自动结算');
    startChapter();
    click('全部题目');
    const small = bank.knowledgePoints().at(-1);
    click(small.name, document.querySelector('.chip-wrap'));
    click('不限');
    click(`${Math.min(10, small.count)} 题`);
    click('开始刷题');
    assert(session.active.queue.length === Math.min(10, small.count), '小题池可从不限切回限额且按实际题数显示');
    for(let i=0, count=session.active.queue.length;i<count;i++) {
      document.querySelector('.opt[data-key="' + session.current().correctAnswer + '"]').click();
      if(i<count-1) click('下一题');
    }
    startChapter();
    click('全部题目');
    for (const name of names) click(name, document.querySelector('.chip-wrap'));
    const union = bank.questions.filter(q => q.knowledgePoints.some(k => names.includes(k))).length;
    click('开始刷题');
    assert(session.active.config.limit === Math.min(10, union), '多个考点合并后默认限额十题');
    assert(new Set(session.active.queue).size === session.active.queue.length, '多个考点重叠的题目去重');
    for(let i=0, count=session.active.queue.length;i<count;i++) {
      document.querySelector('.opt[data-key="' + session.current().correctAnswer + '"]').click();
      if(i < count-1) click('下一题');
    }
    startChapter();
    click('全部题目');
    click('不限');
    click('逐题即时');
    click('开始刷题');
    const seen = new Set();
    for(let i=0;i<40;i++) {
      assert(!seen.has(session.current().id), '不限刷题第' + (i+1) + '题不重复');
      seen.add(session.current().id);
      assert(document.getElementById('practice-progress').textContent === `第${i+1}题/共40题`, '不限模式进度准确：第' + (i+1) + '题');
      document.querySelector('.opt[data-key="' + session.current().correctAnswer + '"]').click();
      if(i<39) click('下一题');
    }
    assert(session.active.finished && persist.history[0].stats.total === 40, '第四十题答完自动结束且保存一次完整报告');
    const historyCount = persist.history.length;
    session.finish();
    assert(persist.history.length === historyCount, '重复结束不会重复写入历史');
    await capture('11-四十题自动结算');
    for(let i=0;i<3 && document.documentElement.dataset.theme !== 'dark';i++) document.getElementById('theme-btn').click();
    assert(document.documentElement.dataset.theme === 'dark', '主题切换真实应用深色外观');
    await capture('09-深色报告');
    assert(document.documentElement.scrollWidth <= window.innerWidth + 1, '桌面页面无横向溢出');
    const backup = window.gaoshuBackup.export();
    assert(window.gaoshuBackup.validate(backup), '真实学习数据备份通过结构校验');
    const oldData = JSON.stringify(window.gaoshuBackup.read());
    localStorage.setItem('ghb.history.v1', '[]');
    assert(window.gaoshuBackup.restore(backup), '学习备份可恢复');
    assert(JSON.stringify(window.gaoshuBackup.read()) === oldData, '备份恢复后历史、错题与偏好完全一致');
    assert(!window.gaoshuBackup.restore('{}') && JSON.stringify(window.gaoshuBackup.read()) === oldData, '无效备份被拒绝且原有记录不变');
    const bad = JSON.parse(backup); bad.data['ghb.history.v1'] = '[{}]';
    assert(!window.gaoshuBackup.validate(JSON.stringify(bad)), '拒绝缺失字段的损坏历史记录');
    localStorage.setItem('desktop-test-runs', String(previous + 1));
    window.chrome.webview.postMessage({type:'test-done', success:true, checks, persistedRuns:previous + 1, userAgent:navigator.userAgent});
  } catch (error) {
    window.chrome.webview.postMessage({type:'test-failed', text:error.stack || String(error)});
  }
})();

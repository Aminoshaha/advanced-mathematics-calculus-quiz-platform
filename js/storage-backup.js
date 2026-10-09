// 桌面菜单和桌面验收共用的备份实现，禁止导入任意网页存储键。
(() => {
  const keys = ['ghb.history.v1', 'ghb.mistakes.v1', 'ghb.theme.v1', 'ghb.sidebar'];
  const object = value => !!value && typeof value === 'object' && !Array.isArray(value);
  const read = () => Object.fromEntries(keys.filter(k => localStorage.getItem(k) !== null).map(k => [k, localStorage.getItem(k)]));
  const validate = raw => {
    try {
      const backup = JSON.parse(raw);
      if (!object(backup) || backup.format !== 'gaoshu-backup' || backup.version !== 1 || !object(backup.data)) return false;
      // 完整学习记录才可替换本机记录；不接受空文件造成误清空。
      if (!('ghb.history.v1' in backup.data) || !('ghb.mistakes.v1' in backup.data)) return false;
      for (const [key, value] of Object.entries(backup.data)) {
        if (!keys.includes(key) || typeof value !== 'string') return false;
        const parsed = JSON.parse(value);
        if (key === 'ghb.history.v1') {
          if (!Array.isArray(parsed)) return false;
          for (const session of parsed) {
            if (!object(session) || !object(session.config) || !Array.isArray(session.config.kps) || !object(session.stats) || !Array.isArray(session.attempts) || !Array.isArray(session.kpBreakdown)) return false;
            if (!Number.isFinite(session.startedAt) || !Number.isFinite(session.elapsedMs)) return false;
            if (!['total', 'correct', 'wrong', 'rate'].every(k => Number.isFinite(session.stats[k]))) return false;
            if (session.attempts.some(a => !object(a) || typeof a.qid !== 'string' || typeof a.picked !== 'string' || typeof a.correct !== 'boolean')) return false;
          }
        }
        if (key === 'ghb.mistakes.v1' && (!object(parsed) || Object.entries(parsed).some(([qid,m]) => !object(m) || m.qid !== qid || !Number.isFinite(m.wrongCount) || typeof m.resolved !== 'boolean'))) return false;
        if (key === 'ghb.theme.v1' && !['system', 'light', 'dark'].includes(parsed)) return false;
        if (key === 'ghb.sidebar' && typeof parsed !== 'boolean') return false;
      }
      return true;
    } catch { return false; }
  };
  const write = data => { keys.forEach(k => localStorage.removeItem(k)); Object.entries(data).forEach(([k,v]) => localStorage.setItem(k,v)); };
  window.gaoshuBackup = {
    read,
    export: () => JSON.stringify({format:'gaoshu-backup',version:1,createdAt:new Date().toISOString(),data:{'ghb.history.v1':'[]','ghb.mistakes.v1':'{}',...read()}}),
    validate,
    restore(raw) {
      if (!validate(raw)) return false;
      const old = read();
      try { write(JSON.parse(raw).data); return true; }
      catch { write(old); return false; }
    }
  };
})();

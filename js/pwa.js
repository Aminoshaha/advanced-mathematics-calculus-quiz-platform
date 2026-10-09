import { el } from "./util.js";
import { toast, confirmSheet } from "./ui.js";
import { session } from "./store.js";
import "./storage-backup.js";

export function installPwaControls() {
  if (window.chrome?.webview) return; // 原生桌面宿主使用自身菜单与升级机制。
  const host=el("div.pwa-actions"), status=el("span.pwa-status",{text:"正在准备离线题库"});
  const install=el("button.pwa-button",{text:"安装",onclick:async()=>{
    if (promptEvent) {await promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;}
    else await confirmSheet({title:"添加到手机桌面",text:"iPhone：用 Safari 打开，点分享 → 添加到主屏幕。Android：在浏览器菜单中选择安装应用或添加到主屏幕。首次打开请等待“离线就绪”。",okText:"知道了",cancelText:"关闭"});
  }});
  let promptEvent=null,updating=false;
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();promptEvent=e;});
  window.addEventListener("appinstalled",()=>{install.hidden=true;toast("已添加到桌面");});
  if(matchMedia("(display-mode: standalone)").matches || navigator.standalone) install.hidden=true;
  const records=el("button.pwa-button",{text:"记录",onclick:()=>dataMenu()});
  host.append(status,install,records);document.querySelector(".titlebar__actions").prepend(host);
  if(!("serviceWorker" in navigator)||!window.isSecureContext){status.textContent="离线功能需 HTTPS";return;}
  const offlineLabel=()=>{status.textContent=navigator.onLine?"离线就绪":"离线使用中";};
  navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(reg=>{
    const offerUpdate=()=>{
      status.textContent="新版已就绪";
      if(host.querySelector(".pwa-update"))return;
      host.appendChild(el("button.pwa-button.pwa-update",{text:"更新",onclick:async()=>{
        if(await confirmSheet({title:"更新题库",text:"更新会重新打开页面，本次练习进度将保留。",okText:"立即更新"})){
          session.saveDraft();updating=true;reg.waiting?.postMessage({type:"APPLY_UPDATE"});
        }
      }}));
    };
    if(reg.waiting)offerUpdate();
    const watchWorker=worker=>worker?.addEventListener("statechange",()=>{
      if(worker.state==="installed"&&navigator.serviceWorker.controller)offerUpdate();
      if(worker.state==="redundant"&&!navigator.serviceWorker.controller){status.textContent="离线准备失败";status.title="联网后刷新页面可重试。";}
    });
    watchWorker(reg.installing);
    reg.addEventListener("updatefound",()=>watchWorker(reg.installing));
    navigator.serviceWorker.ready.then(()=>{if(!reg.waiting)offlineLabel();window.addEventListener("online",offlineLabel);window.addEventListener("offline",offlineLabel);});
    navigator.serviceWorker.addEventListener("controllerchange",()=>{if(updating)location.reload();});
  }).catch(()=>{status.textContent="离线准备失败";status.title="请保持联网后重新打开；当前仍可在线刷题。";});
}

function dataMenu() {
  const mask=el("div.sheet-mask"),box=el("section.answer-sheet",{role:"dialog","aria-modal":"true","aria-label":"学习记录"});
  const close=()=>mask.remove();
  box.append(el("h2",{text:"学习记录"}),el("p.dim",{text:"记录保存在这台设备。用备份文件可以在手机与电脑之间转移。"}),
    el("button.btn.btn--primary",{onclick:async()=>{
      const file=new File([window.gaoshuBackup.export()],"高数学习记录-"+new Date().toISOString().slice(0,10)+".json",{type:"application/json"});
      try{
        if(navigator.canShare?.({files:[file]}))await navigator.share({files:[file],title:"高数学习记录"});
        else{const url=URL.createObjectURL(file),a=el("a",{href:url,download:file.name});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
        toast("备份已生成");close();
      }catch(e){if(e.name!=="AbortError")toast("备份未保存，请重试");}
    }},["备份学习记录"]),
    el("button.btn.btn--bordered",{onclick:()=>{
      const input=el("input",{type:"file",accept:".json,application/json"});
      input.addEventListener("change",async()=>{
        const file=input.files?.[0];if(!file)return;
        if(file.size>16*1024*1024){toast("文件过大，请选择题库备份");return;}
        const raw=await file.text();if(!window.gaoshuBackup.validate(raw)){toast("备份文件无效，当前记录未改变");return;}
        close();
        if(await confirmSheet({title:"恢复学习记录？",text:"会替换当前记录，并丢弃本次未结算练习。建议先备份当前记录。",okText:"恢复"})){
          try{localStorage.setItem("ghb.restore-snapshot",window.gaoshuBackup.export());}catch{toast("无法保存恢复前快照，已取消恢复");return;}
          if(window.gaoshuBackup.restore(raw)){session.discard();location.reload();}else toast("恢复失败，已保留原有记录");
        }
      });input.click();
    }},["恢复备份文件"]),el("button.btn",{onclick:close},["关闭"]));
  box.style.display="grid";box.style.gap="12px";mask.append(box);mask.addEventListener("click",e=>{if(e.target===mask)close();});document.querySelector(".window").append(mask);
}

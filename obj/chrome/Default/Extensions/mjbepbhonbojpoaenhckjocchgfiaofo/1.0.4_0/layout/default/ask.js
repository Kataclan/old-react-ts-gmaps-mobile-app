window.requestFileSystem||(window.requestFileSystem=window.webkitRequestFileSystem);window.BlobBuilder||(window.BlobBuilder=window.WebKitBlobBuilder);
Registry.require("promise layout xmlhttprequest convert crcrc curtain layout/default/tabview layout/default/htmlutil helper i18n parser layout/default/layout_helper".split(" "),function(){var G=rea.FEATURES,L=Registry.get("promise"),n=Registry.get("crcrc").cr,c=Registry.get("crcrc").crc,l=Registry.get("i18n"),y=Registry.get("curtain"),w=Registry.get("helper"),N=Registry.get("layout/default/tabview"),r=Registry.get("layout/default/htmlutil"),D=Registry.get("layout"),E=Registry.get("layout/default/layout_helper"),
z=E.images;D.render(function(){E.addStyle();E.addFont();var m=null,H="???",A=null,I="0.0.0",B=function(){var a=document.getElementById("ask"),d=c("div","content_wrapper","ask","main");if(a){var b=a.parentNode;b.removeChild(a);b.appendChild(d);document.body.setAttribute("class","main")}var a=c("div","head_container","ask","head_container"),b=c("div","tv_container","ask","tv_container"),g=n("a","head_link","ask","head_link");g.href="http://awe.acestream.me";g.target="_blank";var e=c("div","float","ask",
"head1"),f=c("img","banner","ask");f.src=rea.extension.getURL("images/icon128.png");var l=c("div","float head","ask","head2"),u=c("div","header_title","heading"),q=c("div","version","version","version");q.textContent=" by Ace Stream";var k=n("div","search","box","");u.textContent="Ace Stream Web Extension";e.appendChild(f);l.appendChild(u);l.appendChild(q);g.appendChild(e);g.appendChild(l);a.appendChild(g);a.appendChild(k);d.appendChild(a);d.appendChild(b);d=N.create("_main",b);a=n("div","main","main",
"tab_content_h");a.textContent=H;b=n("div","main","main","tab_content");d.appendTab(w.createUniqueId("main","main"),a,b).select();y.hide();return b},D=function(a){var d=a.script,b=c("div","viewer_bottom","bottom","");a=c("div","editor_400p_outer","editor",d.name);var g=c("div","editor_400p editor_border","editor",d.name);b.appendChild(a);a.appendChild(g);m.nocm?(a=c("textarea","editorta","editor",d.name),a.setAttribute("wrap","off"),g.appendChild(a),a.value=d.textContent):window.setTimeout(function(){b.editor=
new MirrorFrame(g,{value:d.textContent,noButtons:!0,matchBrackets:!0})},1);return b},O=function(){var a={};window.addEventListener("keydown",function(c){var b=!1;if("keydown"==c.type&&(a[c.keyCode]&&(b=a[c.keyCode](c)),b))return c.stopPropagation(),c.preventDefault(),!1},!0);return{registerListener:function(c,b){a[c]=b}}}(),C=function(a,d,b){w.select(b,function(a){return a.label}).forEach(function(b){var e=c("input",d,"tm",b.label);e.type="button";e.value=b.label;e.addEventListener("click",b.fn);
a.appendChild(e);b.focus&&window.setTimeout(function(){$(e).focus()},300);b.keyDown&&O.registerListener(b.keyDown.keyCode?b.keyDown.keyCode:b.keyDown,b.keyDown.cb?b.keyDown.cb:b.fn)})},R=function(a){var d=a.script,b=c("div","viewer_last","install"),g=c("div","viewer_content","install_content"),e=c("div","ask_action_buttons","install_buttons"),f=[];f.push({label:a.messages.action,fn:P,focus:!0});G.RUNTIME.CHROME&&21>G.RUNTIME.BROWSER_VERSION&&f.push({label:a.messages.flags.install?l.getMessage("Process_with_Chrome"):
null,fn:function(){Q(d.fileURL);$(b).hide()}});f.push({label:l.getMessage("Cancel"),fn:v,keyDown:27});C(e,"install",f);g.appendChild(e);b.appendChild(g);return b},S=function(a){var d=c("div","viewer_last","import"),b=c("div","viewer_content","import_content"),g=c("div","ask_action_buttons","import_buttons");C(g,"import",[{label:l.getMessage("Import"),fn:function(){var b=Object.keys(a.scripts);p(m.aid,"import",{data:{import_ids:b,global_settings:a.global_settings}})},focus:!0},{label:l.getMessage("Cancel"),
fn:v,keyDown:27}]);b.appendChild(g);d.appendChild(b);return d},T=function(a){a=c("div","viewer_last","ok");var d=c("div","viewer_content","ok_content"),b=c("div","ask_action_buttons","ok_buttons");C(b,"import",[{label:l.getMessage("Ok"),fn:v,focus:!0}]);d.appendChild(b);a.appendChild(d);return a},U=function(a,d){var b=c("div","viewer_last","ok"),g=c("div","viewer_content","ok_content"),e=c("div","ask_action_buttons","ok_buttons");C(e,"permission",[{label:l.getMessage("Ok"),fn:function(){rea.permissions.request({permissions:[d.permission]},
function(a){rea.runtime.lastError&&console.warn("notify: error on getting permission",d.permission+"!","reason:",rea.runtime.lastError.message);p(m.aid,"permission",{data:{granted:a,permission:d.permission}})})},focus:!0},{label:l.getMessage("Cancel"),fn:v,keyDown:27}]);g.appendChild(e);b.appendChild(g);var g=c("div","viewer_upper","permission"),e=c("div","viewer_info","general","permission"),f=c("div","viewer_content","general_content","permission"),x=n("h3","install","heading","permission"),u=c("span",
"message","heading","permission");x.textContent=d.title;u.textContent=d.message;f.appendChild(u);e.appendChild(x);e.appendChild(f);g.appendChild(e);a.appendChild(g);a.appendChild(b)},F=function(a,d){var b=a.preparat,g=a.content,e=b.script||{},f=e.uuid||e.id||e.name;b.short_info||(b.short_info=[]);var x=c("div","viewer_upper",f),u=c("div","viewer_info","general",f),q=c("div","viewer_content","general_content",f),k=n("h3","install","heading",f);if(e.icon||e.icon64){var h=n("img","version","heading",
f);h.src=e.icon||e.icon64;k.appendChild(h)}h=n("span","name","heading",f);h.textContent=b.heading||e.name||"";k.appendChild(h);e.version&&(h=c("span","view_version","heading",f),h.textContent="v"==e.version[0]?"":"v",h.textContent+=e.version,k.appendChild(h));u.appendChild(k);d&&b.short_info.unshift({prop:"heading",value:b.messages.heading,label:l.getMessage("Action")});var m=c("table","script_desc",f);b.short_info.forEach(function(a){var b=e[a.prop]||a.value;if(b||!d){var g=c("tr","script_desc",
a.prop,f),k=c("td","script_desc",a.prop,f+"dt"),h=c("td","script_desc",a.prop,f+"dd");k.textContent=a.label?a.label:"";h.textContent=b||l.getMessage("_not_set_");g.appendChild(k);g.appendChild(h);m.appendChild(g)}});q.appendChild(m);var k=c("div","viewer_info","info",f),t;d?t=q:(t=c("div","viewer_content","info_content",f),h=n("h4","action","heading",f),h.textContent=b.messages.heading,t.appendChild(h));var p=0;["errors","warnings","info"].forEach(function(a){var c=n("table",a,f+p);(b.messages[a]||
[]).forEach(function(b){p++;var e=n("tr",a,f+p),d=n("td",a,f+"dt"+p),g=n("td",a,f+"dd"+p);"info"==a?b.label&&b.value?(d.textContent=b.label,g.textContent=b.value):(d.innerHTML='<img src="'+z.get("info")+'"></img>&nbsp;',g.innerHTML=r.safeTagsReplace(b).replace(/\n/,"<br />")):"warnings"==a?(d.innerHTML='<img src="'+z.get("critical")+'"></img>&nbsp;',g.innerHTML=r.safeTagsReplace(b).replace(/\n/,"<br />")):"errors"==a&&(d.innerHTML='<img src="'+z.get("error")+'"></img>&nbsp;',g.innerHTML=r.safeTagsReplace(b).replace(/\n/,
"<br />"));e.appendChild(d);e.appendChild(g);c.appendChild(e)});t.appendChild(c)});h=function(a,b,d,g){var k=n("table",a,f),h=0,m={};b.forEach(function(b){if(!(h>g||m[b])){m[b]=!0;var e=c("tr",a+"desc",b,f+h),l=c("td",a+"desc",b,f+h+"dt"),n=c("td",a+"desc",b,f+h+"dd");l.innerHTML=0==h?r.safeTagsReplace(d.label):"&nbsp;";n.innerHTML=h==g?'<span title="'+r.safeTagsReplace(d.warning)+'">...!</span>':r.safeTagsReplace(b);e.appendChild(l);e.appendChild(n);k.appendChild(e);h++}});if(e.options&&(b=e.options.override&&
e.options.override["use_"+a])&&b.length){b=c("tr",a+"desc","ovverride",f+h);var q=c("td",a+"desc","ovverride",f+h+"dt"),p=c("td",a+"desc","ovverride",f+h+"dd");q.innerHTML=0==h?r.safeTagsReplace(d.label):"&nbsp;";p.innerHTML=r.safeTagsReplace(" ("+l.getMessage("overwritten_by_user")+")");b.appendChild(q);b.appendChild(p);k.appendChild(b)}t.appendChild(k)};h("includes",(e.includes||[]).concat(e.matches||[]),{label:l.getMessage("Include_s__"),warning:l.getMessage("Attention_Can_not_display_all_includes_")},
5);h("excludes",e.excludes||[],{label:l.getMessage("Exclude_s__"),warning:l.getMessage("Attention_Can_not_display_all_excludes_")},3);u.appendChild(q);k.appendChild(t);x.appendChild(u);x.appendChild(k);g.appendChild(x);a.install&&g.appendChild(a.install(b));a.editor&&g.appendChild(a.editor(b))},Q=function(a){p(m.aid,"abort");window.setTimeout(function(){window.location=a+"#bypass=true"},10)},v=function(a,c){p(m.aid,"abort");window.setTimeout(function(){window.close()},100)},J=function(a,c){p(m.aid,
"unload");A&&(window.clearInterval(A),A=null);window.removeEventListener("unload",J)};window.addEventListener("unload",J);var K=function(){window.location.search||window.location.hash?(m=w.getUrlArgs(),m.aid?(p(m.aid,"preparat").done(function(a){a.ext&&a.ext.version&&(I=a.ext.version);a.i18n&&l.setLocale(a.i18n);a.options&&a.options.statistics_enabled&&M.init("ask",I);H=l.getMessage("Install");var d=null;a.preparat&&("install"==a.type?d=function(){F({content:B(),preparat:a.preparat,install:R,editor:D})}:
"install_error"==a.type?d=function(){F({content:B(),preparat:a.preparat,install:T},!0)}:"import"==a.type?d=function(){var b=B(),d=a.preparat;b.appendChild(S(d));if(d.global_settings){var e=c("div","viewer_upper",t),f=c("div","viewer_upper","global_settings"),m=c("div","viewer_info","general","global_settings"),p=c("div","viewer_content","general_content","global_settings"),q=n("h3","install","heading","global_settings"),k=n("img","version","heading","global_settings");k.src=rea.extension.getURL("images/icon48.png");
q.appendChild(k);k=n("span","name","heading","global_settings");k.textContent=l.getMessage("Global_Settings");q.appendChild(k);m.appendChild(q);var q=c("table","script_desc","global_settings"),k=c("tr","settings_desc","action","global_settings"),h=c("td","settings_desc","action","global_settingsdt"),r=c("td","settings_desc","action","global_settingsdd");h.textContent=l.getMessage("Action");r.textContent=l.getMessage("Global_settings_import");k.appendChild(h);k.appendChild(r);q.appendChild(k);k=c("tr",
"settings_desc","warning","global_settings");h=c("td","settings_desc","warning","global_settingsdt");r=c("td","settings_desc","warning","global_settingsdd");h.innerHTML='<img src="'+z.get("critical")+'"></img>&nbsp;';r.textContent=l.getMessage("This_will_overwrite_your_global_settings_");k.appendChild(h);k.appendChild(r);q.appendChild(k);p.appendChild(q);m.appendChild(p);f.appendChild(m);e.appendChild(f);b.appendChild(e)}if(d.scripts)for(var t in d.scripts)e=d.scripts[t],f=c("div","viewer_upper",
t),F({content:f,preparat:e},!0),b.appendChild(f)}:"permission"==a.type&&(d=function(){U(B(),a.preparat)}),A=window.setInterval(V,6E4),d&&window.setTimeout(d,1))}).fail(function(){v()}),y.wait(l.getMessage("Please_wait___"))):v()):window.onhashchange=function(){K()}},V=function(){return p(m.aid,"ping",{bg:!0})},P=function(){return p(m.aid,"install")},p=function(a,c,b){b=b||{};var g=L();try{var e={aid:a,method:c};b.data&&w.each(b.data,function(a,c){e[c]=b.data[c]});sendMessage({method:"askCom",data:e},
function(a){b.bg||y.hide();a.error?("close"==a.action&&v(),g.reject(a)):g.resolve(a)});b.bg||y.wait(l.getMessage("Please_wait___"))}catch(f){console.warn("sS: "+f.message),g.reject()}return g.promise()};rea.extension.onMessage.addListener(function(a,c,b){if("confirm"==a.method)w.confirm(a.msg,function(a){b({confirm:a})});else if("showMsg"==a.method)w.alert(a.msg),b({});else return!1;return!0});K()})});

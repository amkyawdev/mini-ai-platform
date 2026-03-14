// Memory Module - LocalStorage persistence
var CHATS_KEY="amkyaw_chats",CURRENT_CHAT_KEY="amkyaw_current_chat",PREFS_KEY="amkyaw_prefs";
function getChats(){var c=localStorage.getItem(CHATS_KEY);return c?JSON.parse(c):[];}
function saveChats(c){localStorage.setItem(CHATS_KEY,JSON.stringify(c));}
function createChat(t){var cs=getChats(),nc={id:Date.now().toString(),title:t||"New Chat",messages:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};cs.unshift(nc);saveChats(cs);return nc;}
function getChat(id){var cs=getChats();return cs.find(function(c){return c.id===id})||null;}
function updateChat(id,d){var cs=getChats(),i=cs.findIndex(function(c){return c.id===id});if(i!==-1){cs[i]={...cs[i],...d,updatedAt:new Date().toISOString()};saveChats(cs);}}
function deleteChat(id){var cs=getChats().filter(function(c){return c.id!==id});saveChats(cs);if(getCurrentChat()===id)clearCurrentChat();}
function getCurrentChat(){return localStorage.getItem(CURRENT_CHAT_KEY);}
function setCurrentChat(id){localStorage.setItem(CURRENT_CHAT_KEY,id);}
function clearCurrentChat(){localStorage.removeItem(CURRENT_CHAT_KEY);}
function addMessage(cid,msg){var c=getChat(cid);if(c){c.messages.push({...msg,timestamp:new Date().toISOString()});c.updatedAt=new Date().toISOString();if(c.messages.length===1&&c.title==="New Chat"){c.title=msg.content.substring(0,40)+(msg.content.length>40?"...":"");}updateChat(cid,{messages:c.messages,title:c.title});}}
function getPreferences(){var p=localStorage.getItem(PREFS_KEY);return p?JSON.parse(p):{aiName:"AmkyawDev AI",apiProvider:"groq",apiKey:""};}
function savePreferences(p){var c=getPreferences();localStorage.setItem(PREFS_KEY,JSON.stringify({...c,...p}));}
function clearAllData(){localStorage.removeItem(CHATS_KEY);localStorage.removeItem(CURRENT_CHAT_KEY);localStorage.removeItem(PREFS_KEY);}

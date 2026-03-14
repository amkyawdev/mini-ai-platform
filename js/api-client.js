// API Client
async function callAI(q){
    var s=JSON.parse(localStorage.getItem("settings")||'{"apiKey":""}');
    if(!s.apiKey)return getMock();
    try{
        var r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+s.apiKey},body:JSON.stringify({model:"llama-3.1-70b-versatile",messages:[{role:"user",content:q}],temperature:0.7})});
        if(!r.ok)throw new Error();
        var d=await r.json();if(d.choices&&d.choices[0])return d.choices[0].message.content;
    }catch(e){}
    return getMock();
}
function getMock(){return["I'm AmkyawDev! Set API key in Settings.","Demo mode. Configure your API key."][Math.floor(Math.random()*2)];}

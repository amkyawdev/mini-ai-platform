// AI Agent.js - Connect to Knowledge Base
async function searchKnowledge(query) {
    var results = [];
    var files = ['knowledge/k_1.json','knowledge/k_2.json','knowledge/k_3.json','knowledge/k_4.json'];
    
    for(var f of files) {
        try {
            var r = await fetch(f);
            var data = await r.json();
            if(data.content.toLowerCase().includes(query.toLowerCase())) {
                results.push(data);
            }
        } catch(e) {}
    }
    return results;
}

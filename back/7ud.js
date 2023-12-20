
function it() {
    console.log('runing');
    let winerTag= document.querySelector('#root > div:nth-child(2) > div > div > div.indian-casino-iframe-ctn.web-view > div.web-view > div.timer > div > div > div.winner')
    if(winerTag===null)return
    try{ 
        console.log('sending data');
    fetch("http://localhost:3500/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Private-Network": "true",
      },
      body: JSON.stringify({ val:winerTag.textContent.trim() }),
    });
}catch(err){

}
}
setInterval(it,1000)

/* --------------------------- */

/* 
winer tag=document.querySelector('#root > div:nth-child(2) > div > div > div.indian-casino-iframe-ctn.web-view > div.web-view > div.timer > div > div > div.winner')
*/
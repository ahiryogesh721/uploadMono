/* --------------------------- */
function it() {
  let refreshTag = document.querySelector("bob");
  if (refreshTag !== null) {
    location.reload();
    const scriptContent = document.createTextNode('console.log("init");');
    const scriptElement = document.createElement("script");
    scriptElement.appendChild(scriptContent);
    document.head.appendChild(scriptElement);
  }

  let winerTag = document.querySelector(
    "#root > div:nth-child(2) > div > div > div.indian-casino-iframe-ctn.web-view > div.web-view > div.timer > div > div > div.winner"
  );
  if (winerTag === null) return;
  fetch("http://localhost:3500/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Private-Network": "true",
    },
    body: JSON.stringify({ val: winerTag.textContent.trim(), game: "g-2ct" }),
  });
}
setInterval(it, 2000);
/* --------------------------- */

/* 
g-7=7 up down
g-tod tenpati one day
g-2ct 2 card ten pati
g-2cto 2 card ten pati one
g-mtp muflis tenpati
*/

function it() {
  let refreshTag = document.querySelector(
    "body > div.MuiModal-root.MuiDialog-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div > div > div.refresh-container"
  );
  if (refreshTag !== null) {
    location.reload();
    console.log("reloded");
  } else console.log("script is runign");

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

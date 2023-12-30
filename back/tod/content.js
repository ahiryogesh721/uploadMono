function mainInit() {
  function boxChek() {
    let boxVal = document.querySelector(
      "#root > div:nth-child(2) > div > div > div.indian-casino-iframe-ctn.web-view > div.web-view > div.timer > div > div > div.winner"
    );

    if (boxVal === null) {
      console.log("waiting for winer tag");
    } else {
      console.log("making an api call");
      fetch("http://localhost:3500/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Private-Network": "true",
        },
        body: JSON.stringify({
          val: boxVal.textContent,
          game: "g-tod",
        }),
      });
    }
  }

  let boxElement = document.querySelector(
    "#root > div:nth-child(2) > div > div > div.indian-casino-iframe-ctn.web-view > div.web-view > div.iframe > div.footer-div.border-gradient-footer.border-gradient-purple-footer > div.buttons-div"
  );

  let refrshButton = document.querySelector(
    "body > div.MuiModal-root.MuiDialog-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div > div > div.refresh-container"
  );

  let curentPage = window.location.href;
  let gameUrl =
    "https://game.royalgaming.online/casino/RGONLINE/UkdPTkxJTkU6QUdUUDEwMTpBVEdUUDEwMQ==";

  if (curentPage === "https://game.royalgaming.online/no-access") {
    //call for disconected
  } else if (curentPage === gameUrl && boxElement !== null) {
    refrshButton === null ? "" : refrshButton.click();
    boxChek();
  } else {
    console.log("something is going wrong");
  }
}

setInterval(mainInit, 2000);

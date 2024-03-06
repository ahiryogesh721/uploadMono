let players, playersBets, playersGets, X;
const itrater = () => {
  let playersSpanVal = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__total.crash-total > div:nth-child(1) > span"
    )
    .textContent.trim();
  let playersBetsSpanVal = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__total.crash-total > div:nth-child(2) > span"
    )
    .textContent.trim()
    .split(" ")[0];

  let playersGetsSpanVal = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__total.crash-total > div:nth-child(3) > span"
    )
    .textContent.trim()
    .split(" ")[0];

  let xGVal = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash__wrap.crash__wrap--main > div.crash__game.crash-game > div.crash-game__timeline > svg > g:nth-child(5) > text"
    )
    .textContent.trim();

  let bobVal = +xGVal.slice(0, xGVal.length - 1);

  let userTag1 = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__results.crash-results > div > table > tbody > tr:nth-child(1)"
    )
    .classList.contains("crash-results__row--loss");

  let userTag2 = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__results.crash-results > div > table > tbody > tr:nth-child(2)"
    )
    .classList.contains("crash-results__row--loss");

  let userTag3 = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__results.crash-results > div > table > tbody > tr:nth-child(3)"
    )
    .classList.contains("crash-results__row--loss");

  let userTag4 = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__results.crash-results > div > table > tbody > tr:nth-child(4)"
    )
    .classList.contains("crash-results__row--loss");

  let userTag5 = document
    .querySelector(
      "#games_page > div.crash.games-container__game > div.crash-players-bets.crash__wrap.crash__wrap--left > div.crash-players-bets__results.crash-results > div > table > tbody > tr:nth-child(5)"
    )
    .classList.contains("crash-results__row--loss");

  if (userTag1 || userTag2 || userTag3 || userTag4 || userTag5) {
    console.log("sending erly");
    fetch("https://backend-fdok.onrender.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Private-Network": "true",
      },
      body: JSON.stringify({ players, playersBets, playersGets, X }),
    });
  } else if (playersGetsSpanVal === "0" && xGVal === "x") {
    console.log("sending at 0");
    fetch("https://backend-fdok.onrender.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Private-Network": "true",
      },
      body: JSON.stringify({ players, playersBets, playersGets, X }),
    });
  } else {
    console.log("recording data");
    playersSpanVal === "0" ? (players = players) : (players = playersSpanVal);
    playersBetsSpanVal === "0"
      ? (playersBets = playersBets)
      : (playersBets = playersBetsSpanVal);
    playersGetsSpanVal === "0"
      ? (playersGets = playersGets)
      : (playersGets = playersGetsSpanVal);
    xGVal === "x" ? (X = X) : (X = xGVal);
  }
};
setInterval(itrater, 200);
/* --------------------------------------- */

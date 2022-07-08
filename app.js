const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

const picked = [];
const won = [];

const classes = ["one", "two", "three", "four", "five", "six"];

const addEventListenersBack = () => {
  setTimeout(() => {
    for (const x of won) {
      x.el.classList = "winner";
    }
  }, 250);

  setTimeout(() => {
    document.querySelectorAll(".container > div").forEach((el) => {
      if (!el.classList.contains("winner")) {
        el.classList = "question";
        el.addEventListener("click", handleClicked);
      }
    });
  }, 500);
};

const check = () => {
  const [first, second] = picked;

  if (first.id === second.id) {
    won.push(first, second);
    if (won.length === 12) {
      alert("Congratulations, You Won!😎");
    }
  }

  picked.splice(0, 2);
  addEventListenersBack();
};

const handleClicked = (e) => {
  e.target.removeEventListener("click", handleClicked);
  const id = e.target.dataset.id;
  e.target.classList = classes[id];
  picked.push({ id, el: e.target });

  if (picked.length === 2) {
    document.querySelectorAll(".container > div").forEach((el) => {
      el.removeEventListener("click", handleClicked);
    });
    check();
  }
};

const createMemories = () => {
  const tempArr = [];

  for (let i = 0; i < 12; i++) {
    let y = i;
    if (y > 5) y = -6 + i;

    const div = document.createElement("div");
    div.classList.add("question");
    div.setAttribute("data-id", y);

    tempArr.push(div);
  }

  const shuffled = tempArr.sort(() => Math.random() - 0.5);

  shuffled.forEach((div) => {
    div.addEventListener("click", handleClicked);
    container.append(div);
  });
};
createMemories();

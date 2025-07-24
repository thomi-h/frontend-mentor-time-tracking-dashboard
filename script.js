let jsonData = [];

async function getData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    jsonData = data;

    updateUI("weekly");
  } catch (error) {
    console.log(error);
  }
}

function updateUI(timeframe) {
  jsonData.forEach((item) => {
    const card = document.querySelector(`[data-title = "${item.title}"]`);
    if (!card) return;
    const spentTime = card.querySelector(".spent-time");
    const previousTime = card.querySelector(".previous-time");

    const { current, previous } = item.timeframes[timeframe];

    spentTime.textContent = current < 2 ? `${current} hr` : `${current} hrs`;

    const label = {
      daily: "Yesterday",
      weekly: "Last Week",
      monthly: "Last Month",
    }[timeframe];

    previousTime.textContent = `${label} - ${previous < 2 ? previous + " hr" : previous + " hrs"}`;
  });
}

getData();

const navItems = document.querySelectorAll("nav > ul > li");

navItems.forEach((item) => {
  item.addEventListener("click", handleNavClick);
});

function handleNavClick() {
  navItems.forEach((el) => el.classList.remove("active"));
  this.classList.add("active");

  const timeframe = this.textContent.toLowerCase();
  updateUI(timeframe);
}

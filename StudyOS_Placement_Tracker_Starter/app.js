const tasks = [
  {name:"Python — Functions & OOP", area:"Python", plan:"60 min", status:"Done", confidence:"High"},
  {name:"DSA — Arrays & Hashing", area:"DSA", plan:"60 min", status:"In Progress", confidence:"Medium"},
  {name:"SQL — Joins & Aggregations", area:"SQL", plan:"45 min", status:"Not Started", confidence:"Medium"},
  {name:"ML — Evaluation Revision", area:"Machine Learning", plan:"45 min", status:"Missed", confidence:"Low"},
  {name:"Technical — Explain your PLC-IoT project", area:"Interview", plan:"30 min", status:"Not Started", confidence:"Medium"}
];

const skills = [
  ["Python",72],["DSA",55],["Machine Learning",61],["Deep Learning",43],
  ["GenAI",38],["SQL / DBMS",74],["OS / Networks",49],["Git",67],["Projects",70]
];

let role = "user";

function demoLogin(selectedRole) {
  role = selectedRole;

  const loginView = document.getElementById("loginView");
  const appView = document.getElementById("appView");

  if (loginView) loginView.classList.add("hidden");
  if (appView) appView.classList.remove("hidden");

  const roleBadge = document.getElementById("roleBadge");
  const settingsRole = document.getElementById("settingsRole");
  const avatar = document.getElementById("avatar");

  if (roleBadge) roleBadge.textContent = selectedRole === "admin" ? "ADMIN" : "STUDENT";
  if (settingsRole) settingsRole.textContent = selectedRole === "admin" ? "Admin" : "Student";
  if (avatar) avatar.textContent = selectedRole === "admin" ? "A" : "H";

  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    heroTitle.textContent = selectedRole === "admin"
      ? "Good morning, Admin."
      : "Good morning, Hariharan.";
  }

  renderTasks();
  renderSkills();
  updateDate();
  drawChart();
}

function logout() {
  window.location.reload();
}

function updateDate() {
  const today = document.getElementById("today");
  if (today) {
    today.textContent = new Date().toLocaleDateString(undefined, {
      weekday:"long",
      month:"short",
      day:"numeric",
      year:"numeric"
    });
  }
}

function setupNavigation() {
  const links = document.querySelectorAll("#nav a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(item => item.classList.remove("active"));
      link.classList.add("active");

      document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
      });

      const page = document.getElementById(link.dataset.page);
      if (page) page.classList.add("active-page");

      const title = document.getElementById("pageTitle");
      const label = link.querySelector("span");
      if (title && label) title.textContent = label.textContent;
    });
  });
}

function renderTasks() {
  const table = document.getElementById("taskTable");
  if (!table) return;

  table.innerHTML = tasks.map((task, index) => {
    let cls = "yellow";
    if (task.status === "Done") cls = "green";
    if (task.status === "Missed") cls = "red";
    if (task.status === "In Progress") cls = "orange";

    return `
      <tr>
        <td><b>${task.name}</b></td>
        <td>${task.area}</td>
        <td>${task.plan}</td>
        <td><span class="pill ${cls}">${task.status}</span></td>
        <td>${task.confidence}</td>
        <td>
          <button class="secondary" onclick="completeTask(${index})">
            ${task.status === "Done" ? "Completed" : "Update"}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function completeTask(index) {
  tasks[index].status = "Done";
  renderTasks();
  alert("Saved in demo mode. Connect Supabase for cloud persistence.");
}

function addTask() {
  tasks.push({
    name:"New study task",
    area:"Custom",
    plan:"30 min",
    status:"Not Started",
    confidence:"Medium"
  });
  renderTasks();
}

function renderSkills() {
  const grid = document.getElementById("skillGrid");
  if (grid) {
    grid.innerHTML = skills.map(skill => `
      <div class="skill-card">
        <h3>${skill[0]}</h3>
        <div class="pct">${skill[1]}%</div>
        <div class="bar"><i style="width:${skill[1]}%"></i></div>
        <small>Next: practice → explain → test</small>
      </div>
    `).join("");
  }
}

function drawChart() {
  const canvas = document.getElementById("skillChart");
  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {
    type:"bar",
    data:{
      labels:skills.map(item => item[0]),
      datasets:[{
        label:"Completion %",
        data:skills.map(item => item[1]),
        borderWidth:0,
        borderRadius:5,
        backgroundColor:"#1677ff"
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        y:{
          beginAtZero:true,
          max:100,
          grid:{color:"#eef1f5"}
        },
        x:{grid:{display:false}}
      }
    }
  });
}

function markRecovered(button) {
  const item = button.closest(".recovery-item");
  if (!item) return;

  item.style.opacity = "0.45";
  button.textContent = "Recovered";
  button.disabled = true;
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateDate();
});

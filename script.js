/* ===== Tabs ===== */
document.querySelectorAll(".tabBtn").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".tabBtn").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
    if(btn.dataset.tab === "chartTab") renderChart();
  };
});

/* ===== Constants ===== */
const PAY_PER_PERCENT = 100;
const workers = ["You","Alex","Joshua","Eska"];

/* ===== Upload JSON Logic ===== */
let weeklyData = [];
let chart;

uploadJSON.onclick = ()=>fileInput.click();

fileInput.onchange = e=>{
  const files = [...e.target.files];
  if(!files.length) return;

  weeklyData = [];
  const totals = Object.fromEntries(workers.map(w=>[w,0]));

  let done = 0;
  files.forEach(file=>{
    const r = new FileReader();
    r.onload = ev=>{
      const json = JSON.parse(ev.target.result);
      weeklyData.push(json);
      workers.forEach(w=>totals[w]+=Number(json[w]||0));
      if(++done === files.length){
        renderResultTable(totals);
        renderChart();
      }
    };
    r.readAsText(file);
  });
};

function renderResultTable(totals){
  const body = document.getElementById("resultBody");
  body.innerHTML = "";
  const teamTotal = workers.reduce((s,w)=>s+totals[w],0);

  workers.forEach(w=>{
    body.innerHTML += `
      <tr>
        <td>${w}</td>
        <td>${totals[w].toFixed(2)}</td>
        <td>$${(totals[w]*PAY_PER_PERCENT).toFixed(0)}</td>
        <td>${(totals[w]/teamTotal*100).toFixed(2)}%</td>
      </tr>
    `;
  });

  teamPerf.textContent = teamTotal.toFixed(2)+"%";
  teamPay.textContent = "$"+(teamTotal*PAY_PER_PERCENT).toFixed(0);
  resultTable.style.display = "table";
}

/* ===== Calculation Tab Logic ===== */
const calcBody = document.getElementById("calcBody");

workers.forEach(w=>{
  calcBody.innerHTML += `
    <tr>
      <td>${w}</td>
      <td><input type="number" step="0.1" data-worker="${w}" value="0"></td>
      <td class="pay">$0</td>
      <td class="total">0.00</td>
      <td class="share">0.00%</td>
    </tr>
  `;
});

function updateCalc(){
  let team = 0;
  let pay = 0;
  const values = {};

  [...calcBody.rows].forEach(r=>{
    const input = r.querySelector("input");
    const v = Number(input.value)||0;
    values[input.dataset.worker] = v;
    team += v;
    pay += v*PAY_PER_PERCENT;
    r.querySelector(".pay").textContent = "$"+(v*PAY_PER_PERCENT);
    r.querySelector(".total").textContent = v.toFixed(2);
  });

  [...calcBody.rows].forEach(r=>{
    const v = values[r.querySelector("input").dataset.worker];
    r.querySelector(".share").textContent =
      team ? (v/team*100).toFixed(2)+"%" : "0.00%";
  });

  weeklyPerf.textContent = team.toFixed(2)+"%";
  weeklyPay.textContent = "$"+pay;
}

document.addEventListener("input", updateCalc);

/* ===== Download Weekly JSON ===== */
downloadJSON.onclick = ()=>{
  const data = {};
  [...calcBody.rows].forEach(r=>{
    const i = r.querySelector("input");
    data[i.dataset.worker] = Number(i.value)||0;
  });
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "weekly_performance.json";
  a.click();
};

/* ===== Chart ===== */
function renderChart(){
  if(!weeklyData.length) return;

  const labels = weeklyData.map((_,i)=>`Week ${i+1}`);
  const colors = ["#3b82f6","#f97316","#10b981","#eab308"];

  const datasets = workers.map((w,i)=>({
    label:w,
    data:weeklyData.map(d=>Number(d[w]||0)),
    borderColor:colors[i],
    tension:0.3
  }));

  if(chart) chart.destroy();
  chart = new Chart(performanceChart,{
    type:"line",
    data:{labels,datasets},
    options:{responsive:true}
  });
}

/* =========================
   DARK MODE TOGGLE
   ========================= */

const toggleBtn = document.getElementById("themeToggle");

// load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️ Light";
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  toggleBtn.textContent = isLight ? "☀️ Light" : "🌙 Dark";
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

document
  .getElementById("generateBtn")
  .addEventListener("click", generateTracker);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generateTracker() {
  const habitCount = parseInt(document.getElementById("habitCount").value, 10);
  const weekCount = parseInt(document.getElementById("weekCount").value, 10);

  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Habit Tracker";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = `${weekCount} Week Layout`;

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Table
  const table = document.createElement("table");
  table.className = "schedule-table";

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const totalDays = days.length * weekCount;

  // Header row
  const headerRow = document.createElement("tr");
  const habitHeader = document.createElement("th");
  habitHeader.textContent = "Habit";
  habitHeader.className = "time";
  headerRow.appendChild(habitHeader);

  for (let w = 0; w < weekCount; w++) {
    days.forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      th.className = "time";
      headerRow.appendChild(th);
    });
  }

  table.appendChild(headerRow);

  // Habit rows
  for (let i = 0; i < habitCount; i++) {
    const row = document.createElement("tr");

    const habitCell = document.createElement("td");
    habitCell.className = "time";
    habitCell.textContent = `Habit ${i + 1}`;
    row.appendChild(habitCell);

    for (let d = 0; d < totalDays; d++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  page.appendChild(table);
  preview.appendChild(page);

  document.getElementById("downloadBtn").classList.remove("hidden");
}

function downloadPDF() {
  const preview = document.getElementById("previewArea");
  const page = preview.querySelector(".planner-page");

  html2canvas(page, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF("p", "pt", "letter");
    pdf.addImage(imgData, "PNG", 0, 0, 612, 792);
    pdf.save("habit-tracker.pdf");
  });
}

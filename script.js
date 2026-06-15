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

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let w = 1; w <= weekCount; w++) {
    const weekLabel = document.createElement("h2");
    weekLabel.textContent = `Week ${w}`;
    page.appendChild(weekLabel);

    const table = document.createElement("table");
    table.className = "schedule-table";

    // Header row
    const headerRow = document.createElement("tr");

    const habitHeader = document.createElement("th");
    habitHeader.textContent = "Habit";
    habitHeader.className = "time";
    headerRow.appendChild(habitHeader);

    days.forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      th.className = "time";
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Habit rows
    for (let i = 0; i < habitCount; i++) {
      const row = document.createElement("tr");

      const habitCell = document.createElement("td");
      habitCell.className = "habit-name-cell";
      habitCell.textContent = ""; // blank for user to write
      row.appendChild(habitCell);

      days.forEach(() => {
        const cell = document.createElement("td");
        cell.className = "habit-checkbox";
        row.appendChild(cell);
      });

      table.appendChild(row);
    }

    page.appendChild(table);
  }

  preview.appendChild(page);
  document.getElementById("downloadBtn").classList.remove("hidden");
}

function downloadPDF() {
  const preview = document.getElementById("previewArea");
  const page = preview.querySelector(".planner-page");

  html2pdf().from(page).save("habit-tracker.pdf");
}

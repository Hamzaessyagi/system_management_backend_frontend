
  const selectAll = document.getElementById("select-all");
  const checkboxes = document.querySelectorAll(".select-user");
  
  selectAll.addEventListener("change", () => {
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
  });
  const modal = document.getElementById("modal");
  const addUserBtn = document.getElementById("addUserBtn");
  const closeModalBtn = document.getElementById("closeModal");
  const userForm = document.getElementById("userForm");
  const tableBody = document.querySelector(".user-table tbody");

  // Ouvrir la modale
  addUserBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fermer la modale
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    userForm.reset();
  });

  // Soumettre le formulaire
  userForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const username = document.getElementById("password").value;

    const currentDate = new Date().toLocaleDateString();
    const lastActive = "Just now";

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="checkbox" class="select-user"></td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${username}</td>
      <td><span class="badge active">Present</span></td>
      <td>${role}</td>
      <td>${currentDate}</td>
      <td>${lastActive}</td>
      <td>
        <i class="fas fa-edit action"></i>
        <i class="fas fa-trash action delete"></i>
      </td>
    `;

    tableBody.appendChild(newRow);
    modal.style.display = "none";
    userForm.reset();
  });

  // (optionnel) Fermer la modale en cliquant en dehors
  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      userForm.reset();
    }
  });
  

const statusFilterBtn = document.getElementById("statusFilterBtn");
const statusDropdown = document.getElementById("statusDropdown");
const dropdownOptions = document.querySelectorAll(".dropdown-option");
const tableRows = document.querySelectorAll(".user-table tbody tr");

// Afficher ou cacher le menu déroulant
statusFilterBtn.addEventListener("click", () => {
  statusDropdown.classList.toggle("hidden");
});

// Filtrer selon le statut sélectionné
dropdownOptions.forEach(option => {
  option.addEventListener("click", () => {
    const selectedStatus = option.getAttribute("data-status");

    tableRows.forEach(row => {
      const badge = row.querySelector(".badge");
      const statusClass = badge ? badge.classList[1] : "";

      if (selectedStatus === "all" || statusClass === selectedStatus) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    // Fermer le menu
    statusDropdown.classList.add("hidden");
  });
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("badge")) {
    const badge = e.target;
    const currentStatus = badge.classList[1]; // ex: active, inactive, suspended

    // Créer un petit menu
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    dropdown.style.position = "absolute";
    dropdown.style.background = "#fff";
    dropdown.style.border = "1px solid #ccc";
    dropdown.style.padding = "5px";
    dropdown.style.borderRadius = "5px";
    dropdown.style.zIndex = 9999;

    ["active", "inactive", "suspended"].forEach(status => {
      const option = document.createElement("div");
      option.textContent = status === "active" ? "Present" : status === "inactive" ? "Absent" : "Suspended";
      option.classList.add("dropdown-option");
      option.style.padding = "5px";
      option.style.cursor = "pointer";

      option.addEventListener("click", () => {
        badge.classList.remove("active", "inactive", "suspended");
        badge.classList.add(status);
        badge.textContent = option.textContent;

        document.body.removeChild(dropdown);
      });

      dropdown.appendChild(option);
    });

    // Supprimer ancien menu s’il existe
    const oldDropdown = document.querySelector(".badge-edit-dropdown");
    if (oldDropdown) oldDropdown.remove();

    dropdown.classList.add("badge-edit-dropdown");

    // Positionner le menu sous le badge
    const rect = badge.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(dropdown);
  } else {
    // Cliquer ailleurs ferme le menu
    const openDropdown = document.querySelector(".badge-edit-dropdown");
    if (openDropdown) {
      openDropdown.remove();
    }
  }
});


document.addEventListener("click", function (e) {
  // MODIFIER 
  if (e.target.classList.contains("fa-edit")) {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");

    // Ne pas modifier le checkbox ni les actions
    for (let i = 1; i <= 6; i++) {
      const input = document.createElement("input");
      input.value = cells[i].innerText;
      cells[i].innerText = '';
      cells[i].appendChild(input);
    }

    // Remplacer les icn par "Save" & "Cancel"
    const actionsCell = cells[8];
    actionsCell.innerHTML = `
      <i class="fas fa-check action save"></i>
      <i class="fas fa-times action cancel"></i>
    `;
  }

  // SAUVEGARDER 
  if (e.target.classList.contains("save")) {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");

    for (let i = 1; i <= 6; i++) {
      const input = cells[i].querySelector("input");
      if (input) {
        cells[i].innerText = input.value;
      }
    }

    // Remettre les icônes
    const actionsCell = cells[8];
    actionsCell.innerHTML = `
      <i class="fas fa-edit action"></i>
      <i class="fas fa-trash action delete"></i>
    `;
  }

  // ANNULER 
  if (e.target.classList.contains("cancel")) {
    // Recharger la page ou restaurer les anciennes valeurs si tu les stockes avant
    location.reload(); // simple solution pour revenir à l’état initial
  }
    // SUPPRIMER 
  if (e.target.classList.contains("fa-trash")) {
    const row = e.target.closest("tr");
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      row.remove();
    }
  }

});
(function () {
  document.documentElement.classList.add("js");

  /* Etapas do projeto: abas com teclado e barra de progresso */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (tab) {
    return document.getElementById(tab.getAttribute("aria-controls"));
  });
  var fill = document.querySelector(".track-fill");

  function select(index, moveFocus) {
    tabs.forEach(function (tab, i) {
      var active = i === index;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
      tab.classList.toggle("done", i < index);
      panels[i].hidden = !active;
    });
    if (fill) {
      fill.style.width = (index / (tabs.length - 1)) * 100 + "%";
    }
    if (moveFocus) {
      tabs[index].focus();
    }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () {
      select(i, false);
    });

    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;

      if (next !== null) {
        event.preventDefault();
        select(next, true);
      }
    });
  });

  if (tabs.length) {
    select(0, false);
  }

  /* Botão para copiar o e-mail */
  var emailLink = document.getElementById("email-link");
  if (emailLink && navigator.clipboard) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "copy";
    button.textContent = "Copiar";

    var status = document.createElement("span");
    status.className = "copy-status";
    status.setAttribute("role", "status");

    emailLink.parentNode.appendChild(button);
    emailLink.parentNode.appendChild(status);

    button.addEventListener("click", function () {
      navigator.clipboard
        .writeText(emailLink.textContent.trim())
        .then(function () {
          status.textContent = "E-mail copiado";
        })
        .catch(function () {
          status.textContent = "Não foi possível copiar";
        });
      setTimeout(function () {
        status.textContent = "";
      }, 2500);
    });
  }
})();

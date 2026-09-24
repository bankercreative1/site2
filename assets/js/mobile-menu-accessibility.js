/* Keyboard support for the existing mobile menu divs.
 * Future cleanup: replace them with native buttons after migrating their styles.
 */
document.addEventListener("DOMContentLoaded", function () {
  var toggles = [];

  function prepare(toggle, menu, updateMenu) {
    if (!toggle || !menu) return;

    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");
    toggle.setAttribute("aria-controls", menu.id);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    toggle.classList.remove("uabb-active");
    updateMenu(false);
    toggles.push(toggle);

    // The page's existing click handler updates aria-expanded first.
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      updateMenu(open);
      if (!open) toggle.focus();
    });

    toggle.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        toggle.click();
      }
    });
  }

  var mainMenu = document.getElementById("menu-main-menu");
  var mainWrapper = mainMenu && mainMenu.closest(".uabb-creative-menu");
  prepare(
    mainWrapper && mainWrapper.querySelector(".uabb-creative-menu-mobile-toggle"),
    mainMenu,
    function (open) {
      mainMenu.style.display = open ? "block" : "";
    }
  );

  // The visible mobile hamburger belongs to the off-canvas copy of the menu.
  var drawer = document.querySelector(".uabb-creative-menu.off-canvas");
  var drawerMenu = drawer && drawer.querySelector("#menu-main-menu-1");
  var drawerContainer = drawer && drawer.previousElementSibling;
  var drawerToggle = drawerContainer &&
    drawerContainer.querySelector(".uabb-creative-menu-mobile-toggle");
  prepare(drawerToggle, drawerMenu, function (open) {
    drawer.classList.toggle("menu-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    drawer.inert = !open;
  });

  var closeButton = drawer && drawer.querySelector(".uabb-menu-close-btn");
  if (closeButton && drawerToggle) {
    closeButton.addEventListener("click", function () {
      if (drawerToggle.getAttribute("aria-expanded") === "true") drawerToggle.click();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var openToggle = toggles.find(function (toggle) {
      return toggle.getAttribute("aria-expanded") === "true";
    });
    if (!openToggle) return;
    event.preventDefault();
    openToggle.click();
    openToggle.focus();
  });
});
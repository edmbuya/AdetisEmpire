document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      menuButton.textContent = isOpen ? "×" : "☰";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        menuButton.textContent = "☰";
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const enquiryForm = document.querySelector("[data-enquiry-form]");
  const confirmation = document.querySelector("[data-confirmation]");
  const newEnquiryButton = document.querySelector("[data-new-enquiry]");

  if (enquiryForm && confirmation) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(enquiryForm);
      const name = form.get("name") || "a guest";
      const body = [
        "Hello ENIPHLODD VENTURES,",
        "",
        form.get("message") || "",
        "",
        `Check-in: ${form.get("checkIn") || ""}`,
        `Check-out: ${form.get("checkOut") || ""}`,
        `Stay type: ${form.get("stayType") || ""}`,
        `Guests: ${form.get("guests") || ""}`,
        `Contact: ${form.get("contact") || ""}`,
      ].join("\n");
      const subject = encodeURIComponent(`Stay enquiry from ${name}`);
      window.location.href = `mailto:eniphlodventures@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      enquiryForm.hidden = true;
      confirmation.hidden = false;
    });
  }

  if (newEnquiryButton && enquiryForm && confirmation) {
    newEnquiryButton.addEventListener("click", () => {
      confirmation.hidden = true;
      enquiryForm.hidden = false;
      enquiryForm.reset();
    });
  }
});
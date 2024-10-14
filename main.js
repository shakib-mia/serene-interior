import "./animations";
// import "./accordion";

import Lenis from "lenis";
// Initialize Lenis
const lenis = new Lenis({
  smooth: true, // Enable smooth scrolling
  duration: 1.5, // The duration of the scroll animation (default: 1)
  // easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // Smoother easing function
  orientation: "vertical", // Set scrolling orientation ('vertical' or 'horizontal')
  gestureOrientation: "vertical", // Define gesture scroll direction
  wheelMultiplier: 2, // Sensitivity of the scroll for mouse wheel or touchpad (default: 1)
  touchMultiplier: 2, // Sensitivity of the scroll for touch devices (default: 2)
  smoothTouch: true, // Enable smooth scrolling on touch devices
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {
  // console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navbar scroll direction tracking logic
const navbar = document.getElementById("navbar");
navbar.style.position = "fixed";
navbar.style.top = 0;

function createScrollDirectionTracker() {
  let scrollDirection = "up";
  let lastScrollY = 0;

  function handleScroll() {
    const currentScrollY = lenis.scroll || window.pageYOffset; // Using Lenis scroll

    if (currentScrollY > lastScrollY) {
      scrollDirection = "down";
    } else {
      scrollDirection = "up";
    }

    lastScrollY = currentScrollY;
    // console.log(scrollDirection);
    // Hide navbar on scroll down
    if (scrollDirection === "down") {
      navbar.style.top = "-10rem";
      navbar.style.transition = "all 0.5s ease";
    } else {
      if (currentScrollY > 0) {
        navbar.style.top = "0";
      } else {
        navbar.style.top = `${0}px`;
        navbar.style.transition = "all 0.5s ease";
      }
    }

    // Box shadow and fixed position on scroll
    if (currentScrollY > 0) {
      navbar.style.boxShadow = "0 0 20px 0 #2B245D21";
      navbar.style.position = "fixed";
    } else {
      navbar.style.boxShadow = "none";
      navbar.style.top = `${document.getElementById("social").clientHeight}px`;
    }
  }

  // Listen to scroll events
  window.addEventListener("scroll", handleScroll);

  return {
    getScrollDirection: () => scrollDirection,
    cleanup: () => {
      window.removeEventListener("scroll", handleScroll);
    },
  };
}

createScrollDirectionTracker();

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    // Toggle between max-h-0 and max-h-[500px] for smooth height transition
    if (menu.style.maxHeight === "0px" || menu.style.maxHeight === "") {
      menu.style.maxHeight = "500px"; // Set a large enough height for smooth transition
    } else {
      menu.style.maxHeight = "0px"; // Collapse the menu
    }
  });
});

//

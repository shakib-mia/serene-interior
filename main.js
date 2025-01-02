// import Swiper JS
import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "./animations";
// import "./accordion";

import Lenis from "lenis";

// Initialize Lenis
const option = {
  smooth: true, // Enable smooth scrolling
  duration: 1.5, // The duration of the scroll animation (default: 1)
  // easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // Smoother easing function
  orientation: "vertical", // Set scrolling orientation ('vertical' or 'horizontal')
  gestureOrientation: "vertical", // Define gesture scroll direction
  wheelMultiplier: 2, // Sensitivity of the scroll for mouse wheel or touchpad (default: 1)
  touchMultiplier: 2, // Sensitivity of the scroll for touch devices (default: 2)
  smoothTouch: true, // Enable smooth scrolling on touch devices
};
const lenis = new Lenis();

// lenis.on("scroll", ScrollTrigger.update);

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

var swiper = new Swiper(".swiper", {
  loop: true,
  modules: [Navigation, Autoplay],
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: "#swiper-next",
    prevEl: "#swiper-prev",
  },
});

document.getElementById("year").innerText = new Date().getFullYear();

// Function to preload the video
async function preloadVideo(url, videoElement) {
  console.log("Loading video from:", url);

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob(); // Get the video as a blob
    })
    .then((videoBlob) => {
      const videoBlobUrl = URL.createObjectURL(videoBlob); // Create a blob URL
      videoElement.src = videoBlobUrl; // Set the video source

      // Return a promise that resolves when metadata is loaded
      return new Promise((resolve) => {
        videoElement.addEventListener("loadedmetadata", () => {
          if (!isNaN(videoElement.duration)) {
            console.log("Video is fully loaded.");
            document.getElementById("loading").style.display = "none"; // Hide loading screen

            console.log("Video duration:", videoElement.duration);
            resolve();
          } else {
            throw new Error("Video metadata could not be loaded.");
          }
        });
      });
    });
}

// Main logic
document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("scroll-video");

  console.log(videoElement.src);

  preloadVideo(videoElement.src, videoElement)
    .then((e) => {
      // document.getElementById("content").style.display = "block"; // Show main content
    })
    .catch((err) => {
      console.error("Error loading video:", err);
      document.getElementById("loading").innerText = "Failed to load video.";
    });
});

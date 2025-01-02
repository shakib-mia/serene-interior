import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const marquee = document.getElementById("marquee");
// document.addEventListener("DOMContentLoaded", () => {
const startValue = window.innerWidth < 768 ? "top 90%" : "top 95%";
const endValue = window.innerWidth < 768 ? "top 20%" : "top 2%";
// console.log(marquee.clientWidth);

gsap.fromTo(
  marquee,
  { right: "0px" },
  {
    duration: 3,
    right: () =>
      `${
        window.innerWidth < 768
          ? marquee.clientWidth - window.innerWidth
          : marquee.clientWidth
      }px`,
    scrollTrigger: {
      scrub: true,
      trigger: marquee,
      start: startValue,
      end: endValue,
      toggleActions: "play none none reverse",
      // markers: true,
    },
    ease: "power2.inOut",
  }
);

// });
// Select all sections that contain heading letters
const sections = document.querySelectorAll("header, section"); // Adjust this selector if necessary

sections.forEach((section) => {
  // Select all heading-letter elements within this section
  const letters = section.querySelectorAll(".heading-letter");

  // Set up the IntersectionObserver for this section
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If the element is in view, animate it using GSAP
          gsap.fromTo(
            entry.target,
            {
              top: "100px",
              opacity: 0,
              rotateX: "45deg",
            },
            {
              top: "0px",
              opacity: 1,
              rotateX: "0deg",
              delay: [...letters].indexOf(entry.target) * 0.01, // Animate sequentially within this section
              duration: 1,
              onComplete: () => observer.unobserve(entry.target), // Stop observing after the animation
            }
          );
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  // Observe each heading-letter within this section
  letters.forEach((letter) => observer.observe(letter));
});

document.querySelectorAll(".fade-right").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      right: "-100px",
    },
    {
      ease: "power3.out",
      duration: 1,
      opacity: 1,
      right: 0,
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none none", // Play animation once on scroll
        start: "top 80%", // Start the animation when the element reaches 80% of the viewport
      },
    }
  );
});

document.querySelectorAll(".fade-left").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      left: "-100px",
    },
    {
      ease: "power3.out",
      duration: 1,
      opacity: 1,
      left: 0,
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none none", // Play animation once on scroll
        start: "top 80%", // Start the animation when the element reaches 80% of the viewport
      },
    }
  );
});

document.querySelectorAll(".fade-up").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      top: "100px",
    },
    {
      ease: "power3.out",
      duration: 1,
      opacity: 1,
      top: 0,
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none none", // Play animation once on scroll
        start: "top 80%", // Start the animation when the element reaches 80% of the viewport
      },
    }
  );
});

document.querySelectorAll(".fade-down").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      position: "relative",
      bottom: "100px",
    },
    {
      ease: "power3.out",
      duration: 1,
      position: "relative",
      opacity: 1,
      bottom: 0,
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none none", // Play animation once on scroll
        start: "top 80%", // Start the animation when the element reaches 80% of the viewport
      },
    }
  );
});

gsap.fromTo(
  document.querySelectorAll(".reveal-up"),
  {
    top: "100%",
  },
  {
    top: 0,
    duration: 1,
    scrollTrigger: {
      trigger: document.querySelectorAll(".reveal-up"),
      start: "bottom bottom",
      // scrub: true,
    },
  }
);

gsap.fromTo(
  document.querySelectorAll(".zoom-in"),
  {
    scale: 0,
  },
  {
    scale: 1,
    duration: 1,
    scrollTrigger: {
      trigger: document.querySelectorAll(".zoom-in"),
      start: "bottom bottom",
      // scrub: true,
    },
  }
);

gsap.fromTo(
  document.querySelectorAll(".zoom-out"),
  {
    scale: 1,
  },
  {
    scale: 0,
    duration: 1,
    scrollTrigger: {
      trigger: document.querySelectorAll(".zoom-in"),
      start: "bottom bottom",
      // scrub: true,
    },
  }
);

gsap.fromTo(
  document.querySelector("#video-text"),
  {
    top: "50%",
    opacity: 0,
  },
  {
    top: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: document.querySelector("#video-text"),
      start: "top 80%",
      // markers: true,
      end: "top 10%",
      scrub: true,
    },
  }
);

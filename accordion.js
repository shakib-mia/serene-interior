import gsap from "gsap";

document.querySelectorAll('input[name="accordion"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    // Show the content associated with the checked radio
    document.querySelectorAll(".accordion-item").forEach((item) => {
      const content = item.querySelector(".accordion-content");
      const input = item.querySelector("input");

      if (input.checked) {
        // Expand the content with smooth animation
        const fullHeight = content.scrollHeight + "px"; // Get the full height
        // document.querySelector

        gsap.fromTo(
          content,
          {
            height: 0, // Start from zero height
            padding: "0 16px", // Start with no padding
            opacity: 0, // Optional: Fade in
          },
          {
            height: fullHeight, // Animate to the full height (calculated dynamically)
            padding: "0 16px 16px 16px", // Add padding during the animation
            duration: 0.25, // Duration of the animation
            opacity: 1, // Optional: Fade in effect
            // ease: "power2.out", // Easing function for smoothness
            onComplete() {
              // Set height to auto after the animation for responsiveness
              content.style.height = "auto";
            },
          }
        );
      } else {
        // Collapse the content with smooth animation
        gsap.fromTo(
          content,
          {
            height: content.scrollHeight + "px", // Start from the current height
            padding: "16px 16px", // Start with padding
            opacity: 1, // Optional: Fade out
          },
          {
            height: 0, // Collapse to zero height
            padding: "0 16px", // Reduce padding
            duration: 0.25, // Duration of the animation
            opacity: 0, // Optional: Fade out effect
            // ease: "power2.in", // Easing function for smoothness
          }
        );
      }
    });
  });
});

// console.log();

// document
//   .querySelectorAll(".accordion-item")
//   .forEach((item) => item.classList.add(""));

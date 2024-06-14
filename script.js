document.addEventListener("DOMContentLoaded", function() {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const carousel = document.querySelector(".carousel");
  const cards = document.querySelectorAll(".cardi");
  const radioButtonsContainer = document.querySelector(".radio-buttons-container");

  let currentIndex = 0;
  const visibleCards = 4; // Number of visible cards
  const shiftAmount = 4; // Number of cards to shift
  const shiftInterval = 3000; // Shift interval in milliseconds
  let autoShiftInterval;

  function updateCarousel() {
      const cardWidth = cards[0].offsetWidth;
      const margin = parseInt(window.getComputedStyle(cards[0]).marginRight);
      const totalCardWidth = cardWidth + margin * 2;
      carousel.style.transform = `translateX(${-currentIndex * totalCardWidth}px)`;
      updateRadioButtons();
  }

  function autoShiftCarousel() {
      if (currentIndex < cards.length - visibleCards) {
          currentIndex += shiftAmount;
          if (currentIndex > cards.length - visibleCards) {
              currentIndex = 0; // Reset to the start when reaching the end
          }
      } else {
          currentIndex = 0; // Reset to the start when reaching the end
      }
      updateCarousel();
  }

  function resetAutoShiftInterval() {
      clearInterval(autoShiftInterval);
      autoShiftInterval = setInterval(autoShiftCarousel, shiftInterval);
  }

  function createRadioButtons() {
    const numShifts = Math.ceil(cards.length / shiftAmount);
    for (let i = 0; i < numShifts; i++) {
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "carousel-shift";
        radioButton.classList.add("carousel-radio-button");
        radioButton.id = `carousel-radio-${i}`;
        radioButton.dataset.index = i * shiftAmount;
        radioButton.style.display = "none"; // Hide the radio button
        const label = document.createElement("label");
        label.htmlFor = `carousel-radio-${i}`;
        label.style.display = 'inline-block';
        label.style.width = '20px';
        label.style.height = '20px';
        label.style.borderRadius = '50%';
        label.style.background = '#00ff22';
        label.style.border = '2px solid #00ff22';
        label.style.marginRight = '10px'; // Add a 5px gap between labels
        label.addEventListener("click", () => {
            currentIndex = i * shiftAmount;
            updateCarousel();
            resetAutoShiftInterval();
        });
        radioButtonsContainer.appendChild(radioButton);
        radioButtonsContainer.appendChild(label);
    }
}

  function updateRadioButtons() {
      const radioButtons = document.querySelectorAll(".carousel-radio-button");
      radioButtons.forEach((button, index) => {
          button.checked = index === Math.floor(currentIndex / shiftAmount);
          const label = button.nextElementSibling;
          if (button.checked) {
              label.style.background = '#00ff22';
              label.style.borderColor = '#00ff22';
          } else {
            label.style.background = 'white';
              label.style.borderColor = '#00ff22';
          }
      });
  }

  nextBtn.addEventListener("click", () => {
      if (currentIndex < cards.length - visibleCards) {
          currentIndex += shiftAmount;
          if (currentIndex > cards.length - visibleCards) {
              currentIndex = 0; // Wrap to the start if at the end
          }
      } else {
          currentIndex = 0; // Wrap to the start if at the end
      }
      updateCarousel();
      resetAutoShiftInterval();
  });

  prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
          currentIndex -= shiftAmount;
          if (currentIndex < 0) {
              currentIndex = cards.length - visibleCards; // Wrap to the end if at the start
          }
      } else {
          currentIndex = cards.length - visibleCards; // Wrap to the end if at the start
      }
      updateCarousel();
      resetAutoShiftInterval();
  });

  window.addEventListener("resize", updateCarousel);

  // Initialize auto-shifting and radio buttons
  autoShiftInterval = setInterval(autoShiftCarousel, shiftInterval);
  createRadioButtons();
  updateCarousel(); // Initial call to set the correct transform
});



document.addEventListener("DOMContentLoaded", function() {
  const testimonials = [
    {
      quote: "internee.pk is the best, most comprehensive 21st-century innovation for those students who are looking for internships and upgrading their skillsets. Their projects are tough but market-valued.",
      name: "Rabia Javed",
      location: "Karachi, Pakistan"
  },
  {
      quote: "internee.pk is all about helping us grow our careers. May ALLAH give them more achievements and success on their journey.",
      name: "Nagina Asif",
      location: "Karachi, Pakistan"
  },
  {
      quote: "Thanks to internee.pk, I grew up my skills here and now I am working as a Flutter Developer in a US company.",
      name: "Razaullah Sami",
      location: "KPK, Pakistan"
  },
  {
      quote: "I find internee.pk to be an outstanding tool for getting hands-on experience. Sometimes you have to spend a little to make a lot to develop projects.",
      name: "Kashan Soomro",
      location: "Multan, Pakistan"
  },
  {
      quote: "Amazing! internee.pk is a gamechanger! The way their team is working is so crazy. Thank you for giving me this opportunity.",
      name: "Naila Rozi",
      location: "Lahore, Karachi"
  },
  {
      quote: "After getting this internship, my skill got enhanced more than my expectation. JazakALLAH for this.",
      name: "Mohammad Rafiq",
      location: "Sindh Division, Pakistan"
  },
  {
      quote: "I would like to say, I think you have a great product and I’m excited that I found it!",
      name: "Ayesha Laghari",
      location: "Islamabad, Karachi"
  },
  {
      quote: "Been using internee.pk for an internship is an amazing experience. I do some other virtual internships as well but their task portal and presentation are amazing.",
      name: "Sidra",
      location: "Bahawalnagar, Pakistan"
  }
      // Add more testimonials here
  ];

  const carousel1 = document.querySelector(".carousel1");
  const prevBtn1 = document.querySelector(".prev-btn1");
  const nextBtn1 = document.querySelector(".next-btn1");

  let currentIndex = 0;

  function updateCarousel() {
      carousel1.innerHTML = ""; // Clear existing content

      const startIndex = currentIndex;
      const endIndex = Math.min(startIndex + 4, testimonials.length);

      for (let i = startIndex; i < endIndex; i++) {
          const testimonial = testimonials[i];
          const testimonialElement = document.createElement("div");
          testimonialElement.classList.add("testimonial");
          testimonialElement.innerHTML = `
              <blockquote>
                  <p>${testimonial.quote}</p>
              </blockquote>
              <div class="source">
                  <span class="name">${testimonial.name}</span>
                  <span class="location">${testimonial.location}</span>
              </div>
          `;
          carousel1.appendChild(testimonialElement);
      }
  }

  function showNext() {
      if (currentIndex < testimonials.length - 4) {
          currentIndex++;
          updateCarousel();
      }
  }

  function showPrev() {
      if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
      }
  }

  prevBtn1.addEventListener("click", showPrev);
  nextBtn1.addEventListener("click", showNext);

  updateCarousel();
});

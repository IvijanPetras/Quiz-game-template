window.addEventListener("DOMContentLoaded", () => {
  // fetching buttons, content and declaring variables
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slideBtn = document.querySelectorAll(".slide-btn");
  const questionContainer = document.querySelector(".question-container");
  const slideContainer = document.querySelector(".slide-container");
  const question = document.querySelector(".question");
  const answers = document.querySelector(".answers");
  const showResults = document.createElement("button");
  let activeSlide = 0;
  let answerdSlidesNum = 0;
  showResults.disabled = true;
  //------------------------------ DB start
  const slideDB = [
    [
      "First question",
      [
        {
          choice: 1,
          correct: false,
        },
        {
          choice: 2,
          correct: false,
        },
      ],
      {
        id: 1,
        answers: [],
      },
    ],
    [
      "Second question",
      [
        {
          choice: 1,
          correct: false,
        },
        {
          choice: 2,
          correct: false,
        },
      ],
      {
        id: 2,
        answers: [],
      },
    ],
    [
      "Third question",
      [
        {
          choice: 1,
          correct: false,
        },
        {
          choice: 2,
          correct: false,
        },
      ],
      {
        id: 3,
        answers: [],
      },
    ],
    [
      "Fourth question",
      [
        {
          choice: 1,
          correct: false,
        },
        {
          choice: 2,
          correct: false,
        },
      ],
      {
        id: 4,
        answers: [],
      },
    ],
  ];
  //------------------------------ DB end

  // first initalization and display of slides 
  initalizeSlidesDB(slideDB);
  displaySlides(slideDB);

  // creates random number of possible choices 
  function initalizeSlidesDB(arg) {
    for (let i = 0; i < arg.length; i++) {
      const slide = arg[i][1];
      createChoices(slide, randomNum(1, 6));
    }
  }
  
  function createChoices(arr, n) {
    for (let i = 2; i < n + 2; ++i) {
      arr[i] = {
        choice: i + 1,
        correct: false,
      };
    }
  }

  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //handles maximum number of possible choices on each slide
  function maxAnswers(slideId) {
    const messageAlert = document.createElement("div");
    const maxNum = slideId + 2;
    messageAlert.classList.add("alert-message");
    messageAlert.innerText = `Max number of answers is ${maxNum}`;
    slideContainer.append(messageAlert);
    setTimeout(() => {
      messageAlert.remove();
    }, 3000);
  }

  // adds differente background color to answerd if at least 1 answer given
  function answerdSlides(){
    if(slideDB[activeSlide][2].answers.length){
      slideBtn[activeSlide].classList.add('answerd-slide');
    }
  };

  function displaySlides(slideDB) {
    const currentSlideQuestion = slideDB[activeSlide][0];
    const currentSlideChoices = slideDB[activeSlide][1];
    const slideId = slideDB[activeSlide][2].id;
    const answerArr = slideDB[activeSlide][2].answers;
    question.innerText = currentSlideQuestion;
    currentSlideChoices.forEach((choice) => {
      const choiceDiv = document.createElement("div");
      choiceDiv.classList.add("option");
      choiceDiv.innerText = choice.choice;
      answers.append(choiceDiv);
      choiceDiv.addEventListener(
        "click",
        () => {
          if (answerArr.length > 1 + slideId) return maxAnswers(slideId);
          answerArr.push(choiceDiv.innerText)
          answerdSlides();
          if(answerArr.length <= 1) answerdSlidesNum++;
          if(answerdSlidesNum === 4) showResults.disabled = false;
        },
        { once: true }
        );
      });
  }

  function removeSlide() {
    question.innerText = "";
    answers.innerHTML = "";
  }
  
  function animationHandler(){
    slideContainer.classList.add('animate');
    setTimeout(() => {
        slideContainer.classList.remove("animate")
    },800);
  };

  function btnDisplayHandler(){
    if (question.previousElementSibling.innerText === "Show Results") {
      question.previousElementSibling.remove();
    }
    if (activeSlide > 0) prevBtn.classList.remove("hidden");
    if (activeSlide === 3) {
      nextBtn.classList.add("hidden");
      showResults.classList.add("show-results");
      showResults.innerText = "Show Results";
      console.log(question.parentNode)
      question.parentNode.insertBefore(showResults, question);
    }
    if (activeSlide === 0) prevBtn.classList.add("hidden");
    if (activeSlide < 3) nextBtn.classList.remove("hidden");
  }


  
  
  // all button listeners
  nextBtn.addEventListener("click", () => {
    animationHandler();
    activeSlide++;
    btnDisplayHandler();
    removeSlide();
    displaySlides(slideDB);
    console.log(activeSlide)
  });
  
  prevBtn.addEventListener("click", () => {
    animationHandler();
    activeSlide--;
    btnDisplayHandler();
    removeSlide();
    displaySlides(slideDB);
    console.log(activeSlide)
  });
  
  slideBtn.forEach(btn => {
    btn.addEventListener('click', (e) =>{
      activeSlide = +e.target.innerText - 1;
      animationHandler();
      btnDisplayHandler();
      removeSlide();
      displaySlides(slideDB);
    });
  });

  showResults.addEventListener('click', () => {
    prevBtn.remove();
    showResults.remove();
    questionContainer.remove();
    answers.remove();
    removeSlide();
    slideDB.forEach(item => {
      const itemQuestion = item[0];
      const itemAnswers = item[2].answers;
      const itemElement = document.createElement('div');
      itemElement.classList.add('question-result');
      itemElement.innerText = `${itemQuestion}: `;
      slideContainer.append(itemElement);
      itemAnswers.forEach(answer => {
        const removedNotch = ` ${answer}, `;
        itemElement.append(removedNotch);
      })
    })
  });

});

console.log("Content script has started.");
function runScript() {
    // Target the input element directly, then retrieve the preceding math question
    console.log("Attempting to find the CAPTCHA question...");
    const inputElement = document.querySelector('input[name="valuepkg3"]');
    if (inputElement) {
      let questionText = "";
      // The question is likely in a text node preceding the input field
      let sibling = inputElement.previousSibling;
      while (sibling) {
        if (sibling.nodeType === Node.TEXT_NODE) {
          questionText += sibling.textContent.trim();
        }
        sibling = sibling.previousSibling;
      }

      const answer = solveMathQuestion(questionText);
      if (answer !== undefined) {
        inputElement.value = answer;
      }
    }
  };

  if (document.readyState === "loading") {
    // The document is still loading, wait for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', runScript);
} else {
    // The DOMContentLoaded event has already fired, run the script immediately
    runScript();
}
  function solveMathQuestion(questionText) {
    let answer = 0;
    
    // Detect and extract numbers for "enter second value" and "enter first value" questions
    if (questionText.includes("Please enter second value")) {
        const numbers = questionText.match(/(\d+)\s* , \s*(\d+)/);
        if (numbers && numbers.length === 3) {
            // If asking for the "second value", use the second number
            answer = parseInt(numbers[2], 10);
        }
    } else if (questionText.includes("Please enter first value")) {
        const numbers = questionText.match(/(\d+)\s* , \s*(\d+)/);
        if (numbers && numbers.length === 3) {
            // If asking for the "first value", use the first number
            answer = parseInt(numbers[1], 10);
        }
    }
    // Addition question
    else if (questionText.includes("Please add")) {
      const numbers = questionText.match(/(\d+) \+ (\d+)/);
      if (numbers && numbers.length === 3) {
        answer = parseInt(numbers[1], 10) + parseInt(numbers[2], 10);
      }
    } 
    // Subtraction question
    else if (questionText.includes("Please subtract")) {
      const numbers = questionText.match(/(\d+) - (\d+)/);
      if (numbers && numbers.length === 3) {
        answer = parseInt(numbers[1], 10) - parseInt(numbers[2], 10);
      }
    }
  
    return answer;
  }
  
  

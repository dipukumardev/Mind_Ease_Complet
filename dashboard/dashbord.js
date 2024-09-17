// const { ConnectionStates } = require("mongoose");

document.addEventListener('DOMContentLoaded', function () {
    const startQuizBtn = document.getElementById('mh-start-quiz');

    let quizResponses = []; // Initialize an array to store quiz responses

    const questions = [
        {
            question: "How often do you feel overwhelmed with your workload?",
            options: ["😊 Never", "😔 Sometimes", "😥 Often", "😞 Always"]
        },
        {
            question: "Do you feel anxious or stressed about your upcoming exams?",
            options: ["😞 Strongly disagree", "😔 Disagree", "😐 Neutral", "😊 Agree", "😞 Strongly agree"]
        },
        {
            question: "Which of the following factors contribute to your stress levels? (Select all that apply)",
            options: ["Family", "Relationships", "Academics", "Finances", "Work"]
        },
        {
            question: "How many hours of sleep do you typically get per night?",
            options: ["1 hour or less", "1-3 hours", "3-5 hours", "5 or more hours"]
        },
        {
            question: "Do you find yourself irritable or short-tempered frequently?",
            options: ["😊 Never", "😢 Rarely", "😔 Sometimes", "😥 Often", "😞 Always"]
        },
        {
            question: "Which of the following activities do you utilize as stress relief? (Select all that apply)",
            options: ["Exercise", "Meditation", "Socializing", "Hobbies", "Therapy"]
        },
        {
            question: "What specific issues or situations in your life cause you the most stress?",
            options: ["Exercise", "Meditation", "Socializing", "Hobbies", "Therapy"]
        },
        {
            question: "Do you often feel overwhelmed or like you have too much on your plate?",
            options: ["😊 Never", "😢 Rarely", "😔 Sometimes", "😥 Often", "😞 Always"]
        },
        {
            question: "Do you feel like your stress levels are negatively impacting your physical health?",
            options: ["😞 Strongly disagree", "😔 Disagree", "😐 Neutral", "😊 Agree", "😞 Strongly agree"]
        },
        {
            question: "Which of the following do you use as a support system for managing stress? (Select all that apply)",
            options: ["Friends", "Family", "Therapist", "Self-help books", "Online resources"]
        },
        {
            question: "Do you feel like you have a good work-life balance?",
            options: ["😞 Strongly disagree", "😔 Disagree", "😐 Neutral", "😊 Agree", "😞 Strongly agree"]
        }
    ];
   


    userInfoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Scroll to the next section smoothly
        document.querySelector('.main01').style.display = 'block';
        document.querySelector('.main01').scrollIntoView({
            behavior: 'smooth'
        });

        // Send the form data along with quiz responses to the server
        // Inside userInfoForm.addEventListener('submit', function (event) {...})
        // Update the formData object to include quizResponses
        const formData = {
            name: document.getElementById('mh-name').value,
            age: document.getElementById('mh-age').value,
            gender: document.getElementById('mh-gender').value,
            occupation: document.getElementById('mh-occupation').value,
            demographicInformation: document.getElementById('mh-demographic-information').value,
            education: document.getElementById('mh-education').value,
            relationshipStatus: document.getElementById('mh-relationship-status').value,
            medicalHistory: document.getElementById('mh-medical-history').value,
            hobbiesAndInterests: document.getElementById('mh-hobbies-and-interests').value,
            quizResponses: quizResponses // Include quiz responses
        };

        // Inside fetch('/save-form-data', {...})
        // Send both form data and quiz responses to the server
        body: JSON.stringify({ formData, quizResponses })

        // Send the form data to the server
        fetch('/save-form-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formData, quizResponses })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Form data saved successfully:', data);
                // After form data is saved, trigger report generation
                // generateReport();
            })
            .catch(error => {
                console.error('Error saving form data:', error);
                // Handle error if needed
            });
        

    });

    startQuizBtn.addEventListener('click', function () {
        // Hide the user info form
        userInfoForm.style.display = 'none';

        // Display quiz questions
        displayQuestion();
    });

    // Function to display quiz questions
    function displayQuestion() {
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const currentQuestion = questions[quizResponses.length];

        if (!currentQuestion) {
            // Quiz completed, show completion message
            alert('Quiz completed!');
            document.querySelector('.main01').style.display = 'none';
            console.log(questions);
            return;
        }

        questionElement.innerText = currentQuestion.question;
        optionsElement.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => selectOption(index);
            optionsElement.appendChild(button);
        });

        updateProgress();
    }

    // Function to handle selecting an option
    function selectOption(optionIndex) {
        const currentQuestionIndex = quizResponses.length; // Get the index of the current question
        const currentQuestion = questions[currentQuestionIndex]; // Get the current question object

        const response = {
            question: currentQuestion.question, // Capture the question
            answer: currentQuestion.options[optionIndex] // Capture the selected answer
        };

        quizResponses.push(response); // Add the quiz response to the array

        // Display next question
        displayQuestion();
    }

    // Function to update quiz progress
    function updateProgress() {
        const percent = (quizResponses.length / questions.length) * 100;
        document.getElementById('progress').value = percent;
    }

});

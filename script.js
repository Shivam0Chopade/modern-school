let beepSound = new Audio("beep-beep-beep-beep-80262.mp3");
let instructionText = document.getElementById("instruction");
let activateBtn = document.getElementById("activateBtn");
let resetBtn = document.getElementById("resetBtn");

let beepInterval;

// Function to play beep sound continuously
function playBeepSound() {
    beepInterval = setInterval(() => {
        beepSound.currentTime = 0;
        beepSound.play();
    }, 2000);
}

// Function to stop beep sound
function stopBeepSound() {
    clearInterval(beepInterval);
    beepSound.pause();
    beepSound.currentTime = 0;
}

// Function to start experiment
function startExperiment() {
    instructionText.innerHTML = "Verifying your Eyes.....";

    // Hide activate button and show reset button
    activateBtn.style.display = "none";
    resetBtn.style.display = "inline-block";

    // Wait for 10 seconds, then start the beep sound
    setTimeout(() => {
        instructionText.innerHTML = "Beep, Beep, Beep"; // Show beep message
        playBeepSound(); // Start beep sound continuously

        // After 3 seconds, show "Changing lane..."
        setTimeout(() => {
            instructionText.innerHTML = "Changing lane...";

            // After another 3 seconds, show "Slowing down your car..."
            setTimeout(() => {
                instructionText.innerHTML = "Slowing down your car...";

                // After another 3 seconds, show "Your car has stopped."
                setTimeout(() => {
                    instructionText.innerHTML = "Your car has stopped.";
                    sendEmergencyAlert(); // 🚨 Trigger emergency alert on second page

                }, 3000);

            }, 3000);

        }, 3000);

    }, 10000); // 10-second delay
}

// Function to reset experiment
function resetExperiment() {
    instructionText.innerHTML = "Your car has stopped. Stay alert and drive safely! 😊";
    
    // Stop beep sound
    stopBeepSound();

    // Show activate button and hide reset button
    activateBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
}

// 🚨 Function to send emergency alert with user details
function sendEmergencyAlert() {
    let name = sessionStorage.getItem("userName") || "Unknown User";
    let plate = sessionStorage.getItem("carPlate") || "Unknown Plate";
    let atp = sessionStorage.getItem("atpNumber") || "Unknown ATP";

    setTimeout(() => {
        // Store alert & details in sessionStorage
        sessionStorage.setItem("alertTriggered", "true");
        sessionStorage.setItem("alertUserName", name);
        sessionStorage.setItem("alertCarPlate", plate);
        sessionStorage.setItem("alertATP", atp);

        console.log("🚨 Emergency Alert Sent!");
    }, 20000); // 20 seconds delay
}

// 🚨 Code for Mobile Chat Page
window.onload = function () {
    let chatBox = document.getElementById("chatMessages");

    // Retrieve previous chat history
    if (sessionStorage.getItem("chatHistory")) {
        chatBox.innerHTML = sessionStorage.getItem("chatHistory");
    }

    // DEBUGGING: Log stored values
    console.log("Checking for Emergency Alert...");
    console.log("Alert Triggered:", sessionStorage.getItem("alertTriggered"));
    console.log("User Name:", sessionStorage.getItem("alertUserName"));
    console.log("Car Plate:", sessionStorage.getItem("alertCarPlate"));
    console.log("ATP Number:", sessionStorage.getItem("alertATP"));

    // Check if an alert was sent from the laptop page
    if (sessionStorage.getItem("alertTriggered") === "true") {
        let name = sessionStorage.getItem("alertUserName") || "Unknown User";
        let plate = sessionStorage.getItem("alertCarPlate") || "Unknown Plate";
        let atp = sessionStorage.getItem("alertATP") || "Unknown ATP";

        let message = `<b>🚨 Emergency Alert!</b><br>Owner: ${name}<br>Car: ${plate}<br>ATP: ${atp}`;

        // Add message to chat
        chatBox.innerHTML += `<p>${message}</p>`;
        sessionStorage.setItem("chatHistory", chatBox.innerHTML);

        // Remove alert so it doesn't keep repeating
        sessionStorage.removeItem("alertTriggered");
    }
};


// Select the back button
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        alert("No previous page in history.");
    }
});
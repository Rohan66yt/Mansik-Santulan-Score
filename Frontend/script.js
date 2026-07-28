const form = document.getElementById("predictForm");

const modal = document.getElementById("resultModal");
const modalResult = document.getElementById("modalResult");
const closeModal = document.getElementById("closeModal");


// --------------------
// Close Modal
// --------------------

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


// Close when clicking outside the modal box

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});


// --------------------
// Form Submission
// --------------------

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Collect all form data

    const data = {

        age: Number(age.value),

        gender: gender.value,

        country: country.value,

        academic_level:
            academic_level.value,

        most_used_platform:
            most_used_platform.value,

        purpose_of_use:
            purpose_of_use.value,

        avg_daily_usage_hours:
            Number(avg_daily_usage_hours.value),

        daily_unlocks:
            Number(daily_unlocks.value),

        study_hours:
            Number(study_hours.value),

        physical_activity_hours:
            Number(physical_activity_hours.value),

        sleep_hours_per_night:
            Number(sleep_hours_per_night.value),

        stress_level:
            stress_level.value

    };

    try {

        // API Call

        const response = await fetch(

            "http://127.0.0.1:8000/predict",

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            }

        );


        // Check API Response

        if (!response.ok) {

            throw new Error("Failed to fetch prediction.");

        }

        const result = await response.json();


        // Get Mental Health Score

        const score = result.predicted_mental_health_score;


        // --------------------
        // Dynamic Recommendations
        // --------------------

        let message = "";
        let suggestions = [];

        // Score Based Message

        if (score >= 8) {

            message =
                "Excellent mental wellness! Keep up your healthy habits.";

        }

        else if (score >= 6) {

            message =
                "Good mental wellness. You're maintaining a healthy lifestyle.";

        }

        else if (score >= 4) {

            message =
                "Your mental wellness is average. Small improvements can make a big difference.";

        }

        else {

            message =
                "Your mental wellness score is low. Consider making positive lifestyle changes.";

        }


        // Personalized Suggestions

        if (data.sleep_hours_per_night < 7) {
            suggestions.push("Improve your sleep schedule (7-9 hours recommended).");
        }

        if (data.physical_activity_hours < 1) {
            suggestions.push("Increase your daily physical activity or exercise.");
        }

        if (
            data.stress_level === "High" ||
            data.stress_level === "Very High"
        ) {
            suggestions.push("Practice stress management techniques such as meditation or mindfulness.");
        }

        if (data.avg_daily_usage_hours > 6) {
            suggestions.push("Reduce excessive social media or screen time.");
        }

        if (data.study_hours < 2) {
            suggestions.push("Maintain a healthy balance between study and leisure time.");
        }

        if (data.daily_unlocks > 80) {
            suggestions.push("Try limiting unnecessary phone usage throughout the day.");
        }


        // If everything looks good

        if (suggestions.length === 0) {

            suggestions.push(
                "Keep maintaining your current lifestyle and wellness habits."
            );

        }


        // Convert Suggestions into HTML

        let recommendationHTML = "";

        suggestions.forEach((item) => {

            recommendationHTML += `
                <li>${item}</li>
            `;

        });


        // --------------------
        // Update Modal Content
        // --------------------

        modalResult.innerHTML = `

            <div class="score">
                ${score}
            </div>

            <div class="message">
                ${message}
            </div>

            <br>

            <h3>Recommendations</h3>

            <ul style="
                text-align:left;
                margin-top:15px;
                line-height:1.8;
                padding-left:20px;
                color:#475569;
            ">
                ${recommendationHTML}
            </ul>

        `;


        // --------------------
        // Show Popup Modal
        // --------------------

        modal.classList.add("show");


    } catch (error) {

        console.error(error);


        // Error Message

        modalResult.innerHTML = `

            <div class="message">

                Something went wrong.

                <br><br>

                Please make sure that the FastAPI server
                is running and try again.

            </div>

        `;


        // Show Error Modal

        modal.classList.add("show");

    }

});
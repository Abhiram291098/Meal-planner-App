const form = document.getElementById("meal-form");
const mealPlanner = document.getElementById("meal-planner");

let mealData = JSON.parse(localStorage.getItem("mealData")) || {};

form.addEventListener("submit", function (e) {
    

    const day = document.getElementById("day").value;
    const mealType = document.getElementById("meal-type").value;
    const food = document.getElementById("food").value;
    const calories = document.getElementById("calories").value;

    if (!mealData[day]) {
        mealData[day] = [];
    }

    mealData[day].push({
        mealType,
        food,
        calories: Number(calories)
    });

    localStorage.setItem("mealData", JSON.stringify(mealData));
    displayMeals();
    form.reset();
});

function displayMeals() {
    mealPlanner.innerHTML = '';

    Object.keys(mealData).forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.innerHTML = `<h3>${day}</h3>`;

        mealData[day].forEach((meal, index) => {
            const mealDiv = document.createElement("div");
            mealDiv.innerHTML = `${meal.mealType}: ${meal.food} (${meal.calories} cal)
            <button onclick="deleteMeal('${day}', ${index})">Delete</button>`;
            dayDiv.appendChild(mealDiv);
        });

        mealPlanner.appendChild(dayDiv);
    });
}

function deleteMeal(day, index) {
    mealData[day].splice(index, 1);
    if (mealData[day].length === 0) {
        delete mealData[day];
    }
    localStorage.setItem("mealData", JSON.stringify(mealData));
    displayMeals();
}

displayMeals();

const form = document.getElementById("predictForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const data = {

age:Number(age.value),
gender:gender.value,
country:country.value,

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

try{

const response = await fetch(

"https://mansik-santulan-score-of6t.onrender.com",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

}

);

const result = await response.json();

document.getElementById("result").innerHTML =

"Mental Health Score : " +
result.predicted_mental_health_score;

}

catch(error){

document.getElementById("result").innerHTML =

"Something went wrong.";

}

});
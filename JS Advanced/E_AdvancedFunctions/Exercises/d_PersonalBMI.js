function generateReport(name, age, weight, height) {
    let chart = {};
    let bmi = getBMI();
    let status = getStatus();

    chart.name = name;
    chart.personalInfo = getPersonalInfo();
    chart.BMI = Math.round(bmi);
    chart.status = status;

    if(status === "obese"){
        chart.recommendation = "admission required";
    }
    function getStatus() {
        let status = '';
        if (bmi < 18.5){
            status = "underweight";
        } else if(bmi < 25){
            status = "normal";
        } else if (bmi < 30){
            status = "overweight";
        } else {
            status = "obese"
        }

        return status;
    }

    function getBMI() {
        return weight / Math.pow(height/100,2);
    }

    function getPersonalInfo() {
        return {
            "age": age,
            "weight": weight,
            "height": height
        }
    }

    return chart;
}

generateReport("Honey Boo Boo", 9, 57, 137);

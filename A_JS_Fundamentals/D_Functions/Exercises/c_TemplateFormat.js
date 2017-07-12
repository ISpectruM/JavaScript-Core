function getQuiz(data) {
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';
    result += addContent(data);
    result += '</quiz>';

    function addContent(data, result){
        for (let i = 0; i < data.length; i+=2) {
            let question = data[i];
            let answer = data[i+1];
            result += addData(question,answer,result);
        }
        return result;
    }

    function addData(quest, ans, result) {
        result += `  <question>\n    ${quest}\n  </question>\n  <answer>\n    ${ans}\n  </answer>\n`;
        return result;
    }

    console.log(result);
}

getQuiz(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
);
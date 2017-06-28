function subtract() {
    let firstNum = document.getElementById('firstNumber');
    let secNum = document.getElementById('secondNumber');

    let result = Number(firstNum.value) - Number(secNum.value);

    document.getElementById('result').textContent = result;
}


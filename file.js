
var firstElemString;
var secondElemString;
var timeString;

var firstElemArr;
var secondElemArr
var timeInt;

var Length;
var stageNumber = 8;
var stageArr = [];
var sumArr = [];
var lengthBinNumber = 4;
var bit;
var summ;
var firstSumm;
var summS;

function message(messageString) {
    document.getElementById('Help').innerHTML = "<b>" + messageString + "<b>";
}

function isNumbers(str) {
    return ((/(^[\d\s]+$)/.test(str)));
}

function addZero(binString) {
    var kol = lengthBinNumber - binString.length;
    for (var i = 0; i < kol; i++)
        binString = "0" + binString;
    return binString;
}

function addBack(binString, needNumber) {
    for (var i = 0; i < needNumber; i++)
        binString = binString + "0";
    return binString;
}

function addTop(binString, needNumber) {
    var kol = needNumber - binString.length;
    for (var i = 0; i < kol; i++)
        binString = "0" + binString;
    return binString;
}

function countBit(first, counter) {
	bit = addZero(secondElemArr[counter].toString(2))[addZero(secondElemArr[counter].toString(2)).length - first - 1];
	return bit;
}


function proizvAndSumm(arr, numberC, k){
	    firstSumm = (parseInt(arr[k], 2) + parseInt(addBack(firstElemArr[k].toString(2), numberC), 2) * countBit(numberC,k)).toString(2);
	    return firstSumm;
}

function summa(numberC, k) {
    summ = addTop(addBack(proizvAndSumm(sumArr, numberC, k), lengthBinNumber - numberC), lengthBinNumber*2);
    return summ;
}

function summaSh(arr, numberC, k) {
	summS = addTop(addBack(arr[k],  lengthBinNumber - numberC), lengthBinNumber*2);
	return summS;
}


function readInput() {
    removeTable();
    firstElemString = document.getElementById('FirstElem').value;
    secondElemString = document.getElementById('SecondElem').value;
    timeString = document.getElementById('Time').value;

    firstElemString = firstElemString;
    secondElemString = secondElemString;

    firstElemArr = firstElemString.split(',');
    secondElemArr = secondElemString.split(',');
    timeInt = timeString;

    Length = firstElemArr.length;

    stageArr = [];
    sumArr = [];

    for (var i = 0; i < Length; i++) {
        stageArr.push(1 - i);
        sumArr.push("00000000");
    }


    if (!firstElemString.length || !secondElemString.length || !timeString.length)
        message("Одно или несколько полей пусты, либо сорержат только пробелы");
    else
        if (firstElemArr.length != secondElemArr.length)
            message("Количество первых и вторых элементов пар должно совпадать");
        else {
            var flag = false;

            for (var i = 0; i < firstElemArr.length; i++)
                if (isNumbers(firstElemArr[i]))
                    firstElemArr[i] = +firstElemArr[i];
                else
                    flag = true;

            for (var i = 0; i < secondElemArr.length; i++)
                if (isNumbers(secondElemArr[i]))
                    secondElemArr[i] = +secondElemArr[i];
                else
                    flag = true;

            if (isNumbers(timeInt))
                timeInt = +timeInt;
            else
                flag = true;

            if (flag)
                message("Поля могут содержать только целые положительные числа");
            else {
                var flag = false;

                for (var i = 0; i < firstElemArr.length; i++)
                    if (firstElemArr[i] <= 0 || firstElemArr[i] > 15)
                        flag = true;

                for (var i = 0; i < secondElemArr.length; i++)
                    if (secondElemArr[i] <= 0 || secondElemArr[i] > 15)
                        flag = true;

                if (timeInt <= 0)
                    flag = true;

                if (flag)
                    message("Поля могут содержать только положительные числа от 0 до 15");
                else
                    buildTable();
            }
        }
}

function buildTable() {
    var ot = document.getElementById('Table');
    var or, oc, k;
    for (var i = 0; i <= Length + stageNumber - 1; i++) {
        var time = timeInt * i;
        var needNumber1 = lengthBinNumber - numberC;
        or = ot.insertRow(-1);
        if (i == 0) {
            oc = or.insertCell(-1);
            oc.innerHTML = "Пара/Действие";
            oc = or.insertCell(-1);
            oc.innerHTML = "Произведение A*B<sub>0</sub><br>Этап 1";
            oc = or.insertCell(-1);
            oc.innerHTML = "Сдвиг вправо<br>Этап 2";
            oc = or.insertCell(-1);
            oc.innerHTML = "Произведение A*B<sub>1</sub><br>Этап 3";
            oc = or.insertCell(-1);
            oc.innerHTML = "Сдвиг вправо<br>Этап 4";
            oc = or.insertCell(-1);
            oc.innerHTML = "Произведение A*B<sub>2</sub><br>Этап 5";
            oc = or.insertCell(-1);
            oc.innerHTML = "Сдвиг вправо<br>Этап 6";
            oc = or.insertCell(-1);
            oc.innerHTML = "Произведение A*B<sub>3</sub><br>Этап 7";
            oc = or.insertCell(-1);
            oc.innerHTML = "Сдвиг вправо<br>Этап 8";
        }
        else {
            for (var j = 0; j <= stageNumber; j++) {
                var numberC = Math.floor(j / 2);
                oc = or.insertCell(-1);
                if (j == 0 && i <= Length)
                    oc.innerHTML = "A: " + addZero(firstElemArr[i - 1].toString(2)) + "</br>" +
                                    "B: " + addZero(secondElemArr[i - 1].toString(2)) + "</br>" +
                                    "Сумма:  " + sumArr[i - 1];
                else {
                    for (var k = 0; k < Length; k++)
                        if (stageArr[k] == j)
                            if (j % 2 != 0) {
                     			oc.innerHTML = 	"A: " + addZero(firstElemArr[k].toString(2)) + "</br>" + 
				        							"B<sub>" + numberC + "</sub>:" + countBit(numberC, k) + "</br>" + 
				           							"Сумма:  " + summa(numberC, k) + "</br>" +
				        							"Время: " + time + "</br>";
				        							sumArr[k] = proizvAndSumm(sumArr, numberC, k);
		        			}
                            else {
                              oc.innerHTML = 	"Сумма:  " + summaSh(sumArr, numberC, k) + "</br>" +
                               					 "Время: " + time + "</br>";
                                }
                }
            }
            for (var k = 0; k < Length; k++)
                stageArr[k]++;
        }
    };

    var answer = "Ответ: {";
    for (var i = 0; i < Length; i++)
        answer += parseInt(sumArr[i], 2) + ",";
    answer = answer.replace(/,+$/g, '');
    answer += "};</br>";
    message(answer);
}

function removeTable() {
    var table = document.getElementById('Table');
    table.innerHTML = "";
    message("");
}


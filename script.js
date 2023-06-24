let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

const dropList = document.querySelectorAll(".drop-list select");
getButton = document.querySelector('#convert-btn');
for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_list){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : ""; //SELECTING USD AS DEFAULT FROM OPTION
        }
        else if(i == 1){
            selected = currency_code == "INR" ? "selected" : ""; //SELECTING INR AS DEFAULT TO OPTION
        }
        //CREATING OPTION TAG WITH PASSING CURRENCY CODE AS VALUE AND TEXT
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //INSERTING OPTION TAG INSIDE SELECT TAG
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
        }
    }
}
const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromDropDown.value;
    fromDropDown.value = toDropDown.value;
    toDropDown.value = tempCode;
    loadFlag(fromDropDown);
    loadFlag(toDropDown);
    convertCurrency();
});

let convertCurrency = () => {
    result.style.display = "block";
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if(amount.length != 0) {
        fetch(api)
            .then((resp) => resp.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount / fromExchangeRate * toExchangeRate);
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
            });
    }
    else{
        alert("Please fill in the amount");
    }
};

document
    .querySelector("#convert-btn")
    .addEventListener("click", convertCurrency);

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         //this function runs when json arrives and has been parsed
//         console.log(data);
//     });
// });



const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From JavaScript";

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault(); //prevents default behavior of a form submission refreshing the webpage

    const location = search.value;

    messageOne.textContent = "Loading weather";
    messageTwo.textContent = "";

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //checks to see if an error is present
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }        
        });
    });
});
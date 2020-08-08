// console.log('client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var locationDetails = document.querySelector('#loc')
var locationTemperature = document.querySelector('#temp')
// locationDetails.textContent = 'javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            locationDetails.textContent = data.error
        }else {
            locationDetails.textContent = "Location: " + data.location
            locationTemperature.textContent = "Temperature: " + data.data1.temp
        }
    })
})

})


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })   
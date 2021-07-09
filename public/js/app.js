let form = document.querySelector('form')
let searchElemnt = document.querySelector('input')

let messageOne = document.querySelector('#message-one')
let messageTwo = document.querySelector('#message-two')
let messageThree = document.querySelector('#message-three')

addEventListener('submit' , (e)=>{

    messageOne.textContent = 'Loading ... '
    messageTwo.textContent = '';
    messageThree.textContent = '';

    e.preventDefault()
    const location = searchElemnt.value
    fetch(`/weather?address=${encodeURIComponent(location)}`)
    .then((responce)=>{
    responce.json().then((data)=>{
        if (data.error)
            messageOne.textContent = data.error;
        else {
            messageOne.textContent = 'Location : ' + data.name;
            messageTwo.textContent = 'Description : ' + data.descripe;
            messageThree.textContent = 'Temperature : ' + data.temp;
        }
    })
})
})
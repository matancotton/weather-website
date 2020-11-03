const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit',  (event)=>{
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((res)=>{
    return res.json()
    }).then((resObj)=>{
        messageOne.textContent = ''
        if (resObj.error)
            messageTwo.innerHTML = resObj.error
        else {
            messageOne.innerHTML = resObj.location
            messageTwo.innerText =  resObj.forecast
        }
            
    })

})


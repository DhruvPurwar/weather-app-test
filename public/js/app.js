

console.log('The client side javascript is working');

// fetch('http://puzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//            console.log(data);
//     })
// })





const weatherForm= document.querySelector('form');
const search= document.querySelector('input');
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')
// messageOne.textContent="From javascript"

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const location=search.value;
    const url='http://localhost:3000/weather?address='+ location;

    messageOne.textContent="Loading";
    messageTwo.textContent="";

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error;
                return console.log(data.error);
                
            }else{
                console.log(data.location);
                messageOne.textContent=data.location;
                console.log(data.data);
                messageTwo.textContent=data.data.description +' '+ data.data.temperature ;
            }
            
     })
        
    })
    // console.log(location)
})
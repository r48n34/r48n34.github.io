const formId = document.getElementById("formId");
const serverUrl = "http://localhost:8080"

// Assume you can submit to server function
formId.addEventListener('submit', (e)=> {
    e.preventDefault();

    // const formObj = {
    //     name: formId.ipName.value,
    //     age: formId.ipAge.value,
    //     gender: formId.ipGender.value,
    //     content: formId.ipContent.value,
    //     color: formId.ipColor.value,  
    // }

    // console.log(formObj)

    // your submit logic

    // goto success page
    
    window.location.href = 'submitSuccess.html'

})
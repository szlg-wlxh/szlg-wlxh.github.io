document.getElementById('showDifferent').addEventListener('click',function(defaultEvent )
{
    if(sessionStorage && sessionStorage.getItem('student') && JSON.parse(sessionStorage.getItem('student')).hasOwnProperty('id')){
        location.href = "#Information"
        defaultEvent.preventDefault();
    }
})
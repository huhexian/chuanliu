
var token = localStorage.getItem('token');

var blogType = 0;

function loginCheck(callback){
    fetch(server + 'login', {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data == undefined || data.code != 100000){
            if (callback == undefined){
                console.log(1)
                window.location.href= "../login/";
            }
            callback(false);
            return;
        }
         if (callback == undefined){
                 return;
            }
        callback(true);
        return;
    })
    .catch(error => {
        console.error('Error:', error);
        if (callback == undefined){
             console.log(2)
                window.location.href= "../login/";
            }
        callback(false);
        return;
    });
}


function logout(){
    localStorage.clear();
}
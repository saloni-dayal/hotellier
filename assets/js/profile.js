
$(document).ready(function () {
    var url = 'http://127.0.0.1:3007/images/reg';
    $.get(url, function (data, status) {
        user_data = data;
        mail = localStorage.getItem("currentLoggedUser");
        
        for (let i = 0; i < user_data.length; i++) {

            const obj = user_data[i]
            console.log(user_data)
            if (user_data[i].email == mail) {
                localStorage.setItem("Name",user_data[i].name)
                document.getElementById("name").innerHTML = obj.name
                document.getElementById("mbnum").innerHTML = obj.phno
                document.getElementById("address").innerHTML= "Hyderabad"
                document.getElementById("mail").innerHTML = obj.email
                document.getElementById("profimg").src=obj.img
                const edit = document.getElementById("edit")
                edit.addEventListener("click", () => {
                    const save = document.getElementById("save")
                    save.addEventListener("click", () => {
                        obj.name = document.getElementById("name").value
                        obj.phnnumber = document.getElementById("username").value
                        obj.address = document.getElementById("address").value
                        obj.mail = document.getElementById("mail").value
                        document.getElementById("name").value = obj.name
                        document.getElementById("username").value = obj.phnnumber
                        document.getElementById("address").value = obj.address
                        document.getElementById("mail").value = obj.mail
                        document.getElementById("heading").innerHTML = obj.name

                    })


                })
            }
        }
    });
});

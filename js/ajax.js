$("#btn").click(() => {
   var value = $("#input").val();
   $.get(`http://localhost:8888/?${value}`, (data) => {alert(data)});
})

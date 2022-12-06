$("#btn").click(() => {
   var value = $("#input").val();
   $.get(`https://level10.junyu33.me/?${value}`, (data) => {alert(data)});
})

document.addEventListener("DOMContentLoaded", function() {
  const ul = document.getElementById("list")
  const div = document.getElementById('show-panel')

  fetch('http://localhost:3000/books')
  .then(res=>res.json())
  .then(data=>{
    data.forEach(element => {
      const li = document.createElement('li')
      li.textContent += element.title
      ul.append(li)
      li.addEventListener('click', ()=>{
        const btn = document.createElement('button')
        btn.textContent = 'like'
        const usersList = document.createElement('ul');
        element.users.forEach(usr =>{
          const userLi = document.createElement('li');
          userLi.textContent = usr.username;
          usersList.append(userLi);
        

        div.innerHTML = `<img src="${element.img_url}"
        <br>
        <h2>subtitle:${element.subtitle}</h2>
        <h3>author:${element.author}</h3>
        <p>Description:${element.description}</p>`
        div.appendChild(usersList);
        div.appendChild(btn);
        
        btn.addEventListener('click',()=>{

        const newArr = []
        newArr.push(usr.username)
          fetch(`http://localhost:3000/books/${element.id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({users: newArr})
              })
          .then(res => res.json())
          .then(data => console.log(data));
        })
        

      })
    })
    });
  })
});

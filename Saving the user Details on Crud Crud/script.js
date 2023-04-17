function saveToLocalStorage(event){
	event.preventDefault();
	const name=event.target.username.value;
	const phonenumber=event.target.phn.value;
	const age=event.target.Age.value;
	const address=event.target.addr.value;
	const userdetails={
		name,phonenumber,age,address
	}
    axios.post("https://crudcrud.com/api/f119e4ec68c0450ea253831e0b1e474f/apointmentData",userdetails)
    .then((response)=>{
       // console.log(response)
      
    })
    .catch((err)=>{
        document.body.innerHTML= document.body.innerHTML+"<h4>Something went wrong</h4>"
       // console.log(err)
    })
	//localStorage.setItem(userdetails.name,JSON.stringify(userdetails));
	showNewUseronScreen(userdetails)
}
window.addEventListener("DOMContentLoaded",()=>{
const data=axios.get("https://crudcrud.com/api/f119e4ec68c0450ea253831e0b1e474f/apointmentData")
.then((response)=>{
   // console.log(response)
    for(var i=0;i<response.data.length;i++)
    {
        showNewUseronScreen(response.data[i])
    }
    })
        .catch((err)=>{
            console.log(err)
    
})
console.log(data);
})

function showNewUseronScreen(user){
 
	// if (localStorage.getItem(user.name)!=null){
	//  	removeUserFromScreen(user.name)
	//  }
	const parentNode=document.getElementById('users');
	const child=`<li id=${user._id}>${user.name},${user.phonenumber},${user.age},${user.address}
    <button onclick=deleteuser('${user._id}')>DELETE</button>
    <button onclick=edituser('${user.name}','${user.phonenumber}','${user.age}','${user.address}','${user._id}')>EDIT</button>
	
	 
	 </li>`
	parentNode.innerHTML=parentNode.innerHTML+child;
}

function edituser(NAME,PHN,AGE,ADDRESS,userId)
{
document.getElementById('username').value=NAME;
document.getElementById('phn').value=PHN;
document.getElementById('Age').value=AGE;
document.getElementById('addr').value=ADDRESS;
deleteuser(userId)
}

function deleteuser(userId){
    axios.delete(`https://crudcrud.com/api/f119e4ec68c0450ea253831e0b1e474f/apointmentData/${userId}`).then((response)=>{
        console.log(response);
        removeUserFromScreen(userId)
    })
    .catch((err)=>{
        console.log(err)
    })

// console.log(Name);
// localStorage.removeItem(Name);
// removeUserFromScreen(Name);
}

function removeUserFromScreen(userId){
	const parentNode=document.getElementById('users');
  const child1=document.getElementById(userId);
  parentNode.removeChild(child1);
}




const saveBtn = document.getElementById("save-btn")
const inputEl = document.getElementById("input-el")
const UlEl = document.getElementById("ul-el")
const deleteAll = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

let myLeads = []

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
// localStorage.clear()
function render(leads){
    let listItems = ""
    for(let i=0; i<leads.length;i++){
        // console.log(myLeads[i])
        // listItems += "<li> <a target='_blank' href='"+myLeads[i]+"'>"+ myLeads[i]+"</a> </li>" // or another way to do
        listItems += `  <li> 
                            <a target='_blank' href='${ leads[i]}'> 
                            ${leads[i]}
                            </a> 
                        </li>`  // or another way to do
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // UlEl.append(li)
    }
    UlEl.innerHTML=listItems
}

// const tab = [{
//     url:"www.youtube.com"
// }]

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow : true},function(tab){
        myLeads.push(tab[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

saveBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value =""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    // console.log(localStorage.getItem("myLeads"))
})

deleteAll.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

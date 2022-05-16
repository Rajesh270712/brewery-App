var breweryList = JSON.parse(localStorage.getItem("breweryList")) || [];

let timerId;
function debounce(func,delay)
{
    if(timerId) clearTimeout(timerId);
    timerId= setTimeout(function()
    {
        func();
    },delay)
}

async function search()
{
    let search= document.querySelector("#breweryName").value;
    
    let res =  await fetch(`https://api.openbrewerydb.org/breweries/search?query=${search}&per_page=20`);

    let data =await res.json();

    display(data)

}

function display(data){
    document.querySelector("#breweries").innerHTML=""
    data.forEach(brewery => {
        var row= document.createElement("tr");

        var name=document.createElement("td");
        name.innerText=brewery.name;

        var type=document.createElement("td");
        type.innerText=brewery.brewery_type;

        var city=document.createElement("td");
        city.innerText=brewery.city;

        var state=document.createElement("td");
        state.innerText=brewery.state;

        var link=document.createElement("td");
        var details=document.createElement("button");
        
        details.addEventListener("click",function()
        {

            breweryList.push(brewery.id);

            (localStorage.setItem("breweryList",JSON.stringify(breweryList)))
        })

        details.innerText="More Details"
        link.append(details)

        row.append(name,type,city,state,link);

        document.querySelector("#breweries").append(row)
    });
}
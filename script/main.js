



var breweryList = JSON.parse(localStorage.getItem("breweryList")) || [];

fetchBrewery();


async function fetchBrewery()
{
    try {
        
        let res= await fetch(`https://api.openbrewerydb.org/breweries`);

        let data = await res.json();

        displayBreweries(data)

    } catch (error) {
        console.log(error)
    }
}

function displayBreweries(data)
{
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



async function displayBreweryType()
{
    try {
        let type=document.querySelector("#breweryType").value;

        let res= await fetch(`https://api.openbrewerydb.org/breweries?by_type=${type}&per_page=20`)

        let data= await res.json();

        displayBreweries(data);

    } catch (error) {
        console.log(error);
    }
}
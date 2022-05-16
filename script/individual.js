
let breweryList=JSON.parse(localStorage.getItem("breweryList"))

getDetails();


async function getDetails()
{
    breweryList.forEach(brewery => {
        
        let data =  fetchBrewery(brewery)
        
    });
    console.log(breweryList)
}

async function fetchBrewery(id) 
{
    try {
        
        let res= await fetch(`https://api.openbrewerydb.org/breweries/${id}`)

        let data = await res.json();
        
        var box = document.createElement("div");

        var h3= document.createElement("h3");
        h3.innerText="Name : "+data.name;

        var brewery_type=document.createElement("p");
        brewery_type.innerText="Brewery Type : "+data.brewery_type;
        
        var city=document.createElement("p");
        city.innerText="city : "+data.city;

        var state=document.createElement("p");
        state.innerText="state : "+data.state;
  
        var country=document.createElement("p");
        country.innerText="country : "+data.country;
      
        var phone=document.createElement("p");
        phone.innerText="phone : "+data.phone;
        
        var website_url=document.createElement("p");
        website_url.innerText="website : "+data.website_url;

        box.append(h3,brewery_type,city,state,country,phone,website_url);

        document.querySelector("#container").append(box);
    } catch (error) {
        console.log(error)
    }
}





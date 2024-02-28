// import { useState,useEffect } from "react";

// const useRestaurant = () =>{

//     const [restaurant,setRestaurant]=useState(null);
//     const [myData,setMyData]=useState(null);

//     //get data from API

//     useEffect(() => {
//         getRestaurantInfo();
//     }, []);

//     async function getRestaurantInfo() {
//         const data = await fetch ("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5904779&lng=73.7271909&restaurantId=647335")
//         const json = await data.json();
//         console.log("json",json)
//         setRestaurant(json?.data?.cards[2]?.card?.card?.info)
//         console.log("New json",json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
//         // console.log("New json 1",json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2])
//         setMyData=json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2];
//         console.log(myData)
//         // setRestaurant(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards); // Extracting the restaurant info from the JSON response
//     } 

//     //resturn resta data
//     return restaurant;
// };

// export default useRestaurant;
import { useState, useEffect } from "react";

const useRestaurant = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [myData, setMyData] = useState(null);

    useEffect(() => {
        getRestaurantInfo();
    }, []);

    async function getRestaurantInfo() {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5904779&lng=73.7271909&restaurantId=647335")
            const json = await data.json();
            console.log("json", json);
            setRestaurant(json?.data?.cards[2]?.card?.card?.info);

            // Update myData using setMyData
            setMyData(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    } 

    console.log("myData:", myData); // Now you can print myData here

    useEffect(() => {
        if (myData) {
            // Example: Print names of all items
            myData.forEach(item => {
                console.log(item.card.info.name);
            });
        }
    }, [myData]);

    
    return restaurant;
};

export default useRestaurant;

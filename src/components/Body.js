import { RestaruntCard } from "./RestaruntCard";
import {  useState,useEffect} from "react";
import Shimmer from "./Shimmer";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { Link } from "react-router-dom"; 

const Body = ()=>{
    const [allRestaurants,setAllRestaurants]=useState([]);
    const [searchText,setSearchText]=useState(""); // returns=[state varailbe name,function to update the variable]
    const [filterdRestaurants, setFilterdRestaurants] = useState([]);

    useEffect(()=>{ 
        getRestaurants();
    },[])
     
    async function getRestaurants(){
        const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json=await data.json();
        console.log("body",json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setAllRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilterdRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 
    }

    const isOnline =useOnline();

    if(!isOnline){
        return<h1>offline ,please check your internate connection!!</h1>;
    }

    if(!allRestaurants) return null;

    return (allRestaurants.length === 0) ? <Shimmer/>: (
        <>
        <div className="search-container p-5 bg-pink-50 my-5">
           <input type="text" 
            className="search-input"
            placeholder="search"
            value={searchText}
            onChange={(e)=> { 
                setSearchText(e.target.value)  }}/>

            <button className="p-2 m-2 bg-purple-900 hover:bg-gray-500 text-white rounded-md"
                onClick={()=>{
                    const data=filterData(searchText,allRestaurants);
                    setFilterdRestaurants(data);
                }}
                >Search</button>
        </div>

        <div className="flex flex-wrap ">
              {filterdRestaurants.map((restaurant) => {
                 return (
                    <Link to={"/restaurant/"+ restaurant.info.id} key={restaurant.info.cloudinaryImageId}>                 
                         <RestaruntCard {...restaurant}  />
                    </Link>
                 );
            })}
        </div>
        </>
    )
}

export default  Body; 
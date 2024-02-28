import { useParams } from "react-router-dom";
import {IMG_CDN_URL} from "./Constant"
import useRestaurant from "../utils/useRestaurant";

const RestaurantMenu = () => {
    const { resId } = useParams();    
    const restaurant=useRestaurant()
  
    return (
        <div>
           <div>
            <h1>Restaurant id: {resId}</h1>
            <h2>Restaurant name: {restaurant?.name}</h2>
            <img alt="Restaurant Image" src={IMG_CDN_URL + restaurant?.cloudinaryImageId} />
            {/* <h3>{restaurant.area}</h3>
            <h3>{restaurant.city}</h3>
            <h3>{restaurant.avgRating}</h3>
            <h3>{restaurant.costForTwoMsg}</h3> */}
        </div> 
        <div>
            
        </div>
        </div>
    );
}

export default RestaurantMenu;  
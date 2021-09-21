import axios from "axios";
import { getAxios } from "./api";

export async function getPackageCost( packageAmount :any ) {
        let bnbPrice:any = await getBnbPrice();
        let price = 1/parseInt(bnbPrice.result.ethusd) * packageAmount
        console.log("bnbPrice", 1/parseInt(bnbPrice.result.ethusd) * packageAmount);
        return {value:1/parseInt(bnbPrice.result.ethusd) * packageAmount * 1000000000000000000, price:bnbPrice.result.ethusd}

}


async function getBnbPrice() {
    console.log("here")
    var data = await fetch("https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=FCZGCYKPSEX8WXR1C9MTJHKR4B5W3U6YHM")
         data = await data.json();
       return data
}
import { defineStore } from "pinia";
import axios from "axios";

export const getStoreList = defineStore({
    id: "dateRangeStore",
    state:()=>{
        storeList:{}
    },
    action:{
        getDatea (){
            axios
            .get(
              "https://sheets.googleapis.com/v4/spreadsheets/1_3W1EeAV2n4InaUCczUp7BVPzXxB1mVsneRrD7Ygb_0/values/工作表1?key=AIzaSyD4tjE_hNQpGPegRSGPD-Ut_Avo9G59zgU"
            )
            .then((response) => console.log("res",response))
            .catch((error) => console.log(error));
        },
    }
})

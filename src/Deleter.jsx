import { Component } from "react";
import FF from "./fetch";

class Deleter extends Component {
    async Delete(user_id, product_id) {
        let url = window.site + "/mapi/v2/ishop/basket/delete.html";
        let data = {
            user : user_id,
            product : product_id
        };

        let req = await FF(url, data);

        if (req.ok) {
            return true;
        } else {
            console.error(req)
        }
        return false;
    }
}


export default Deleter;
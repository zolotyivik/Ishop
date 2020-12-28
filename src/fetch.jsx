export default async function ffetch(url, data, method = "POST") {
    let response = {
      ok : false,
      data : {}
    };
    let req = {};
    if (method == "GET") {
      let str = "?";
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          str += key + '=' + element + '&'
        }
      }
      // console.log();
      str = str.substring(0, str.length-1);
      req = await fetch(url + str)
    } else {
      req = await fetch(url, {
        method: method,
        body : JSON.stringify(data)
      })
    }
    
    if (req.status == 200) {
      let res = await req.json();
      if (res.ok) {
        response = res;
        response.headers = req.headers;
      } else response.data = res;
    } else 
      response.data = req;
  
      return response
  }
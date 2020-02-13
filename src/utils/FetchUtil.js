import Cookies from "js-cookie";
import { BASE_URL } from "../config/endpoints";

export async function fetchAPI(endpoint, method = "get", body = null) {
  try {
    const url = BASE_URL + endpoint;
    const bitToken = Cookies.get("bitToken");

    let options = {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${bitToken}`
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      // TODO: Confirm this code before releasing.
      throw Error(await response.text);
    } else {
      const responseBody = response.json();

      if (responseBody) {
        return responseBody;
      }
    }
  } catch (error) {
    throw error;
  }
}

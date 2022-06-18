import { createReadStream } from "fs";
import * as http from "http";
import * as https from "https";
const OK = 200;
export async function createStreamFromPath(path) {
    if (path.match("^https?:\/\/.*$") !== null) {
        return await getRequestStream(path);
    }
    else {
        return createReadStream(path);
    }
}
export function getRequestStream(address) {
    return address.startsWith("https")
        ? getRequestStreamHttps(address)
        : getRequestStreamHttp(address);
}
function getRequestStreamHttp(address) {
    return new Promise((resolve, reject) => {
        const request = http.get(address, (response) => {
            if (response.statusCode !== OK) {
                reject(new Error("Request failed, status code: " + response.statusCode));
            }
            resolve(response);
        });
        request.on("error", (err) => reject(err));
    });
}
function getRequestStreamHttps(address) {
    return new Promise((resolve, reject) => {
        const request = https.get(address, (response) => {
            if (response.statusCode !== OK) {
                reject(new Error("Request failed, status code: " + response.statusCode));
            }
            resolve(response);
        });
        request.on("error", (err) => reject(err));
    });
}

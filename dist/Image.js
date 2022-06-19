import { PNG } from "pngjs";
import { createStreamFromPath } from "./Utils.js";
export default class Image {
    static async load(path) {
        const stream = await createStreamFromPath(path);
        return new Promise(resolve => {
            stream.pipe(new PNG()).on("parsed", function () {
                const pixels = new Array(this.width * this.height);
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        const idx = (this.width * y + x) * 4;
                        let value = false;
                        if (this.data[idx] < 0xE6 || this.data[idx + 1] < 0xE6 || this.data[idx + 2] < 0xE6) {
                            value = true;
                        }
                        if (value && this.data[idx + 3] <= 0x80) {
                            value = false;
                        }
                        pixels[this.width * y + x] = value;
                    }
                }
                resolve(new Image(pixels, this.width, this.height));
            });
        });
    }
    width;
    height;
    data;
    constructor(pixels, width, height) {
        this.data = pixels;
        this.width = width;
        this.height = height;
    }
    toRaster() {
        const n = Math.ceil(this.width / 8);
        const result = new Uint8Array(this.height * n);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.data[y * this.width + x]) {
                    result[y * n + (x >> 3)] += (0x80 >> ((x % 8) & 0x7));
                }
            }
        }
        return {
            data: result,
            height: this.height,
            width: n
        };
    }
}

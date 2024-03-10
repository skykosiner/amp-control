import { Sky } from "./sky";
import { Tv } from "./tv";

const sky = new Sky("10.0.0.44");
const tv = new Tv();

tv.on("power", (state: boolean) => {
    sky.on("power", (skyState: boolean) => {
        if (skyState && state) {
            console.log("Both TV and Sky are on");
        } else if (!skyState && state) {
            console.log("TV is on, but Sky is off");
        }
    })
})


import { Amp } from "./amp";
import { Sky } from "./sky";
import { Tv } from "./tv";

const sky = new Sky("10.0.0.44");
const tv = new Tv();
const amp = new Amp("10.0.0.20");

tv.on("power", (state: boolean) => {
    sky.on("power", (skyState: boolean) => {
        if (skyState && state) {
            amp.setSkyOutput();
        } else if (!skyState && state) {
            amp.setTVoutput();
        }
    })
})

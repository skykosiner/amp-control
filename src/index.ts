import { Amp } from "./amp";
import { Sky } from "./sky";
import { Tv } from "./tv";

const sky = new Sky("10.0.0.44");
const tv = new Tv();
const amp = new Amp("10.0.0.20");

tv.on("power", (tvState: boolean) => {
    sky.on("power", (skyState: boolean) => {
        if (skyState && tvState) {
            amp.setSkyOutput();
        } else if (!skyState && tvState) {
            amp.setTVoutput();
        }
    })
})

//@ts-ignore
import Denon from "denon-client";

export class Amp {
    private denon: Denon.DenonClient;

    constructor(ip: string) {
        this.denon = new Denon.DenonClient(ip);
    }

    public setTVoutput() {
        this.denon.connect().then(() => {
            this.denon.setInput("TV");
        })
    }

    public setSkyOutput() {
        this.denon.connect().then(() => {
            this.denon.setInput("SAT/CBL");
        })
    }
}

//@ts-ignore
import Denon from "denon-client";

export class Amp {
    private denon: Denon.DenonClient;

    constructor(ip: string) {
        this.denon = new Denon.DenonClient(ip);
    }

    public setTVoutput(): void {
        this.denon.connect().then(() => {
            this.denon.setInput("TV");
        })
    }

    public setSkyOutput(): void {
        this.denon.connect().then(() => {
            this.denon.setInput("SAT/CBL");
        })
    }
}

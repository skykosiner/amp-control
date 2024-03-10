import EventEmitter from "events";

export type SkyResp = {
    activeStandby: boolean;
}

export class Sky extends EventEmitter {
    constructor(private ip: string) {
        super();
        this.runContinuousCheck();
    }

    private async runContinuousCheck(): Promise<void> {
        while (true) {
            const skyResp = await this.fetchSkyState();
            const newState = this.powerState(skyResp.activeStandby);
            this.emit("power", newState);

            await this.sleep(5000);
        }
    }

    private async fetchSkyState(): Promise<SkyResp> {
        if (this.ip === "") {
            throw new Error("No IP address provided");
        }

        const resp = await fetch(`http://${this.ip}:9006/as/system/information`);
        if (!resp.ok) {
            throw new Error("Failed to fetch data");
        }

        return resp.json();
    }

    private powerState(state: boolean): boolean {
        return !state;
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

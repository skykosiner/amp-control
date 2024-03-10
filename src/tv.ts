import EventEmitter from "events";

export type TvResp = {
    state: string;
}

export class Tv extends EventEmitter {
    private currentState: boolean;

    constructor() {
        super();

        this.currentState = false;
        this.runContinuousCheck();
    }

    private async runContinuousCheck() {
        while (true) {
            const tvResp = await this.fetchTvState();
            const state = tvResp.state === "on" ? true : false;

            if (this.currentState !== state) {
                this.emit("power", state);
                this.currentState = state;
            }

            await this.sleep(5000);
        }
    }

    private async fetchTvState(): Promise<TvResp> {
        const resp = await fetch("http://10.0.0.36:8123/api/states/media_player.kitchen_tv_2", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhMGQ4N2ZlZjhhYjA0OGRhOTdlNTE4Y2UyYzM5ZDdlOSIsImlhdCI6MTcwMjA1NDUyNywiZXhwIjoyMDE3NDE0NTI3fQ.UYxG0rx37YAfi4ARo_wapA6f2KHNKeSVp1PJ_o5tems"
            }
        })

        if (!resp.ok) {
            throw new Error("Failed to fetch data");
        }

        return resp.json();
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

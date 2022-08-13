export class LivesyncReqVo {
    action: string;
    liveSync: number;
    event: string;
    index: number;



    constructor(liveSync: any, event: string, index: any){
        this.action = 'notify_clients';
        this.liveSync = liveSync;
        this.event = event;
        this.index = index;
    }
}

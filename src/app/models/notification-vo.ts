export class NotificationVo {
    action: string;
    liveSync: number;
    sender: string;
    subject: string;
    message: string;
    event: string;



    constructor(liveSync: any, sender: string, subject: string, message: string, event: string){
        this.action = 'notify_clients';
        this.liveSync = liveSync;
        this.sender = sender;
        this.subject = subject;
        this.message = message;
        this.event = event;
    }
}

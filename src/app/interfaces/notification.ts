export interface Notification {
  id: String;  
  sender: String;
  receiver: String;
  subject: string;
  message: String;
  livesyncId: number;
  isViewed: boolean;
}

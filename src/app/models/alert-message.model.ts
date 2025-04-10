export interface AlertMessage {
    type: 'success' | 'error' | 'info';
    message: string;
    timestamp: Date;
  }
  
interface Notification {
    notificationId: number;
    identityId: string;
    applicationId: string;
    message: string;
    checked: boolean;
    createdAt: number;
}
export type NotificationType =
| "WELCOME"
| "CHANGE_OF_STOCK"
| "LOWEST_PRICE"
| "THRESHOLD_MET";

export type EmailContent = {
subject: string;
body: string;
};
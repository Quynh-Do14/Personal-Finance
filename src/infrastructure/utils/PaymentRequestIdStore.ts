export class PaymentRequestIdStore {
    private static readonly PREFIX = "payment_request_idempotency_";

    static markRequestProcessed(transactionId: string, timestamp: number = Date.now()): void {
        const key = `${this.PREFIX}${transactionId}`;
        localStorage.setItem(key, String(timestamp));

        // Lưu danh sách các transactionId đã xử lý (để dễ quản lý)
        const processedList = this.getProcessedList();
        if (!processedList.includes(transactionId)) {
            processedList.push(transactionId);
            localStorage.setItem(`${this.PREFIX}list`, JSON.stringify(processedList));
        }
    }

    static hasBeenProcessed(transactionId: string): boolean {
        const key = `${this.PREFIX}${transactionId}`;
        return localStorage.getItem(key) !== null;
    }

    static getProcessedList(): string[] {
        const list = localStorage.getItem(`${this.PREFIX}list`);
        return list ? JSON.parse(list) : [];
    }
}
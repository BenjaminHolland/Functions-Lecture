
class TriviallySimpleAsyncExample {
    static sleepAsync(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static async run() {
        const iPromiseYouAThreeInASecond: () => Promise<number> = async () => {
            await this.sleepAsync(1000);
            return 3;
        }
        const thePromiseIMadeYou = iPromiseYouAThreeInASecond();
        const theThreeIPromisedYou = await thePromiseIMadeYou;
        console.log(`Here's that three you wanted a second ago. ${theThreeIPromisedYou}`);
    }
}
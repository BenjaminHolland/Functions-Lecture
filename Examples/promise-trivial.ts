
class TriviallySimplePromiseExample {
    static async run() {
        const iPromiseYouAThreeInASecond: Promise<number> = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 1000);
        });
        await iPromiseYouAThreeInASecond.then(n => console.log(`See, I told you I'd give you a ${n}.`));
    }
}
export {TriviallySimplePromiseExample as Program }
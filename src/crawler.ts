import http from "http"
import cheerio from 'cheerio';

const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getUrl(i: number): string {
    let prefix: String = "http://dy-public.oss-cn-shenzhen.aliyuncs.com/interviewTestData/"
    let suffix: String = ".txt"
    return prefix.toString() + i.toString() + suffix.toString()
}

async function getContent(url: string): Promise<string> {
    let rawData = '';
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                return reject('Request Failed')
            }
            res.setEncoding('utf8');
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    return resolve(rawData);
                } catch (e) {
                    return reject(e)
                }
            });
        }).on('error', (e) => {
            return reject(e);
        })
    })
}

async function getNum(url: string): Promise<number> {
    // input your code
    const row = await getContent(url);
    const $ = cheerio.load(row);
    const def = $('abc').children().text();
    const retnum = def.match(/data : (\S*);/)?.[1];
    return Number(retnum);
}

async function syncExecute() {
    // input your code 
    let retnums: number[] = [];
    for (const n of nums) {
        const url = getUrl(n);
        const num = await getNum(url);
        retnums.push(num);
    }
    return eval(retnums.join('+'));
}

async function asyncExecute() {
    // input your code 
    let retnum = 0;
    await Promise.all(nums.map(async (n) => {
        const url = getUrl(n);
        const num = await getNum(url);
        return num;
    })).then(data => {
        retnum = eval(data.join('+'));
    })
    return retnum;
}

async function main() {
    console.log(await asyncExecute());
    console.log("------------------")
    console.log("------------------")
    console.log(await syncExecute())
}

main()




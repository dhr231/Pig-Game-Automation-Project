let puppeteer = require("puppeteer");
let fs = require("fs");
(async function () {
  try {
    //let data = await fs.promises.readFile(cFile);
    let url = process.argv[2];
    let browser = await puppeteer.launch({
      headless: false,
      slowMo: 70,
      defaultViewport: null,
      args: ["--start-maximized", "--disable-notifications"]
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto(url, { waitUntil: "networkidle2" });
    let score_0=await tab.$("#score-0")
    let score_1=await tab.$("#score-1")
    let text=await tab.evaluate(function(e){
        return e.innerText
    },score_0);
    let text_1=await tab.evaluate(function(e){
        return e.innerText
    },score_1)
    while(text<=100 || text_1<=100){
        text=await tab.evaluate(function(e){
            return e.innerText
        },score_0);
        text_1=await tab.evaluate(function(e){
            return e.innerText
        },score_1)
        // console.log(text);
        // console.log(text_1);
        if(text>=100){
            console.log("PLAYER 1 WON!!!!!");
            break;
        }
        else if(text_1>=100){
            console.log("PLAYER 2 WON!!!!!");
            break;
        }
        
        else{
            await tab.click(".btn-roll");
            await tab.click(".btn-hold");
        }
        
    }
    
    // while(){
    //    

    //     
    // }
}
catch(err){
    console.log(err);
}

})();


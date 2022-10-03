String.prototype.parseArray = function() {
    const str = this;
    if(/((?<=\[).*(?=\])|(.{1,}))/.test(str)){
    const arrayRegEx = /(((?<!\[).*(?<=\[))[^\]\[]*((?=\]).*(?!\]))|.{1,})/;
    const match = str.match(arrayRegEx)[0];
    const nArr = match.split(/([\de+]*\.[\de+]*|[\de+]{1,}|"[^"]{1,}"|'[^']{1,}'|`[^`]{1,}`)(?=[,]*)|(?<=[,]*[ ]*)([\de]{1,}|"[^"]{1,}"|'[^']{1,}'|`[^`]{1,}`|true|false)/gi);
    nArr.splice(0,1);
    nArr.splice(nArr.length - 1, 1);
    let loopAmt = nArr.length;
    // STRING/Numeric/Bool Conversion
    for(let i = 0; i < loopAmt; i++){
        if(/((?<=')[^']*(?=')|(?<=")[^"]*(?=")|(?<=`)[^`]*(?=`))/.test(nArr[i])){
            nArr[i] = nArr[i].match(/((?<=')[^']*(?=')|(?<=")[^"]*(?=")|(?<=`)[^`]*(?=`))/)[0];
        }else if(!isNaN(parseFloat(nArr[i]))){
            nArr[i] = parseFloat(nArr[i]);
        } else if(/true|false/gi.test(nArr[i])){
            nArr[i] = ((`${nArr[i]}`).toLowerCase() == "true") ? true : false;
        }
    }
        // FILTER
        
         loopAmt = nArr.length;
        for(let i = 0; i < loopAmt; i++){
            if(!/^[,'`"]*[ ]*[^'`",\s]/gi.test(nArr[i])){
                nArr.splice(i,1);
                i = 0;
                loopAmt = nArr.length;
            }else if(nArr[i] == null){
                nArr.splice(i,1);
                i=0;
                loopAmt--;
            }
        }
    
    return nArr;
    } else{
        console.log("parseArray Error: No Array Detected");
    }
};

Array.prototype.parseString = function(){
    const arrLength = this.length;
    let nStr = "";
    for(let i = 0; i < arrLength; i++){

        if(typeof this[i] == "string"){
            this[i] = "\`" + this[i] + "\`";
        }
        

        if(i == arrLength - 1){
            nStr += this[i];
        }else{
            nStr += `${this[i]}, `;
        }
        

    }
    return ("[" + nStr + "]");
};
const settingsArray = ["rgba(1,2,255,0.7)", `two`, true, false, 'true', 5e90, 70.8];

localStorage.setItem("testArray", (settingsArray.parseString()));
console.log(localStorage.getItem("testArray").parseArray())
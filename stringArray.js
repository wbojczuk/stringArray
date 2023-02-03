/*
 Program: stringArray.js
 Version: 1.1 
 Creator: William Bojczuk (wiliambojczuk@gmail.com)
 License: BSD
 Github: https://github.com/wbojczuk
 Website: https://williambojczuk.com
 
 */
String.prototype.parseArray = function() {
    const str = this;
    if(/((?<=\[).*(?=\])|(.{1,}))/.test(str)){
    const arrayRegEx = /(((?<!\[).*(?<=\[))[^\]\[]*((?=\]).*(?!\]))|.{1,})/;
    const match = str.match(arrayRegEx)[0];
    const nArr = match.split(/([-\de+]*\.[-\de+]*|[-\de+]{1,}|"[^"]{1,}"|'[^']{1,}'|`[^`]{1,}`)(?=[,]*)|(?<=[,]*[ ]*)([\de]{1,}|"[^"]{1,}"|'[^']{1,}'|`[^`]{1,}`|true|false|undefined|null)/gi);
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
            if((!/^[,'`"]*[ ]*[^'`",\s]/gi.test(nArr[i]))||(nArr[i] == undefined)){
                nArr.splice(i,1);
                i--;
                loopAmt--;
            }else if(/undefined/gi.test(nArr[i])){
                nArr[i] = undefined;
            }else if(/null/gi.test(nArr[i])){
                nArr[i] = null;
            }
        }
    return nArr;
    } else{
        console.log("parseArray Error: No Array Detected");
    }
};

//Parses an array object into a string that is readable by String.parseArray();
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
    return (`[${nStr}]`);
};

function normDist(arr1, arr2){

    if(arr1.length !== arr2.length){
        throw new Error("Array are not the same length.");
    }

    let temp = 0

    for(let i = 0; i < arr1.length ; i++){
        temp += ( (arr1[i] - arr2[i]) * (arr1[i] - arr2[i]) )
    }
    
    return Math.sqrt(temp);
}

function calMeanFunc(arr){
    let tempNum = 0;
    //console.log(arr);

    for(let i = 0; i < arr.length ; i++){
        //console.log(arr[i]);
        tempNum += arr[i];
    }

    //console.log(tempNum)
    return tempNum / arr.length
}

function initBlankArr(len){
    let arr = [];
    for(let i = 0; i < len ; i++){
        arr.push([]);
    }
    return arr ;
}

function arrayOfYAxisArr(arr, yAxis){  
    let temp = [];
    for(let i = 0; i < arr.length ; i++){
        temp.push( arr[i][yAxis] );
    }
    return temp;  
}

class Point2D{

    constructor(x, y, label){
        this.x = x;
        this.y = y;
        this.label = label;
    }

    getPt(){
        return [this.x, this.y];
    }

    getLabel(){
        return this.label
    }

}

function clostElementGet(arr, compareArr){

    let finalArr = [];

    for(let i = 0; i < arr.length; i++){
        let temdist = [];

        for(let k = 0; k < compareArr.length ; k++){
            temdist[k] = normDist(arr[i], compareArr[k]);
        }

        const minIndex = temdist.indexOf( Math.max(...temdist) );
        finalArr.push([arr[i], minIndex]);
    }

    return finalArr;

}

function pickRanNumArray(len, num){
    let pickInit = new Set();
    
    while(pickInit.size < num){
        pickInit.add(Math.floor(Math.random() * len));
    }
    
    pickInit = new Array(...pickInit);

    return pickInit;
}

// async function kMeans(arr, classNum, iterNum){
//     const ranNumArr = pickRanNumArray(arr.length, classNum);

//     const cpoyArr = JSON.parse(JSON.stringify(arr));
//     let currentCenter = ranNumArr.map(v => cpoyArr[v]);
//     let resultArr = [];

//     for(let i = 0; i < iterNum; i++){

//         resultArr = clostElementGet(arr, currentCenter);

//         for(let j = 0; j < currentCenter.length; j++){

//             for(let r = 0 ; r < currentCenter[j].length ; r++){
//                 let nowComp = resultArr.filter(v => v[1] == j).map(v => v[0]);

//                 if(nowComp.length === 0){
//                     continue;
//                 }

//                 const temparrNum = calMeanFunc( arrayOfYAxisArr(nowComp, r) );
//                 currentCenter[j][r] = temparrNum;

//             }
//         }


//     }

//     return resultArr;

// }


// async function kMeans(arr, classNum, iterNum){

//     return new Promise((rec, rej) =>{

//         let copArr = JSON.parse(JSON.stringify(arr));
    
//         let pickInit = new Set();
    
//         while(pickInit.size < classNum){
//             pickInit.add(Math.floor(Math.random() * arr.length));
//         }
    
//         pickInit = new Array(...pickInit);
    
//         let currentCenter = [...pickInit.map( v => copArr[v] )];
//         let resultArr = [];

//         console.log(currentCenter)
    
//         for(let i = 0; i < iterNum; i++){
    
//             resultArr = clostElementGet(arr, currentCenter);
    
//             for(let j = 0; j < currentCenter.length; j++){
    
//                 for(let r = 0 ; r < currentCenter[j].length ; r++){
    
//                     let nowComp = resultArr.filter(v => v[1] == j).map(v => v[0]);
//                     const temparrNum = calMeanFunc( arrayOfYAxisArr(nowComp, r) );
//                     console.log(currentCenter)
//                     currentCenter[j][r] = temparrNum;
    
//                 }
    
//             }

//             console.log(resultArr);
    
//         }
    
//         rec(resultArr);
//     })
// }
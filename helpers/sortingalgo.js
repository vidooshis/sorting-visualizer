const Compare={
    LESS_THAN:-1,
    BIGGER_THAN:1
}
const defaultCompare=(a,b)=>{
    if (a==b){
        return 0
    }
    return a<b?Compare.LESS_THAN:Compare.BIGGER_THAN
}
let swaps=[]
const parttition=(array,left,right,compareFn)=>{
    const pivot=array[Math.floor(right+left)/2]
    let i=left
    let j=right

    while(i<=j){
        while(compareFn(array[i],pivot)===Compare.LESS_THAN){
            i++
        }while(compareFn(array[j],pivot)===Compare.BIGGER_THAN){
            j--
        }
        if (i<=j){
            let temp=array[i]
            array[i]=array[j]
            array[j]=temp
            swaps.push({firstPosition:i,lastPosition:j})
            i++
            j--

        }
    }
    return i;

}
const quick=(array,left,right,compareFn)=>{
    let index
    if (array.length>1){
        index=parttition(array,left,right,compareFn)
        if (left<index-1){
            quick(array,left,index-1,compareFn)
        }
        if (index<right){
            quick(array,index,right,compareFn)
        }
    }
    return array
}
class sortingalgorithms{
    bubblesort(array){
        const swaps=[]
        for (let i=0;i<array.length;i++){
            for(let j=0;j<array.length-i-1;j++){
                if (array[j]>array[j+1]){
                    let temp=array[j]
                    array[j]=array[j+1]
                    array[j+1]=temp
                    swaps.push({firstPosition:j,lastPosition:j+1})
                }
            }
        }
        return swaps
    }
    selectionsort(array){
        const swaps=[]
        let min
        for (let i=0;i<array.length-1;i++){
            min=i
            for (let j=i+1;j<array.length;j++){
                if (array[j]<array[min]){
                    min=j
                }
            }
            let temp=array[min]
            array[min]=array[i]
            array[i]=temp
            swaps.push({firstPosition:min,lastPosition:i})
        }
        return swaps
    }
    quicksort(array,compareFn=defaultCompare){
        swaps=[]
        quick(array,0,array.length-1,compareFn)
        return swaps
    }
}
export{
    sortingalgorithms
}
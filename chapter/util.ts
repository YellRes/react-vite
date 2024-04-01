
// 遍历所有的排列组合
export const traverse = (arr: Array<Array<string>>) => { 
    const temp: Array<string>  = []
    const result: Array<Array<string>> = []
    const length = arr.length

    function _loop(currentArr: Array<string>, index: number) { 
        index++
        for (let i = 0; i < currentArr.length; i++) { 

            temp.push(currentArr[i])

            if (index >= length) {
                result.push([...temp])
                temp.pop()
                continue
            }

            
            _loop(arr[index], index)
            temp.pop()
        }
    }

    if (arr.length) _loop(arr[0], 0)
    return result
}

/**
 * 计算素数
 * @param num: 生成素数的数量
 * */ 
export const getPrimeList = (num: number) => { 
    const result = []
    let index = 2

    result.push(2)
    while (result.length < num) { 

        // 找到下一个素数
        let isPrime = false
        while (!isPrime) { 
            for (let i = 1; i < index; i++) {
                if (i === 1) continue
                if (!(index % i)) {
                    break
                }

                if (i == index - 1) { 
                    isPrime = true
                    result.push(index)
                }
            }
            
            index++
        }

       
    }

    return result 
}

export class PathFinder {
    skuList: Array<Array<number>>
    // 已选中 2 可以选择 1 不可选择 0
    currentSelectedList: Array<Array<number>>
    
    selectedSkuList: Array<number>
    _primeToIndexObj: Record<number, Array<number>>
    _selected: Array<number>

    constructor(skuList, selectedSkuList) { 
        this.skuList = skuList
        this.selectedSkuList = selectedSkuList

        this.currentSelectedList = structuredClone(skuList)
        this._primeToIndexObj = {}
        this._selected = []
        this.init()
    }

    init() { 
        for (let i = 0; i < this.currentSelectedList.length; i++) { 
            const row = this.currentSelectedList[i]
            for (let j = 0; j < row.length; j++) { 
                this._primeToIndexObj[row[j]] = [i, j]
                row[j] = 1
            }
        }
    }

    // 检查
    check() {
        const selected = this._selected
        const multiple = selected.reduce((pre, cur) => pre * cur, 1)

        for (let i = 0; i < this.currentSelectedList.length; i++) { 
            const row = this.currentSelectedList[i]
            const primeRow = this.skuList[i]
            
            for (let j = 0; j < row.length; j++) { 
                if (row[j] === 2) {
                    continue
                } else { 
                    row[j] = 0
                    // 获取是否可以获取
                    for (let k = 0; k < this.selectedSkuList.length; k++) {
                        console.log(`i:${i}, j:${j}, multiple:${multiple}, prime:${primeRow[j]}`)

                        if (!(this.selectedSkuList[k] % (multiple * primeRow[j]))) {
                            console.log(this.selectedSkuList[k], 'this.selectedSkuList[k]')
                            console.log(multiple, 'multiple')
                            console.log(row[j], 'row[j]')
                            console.log('***************')
                            row[j] = 1
                            break
                        } 
                    }
                }
            }

        }
    }

    add(x: number, y: number) {
        this.currentSelectedList[x][y] = 2
        let hasSameLine = false

        for (let i = 0; i < this._selected.length; i++) {
            if (this._primeToIndexObj[this._selected[i]][0] === x) { 
                this._selected = [this.skuList[x][y]]
                hasSameLine = true
                break
            }
        }

        this._selected.push(this.skuList[x][y])
        this.check()
        return hasSameLine
    }

    delete(x: number, y: number) {
        this.currentSelectedList[x][y] = 1

        for (let i = 0; i < this._selected.length; i++) { 
            if (this._selected[i] === this.skuList[x][y]) { 
                this._selected.splice(i, 1)
                break
            }
        }

        console.log(this._selected, 'deleted')

        this.check()
    }
}














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
    let index = 1

    result.push(1)
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















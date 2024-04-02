import { Checkbox, Form } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { produce } from 'immer'
import { traverse, getPrimeList, PathFinder } from './util'
interface SkuProps {
    skuList?: Array<{
        name: string
        value: string
        list: Array<string>
    }>,
    availableList?: Array<Array<string>>
}

function Sku(props: SkuProps) {

    const { skuList = [], availableList = [] } = props
    // 所有的sku组合
    // const [allList, setAllList] = useState<Array<Array<string>>>([])
    // 质数相关
    // const [primeObj, setPrimeObj] = useState({
    //     skuPrimeObj: {},
    //     availablePrimeList: [] as Array<number>
    // })
    // 选中的数据
    const [selectedObj, setSelectedObj] = useState<Record<any, string>>({})

    // pathFinder 对象
    const [pathFinder, setPathFinder] = useState<PathFinder>()

    const allList = skuList.reduce((pre, cur) => { 
        pre.push(cur.list)
        return pre
    }, [] as Array<Array<string>>)

    // 当前可选择的所有列表
    useEffect(() => { 
        
        // setAllList(skuList.reduce((pre, cur) => { 
        //     pre.push(cur.list)
        //     return pre
        // }, [] as Array<Array<string>>))

        setSelectedObj(skuList.reduce((pre, cur) => { 
            pre[cur.value] = []
            return pre
        }, {}))

    }, [skuList])

    // 通过质数 生成sku的值

    const allSkuArr = skuList.reduce((pre, cur) => [...pre, ...cur.list], [] as Array<string>)
    const primeArr = getPrimeList(allSkuArr.length)
    const skuPrimeObj = allSkuArr.reduce((pre, cur, index) => ({
        [cur]: primeArr[index],
        ...pre
    }), {})

    const primeObj = {
        skuPrimeObj,
        availablePrimeList: availableList.map(list => list.reduce((pre, cur) => { 
            return pre *  skuPrimeObj[cur]
        }, 1))
    }
    // useEffect(() => {
        // const allSkuArr = skuList.reduce((pre, cur) => [...pre, ...cur.list], [] as Array<string>)
        // const primeArr = getPrimeList(allSkuArr.length)
        // const skuPrimeObj = allSkuArr.reduce((pre, cur, index) => ({
        //     [cur]: primeArr[index],
        //     ...pre
        // }), {})

        // setPrimeObj({
        //     skuPrimeObj,
        //     availablePrimeList: availableList.map(list => list.reduce((pre, cur) => { 
        //         return pre *  skuPrimeObj[cur]
        //     }, 1))
        // })
        
    // }, [availableList, skuList])

    useEffect(() => {
        setPathFinder(new PathFinder(allList.map(list => list.map((item: any) => { 
            return primeObj.skuPrimeObj[item]
        })), primeObj.availablePrimeList))
    }, [allList])

    const handleChange = (val, index: string) => { 
     

        const [x, y]: any = pathFinder._primeToIndexObj[primeObj.skuPrimeObj[val]]

        const valToPrime = primeObj.skuPrimeObj[val]
        if (!pathFinder._selected.includes(valToPrime)) { 
            pathFinder.add(x, y)
        } else {
            pathFinder.delete(x, y)
        }

        setSelectedObj(produce(selectedObj, draft => { 
            draft[index] =  draft[index] == val ? [] :  val 
        }))

        setPathFinder(pathFinder)
    }


    return <>

        <Form>
            {
                skuList.map((skuItem, rowIndex) => <Form.Item label={skuItem.name} name={skuItem.value} key={rowIndex}>
                    {
                        skuItem.list.map<React.ReactNode>((item, colIndex) => (
                        <Checkbox
                            key={item}
                            checked={selectedObj[skuItem.value]?.includes(item)}
                            onChange={() => handleChange(item, skuItem.value)}
                            disabled={!pathFinder?.currentSelectedList?.[rowIndex]?.[colIndex]}
                            >
                            {item}
                            </Checkbox>
                        ))
                    }
                </Form.Item>)
            }


            <Form.Item label='当前可选择的组合'>
                {
                    availableList.map(item => <Checkbox  key={item.join(',')}>{item.join(',')}</Checkbox>)
                }
            </Form.Item>

        </Form>
        
    </>
}


export default Sku
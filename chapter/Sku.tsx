import { Radio, Form } from 'antd'
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
    const [allList, setAllList] = useState<Array<Array<string>>>([])
    // 质数相关
    const [primeObj, setPrimeObj] = useState({
        skuPrimeObj: {},
        availablePrimeList: [] as Array<number>
    })
    // 选中的数据
    const [selectedObj, setSelectedObj] = useState<Record<any, string>>({})

    // pathFinder 对象
    const [pathFinder, setPathFinder] = useState<PathFinder>()

    // 当前可选择的所有列表
    useEffect(() => { 
        setAllList(skuList.reduce((pre, cur) => { 
            pre.push(cur.list)
            return pre
        }, [] as Array<Array<string>>))

        setSelectedObj(skuList.reduce((pre, cur) => { 
            pre[cur.value] = []
            return pre
        }, {}))

    }, [skuList])

    // 通过质数 生成sku的值
    useEffect(() => {
        const allSkuArr = skuList.reduce((pre, cur) => [...pre, ...cur.list], [] as Array<string>)
        const primeArr = getPrimeList(allSkuArr.length)
        const skuPrimeObj = allSkuArr.reduce((pre, cur, index) => ({
            [cur]: primeArr[index],
            ...pre
        }), {})

        setPrimeObj({
            skuPrimeObj,
            availablePrimeList: availableList.map(list => list.reduce((pre, cur) => { 
                return pre *  skuPrimeObj[cur]
            }, 1))
        })
        
    }, [availableList, skuList])

    useEffect(() => {
        setPathFinder(new PathFinder(allList.map(list => list.map((item: any) => { 
            return primeObj.skuPrimeObj[item]
        })), primeObj.availablePrimeList))
    }, [allList, primeObj])

    const handleChange = (val: Event, index: string) => { 
        setSelectedObj(produce(selectedObj, draft => { 
            draft[index] = val.target.value
        }))

        // pathFinder.add(...pathFinder._primeToIndexObj(primeObj.skuPrimeObj[val.target.value]))
    }

    console.log(pathFinder, 'pathFinder')

    return <>

        <Form>
            {
                skuList.map((skuItem, rowIndex) => <Form.Item label={skuItem.name} name={skuItem.value}>
                    <Radio.Group
                        onChange={(val) => handleChange(val, skuItem.value)}
                        value={selectedObj[skuItem.value]}
                    >
                        {
                            skuItem.list.map((item, colIndex) => <Radio.Button disabled={ pathFinder?.currentSelectedList[rowIndex][colIndex] } value={item}>{item}</Radio.Button>)
                        }
                    </Radio.Group>
                </Form.Item>)
            }


            <Form.Item label='当前可选择的组合'>
                {
                    availableList.map(item => <Radio.Button value={item.join(',')}>{item.join(',')}</Radio.Button>)
                }
            </Form.Item>

        </Form>
        
    </>
}


export default Sku
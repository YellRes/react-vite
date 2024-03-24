import { Radio, Form } from 'antd'
import { useEffect, useState } from 'react'
import { traverse, getPrimeList } from './util'
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

    // 当前可选择的所有列表
    useEffect(() => { 
        setAllList(traverse(skuList.reduce((pre, cur) => { 
            pre.push(cur.list)
            return pre
        }, [] as Array<Array<string>>)))
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

    console.log(primeObj, 'primeObj')
    console.log(availableList, 'primeObj')
    
    return <>
        <Form>
            {
                skuList.map(skuItem => <Form.Item label={skuItem.name} name={skuItem.value}>
                    <Radio.Group>
                        {
                            skuItem.list.map(item => <Radio.Button value={item}>{item}</Radio.Button>)
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
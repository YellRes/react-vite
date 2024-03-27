
import { createBrowserRouter } from 'react-router-dom'
import Chapter01 from './chapter/1'
import Sku from './chapter/Sku'

const props = {
    skuList: [
        {
            name: '颜色',
            value: 'color',
            list: ['黑色', '白色']
        },
        {
            name: '性别',
            value: 'gender',
            list: ['男裤', '女裤']
        },
        {
            name: '尺码',
            value: 'size',
            list: ['S', 'L']
        },
    ],
    availableList: [["男裤", "黑色", "L"],["男裤", "白色", "L"], ["女裤", "白色", "S"]]
}


const router = createBrowserRouter([
    {
        path: '/01',
        element: <Chapter01/>
    },
    {
        path: '/sku',
        element: <Sku {...props} />
    }
])

export default router
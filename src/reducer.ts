
export interface Data { 
    result: number
}

export interface Action {
    type: 'add' | 'minus',
    num: number
}
export function reducer(state: Data, action: Action) { 
    switch (action.type) { 
        case 'add':
            return {
                result: state.result + action.num
            }
        
        case 'minus':
            return {
                result: state.result - action.num
            }
    }
}


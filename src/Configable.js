import React, { Component } from 'react'
import { Form, Input, Select, Radio, Checkbox, DatePicker } from 'antd'

class Configable extends Component {
    constructor(){
        super()
        this.state={
            configList: getConfig()
        }
    }
    __getItem = (config) => {
        switch (config.type) {
            case 'input': 
                return <Input onChange={(e)=>{this.handleInputChange(e, config)}} />
            case 'select': return <Select />
            case 'radio': return <Radio>{config.id}</Radio>
            case 'checkbox': return <Checkbox >{config.id}</Checkbox >
            case 'datePicker': return <DatePicker />
            default:
                return <Input />
        }
    }
    handleInputChange=(e, config)=>{
        const val = e.target.value
        config && config.eventHandle && this.handleSetState(config.eventHandle(val, config))
    }
    handleSetState=(state)=>{
        if(!state || (typeof(state) !== 'object')) return
        this.setState({
            ...this.state,
            ...state
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        return (
            <Form layout='horizontal'>
                {this.state.configList.map((item, i) => {
                    return (item.unrender ? null :
                        <Form.Item
                            {...formItemLayout}
                            label={item.label}
                            key={i}
                        >
                            {
                                this.__getItem(item)
                            }
                        </Form.Item>)
                })}
            </Form>
        )
    }
}

const type = {
    'input':{
        handle:(val, config, callback)=>{
            let configList = null
            let g = config ? config.group : null
            if(!isNaN(val) && !isNaN(g) && (g % 2)){
                configList = getConfig('input',
                                        val, 
                                        new Set([g - 1,g + 1]))
            }
            return configList ? {configList} : configList
        }
    },
    'select':{
        
    },
    'radio':{
        
    },
    'checkbox':{
        
    },
    'datePicker':{
        
    }
}

const getConfig = (t, n, g) => {
    const list = []
    // const tConfig = {
    //     1:['input'],
    //     3:['select'],
    //     5:['radio'],
    //     7:['checkbox'],
    //     9:['datePicker']
    // }
    for (let i = 0; i < 10; i++) {
        // const temp = tConfig[i] || tConfig[i + 1]
        // console.log(temp)
        let cs = []
        for(let key in type){
            const item = type[key]
            cs.push({
                group:i,
                label: `${key}${i}`,
                type: key,
                id: `${key}${i}`,
                eventHandle:item.handle
            })
            if(key === t && g.has(i)){
                for(let j = 1; j <= n - 1; j ++){
                    cs.push({
                        group:i,
                        label: `${key}${i}-${j}`,
                        type: key,
                        id: `${key}${i}-${j}`,
                        eventHandle:item.handle
                    })
                }
            }
        }
        i % 2 ? list.push(...cs) : list.push(...(cs.reverse()))
    }
    return list
}
export default Configable
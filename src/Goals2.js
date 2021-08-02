import React from 'react'

class Goals2 extends React.Component {
    constructor(props){
        super(props)
        this.goals=React.createRef()
        this.state={
            goalsQue:[],
            isBtnShow:false,
            handleIndex:-1,
            handleI:-1
        }
    }
    randomColor(){
        const color="0123456789ABCDEF"
        let res=""
        for(let i=0;i<6;++i){
            res+=color[Math.floor(Math.random()*16)]
        }
        return res
    }
    handleSubmit=(e)=>{

        e.preventDefault()
        let goalsQue = this.state.goalsQue
        let goalsItem=[]
        goalsItem.push(this.goals.current.value)
        goalsQue.push(goalsItem)
        this.goals.current.focus()
        this.goals.current.value=""
        console.log(goalsQue)
        this.setState({
            goalsQue
        })
        
    } 
    isShowIndex=(index)=>{
        if(!this.state.isBtnShow||(this.state.handleIndex!==index)||this.state.handleI!==-1){
            const eleStyle = {
                display:'none'
            }
            return eleStyle
        }
        return null
    }

    isShowI=(i)=>{
        if(!this.state.isBtnShow||(this.state.handleI!==i+2)){
            const eleStyle = {
                display:'none'
            }
            return eleStyle
        }
        return null
    }


    handleMouseEnter=(...args)=>{
        if(args.length===1)
            this.setState({
                isBtnShow:true,
                handleIndex:args[0],
                handleI:-1
            })
        else if(args.length>1){
            this.setState({
                isBtnShow:true,
                handleIndex:args[0],
                handleI:args[1]
            })
            console.log(args[1])
        }
    }
    handleMouseLeave=()=>{
        this.setState({
            isBtnShow:false,
            handleIndex:-1,
            handleI:-1
        })
    }
    pushColor = (index,color)=>{
        let goalsQue=this.state.goalsQue
        goalsQue[index].push(color)
        this.setState({
            goalsQue
        })
    }
    handleColor = (index)=>{
        const itemStyle = {
            display:'inline-block',
            // width:this.state.trans*10,
            height: 30,
            color:'white',
            lineHeight:'30px',
            backgroundColor: `#${this.randomColor()}`,
            textAlign:'center',
            padding:10
        }
        if(this.state.goalsQue[index].length>1){
            itemStyle.backgroundColor=this.state.goalsQue[index][1]
        }else{
            this.pushColor(index,itemStyle.backgroundColor)
        }
        return itemStyle
    }
    addTask=(index)=>{
        let goalsQue =this.state.goalsQue
        goalsQue[index].push(this.goals.current.value)
        this.setState({goalsQue})
        this.goals.current.value=""
    }
    handleWork=(index,i)=>{
        let item = this.state.goalsQue[index][i]
        let trans = this.goals.current.value
        this.props.getGoalsTask(item,trans)
        this.goals.current.value=""
    }
    render(){
         
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="input your goals" ref={this.goals} />
                    <input type="submit" value="Go"/>
                </form>
                {
                    this.state.goalsQue.map((item,index)=>{
                        return (<div key={index} >
                            <span style={{...this.handleColor(index),color:'black'}} onMouseEnter={()=>this.handleMouseEnter(index)} 
                        onMouseLeave={this.handleMouseLeave}>{item[0]}
                                <button style={this.isShowIndex(index)} onClick={()=>this.addTask(index)}>add</button>
                            </span>
                            
                            <span >
                                {
                                    item.map((value,i)=>{
                                        if(i>1)
                                            return <span style={this.handleColor(index)} key={i} onMouseEnter={()=>this.handleMouseEnter(index,i)} 
                                            onMouseLeave={this.handleMouseLeave}>{value}<button style={this.isShowI(index,i)} onClick={()=>this.handleWork(index,i)}>work</button></span>
                                        else 
                                            return null
                                    })
                                }
                            </span>
                        </div>);
                    })
                }
            </div>
        )
    }
}

export default Goals2
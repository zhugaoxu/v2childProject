<template>
    <div class="mainShow">
       展示的子项目233
    </div>
  </template>
    
  <script>
  
  
  export default {
    name: 'App',
    data() {
      return {
  
    
      }
    },

    mounted() {
        // 当数据发生改变的时候  监听到 进行操作
        window.microApp.addDataListener((data) => {
            // 当基座下发跳转指令时进行跳转
            console.log(data)
        })
        // 获取到主项目传的值
        const datax = window.microApp.getData();
        console.log("datax", datax)

    

        // 发送数据到主项目
        setTimeout(() => {
            window.microApp.dispatch({ type: '子应用发送的数据' })
        }, 2000)
        
        // 监听下全局的数据的改变
        window.microApp.addGlobalDataListener((globalData) => {
            console.log(globalData)
        })
    },
   
  
  }
  </script>
    
  
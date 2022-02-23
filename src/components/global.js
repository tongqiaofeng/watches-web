import Vue from "vue"

function changeStr(str) {
  // charAt(0) 去字符的第一个字节
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('.', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  // 第i个
  const config = requireComponent(fileName)
  // console.log(config)
  const componentName = changeStr(
    fileName.replace(/(\.\/)(?:[^\/]*\/)/,'').replace(/\.\w+$/,'')  
  )
  // console.log(componentName)
  Vue.component(componentName,config.default || config)
})
import $ from 'jquery'
import api from "@/assets/js/api.js";
import {setItem,getItem,clearItem} from "@/assets/js/session.js"
//获取用户资源权限列表
export function handleUserInfo(){
    if(getItem("sourceList")){
        return $.Deferred().resolve(true)
    }else{
        return api.getSessionUser().then((res)=>{
            if(res&&res.divisionIds){
                setItem("sourceList",JSON.stringify(res.resourceIds))
                setItem("username",res.name)
                return true
            }else{
                return false
            }
        },(err)=>{
            return false
        })
    } 
}
//人工填报授权处理
export function authArtificialPost(id="402881d162d65a7c0162d679d5480044",flag=2,pid){
    return api.getUserAuthInfo({id,flag,pid}).then(res=>{
        if(res.status==1&&res.data){
            return $.Deferred().resolve(res.data.length>0?true:false)
        }else{
            return $.Deferred().resolve(false) 
        } 
    },err=>{
        return $.Deferred().resolve(false)
    })
}


//清楚本地权限数据
export function clearUserAuthList(){
    clearItem("sourceList")
}



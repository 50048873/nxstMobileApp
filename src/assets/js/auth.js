import $ from 'jquery'
import api from "@/assets/js/api.js";
import {setItem,getItem} from "@/assets/js/session.js"
export function handleUserInfo(){
    if(getItem("sourceList")){
        return $.Deferred().resolve(true)
    }else{
        return api.getSessionUser().then((res)=>{
            if(res&&res.divisionIds){
                setItem("sourceList",JSON.stringify(res.resourceIds))
                return true
            }else{
                return false
            }
        },(err)=>{
            return false
        })
    } 
}

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
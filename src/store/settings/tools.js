import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		tools:[],
	},
	getters:{
		tools:state => state.tools,
	},
	mutations:{
		allTool:(state,val) => {
			val.forEach(function(item,index){
				item.tools_status == 1 ? item.tools_status = '启用' : item.tools_status = '禁用';
			});
			state.tools = val;
		}
	},
	actions:{
		saveTool:(context,form) => {
			return new Promise((resolve,reject)=>{
			//add:
				if(form.tools_id==undefined){//如果id不存在，执行添加。
					axios.post(bp+'/manager/add_tools',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllTool');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
			//update:
				}else{  //否则执行修改。
					axios.post(bp+'/manager/update_tools',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllTool');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
				}
			});
		},
		//find:
		findAllTool:(context) => {
			axios.post(bp+'/manager/show_tools').then(({data})=>{
				context.commit('allTool',data);
			});
		},
		//queryKeys:
		findTool:(context,Tool) => {
			axios.post(bp+'/manager/show_tools',qs.stringify(Tool)).then(({data})=>{
				context.commit('allTool',data);
			});
		},
		//delete:
		deleteByIdTool:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/delete_tools',qs.stringify(ids)).then((result)=>{
					context.dispatch('findAllTool');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	}
}



﻿Ext.define('Rich.ux.Container',{
    //extend: 'Ext.container.Container',
	override:'Ext.container.Container',
    requires:[],
	sep:'>',
	sepi:'-i',
	order:function(path,fn,args,scope){
		var ps = path;
		if(typeof path == 'string')
		{
			ps = path.split(this.sep);
		}
		if(this.onOrder)
		{
			if(this.onOrder(ps,fn,args,scope)===false)
			return this;
		}
		var itm = this.findI([].concat(ps));
		if(itm){
			return itm.action(fn,args,scope);
		}else{
			var it = ps.shift();
			if(''== it){it = ps.shift();}
			itm = this.findI(it);
			if(itm && itm.order)
			{
				return itm.order(ps,fn,args,scope);
			}else if(itm && (ps.length ==0 || ''==ps[0]))
			{
				return itm.action(fn,args,scope);
			}else{return false;}
		}
	},
	findI:function(path){
		var ps = path;
		if(typeof path == 'string')
		{
			ps = path.split(this.sep);
		}
		var it = ps.shift();
		if(''== it){it = ps.shift();}
		if(it)
		{
			if(it.indexOf(this.sepi)!=-1)
			{
				var idx = parseInt(it);
				it = isNaN(idx)?it:idx;
			}
			var tmp = this.lookupI(it);
			if(tmp)
			{
				if(tmp.findI)
				{
					return tmp.findI(ps);
				}else if(ps.length ==0)
				{
					return tmp;
				}
			}
			return null;
		}else{
			return this;
		}
	},
	lookupI:function(comp,dockeds){
		var xtp = this.getXTypes();
		if(xtp.indexOf('editorgrid') == -1 && xtp.indexOf('grid') == -1 && this.items && this.items.get){//不是表格
			for(var i = 0,tmp, len = this.items.length; i < len; i++){
				tmp = this.getItem(i);
				if(tmp.getItemId() == comp)//假设comp传入的一定是字符串
				{
					return tmp;
				}else if(tmp.isContainer){
					var back =  tmp.lookupI(comp,dockeds);
	        		if(back!=null&&back!='undefined'){
	        			return back;
	        		}
				}
			}
		}
		if(dockeds && this.isDockingContainer){
			for(var j = 0,tmp2, len2 = this.dockedItems.length; j < len2; j++){
				tmp2 = this.getDockedComponent(j);
				if(tmp2.getItemId() == comp){
					return tmp2;
				}else if(tmp2.isContainer){
	        		var back2 =  tmp2.lookupI(comp,dockeds);
	        		if(back2!=null&&back2!='undefined'){
	        			return back2;
	        		}
				}
			}
		}
		return null;
	},
	getItem : function(comp){
        if(typeof comp == 'object'){
            return comp;
        }
        if(this.items && this.items.get)
        {
        	return this.items.get(comp);
        }else{
        	return null;
        }
    }
});
app.controller('brandController',function($scope,$controller,brandService){
	
	$controller('baseController',{$scope:$scope});//继承 
    		//读取列表数据绑定到表单中
    		$scope.findAll=function(){
    			brandService.findAll().success(
    				function(response){
    					$scope.list=response;
    				}		
    			);
    		}
    		
    		
    		
    		//分页
    		$scope.findPage=function(page,rows){
    			brandService.findPage().success(
    					function(response){
    						$scope.list=response.rows;
    						$scope.paginationConf.totalItems=response.total;//更新总记录数
    					}
    			);
    		}
    		
    		//添加
    		$scope.add=function(){
    			var object=null;//方法名称
    			if($scope.entity.id!=null){
    				object=brandService.update($scope.entity);//执行修改方法
    			}else{
    				object=brandService.add($scope.entity);
    			}
    			
    			object.success(
    				function(response){
    					if(response.success){
    						$scope.reloadList();//刷新
    					}else{
    						alert(response.message);
    					}
    				}	
    			);
    		}
    		
    		//查询实体
    		$scope.findOne=function(id){
    			brandService.findOne(id).success(
    				function(response){
    					$scope.entity=response;
    				}	
    			);
    		}
    		
    		
    		
    		
    		//批量删除
    		$scope.dele=function(){
    			//获取选中的复选框
    			brandService.dele($scope.selectIds).success(
    				function(response){
    					if(response.success){
    						$scope.reloadList();//刷新列表
    						
    					}else{
    						alert(response.message);
    					}
    				}	
    			);
    		}
    		
    		$scope.searchEntity={};
			//条件查询 
			$scope.search=function(page,size){
				
				brandService.search(page,size,$scope.searchEntity).success(
					function(response){
						$scope.list=response.rows;//给列表变量赋值
						$scope.paginationConf.totalItems=response.total;//更新总记录数 
					}		
				);	
				
			}
    	});
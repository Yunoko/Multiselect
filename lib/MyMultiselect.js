;(function($){
    window.MyMultiselect = function(options){
        var defaults = {
            mulWrap : "#multiselectWrap",
            mulLeft : ".multiselect-left",  // 待选框
            mulRight: ".multiselect-rigth", // 结果框
            mulBtn  : ".multiselect-add",   // 选择按钮
            mulDataType : {
                id : 'id',
                name: 'name',
                subList : 'subList'
            },
            mulData : null 
        };
        var settings = $.extend(defaults,options||{});
        // 初始化节点
        var $mulWrap = $(settings.mulWrap),
            $mulLeft = $(settings.mulLeft),
            $mulRight= $(settings.mulRight),
            $mulBtn  = $(settings.mulBtn);

        // 生成数据树
        var createTree = function(data){
            var html = [];
            if(data.length){
                html.push('<ul class="first-list">');
                $.each(data,function(i,j){
                    if(j[settings.mulDataType.subList]){
                        html.push('<li><span class="first-cate"><i class="icon-select-hander "></i><input type="checkbox" data-name="'+j[settings.mulDataType.name]+'" value="'+j[settings.mulDataType.id]+'"/>'+j[settings.mulDataType.name]+'</span><ul class="second-list">' );
                        $.each(j.subList,function(k,l){
                            if(l.subList){
                                html.push('<li><span class="second-cate"><i class="icon-select-hander"></i><input type="checkbox" data-name="'+l[settings.mulDataType.name]+'" value="'+l[settings.mulDataType.id]+'"/>'+l[settings.mulDataType.name]+'</span><ul class="third-list">' );
                                $.each(l.subList,function(n,m){
                                    html.push('<li><span class="third-cate"><input type="checkbox" data-name="'+m[settings.mulDataType.name]+'" value="'+m[settings.mulDataType.id]+'" />'+m[settings.mulDataType.name]+'</span></li>' );
                                });
                                html.push('</li></ul>');
                            }else{
                                html.push('<li><span class="second-cate"><input type="checkbox" data-name="'+l[settings.mulDataType.name]+'" value="'+l[settings.mulDataType.id]+'" />'+l[settings.mulDataType.name]+'</span></li>' );
                            }
                        });
                        html.push('</li></ul>');
                    }else{
                        html.push('<li><span class="first-cate"><input type="checkbox" data-name="'+j[settings.mulDataType.name]+'" value="'+j[settings.mulDataType.id]+'"/>'+j[settings.mulDataType.name]+'</span></li>' );

                    }
                });
                html.push('</ul>');
            }
            return html.join("");
        };
        var createData = function(){
            var firstArr = [];
            $mulWrap.find('.first-list>li').each(function(i,j){
                var firstObj = {};
                var $this = $(this);
                var $input = $this.children('span').find('input');
                if($input.prop('checked')){
                    firstObj[settings.mulDataType.id] = $input.val();
                    firstObj[settings.mulDataType.name] = $input.attr('data-name');
                    if($this.children('ul').length){
                        var secondArr = [];
                        $this.children('ul').children('li').each(function(k,l){
                            var $that = $(this);
                            var secondObj = {} ;
                            var $input = $that.children('span').find('input');
                            if($input.prop('checked')){
                                secondObj[settings.mulDataType.id] = $input.val();
                                secondObj[settings.mulDataType.name] = $input.attr('data-name');
                                if($that.children('ul').length){
                                    var thirtArr = [];
                                    $that.children('ul').children('li').each(function(n,m){
                                        var $those = $(this);
                                        var $input = $those.children('span').find('input');
                                        if($input.prop('checked')){
                                            thirtArr.push({id:$input.val(),name:$input.attr('data-name')});
                                        }
                                    });
                                    secondObj[settings.mulDataType.subList] = thirtArr;
                                }
                            }
                            secondArr.push(secondObj);
                        });
                        firstObj[settings.mulDataType.subList] = secondArr;
                    }
                    firstArr.push(firstObj);
                    
                }
            });
            return firstArr;
        };
        var bindEvents = function(){
            $mulWrap.on('change','input:checkbox',function(e){
                var $this = $(this) ;
                var $eleUl = $this.parent().siblings('ul');
                if($this.prop('checked')){
                    $.each($eleUl.find('input'),function(o,p){
                        $(p).prop("checked",true);
                    });
                }else{
                    $.each($eleUl.find('input'),function(o,p){
                        $(p).prop("checked",false);
                    });
                }

            });
            $mulWrap.on('click','.icon-select-hander',function(){
                var $this = $(this);
                if($this.hasClass('icon-select-hander-more')){
                    $this.removeClass('icon-select-hander-more').parent().siblings('ul').slideUp(300);
                }else{
                    $this.addClass('icon-select-hander-more').parent().siblings('ul').slideDown(300);
                }
            });
            $mulBtn.on('click',function(){
                $mulRight.html(createTree(createData()));
            });

        }
        var init = function(){
            $mulLeft.html(createTree(data.list));
            bindEvents();
        };
        // 初始化
        init();

    }
})(jQuery);
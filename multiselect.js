
function createTree(data){
    var html = [];
    if(data.length){
        html.push('<ul class="first-list">');
        $.each(data,function(i,j){
            if(j.subList){
                html.push('<li><span class="first-cate"><i class="icon-select-hander "></i><input type="checkbox" data-name="'+j.name+'" value="'+j.id+'"/>'+j.name+'</span><ul class="second-list">' );
                $.each(j.subList,function(k,l){
                    if(l.subList){
                        html.push('<li><span class="second-cate"><i class="icon-select-hander"></i><input type="checkbox" data-name="'+l.name+'" value="'+l.id+'"/>'+l.name+'</span><ul class="third-list">' );
                        $.each(l.subList,function(n,m){
                            html.push('<li><span class="third-cate"><input type="checkbox" data-name="'+m.name+'" value="'+m.id+'" />'+m.name+'</span></li>' );
                        });
                        html.push('</li></ul>');
                    }else{
                        html.push('<li><span class="second-cate"><input type="checkbox" data-name="'+l.name+'" value="'+l.id+'" />'+l.name+'</span></li>' );
                    }
                });
                html.push('</li></ul>');
            }else{
                html.push('<li><span class="first-cate"><input type="checkbox" data-name="'+j.name+'" value="'+j.id+'"/>'+j.name+'</span></li>' );

            }
        });
        html.push('</ul>');
    }
    return html.join("");
}

function createData(){
    var firstArr = [];
    $('.first-list>li').each(function(i,j){
        var firstObj = {};
        var $this = $(this);
        var $input = $this.children('span').find('input');
        if($input.prop('checked')){
            firstObj.id = $input.val();
            firstObj.name = $input.attr('data-name');
            if($this.children('ul').length){
                var secondArr = [];
                $this.children('ul').children('li').each(function(k,l){
                    var $that = $(this);
                    var secondObj = {} ;
                    var $input = $that.children('span').find('input');
                    if($input.prop('checked')){
                        secondObj.id = $input.val();
                        secondObj.name = $input.attr('data-name');
                        if($that.children('ul').length){
                            var thirtArr = [];
                            $that.children('ul').children('li').each(function(n,m){
                                var $those = $(this);
                                var $input = $those.children('span').find('input');
                                if($input.prop('checked')){
                                    thirtArr.push({id:$input.val(),name:$input.attr('data-name')});
                                }
                            });
                            secondObj.subList = thirtArr;
                        }
                    }
                    secondArr.push(secondObj);
                });
                firstObj.subList = secondArr;
            }
            firstArr.push(firstObj);
            
        }
    });
    return firstArr;
}
function bindEvents(){
    $('#multiselectWrap ').on('change','input:checkbox',function(e){
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
    $('#multiselectWrap ').on('click','.icon-select-hander',function(){
        var $this = $(this);
        if($this.hasClass('icon-select-hander-more')){
            $this.removeClass('icon-select-hander-more').parent().siblings('ul').slideUp(300);
        }else{
            $this.addClass('icon-select-hander-more').parent().siblings('ul').slideDown(300);
        }
    });
    $('.multiselect-add').on('click',function(){
        $('.multiselect-rigth').html(createTree(createData()));
    });
}
function init(){
    $('.multiselect-left').html(createTree(data.list));
    bindEvents();
}

init();
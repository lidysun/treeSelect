layui.use(['jquery', 'form', 'treeSelect'], function() {
    var $ = layui.$;
    var form = layui.form;
    var TreeSelect = layui.treeSelect;
    var address = new TreeSelect({
        ele: $('#j_form1'), //渲染form元素
        s1: 'provid', //form内的 省filter
        s2: 'cityid', //form内的 市filter
        s3: 'areaid', //form内的 区filter
        province: null, //省值 默认广东省 440000 
        city: null, //市值 默认深圳市 440300 
        district: null //区值 默认福田区 440304 
    });
    var address2 = new TreeSelect({
        ele: $('#j_form2'),
        s1: 'provid2',
        s2: 'cityid2',
        s3: 'areaid2',
        province: 130000,
        city: 130200,
        district: 130208
    });
});
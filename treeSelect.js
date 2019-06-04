;
layui.define(['jquery', 'form', 'addressData'], function(exports) {
    var $ = layui.$;
    var form = layui.form;
    var layer = layui.layer;
    var addressData = layui.addressData;
    var TreeSelect = function(config) {
        config.province = config.province ? config.province : 440000;
        config.city = config.city ? config.city : 440300;
        config.district = config.district ? config.district : 440304;
        this.$form = config.ele;
        this.config = config;
        this.init();
    }
    //生成
    TreeSelect.prototype.appendOptionTo = function($o, k, v, d) {
        var $opt = $("<option>").text(k).val(v);
        if (v == d) {
            $opt.attr("selected", "selected");
        }
        $opt.appendTo($o);
    }
    //监听
    TreeSelect.prototype.listen = function(filter, callback) {
        var _that = this;
        form.on('select(' + filter + ')', function(data) {
            var $select = $(data.elem);
            var type = $select.attr('class').replace(/[^province|city|district]/g, '');
            _that.config[type] = data.value;
            callback && callback(data);
        });
    };

    //渲染结构
    TreeSelect.prototype.renderProvince = function() {
        var _that = this;
        $.each(addressData, function(k, v) {
            _that.appendOptionTo(_that.$form.find('select[name=' + _that.config.s1 + ']'), k, v.val, _that.config.province);
        });
        form.render();
        _that.listen(_that.config.s1, function(data) {
            _that.renderCity(data);
            _that.renderDistrict(_that.config);
        });
    }
    TreeSelect.prototype.renderCity = function(data) {
        var _that = this;
        _that.$form.find('select[name=' + _that.config.s2 + ']').html("<option value=''>请选择市</option>");
        _that.config.province = data.value ? data.value : _that.config.province;
        $.each(addressData, function(k, v) {
            if (v.val == _that.config.province) {
                if (v.items) {
                    $.each(v.items, function(kt, vt) {
                        _that.appendOptionTo(_that.$form.find('select[name=' + _that.config.s2 + ']'), kt, vt.val, _that.config.city);
                    });
                }
            }
        });
        form.render();
        _that.listen(_that.config.s2, function(data) {
            _that.renderDistrict(data);
        });
    }
    TreeSelect.prototype.renderDistrict = function(data) {
        var _that = this;
        _that.$form.find('select[name=' + _that.config.s3 + ']').html("<option value=''>请选择县/区</option>");
        _that.config.city = data.value ? data.value : _that.config.city;
        $.each(addressData, function(k, v) {
            if (v.val == _that.config.province) {
                if (v.items) {
                    $.each(v.items, function(kt, vt) {
                        if (vt.val == _that.config.city) {
                            $.each(vt.items, function(ka, va) {
                                _that.appendOptionTo(_that.$form.find('select[name=' + _that.config.s3 + ']'), ka, va, _that.config.district);
                            });
                        }
                    });
                }
            }
        });
        form.render();
        _that.listen(_that.config.s3);
    }

    //初始化
    TreeSelect.prototype.init = function() {
        this.renderProvince(this.config);
        this.renderCity(this.config);
        this.renderDistrict(this.config);
    };
    exports('treeSelect', TreeSelect);
});
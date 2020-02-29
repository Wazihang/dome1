$(function () {
    var form = layui.form

    form.verify({

        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            var pwd = $('[name=oldPwd]').val()
            if (value === pwd) {
                return '新旧密码不能重复！'
            }
        },
        samePwd: function (value) {
            var pwd = $('[name=newPwd]').val()
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })


    $('#form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')

                $('#form')[0].reset()
            }
        })
    })
})
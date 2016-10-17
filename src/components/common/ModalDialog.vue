<template>
    <div>
        <div class="modal fade" id="userInfo" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">{{dialog.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <p>{{dialog.body}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default">确定</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['dialog']
    };
</script>

<style>

</style>
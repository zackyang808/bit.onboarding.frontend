BitUtil = {};

BitUtil.notification = {};

BitUtil.notification.show = function (message, type, onCloseCallback, onOpenCallBack) {
    var notification = new NotificationFx({
        wrapper: document.getElementById('main-content') || document.body,
        message: message,
        //layout: 'bar',
        //effect: 'slidetop',
        layout: 'growl',
        effect: 'jelly',
        type: type,
        ttl: 2000,
        //closeTime: 5000,
        onClose: function () {
            if (onCloseCallback) onCloseCallback();
            else return false;
        },
        onOpen: function () {
            if (onOpenCallBack) onOpenCallBack();
            else return false;
        }
    });

    notification.show();
}
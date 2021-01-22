var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };

    return {
        SetElement: function () {
            $('#btnCreate').click(function () { });
            var Calendar = FullCalendar.Calendar;
            var Draggable = FullCalendar.Draggable;

            var containerEl = document.getElementById('external-events');
            var calendarEl = document.getElementById('calendar');

            var draggable = new Draggable(containerEl, {
                itemSelector: '.fc-event',
                dragRevertDuration:500,
                eventData: function (eventEl) {
                    return {
                        id: "Event" + $(eventEl).data('id'),
                        title: $.trim($(eventEl).text()),
                        stick: true,
                        color: $(eventEl).data('color'),
                        textColor: $(eventEl).data('textcolor'),
                    };
                }
            });
            var calendar = new Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                initialDate: '2020-08-07',
                navLinks: true,
                editable: true,
                eventLimit: true,
                droppable: true,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                events: [
                    {
                        title: 'All Day Event',
                        start: '2020-08-01'
                    },
                    {
                        title: 'Long Event',
                        start: '2020-08-07',
                        end: '2020-08-10'
                    },
                    {
                        groupId: '999',
                        title: 'Repeating Event',
                        start: '2020-08-09 16:00:00'
                    },
                    {
                        groupId: '999',
                        title: 'Repeating Event',
                        start: '2020-08-16T16:00:00'
                    },
                    {
                        title: 'Conference',
                        start: '2020-08-11',
                        end: '2020-08-13'
                    },
                    {
                        title: 'Meeting',
                        start: '2020-08-12T10:30:00',
                        end: '2020-08-12T12:30:00'
                    },
                    {
                        title: 'Lunch',
                        start: '2020-08-12T12:00:00'
                    },
                    {
                        title: 'Meeting',
                        start: '2020-08-12T14:30:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2020-08-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2020-08-28'
                    }
                ],
                navLinkDayClick: function (date, jsEvent) {//點擊日期數字事件
                    console.log('day', date.toISOString());
                    console.log('coords', jsEvent.pageX, jsEvent.pageY);
                },
                viewRender: function (view, element) {//切換月份觸發事件
                    console.log(view.title);
                    var Year = view.title.split(' ')[1];
                    var Month = view.title.split(' ')[0];
                    var Mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    for (var i = 0; i < Mon.length; i++) {
                        if (Mon[i] == Month) {
                            Month = i;
                            break;
                        }
                    }
                },
                drop: function (data) {//從左側事件拖拉到日曆上
                    var Et = $(data.jsEvent.target);
                    var Cid = Et.data('id');
                    console.log(Cid);
                },
                eventDrop: function (data) {//拖拉已經再日曆上的事件
                    console.log(data.event.id + " was dropped on " + data.event.start);
                    console.log(data.event);
                },
                eventClick: function (data) { //點選事件 事件
                    console.log('Event: ' + data.event.title);

                    //移除事件的方法
                    //var Event = calendar.getEventById(data.event.id);
                    //Event.remove();
                },
                eventChange: function (data) {//改變事件時間 事件
                    console.log('EventChange:', data);
                },
                dateClick: function (info) {//點擊日期方格內 事件
                    console.log('您點擊了' + info.dateStr + '。資訊:', info);
                },
                eventTimeFormat: { 
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false
                }
            });

            calendar.render();

            //calendar.addEvent
        },
    };
}();

function SetElement() {
    Module.SetElement();
}
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { defaultEvents } from './defaultEvents';
import {
    Eventcalendar,
    snackbar,
    setOptions,
    Popup,
    Button,
    Input,
    Textarea,
    Switch,
    Datepicker,
    SegmentedGroup,
    SegmentedItem,
} from '@mobiscroll/react';

setOptions({
    theme: 'ios',
    themeVariant: 'light',
});

const viewSettings = {
    calendar: { labels: true },
};

const now = new Date();

const responsivePopup = {
    medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false,
    },
};

function App() {
    const [myEvents, setMyEvents] = useState(defaultEvents);
    const [tempEvent, setTempEvent] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [start, startRef] = useState(null);
    const [end, endRef] = useState(null);
    const [popupEventTitle, setTitle] = useState('');
    const [popupEventDescription, setDescription] = useState('');
    const [popupEventAllDay, setAllDay] = useState(true);
    const [popupEventDate, setDate] = useState([]);
    const [popupEventStatus, setStatus] = useState('busy');
    const [mySelectedDate, setSelectedDate] = useState(now);

    useEffect(() => {
        const updatedDefaultEvents = localStorage.getItem('events')
            ? defaultEvents.concat(localStorage.getItem('events'))
            : null;
        setMyEvents(updatedDefaultEvents);
    }, []);

    useEffect(() => {
        localStorage.setItem('events', myEvents);
    }, [myEvents]);

    const saveEvent = useCallback(() => {
        const newEvent = {
            id: tempEvent.id,
            title: popupEventTitle,
            description: popupEventDescription,
            start: popupEventDate[0],
            end: popupEventDate[1],
            allDay: popupEventAllDay,
            status: popupEventStatus,
            color: popupEventStatus === 'busy' ? '#A52A2A' : '#26c57d',
        };
        if (isEdit) {
            // update the event in the list
            const index = myEvents.findIndex((x) => x.id === tempEvent.id);
            const newEventList = [...myEvents];

            newEventList.splice(index, 1, newEvent);

            setMyEvents(newEventList);

            // here you can update the event in your storage as well
            // ...
        } else {
            // add the new event to the list
            setMyEvents([...myEvents, newEvent]);
            // here you can add the event to your storage as well
            // ...
        }
        setSelectedDate(popupEventDate[0]);
        // close the popup
        setOpen(false);
    }, [
        isEdit,
        myEvents,
        popupEventAllDay,
        popupEventDate,
        popupEventDescription,
        popupEventStatus,
        popupEventTitle,
        tempEvent,
    ]);

    const deleteEvent = useCallback(
        (event) => {
            setMyEvents(myEvents.filter((item) => item.id !== event.id));
            setTimeout(() => {
                snackbar({
                    button: {
                        action: () => {
                            setMyEvents((prevEvents) => [...prevEvents, event]);
                        },
                        text: 'Undo',
                    },
                    message: 'Event deleted',
                });
            }, 500);
        },
        [myEvents]
    );

    const loadPopupForm = useCallback((event) => {
        setTitle(event.title);
        setDescription(event.description);
        setDate([event.start, event.end]);
        setAllDay(event.allDay || false);
        setStatus(event.status || 'busy');
    }, []);

    // handle popup form changes

    const titleChange = useCallback((ev) => {
        setTitle(ev.target.value);
    }, []);

    const descriptionChange = useCallback((ev) => {
        setDescription(ev.target.value);
    }, []);

    const allDayChange = useCallback((ev) => {
        setAllDay(ev.target.checked);
    }, []);

    const dateChange = useCallback((args) => {
        setDate(args.value);
    }, []);

    const statusChange = useCallback((ev) => {
        setStatus(ev.target.value);
    }, []);

    const onDeleteClick = useCallback(() => {
        deleteEvent(tempEvent);
        setOpen(false);
    }, [deleteEvent, tempEvent]);

    // scheduler options

    const onSelectedDateChange = useCallback((event) => {
        setSelectedDate(event.date);
    });

    const onEventClick = useCallback(
        (args) => {
            setEdit(true);
            setTempEvent({ ...args.event });
            // fill popup form with event data
            loadPopupForm(args.event);
            setAnchor(args.domEvent.target);
            setOpen(true);
        },
        [loadPopupForm]
    );

    const onEventCreated = useCallback(
        (args) => {
            // createNewEvent(args.event, args.target)
            setEdit(false);
            setTempEvent(args.event);
            // fill popup form with event data
            loadPopupForm(args.event);
            setAnchor(args.target);
            // open the popup
            setOpen(true);
        },
        [loadPopupForm]
    );

    const onEventDeleted = useCallback(
        (args) => {
            deleteEvent(args.event);
        },
        [deleteEvent]
    );

    const onEventUpdated = useCallback((args) => {
        // here you can update the event in your storage as well, after drag & drop or resize
        // ...
    }, []);

    // datepicker options
    const controls = useMemo(
        () => (popupEventAllDay ? ['date'] : ['datetime']),
        [popupEventAllDay]
    );
    const respSetting = useMemo(
        () =>
            popupEventAllDay
                ? {
                      medium: {
                          controls: ['calendar'],
                          touchUi: false,
                      },
                  }
                : {
                      medium: {
                          controls: ['calendar', 'time'],
                          touchUi: false,
                      },
                  },
        [popupEventAllDay]
    );

    // popup options
    const headerText = useMemo(
        () => (isEdit ? 'Edit event' : 'New Event'),
        [isEdit]
    );
    const popupButtons = useMemo(() => {
        if (isEdit) {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Save',
                    cssClass: 'mbsc-popup-button-primary',
                },
            ];
        } else {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Add',
                    cssClass: 'mbsc-popup-button-primary',
                },
            ];
        }
    }, [isEdit, saveEvent]);

    const onClose = useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary event
            setMyEvents([...myEvents]);
        }
        setOpen(false);
    }, [isEdit, myEvents]);

    return (
        <div>
            <Eventcalendar
                view={viewSettings}
                data={myEvents}
                clickToCreate='single'
                dragToCreate={true}
                dragToMove={true}
                dragToResize={true}
                selectedDate={mySelectedDate}
                onSelectedDateChange={onSelectedDateChange}
                onEventClick={onEventClick}
                onEventCreated={onEventCreated}
                onEventDeleted={onEventDeleted}
                onEventUpdated={onEventUpdated}
            />
            <Popup
                display='bottom'
                fullScreen={true}
                contentPadding={false}
                headerText={headerText}
                anchor={anchor}
                buttons={popupButtons}
                isOpen={isOpen}
                onClose={onClose}
                responsive={responsivePopup}
            >
                <div className='mbsc-form-group'>
                    <Input
                        label='Title'
                        value={popupEventTitle}
                        onChange={titleChange}
                    />
                    <Textarea
                        label='Description'
                        value={popupEventDescription}
                        onChange={descriptionChange}
                    />
                </div>
                <div className='mbsc-form-group'>
                    <Switch
                        label='All-day'
                        checked={popupEventAllDay}
                        onChange={allDayChange}
                    />
                    <Input ref={startRef} label='Starts' />
                    <Input ref={endRef} label='Ends' />
                    <Datepicker
                        select='range'
                        controls={controls}
                        touchUi={true}
                        startInput={start}
                        endInput={end}
                        showRangeLabels={false}
                        responsive={respSetting}
                        onChange={dateChange}
                        value={popupEventDate}
                    />
                    {/* <SegmentedGroup onChange={statusChange}>
                    <SegmentedItem value="busy" checked={popupEventStatus === 'busy'}>Show as busy</SegmentedItem>
                    <SegmentedItem value="free" checked={popupEventStatus === 'free'}>Show as free</SegmentedItem>
                </SegmentedGroup> */}
                    {/* ----------------------------------------------- */}
                    {/* CHANGING SHOW AS BUSY AND FREE TO OTHER */}
                    <SegmentedGroup onChange={statusChange}>
                        <SegmentedItem
                            value='busy'
                            checked={popupEventStatus === 'busy'}
                        >
                            Yet to Start
                        </SegmentedItem>
                        <SegmentedItem
                            value='free'
                            checked={popupEventStatus === 'free'}
                        >
                            In Progress
                        </SegmentedItem>
                    </SegmentedGroup>
                    {/* ----------------------------------------------- */}

                    {isEdit ? (
                        <div className='mbsc-button-group'>
                            <Button
                                className='mbsc-button-block'
                                color='danger'
                                variant='outline'
                                onClick={onDeleteClick}
                            >
                                Delete event
                            </Button>
                        </div>
                    ) : null}
                </div>
            </Popup>
        </div>
    );
}

export default App;

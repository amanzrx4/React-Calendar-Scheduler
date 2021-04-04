import React , {useState , useEffect} from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, snackbar, setOptions, Popup, Button, Input, Textarea, Switch, Datepicker, SegmentedGroup, SegmentedItem } from '@mobiscroll/react';

import { NavLink } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import { createEvent , getEvent } from '../../actions';
import { render } from '@testing-library/react';


setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const now = new Date();
// Changing this----------------------------------------------------------
/*
const defaultEvents = [{
    id: 1,
    start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
    end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
    title: 'Lunch @ Butcher\'s',
    color: '#26c57d'
}, {
    id: 2,
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
    title: 'General orientation',
    color: '#fd966a'
}, {
    id: 3,
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22),
    title: 'Dexter BD',
    color: '#37bbe4'
}, {
    id: 4,
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 30),
    title: 'Stakeholder mtg.',
    color: '#d00f0f'
}];
*/

// Changing this----------------------------------------------------------

const viewSettings = {
    calendar: { labels: true }
};
const responsivePopup = {
    medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false
    }
};

function App() {

    // -----------------------------------------------------------------

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getEvent())
    // }, [myEvents])
    let defaultEvents = [];

    const event = useSelector(state => state.event)
    const renderEvents = (event) => {
        console.log(event);

        for(let eve of event)
        {
            defaultEvents.push({
                title : eve.title,
                description : eve.description,
                start : eve.start+1,
                end : eve.end+1,  
                allDay : eve.allDay,
                color : eve.color,
                status : eve.status,
                userId:eve.userId,
            })
        }
        // return defaultEvents;    
    }
    // -------------------------------------------------------------------
    
    const [myEvents, setMyEvents] = React.useState(event);
    // console.log(myEvents);
    const [tempEvent, setTempEvent] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
    const [popupEventTitle, setTitle] = React.useState('');
    const [popupEventDescription, setDescription] = React.useState('');
    const [popupEventAllDay, setAllDay] = React.useState(true);
    const [popupEventDate, setDate] = React.useState([]);
    const [popupEventStatus, setStatus] = React.useState('busy');
    const [mySelectedDate, setSelectedDate] = React.useState(now);
// Changed This
    const dispatch = useDispatch();

// -----------------------------------------------

useEffect(() => {
    dispatch(getEvent())
} , [] )

var day = 60 * 60 * 24 * 1000;

// ---------------------------------------------
    const saveEvent = React.useCallback(() => {
        const newEvent = {
            id: tempEvent.id,
            title: popupEventTitle,
            description: popupEventDescription,
            start: popupEventDate[0] ,
            end: popupEventDate[1],
            allDay: popupEventAllDay,
            status: popupEventStatus,
            color: popupEventStatus==='busy' ? '#A52A2A' : '#26c57d'
            
        };
        if (isEdit) {
            // update the event in the list
            const index = myEvents.findIndex(x => x.id === tempEvent.id);;
            const newEventList = [...myEvents];

            newEventList.splice(index, 1, newEvent);
            setMyEvents(newEventList);
            // here you can update the event in your storage as well
            // ...
            dispatch(createEvent({
                title: popupEventTitle,
                description: popupEventDescription,
                start: new Date(popupEventDate[0].getTime() + day),
                end: new Date(popupEventDate[1].getTime() + day),
                allDay: popupEventAllDay,
                status: popupEventStatus,
                userId : localStorage.getItem('userId'),
                color: popupEventStatus==='busy' ? '#A52A2A' : '#26c57d'
            }));

            
        } else {
            // add the new event to the list
            setMyEvents([...myEvents, newEvent]);
            // here you can add the event to your storage as well
            // ...
            dispatch(createEvent({
                title: popupEventTitle,
                description: popupEventDescription,
                start: new Date(popupEventDate[0].getTime() + day),
                end: new Date(popupEventDate[1].getTime() + day),
                allDay: popupEventAllDay,
                userId : localStorage.getItem('userId'),
                status: popupEventStatus,
                color: popupEventStatus==='busy' ? '#A52A2A' : '#26c57d'
            }));
        }
        setSelectedDate(popupEventDate[0]);
        // close the popup
        setOpen(false);
    }, [isEdit, myEvents, popupEventAllDay, popupEventDate, popupEventDescription, popupEventStatus, popupEventTitle, tempEvent]);

    const deleteEvent = React.useCallback((event) => {
        setMyEvents(myEvents.filter(item => item.id !== event.id));
        setTimeout(() => {
            snackbar({
                // button: {
                //     action: () => {
                //         setMyEvents(prevEvents => [...prevEvents, event]);
                //     },
                //     text: 'Undo'
                // },
                message: 'Event deleted'
            });
        },500);
    }, [myEvents]);

    const loadPopupForm = React.useCallback((event) => {
        setTitle(event.title);
        setDescription(event.description);
        setDate([event.start, event.end]);
        setAllDay(event.allDay || false);
        setStatus(event.status || 'busy');
    }, []);

    // handle popup form changes

    const titleChange = React.useCallback((ev) => {
        setTitle(ev.target.value);
    }, []);

    const descriptionChange = React.useCallback((ev) => {
        setDescription(ev.target.value);
    }, []);

    const allDayChange = React.useCallback((ev) => {
        setAllDay(ev.target.checked);
    }, []);

    const dateChange = React.useCallback((args) => {
        setDate(args.value);
    }, []);

    const statusChange = React.useCallback((ev) => {
        setStatus(ev.target.value);
    }, []);

    const onDeleteClick = React.useCallback(() => {
        deleteEvent(tempEvent);
        setOpen(false);
    }, [deleteEvent, tempEvent]);

    // scheduler options

    const onSelectedDateChange = React.useCallback((event) => {
        setSelectedDate(event.date);
    });

    const onEventClick = React.useCallback((args) => {
        setEdit(true);
        setTempEvent({ ...args.event });
        // fill popup form with event data
        loadPopupForm(args.event);
        setAnchor(args.domEvent.target);
        setOpen(true);
    }, [loadPopupForm]);

    const onEventCreated = React.useCallback((args) => {
        // createNewEvent(args.event, args.target)
        setEdit(false);
        setTempEvent(args.event)
        // fill popup form with event data
        loadPopupForm(args.event);
        setAnchor(args.target);
        // open the popup
        setOpen(true);
    }, [loadPopupForm]);

    const onEventDeleted = React.useCallback((args) => {
        deleteEvent(args.event)
    }, [deleteEvent]);

    const onEventUpdated = React.useCallback((args) => {
        // here you can update the event in your storage as well, after drag & drop or resize
        // ...
    }, []);

    // datepicker options
    const controls = React.useMemo(() => popupEventAllDay ? ['date'] : ['datetime'], [popupEventAllDay]);
    const respSetting = React.useMemo(() => popupEventAllDay ? {
        medium: {
            controls: ['calendar'],
            touchUi: false
        }
    } : {
            medium: {
                controls: ['calendar', 'time'],
                touchUi: false
            }
        }, [popupEventAllDay]);

    // popup options
    const headerText = React.useMemo(() => isEdit ? 'Edit event' : 'New Event', [isEdit]);
    const popupButtons = React.useMemo(() => {
        if (isEdit) {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Save',
                    cssClass: 'mbsc-popup-button-primary'
                }
            ];
        }
        else {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Add',
                    cssClass: 'mbsc-popup-button-primary'
                }
            ];
        }
    }, [isEdit, saveEvent]);

    const onClose = React.useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary event
            setMyEvents([...myEvents]);
        }
        setOpen(false);
    }, [isEdit, myEvents]);

    return <div>

{/* ------------------------------------------------------------------ */}

        <Button primary><NavLink to={'/'}>Back to Dashboard</NavLink></Button>


{/* ---------------------------------------------------------------------- */}
        <Eventcalendar
            view={viewSettings}
            data={myEvents}
            clickToCreate="single"
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
            display="bottom"
            fullScreen={true}
            contentPadding={false}
            headerText={headerText}
            anchor={anchor}
            buttons={popupButtons}
            isOpen={isOpen}
            onClose={onClose}
            responsive={responsivePopup}
        >
            <div className="mbsc-form-group">
                <Input label="Title" value={popupEventTitle} onChange={titleChange} />
                <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
            </div>
            <div className="mbsc-form-group">
                <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
                <Input ref={startRef} label="Starts" />
                <Input ref={endRef} label="Ends" />
                <Datepicker
                    select="range"
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
                    <SegmentedItem value="busy" checked={popupEventStatus === 'busy'}>Yet to Start</SegmentedItem>
                    <SegmentedItem value="free" checked={popupEventStatus === 'free'}>In Progress</SegmentedItem>
                </SegmentedGroup>
                {/* ----------------------------------------------- */}

                {isEdit ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete event</Button></div> : null}
            </div>
        </Popup>
    </div>
}

export default App;
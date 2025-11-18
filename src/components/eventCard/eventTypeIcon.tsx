
import { EventCategory } from "../../domain/eventTypes";
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BusinessIcon from '@mui/icons-material/Business';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { Tooltip } from "@mui/material";
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import { eventShadowColor2 } from "../../utils/typeEvent";
export function mapEventTypeToIcon(eventType: EventCategory) {
        const styles = {
                cursor:'pointer',
                borderWidth:'3px',
                borderRadius:'25%',
                borderStyle:'solid',
                // margin:'1rem',
                width:'3rem',
                height:'3rem',
                borderColor:`${eventShadowColor2[eventType]}`
        }
    return <>
        <Tooltip
                title={
                        <h2 style={{ color: "black", fontSize: "10px" }}>
                                EVENTO {eventType}
                        </h2>
                } 
                placement="top"
                arrow
        >
            {   eventType === "SOCIAL" ? (
                    <EmojiPeopleIcon sx={styles}/>
            ) : eventType === "DEPORTIVO" ? (
                    <SportsFootballIcon sx={styles}/>
            ) : eventType === "CAPACITACION" ? (
                    <SchoolIcon sx={styles}/>
            ) : eventType === "EJECUTIVO" ? (
                    <BusinessIcon sx={styles}/>
            ) : eventType === "EQUIPO" ? (
                    <GroupIcon sx={styles}/>
            ) : eventType === "BENEFICO" ? (
                    <FoodBankIcon sx={styles}/>
            ): (
                <DeviceUnknownIcon sx={styles}/>
            )}
        </Tooltip>


    </>
}
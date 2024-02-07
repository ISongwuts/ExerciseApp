import { Tooltip } from '@mui/material';

const DatabaseModifierButton = ({ name, color, icon, behavior, rowData }) => (
    <Tooltip title={name}>
        <button name={name} onClick={async (e) => {
            await behavior(e, rowData);
        }} className={`${color} hover:bg-[transparent] border px-[1.25rem] py-[.5rem] rounded-[5px] text-lg text-PrimaryBG`}>{icon}
        </button>
    </Tooltip>

);
export default DatabaseModifierButton;
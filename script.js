const SET_COLUMN = document.getElementById("set-column");
const REMOVE_SET_COLUMN = document.getElementById("remove-set-column");
const ADD_SET_BUTTON = document.getElementById("add-set");

const TEAM_1_COLUMN = document.getElementById("team-1-column");
const TEAM_2_COLUMN = document.getElementById("team-2-column");

const SCRIM_DATE = document.getElementById("scrim-date");
const GENERATE_LOG = document.getElementById("generate-log");
const YOUR_TEAM = document.getElementById("your-team");
const OPPO_TEAM = document.getElementById("opposite-team");
const IS_COMP_CHECK = document.getElementById("scrim-type");

const SETS = [];

function onSetRemoval(indexOfRemovedSet){
    SETS.splice(indexOfRemovedSet, 1);

    for(let i = indexOfRemovedSet; i < SETS.length; i++){
        SETS[i].setIndex(i);
    }
}

SCRIM_DATE.valueAsDate = new Date();

ADD_SET_BUTTON.onclick = () => {
    let info = new SetInfo(SET_COLUMN, TEAM_1_COLUMN, TEAM_2_COLUMN, REMOVE_SET_COLUMN, SETS.length);
    info.setOnRemoveCallback(onSetRemoval);
    SETS.push(info);
}

GENERATE_LOG.onclick = () => {
    let logString = `${SCRIM_DATE.value} | ${IS_COMP_CHECK.checked ? "COMP " : ""}Scrim against ${OPPO_TEAM.value}\n\nLineup goes here\n`;
    for(let i = 0; i < SETS.length; i++){
        const set = SETS[i];
        const team1Points = parseInt(set.team1Points.value);
        const team2Points = parseInt(set.team2Points.value);
        const winningTeam = (team1Points > team2Points) ? YOUR_TEAM.value : OPPO_TEAM.value;
        logString += `\nSet ${set.index + 1}: ${team1Points}-${team2Points} ${winningTeam}`;
    }

    navigator.clipboard.writeText(logString);
    alert("COPIED TO CLIPBOARD");
}
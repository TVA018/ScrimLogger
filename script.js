const SET_COLUMN = document.getElementById("set-column");
const REMOVE_SET_COLUMN = document.getElementById("remove-set-column");
const ADD_SET_BUTTON = document.getElementById("add-set");
const CLOSE_PREVIEW_BUTTON = document.getElementById("close-preview");
const LINEUP_CONTAINER = document.getElementById("lineup-container");
const ADD_MEMBER = document.getElementById("add-member");

const PREVIEW_CONTAINER = document.getElementById("preview-container");
const PREVIEW_TEXTAREA = document.getElementById("preview-text");
const INPUT_BLOCKER = document.getElementById("input-blocker")

const TEAM_1_COLUMN = document.getElementById("team-1-column");
const TEAM_2_COLUMN = document.getElementById("team-2-column");

const SCRIM_DATE = document.getElementById("scrim-date");
const GENERATE_LOG = document.getElementById("generate-log");
const YOUR_TEAM = document.getElementById("your-team");
const OPPO_TEAM = document.getElementById("opposite-team");
const IS_COMP_CHECK = document.getElementById("scrim-type");

const GITHUB_LINK = document.getElementById("github-link");

const PAGE_URL = window.location.href;
const PAGE_BASE = "https://";
const PAGE_BASE_REGEX = new RegExp(`^${PAGE_BASE}[a-z]+`);

let USERNAME;

if((PAGE_URL.slice(0, PAGE_BASE.length) == PAGE_BASE)){
    USERNAME = PAGE_URL.search(PAGE_BASE_REGEX);
}

GITHUB_LINK.href = `https://github.com/${USERNAME.slice(PAGE_BASE.length)}/ScrimLogger`;

const LINEUP = [];
const SETS = [];

function onSetRemoval(indexOfRemovedSet){
    SETS.splice(indexOfRemovedSet, 1);

    for(let i = indexOfRemovedSet; i < SETS.length; i++){
        SETS[i].setIndex(i);
    }
}

function showPreview(logString){
    PREVIEW_CONTAINER.style.top = "10vh";
    INPUT_BLOCKER.style.opacity = "70%";
    INPUT_BLOCKER.style.display = "block";
    PREVIEW_TEXTAREA.value = logString;
}

function closePreview(){
    PREVIEW_CONTAINER.style.top = "100vh";
    INPUT_BLOCKER.style.opacity = "0%";
    INPUT_BLOCKER.style.display = "none";
}

function addMemberEntry(index){
    let member = new LineupEntry(LINEUP_CONTAINER, index);
    member.removeEntryButton.addEventListener("click", () => removeMemberEntry(member));

    for(let j = index; j < LINEUP.length; j++){
        LINEUP[j].setIndex(j + 1);
    }

    LINEUP.splice(index, 0, member);

    member.playerName.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            if(e.target.selectionStart === 0 && member.playerName.value.length > 0){
                addMemberEntry(member.index - 1);
            } else {
                addMemberEntry(member.index + 1).playerName.focus();
            }
        } else if(e.key === "ArrowDown" && member.index < LINEUP.length - 1){
            e.preventDefault();
            LINEUP[member.index + 1].playerName.focus();
        } else if(e.key === "ArrowUp" && member.index > 0){
            e.preventDefault();
            LINEUP[member.index - 1].playerName.focus();
        } else if(member.playerName.value.length <= 0) {
            if(e.key === "Backspace"){
                if(member.index - 1 >= 0){
                    e.preventDefault();
                    LINEUP[member.index - 1].playerName.focus();
                }
                member.remove();
                removeMemberEntry(member);
            } else if(e.key === "Delete"){
                if(member.index + 1 < LINEUP.length){
                    e.preventDefault();
                    LINEUP[member.index + 1].playerName.focus();
                }
                member.remove();
                removeMemberEntry(member);
            }
        }
    });

    return member;
}

function removeMemberEntry(entryElement){
    for(let j = entryElement.index + 1; j < LINEUP.length; j++){
        LINEUP[j].setIndex(j - 1);
    }

    LINEUP.splice(entryElement.index, 1);
}

function addSet(index){
    let info = new SetInfo(SET_COLUMN, TEAM_1_COLUMN, TEAM_2_COLUMN, REMOVE_SET_COLUMN, index);
    info.removeSetButton.addEventListener("click", () => removeSet(info));

    for(let j = index; j < SETS.length; j++){
        SETS[j].setIndex(j + 1);
    }
    
    SETS.splice(index, 0, info);

    info.team1Points.addEventListener("keydown", e => {
        if(e.key === "Enter"){
            if(e.shiftKey && info.team2Points.value){ // if shift key pressed and team2points isnt empty
                addSet(info.index + 1).team1Points.focus();
            } else {
                info.team2Points.focus();
            }
        } else if(e.key === "ArrowRight"){
            if(e.target.selectionStart === info.team1Points.value.length){
                e.preventDefault();
                info.team2Points.focus();
            }
        // shift key pressed down and all boxes are empty
        } else if(e.key === "Backspace" && !info.team1Points.value && !info.team2Points.value){
            e.preventDefault();
            if(SETS.length > 1) {
                SETS[Math.max(0, info.index - 1)].team1Points.focus();
            }

            info.remove();
            removeSet(info);
        } else if(e.key === "ArrowDown" && info.index < SETS.length - 1){
            SETS[info.index + 1].team1Points.focus();
        } else if(e.key === "ArrowUp" && info.index > 0){
            SETS[info.index - 1].team1Points.focus();
        }
    });

    info.team2Points.addEventListener("keydown", e => {
        if(e.key === "Enter"){
            if(e.shiftKey || info.index == SETS.length - 1){
                addSet(info.index + 1).team1Points.focus();
            } else if(info.index < SETS.length - 1) {
                SETS[info.index + 1].team1Points.focus();
            }
        } else if(e.key === "ArrowLeft"){
            if(e.target.selectionStart === 0){
                e.preventDefault();
                info.team1Points.focus();
            }
        } else if(e.key === "ArrowDown" && info.index < SETS.length - 1){
            SETS[info.index + 1].team2Points.focus();
        } else if(e.key === "ArrowUp" && info.index > 0){
            SETS[info.index - 1].team2Points.focus();
        }
    });

    return info;
}

function removeSet(info){
    for(let j = info.index + 1; j < SETS.length; j++){
        SETS[j].setIndex(j - 1);
    }

    SETS.splice(info.index, 1);
}

SCRIM_DATE.valueAsDate = new Date();

ADD_MEMBER.onclick = () => {
    addMemberEntry(LINEUP.length);
}

ADD_SET_BUTTON.onclick = () => {
    addSet(SETS.length);
}

YOUR_TEAM.addEventListener("keydown", e => {
    if(e.key == "Enter"){
        OPPO_TEAM.focus();
    }
});

OPPO_TEAM.addEventListener("keydown", e => {
    if(e.key == "Enter"){
        addSet(SETS.length).team1Points.focus();
    }
});

// document.addEventListener("keydown", e => {
//     console.log(e.key);
// });

GENERATE_LOG.onclick = () => {
    let logString = `${SCRIM_DATE.value} | ${IS_COMP_CHECK.checked ? "COMP " : ""}Scrim against ${OPPO_TEAM.value}`;

    // Lineup
    for(const MEMBER of LINEUP){
        const POSITION = MEMBER.select.value;
        const PLAYER_NAME = MEMBER.playerName.value;
        
        if(!PLAYER_NAME) {
            alert("NO PLAYER NAME PROVIDED FOR ONE OF THE MEMBERS");
            return;
        }

        logString += `\n${POSITION}: ${PLAYER_NAME}`;
    }

    logString += "\n";

    // Metadata
    if(!SCRIM_DATE.value){
        alert("NO DATE PROVIDED");
        return;
    } else if(!YOUR_TEAM.value || !OPPO_TEAM.value) {
        alert("MISSING TEAM NAME");
        return;
    }

    // Sets data
    for(let i = 0; i < SETS.length; i++){
        const set = SETS[i];
        const team1Points = parseInt(set.team1Points.value);
        const team2Points = parseInt(set.team2Points.value);
        const winningTeam = (team1Points > team2Points) ? YOUR_TEAM.value : OPPO_TEAM.value;

        if(isNaN(team1Points) || isNaN(team2Points)){
            alert(`NO POINTS PROVIDED ON SET ${set.index + 1}`);
            return;
        }
        
        logString += `\nSet ${set.index + 1}: ${team1Points}-${team2Points} ${winningTeam}`;
    }

    navigator.clipboard.writeText(logString);
    showPreview(logString);
}

CLOSE_PREVIEW_BUTTON.onclick = closePreview;
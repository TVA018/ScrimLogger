class LineupEntry {
    constructor(lineupContainer){
        this._removeCallback = () => {};
        this.mainDiv = document.createElement("div");
        this.select = document.createElement("select");
        this.playerName = document.createElement("input");
        this.playerName.type = "text";
        this.playerName.placeholder = "Player Name";
        this.removeEntryButton = document.createElement("button");

        this.removeEntryButton.className = "minus";
        this.removeEntryButton.textContent = "-";

        this.mainDiv.className = "row-height";

        for(const POS_NAME of POSITIONS){
            const posOption = document.createElement("option");
            posOption.value = POS_NAME;
            posOption.textContent = POS_NAME;
            this.select.append(posOption);
        }

        this.mainDiv.append(this.select);
        this.mainDiv.append(this.playerName);
        this.mainDiv.append(this.removeEntryButton);
        this.removeEntryButton.onclick = () => this.remove();
        lineupContainer.append(this.mainDiv);
    }

    /** Should be in the form of func(LineupEntry entry) */
    setOnRemoveCallback(callbackFunc){
        this._removeCallback = callbackFunc;
    }

    remove(){
        this.mainDiv.remove();
        callbackFunc(this);
    }
}
class LineupEntry {
    constructor(lineupContainer, index){
        this.index = index;
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

        this.setIndex(index);

        this.mainDiv.style.order = index;

        lineupContainer.append(this.mainDiv);
    }

    setIndex(newIndex){
        this.index = newIndex;
        this.mainDiv.style.order = newIndex;
    }

    remove(){
        this.mainDiv.remove();
        //test
    }
}
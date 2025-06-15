class SetInfo {
    constructor(setContainer, team1Container, team2Container, removeSetContainer, index){
        this.index = index;

        this.setLabel = document.createElement("div");
        this.team1Points = document.createElement("input");
        this.team2Points = document.createElement("input");
        this.removeSetButton = document.createElement("button");

        this.setLabel.className = "set-number row-height";
        this.setLabel.innerHTML = index + 1;
        this.team1Points.className = "points row-height";
        this.team2Points.className = "points row-height";

        this.team1Points.addEventListener("input", SetInfo.validateInput);
        this.team2Points.addEventListener("input", SetInfo.validateInput);

        this.removeSetButton.className = "remove-set-button minus";
        this.removeSetButton.textContent = "-";
        this.removeSetButton.onclick = () => {this.remove()}; // have to wrap in a lambda function so that "this" references SetInfo, not the removeSetButton

        this.setIndex(index);

        setContainer.append(this.setLabel);
        team1Container.append(this.team1Points);
        team2Container.append(this.team2Points);
        removeSetContainer.append(this.removeSetButton);
    }

    static validateInput(event){
        if(!Number.isInteger(event.target.value)){
            event.target.value = event.target.value.replace(/[\D.]/g, "");
        }
    }

    setIndex(newIndex){
        this.index = newIndex;
        this.setLabel.style.order = newIndex;
        this.team1Points.style.order = newIndex;
        this.team2Points.style.order = newIndex;
        this.removeSetButton.style.order = newIndex;
        this.setLabel.innerHTML = newIndex + 1;
    }

    remove(){
        this.setLabel.remove();
        this.team1Points.remove();
        this.team2Points.remove();
        this.removeSetButton.remove();
    }
}
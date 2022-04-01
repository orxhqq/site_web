import { add, Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["etage", "section"]

    connect() {
        this.showCurrentEtage()
    }

    up() {
        this.showCurrentEtage()
    }

    down() {
        this.showCurrentEtage()
    }

    showCurrentEtage() {
        this.etageTargets.forEach((etage, index) => {

            if (index == window.currentPlace - 1) {


                etage.classList.remove("hidden");
           
            } else {
                etage.classList.add("hidden");


            }
        });
    }
}
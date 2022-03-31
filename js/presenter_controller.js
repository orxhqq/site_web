import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["etage"]

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
            etage.hidden = (index != window.currentPlace - 1)
        })
    }
}
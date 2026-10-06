(function () {
    "use strict";

    function createWorld() {
        const home = document.getElementById("home");
        if (!home) return;

        let world = home.querySelector(".wordup-3d-world");

        if (!world) {
            world = document.createElement("div");
            world.className = "wordup-3d-world";
            home.prepend(world);
        }

        world.innerHTML = `
            <div class="wu-campus-sky"></div>
            <div class="wu-campus-stars"></div>

            <div class="wu-campus-ground">
                <div class="wu-campus-road road-main"></div>
                <div class="wu-campus-road road-left"></div>
                <div class="wu-campus-road road-right"></div>
            </div>

            <div class="wu-campus-building foundation">
                <span>FOUNDATION</span>
            </div>

            <div class="wu-campus-building a1">
                <span>A1</span>
            </div>

            <div class="wu-campus-building a2">
                <span>A2</span>
            </div>

            <div class="wu-campus-building b1">
                <span>B1</span>
            </div>

            <div class="wu-campus-building b2">
                <span>B2</span>
            </div>

            <div class="wu-campus-building c1">
                <span>C1</span>
            </div>

            <div class="wu-campus-building c2">
                <span>C2</span>
            </div>

            <div class="wu-campus-building academic">
                <span>ACADEMIC</span>
            </div>

            <div class="wu-campus-center">
                <div class="wu-campus-logo">W</div>
                <div class="wu-campus-name">WORDUP</div>
            </div>
        `;

        setupInteraction();
    }

    function setupInteraction() {
        const home = document.getElementById("home");
        if (!home) return;

        let frame = false;

        window.addEventListener("mousemove", function (event) {

            if (frame) return;

            frame = true;

            requestAnimationFrame(function () {

                const x =
                    (event.clientX / window.innerWidth - 0.5);

                const y =
                    (event.clientY / window.innerHeight - 0.5);

                home.style.setProperty(
                    "--wu-mx",
                    `${x * 18}px`
                );

                home.style.setProperty(
                    "--wu-my",
                    `${y * 12}px`
                );

                frame = false;
            });
        }, { passive: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createWorld);
    } else {
        createWorld();
    }

    window.WORDUP_3D_HOME = true;
})();

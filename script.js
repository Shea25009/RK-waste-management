// MOBILE MENU

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


menuToggle.addEventListener(
    "click",
    function () {

        mainNav.classList.toggle("open");

    }
);


document
    .querySelectorAll("#mainNav a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                mainNav.classList.remove("open");

            }
        );

    });


// SCROLL ANIMATION

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(

                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                }

            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(

    function (element) {

        revealObserver.observe(element);

    }

);


// WASTE DATABASE

const wasteDatabase = {

    cardboard: {

        category: "Recycling",

        information:
            "Clean and suitable cardboard is commonly accepted through recycling services. Remove food contamination where possible."

    },


    paper: {

        category: "Recycling",

        information:
            "Suitable clean paper may be accepted in recycling. Check your local council for exceptions."

    },


    "glass bottle": {

        category: "Recycling",

        information:
            "Suitable glass bottles are commonly accepted through household recycling services."

    },


    "aluminium can": {

        category: "Recycling",

        information:
            "Aluminium cans are commonly recyclable through household recycling services."

    },


    "banana peel": {

        category: "Organic Waste",

        information:
            "Food scraps such as banana peels may be suitable for an organics service where one is available."

    },


    "food scraps": {

        category: "Organic Waste",

        information:
            "Food scraps may belong in an organics service where your local collection system accepts them."

    },


    "garden waste": {

        category: "Organic Waste",

        information:
            "Suitable garden material may be accepted through an organics or green-waste service."

    },


    nappy: {

        category: "General Waste",

        information:
            "Disposable nappies are generally not suitable for normal household recycling."

    },


    "broken ceramic": {

        category: "General Waste",

        information:
            "Broken ceramics are generally not accepted through ordinary glass recycling services."

    },


    battery: {

        category: "Special Disposal",

        information:
            "Batteries should not normally be placed in household recycling. Use an appropriate battery collection or recycling service."

    },


    batteries: {

        category: "Special Disposal",

        information:
            "Batteries require an appropriate collection or recycling service."

    },


    "e-waste": {

        category: "Special Disposal",

        information:
            "Electronic waste may require a dedicated e-waste collection or recycling service."

    },


    electronics: {

        category: "Special Disposal",

        information:
            "Electronic items may require a dedicated recycling or disposal service."

    },


    paint: {

        category: "Special Disposal",

        information:
            "Paint may require a household chemical or hazardous-waste collection service."

    }

};


// WASTE FINDER

const wasteSearch =
    document.getElementById("wasteSearch");


const searchWasteBtn =
    document.getElementById("searchWasteBtn");


const wasteResult =
    document.getElementById("wasteResult");


function searchWaste(item) {

    const search =
        item
            .toLowerCase()
            .trim();


    if (search === "") {

        wasteResult.innerHTML = `

            <h3>
                Please enter an item
            </h3>

            <p>
                Try searching for battery,
                cardboard, banana peel or e-waste.
            </p>

        `;

        return;

    }


    let result =
        wasteDatabase[search];


    if (!result) {

        const matchingItem =
            Object
                .keys(wasteDatabase)
                .find(

                    function (itemName) {

                        return (
                            search.includes(itemName) ||
                            itemName.includes(search)
                        );

                    }

                );


        if (matchingItem) {

            result =
                wasteDatabase[matchingItem];

        }

    }


    if (result) {

        wasteResult.innerHTML = `

            <h3>
                ${result.category}
            </h3>

            <p>
                ${result.information}
            </p>

            <small>
                Educational guidance only.
                Check your local council before disposal.
            </small>

        `;

    }

    else {

        wasteResult.innerHTML = `

            <h3>
                Check Local Guidance
            </h3>

            <p>

                This item is not currently included
                in our prototype database.

            </p>

            <small>

                Please check your local council's
                current waste information.

            </small>

        `;

    }

}


searchWasteBtn.addEventListener(

    "click",

    function () {

        searchWaste(
            wasteSearch.value
        );

    }

);


wasteSearch.addEventListener(

    "keydown",

    function (event) {

        if (event.key === "Enter") {

            searchWaste(
                wasteSearch.value
            );

        }

    }

);


document
    .querySelectorAll(".quick-search button")
    .forEach(

        function (button) {

            button.addEventListener(

                "click",

                function () {

                    const selectedItem =
                        button.dataset.item;


                    wasteSearch.value =
                        selectedItem;


                    searchWaste(
                        selectedItem
                    );

                }

            );

        }

    );


// FAQ

document
    .querySelectorAll(".faq-question")
    .forEach(

        function (question) {

            question.addEventListener(

                "click",

                function () {

                    const card =
                        question.parentElement;


                    card
                        .classList
                        .toggle("active");


                    const symbol =
                        question.querySelector("span");


                    if (
                        card
                            .classList
                            .contains("active")
                    ) {

                        symbol.textContent =
                            "−";

                    }

                    else {

                        symbol.textContent =
                            "+";

                    }

                }

            );

        }

    );


// CONTACT FORM

const contactForm =
    document.getElementById("contactForm");


const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(

    "submit",

    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const subject =
            document
                .getElementById("subject")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            formMessage.textContent =
                "Please complete all fields.";


            formMessage.className =
                "form-message error";


            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(email)
        ) {

            formMessage.textContent =
                "Please enter a valid email address.";


            formMessage.className =
                "form-message error";


            return;

        }


        const enquiry = {

            name: name,

            email: email,

            subject: subject,

            message: message,

            date:
                new Date()
                    .toLocaleString()

        };


        const savedMessages =
            JSON.parse(

                localStorage
                    .getItem(
                        "rkWasteMessages"
                    ) || "[]"

            );


        savedMessages.push(
            enquiry
        );


        localStorage.setItem(

            "rkWasteMessages",

            JSON.stringify(
                savedMessages
            )

        );


        formMessage.textContent =
            "Thanks " +
            name +
            ". Your prototype message has been recorded successfully.";


        formMessage.className =
            "form-message success";


        contactForm.reset();

    }

);


// CURRENT YEAR

document
    .getElementById("currentYear")
    .textContent =
    new Date().getFullYear();


// BACK TO TOP

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(

    "scroll",

    function () {

        if (
            window.scrollY > 650
        ) {

            backToTop
                .classList
                .add("show");

        }

        else {

            backToTop
                .classList
                .remove("show");

        }

    }

);


backToTop.addEventListener(

    "click",

    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

);
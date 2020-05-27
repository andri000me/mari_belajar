document.addEventListener("DOMContentLoaded", () => {

    const element = document.querySelectorAll(".sidenav");
    M.Sidenav.init(element);
    loadNavbar();

    function loadNavbar() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                })

                document.querySelectorAll(".topnav a, .sidenav a").forEach(elm => {
                    elm.addEventListener("click", event => {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })
            }
        }

        xhttp.open("GET", "navbar.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan! :(</p>";
                } else {
                    content.innerHTML = "<p>Maaf halaman tidak dapat diakses! :(</p>"
                }
            }
        };

        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
})
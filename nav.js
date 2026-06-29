document.addEventListener('DOMContentLoaded', function () {
    var burger = document.getElementById('menu-burger');
    var nav = document.getElementById('nav-liens');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        });
    });
});

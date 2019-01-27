// Longstrip Reader als Standard
// Longstrip: klick auf Bild scrollt zum nächsten Bild
// Longstrtip: letzte Bild springt in nächste Kapitel (ohne Zwischenseite)
// Fügt Mangaupdates neben Animeupdates auf Startseite hinzu

pefModulList.push({
    id: 'mangaComfort',
    name: 'Manga Comfort',
    description: 'mehr Komfort beim Manga Lesen',
    autor: 'Blue.Reaper',
    callMethod: change => mangaComfortCall(change)
});

function mangaComfortCall(change: ModulCallEvent) {
    switch (change) {
        case ModulCallEvent.on:
            mangaComfort();
            break;
        case ModulCallEvent.off:
            break;
        case ModulCallEvent.ajax:
            mangaComfort();
            break;
    }
}

function mangaComfort(){

    // add Mangaupdate in Menu
    if(!$('#leftNav li:nth-child(3) ul li>a[href="/manga/updates#top').length){
        $('#leftNav li:nth-child(3) ul').append($('<li><a data-ajax="true" href="/manga/updates#top">Mangaupdates</a></li>'));
    }
    // On Home Page and Links doesn't exist
    if (window.location.pathname === '/' && !$('li>a[href="/manga/updates#top').length){
        // Add Mangaupdaets like existing Animeupdates and after that
        $('li>a[href="/anime/updates#top"]').parent().after($('<li id="pef_mangaupdates"><a data-ajax="true" href="/manga/updates#top">Mangaupdates</a></li>'));
    }

	if (window.location.pathname.split('/')[1] !== 'read' && window.location.pathname.split('/')[1] !== 'chapter'){
		return;
	}

    // Setzt Longstrip als Standard, wenn noch kein Cookie gesetzt ist
    if (getCookie('manga_reader') != 'slide') {
        setCookie('manga_reader', 'longstrip');
    }

    // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
    if (getCookie('manga_reader') == 'longstrip') {
        $('#reader img').attr('onclick', '');
        $('#reader img').off('click', scrollToNextPage);
        $('#reader img').click(scrollToNextPage);
        $('#reader img:last-child').attr(
            'onclick',
            "window.location=nextChapter.replace('chapter','read')+'#top'"
        );
    }

    // Wenn 404, dann nächste Kapitel nicht verfügbar (Sprung direkt in nächste Kapitel) -> gehe zurück auf Zwichenseite
    if ($('#main img[src="/images/misc/404.png"]').length) {
        window.location.pathname = window.location.pathname.replace(
            'read',
            'chapter'
        );
    }

    // Mauszeiger wird auch nur über Bild zur Hand
    $('#reader img').addClass('pointer');
    $('#reader a').addClass('cursorAuto');
}

function scrollToNextPage() {
    // @ts-ignore
    const image = $('#chapterImage' + current_page).offset();

    $('body,html').animate(
        {
            // nicht page+1, da id bei 0 los zählt
            scrollTop: image ? image.top : 0
        },
        800
    );
    // @ts-ignore
    current_page = current_page + 1;
}

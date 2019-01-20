// Longstrip Reader als Standard
// Longstrip: klick auf Bild scrollt zum nächsten Bild
// Longstrtip: letzte Bild springt in nächste Kapitel (ohne Zwischenseite)

pefModulList.push({
    id:"mangaComfort",
    name:"Manga Comfort",
    description:"keine Zwischenseiten, etc.",
    autor:"Blue.Reaper",
	callMethod:(change)=>mangaComfortCall(change)
});

function mangaComfortCall (change:ModulCallEvent) {
	switch(change) {
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

	if (window.location.pathname.split('/')[1] !== 'read' && window.location.pathname.split('/')[1] !== 'chapter'){
		return;
	}

    // Setzt Longstrip als Standard, wenn noch kein Cookie gesetzt ist
    if(getCookie("manga_reader") != "slide"){
        setCookie('manga_reader','longstrip');
    }

    // Ändere Link auf Bildern, damit nur zum nächsten Bild gesprungen wird
    if(getCookie("manga_reader") == "longstrip"){
        $('#reader img').attr("onclick","");
        $('#reader img').off("click", scrollToNextPage);
        $('#reader img').click(scrollToNextPage);
        $('#reader img:last-child').attr("onclick","window.location=nextChapter.replace('chapter','read')+'#top'");
    }

    // Wenn 404, dann nächste Kapitel nicht verfügbar (Sprung direkt in nächste Kapitel) -> gehe zurück auf Zwichenseite
    if($('#main img[src="/images/misc/404.png"]').length){
        window.location.pathname=window.location.pathname.replace('read','chapter');
    }

    // Mauszeiger wird auch nur über Bild zur Hand
    $('#reader img').addClass("pointer");
    $('#reader a').addClass("cursorAuto");


}

function scrollToNextPage(){
    $('body,html').animate({
        // nicht page+1, da id bei 0 los zählt
        scrollTop: $('#chapterImage'+(current_page)).offset().top
    }, 800);
    current_page = current_page+1;
}
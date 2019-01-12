
//Fügt den Button "Apps" zu "leftNav" hinzu
// Erzeugt 'Erweiterungen' in Apps
function addPefMenu() {
	var li = document.createElement("li");
	li.className = "topmenu";
	li.innerHTML = '<a href="javascript:;">Apps ▾</a><ul id="pef_menu"></ul>';
	leftNav.appendChild(li);
	// Erzeugt 'Erweiterungen' in Apps
	var settings = document.createElement("li");
	settings.innerHTML = '<a href="/pef?s=settings#top">Erweiterungen</a>';
	pef_menu.appendChild(settings);
};

// Zeigt die Settings des PEF an
// Erzeugt die Einstellungs-Seite für PEF
// Da es proxer.me/pef nicht gibt, wird die Startseite angezeigt
function createPefSettings(){
	if(window.location.pathname.split('/')[1] === 'pef'){
		// // Lösche alle Tabs der Startseite aus Navigations-Leiste
		$('#simple-navi').empty();
		var navBar = $('#simple-navi')[0];
// 		Lösche den Inhalt der Seite
		$('div.inner').empty();
		var inhalt = $('div.inner')[0];

		// Setze den Titel des Tabs im Browser
		// QUESTION pageMetaAjax überhaupt nötig?
		pageMetaAjax.innerHTML = 'Proxer Erweiterung'; // Das ist der Titel, muss ich händisch machen
		document.title = 'Proxer Erweiterung';

// 		Erzeuge Tab Erweiterungen
// 		Id: pef_Settings
// 		URL: ?s=settings
		var scriptTab = document.createElement("li");
		scriptTab.id="pef_Settings";
		scriptTab.innerHTML = '<a data-ajax="true" href="/pef?s=settings#top">Erweiterungen</a>';
		navBar.appendChild(scriptTab);

		// Erzeugt den Ihalt des Tabs 'Erweiterungen'
		if(location.search === "" || location.search === "?s=settings"){
			pef_Settings.className = "active";
			// QUESTION pageMetaAjax überhaupt nötig?
			pageMetaAjax.innerHTML = 'Proxer Erweiterung'; // Das ist der Titel, muss ich händisch machen
			document.title = 'Proxer Erweiterung';

			// Überschrift
			var h3 = document.createElement("h3");
			h3.innerHTML = "Proxer Erweiterung";
			inhalt.appendChild(h3);

			// Inhalt für Modulanzeige
			var pef_module = document.createElement("div");
			pef_module.id = "pef_module";
			inhalt.appendChild(pef_module);
			showModules(pef_module);

			// Footer
			var divEnd = document.createElement("div");
			divEnd.className = "modulEnd";
			divEnd.innerHTML = "Noch mehr Userscripte findet ihr <a href='https://proxer.me/forum/anwendungen'>im Forum</a>.";
			inhalt.appendChild(divEnd);
		}
	}
}

// Zeitgt die einzelnen Module auf der Einstellungs-Seite an
function showModules(pef_module){

// Fügt jedes Modul hinzu
	for(var i = 0; i < pefModulList.length; i++) {
		var moduleBox = document.createElement("div");
		moduleBox.className = "modulBox";
		moduleBox.style.borderStyle = $('#main').css("border-top-style");
		moduleBox.style.borderColor = $('#main').css("border-top-color");
		moduleBox.style.borderRadius = $('#main').css("border-top-left-radius");

		var moduleName = document.createElement("h3");
		moduleName.innerHTML = pefModulList[i].name;
		moduleName.className = "center";

		var modulStatus = document.createElement("img");
		modulStatus.id = pefModulList[i].id+'_StatusImg';
		modulStatus.className ="clickImg20";

		moduleName.appendChild(modulStatus);
		moduleBox.appendChild(moduleName);
		moduleBox.appendChild(document.createElement("hr"));

// TODO: Beschreibung, Version? und Button für Details hinzufügen

		pef_module.appendChild(moduleBox);
		updateModulTick(pefModulList[i].id);

		$(modulStatus).click(function (event) {
			// Bei klicken auf das Bild wird die Id ausgelesen und der "_StatusImg" Teil eintfernt, damit nur die Modul-Id über bleibt
			toggleModulStatus(event.target.id.split("_")[0]);
		});
	}
}

// Troogelt den Speicherwert und ruft das Modul auf
function toggleModulStatus(modulId) {
	if (GM_getValue(modulId+"Status") === "off") {
		GM_setValue(modulId+"Status","on");
	} else {
		GM_setValue(modulId+"Status","off");
	}
    actionControl("User change Status");
    updateModulTick(modulId);
};

// Setzt den Haken / Kreuz nach dem Modulnamen
function updateModulTick(modulId) {
    if (GM_getValue(modulId+"Status") === "off") {
		$("#"+modulId+"_StatusImg").attr("src", GM_getResourceURL("no_img"));
	} else {
		$("#"+modulId+"_StatusImg").attr("src", GM_getResourceURL("yes_img"));
	}
};
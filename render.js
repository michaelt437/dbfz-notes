import routes from "./routes.json";

(function () {
	const routesContainer = document.querySelector("#routes-container");
	const characterTabs = document.querySelector("#character-tabs");
	const characters = Object.keys(routes[0].characters);

	let currentCharacter = characters[0];

	function renderTabs () {
		let _templateTab = `
		${
			characters.map((character, index) => {
				return`<li class="character-tab ${index === 0 ? 'is-active' : ''}" data-index="${index}">
					<a>${character.toUpperCase()}</a>
				</li>`
			}).join("")
		}`;

		characterTabs.innerHTML = _templateTab;
	}

	function renderRoutes () {
		let _currentRoutes = routes[0].characters[currentCharacter];
		let _templateCard = `${
			_currentRoutes.map((route, index) => {
				return `
				<div class="box ${route.video ? 'cursor-pointer' : ''}">
					<div class="box-header level mb-5">
						<h5 id="${route.title}-${index}" class="title is-5 level-left mb-0"># ${route.title} - ${route.position}</h4>
						<p class="level-right mb-0">
							Damage: <span class="has-text-primary ml-1">${route.damage}</span>
						</p>
					</div>
					<div class="box-content">
						<div class="inputs mb-4 p-5 has-background-white-ter">
							${route.inputs}							
						</div>
						<div class="youtube">
							<iframe class="is-hidden mb-2" width="100%" height="500" src="https://www.youtube.com/embed/${route.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
					</div>
					<div class="box-footer">${route.video ? '<p class="toggleVideo has-text-centered"> <span class="icon has-text-grey-light"> <i class="fas fa-chevron-down"></i> </span> </p>' : ''}</div>
				</div>
				`
			}).join("")
		}`;

		routesContainer.innerHTML = _templateCard;
	}

	function tabSelect () {
		let _tabs = document.querySelectorAll(".character-tab");

		_tabs.forEach(tab => {
			tab.addEventListener("click", function (e) {
				let _target = e.currentTarget;
				let is_active = document.querySelector(".is-active").classList.remove("is-active");
				_target.classList.add("is-active");
				currentCharacter = characters[_target.getAttribute("data-index")];
				render();
			})
		})
	}

	function toggleVideoListener () {
		let _toggles = document.querySelectorAll(".box");

		_toggles.forEach(toggle => {
			toggle.addEventListener("click", function (e) {
				let _target = e.currentTarget;
				if (_target.classList.contains("cursor-pointer")) {
					_target.querySelector("iframe").classList.toggle("is-hidden");
					_target.querySelector("i").classList.toggle("fa-chevron-down");
					_target.querySelector("i").classList.toggle("fa-chevron-up");
				}
			})
		})
	}
	
	function render () {
		renderRoutes();
		toggleVideoListener();
	}

	function init() {
		renderTabs();
		render();
		tabSelect();
	}

	init();
})();

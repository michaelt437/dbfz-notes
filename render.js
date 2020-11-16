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
				return`<li class="${index === 0 ? 'is-active' : ''}">
					<a>${character.toUpperCase()}</a>
				</li>`
			}).join("")
		}`;

		characterTabs.innerHTML = _templateTab;
	}

	function renderRoutes () {
		let _currentRoutes = routes[0].characters[currentCharacter];
		let _templateCard = `${
			_currentRoutes.map(route => {
				return `
				<div class="box">
					<div class="box-header level mb-5">
						<h5 class="title is-5 level-left mb-0"># ${route.title} - ${route.position}</h4>
						<p class="level-right mb-0">
							Damage: <span class="has-text-info ml-1">${route.damage}</span>
						</p>
					</div>
					<div class="box-content">
						<div class="mb-4">
							<pre style="overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;">${route.inputs}</pre>
						</div>
						<div class="youtube">
							${route.video ? `<iframe width="100%" height="500" src="https://www.youtube.com/embed/${route.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : ""}
							
						</div>
					</div>
					<div class="box-footer"></div>
				</div>
				`
			}).join("")
		}`;

		routesContainer.innerHTML = _templateCard;
	}
	
	function init () {
		renderTabs();
		renderRoutes();
	}
	
	init();

})();

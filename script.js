const menuButton=document.querySelector('.menu-toggle');const navigation=document.querySelector('.main-nav');if(menuButton&&navigation){menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.innerHTML=open?'Close <b>×</b>':'Menu <b>+</b>'})}document.querySelectorAll('.current-year').forEach(el=>el.textContent=new Date().getFullYear());
const wasteDatabase={cardboard:['Recycling','Keep cardboard clean and dry. Flatten it if your local recycling service requires this.'],paper:['Recycling','Clean paper is commonly recyclable. Check local guidance for shredded paper.'],'glass bottle':['Recycling','Empty glass bottles are commonly accepted in household recycling.'],bottle:['Recycling','Empty containers are commonly recyclable when accepted by your local service.'],'aluminium can':['Recycling','Aluminium cans are commonly recyclable through household services.'],'banana peel':['Organic waste','Food scraps may be suitable for an organics service where available.'],'food scraps':['Organic waste','Food scraps may belong in an organics bin if your local service accepts them.'],'garden waste':['Organic waste','Suitable garden material may be accepted in a green-waste service.'],nappy:['General waste','Disposable nappies are generally not suitable for household recycling.'],battery:['Special disposal','Never place batteries in household bins. Use an approved battery collection point.'],batteries:['Special disposal','Batteries need a dedicated collection or recycling service.'],'e-waste':['Special disposal','Electronic waste should go to a dedicated e-waste collection program.'],electronics:['Special disposal','Electronic items may require a dedicated collection service.'],paint:['Special disposal','Paint may need a household chemical or hazardous-waste collection service.']};
function searchWaste(value){const box=document.querySelector('#wasteResult');if(!box)return;const term=value.toLowerCase().trim();if(!term){box.innerHTML='<h2>Enter an item</h2><p>Try battery, cardboard, banana peel or e-waste.</p>';return}let result=wasteDatabase[term];if(!result){const key=Object.keys(wasteDatabase).find(item=>term.includes(item)||item.includes(term));result=key?wasteDatabase[key]:null}box.innerHTML=result?`<h2>${result[0]}</h2><p>${result[1]}</p><small>Educational guidance only. Check your local council before disposal.</small>`:'<h2>Check local guidance</h2><p>This item is not included in our prototype database. Please confirm with your local council.</p>'}
const wasteInput=document.querySelector('#wasteSearch');const searchButton=document.querySelector('#searchWasteBtn');if(wasteInput){const query=new URLSearchParams(window.location.search).get('item');if(query){wasteInput.value=query;searchWaste(query)}wasteInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();searchWaste(wasteInput.value)}})}if(searchButton)searchButton.addEventListener('click',()=>searchWaste(wasteInput.value));document.querySelectorAll('[data-item]').forEach(button=>button.addEventListener('click',()=>{wasteInput.value=button.dataset.item;searchWaste(button.dataset.item)}));
function openFinder(){const input=document.querySelector('#siteSearch');const value=input?input.value.trim():'';window.location.href=`waste-finder.html${value?`?item=${encodeURIComponent(value)}`:''}`}const siteSearch=document.querySelector('#siteSearch');if(siteSearch)siteSearch.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();openFinder()}});const siteSearchButton=document.querySelector('#siteSearchButton');if(siteSearchButton)siteSearchButton.addEventListener('click',openFinder);
document.querySelectorAll('[data-feedback]').forEach(button=>button.addEventListener('click',()=>{localStorage.setItem('rkWasteFeedback',button.dataset.feedback);const message=document.querySelector('#feedbackMessage');if(message)message.textContent=`Thanks — your response (${button.dataset.feedback}) has been recorded in this browser.`}));
const form=document.querySelector('#contactForm');if(form)form.addEventListener('submit',event=>{event.preventDefault();const name=document.querySelector('#name').value.trim();const email=document.querySelector('#email').value.trim();const message=document.querySelector('#formMessage');if(!name||!email){message.textContent='Please complete your name and email.';return}localStorage.setItem('rkWasteMessage',JSON.stringify({name,email,date:new Date().toISOString()}));message.textContent=`Thank you, ${name}. Your message has been recorded for this prototype.`;form.reset()});
Object.assign(wasteDatabase, {
  "plastic bottle": [
    "Recycling",
    "Empty and rinse the bottle. Lightly replace the lid and place it loose in the yellow-lidded recycling bin."
  ],
  "aluminium can": [
    "Recycling",
    "Empty and rinse the can, then place it loose in the yellow-lidded recycling bin."
  ],
  "paper": [
    "Recycling",
    "Keep paper clean and dry, then place it loose in the yellow-lidded recycling bin."
  ],
  "food scraps": [
    "Food and Garden Organics (FOGO)",
    "Place food scraps in the green-lidded FOGO bin."
  ],
  "coffee grounds": [
    "Food and Garden Organics (FOGO)",
    "Place used coffee grounds in the green-lidded FOGO bin."
  ],
  "garden waste": [
    "Food and Garden Organics (FOGO)",
    "Place leaves, grass clippings and small garden prunings in the green-lidded FOGO bin."
  ],
  "plastic bag": [
    "General waste / soft-plastic collection",
    "Do not place plastic bags in the yellow recycling bin. Use an eligible soft-plastic collection service when available; otherwise use the red-lidded general-waste bin."
  ],
  "soft plastic": [
    "General waste / soft-plastic collection",
    "Soft plastics do not belong in the yellow recycling bin. Check for an eligible collection service or use the red-lidded general-waste bin."
  ],
  "pizza box": [
    "Recycling",
    "Place clean pizza boxes in the yellow-lidded recycling bin."
  ],
  "battery": [
    "Battery drop-off",
    "Never place batteries in any household bin. Tape the terminals and take them to a battery drop-off point or Community Recycling Centre."
  ],
  "paint": [
    "Community Recycling Centre",
    "Do not place paint in household bins. Take household quantities to a Community Recycling Centre."
  ],
  "fluorescent light": [
    "Community Recycling Centre",
    "Do not place fluorescent lights in household bins. Take fluorescent tubes and globes to a Community Recycling Centre."
  ],
  "mobile phone": [
    "E-waste drop-off",
    "Do not place mobile phones in household bins. Take them to an approved e-waste or mobile-phone recycling point."
  ],
  "e-waste": [
    "E-waste drop-off",
    "Do not place e-waste in household bins. Take computers, televisions and similar devices to an approved e-waste collection point."
  ]
});
const centreFilterButtons = document.querySelectorAll("[data-centre-filter]");
const centreCards = document.querySelectorAll("[data-centre-items]");
const centreFinderStatus = document.querySelector("#centreFinderStatus");

if (centreFilterButtons.length && centreCards.length) {
  centreFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.centreFilter;
      let visibleServices = 0;

      centreFilterButtons.forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      centreCards.forEach((card) => {
        const acceptedItems = card.dataset.centreItems.split("|");
        const shouldShow =
          selectedFilter === "all" || acceptedItems.includes(selectedFilter);

        card.hidden = !shouldShow;

        if (shouldShow) {
          visibleServices += 1;
        }
      });

      if (centreFinderStatus) {
        centreFinderStatus.textContent =
          selectedFilter === "all"
            ? "Showing all available services."
            : `${visibleServices} service${visibleServices === 1 ? "" : "s"} shown for ${button.textContent.trim().toLowerCase()}.`;
      }
    });
  });
}
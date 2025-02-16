const sidenav = document.querySelector('#sidenav');
const toc = document.querySelector('#toc');

  // Define the items for the side navigation and the headings for the table of contents
  const items = [
    {
      title: 'School 101',
      links: [
        { href: '/school/index.html', children: 'Intro: The System' },
        { href: '/school/money.html', children: 'Money' },
        { href: '/school/gridlock.html', children: 'Gridlock'},
        { href: '/school/audit.html', children: 'Your School' }, 
      ]
    },
    {
      title: 'The Change-Making Playbook',
      links: [
        { href: '/school/money.html', children: 'Controlling $100k' },
        { href: '/school/data.html', children: 'Leveraging Data' },
        { href: '/school/corp.html', children: 'Deciphering Corporate-Speak' },
        { href: '/school/selfie.html', children: 'Selfie Diplomacy' },
        { href: '/school/dress.html', children: 'Changing the Dress Code' },
        { href: '/school/takeover.html', children: 'State Takeover' },
        { href: '/school/waffle.html', children: 'Playing the Waffle Game' },
        { href: '/school/schedule.html', children: 'Schedule Change' },
        { href: '/school/comms.html', children: 'Forcing Communication' },
        { href: '/school/dayoff.html', children: 'Getting a day off' },
      ]
    },
  ];

  // Generate the HTML for the side navigation and append it to the sidenav element
  const sidenavHtml = `
    <nav class="sidenav">
    
      ${items.map(item => `
        <div>
          <h3>${item.title}</h3>
          <div style="width:75%;height:0.68em;background-color:#FEB7B3; padding-bottom:0.22em"></div>
          <ul class="flex column">
            ${item.links.map(link => `
              <li> ${window.location.pathname === link.href ? "<em><u>" : ''}
                <a class="scroll" href="${link.href}">${link.children}</a>
                ${window.location.pathname === link.href ? "</u></em>" : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </nav>
  `;


// Fetch the data from players.json
fetch('/components/players.json')
  .then(response => response.json())
  .then(data => {
    const currentPage = window.location.pathname;

    let currentPlayer;

    if (currentPage === "/school/") {
    currentPlayer = data.find(player => player.name === "/school/index.html");
    } else {
    const currentPageShort = currentPage.replace(".html", "");
    currentPlayer = data.find(player => player.name === currentPage || player.name === currentPageShort);
    }

    // Generate the HTML structure for the sidebar based on the currentPlayer
    const sidebarHtml = generateSidebarHtml(currentPlayer);
    console.log(currentPlayer);
    
    // Inject the HTML into the sidebar element
    toc.innerHTML = sidebarHtml;
  })
  .catch(error => console.log(error));

// Function to generate the HTML structure for the sidebar
function generateSidebarHtml(currentPlayer) {
    let emojis = ["heart", "praise", "cowboy", "saint", "spazz"];
    let foes = ["spy", "devil", "thunder"];
    let keys = ["key", "trophy", "diamond"];

    // Randomly select an element from each array

    let sidebarHtml = '<nav class="sidenav"><h3>Key Players</h3>';
  
    if (currentPlayer) {
        
    
        // Create the key tab
        let randomKey = keys[Math.floor(Math.random() * keys.length)];
        const keyTab = createTab(currentPlayer.key, `/school/${currentPlayer.key}.html`, '#97E5D7', currentPlayer.key, randomKey);
        sidebarHtml += keyTab;
    
        // Create the foe tabs
        currentPlayer.foe.forEach(foe => {
          const foeLink = `/school/${foe}.html`;
          let randomFoe = foes[Math.floor(Math.random() * foes.length)];
          const foeTab = createTab(foe, foeLink, '#FEB7B3', foe, randomFoe);
          sidebarHtml += foeTab;
        });

        // Create the ally tabs
        currentPlayer.ally.forEach(ally => {
            let allyName;
            let allyBack;
    
            if (Array.isArray(ally)) {
              allyName = ally[0];
              allyBack = ally[1];
            } else {
              allyName = ally;
            }
          const allyLink = `/school/${allyName}.html`;
          let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];


          const allyTab = createTab(allyName, allyLink, '#D2EBD8', allyBack, randomEmoji);
          sidebarHtml += allyTab;
        });
      }
  
    sidebarHtml += '</nav>';
    return sidebarHtml;
  }
  
  // Function to create an individual tab
  function createTab(text, link, color, back, img) {
    return `<div class="bingo-item"> 
    <button class="aesthetic-tab front" style="background-color: ${color}" onclick="window.location.href='${link}'"><img class="aesthetic-icon" src="/assets/images/${img}.png"></img>${text}</button>
    <button class="aesthetic-tab back" style="background-color: ${color}" onclick="window.location.href='${link}'"><img class="aesthetic-icon" src="/assets/images/${img}.png"></img>${back}</button>
    </div>`;
  }

sidenav.innerHTML = sidenavHtml;

 

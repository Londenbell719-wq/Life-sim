// Locations with their properties
const LOCATIONS = {
    USA: {
        name: 'United States',
        currency: '$',
        taxRate: 0.25,
        description: 'Land of opportunities and dreams',
        celeb_multiplier: 1.5,
        business_earnings: 1,
        mafia_available: true,
        presidential_viable: true
    },
    UK: {
        name: 'United Kingdom',
        currency: '£',
        taxRate: 0.35,
        description: 'Royal traditions and heritage',
        celeb_multiplier: 1.2,
        business_earnings: 0.9,
        mafia_available: true,
        presidential_viable: false
    },
    DUBAI: {
        name: 'Dubai',
        currency: 'د.إ',
        taxRate: 0.05,
        description: 'Luxury and wealth central',
        celeb_multiplier: 1.8,
        business_earnings: 1.3,
        mafia_available: false,
        presidential_viable: false
    },
    JAPAN: {
        name: 'Japan',
        currency: '¥',
        taxRate: 0.30,
        description: 'Technology and tradition',
        celeb_multiplier: 1.4,
        business_earnings: 1.1,
        mafia_available: true,
        presidential_viable: false
    },
    BRAZIL: {
        name: 'Brazil',
        currency: 'R$',
        taxRate: 0.27,
        description: 'Vibrant culture and chaos',
        celeb_multiplier: 1.6,
        business_earnings: 0.8,
        mafia_available: true,
        presidential_viable: true
    },
    SINGAPORE: {
        name: 'Singapore',
        currency: 'S$',
        taxRate: 0.22,
        description: 'Urban efficiency and wealth',
        celeb_multiplier: 1.3,
        business_earnings: 1.2,
        mafia_available: false,
        presidential_viable: false
    }
};

// Businesses available
const BUSINESSES = {
    social_media: {
        name: 'Social Media Agency',
        cost: 50000,
        monthly_income: 5000,
        risk: 0.3,
        description: 'Manage influencers and brands'
    },
    nightclub: {
        name: 'Nightclub',
        cost: 150000,
        monthly_income: 20000,
        risk: 0.4,
        description: 'Entertainment venue (adult only)'
    },
    casino: {
        name: 'Casino',
        cost: 500000,
        monthly_income: 80000,
        risk: 0.6,
        description: 'High-risk gambling operation'
    },
    tech_startup: {
        name: 'Tech Startup',
        cost: 100000,
        monthly_income: 10000,
        risk: 0.5,
        description: 'Software and tech innovation'
    },
    real_estate: {
        name: 'Real Estate Company',
        cost: 200000,
        monthly_income: 25000,
        risk: 0.2,
        description: 'Property investment and sales'
    },
    restaurant: {
        name: 'Restaurant Chain',
        cost: 80000,
        monthly_income: 12000,
        risk: 0.35,
        description: 'Fine dining establishment'
    },
    modeling_agency: {
        name: 'Modeling Agency',
        cost: 75000,
        monthly_income: 8000,
        risk: 0.4,
        description: 'Represent models and talent'
    },
    gym: {
        name: 'Luxury Gym',
        cost: 60000,
        monthly_income: 7000,
        risk: 0.2,
        description: 'High-end fitness facility'
    }
};

// Game state
let game = {
    name: '',
    location: '',
    age: 18,
    year: 1,
    money: 10000,
    health: 100,
    happiness: 80,
    stress: 20,
    followers: 100,
    fame: 0,
    reputation: 50,
    businesses: {},
    business_income: 0,
    in_mafia: false,
    mafia_rank: 0,
    mafia_income: 0,
    sponsorships: [],
    sponsorship_income: 0,
    running_for_president: false,
    president_polls: 0,
    events_log: []
};

// Display the main game content
function render() {
    const content = document.getElementById('gameContent');
    content.innerHTML = '';
    
    if (!game.name) {
        renderCharacterCreation();
    } else {
        renderGameScreen();
    }
}

function renderCharacterCreation() {
    const content = document.getElementById('gameContent');
    
    let html = `
        <div class="screen">
            <h2>⚙️ CHARACTER CREATION</h2>
            <div class="menu">
                <label for="playerName">Enter your name:</label>
                <input type="text" id="playerName" placeholder="Your name">
                <label for="playerLocation" style="margin-top: 15px;">Choose where you're born:</label>
                <select id="playerLocation">
                    <option value="">-- Select Location --</option>
    `;
    
    for (const [key, loc] of Object.entries(LOCATIONS)) {
        html += `<option value="${key}">${loc.name} - ${loc.description}</option>`;
    }
    
    html += `
                </select>
                <button class="menu-item" onclick="startGame()" style="margin-top: 15px;">BEGIN LIFE ▶️</button>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
}

function startGame() {
    const name = document.getElementById('playerName').value;
    const location = document.getElementById('playerLocation').value;
    
    if (!name || !location) {
        addEvent('Please fill in all fields!', 'warning');
        return;
    }
    
    game.name = name;
    game.location = location;
    game.money = 50000;
    addEvent(`Welcome, ${name}! You were born in ${LOCATIONS[location].name}.`, 'info');
    render();
}

function renderGameScreen() {
    const content = document.getElementById('gameContent');
    const loc = LOCATIONS[game.location];
    
    let html = `
        <div class="screen">
            <h2>📊 LIFE STATUS</h2>
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-label">Name</div>
                    <div class="stat-value">${game.name}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Location</div>
                    <div class="stat-value">${loc.name} ${loc.currency}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Age</div>
                    <div class="stat-value">${game.age} | Year ${game.year}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Money</div>
                    <div class="stat-value">${loc.currency}${formatNumber(game.money)}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Health</div>
                    <div class="stat-value">${game.health}%</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${game.health}%"></div>
                    </div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Happiness</div>
                    <div class="stat-value">${game.happiness}%</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${game.happiness}%; background: #00ccff;"></div>
                    </div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Stress</div>
                    <div class="stat-value">${game.stress}%</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${game.stress}%; background: #ff4141;"></div>
                    </div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Reputation</div>
                    <div class="stat-value">${game.reputation}%</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${game.reputation}%;"></div>
                    </div>
                </div>
            </div>
            
            <div style="background: #2a3f5f; border: 1px solid #00ff41; padding: 15px; border-radius: 3px; margin-bottom: 15px;">
                <strong>Monthly Income: ${loc.currency}${formatNumber(game.business_income + game.mafia_income + game.sponsorship_income)}</strong>
                <div style="font-size: 0.9em; margin-top: 5px; color: #00ccff;">
                    ${game.business_income > 0 ? `Businesses: ${loc.currency}${formatNumber(game.business_income)}` : ''}<br>
                    ${game.mafia_income > 0 ? `Mafia: ${loc.currency}${formatNumber(game.mafia_income)}` : ''}<br>
                    ${game.sponsorship_income > 0 ? `Sponsorships: ${loc.currency}${formatNumber(game.sponsorship_income)}` : ''}
                </div>
            </div>
        </div>
        
        <div class="screen">
            <h2>🌟 CELEBRITY & INFLUENCE</h2>
            <div style="margin-bottom: 15px;">
                <div><strong>Followers: </strong>${formatNumber(game.followers)}</div>
                <div class="celebrity-meter">
                    <div><strong>Fame Level: </strong>${game.fame}</div>
                    <div class="celebrity-bar">
                        <div class="celebrity-fill" style="width: ${Math.min(game.fame, 100)}%"></div>
                    </div>
                </div>
            </div>
            <div class="menu">
                <button class="menu-item" onclick="goToMenu('social_media')">📱 Manage Social Media (${game.followers} followers)</button>
                <button class="menu-item" onclick="goToMenu('sponsorships')">💰 View Sponsorships (${game.sponsorships.length} active)</button>
            </div>
        </div>
        
        <div class="screen">
            <h2>💼 MAIN MENU</h2>
            <div class="menu">
                <button class="menu-item" onclick="goToMenu('jobs')">💻 Get a Job</button>
                <button class="menu-item" onclick="goToMenu('businesses')">🏢 Buy/Manage Businesses</button>
                <button class="menu-item" onclick="goToMenu('lifestyle')">🎉 Lifestyle Activities</button>
                <button class="menu-item" onclick="goToMenu('relationships')">👥 Relationships & Status</button>
                <button class="menu-item" onclick="goToMenu('crime')">⚠️ Criminal Activities</button>
                <button class="menu-item" onclick="goToMenu('politics')">🏛️ Politics</button>
                <button class="menu-item" onclick="advanceYear()" style="background: #1a4d2e; border-color: #00ff41;">⏭️ NEXT YEAR</button>
            </div>
        </div>
        
        <div class="screen">
            <h2>📰 RECENT EVENTS</h2>
            <div style="max-height: 250px; overflow-y: auto;">
                ${game.events_log.slice(-5).map(e => `<div class="event-message event-${e.type}">${e.text}</div>`).join('')}
            </div>
        </div>
    `;
    
    content.innerHTML = html;
}

function goToMenu(menuType) {
    const content = document.getElementById('gameContent');
    const loc = LOCATIONS[game.location];
    let html = `<div class="screen"><button class="menu-item" onclick="render()" style="margin-bottom: 15px;">◀️ BACK</button>`;
    
    if (menuType === 'jobs') {
        html += `
            <h2>💼 GET A JOB</h2>
            <div class="menu">
                <button class="menu-item" onclick="getJob('entry')">Entry Level Job - ${loc.currency}1000/month (+5% happiness)</button>
                <button class="menu-item" onclick="getJob('middle')">Middle Management - ${loc.currency}2500/month (+10% happiness)</button>
                <button class="menu-item" onclick="getJob('executive')">Executive - ${loc.currency}5000/month (+15% happiness)</button>
                <button class="menu-item" onclick="getJob('ceo')">CEO Role - ${loc.currency}15000/month (+20% stress)</button>
            </div>
        `;
    } else if (menuType === 'businesses') {
        html += `<h2>🏢 BUSINESSES</h2>`;
        html += `<div class="menu">`;
        for (const [key, biz] of Object.entries(BUSINESSES)) {
            if (game.businesses[key]) {
                html += `<button class="menu-item" onclick="manageBusiness('${key}')" style="background: #1a4d2e;">✅ ${biz.name} - Owned (${loc.currency}${formatNumber(biz.monthly_income)} monthly)</button>`;
            } else {
                html += `<button class="menu-item" onclick="buyBusiness('${key}')">${biz.name} - ${loc.currency}${formatNumber(biz.cost)} (${loc.currency}${formatNumber(biz.monthly_income)} monthly)</button>`;
            }
        }
        html += `</div>`;
    } else if (menuType === 'lifestyle') {
        html += `
            <h2>🎉 LIFESTYLE</h2>
            <div class="menu">
                <button class="menu-item" onclick="doActivity('party')">🍾 Party - ${loc.currency}500 (-health, +happiness, +followers)</button>
                <button class="menu-item" onclick="doActivity('spa')">🧖 Spa Day - ${loc.currency}300 (+health, +happiness, -stress)</button>
                <button class="menu-item" onclick="doActivity('gym')">💪 Hit the Gym - ${loc.currency}100 (+health, -stress)</button>
                <button class="menu-item" onclick="doActivity('vacation')">✈️ Vacation - ${loc.currency}5000 (+happiness, -stress)</button>
                <button class="menu-item" onclick="doActivity('charity')">❤️ Charity Work - Free (+reputation, +happiness)</button>
                <button class="menu-item" onclick="doActivity('networking')">🤝 Networking Event - ${loc.currency}200 (+reputation, +followers)</button>
            </div>
        `;
    } else if (menuType === 'relationships') {
        html += `
            <h2>👥 RELATIONSHIPS & STATUS</h2>
            <div class="info-box">
                <div><strong>Reputation:</strong> ${game.reputation}% - ${getReputationLevel()}</div>
                <div><strong>Followers:</strong> ${formatNumber(game.followers)}</div>
                <div><strong>Status:</strong> ${getPlayerStatus()}</div>
            </div>
            <div class="menu">
                <button class="menu-item" onclick="render()">View Details</button>
            </div>
        `;
    } else if (menuType === 'crime') {
        if (!loc.mafia_available) {
            html += `<h2>⚠️ CRIMINAL ACTIVITIES</h2><div class="event-message event-negative">Mafia is not available in ${loc.name}.</div>`;
        } else {
            html += `
                <h2>⚠️ CRIMINAL ACTIVITIES</h2>
                <div class="menu">
                    <button class="menu-item" onclick="joinMafia()" ${game.in_mafia ? 'disabled' : ''}>🔗 Join the Mafia ${game.in_mafia ? '(Already Member)' : '(Rank 0)'}</button>
                    <button class="menu-item" onclick="doMafiaJob()" ${!game.in_mafia ? 'disabled' : ''}>💼 Do a Mafia Job</button>
                    <button class="menu-item" onclick="climbMafiaRanks()" ${!game.in_mafia ? 'disabled' : ''}>📈 Climb Ranks (costs reputation)</button>
                </div>
            `;
        }
    } else if (menuType === 'politics') {
        if (!loc.presidential_viable) {
            html += `<h2>🏛️ POLITICS</h2><div class="event-message event-negative">Presidential runs not available in ${loc.name}.</div>`;
        } else {
            html += `
                <h2>🏛️ POLITICS</h2>
                <div class="menu">
                    <button class="menu-item" onclick="runForPresident()" ${game.running_for_president ? 'disabled' : ''}>🗳️ Run for President ${game.running_for_president ? `(Polling: ${Math.round(game.president_polls)}%)` : ''}</button>
                    <button class="menu-item" onclick="campaignForPresident()" ${!game.running_for_president ? 'disabled' : ''}>📢 Campaign</button>
                </div>
            `;
        }
    } else if (menuType === 'social_media') {
        html += `
            <h2>📱 SOCIAL MEDIA MANAGEMENT</h2>
            <div class="info-box">
                <div><strong>Followers:</strong> ${formatNumber(game.followers)}</div>
                <div><strong>Fame:</strong> ${game.fame}</div>
            </div>
            <div class="menu">
                <button class="menu-item" onclick="doSocialMedia('post')">📸 Post Content (+50 followers, ${loc.currency}0)</button>
                <button class="menu-item" onclick="doSocialMedia('collab')">🤝 Collaborate (+100 followers, ${loc.currency}500)</button>
                <button class="menu-item" onclick="doSocialMedia('scandal')">💣 Risky Post (+200 or -300 followers, ${loc.currency}200)</button>
                <button class="menu-item" onclick="doSocialMedia('ad')">📺 Paid Ads (+150 followers, ${loc.currency}1000)</button>
            </div>
        `;
    } else if (menuType === 'sponsorships') {
        html += `<h2>💰 SPONSORSHIPS</h2>`;
        if (game.followers < 10000) {
            html += `<div class="event-message event-warning">Need 10,000+ followers for sponsorships! Current: ${formatNumber(game.followers)}</div>`;
        } else {
            html += `<div class="menu">
                <button class="menu-item" onclick="getSponsorship('energy')" ${game.sponsorships.includes('energy') ? 'disabled' : ''}>⚡ Energy Drink - ${loc.currency}5000/month ${game.sponsorships.includes('energy') ? '(Active)' : ''}</button>
                <button class="menu-item" onclick="getSponsorship('fashion')" ${game.sponsorships.includes('fashion') ? 'disabled' : ''}>👗 Fashion Brand - ${loc.currency}3000/month ${game.sponsorships.includes('fashion') ? '(Active)' : ''}</button>
                <button class="menu-item" onclick="getSponsorship('tech')" ${game.sponsorships.includes('tech') ? 'disabled' : ''}>🔧 Tech Company - ${loc.currency}4000/month ${game.sponsorships.includes('tech') ? '(Active)' : ''}</button>
                <button class="menu-item" onclick="getSponsorship('gaming')" ${game.sponsorships.includes('gaming') ? 'disabled' : ''}>🎮 Gaming Company - ${loc.currency}3500/month ${game.sponsorships.includes('gaming') ? '(Active)' : ''}</button>
            </div>`;
        }
    }
    
    html += `</div>`;
    content.innerHTML = html;
}

function formatNumber(num) {
    return num.toLocaleString();
}

function addEvent(text, type = 'info') {
    game.events_log.push({ text, type, timestamp: game.year });
    if (game.events_log.length > 50) game.events_log.shift();
}

function getJob(type) {
    const loc = LOCATIONS[game.location];
    const salaries = {
        entry: { salary: 1000, happiness: 5, stress: 10 },
        middle: { salary: 2500, happiness: 10, stress: 15 },
        executive: { salary: 5000, happiness: 15, stress: 25 },
        ceo: { salary: 15000, happiness: 20, stress: 40 }
    };
    
    const job = salaries[type];
    game.business_income = job.salary;
    game.happiness += job.happiness;
    game.stress += job.stress;
    game.health -= Math.max(0, job.stress - 10);
    
    addEvent(`You got a ${type} job earning ${loc.currency}${formatNumber(job.salary)}/month!`, 'positive');
    render();
}

function buyBusiness(bizKey) {
    const biz = BUSINESSES[bizKey];
    const loc = LOCATIONS[game.location];
    
    if (game.money < biz.cost) {
        addEvent(`Insufficient funds! Need ${loc.currency}${formatNumber(biz.cost - game.money)} more.`, 'negative');
        render();
        return;
    }
    
    game.money -= biz.cost;
    game.businesses[bizKey] = true;
    game.business_income += biz.monthly_income * loc.business_earnings;
    game.stress += 15;
    
    addEvent(`You bought ${biz.name} for ${loc.currency}${formatNumber(biz.cost)}!`, 'positive');
    goToMenu('businesses');
}

function doActivity(activity) {
    const loc = LOCATIONS[game.location];
    const activities = {
        party: { cost: 500, happiness: 20, health: -10, followers: 100, description: 'Threw a wild party!' },
        spa: { cost: 300, happiness: 15, stress: -20, health: 15, description: 'Relaxed at the spa' },
        gym: { cost: 100, health: 20, stress: -15, happiness: 5, description: 'Got fit at the gym!' },
        vacation: { cost: 5000, happiness: 30, stress: -30, health: 20, description: 'Took an amazing vacation!' },
        charity: { cost: 0, happiness: 10, reputation: 15, stress: -5, description: 'Did charity work!' },
        networking: { cost: 200, reputation: 10, followers: 50, happiness: 5, description: 'Networked with influencers!' }
    };
    
    const act = activities[activity];
    
    if (game.money < act.cost) {
        addEvent(`Not enough money for ${activity}!`, 'negative');
        render();
        return;
    }
    
    game.money -= act.cost;
    game.happiness = Math.min(100, game.happiness + (act.happiness || 0));
    game.health = Math.min(100, Math.max(0, game.health + (act.health || 0)));
    game.stress = Math.min(100, Math.max(0, game.stress + (act.stress || 0)));
    game.followers += act.followers || 0;
    game.reputation = Math.min(100, game.reputation + (act.reputation || 0));
    
    addEvent(act.description, 'positive');
    render();
}

function doSocialMedia(type) {
    const loc = LOCATIONS[game.location];
    const actions = {
        post: { cost: 0, followers: 50, fame: 5, description: 'Posted content!' },
        collab: { cost: 500, followers: 100, fame: 10, description: 'Collaborated with others!' },
        scandal: { cost: 200, followers: Math.random() > 0.5 ? 200 : -300, fame: 15, description: 'Risky content posted!' },
        ad: { cost: 1000, followers: 150, fame: 8, description: 'Ran paid ads successfully!' }
    };
    
    const action = actions[type];
    
    if (game.money < action.cost) {
        addEvent(`Not enough money!`, 'negative');
        goToMenu('social_media');
        return;
    }
    
    game.money -= action.cost;
    game.followers += action.followers;
    game.fame += action.fame;
    
    addEvent(action.description, 'positive');
    goToMenu('social_media');
}

function getSponsorship(brand) {
    const loc = LOCATIONS[game.location];
    const sponsorships = {
        energy: { name: 'Energy Drink', income: 5000 },
        fashion: { name: 'Fashion Brand', income: 3000 },
        tech: { name: 'Tech Company', income: 4000 },
        gaming: { name: 'Gaming Company', income: 3500 }
    };
    
    const sponsor = sponsorships[brand];
    
    if (game.sponsorships.includes(brand)) {
        addEvent(`Already sponsored by ${sponsor.name}!`, 'warning');
    } else {
        game.sponsorships.push(brand);
        game.sponsorship_income += sponsor.income;
        addEvent(`Signed sponsorship with ${sponsor.name}! ${loc.currency}${formatNumber(sponsor.income)}/month`, 'positive');
    }
    
    goToMenu('sponsorships');
}

function joinMafia() {
    const loc = LOCATIONS[game.location];
    if (!loc.mafia_available) {
        addEvent('Mafia not available here!', 'negative');
        render();
        return;
    }
    
    if (game.in_mafia) {
        addEvent('You already work for the mafia!', 'warning');
        render();
        return;
    }
    
    game.in_mafia = true;
    game.mafia_rank = 1;
    game.mafia_income = 3000;
    game.reputation -= 20;
    game.stress += 30;
    
    addEvent('🔗 Welcome to the family. You\'re now a mafia member!', 'negative');
    goToMenu('crime');
}

function doMafiaJob() {
    const loc = LOCATIONS[game.location];
    if (!game.in_mafia) {
        addEvent('You\'re not in the mafia!', 'negative');
        render();
        return;
    }
    
    const earnings = 2000 * (game.mafia_rank || 1);
    const risk = Math.random();
    
    if (risk > 0.7) {
        addEvent('⚠️ Mafia job gone wrong! You got caught!', 'negative');
        game.reputation -= 30;
        game.stress += 40;
    } else {
        game.money += earnings;
        addEvent(`Completed a mafia job! Earned ${loc.currency}${formatNumber(earnings)}`, 'warning');
        game.stress += 20;
    }
    
    goToMenu('crime');
}

function climbMafiaRanks() {
    if (!game.in_mafia) {
        addEvent('You\'re not in the mafia!', 'negative');
        render();
        return;
    }
    
    const cost = (game.mafia_rank + 1) * 50;
    
    if (game.reputation < cost) {
        addEvent(`Need ${cost} reputation to rank up. Current: ${game.reputation}`, 'warning');
        goToMenu('crime');
        return;
    }
    
    game.mafia_rank++;
    game.reputation -= cost;
    game.mafia_income += 2000;
    
    addEvent(`⬆️ Promoted to Rank ${game.mafia_rank}! New income: ${game.mafia_income}/month`, 'info');
    goToMenu('crime');
}

function runForPresident() {
    const loc = LOCATIONS[game.location];
    if (!loc.presidential_viable) {
        addEvent('Presidential runs not available in your country!', 'negative');
        render();
        return;
    }
    
    if (game.age < 35) {
        addEvent('You must be at least 35 years old to run for president!', 'warning');
        goToMenu('politics');
        return;
    }
    
    game.running_for_president = true;
    game.stress += 50;
    addEvent('You announced your presidential campaign!', 'info');
    goToMenu('politics');
}

function campaignForPresident() {
    const loc = LOCATIONS[game.location];
    if (!game.running_for_president) {
        addEvent('You\'re not running for president!', 'negative');
        render();
        return;
    }
    
    const campaign_cost = 100000;
    if (game.money < campaign_cost) {
        addEvent(`Campaign costs ${loc.currency}${formatNumber(campaign_cost)}!`, 'negative');
        goToMenu('politics');
        return;
    }
    
    game.money -= campaign_cost;
    game.president_polls = Math.min(100, game.president_polls + Math.random() * 40);
    game.stress += 30;
    
    addEvent(`📢 Launched campaign! Polling at ${Math.round(game.president_polls)}%`, 'info');
    goToMenu('politics');
}

function advanceYear() {
    const loc = LOCATIONS[game.location];
    
    game.year++;
    game.age++;
    
    // Apply taxes
    const monthly_income = game.business_income + game.mafia_income + game.sponsorship_income;
    const taxes = (monthly_income * 12) * loc.taxRate;
    game.money += (monthly_income * 12) - taxes;
    
    // Life changes
    game.health = Math.max(0, game.health - 5);
    game.happiness = Math.max(0, game.happiness - 10 + (game.stress * 0.5));
    game.stress = Math.max(0, game.stress - 5);
    
    // Check for bad outcomes
    if (game.health < 20) {
        addEvent('⚠️ Your health is critically low!', 'negative');
    }
    if (game.happiness < 20) {
        addEvent('😢 You\'re severely depressed. Seek happiness!', 'negative');
    }
    if (game.money < 0) {
        addEvent('💸 You\'re in debt! Game Over!', 'negative');
        render();
        return;
    }
    
    // Celebrity milestones
    if (game.followers >= 1000000 && game.fame > 80) {
        addEvent('🌟 You\'ve become a global superstar!', 'positive');
    }
    
    // Mafia warnings
    if (game.in_mafia && game.reputation < 10) {
        addEvent('⚠️ The mafia is losing patience with you!', 'negative');
    }
    
    addEvent(`------- YEAR ${game.year} SUMMARY -------`, 'info');
    addEvent(`Income After Taxes (${Math.round(loc.taxRate * 100)}%): ${loc.currency}${formatNumber((monthly_income * 12) - taxes)}`, 'info');
    addEvent(`Age: ${game.age}`, 'info');
    
    render();
}

function getReputationLevel() {
    if (game.reputation > 80) return 'Legendary';
    if (game.reputation > 60) return 'Famous';
    if (game.reputation > 40) return 'Respected';
    if (game.reputation > 20) return 'Known';
    return 'Unknown';
}

function getPlayerStatus() {
    let status = [];
    if (game.in_mafia) status.push(`Mafia Rank ${game.mafia_rank}`);
    if (game.running_for_president) status.push(`Presidential Candidate (${Math.round(game.president_polls)}%)`);
    if (game.followers > 100000) status.push(`Celebrity (${formatNumber(game.followers)} followers)`);
    if (Object.keys(game.businesses).length > 0) status.push(`Business Owner (${Object.keys(game.businesses).length})`);
    
    return status.length > 0 ? status.join(' | ') : 'Regular Person';
}

function manageBusiness(bizKey) {
    addEvent(`Managing ${BUSINESSES[bizKey].name}...`, 'info');
    goToMenu('businesses');
}

// Initialize
render();
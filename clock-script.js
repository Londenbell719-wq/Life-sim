// Time zones with offsets and display names
const TIMEZONES = {
    'UTC': { offset: 0, name: 'UTC (GMT)', city: 'London/UTC' },
    'EST': { offset: -5, name: 'Eastern Standard Time', city: 'New York' },
    'CST': { offset: -6, name: 'Central Standard Time', city: 'Chicago' },
    'MST': { offset: -7, name: 'Mountain Standard Time', city: 'Denver' },
    'PST': { offset: -8, name: 'Pacific Standard Time', city: 'Los Angeles' },
    'IST': { offset: 5.5, name: 'Indian Standard Time', city: 'New Delhi' },
    'JST': { offset: 9, name: 'Japan Standard Time', city: 'Tokyo' },
    'AEST': { offset: 10, name: 'Australian Eastern Standard Time', city: 'Sydney' },
    'NZST': { offset: 12, name: 'New Zealand Standard Time', city: 'Auckland' },
    'GST': { offset: 4, name: 'Gulf Standard Time', city: 'Dubai' },
    'CET': { offset: 1, name: 'Central European Time', city: 'Berlin' },
    'EET': { offset: 2, name: 'Eastern European Time', city: 'Cairo' },
    'MSK': { offset: 3, name: 'Moscow Standard Time', city: 'Moscow' },
    'SGT': { offset: 8, name: 'Singapore Standard Time', city: 'Singapore' },
    'HKT': { offset: 8, name: 'Hong Kong Time', city: 'Hong Kong' },
    'AEST': { offset: 10, name: 'Australian Eastern Standard Time', city: 'Sydney' },
    'NZDT': { offset: 13, name: 'New Zealand Daylight Time', city: 'Auckland' },
    'HST': { offset: -10, name: 'Hawaii Standard Time', city: 'Honolulu' },
    'AKST': { offset: -9, name: 'Alaska Standard Time', city: 'Anchorage' },
    'BRT': { offset: -3, name: 'Brasília Time', city: 'São Paulo' }
};

let activeTimezones = ['UTC', 'EST', 'PST', 'JST'];
let timeFormat = '12'; // 12 or 24 hour format

// Initialize
function init() {
    populateTimezoneSelect();
    updateClocks();
    setInterval(updateClocks, 1000);
    document.getElementById('timeFormat').addEventListener('change', (e) => {
        timeFormat = e.target.value;
    });
}

function populateTimezoneSelect() {
    const select = document.getElementById('zoneSelect');
    for (const [key, zone] of Object.entries(TIMEZONES)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${zone.city} (${zone.name})`;
        select.appendChild(option);
    }
}

function addTimeZone() {
    const select = document.getElementById('zoneSelect');
    const value = select.value;
    
    if (!value) {
        alert('Please select a time zone');
        return;
    }
    
    if (activeTimezones.includes(value)) {
        alert('This time zone is already displayed');
        return;
    }
    
    activeTimezones.push(value);
    select.value = '';
    updateClocks();
}

function removeTimeZone(timezone) {
    if (activeTimezones.length === 1) {
        alert('You must have at least one time zone displayed');
        return;
    }
    activeTimezones = activeTimezones.filter(z => z !== timezone);
    updateClocks();
}

function updateClocks() {
    const grid = document.getElementById('clockGrid');
    grid.innerHTML = '';
    
    const now = new Date();
    
    activeTimezones.forEach(zone => {
        const zoneData = TIMEZONES[zone];
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const zoneTime = new Date(utcTime + zoneData.offset * 3600000);
        
        const card = createClockCard(zone, zoneData, zoneTime);
        grid.appendChild(card);
    });
}

function createClockCard(zone, zoneData, time) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    
    // Digital time
    const digitalTime = formatTime(time);
    
    // Offset display
    let offsetText = '';
    if (zoneData.offset > 0) {
        offsetText = `UTC+${zoneData.offset === Math.floor(zoneData.offset) ? zoneData.offset : zoneData.offset}`;
    } else if (zoneData.offset < 0) {
        offsetText = `UTC${zoneData.offset === Math.floor(zoneData.offset) ? zoneData.offset : zoneData.offset}`;
    } else {
        offsetText = 'UTC±0';
    }
    
    card.innerHTML = `
        <button class="remove-btn" onclick="removeTimeZone('${zone}')">×</button>
        <div class="clock-zone">${zoneData.city}</div>
        <div class="clock-offset">${offsetText}</div>
        <div class="digital-time">${digitalTime}</div>
        <div class="analog-clock">
            <div class="clock-numbers">
                <div class="clock-number" style="transform: rotate(0deg) translateY(-85px);">12</div>
                <div class="clock-number" style="transform: rotate(30deg) translateY(-85px) rotate(-30deg);">1</div>
                <div class="clock-number" style="transform: rotate(60deg) translateY(-85px) rotate(-60deg);">2</div>
                <div class="clock-number" style="transform: rotate(90deg) translateY(-85px) rotate(-90deg);">3</div>
                <div class="clock-number" style="transform: rotate(120deg) translateY(-85px) rotate(-120deg);">4</div>
                <div class="clock-number" style="transform: rotate(150deg) translateY(-85px) rotate(-150deg);">5</div>
                <div class="clock-number" style="transform: rotate(180deg) translateY(-85px) rotate(-180deg);">6</div>
                <div class="clock-number" style="transform: rotate(210deg) translateY(-85px) rotate(-210deg);">7</div>
                <div class="clock-number" style="transform: rotate(240deg) translateY(-85px) rotate(-240deg);">8</div>
                <div class="clock-number" style="transform: rotate(270deg) translateY(-85px) rotate(-270deg);">9</div>
                <div class="clock-number" style="transform: rotate(300deg) translateY(-85px) rotate(-300deg);">10</div>
                <div class="clock-number" style="transform: rotate(330deg) translateY(-85px) rotate(-330deg);">11</div>
            </div>
            <div class="clock-hand hour-hand" style="transform: rotate(${getHourDegrees(time)}deg);"></div>
            <div class="clock-hand minute-hand" style="transform: rotate(${getMinuteDegrees(time)}deg);"></div>
            <div class="clock-hand second-hand" style="transform: rotate(${getSecondDegrees(time)}deg);"></div>
            <div class="clock-center"></div>
        </div>
    `;
    
    return card;
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let period = 'AM';
    
    if (timeFormat === '12') {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }
    
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    
    return timeFormat === '12' ? `${h}:${m}:${s} ${period}` : `${h}:${m}:${s}`;
}

function getHourDegrees(date) {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    return (hours * 30) + (minutes * 0.5);
}

function getMinuteDegrees(date) {
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return (minutes * 6) + (seconds * 0.1);
}

function getSecondDegrees(date) {
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return (seconds * 6) + (milliseconds * 0.006);
}

// Start the clock
init();
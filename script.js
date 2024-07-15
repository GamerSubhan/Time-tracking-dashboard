let previouslyClickedItem = null;

document.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', event => {
        // If there is a previously clicked item, revert its color
        if (previouslyClickedItem) {
            previouslyClickedItem.classList.remove('clicked');
            previouslyClickedItem.classList.add('default');
        }

        // Set the current clicked item to white
        event.target.classList.remove('default');
        event.target.classList.add('clicked');

        // Update the previously clicked item
        previouslyClickedItem = event.target;
    });
});

const dailyButton = document.getElementById('daily');
const weeklyButton = document.getElementById('weekly');
const monthlyButton = document.getElementById('monthly');

let daily, weekly, monthly;


function UpdateData(post) {
    let frame = post.timeframes.weekly;

        if(daily === true)
        {
            frame = post.timeframes.daily;
        }
        else if(weekly === true)
        {
            frame = post.timeframes.weekly;
        }
        else if(monthly === true)
        {
            frame = post.timeframes.monthly;
        }
        card.forEach((node) => {
            if(node.className === post.title)
            {
                let currentHour = frame.current;
                let previousHour = frame.previous;

                node.querySelector('h1').innerHTML = currentHour + 'hrs';
                node.querySelector('p').innerHTML = 'Last week - ' + previousHour + 'hrs';

                //node.insertAdjacentHTML('beforeend', `<h1>${currentHour}hrs</h1>`);
                //node.insertAdjacentHTML('beforeend', `<p>Last week - ${previousHour}hrs</p>`);
            }
        });
}

const card = document.querySelectorAll('#card');

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            UpdateData(post);
            dailyButton.addEventListener('click', () =>
            {
                daily = true;
                weekly = false;
                monthly = false;
                UpdateData(post);
            });
                
            weeklyButton.addEventListener('click', () =>
            {
                daily = false;
                weekly = true;
                monthly = false;
                UpdateData(post);
            });
                
            monthlyButton.addEventListener('click', () =>
            {
                daily = false;
                weekly = false;
                monthly = true;
                UpdateData(post);
            });
        })
    })
